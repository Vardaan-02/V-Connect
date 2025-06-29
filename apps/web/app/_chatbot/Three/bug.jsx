"use client"
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function BugModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/BugModel.glb')
  const { actions } = useAnimations(animations, group);

    if (actions["SMALL BUGG IDLE"]) {
      actions["SMALL BUGG IDLE"].play()
    }
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.967}>
          <group name="Root">
            <group name="SMALL_BUG_BONES" position={[-0.065, -0.312, -0.291]} scale={0.344}>
              <primitive object={nodes.SMALL_BUG_BONES_rootJoint} />
              <skinnedMesh
                name="SMALLBUGBODY_0"
                geometry={nodes.SMALLBUGBODY_0.geometry}
                material={materials.ENEMY}
                skeleton={nodes.SMALLBUGBODY_0.skeleton}
              />
              <skinnedMesh
                name="SMALLBUGBODY_1"
                geometry={nodes.SMALLBUGBODY_1.geometry}
                material={materials.material}
                skeleton={nodes.SMALLBUGBODY_1.skeleton}
              />
              <group name="SMALLBUGBODY" position={[0.042, 0.503, 1.212]} scale={2.904} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/BugModel.glb')
