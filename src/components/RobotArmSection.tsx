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
  useReducedMotion,
  useScroll,
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
const MODEL_PATH = "/models/fr5_fail.glb";

type JointKey = "j1" | "j2" | "j3" | "j4" | "j5" | "j6";
type RotationBase = Record<JointKey, THREE.Euler>;
type RobotJointRefs = Record<JointKey, THREE.Object3D>;
type JointAxis = Exclude<keyof THREE.Euler, "order" | "_x" | "_y" | "_z" | "_order" | "isEuler">;

type GLTFResult = GLTF & {
  scene: THREE.Group;
};

interface RobotPoseKeyframe {
  at: number;
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

const JOINT_AXES: Record<Exclude<JointKey, "wrist3">, JointAxis> = {
  j1: "y",
  j2: "z",
  j3: "z",
  j4: "x",
  j5: "x",
  j6: "z",
};

const ROBOT_POSE_KEYFRAMES: RobotPoseKeyframe[] = [
  {
    at: 0,
    j1: -0.12,
    j2: -0.25,
    j3: 0.38,
    j4: -0.16,
    j5: 0.08,
    j6: -0.08,
    groupX: 0.2,
    groupY: -1.9,
    groupZ: 0,
    cameraX: 1.8,
    cameraY: 1.85,
    cameraZ: 7.4,
    lookAheadX: -0.15,
    lookAheadY: 0.08,
    lookAheadZ: 0,
  },
  {
    at: 0.18,
    j1: -0.26,
    j2: -0.42,
    j3: 0.74,
    j4: -0.25,
    j5: 0.16,
    j6: -0.12,
    groupX: 0.1,
    groupY: -1.86,
    groupZ: 0.08,
    cameraX: 1.25,
    cameraY: 1.95,
    cameraZ: 6.95,
    lookAheadX: -0.12,
    lookAheadY: 0.12,
    lookAheadZ: 0.02,
  },
  {
    at: 0.42,
    j1: -0.9,
    j2: -0.7,
    j3: 1.12,
    j4: 0.18,
    j5: 0.48,
    j6: 0.1,
    groupX: 0,
    groupY: -1.82,
    groupZ: 0.18,
    cameraX: 0.45,
    cameraY: 2.05,
    cameraZ: 6.35,
    lookAheadX: 0.06,
    lookAheadY: 0.18,
    lookAheadZ: 0.08,
  },
  {
    at: 0.68,
    j1: 0.34,
    j2: -0.58,
    j3: 0.84,
    j4: -0.34,
    j5: -0.28,
    j6: 0.22,
    groupX: 0.08,
    groupY: -1.78,
    groupZ: 0.3,
    cameraX: -0.1,
    cameraY: 2.08,
    cameraZ: 5.95,
    lookAheadX: 0.18,
    lookAheadY: 0.18,
    lookAheadZ: 0.16,
  },
  {
    at: 0.86,
    j1: -0.04,
    j2: -0.38,
    j3: 0.64,
    j4: 0.08,
    j5: -0.1,
    j6: 0.06,
    groupX: 0.02,
    groupY: -1.76,
    groupZ: 0.32,
    cameraX: -0.24,
    cameraY: 2.02,
    cameraZ: 5.55,
    lookAheadX: 0.12,
    lookAheadY: 0.12,
    lookAheadZ: 0.2,
  },
  {
    at: 1,
    j1: 0.06,
    j2: -0.28,
    j3: 0.54,
    j4: 0.04,
    j5: -0.04,
    j6: 0,
    groupX: 0,
    groupY: -1.74,
    groupZ: 0.28,
    cameraX: -0.18,
    cameraY: 1.98,
    cameraZ: 5.45,
    lookAheadX: 0.08,
    lookAheadY: 0.1,
    lookAheadZ: 0.18,
  },
];

const PHASE_WINDOWS: ShowcasePhaseWindow[] = [
  { start: 0.08, peak: 0.16, end: 0.24 },
  { start: 0.3, peak: 0.38, end: 0.46 },
  { start: 0.54, peak: 0.62, end: 0.7 },
  { start: 0.78, peak: 0.86, end: 0.94 },
];

function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

function easeInOutSine(value: number) {
  return -(Math.cos(Math.PI * value) - 1) / 2;
}

function interpolatePose(progress: number) {
  const clamped = clamp01(progress);

  for (let i = 0; i < ROBOT_POSE_KEYFRAMES.length - 1; i += 1) {
    const current = ROBOT_POSE_KEYFRAMES[i];
    const next = ROBOT_POSE_KEYFRAMES[i + 1];

    if (clamped >= current.at && clamped <= next.at) {
      const rawT = (clamped - current.at) / (next.at - current.at);
      const t = easeInOutSine(rawT);

      return {
        j1: THREE.MathUtils.lerp(current.j1, next.j1, t),
        j2: THREE.MathUtils.lerp(current.j2, next.j2, t),
        j3: THREE.MathUtils.lerp(current.j3, next.j3, t),
        j4: THREE.MathUtils.lerp(current.j4, next.j4, t),
        j5: THREE.MathUtils.lerp(current.j5, next.j5, t),
        j6: THREE.MathUtils.lerp(current.j6, next.j6, t),
        groupX: THREE.MathUtils.lerp(current.groupX, next.groupX, t),
        groupY: THREE.MathUtils.lerp(current.groupY, next.groupY, t),
        groupZ: THREE.MathUtils.lerp(current.groupZ, next.groupZ, t),
        cameraX: THREE.MathUtils.lerp(current.cameraX, next.cameraX, t),
        cameraY: THREE.MathUtils.lerp(current.cameraY, next.cameraY, t),
        cameraZ: THREE.MathUtils.lerp(current.cameraZ, next.cameraZ, t),
        lookAheadX: THREE.MathUtils.lerp(current.lookAheadX, next.lookAheadX, t),
        lookAheadY: THREE.MathUtils.lerp(current.lookAheadY, next.lookAheadY, t),
        lookAheadZ: THREE.MathUtils.lerp(current.lookAheadZ, next.lookAheadZ, t),
      };
    }
  }

  return ROBOT_POSE_KEYFRAMES[ROBOT_POSE_KEYFRAMES.length - 1];
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
  const rootBaseRotation = useRef(new THREE.Euler(0.08, -0.18, 0.02));
  const focusTarget = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const { camera } = useThree();
  const { scene } = useGLTF(MODEL_PATH) as GLTFResult;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useEffect(() => {
    clone.traverse((child) => {
      if ("castShadow" in child) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const refs = {
      j1: clone.getObjectByName("j1revolutebone"),
      j2: clone.getObjectByName("j2revolutebone"),
      j3: clone.getObjectByName("j3revolutebone"),
      j4: clone.getObjectByName("j4revolutebone"),
      j5: clone.getObjectByName("j5revolutebone"),
      j6: clone.getObjectByName("j6revolutebone"),
    };
    const wrist3 = clone.getObjectByName("wrist3_Link");

    const missingJoint = Object.entries(refs).find(([, value]) => !value);

    if (missingJoint || !wrist3) {
      onResolveError(new Error(`Failed to resolve FR5 rig at ${missingJoint?.[0] ?? "wrist3"}`));
      return;
    }

    jointsRef.current = refs as RobotJointRefs;
    baseRotationsRef.current = Object.fromEntries(
      (Object.keys(refs) as JointKey[]).map((key) => [key, refs[key]!.rotation.clone()])
    ) as RotationBase;
  }, [clone, onResolveError]);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    rootRef.current.scale.setScalar(0.065);
    rootRef.current.position.set(0.06, -1.95, 0.05);
    rootRef.current.rotation.copy(rootBaseRotation.current);
  }, []);

  useFrame((_, delta) => {
    const wrist3 = clone.getObjectByName("wrist3_Link");

    if (!rootRef.current || !jointsRef.current || !baseRotationsRef.current || !wrist3) {
      return;
    }

    const pose = interpolatePose(progress.get());
    const damping = 1 - Math.exp(-delta * 5.5);

    const applyAxisDelta = (key: JointKey, deltaValue: number) => {
      const joint = jointsRef.current![key];
      const base = baseRotationsRef.current![key];
      joint.rotation.x = THREE.MathUtils.lerp(joint.rotation.x, base.x, damping);
      joint.rotation.y = THREE.MathUtils.lerp(joint.rotation.y, base.y, damping);
      joint.rotation.z = THREE.MathUtils.lerp(joint.rotation.z, base.z, damping);
      joint.rotation[JOINT_AXES[key]] = THREE.MathUtils.lerp(
        joint.rotation[JOINT_AXES[key]],
        base[JOINT_AXES[key]] + deltaValue,
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

    wrist3.getWorldPosition(desiredTarget.current);
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
  const handleSceneError = useCallback((error?: unknown) => {
    console.error("[RobotArmSection] Falling back to static section", error);
    setSceneError(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.55, 0.25, 0.55]);
  const accentGlowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.08, 0.18, 0.2, 0.1]);
  const accentGlowScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.92, 1.08, 0.96]);

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
            camera={{ fov: 32, near: 0.1, far: 100, position: [1.8, 1.9, 7.4] }}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
            className="absolute inset-0 z-[1]"
          >
            <Suspense fallback={null}>
              <RobotScene onResolveError={handleSceneError} progress={scrollYProgress} />
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
              progress={scrollYProgress}
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
