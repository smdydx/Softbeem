import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowDown,
  Database,
  ServerCog,
  Rocket,
  Code,
  Scale,
} from "lucide-react";
import { useEffect, useState } from "react";
import JarvisGlobe from "./JarvisGlobe";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  
  const services = [
    "Web Development",
    "App Development", 
    "Blockchain Solutions",
    "AI & Machine Learning",
    "Digital Marketing",
    "Legal Services"
  ];

  useEffect(() => {
    const currentService = services[currentIndex % services.length];
    if (typedText.length < currentService.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentService.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedText("");
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typedText, currentIndex, services]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          poster="/images/hero-poster.jpg"
        >
          <source src="/video/hero-backvideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-zinc-900/70 to-black/80"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6 lg:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Digital
                </span>
                <br />
                <span className="text-white">Innovation</span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Redefined
                </span>
              </h1>
              
              <div className="h-8 md:h-10">
                <p className="text-xl md:text-2xl lg:text-3xl text-green-400 font-semibold">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              We transform businesses through cutting-edge technology, innovative solutions, 
              and comprehensive digital strategies that drive growth and success.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Link to="/schedule">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  Schedule Meeting
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
            >
              {[
                { icon: Code, number: "500+", label: "Projects" },
                { icon: Database, number: "50+", label: "Clients" },
                { icon: ServerCog, number: "24/7", label: "Support" },
                { icon: Rocket, number: "99%", label: "Success Rate" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                  <stat.icon className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* JarvisGlobe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            <JarvisGlobe size={isMobile ? 280 : 400} />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ArrowDown className="h-8 w-8 text-green-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
    <Database className="h-6 w-6 text-primary" />,
    <ServerCog className="h-6 w-6 text-[#FF3366]" />,
    <Rocket className="h-6 w-6 text-yellow-500" />,
    <Database className="h-6 w-6 text-green-500" />,
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % floatingIcons.length);
    }, 2000);

    return () => clearInterval(iconInterval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 lg:pt-24 overflow-hidden bg-black"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/herosection.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Animated particles */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[2px] bg-white rounded-full"
            initial={{
              opacity: Math.random(),
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              opacity: [Math.random() * 0.2, Math.random(), Math.random() * 0.2],
              scale: [1, Math.random() * 2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: i % 3 === 0 ? '#4ade80' : i % 3 === 1 ? '#22c55e' : 'white',
            }}
          />
        ))}

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(0,255,128,0.1) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-center lg:text-left"
          >
            <h1 className="font-['Orbitron'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#00FF00] via-[#008000] to-[#004400] digital-glow relative z-10 hover:scale-105 transition-transform duration-300 flex items-center gap-2 sm:gap-4 mb-4 justify-center lg:justify-start">
              <span className="text-6xl sm:text-8xl">&lt;/&gt;</span>
              Softbeem
            </h1>

            <div className="flex flex-nowrap whitespace-nowrap gap-2 sm:gap-3 items-center justify-center lg:justify-start mb-6">
              <span className="font-['Rajdhani'] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FF00] via-[#008000] to-[#004400] digital-glow">
                Search
              </span>
              <span className="font-['Rajdhani'] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white digital-glow">
                Ends Here
              </span>
            </div>

            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              <span className="bg-gradient-to-r from-[#00FF00] to-[#32CD32] text-transparent bg-clip-text font-bold">
                Empowering businesses
              </span>{" "}
              with cutting-edge technology and comprehensive legal services to
              navigate the digital transformation landscape.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#00FF00] to-[#004400] hover:from-[#008000] hover:to-[#006600] text-white border-none shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-105"
                  >
                    Explore Our Services
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-3 backdrop-blur-xl bg-black/80 border border-green-500/20">
                  <div className="flex flex-col gap-2">
                    <Link 
                      to="/services/blockchain"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-500/10 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <Code className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-white group-hover:text-green-400 transition-colors">Blockchain Development</span>
                        <span className="block text-sm text-gray-400">Smart Contracts & DApps</span>
                      </div>
                    </Link>
                    <Link 
                      to="/services/it-services"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-500/10 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <ServerCog className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">IT Services</span>
                        <span className="block text-sm text-gray-400">Software & Mobile Apps</span>
                      </div>
                    </Link>
                    <Link 
                      to="/services/legal/compliance"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-500/10 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <Scale className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-white group-hover:text-yellow-400 transition-colors">Legal & Compliance Services</span>
                        <span className="block text-sm text-gray-400">Business & Compliance</span>
                      </div>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("#contact")}
                className="border-green-500/30 text-white hover:bg-green-500/10 shadow-lg"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`relative flex justify-center ${isMobile ? 'mt-8 mb-16' : 'hidden lg:block'}`}
          >
            
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection("#about")}
          className="text-white hover:text-primary transition-colors duration-300 bg-zinc-800/80 p-3 rounded-full border border-green-500/20 backdrop-blur-sm shadow-lg"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;