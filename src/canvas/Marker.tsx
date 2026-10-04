import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface MarkerProps {
  position: [number, number, number]
  label: string
  onClick?: () => void
  href?: string
}

export function Marker({ position, label, onClick, href }: MarkerProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

  useFrame((state) => {
    if (prefersReducedMotion) return
    if (meshRef.current) {
      // Constant rotation
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x += 0.01

      if (!hovered) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
        meshRef.current.scale.set(scale, scale, scale)
        const mat = meshRef.current.material as THREE.MeshBasicMaterial
        mat.opacity = 0.5
      } else {
        const scale = 1.5
        meshRef.current.scale.set(scale, scale, scale)
        const mat = meshRef.current.material as THREE.MeshBasicMaterial
        mat.opacity = 1.0
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Wireframe Octahedron */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.5} />
      </mesh>
      
      {/* Small Core Dot */}
      <mesh>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>

      <Html center zIndexRange={[100, 0]}>
        <a 
          href={href || '#'}
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              onClick();
            }
          }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="block relative cursor-pointer outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black rounded-full"
          aria-label={label}
        >
          {/* Interactive area */}
          <div className="w-16 h-16 -ml-8 -mt-8 absolute rounded-full" />
          
          {/* Label */}
          <div 
            className={`absolute top-6 left-6 whitespace-nowrap transition-all duration-300 ${hovered ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-0'}`}
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-amber-500/80 tracking-widest uppercase border-b border-amber-500/30 pb-1 mb-1">Target Acquired</span>
              <span className="text-sm text-neutral-200 font-bold tracking-widest uppercase" style={{ textShadow: '0 0 10px rgba(245, 158, 11, 0.5)' }}>
                {label}
              </span>
            </div>
            <div className="absolute -left-2 top-0 bottom-0 w-[1px] bg-amber-500/50" />
            <div className="absolute -left-2 top-0 w-2 h-[1px] bg-amber-500/50" />
            <div className="absolute -left-2 bottom-0 w-2 h-[1px] bg-amber-500/50" />
          </div>
        </a>
      </Html>
    </group>
  )
}
