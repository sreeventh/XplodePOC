import React, { useState, useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

export default function Machineplode({ toggleExplode }) {
  const { nodes, materials } = useGLTF("./machine.gltf");
  const [exploded, setExploded] = useState(false);
  const [transparentParts, setTransparentParts] = useState({});

  const handleClick = (e) => {
    e.stopPropagation();
    if ( localStorage.getItem("cursor") === "crosshair") {
      const name = e.object.name;
      setTransparentParts((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    } else if ( localStorage.getItem("cursor") === "default") {
      setExploded((prev) => !prev);
      if (toggleExplode) toggleExplode();
    }
  };

  const getExplodedPosition = (index) => {
    const angle = (index / 350) * Math.PI * 2;
    return [
      Math.cos(angle) * 40,
      Math.sin(angle) * 40,
      (Math.random() - 0.5) * 40,
    ];
  };

  return (
    <group
      onClick={handleClick}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      dispose={null}
    >
      {Object.entries(nodes).map(([name, node], index) => {
        if (node.geometry) {
          const targetPosition = getExplodedPosition(index);
          const { position } = useSpring({
            position: exploded ? targetPosition : [0, 0, 0],
            config: { mass: 1, tension: 180, friction: 12 },
          });

          const material = materials[node.material?.name || "default"].clone();
          if (transparentParts[name]) {
            material.transparent = true;
            material.opacity = 0.5;
          }

          return (
            <animated.mesh
              key={name}
              geometry={node.geometry}
              material={material}
              position={position}
              name={name}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

useGLTF.preload("./machine.gltf");