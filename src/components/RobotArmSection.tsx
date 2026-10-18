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
type ArmJointKey = "j2" | "j3" | "j4";
type RobotJointRefs = Record<JointKey, THREE.Object3D>;
type ArmAngles = Record<ArmJointKey, number>;

type GLTFResult = GLTF & {
  scene: THREE.Group;
};

interface ScenePoseKeyframe {
  groupX: number;
  groupY: number;
  groupZ: number;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
}

interface ShowcasePhaseWindow {
  start: number;
  peak: number;
  end: number;
}

/**
 * Arm geometry measured from the rig's rest pose. The FR5 bones carry tilted rest
 * rotations, so hinge axes and link angles are derived from the model rather than assumed.
 */
interface ArmCalibration {
  /** Hinge axis of each arm joint (the arm-plane normal), in that bone's own frame. */
  axes: Record<ArmJointKey, THREE.Vector3>;
  /** Rest quaternion of each arm joint; joint angles are applied on top of it. */
  rest: Record<ArmJointKey, THREE.Quaternion>;
  upperLength: number;
  forearmLength: number;
  /** Rest angle of the upper arm and rest elbow bend, measured in the arm plane. */
  restShoulder: number;
  restElbow: number;
  /** Circle traced by the wrist (j4), in arm-plane coordinates centered on the shoulder. */
  circleCenter: THREE.Vector2;
  circleRadius: number;
  /** Circle center in j1's local frame, used as the camera focus. */
  circleCenterLocal: THREE.Vector3;
}

const ARM_JOINTS: ArmJointKey[] = ["j2", "j3", "j4"];

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

function wrapAngle(value: number) {
  return Math.atan2(Math.sin(value), Math.cos(value));
}

// Radius of the vertical circle traced by the wrist, as a fraction of the arm's full reach.
const CIRCLE_RADIUS_FRACTION = 0.3;

/** Scroll progress → angle travelled around the circle (one full loop over the section). */
function circleAngle(progress: number) {
  return easeInOutSine(clamp01(progress)) * Math.PI * 2;
}

function calibrateArm(joints: RobotJointRefs): ArmCalibration {
  const { j1 } = joints;
  // Work in j1's frame: the base stays static, so the arm plane is fixed there.
  const toJ1 = (bone: THREE.Object3D) => j1.worldToLocal(bone.getWorldPosition(new THREE.Vector3()));
  const shoulder = toJ1(joints.j2);
  const elbow = toJ1(joints.j3);
  const wrist = toJ1(joints.j4);

  const upperArm = elbow.clone().sub(shoulder);
  const forearm = wrist.clone().sub(elbow);
  const planeNormal = upperArm.clone().cross(forearm).normalize();

  // Plane basis: v points up (j1 spins about its local Y), u points outward toward the wrist.
  const v = new THREE.Vector3(0, 1, 0).projectOnPlane(planeNormal).normalize();
  const reach = wrist.clone().sub(shoulder).projectOnPlane(planeNormal);
  const u = reach.sub(v.clone().multiplyScalar(reach.dot(v))).normalize();
  // Right-handed so a positive rotation about the axis turns u toward v.
  const axis = new THREE.Vector3().crossVectors(u, v);

  const to2D = (point: THREE.Vector3) => {
    const offset = point.clone().sub(shoulder);
    return new THREE.Vector2(offset.dot(u), offset.dot(v));
  };
  const upper2D = to2D(elbow);
  const forearm2D = to2D(wrist).sub(upper2D);
  const restShoulder = Math.atan2(upper2D.y, upper2D.x);
  const restElbow = wrapAngle(Math.atan2(forearm2D.y, forearm2D.x) - restShoulder);

  const upperLength = upper2D.length();
  const forearmLength = forearm2D.length();
  const circleRadius = (upperLength + forearmLength) * CIRCLE_RADIUS_FRACTION;
  // The rest wrist position is the top of the circle, so progress 0 is the rest pose.
  const circleCenter = to2D(wrist).sub(new THREE.Vector2(0, circleRadius));

  const j1World = j1.getWorldQuaternion(new THREE.Quaternion());
  const axes = {} as Record<ArmJointKey, THREE.Vector3>;
  const rest = {} as Record<ArmJointKey, THREE.Quaternion>;
  for (const key of ARM_JOINTS) {
    const bone = joints[key];
    const relative = j1World.clone().invert().multiply(bone.getWorldQuaternion(new THREE.Quaternion()));
    axes[key] = axis.clone().applyQuaternion(relative.invert()).normalize();
    rest[key] = bone.quaternion.clone();
  }

  return {
    axes,
    rest,
    upperLength,
    forearmLength,
    restShoulder,
    restElbow,
    circleCenter,
    circleRadius,
    circleCenterLocal: shoulder
      .clone()
      .addScaledVector(u, circleCenter.x)
      .addScaledVector(v, circleCenter.y),
  };
}

