import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export function CameraRig() {
  const { camera } = useThree()
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0))
  // Start further back for a zoomed-out wide shot
  const basePosition = useRef(new THREE.Vector3(0, 15, 45))
  // The point the camera should ideally look at
  const baseTarget = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    })

    // 1. Initial drift (Hero -> About) - zoom in
    tl.to(basePosition.current, {
      x: 0,
      y: 12,
      z: 25,
      ease: "power2.inOut"
    }, 0) // Start at time 0
    tl.to(baseTarget.current, {
      x: 0,
      y: 0,
      z: 5,
      ease: "power2.inOut"
    }, 0)

    // 2. Project waypoints
    let timeOffset = 1;
    projects.forEach((proj) => {
      // Move camera
      tl.to(basePosition.current, {
        x: proj.waypoint[0],
        y: proj.waypoint[1] + 2, 
        z: proj.waypoint[2] + 8, 
        ease: "power2.inOut"
      }, timeOffset)
      
      // Move look target to look directly at the marker
      // The marker is at [proj.waypoint[0], proj.waypoint[1] - 3, proj.waypoint[2] - 5]
      tl.to(baseTarget.current, {
        x: proj.waypoint[0],
        y: proj.waypoint[1] - 3,
        z: proj.waypoint[2] - 5,
        ease: "power2.inOut"
      }, timeOffset)

      timeOffset += 1;
    })

    // 3. Final Overview Pose (Contact)
    tl.to(basePosition.current, {
      x: 0,
      y: 20,
      z: 15,
      ease: "power3.out"
    }, timeOffset)
    tl.to(baseTarget.current, {
      x: 0,
      y: 5,
      z: 0,
      ease: "power3.out"
    }, timeOffset)

    return () => {
      tl.kill()
    }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime * 2.0
    
    const driftX = Math.sin(t * 0.15) * 3.0
    const driftY = Math.cos(t * 0.1) * 1.5
    const driftZ = Math.sin(t * 0.05) * 2.0

    camera.position.x = basePosition.current.x + driftX
    camera.position.y = basePosition.current.y + driftY
    camera.position.z = basePosition.current.z + driftZ

    // Smoothly track the base target with some drift
    lookAtTarget.current.x = baseTarget.current.x + driftX * 0.5
    lookAtTarget.current.y = baseTarget.current.y + driftY * 0.5
    lookAtTarget.current.z = baseTarget.current.z + driftZ * 0.5
    camera.lookAt(lookAtTarget.current)
  })

  return null
}
