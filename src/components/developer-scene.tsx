"use client";

import { Float, Preload } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type ViewportTier = "mobile" | "tablet" | "desktop";

function useViewportTier(): ViewportTier {
  const [tier, setTier] = useState<ViewportTier>("desktop");

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setTier(width < 640 ? "mobile" : width < 1024 ? "tablet" : "desktop");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return tier;
}

function ResponsiveCamera() {
  const tier = useViewportTier();
  const { camera } = useThree();

  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;

    if (tier === "mobile") {
      perspective.position.set(0, 0.38, 4.35);
      perspective.fov = 50;
      perspective.lookAt(0, -0.22, 0);
    } else if (tier === "tablet") {
      perspective.position.set(0, 0.72, 5.35);
      perspective.fov = 45;
      perspective.lookAt(0, -0.08, 0);
    } else {
      perspective.position.set(0, 1.0, 6.4);
      perspective.fov = 43;
      perspective.lookAt(0, 0, 0);
    }

    perspective.updateProjectionMatrix();
  }, [camera, tier]);

  return null;
}

function ParticleField({ compact = false }: { compact?: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = compact ? 320 : 650;
    const buffer = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 2.1 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 3.7;

      buffer[i * 3] = Math.cos(angle) * radius;
      buffer[i * 3 + 1] = height;
      buffer[i * 3 + 2] = Math.sin(angle) * radius - 0.8;
    }

    return buffer;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.035;
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.035;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#6ee7ff"
        depthWrite={false}
        opacity={compact ? 0.48 : 0.72}
        size={compact ? 0.014 : 0.018}
        sizeAttenuation
      />
    </points>
  );
}

function CodeStrips() {
  const strips = useMemo(
    () =>
      Array.from({ length: 17 }, (_, index) => ({
        x: -0.92 + (index % 3) * 0.34,
        y: 0.48 - Math.floor(index / 3) * 0.18,
        width: 0.18 + ((index * 7) % 5) * 0.075,
        color: index % 4 === 0 ? "#22d3ee" : index % 5 === 0 ? "#a78bfa" : "#dffaff"
      })),
    []
  );

  return (
    <group position={[0, 0.47, -0.76]} rotation={[-0.14, 0, 0]}>
      {strips.map((strip, index) => (
        <mesh key={index} position={[strip.x, strip.y, 0.062]}>
          <boxGeometry args={[strip.width, 0.028, 0.01]} />
          <meshStandardMaterial
            color={strip.color}
            emissive={strip.color}
            emissiveIntensity={1.55}
            transparent
            opacity={index % 3 === 0 ? 0.95 : 0.65}
          />
        </mesh>
      ))}
    </group>
  );
}

function Laptop() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.045;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.09;
  });

  const keys = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        x: -1.05 + (index % 10) * 0.235,
        z: -0.2 + Math.floor(index / 10) * 0.18,
        width: index % 10 === 9 ? 0.16 : 0.145
      })),
    []
  );

  return (
    <group ref={group} rotation={[0.12, -0.32, 0]} position={[0, -0.25, 0]}>
      <mesh position={[0, -0.72, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[3.15, 0.12, 1.88]} />
        <meshStandardMaterial
          color="#c4d7ef"
          metalness={0.72}
          roughness={0.23}
          emissive="#102031"
          emissiveIntensity={0.24}
        />
      </mesh>
      <mesh position={[0, -0.63, 0.2]}>
        <boxGeometry args={[2.9, 0.035, 1.48]} />
        <meshStandardMaterial color="#111928" metalness={0.25} roughness={0.55} />
      </mesh>
      {keys.map((key, index) => (
        <mesh key={index} position={[key.x, -0.585, key.z + 0.25]}>
          <boxGeometry args={[key.width, 0.018, 0.07]} />
          <meshStandardMaterial
            color={index % 6 === 0 ? "#21d4fd" : "#d7e6f7"}
            emissive={index % 6 === 0 ? "#0bbbdc" : "#44576c"}
            emissiveIntensity={index % 6 === 0 ? 0.95 : 0.2}
          />
        </mesh>
      ))}
      <mesh position={[0.03, -0.574, 0.84]}>
        <boxGeometry args={[0.72, 0.016, 0.29]} />
        <meshStandardMaterial color="#222d3d" metalness={0.34} roughness={0.4} />
      </mesh>
      <mesh position={[-1.14, -0.51, -0.64]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.28, 22]} />
        <meshStandardMaterial color="#b5c7dc" metalness={0.82} roughness={0.22} />
      </mesh>
      <mesh position={[1.14, -0.51, -0.64]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.28, 22]} />
        <meshStandardMaterial color="#b5c7dc" metalness={0.82} roughness={0.22} />
      </mesh>
      <group position={[0, 0.15, -0.66]} rotation={[-0.14, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.78, 1.8, 0.105]} />
          <meshStandardMaterial
            color="#101826"
            metalness={0.58}
            roughness={0.24}
            emissive="#101d33"
            emissiveIntensity={0.45}
          />
        </mesh>
        <mesh position={[0, 0, 0.065]}>
          <boxGeometry args={[2.46, 1.48, 0.018]} />
          <meshStandardMaterial
            color="#07111c"
            emissive="#0d8ce8"
            emissiveIntensity={0.65}
            roughness={0.28}
          />
        </mesh>
        <mesh position={[0, 0, 0.078]}>
          <planeGeometry args={[2.2, 1.2]} />
          <meshBasicMaterial
            color="#17d8ff"
            transparent
            opacity={0.09}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
      <CodeStrips />
    </group>
  );
}

