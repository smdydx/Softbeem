
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
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.background = 'transparent';
    renderer.domElement.style.border = 'none';
    renderer.domElement.style.outline = 'none';
    rendererRef.current = renderer;
    renderer.setSize(size, size);
    
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);

    // Create the Earth sphere with better geometry
    const earthGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    
    // Enhanced holographic material with continents
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x00FF00) },
        color2: { value: new THREE.Color(0x32FF32) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Simple continent shapes using noise
        float continents(vec2 uv) {
          vec2 p = uv * 4.0;
          float n = 0.0;
          n += sin(p.x * 3.0) * cos(p.y * 2.0) * 0.3;
          n += sin(p.x * 7.0 + time * 0.1) * cos(p.y * 5.0) * 0.2;
          n += sin(p.x * 11.0) * cos(p.y * 13.0) * 0.1;
          return smoothstep(0.0, 0.3, n + 0.2);
        }
        
        void main() {
          // Grid pattern
          float gridSize = 20.0;
          vec2 grid = fract(vUv * gridSize);
          float gridLine = max(
            step(0.97, grid.x),
            step(0.97, grid.y)
          );
          
          // Longitude/latitude lines
          float latLine = step(0.98, abs(sin(vUv.y * 3.14159 * 8.0)));
          float longLine = step(0.98, abs(sin(vUv.x * 3.14159 * 16.0)));
          
          // Continent patterns
          float continentPattern = continents(vUv);
          
          // Data flow lines
          float dataFlow = sin(vUv.x * 20.0 + time * 2.0) * sin(vUv.y * 15.0 + time * 1.5);
          dataFlow = smoothstep(0.7, 1.0, dataFlow);
          
          // Combine all patterns
          float lines = max(max(gridLine, latLine), max(longLine, dataFlow * 0.5));
          
          // Edge glow
          float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          rim = pow(rim, 2.0);
          
          // Pulse effect
          float pulse = 0.8 + 0.4 * sin(time * 1.2);
          
          // Color mixing
          vec3 baseColor = mix(color1, color2, rim + continentPattern * 0.3);
          vec3 finalColor = mix(baseColor * 0.4, baseColor, lines + continentPattern * 0.6);
          
          // Reduced alpha for darker appearance
          float alpha = 0.3 + rim * 0.2 + continentPattern * 0.15;
          
          gl_FragColor = vec4(finalColor * 0.7, alpha * (0.3 + lines * 0.4) * pulse);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Enhanced stars with different sizes
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0x00FF88,
      size: 0.03,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
    });

    const starsVertices = [];
    const starsSizes = [];
    for (let i = 0; i < 500; i++) {
      const x = THREE.MathUtils.randFloatSpread(15);
      const y = THREE.MathUtils.randFloatSpread(15);
      const z = THREE.MathUtils.randFloatSpread(15);
      starsVertices.push(x, y, z);
      starsSizes.push(Math.random() * 2 + 0.5);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starsSizes, 1));

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Multiple rings with different rotations
    const ringsGeometry = new THREE.RingGeometry(2.2, 2.25, 64);
    const ringsMaterial = new THREE.MeshBasicMaterial({
      color: 0x32FF32,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const rings = new THREE.Mesh(ringsGeometry, ringsMaterial);
    rings.rotation.x = Math.PI / 2;
    scene.add(rings);

    const rings2Geometry = new THREE.RingGeometry(2.6, 2.65, 64);
    const rings2Material = new THREE.MeshBasicMaterial({
      color: 0x00FF00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
    });
    const rings2 = new THREE.Mesh(rings2Geometry, rings2Material);
    rings2.rotation.x = Math.PI / 2.2;
    rings2.rotation.z = Math.PI / 4;
    scene.add(rings2);

    // Third ring
    const rings3Geometry = new THREE.RingGeometry(3.0, 3.05, 64);
    const rings3Material = new THREE.MeshBasicMaterial({
      color: 0x66FF66,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.1,
    });
    const rings3 = new THREE.Mesh(rings3Geometry, rings3Material);
    rings3.rotation.x = Math.PI / 1.8;
    rings3.rotation.y = Math.PI / 6;
    scene.add(rings3);

    // Enhanced lighting with darker ambient
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00FF00, 0.3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Service icons data
    const serviceIcons = [
      { name: 'Blockchain', symbol: '₿', color: 0x32FF32, distance: 3.2 },
      { name: 'AI/ML', symbol: '🤖', color: 0x00FF66, distance: 3.6 },
      { name: 'Mobile App', symbol: '📱', color: 0x66FF33, distance: 4.0 },
      { name: 'Web Dev', symbol: '🌐', color: 0x33FF66, distance: 4.4 },
      { name: 'Cloud', symbol: '☁️', color: 0x00CC99, distance: 3.8 },
      { name: 'Security', symbol: '🛡️', color: 0x99FF00, distance: 4.2 }
    ];

    // Floating data particles with trails
    const dataParticles = [];
    const particleTrails = [];
    
    for (let i = 0; i < 30; i++) {
      // Main particle
      const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.3 + Math.random() * 0.1, 1, 0.7),
        transparent: true,
        opacity: 0.9,
      });
      
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 3;
      const radius = 2.5 + Math.random() * 1.5;
      
      particle.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
      
      particle.userData = {
        speed: 0.005 + Math.random() * 0.015,
        angle: angle,
        radius: radius,
        verticalSpeed: (Math.random() - 0.5) * 0.008,
        originalColor: particle.material.color.clone()
      };
      
      scene.add(particle);
      dataParticles.push(particle);

      // Particle trail
      const trailPoints = [];
      for (let j = 0; j < 10; j++) {
        trailPoints.push(particle.position.clone());
      }
      
      const trailGeometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
      const trailMaterial = new THREE.LineBasicMaterial({
        color: particle.material.color,
        transparent: true,
        opacity: 0.3,
      });
      
      const trail = new THREE.Line(trailGeometry, trailMaterial);
      scene.add(trail);
      particleTrails.push({ trail, points: trailPoints, particle });
    }

    // Connection lines between globe and particles
    const connectionLines = [];
    for (let i = 0; i < 15; i++) {
      const points = [];
      const angle = (i / 15) * Math.PI * 2;
      
      points.push(new THREE.Vector3(
        Math.cos(angle) * 1.6,
        Math.sin(angle * 0.7) * 0.5,
        Math.sin(angle) * 1.6
      ));
      
      points.push(new THREE.Vector3(
        Math.cos(angle) * 4,
        Math.sin(angle * 0.7) * 1,
        Math.sin(angle) * 4
      ));
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x00FF66,
        transparent: true,
        opacity: 0.2,
      });
      
      const line = new THREE.Line(geometry, material);
      line.userData = { originalOpacity: 0.2, index: i };
      scene.add(line);
      connectionLines.push(line);
    }

    // Service icon meshes
    const orbitingElements = [];
    
    serviceIcons.forEach((service, index) => {
      const canvas = document.createElement('canvas');
      const canvasSize = 128;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Background glow
        const gradient = context.createRadialGradient(canvasSize/2, canvasSize/2, 0, canvasSize/2, canvasSize/2, canvasSize/2);
        gradient.addColorStop(0, `rgba(${(service.color >> 16) & 255}, ${(service.color >> 8) & 255}, ${service.color & 255}, 0.8)`);
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0.1)');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvasSize, canvasSize);
        
        // Icon
        context.fillStyle = '#FFFFFF';
        context.font = 'bold 48px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(service.symbol, canvasSize/2, canvasSize/2);
        
        // Border
        context.strokeStyle = `rgba(${(service.color >> 16) & 255}, ${(service.color >> 8) & 255}, ${service.color & 255}, 1)`;
        context.lineWidth = 4;
        context.beginPath();
        context.arc(canvasSize/2, canvasSize/2, canvasSize/2 - 4, 0, Math.PI * 2);
        context.stroke();
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      
      const iconGeometry = new THREE.PlaneGeometry(0.6, 0.6);
      const iconMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        alphaTest: 0.1
      });
      const iconMesh = new THREE.Mesh(iconGeometry, iconMaterial);
      
      const angle = (index / serviceIcons.length) * Math.PI * 2;
      iconMesh.position.set(
        Math.cos(angle) * service.distance,
        Math.sin(angle * 0.5) * 0.8,
        Math.sin(angle) * service.distance
      );
      
      iconMesh.userData = {
        originalDistance: service.distance,
        angleOffset: angle,
        speed: 0.1 + (index * 0.02),
        verticalOffset: Math.sin(angle * 3) * 0.4,
        bobSpeed: 1.5 + Math.random() * 0.5
      };
      
      scene.add(iconMesh);
      orbitingElements.push(iconMesh);
    });

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate the earth
      earth.rotation.y = elapsedTime * 0.05;
      earth.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;
      
      // Update shader time
      if (earth.material instanceof THREE.ShaderMaterial) {
        earth.material.uniforms.time.value = elapsedTime;
      }
      
      // Animate rings
      const pulse = Math.sin(elapsedTime * 0.8) * 0.1 + 0.9;
      rings.scale.set(pulse, pulse, pulse);
      rings.rotation.z = elapsedTime * 0.1;
      
      rings2.scale.set(1.05 - pulse * 0.05, 1.05 - pulse * 0.05, 1.05 - pulse * 0.05);
      rings2.rotation.z = -elapsedTime * 0.15;
      
      rings3.scale.set(pulse * 0.95, pulse * 0.95, pulse * 0.95);
      rings3.rotation.z = elapsedTime * 0.08;
      
      // Rotate stars
      stars.rotation.y = elapsedTime * 0.01;
      stars.rotation.x = elapsedTime * 0.005;
      
      // Animate orbiting service icons
      orbitingElements.forEach((element, index) => {
        const userData = element.userData;
        const currentAngle = userData.angleOffset + (elapsedTime * userData.speed);
        
        // Enhanced orbital motion with bobbing
        const bobbing = Math.sin(elapsedTime * userData.bobSpeed) * 0.2;
        element.position.set(
          Math.cos(currentAngle) * userData.originalDistance,
          Math.sin(currentAngle * 0.3) * 0.6 + userData.verticalOffset + bobbing,
          Math.sin(currentAngle) * userData.originalDistance
        );
        
        // Rotation and scaling
        element.rotation.z = Math.sin(elapsedTime * 0.5 + index) * 0.1;
        const scale = 0.9 + Math.sin(elapsedTime * 2 + index) * 0.15;
        element.scale.set(scale, scale, scale);
        
        // Face camera
        element.lookAt(cameraRef.current.position);
      });

      // Animate connection lines
      connectionLines.forEach((line, index) => {
        const pulse = Math.sin(elapsedTime * 3 + index * 0.3) * 0.4 + 0.6;
        line.material.opacity = line.userData.originalOpacity * pulse;
      });

      // Animate data particles with trails
      dataParticles.forEach((particle, index) => {
        const userData = particle.userData;
        userData.angle += userData.speed;
        
        // Update particle position
        particle.position.set(
          Math.cos(userData.angle) * userData.radius,
          particle.position.y + userData.verticalSpeed,
          Math.sin(userData.angle) * userData.radius
        );
        
        // Reset if too far
        if (particle.position.y > 4 || particle.position.y < -4) {
          particle.position.y = (Math.random() - 0.5) * 3;
        }
        
        // Color cycling
        const hue = (elapsedTime * 0.1 + index * 0.1) % 1;
        particle.material.color.setHSL(0.25 + hue * 0.1, 1, 0.7);
        
        // Update trail
        const trailData = particleTrails[index];
        if (trailData) {
          trailData.points.shift();
          trailData.points.push(particle.position.clone());
          trailData.trail.geometry.setFromPoints(trailData.points);
          trailData.trail.material.color.copy(particle.material.color);
        }
      });
      
      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current || !containerRef.current) return;
      rendererRef.current.setSize(size, size);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of all geometries and materials
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [size]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="jarvis-globe"
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        margin: '0 auto',
        background: 'transparent',
        border: 'none',
        outline: 'none'
      }}
    />
  );
};

export default JarvisGlobe;
