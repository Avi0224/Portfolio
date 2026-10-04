import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simplex 2D Noise
const snoiseGLSL = `
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`

const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  varying float vDepth;
  uniform float uTime;
  
  ${snoiseGLSL}

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Compute elevation using noise
    float noise1 = snoise(pos.xy * 0.03 + vec2(0.0, uTime * 0.05));
    float noise2 = snoise(pos.xy * 0.1 - vec2(uTime * 0.02, 0.0));
    
    float elevation = (noise1 * 3.0) + (noise2 * 0.5);
    pos.z += elevation;
    vElevation = elevation;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vDepth = -mvPosition.z; // Depth from camera for fog
    
    gl_PointSize = 2.0;
  }
`

const linesFragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  varying float vDepth;

  void main() {
    float lines = fract(vElevation * 2.0);
    float fw = fwidth(vElevation * 2.0);
    float lineThickness = 0.01;
    
    float alpha = smoothstep(lineThickness + fw, lineThickness, lines) 
                + smoothstep(1.0 - lineThickness - fw, 1.0 - lineThickness, lines);
    
    if (alpha < 0.05) discard;

    float fogDensity = 0.03;
    float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vDepth * vDepth);
    alpha *= (1.0 - fogFactor);

    // Deep gold/amber line color
    vec3 lineColor = vec3(0.6, 0.3, 0.05); 
    gl_FragColor = vec4(lineColor, alpha * 0.4); 
  }
`

const pointsFragmentShader = `
  varying float vElevation;
  varying float vDepth;
  uniform float uTime;
  
  ${snoiseGLSL}

  void main() {
    vec2 p = gl_PointCoord - 0.5;
    if (length(p) > 0.5) discard;

    if (vElevation < 0.2) discard; 
    
    vec2 pUv = gl_FragCoord.xy * 0.1;
    float sparsity = snoise(pUv);
    if (sparsity < 0.2) discard; 

    float alpha = 0.25;
    
    float fogDensity = 0.03;
    float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vDepth * vDepth);
    alpha *= (1.0 - fogFactor);

    // Bright amber/gold points
    vec3 pointColor = mix(vec3(0.8, 0.4, 0.0), vec3(1.0, 0.7, 0.2), (vElevation) * 0.1); 
    gl_FragColor = vec4(pointColor, alpha);
  }
`

export function Terrain() {
  const linesMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: linesFragmentShader,
    uniforms: {
      uTime: { value: 0 }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  }), [])

  const pointsMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: pointsFragmentShader,
    uniforms: {
      uTime: { value: 0 }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), [])

  const geomRef = useRef<THREE.PlaneGeometry>(null)

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

  useFrame((state) => {
    if (prefersReducedMotion) return
    linesMaterial.uniforms.uTime.value = state.clock.elapsedTime * 2.0
    pointsMaterial.uniforms.uTime.value = state.clock.elapsedTime * 2.0
  })

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -10]}>
      <mesh material={linesMaterial}>
        <planeGeometry ref={geomRef} args={[100, 100, 400, 400]} />
      </mesh>
      {/* Points share the same plane parameters */}
      <points material={pointsMaterial}>
        <planeGeometry args={[100, 100, 400, 400]} />
      </points>
    </group>
  )
}
