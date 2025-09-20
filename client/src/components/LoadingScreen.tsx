
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden"
      >
        {/* Background Animation */}
        <div className="absolute inset-0">
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-grid-white opacity-20" />
          
          {/* Floating Particles */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-green-400 rounded-full"
              initial={{
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [null, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Gradient Overlays */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 20%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(0,255,0,0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Main Loading Content */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-md w-full px-8">
          {/* Logo Animation */}
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
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-2 border-green-500/30 rounded-full"
              />
              
              {/* Inner Logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 10px rgba(0,255,0,0.5)",
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

          {/* Company Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2"
            style={{ fontFamily: 'Orbitron' }}
          >
            Softbeem
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-gray-400 text-center mb-8 font-light"
          >
            Empowering Digital Innovation
          </motion.p>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="w-full max-w-sm"
          >
            {/* Progress Bar */}
            <div className="relative mb-4">
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full relative"
                >
                  {/* Progress Glow */}
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.div>
              </div>
              
              {/* Progress Percentage */}
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 right-0 text-green-400 text-sm font-mono"
              >
                {Math.round(progress)}%
              </motion.div>
            </div>

            {/* Loading Text */}
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center text-gray-300 text-sm"
            >
              {loadingText}
            </motion.p>

            {/* Loading Dots */}
            <div className="flex justify-center space-x-1 mt-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
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

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 text-center"
          >
            <p className="text-xs text-gray-500">
              Powered by Innovation & Excellence
            </p>
          </motion.div>
        </div>

        {/* Corner Decorations */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-green-500/30"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-green-500/30"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-green-500/30"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-green-500/30"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
