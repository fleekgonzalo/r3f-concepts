'use client'

import * as THREE from 'three'
import { Experience } from '@/components/Experience'
import { Canvas } from '@react-three/fiber'

export default function Home() {
  return (
    <Canvas
      dpr={[1, 2]} // default value from R3F
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }} // default value from R3F
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [3, 2, 6],
      }}
    >
      <Experience />
    </Canvas>
  )
}
