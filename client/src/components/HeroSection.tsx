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
import ServiceIcons from "./ServiceIcons";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const isMobile = useIsMobile();
  const { settings } = useSiteSettings();

  // Preload globe after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobeLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    "Web Development",
    "App Development",
    "Blockchain Solutions",
    "AI & Machine Learning",
    "Digital Marketing",
    "Legal Services",
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

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-8 sm:pt-12 lg:pt-16 overflow-hidden bg-black"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
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
        {[...Array(isMobile ? 25 : 50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[2px] bg-white rounded-full"
            initial={{
              opacity: Math.random(),
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1920),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1080),
            }}
            animate={{
              opacity: [
                Math.random() * 0.2,
                Math.random(),
                Math.random() * 0.2,
              ],
              scale: [1, Math.random() * 2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                i % 3 === 0 ? "#4ade80" : i % 3 === 1 ? "#22c55e" : "white",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(0,255,128,0.1) 0%, transparent 50%)",
            backgroundSize: "100% 100%",
          }}
        />
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h1
              className="font-bold tracking-wider bg-clip-text text-transparent digital-glow relative z-10 hover:scale-105 transition-transform duration-300 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 justify-center lg:justify-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{
                fontFamily: settings.fontFamily || "Orbitron",
                backgroundImage: `linear-gradient(to right, ${settings.themeColor || "#00FF00"}, ${settings.themeColor ? `${settings.themeColor}80` : "#008000"}, ${settings.themeColor ? `${settings.themeColor}40` : "#004400"})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">&lt;/&gt;</span>
              <span className="break-words">{settings.companyName || "Softbeem"}</span>
            </h1>

            <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 items-center justify-center lg:justify-start mb-4 sm:mb-6">
              <span className="font-['Rajdhani'] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FF00] via-[#008000] to-[#004400] digital-glow">
                Search
              </span>
              <span className="font-['Rajdhani'] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white digital-glow">
                Ends Here
              </span>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 lg:mb-10 max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 leading-relaxed">
              <span className="bg-gradient-to-r from-[#00FF00] to-[#32CD32] text-transparent bg-clip-text font-bold">
                Empowering businesses
              </span>{" "}
              with cutting-edge technology and comprehensive legal services to
              navigate the digital transformation landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-md sm:max-w-none mx-auto lg:mx-0">
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
                        <span className="font-semibold text-white group-hover:text-green-400 transition-colors">
                          Blockchain Development
                        </span>
                        <span className="block text-sm text-gray-400">
                          Smart Contracts & DApps
                        </span>
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
                        <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          IT Services
                        </span>
                        <span className="block text-sm text-gray-400">
                          Software & Mobile Apps
                        </span>
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
                        <span className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          Legal & Compliance Services
                        </span>
                        <span className="block text-sm text-gray-400">
                          Business & Compliance
                        </span>
                      </div>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("#contact")}
                className="border-green-500/30 text-white hover:bg-green-500/10 shadow-lg w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center items-center order-1 lg:order-2 mb-4 lg:mb-0"
          >
            <div className="mt-4 sm:mt-8 lg:mt-16">
              {globeLoaded ? (
                <JarvisGlobe size={isMobile ? 250 : window.innerWidth < 1024 ? 300 : 400} />
              ) : (
                <div 
                  className="flex items-center justify-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30"
                  style={{ 
                    width: isMobile ? 250 : window.innerWidth < 1024 ? 300 : 400, 
                    height: isMobile ? 250 : window.innerWidth < 1024 ? 300 : 400 
                  }}
                >
                  <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-6 lg:mt-8">
              <ServiceIcons />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <button
          onClick={() => scrollToSection("#about")}
          className="text-white hover:text-primary transition-colors duration-300 bg-zinc-800/80 p-2 sm:p-3 rounded-full border border-green-500/20 backdrop-blur-sm shadow-lg"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
