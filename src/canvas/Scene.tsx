import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Terrain } from './Terrain'
import { CameraRig } from './CameraRig'
import { Marker } from './Marker'
import { projectMarkers, socialMarkers } from '../data/markers'

interface SceneProps {
  eventSource: React.MutableRefObject<HTMLElement | null>;
}

export function Scene({ eventSource }: SceneProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        eventSource={eventSource}
        eventPrefix="client"
        camera={{ position: [0, 5, 10], fov: 50 }}
      >
        <CameraRig />
        <Terrain />
        {projectMarkers.map(m => <Marker key={m.id} {...m} />)}
        {socialMarkers.map(m => <Marker key={m.id} {...m} />)}
        <Preload all />
      </Canvas>
    </div>
  )
}
