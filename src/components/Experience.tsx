/* eslint-disable react/no-unknown-property */
'use client'

// import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group, Mesh } from 'three'
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls, button } from 'leva'
import { Perf } from 'r3f-perf'

export function Experience() {
  const { perfVisible } = useControls({
    perfVisible: false,
  })

  const { position, color, visible } = useControls('sphere', {
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
      joystick: 'invertY',
    },
    color: '#ff0000',
    visible: true,
    clickMe: button(() => {
      console.log('Ok!')
    }),
    choice: {
      options: ['a', 'b', 'c'],
    },
  })

  const { scale } = useControls('cube', {
    scale: {
      value: 1.5,
      step: 0.01,
      min: 0,
      max: 5,
    },
  })

  const cube = useRef<Mesh>(null!)
  const sphere = useRef<Mesh>(null!)
  const groupRef = useRef<Group>(null!)

  // Everything you place inside useFrame will animate and happen on each app frame linearly
  // useFrame((state, delta) => {
  // const angle = state.clock.elapsedTime
  // state.camera.position.x = Math.sin(angle) * 8
  // state.camera.position.z = Math.cos(angle) * 8
  // state.camera.lookAt(0, 0, 0)

  // cube.current.rotation.y += delta
  // groupRef.current.rotation.y += delta
  // })

  useFrame((state, delta) => {
    cube.current.rotation.x += delta
    cube.current.rotation.z += delta
  })

  return (
    <>
      {perfVisible ? <Perf position="top-left" /> : null}

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <PivotControls anchor={[0, 0, 0]} depthTest={false} lineWidth={4}>
          <mesh
            ref={sphere}
            position={[position.x, position.y, 0]}
            visible={visible}
          >
            <sphereGeometry />
            <meshStandardMaterial color={color} />
            <Html
              distanceFactor={8}
              occlude={[sphere, cube]}
              center
              position={[1, 1, 0]}
              className="absolute bg-black/50 text-white p-4 whitespace-nowrap overflow-hidden rounded-[30px] select-none"
            >
              That´s a sphere
            </Html>
          </mesh>
        </PivotControls>

        <Float speed={5} floatIntensity={2}>
          <mesh
            ref={cube}
            position-x={2}
            scale={scale}
            rotation-y={Math.PI * 0.25}
          >
            <boxGeometry />
            <meshStandardMaterial color="#307244" />
          </mesh>
          <TransformControls object={cube} mode="translate" />
        </Float>
      </group>
      <mesh scale={10} position={[0.5, -1.5, -1.5]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial
          mirror={0.75}
          color="#1A2122"
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
        />
      </mesh>

      <Text position-y={2} position-z={-5} maxWidth={2} textAlign="center">
        I LOVE R3F
        <meshNormalMaterial />
      </Text>
    </>
  )
}
