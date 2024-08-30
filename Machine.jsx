import React, { useState, useRef } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

export default function Machine({ toggleExplode }) {
  const { nodes, materials } = useGLTF('/machine.gltf')
  const [exploded, setExploded] = useState(false)
  const [hoveredPart, setHoveredPart] = useState(null)

  const handleClick = (e) => {
    e.stopPropagation()
    setExploded(!exploded)
    if (toggleExplode) toggleExplode()
  }

  const getExplodedPosition = (index) => {
    const angle = (index / 350) * Math.PI * 2
    return [
      Math.cos(angle) * 40,
      Math.sin(angle) * 40,
      (Math.random() - 0.5) * 40
    ]
  }

  return (
    <group onClick={handleClick} dispose={null}>
      {Object.entries(nodes).map(([name, node], index) => {
        if (node.geometry) {
          const targetPosition = getExplodedPosition(index)
          const { position } = useSpring({
            position: exploded ? targetPosition : [0, 0, 0],
            config: { mass: 1, tension: 180, friction: 12 }
          })

          return (
            <animated.mesh
              key={name}
              geometry={node.geometry}
              material={materials[node.material?.name || 'default']}
              position={position}
              onPointerOver={(e) => {
                e.stopPropagation()
                setHoveredPart(name)
              }}
              onPointerOut={(e) => {
                e.stopPropagation()
                setHoveredPart(null)
              }}
            >
              {hoveredPart === name && (
                <Html
                  position={[0, 0, 0]}
                  center
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '2px 5px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    userSelect: 'none'
                  }}
                >
                  {name}
                </Html>
              )}
            </animated.mesh>
          )
        }
        return null
      })}
    </group>
  )
}

useGLTF.preload('/machine.gltf')