function SkillOrbit() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => {
        const angle = (index / 16) * Math.PI * 2;
        const ring = index % 2 === 0 ? 1.1 : 1.42;
        return {
          x: Math.cos(angle) * ring,
          y: Math.sin(angle * 1.3) * 0.42,
          z: Math.sin(angle) * ring,
          color: index % 3 === 0 ? "#22d3ee" : index % 3 === 1 ? "#a78bfa" : "#34d399"
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.24;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.35) * 0.16;
  });

  return (
    <group ref={group} position={[1.9, 0.78, -0.95]} scale={0.88}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.28, 0.008, 8, 128]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0.92, 0.2, 0.74]}>
        <torusGeometry args={[1.06, 0.007, 8, 128]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0.24, 1.25, 0.18]}>
        <torusGeometry args={[0.78, 0.006, 8, 128]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.45} />
      </mesh>
      {nodes.map((node, index) => (
        <mesh key={index} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.052, 18, 18]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={1.8}
          />
        </mesh>
      ))}
      <mesh>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color="#f8fbff"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
          metalness={0.35}
          roughness={0.18}
        />
      </mesh>
    </group>
  );
}

function NetworkGraph() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: 11 }, (_, index) => {
        const angle = (index / 11) * Math.PI * 2;
        return {
          x: Math.cos(angle) * (0.95 + (index % 3) * 0.17),
          y: Math.sin(index * 1.85) * 0.42,
          z: Math.sin(angle) * (0.86 + (index % 4) * 0.11)
        };
      }),
    []
  );

  const edges = useMemo(() => {
    const buffer: number[] = [];
    nodes.forEach((node, index) => {
      const target = nodes[(index + 2) % nodes.length];
      buffer.push(node.x, node.y, node.z, target.x, target.y, target.z);
    });
    return new Float32Array(buffer);
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = -clock.elapsedTime * 0.18;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.04;
  });

  return (
    <group ref={group} position={[-1.98, 0.92, -1.14]} scale={0.82}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.38} />
      </lineSegments>
      {nodes.map((node, index) => (
        <mesh key={index} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[index % 4 === 0 ? 0.064 : 0.044, 18, 18]} />
          <meshBasicMaterial color={index % 3 === 0 ? "#a78bfa" : "#67e8f9"} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingPanels() {
  const panels = useMemo(
    () => [
      { position: [-2.42, -0.34, 0.54], rotation: [0.08, 0.64, -0.08], color: "#22d3ee" },
      { position: [2.42, -0.16, 0.38], rotation: [0.04, -0.62, 0.09], color: "#a78bfa" },
      { position: [0.82, 1.78, -0.58], rotation: [-0.4, -0.18, 0.12], color: "#34d399" }
    ],
    []
  );

  return (
    <group>
      {panels.map((panel, index) => (
        <Float key={index} speed={1.2 + index * 0.2} rotationIntensity={0.25} floatIntensity={0.25}>
          <mesh position={panel.position as [number, number, number]} rotation={panel.rotation as [number, number, number]}>
            <boxGeometry args={[0.82, 0.5, 0.018]} />
            <meshStandardMaterial
              color="#07111c"
              emissive={panel.color}
              emissiveIntensity={0.34}
              transparent
              opacity={0.76}
              roughness={0.28}
              metalness={0.35}
            />
          </mesh>
          <mesh position={[panel.position[0], panel.position[1] + 0.12, panel.position[2] + 0.018]} rotation={panel.rotation as [number, number, number]}>
            <boxGeometry args={[0.52, 0.024, 0.012]} />
            <meshBasicMaterial color={panel.color} transparent opacity={0.88} />
          </mesh>
          <mesh position={[panel.position[0] - 0.1, panel.position[1] - 0.03, panel.position[2] + 0.02]} rotation={panel.rotation as [number, number, number]}>
            <boxGeometry args={[0.34, 0.018, 0.012]} />
            <meshBasicMaterial color="#f8fbff" transparent opacity={0.56} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ReactiveRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.22, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.13, 4, delta);
  });

  return <group ref={group}>{children}</group>;
}

function SceneContents() {
  const tier = useViewportTier();
  const isMobile = tier === "mobile";

  return (
    <>
      <ResponsiveCamera />
      <ambientLight intensity={isMobile ? 0.92 : 0.78} />
      <directionalLight position={[4, 5, 5]} intensity={isMobile ? 1.35 : 1.15} color="#f8fbff" />
      <pointLight position={[-3, 2, 2]} intensity={isMobile ? 1.35 : 1.7} color="#22d3ee" />
      <pointLight position={[3, 1, 1]} intensity={isMobile ? 1.05 : 1.25} color="#a78bfa" />
      <group scale={isMobile ? 1.22 : 1}>
        <ReactiveRig>
          <ParticleField compact={isMobile} />
          <Float speed={1.05} rotationIntensity={isMobile ? 0.08 : 0.13} floatIntensity={isMobile ? 0.12 : 0.18}>
            <Laptop />
          </Float>
          {!isMobile && <SkillOrbit />}
          {!isMobile && <NetworkGraph />}
          {!isMobile && <FloatingPanels />}
        </ReactiveRig>
      </group>
      <Preload all />
    </>
  );
}

export function DeveloperScene() {
  return (
    <div className="relative h-[22rem] w-full overflow-visible sm:h-[26rem] md:h-[38rem] lg:h-[44rem]">
      <div className="absolute inset-x-4 bottom-8 h-24 rounded-full bg-cyan-300/[0.15] blur-3xl" />
      <Canvas
        camera={{ position: [0, 1.0, 6.4], fov: 43 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
