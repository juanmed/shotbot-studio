import {
  useCallback,
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import * as THREE from "three";
import { SkeletonUtils, type GLTF } from "three-stdlib";
import robotArm from "@/assets/robot-arm.png";
import { BRAND_NAME } from "@/lib/constants";
import { SHOWCASE_PHASES } from "@/lib/siteData";
import { useI18n } from "@/lib/i18n";

const SCROLL_HEIGHT = "500vh";
const MODEL_PATH = "/models/fr5wip.glb";

type JointKey = "j1" | "j2" | "j3" | "j4" | "j5" | "j6";
type RotationBase = Record<JointKey, THREE.Euler>;
type RobotJointRefs = Record<JointKey, THREE.Object3D>;
type JointAxis = Exclude<keyof THREE.Euler, "order" | "_x" | "_y" | "_z" | "_order" | "isEuler">;

type GLTFResult = GLTF & {
  scene: THREE.Group;
};

interface RobotPoseKeyframe {
  j1: number;
  j2: number;
  j3: number;
  j4: number;
  j5: number;
  j6: number;
  groupX: number;
  groupY: number;
  groupZ: number;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  lookAheadX: number;
  lookAheadY: number;
  lookAheadZ: number;
}

interface ShowcasePhaseWindow {
  start: number;
  peak: number;
  end: number;
}

const JOINT_AXES: Record<JointKey, JointAxis> = {
  j1: "y",
  j2: "y",
  j3: "y",
  j4: "y",
  j5: "z",
  j6: "x",
};

const PHASE_WINDOWS: ShowcasePhaseWindow[] = [
  { start: 0.03, peak: 0.15, end: 0.28 },
  { start: 0.25, peak: 0.38, end: 0.5 },
  { start: 0.47, peak: 0.6, end: 0.72 },
  { start: 0.69, peak: 0.84, end: 0.97 },
];

function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

function easeInOutSine(value: number) {
  return -(Math.cos(Math.PI * value) - 1) / 2;
}

function interpolatePose(progress: number) {
  const p = clamp01(progress);
  const eased = easeInOutSine(p);
  const theta = eased * Math.PI * 2;
  const circular = theta - Math.PI / 2;

  // Arm extends over the first 20% of scroll, then stays fully open for the orbit.
  const extendFrac = easeInOutSine(Math.min(p * 5, 1.0));

  return {
    // j1 sweeps full 2π around Y — sole driver of the circular XZ orbit.
    j1: circular,
    // FK-derived reach-maximising angles (0.920m radius, 0.087m droop):
    //   j2=-0.35: shoulder 20° above horizontal
    //   j3= 0.50: visible elbow bend (29°)
    //   j4=-0.15: wrist compensates to keep end-effector near level
    j2: -0.35 * extendFrac,
    j3:  0.50 * extendFrac,
    j4: -0.15 * extendFrac,
    // Wrist roll: small sinusoidal variation so the wrist reads as alive.
    j5:  0.35 * Math.sin(theta),
    // Tool counter-rotation: cancels some of j1 so the tool keeps facing outward.
    j6: -circular * 0.3 + 0.25 * Math.sin(theta),
    groupX: 0,
    groupY: -1.2,
    groupZ: 0,
    // Camera orbits the scene — pushed back to frame the larger robot.
    cameraX: 1.3  + 1.1  * Math.cos(theta * 0.5),
    cameraY: 1.8  + 0.5  * Math.sin(theta * 0.45),
    cameraZ: 6.5  + 1.0  * Math.cos(theta * 0.6),
    lookAheadX: 0,
    lookAheadY: 0.1,
    lookAheadZ: 0,
  };
}

function getFallbackWindow(index: number): ShowcasePhaseWindow {
  const unit = 1 / SHOWCASE_PHASES.length;
  return {
    start: unit * index + 0.06,
    peak: unit * index + 0.14,
    end: unit * index + 0.22,
  };
}

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
    console.error("[RobotArmSection] Scene error boundary", error);
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

const StaticShowcaseFallback = () => {
  const { t } = useI18n();

  return (
    <section className="section-py px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <img
          src={robotArm}
          alt={`${BRAND_NAME} robotic camera arm`}
          className="w-64 md:w-96 mx-auto mb-12 drop-shadow-2xl"
          width={1024}
          height={1024}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SHOWCASE_PHASES.map((phase, index) => (
            <div key={index} className="text-left">
              <h3 className="font-display text-xl font-800 text-foreground mb-2 whitespace-pre-line">
                {t(phase.titleKey)}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {t(phase.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PhaseOverlay = ({
  descKey,
  highlight,
  peak,
  position,
  progress,
  start,
  titleKey,
  end,
}: {
  descKey: string;
  highlight?: boolean;
  peak: number;
  position: "left" | "right" | "center";
  progress: MotionValue<number>;
  start: number;
  titleKey: string;
  end: number;
}) => {
  const { t } = useI18n();

  const opacity = useTransform(progress, [start, peak, end], [0, 1, 0]);
  const y = useTransform(progress, [start, peak, end], [24, 0, -18]);

  const positionClasses = {
    left: "left-6 md:left-12 lg:left-20 top-[18%] md:top-[20%] text-left max-w-xs md:max-w-sm",
    right: "right-6 md:right-12 lg:right-20 top-[18%] md:top-[20%] text-right max-w-xs md:max-w-sm",
    center: "left-1/2 -translate-x-1/2 bottom-[16%] md:bottom-[18%] text-center max-w-md px-6",
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute z-10 ${positionClasses[position]}`}
    >
      <h3
        className={`font-display text-2xl sm:text-3xl md:text-5xl font-800 tracking-tight leading-[1.05] whitespace-pre-line ${
          highlight ? "text-gradient-chrome" : "text-foreground"
        }`}
      >
        {t(titleKey)}
      </h3>
      <p className="font-body text-xs sm:text-sm text-muted-foreground mt-2 md:mt-3 leading-relaxed">
        {t(descKey)}
      </p>
    </motion.div>
  );
};

const RobotRig = ({
  onResolveError,
  progress,
}: {
  onResolveError: (error: Error) => void;
  progress: MotionValue<number>;
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const jointsRef = useRef<RobotJointRefs | null>(null);
  const baseRotationsRef = useRef<RotationBase | null>(null);
  const effectorRef = useRef<THREE.Object3D | null>(null);
  const baseLinkRef = useRef<THREE.Object3D | null>(null);
  const rootBaseRotation = useRef(new THREE.Euler(0.08, -0.18, 0.02));
  const focusTarget = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const { camera } = useThree();
  const { scene } = useGLTF(MODEL_PATH) as GLTFResult;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useEffect(() => {
    const findByNames = (...names: string[]) => {
      for (const name of names) {
        const found = clone.getObjectByName(name);
        if (found) return found;
      }
      return null;
    };

    clone.traverse((child) => {
      if ("castShadow" in child) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const refs = {
      j1: findByNames("j1.revolute.bone", "j1revolutebone"),
      j2: findByNames("j2.revolute.bone", "j2revolutebone"),
      j3: findByNames("j3.revolute.bone", "j3revolutebone"),
      j4: findByNames("j4.revolute.bone", "j4revolutebone"),
      j5: findByNames("j5.revolute.bone", "j5revolutebone"),
      j6: findByNames("j6.revolute.bone", "j6revolutebone"),
    };
    const wrist3 = findByNames("wrist3_link", "wrist3_Link");
    const baseLink = findByNames("base_link");

    const missingJoint = Object.entries(refs).find(([, value]) => !value);

    if (missingJoint || !wrist3 || !baseLink) {
      onResolveError(new Error(`Failed to resolve FR5 rig at ${missingJoint?.[0] ?? (!wrist3 ? "wrist3_link" : "base_link")}`));
      return;
    }

    jointsRef.current = refs as RobotJointRefs;
    baseRotationsRef.current = Object.fromEntries(
      (Object.keys(refs) as JointKey[]).map((key) => [key, refs[key]!.rotation.clone()])
    ) as RotationBase;
    effectorRef.current = wrist3;
    baseLinkRef.current = baseLink;
  }, [clone, onResolveError]);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    rootRef.current.scale.setScalar(0.06);
    rootRef.current.position.set(0, -0.4, 0);
    rootRef.current.rotation.copy(rootBaseRotation.current);
  }, []);

  useFrame((_, delta) => {
    if (
      !rootRef.current ||
      !jointsRef.current ||
      !baseRotationsRef.current ||
      !effectorRef.current ||
      !baseLinkRef.current
    ) {
      return;
    }

    const pose = interpolatePose(progress.get());
    const damping = 1 - Math.exp(-delta * 5.5);

    const applyAxisDelta = (key: JointKey, deltaValue: number) => {
      const joint = jointsRef.current![key];
      const base = baseRotationsRef.current![key];
      const ax = JOINT_AXES[key];
      joint.rotation.x = THREE.MathUtils.lerp(
        joint.rotation.x,
        ax === "x" ? base.x + deltaValue : base.x,
        damping
      );
      joint.rotation.y = THREE.MathUtils.lerp(
        joint.rotation.y,
        ax === "y" ? base.y + deltaValue : base.y,
        damping
      );
      joint.rotation.z = THREE.MathUtils.lerp(
        joint.rotation.z,
        ax === "z" ? base.z + deltaValue : base.z,
        damping
      );
    };

    applyAxisDelta("j1", pose.j1);
    applyAxisDelta("j2", pose.j2);
    applyAxisDelta("j3", pose.j3);
    applyAxisDelta("j4", pose.j4);
    applyAxisDelta("j5", pose.j5);
    applyAxisDelta("j6", pose.j6);

    rootRef.current.position.x = THREE.MathUtils.lerp(rootRef.current.position.x, pose.groupX, damping);
    rootRef.current.position.y = THREE.MathUtils.lerp(rootRef.current.position.y, pose.groupY, damping);
    rootRef.current.position.z = THREE.MathUtils.lerp(rootRef.current.position.z, pose.groupZ, damping);

    effectorRef.current.getWorldPosition(desiredTarget.current);
    desiredTarget.current.x += pose.lookAheadX;
    desiredTarget.current.y += pose.lookAheadY;
    desiredTarget.current.z += pose.lookAheadZ;
    focusTarget.current.lerp(desiredTarget.current, damping);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pose.cameraX, damping);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pose.cameraY, damping);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, pose.cameraZ, damping);
    camera.lookAt(focusTarget.current);
  });

  useEffect(() => {
    return () => {
      jointsRef.current = null;
      baseRotationsRef.current = null;
      effectorRef.current = null;
      baseLinkRef.current = null;
    };
  }, []);

  return <primitive ref={rootRef} object={clone} />;
};

const RobotScene = ({
  onResolveError,
  progress,
}: {
  onResolveError: (error: Error) => void;
  progress: MotionValue<number>;
}) => {
  return (
    <>
      <color attach="background" args={["#060708"]} />
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.2}
        color="#fff3dc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-4, 3, -6]} intensity={1.4} color="#9fc2ff" />
      <spotLight position={[0, 6, 8]} angle={0.38} penumbra={0.8} intensity={50} color="#ffffff" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.32, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <shadowMaterial transparent opacity={0.18} />
      </mesh>
      <RobotRig onResolveError={onResolveError} progress={progress} />
    </>
  );
};

const RobotArmSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sceneError, setSceneError] = useState(false);
  const sectionProgress = useMotionValue(0);
  const handleSceneError = useCallback((error?: unknown) => {
    console.error("[RobotArmSection] Falling back to static section", error);
    setSceneError(true);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const range = el.offsetHeight - window.innerHeight;
      if (range <= 0) {
        sectionProgress.set(0);
        return;
      }

      const progress = THREE.MathUtils.clamp((-rect.top) / range, 0, 1);
      sectionProgress.set(progress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [sectionProgress]);

  const progressWidth = useTransform(sectionProgress, [0, 1], ["0%", "100%"]);
  const vignetteOpacity = useTransform(sectionProgress, [0, 0.4, 1], [0.55, 0.25, 0.55]);
  const accentGlowOpacity = useTransform(sectionProgress, [0, 0.35, 0.65, 1], [0.08, 0.18, 0.2, 0.1]);
  const accentGlowScale = useTransform(sectionProgress, [0, 0.55, 1], [0.92, 1.08, 0.96]);

  if (prefersReducedMotion || sceneError) {
    return <StaticShowcaseFallback />;
  }

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_24%,rgba(0,0,0,0.7)_100%)]"
        />
        <motion.div
          style={{ opacity: accentGlowOpacity, scale: accentGlowScale }}
          className="absolute left-1/2 top-[54%] z-0 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[130px] pointer-events-none md:h-[520px] md:w-[520px]"
        />

        <SceneErrorBoundary onError={handleSceneError}>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ fov: 32, near: 0.1, far: 100, position: [2.4, 1.8, 7.5] }}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
            className="absolute inset-0 z-[1]"
          >
            <Suspense fallback={null}>
              <RobotScene onResolveError={handleSceneError} progress={sectionProgress} />
            </Suspense>
          </Canvas>
        </SceneErrorBoundary>

        {SHOWCASE_PHASES.map((phase, index) => {
          const window = PHASE_WINDOWS[index] ?? getFallbackWindow(index);

          return (
            <PhaseOverlay
              key={phase.titleKey}
              descKey={phase.descKey}
              end={window.end}
              highlight={phase.highlight}
              peak={window.peak}
              position={phase.position}
              progress={sectionProgress}
              start={window.start}
              titleKey={phase.titleKey}
            />
          );
        })}

        <div className="absolute bottom-6 left-1/2 z-10 w-24 -translate-x-1/2 md:w-32">
          <div className="h-px w-full bg-border/70">
            <motion.div style={{ width: progressWidth }} className="h-full bg-foreground/60" />
          </div>
        </div>
      </div>
    </div>
  );
};

useGLTF.preload(MODEL_PATH);

export default RobotArmSection;
