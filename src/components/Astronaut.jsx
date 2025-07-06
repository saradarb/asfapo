import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useMotionValue, useSpring } from "motion/react";
import { useFrame } from "@react-three/fiber";

export function Astronaut(props) {
  const group = useRef();

  // 🛠 Fix: move model path *inside* the component
  const modelPath = `${import.meta.env.BASE_URL}assets/models/tenhun_falling_spaceman_fanart.glb`;
  const { nodes, materials, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, { damping: 30 });

  useEffect(() => {
    ySpring.set(-1);
  }, [ySpring]);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = ySpring.get();
    }
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation={[-Math.PI / 2, -0.2, 2.2]}
      scale={props.scale || 0.3}
      position={props.position || [1.3, -1, 0]}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model">
          <group name="Root">
            <group name="metarig">
              <primitive object={nodes.metarig_rootJoint} />
              {[
                "Cube001_0",
                "Cube005_0",
                "Cube002_0",
                "Plane_0",
                "Cube008_0",
                "Cube004_0",
                "Cube003_0",
                "Cube_0",
                "Cube009_0",
                "Cube011_0",
              ].map((name) => (
                <skinnedMesh
                  key={name}
                  name={name}
                  geometry={nodes[name].geometry}
                  material={materials["AstronautFallingTexture.png"]}
                  skeleton={nodes[name].skeleton}
                />
              ))}
              {/* Optional static groups */}
              {[
                "Cube001",
                "Cube005",
                "Cube002",
                "Plane",
                "Cube008",
                "Cube004",
                "Cube003",
                "Cube",
                "Cube009",
                "Cube011",
              ].map((name) => (
                <group
                  key={name}
                  name={name}
                  {...(name === "Cube009"
                    ? { rotation: [-2.708, 0.013, -1.447], scale: 1.307 }
                    : {})}
                />
              ))}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// Preload the model path dynamically inside a function
useGLTF.preload(`${import.meta.env.BASE_URL}assets/models/tenhun_falling_spaceman_fanart.glb`);
