import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Code, Smartphone, FileText, Shield, Coins, Server, Globe as GlobeIcon, Gamepad2 } from 'lucide-react';

interface JarvisGlobeProps {
  size?: number;
}

const JarvisGlobe = ({ size = 300 }: JarvisGlobeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene, camera, and renderer with optimized settings
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable for better performance
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    renderer.setSize(size, size);
    
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);

    // Create the Earth sphere with lower geometry complexity
    const earthGeometry = new THREE.SphereGeometry(1.5, 16, 16);
    
    // Create a simplified holographic material
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x00FF00) },
        color2: { value: new THREE.Color(0x32FF32) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          // Simplified grid pattern
          float gridSize = 15.0;
          vec2 grid = fract(vUv * gridSize);
          float gridLine = max(
            step(0.95, grid.x),
            step(0.95, grid.y)
          );
          
          // Simplified longitude/latitude lines
          float latLine = step(0.98, abs(sin(vUv.y * 3.14159 * 6.0)));
          float longLine = step(0.98, abs(sin(vUv.x * 3.14159 * 12.0)));
          
          float lines = max(max(gridLine, latLine), longLine);
          
          // Simplified edge glow
          float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          rim = pow(rim, 1.5);
          
          // Simplified pulse
          float pulse = 0.7 + 0.3 * sin(time * 0.5);
          
          vec3 baseColor = mix(color1, color2, rim);
          vec3 finalColor = mix(baseColor * 0.6, baseColor, lines);
          
          float alpha = 0.4 + rim * 0.3;
          
          gl_FragColor = vec4(finalColor, alpha * (0.3 + lines * 0.3) * pulse);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Reduce stars count for better performance
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.3,
    });

    const starsVertices = [];
    for (let i = 0; i < 300; i++) { // Reduced from 1000 to 300
      const x = THREE.MathUtils.randFloatSpread(10);
      const y = THREE.MathUtils.randFloatSpread(10);
      const z = THREE.MathUtils.randFloatSpread(10);
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Simplified rings with lower geometry
    const ringsGeometry = new THREE.RingGeometry(2.2, 2.3, 32);
    const ringsMaterial = new THREE.MeshBasicMaterial({
      color: 0x32FF32,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const rings = new THREE.Mesh(ringsGeometry, ringsMaterial);
    rings.rotation.x = Math.PI / 2;
    scene.add(rings);

    const rings2Geometry = new THREE.RingGeometry(2.5, 2.55, 32);
    const rings2Material = new THREE.MeshBasicMaterial({
      color: 0x00FF00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const rings2 = new THREE.Mesh(rings2Geometry, rings2Material);
    rings2.rotation.x = Math.PI / 2;
    scene.add(rings2);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Simplified service icons for better performance
    const serviceIcons = [
      { name: 'Blockchain', symbol: '₿', color: 0x32FF32, distance: 3 },
      { name: 'Mobile App', symbol: '📱', color: 0x00FF00, distance: 3.4 },
      { name: 'Web Dev', symbol: '🌐', color: 0x66FF66, distance: 3.8 },
      { name: 'Legal', symbol: '⚖️', color: 0x00CC00, distance: 4.2 }
    ];

    const orbitingElements = [];
    
    serviceIcons.forEach((service, index) => {
      // Simplified canvas texture creation
      const canvas = document.createElement('canvas');
      const size = 64; // Reduced size for better performance
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');
      
      if (context) {
        context.fillStyle = 'transparent';
        context.fillRect(0, 0, size, size);
        
        // Simplified gradient
        context.fillStyle = `rgba(${(service.color >> 16) & 255}, ${(service.color >> 8) & 255}, ${service.color & 255}, 0.8)`;
        context.font = 'bold 32px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(service.symbol, size/2, size/2);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      
      // Single icon mesh instead of multiple components
      const iconGeometry = new THREE.PlaneGeometry(0.3, 0.3);
      const iconMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        alphaTest: 0.1
      });
      const iconMesh = new THREE.Mesh(iconGeometry, iconMaterial);
      
      // Position the icon
      const angle = (index / serviceIcons.length) * Math.PI * 2;
      iconMesh.position.set(
        Math.cos(angle) * service.distance,
        Math.sin(angle * 0.5) * 0.5,
        Math.sin(angle) * service.distance
      );
      
      // Store service info for animation
      iconMesh.userData = {
        originalDistance: service.distance,
        angleOffset: angle,
        speed: 0.15 + (index * 0.03),
        verticalOffset: Math.sin(angle * 2) * 0.3
      };
      
      scene.add(iconMesh);
      orbitingElements.push(iconMesh);
    });

    // Optimized animation loop with reduced frame rate
    const clock = new THREE.Clock();
    let frameCount = 0;
    
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      
      frameCount++;
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate the earth
      earth.rotation.y = elapsedTime * 0.08;
      
      // Update shader time (less frequently for performance)
      if (frameCount % 2 === 0 && earth.material instanceof THREE.ShaderMaterial) {
        earth.material.uniforms.time.value = elapsedTime;
      }
      
      // Pulse the rings (less frequently)
      if (frameCount % 3 === 0) {
        const pulse = Math.sin(elapsedTime * 0.4) * 0.08 + 0.92;
        rings.scale.set(pulse, pulse, pulse);
        rings2.scale.set(1.03 - pulse * 0.03, 1.03 - pulse * 0.03, 1.03 - pulse * 0.03);
      }
      
      // Rotate the stars slowly
      stars.rotation.y = elapsedTime * 0.015;
      
      // Animate orbiting service icons (simplified)
      orbitingElements.forEach((element, index) => {
        const userData = element.userData;
        const currentAngle = userData.angleOffset + (elapsedTime * userData.speed);
        
        // Simplified orbital motion
        element.position.set(
          Math.cos(currentAngle) * userData.originalDistance,
          Math.sin(currentAngle * 0.5) * 0.4 + userData.verticalOffset,
          Math.sin(currentAngle) * userData.originalDistance
        );
        
        // Simplified rotation and scaling
        if (frameCount % 4 === 0) {
          element.rotation.z = Math.sin(elapsedTime * 0.3 + index) * 0.05;
          const scale = 0.95 + Math.sin(elapsedTime * 1.5 + index) * 0.1;
          element.scale.set(scale, scale, scale);
        }
        
        // Make icons face the camera
        element.lookAt(cameraRef.current.position);
      });
      
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
      
      if (earth.geometry) earth.geometry.dispose();
      if (earth.material) {
        if (Array.isArray(earth.material)) {
          earth.material.forEach((m: THREE.Material) => m.dispose());
        } else {
          earth.material.dispose();
        }
      }
      
      if (starsGeometry) starsGeometry.dispose();
      if (starsMaterial) starsMaterial.dispose();
      
      if (ringsGeometry) ringsGeometry.dispose();
      if (ringsMaterial) ringsMaterial.dispose();
      
      if (rings2Geometry) rings2Geometry.dispose();
      if (rings2Material) rings2Material.dispose();
      
      // Clean up orbiting elements
      orbitingElements.forEach(element => {
        if (element.geometry) element.geometry.dispose();
        if (element.material) {
          if (Array.isArray(element.material)) {
            element.material.forEach((m: THREE.Material) => m.dispose());
          } else {
            element.material.dispose();
          }
        }
        element.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m: THREE.Material) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      });
      
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [size]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="jarvis-globe"
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        margin: '0 auto'
      }}
    />
  );
};

export default JarvisGlobe;
