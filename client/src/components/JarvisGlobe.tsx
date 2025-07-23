
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface JarvisPrismProps {
  size?: number;
}

const JarvisPrism = ({ size = 300 }: JarvisPrismProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
    camera.position.z = 8;
    camera.position.y = 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    renderer.setSize(size, size);
    
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);

    // Create the prism geometry
    const prismGeometry = new THREE.CylinderGeometry(0, 2, 3, 6);
    
    // Create holographic material for the prism
    const prismMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x00FF00) }, // Green
        color2: { value: new THREE.Color(0x32CD32) }, // Lime green
        color3: { value: new THREE.Color(0x00FFFF) }, // Cyan
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          // Edge detection for wireframe effect
          vec3 pos = vPosition;
          float edge = 0.0;
          
          // Create geometric patterns
          float pattern1 = sin(pos.y * 10.0 + time) * 0.5 + 0.5;
          float pattern2 = cos(pos.x * 8.0 - time * 0.5) * 0.5 + 0.5;
          float pattern3 = sin(length(pos.xz) * 12.0 + time * 2.0) * 0.5 + 0.5;
          
          // Energy lines
          float lines = step(0.9, sin(vUv.y * 20.0 + time * 3.0));
          lines += step(0.95, sin(vUv.x * 15.0 - time * 2.0));
          
          // Fresnel effect for glow
          float fresnel = 1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
          fresnel = pow(fresnel, 2.0);
          
          // Data stream effect
          float dataStream = step(0.97, sin(vUv.y * 50.0 - time * 5.0));
          
          // Color mixing
          vec3 baseColor = mix(color1, color2, pattern1);
          baseColor = mix(baseColor, color3, pattern2 * 0.3);
          
          // Apply effects
          vec3 finalColor = baseColor;
          finalColor = mix(finalColor, vec3(1.0), lines * 0.8);
          finalColor = mix(finalColor, color3, dataStream * 0.6);
          finalColor += fresnel * color1 * 0.5;
          
          // Pulsating alpha
          float pulse = 0.6 + 0.4 * sin(time * 0.8);
          float alpha = pulse * (0.7 + fresnel * 0.3 + lines * 0.3);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const prism = new THREE.Mesh(prismGeometry, prismMaterial);
    scene.add(prism);

    // Create wireframe overlay
    const wireframeGeometry = new THREE.EdgesGeometry(prismGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00FF00, 
      transparent: true, 
      opacity: 0.8 
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Create floating particles around the prism
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00FFFF,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    const particlesVertices = [];
    for (let i = 0; i < 500; i++) {
      const radius = 4 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      particlesVertices.push(x, y, z);
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(particlesVertices, 3)
    );

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create energy rings around the prism
    const ring1Geometry = new THREE.RingGeometry(3.5, 3.7, 32);
    const ring1Material = new THREE.MeshBasicMaterial({
      color: 0x00FF00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);

    const ring2Geometry = new THREE.RingGeometry(4.2, 4.4, 32);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x32CD32,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = Math.PI / 2;
    scene.add(ring2);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00FF00, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate the prism
      prism.rotation.y = elapsedTime * 0.5;
      prism.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
      
      // Rotate wireframe
      wireframe.rotation.y = elapsedTime * 0.5;
      wireframe.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
      
      // Animate rings
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.2;
      
      // Pulse rings
      const pulse1 = Math.sin(elapsedTime * 2) * 0.1 + 0.9;
      const pulse2 = Math.cos(elapsedTime * 1.5) * 0.1 + 0.9;
      ring1.scale.set(pulse1, pulse1, pulse1);
      ring2.scale.set(pulse2, pulse2, pulse2);
      
      // Update shader time
      if (prism.material instanceof THREE.ShaderMaterial) {
        prism.material.uniforms.time.value = elapsedTime;
      }
      
      // Rotate particles
      particles.rotation.y = elapsedTime * 0.1;
      particles.rotation.x = elapsedTime * 0.05;
      
      // Camera orbit
      camera.position.x = Math.sin(elapsedTime * 0.2) * 8;
      camera.position.z = Math.cos(elapsedTime * 0.2) * 8;
      camera.lookAt(0, 0, 0);
      
      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Request next frame
      requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current || !containerRef.current) return;
      
      rendererRef.current.setSize(size, size);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose geometries
      prismGeometry.dispose();
      wireframeGeometry.dispose();
      particlesGeometry.dispose();
      ring1Geometry.dispose();
      ring2Geometry.dispose();
      
      // Dispose materials
      if (prismMaterial) prismMaterial.dispose();
      if (wireframeMaterial) wireframeMaterial.dispose();
      if (particlesMaterial) particlesMaterial.dispose();
      if (ring1Material) ring1Material.dispose();
      if (ring2Material) ring2Material.dispose();
      
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [size]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="jarvis-prism"
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        margin: '0 auto'
      }}
    />
  );
};

export default JarvisPrism;