/** Joint angles (relative to rest) that put the wrist at `theta` around the circle. */
function solveArmAngles(arm: ArmCalibration, theta: number): ArmAngles {
  // Start at the top of the circle and run clockwise.
  const angle = Math.PI / 2 - theta;
  const tx = arm.circleCenter.x + arm.circleRadius * Math.cos(angle);
  const ty = arm.circleCenter.y + arm.circleRadius * Math.sin(angle);

  const { upperLength: l1, forearmLength: l2 } = arm;
  const cosElbow = THREE.MathUtils.clamp((tx * tx + ty * ty - l1 * l1 - l2 * l2) / (2 * l1 * l2), -1, 1);
  // Keep the elbow on the same side as the rest pose.
  const elbow = Math.sign(arm.restElbow || -1) * Math.acos(cosElbow);
  const shoulder = Math.atan2(ty, tx) - Math.atan2(l2 * Math.sin(elbow), l1 + l2 * Math.cos(elbow));

  const j2 = wrapAngle(shoulder - arm.restShoulder);
  const j3 = wrapAngle(elbow - arm.restElbow);
  // Counter-rotate the wrist so the camera end keeps its rest orientation.
  return { j2, j3, j4: -(j2 + j3) };
}

function interpolatePose(progress: number): ScenePoseKeyframe {
  const theta = circleAngle(progress);

  return {
    groupX: 0,
    groupY: -1.2,
    groupZ: 0,
    // Camera pulled back to frame the 3×-scaled robot.
    cameraX: 1.3  + 1.1  * Math.cos(theta * 0.5),
    cameraY: 1.8  + 0.5  * Math.sin(theta * 0.45),
    cameraZ: 6.5  + 1.0  * Math.cos(theta * 0.6),
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
  const armRef = useRef<ArmCalibration | null>(null);
  const armAngles = useRef<ArmAngles>({ j2: 0, j3: 0, j4: 0 });
  const rootBaseRotation = useRef(new THREE.Euler(0.08, -0.18, 0.02));
  const focusTarget = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const jointRotation = useRef(new THREE.Quaternion());
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
    const missingJoint = Object.entries(refs).find(([, value]) => !value);

    if (missingJoint) {
      onResolveError(new Error(`Failed to resolve FR5 rig at ${missingJoint[0]}`));
      return;
    }

    jointsRef.current = refs as RobotJointRefs;
    armRef.current = calibrateArm(jointsRef.current);
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
    if (!rootRef.current || !jointsRef.current || !armRef.current) {
      return;
    }

    const arm = armRef.current;
    const pose = interpolatePose(progress.get());
    const targetAngles = solveArmAngles(arm, circleAngle(progress.get()));
    const damping = 1 - Math.exp(-delta * 5.5);

    // j1 (base yaw), j5 and j6 stay at rest; the shoulder, elbow and wrist trace the circle.
    for (const key of ARM_JOINTS) {
      armAngles.current[key] = THREE.MathUtils.lerp(armAngles.current[key], targetAngles[key], damping);
      jointsRef.current[key].quaternion
        .copy(arm.rest[key])
        .multiply(jointRotation.current.setFromAxisAngle(arm.axes[key], armAngles.current[key]));
    }

    rootRef.current.position.x = THREE.MathUtils.lerp(rootRef.current.position.x, pose.groupX, damping);
    rootRef.current.position.y = THREE.MathUtils.lerp(rootRef.current.position.y, pose.groupY, damping);
    rootRef.current.position.z = THREE.MathUtils.lerp(rootRef.current.position.z, pose.groupZ, damping);

    // Frame the circle itself rather than chasing the moving wrist, so the loop reads on screen.
    jointsRef.current.j1.localToWorld(desiredTarget.current.copy(arm.circleCenterLocal));
    focusTarget.current.lerp(desiredTarget.current, damping);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pose.cameraX, damping);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pose.cameraY, damping);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, pose.cameraZ, damping);
    camera.lookAt(focusTarget.current);
  });

  useEffect(() => {
    return () => {
      jointsRef.current = null;
      armRef.current = null;
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
