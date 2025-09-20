
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingSteps = [
    { text: 'Initializing...', duration: 800 },
    { text: 'Loading Components...', duration: 600 },
    { text: 'Connecting Services...', duration: 700 },
    { text: 'Preparing Interface...', duration: 500 },
    { text: 'Almost Ready...', duration: 400 }
  ];

  useEffect(() => {
    let currentStep = 0;
    let currentProgress = 0;
    
    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        
        const stepProgress = (currentStep + 1) * (100 / loadingSteps.length);
        const interval = setInterval(() => {
          currentProgress += 2;
          setProgress(Math.min(currentProgress, stepProgress));
          
          if (currentProgress >= stepProgress) {
            clearInterval(interval);
            currentStep++;
            
            if (currentStep >= loadingSteps.length) {
              setTimeout(() => {
                onComplete();
              }, 500);
            } else {
              setTimeout(updateProgress, 200);
            }
          }
        }, step.duration / 50);
      }
    };

    const timer = setTimeout(updateProgress, 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate circuit nodes
  const circuitNodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    size: Math.random() * 4 + 2
  }));

  // Generate circuit paths
  const circuitPaths = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x1: Math.random() * 100,
    y1: Math.random() * 100,
    x2: Math.random() * 100,
    y2: Math.random() * 100,
    delay: Math.random() * 3
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden"
      >
        {/* Advanced Circuit Background */}
        <div className="absolute inset-0">
          {/* Animated Grid Lines */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px),
                linear-gradient(0deg, rgba(0,255,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '40px 40px', '0px 0px']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Circuit Paths SVG */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,255,0,0.8)" />
                <stop offset="50%" stopColor="rgba(0,255,100,0.6)" />
                <stop offset="100%" stopColor="rgba(0,255,0,0.2)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Animated Circuit Paths */}
            {circuitPaths.map((path) => (
              <motion.line
                key={path.id}
                x1={`${path.x1}%`}
                y1={`${path.y1}%`}
                x2={`${path.x2}%`}
                y2={`${path.y2}%`}
                stroke="url(#circuitGradient)"
                strokeWidth="1"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0], 
                  opacity: [0, 0.8, 0],
                  strokeWidth: [1, 2, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: path.delay,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Circuit Nodes */}
            {circuitNodes.map((node) => (
              <motion.circle
                key={node.id}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size}
                fill="rgba(0,255,0,0.8)"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0.6],
                  fill: [
                    "rgba(0,255,0,0.8)",
                    "rgba(0,255,100,1)",
                    "rgba(0,255,0,0.6)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: node.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>

          {/* Scattering Data Particles */}
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              initial={{
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: [0, 1.5, 1, 0],
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight
                ],
                rotate: [0, 360]
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
              style={{
                boxShadow: '0 0 10px rgba(0,255,0,0.8)'
              }}
            />
          ))}

          {/* Electric Arc Effects */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`arc-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 70}%`,
                top: `${Math.random() * 80 + 10}%`,
                transformOrigin: 'center',
                filter: 'blur(0.5px)'
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0],
                rotate: [0, Math.random() * 10 - 5]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Pulsing Energy Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute border border-green-400/20 rounded-full"
                style={{
                  width: `${200 + i * 100}px`,
                  height: `${200 + i * 100}px`
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.1, 0.3],
                  borderColor: [
                    "rgba(0,255,0,0.2)",
                    "rgba(0,255,100,0.4)",
                    "rgba(0,255,0,0.2)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Loading Content */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-md w-full px-8">
          {/* Enhanced Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
            className="mb-8"
          >
            <div className="relative">
              {/* Multiple Rotating Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`logo-ring-${i}`}
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 3 - i * 0.5, 
                    repeat: Infinity, 
                    ease: "linear",
                    direction: i % 2 === 0 ? "normal" : "reverse"
                  }}
                  className="absolute inset-0"
                  style={{
                    width: `${96 + i * 8}px`,
                    height: `${96 + i * 8}px`,
                    left: `${-i * 4}px`,
                    top: `${-i * 4}px`
                  }}
                >
                  <div 
                    className="w-full h-full border-2 rounded-full"
                    style={{
                      borderColor: `rgba(0,255,${50 + i * 50},${0.3 + i * 0.1})`
                    }}
                  />
                </motion.div>
              ))}
              
              {/* Central Logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-10 w-24 h-24 flex items-center justify-center"
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 10px rgba(0,255,0,0.5)",
                      "0 0 20px rgba(0,255,0,0.8)",
                      "0 0 30px rgba(0,255,0,1)",
                      "0 0 20px rgba(0,255,0,0.8)",
                      "0 0 10px rgba(0,255,0,0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-3xl font-bold text-green-400"
                  style={{ fontFamily: 'Orbitron' }}
                >
                  &lt;/&gt;
                </motion.span>
              </motion.div>
            </div>
          </motion.div>

          {/* Company Name with Enhanced Effects */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent mb-2 relative"
            style={{ fontFamily: 'Orbitron' }}
          >
            <motion.span
              animate={{
                filter: [
                  "drop-shadow(0 0 5px rgba(0,255,0,0.3))",
                  "drop-shadow(0 0 15px rgba(0,255,0,0.6))",
                  "drop-shadow(0 0 5px rgba(0,255,0,0.3))"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Softbeem
            </motion.span>
          </motion.h1>

          {/* Enhanced Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-gray-400 text-center mb-8 font-light relative"
          >
            <motion.span
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Empowering Digital Innovation
            </motion.span>
          </motion.p>

          {/* Enhanced Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="w-full max-w-sm"
          >
            {/* Advanced Progress Bar */}
            <div className="relative mb-4">
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full relative"
                >
                  {/* Multiple Progress Glows */}
                  <motion.div
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200/20 to-transparent"
                  />
                </motion.div>
              </div>
              
              {/* Enhanced Progress Percentage */}
              <motion.div
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  textShadow: [
                    "0 0 5px rgba(0,255,0,0.5)",
                    "0 0 10px rgba(0,255,0,0.8)",
                    "0 0 5px rgba(0,255,0,0.5)"
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 right-0 text-green-400 text-sm font-mono"
              >
                {Math.round(progress)}%
              </motion.div>
            </div>

            {/* Enhanced Loading Text */}
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center text-gray-300 text-sm"
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 3px rgba(0,255,0,0.3)",
                    "0 0 8px rgba(0,255,0,0.6)",
                    "0 0 3px rgba(0,255,0,0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {loadingText}
              </motion.span>
            </motion.p>

            {/* Enhanced Loading Dots */}
            <div className="flex justify-center space-x-1 mt-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      "0 0 5px rgba(0,255,0,0.5)",
                      "0 0 15px rgba(0,255,0,1)",
                      "0 0 5px rgba(0,255,0,0.5)"
                    ]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>

          {/* Enhanced Bottom Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 text-center"
          >
            <motion.p
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs text-gray-500"
            >
              Powered by Innovation & Excellence
            </motion.p>
          </motion.div>
        </div>

        {/* Enhanced Corner Decorations */}
        {[
          { position: "top-8 left-8", rotation: 0 },
          { position: "top-8 right-8", rotation: 90 },
          { position: "bottom-8 left-8", rotation: -90 },
          { position: "bottom-8 right-8", rotation: 180 }
        ].map((corner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: corner.rotation - 45 }}
            animate={{ 
              opacity: 0.4, 
              scale: 1, 
              rotate: corner.rotation,
              borderColor: [
                "rgba(0,255,0,0.3)",
                "rgba(0,255,100,0.6)",
                "rgba(0,255,0,0.3)"
              ]
            }}
            transition={{ 
              delay: 1 + i * 0.2, 
              duration: 1,
              borderColor: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className={`absolute ${corner.position} w-12 h-12 border-l-2 border-t-2`}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
