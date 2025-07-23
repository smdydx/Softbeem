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

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
    camera.position.z = 5;
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

    // Create the Earth sphere
    const earthGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    
    // Create a holographic material
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x00FF00) }, // Primary green
        color2: { value: new THREE.Color(0x32CD32) }, // Lime green
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
          // Create a grid pattern with thinner lines and more gaps
          float gridSize = 30.0; // More grid divisions
          vec2 grid = fract(vUv * gridSize);
          float gridLine = max(
            step(0.98, grid.x) * step(grid.x, 0.985), // Much thinner lines
            step(0.98, grid.y) * step(grid.y, 0.985)  // Much thinner lines
          );
          
          // Create longitude/latitude lines - much thinner
          float latLine = step(0.99, abs(sin(vUv.y * 3.14159 * 12.0))); // More lines, thinner
          float longLine = step(0.99, abs(sin(vUv.x * 3.14159 * 24.0))); // More lines, thinner
          
          // Combine grid and long/lat lines
          float lines = max(max(gridLine, latLine), longLine);
          
          // Edge glow effect
          float rim = 1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
          rim = pow(rim, 2.0);
          
          // Pulsating effect
          float pulse = 0.5 + 0.5 * sin(time * 0.5);
          
          // Data points that move
          float dataPoint1 = step(0.98, sin(vUv.x * 50.0 + time) * sin(vUv.y * 50.0 + time * 0.7));
          float dataPoint2 = step(0.98, cos(vUv.x * 40.0 - time * 0.3) * sin(vUv.y * 40.0 + time * 0.5));
          float dataPoints = max(dataPoint1, dataPoint2);
          
          // Scanning line effect
          float scanLine = step(0.98, sin(vUv.y * 3.14159 * 2.0 - time));
          
          // Combine all effects
          vec3 baseColor = mix(color1, color2, rim);
          vec3 finalColor = mix(baseColor * 0.5, baseColor, lines);
          finalColor = mix(finalColor, vec3(1.0, 1.0, 1.0), dataPoints);
          finalColor = mix(finalColor, vec3(1.0, 1.0, 1.0), scanLine * 0.5);
          
          // Apply pulsating opacity - more subtle
          float alpha = 0.5 + 0.2 * pulse;
          // Stronger at edges
          alpha = alpha * (0.4 + rim * 0.3);
          
          gl_FragColor = vec4(finalColor, alpha * (0.2 + lines * 0.4));
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
    });

    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
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

    // Holographic rings
    const ringsGeometry = new THREE.RingGeometry(2.2, 2.3, 64);
    const ringsMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF6E00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const rings = new THREE.Mesh(ringsGeometry, ringsMaterial);
    rings.rotation.x = Math.PI / 2;
    scene.add(rings);

    const rings2Geometry = new THREE.RingGeometry(2.5, 2.55, 64);
    const rings2Material = new THREE.MeshBasicMaterial({
      color: 0xFFA500,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const rings2 = new THREE.Mesh(rings2Geometry, rings2Material);
    rings2.rotation.x = Math.PI / 2;
    scene.add(rings2);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Create service icons orbiting around the globe with technology symbols
    const serviceIcons = [
      { name: 'Blockchain', symbol: '₿', color: 0x00FF00, distance: 3 },
      { name: 'Smart Contract', symbol: '⚡', color: 0x32CD32, distance: 3.2 },
      { name: 'Mobile App', symbol: '📱', color: 0x0097FB, distance: 3.4 },
      { name: 'Web Dev', symbol: '🌐', color: 0xFF6E00, distance: 3.6 },
      { name: 'IT Services', symbol: '💻', color: 0xFFA500, distance: 3.8 },
      { name: 'Legal', symbol: '⚖️', color: 0x9932CC, distance: 4.0 },
      { name: 'Token', symbol: '🪙', color: 0xFF4500, distance: 4.2 },
      { name: 'Game Dev', symbol: '🎮', color: 0x00CED1, distance: 4.4 }
    ];

    const orbitingElements = [];
    
    serviceIcons.forEach((service, index) => {
      // Create a plane geometry for the icon background
      const iconBgGeometry = new THREE.PlaneGeometry(0.3, 0.3);
      const iconBgMaterial = new THREE.MeshBasicMaterial({
        color: service.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      const iconBgMesh = new THREE.Mesh(iconBgGeometry, iconBgMaterial);
      
      // Create a canvas texture for the technology symbol
      const canvas = document.createElement('canvas');
      const size = 128;
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Clear canvas
        context.fillStyle = 'transparent';
        context.fillRect(0, 0, size, size);
        
        // Create gradient background
        const gradient = context.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
        gradient.addColorStop(0, `rgba(${(service.color >> 16) & 255}, ${(service.color >> 8) & 255}, ${service.color & 255}, 0.3)`);
        gradient.addColorStop(1, `rgba(${(service.color >> 16) & 255}, ${(service.color >> 8) & 255}, ${service.color & 255}, 0.1)`);
        context.fillStyle = gradient;
        context.fillRect(0, 0, size, size);
        
        // Draw the technology symbol
        context.fillStyle = `rgb(${(service.color >> 16) & 255}, ${(service.color >> 8) & 255}, ${service.color & 255})`;
        context.font = 'bold 64px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(service.symbol, size/2, size/2);
        
        // Add glow effect
        context.shadowColor = `rgb(${(service.color >> 16) & 255}, ${(service.color >> 8) & 255}, ${service.color & 255})`;
        context.shadowBlur = 10;
        context.fillText(service.symbol, size/2, size/2);
      }
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      
      // Create the icon mesh with the texture
      const iconGeometry = new THREE.PlaneGeometry(0.4, 0.4);
      const iconMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        alphaTest: 0.01
      });
      const iconMesh = new THREE.Mesh(iconGeometry, iconMaterial);
      
      // Create outer glowing ring
      const outerRingGeometry = new THREE.RingGeometry(0.25, 0.28, 32);
      const outerRingMaterial = new THREE.MeshBasicMaterial({
        color: service.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const outerRingMesh = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
      
      // Create inner glowing ring
      const innerRingGeometry = new THREE.RingGeometry(0.22, 0.24, 32);
      const innerRingMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
      });
      const innerRingMesh = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
      
      // Group all elements together
      const iconGroup = new THREE.Group();
      iconGroup.add(iconBgMesh);
      iconGroup.add(iconMesh);
      iconGroup.add(outerRingMesh);
      iconGroup.add(innerRingMesh);
      
      // Position the icon
      const angle = (index / serviceIcons.length) * Math.PI * 2;
      iconGroup.position.set(
        Math.cos(angle) * service.distance,
        Math.sin(angle * 0.5) * 0.8, // More vertical variation
        Math.sin(angle) * service.distance
      );
      
      // Store service info for animation
      iconGroup.userData = {
        originalDistance: service.distance,
        angleOffset: angle,
        speed: 0.2 + (index * 0.05), // Slower, more varied speeds
        verticalOffset: Math.sin(angle * 2) * 0.5,
        originalScale: 1
      };
      
      scene.add(iconGroup);
      orbitingElements.push(iconGroup);
    });

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate the earth
      earth.rotation.y = elapsedTime * 0.1;
      
      // Pulse the rings
      const pulse = Math.sin(elapsedTime * 0.5) * 0.1 + 0.9;
      rings.scale.set(pulse, pulse, pulse);
      rings2.scale.set(1.05 - pulse * 0.05, 1.05 - pulse * 0.05, 1.05 - pulse * 0.05);
      
      // Update shader time
      if (earth.material instanceof THREE.ShaderMaterial) {
        earth.material.uniforms.time.value = elapsedTime;
      }
      
      // Rotate the stars slowly
      stars.rotation.y = elapsedTime * 0.02;
      
      // Animate orbiting service icons
      orbitingElements.forEach((element, index) => {
        const userData = element.userData;
        const currentAngle = userData.angleOffset + (elapsedTime * userData.speed);
        
        // Smooth orbital motion with floating effect
        const floatOffset = Math.sin(elapsedTime * 2 + index) * 0.1;
        element.position.set(
          Math.cos(currentAngle) * userData.originalDistance,
          Math.sin(currentAngle * 0.7) * 0.8 + userData.verticalOffset + floatOffset,
          Math.sin(currentAngle) * userData.originalDistance
        );
        
        // Gentle rotation of the entire icon group
        element.rotation.z = Math.sin(elapsedTime * 0.5 + index) * 0.1;
        
        // Enhanced pulsing effect with breathing animation
        const pulseFactor = 0.9 + Math.sin(elapsedTime * 2 + index * 0.7) * 0.3;
        const breathingFactor = 0.95 + Math.sin(elapsedTime * 0.8 + index) * 0.05;
        const finalScale = pulseFactor * breathingFactor;
        element.scale.set(finalScale, finalScale, finalScale);
        
        // Make icons face the camera for better visibility
        element.lookAt(cameraRef.current.position);
        
        // Animate individual children for more dynamic effect
        element.children.forEach((child, childIndex) => {
          if (childIndex === 2 || childIndex === 3) { // Rings
            child.rotation.z += 0.01 * (childIndex === 2 ? 1 : -1);
            const ringPulse = 0.8 + Math.sin(elapsedTime * 4 + index + childIndex) * 0.2;
            child.scale.set(ringPulse, ringPulse, ringPulse);
          }
        });
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
