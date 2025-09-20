import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  PhoneCall,
  Calendar,
  Home,
  Users,
  Settings,
  FileText,
  MessageCircle,
  Award,
  Search,
  ShoppingCart,
  User,
  ArrowRight,
  Code,
  Scale,
} from "lucide-react";
import { servicesData } from "@/data/services";
import { useIsMobile } from "@/hooks/use-mobile";
import AIChatBot from "@/components/AIChatBot";

const navLinks = [
  { name: "Home", href: "/#home" },
  {
    name: "About Us",
    href: "/about",
    submenu: [
      { name: "Company Overview", href: "/about/company-overview" },
      { name: "Our Story", href: "/about/our-story" },
      // { name: "Leadership", href: "/about/leadership" },
      { name: "Vision & Mission", href: "/about/vision-mission" },
      { name: "Core Values", href: "/about/core-values" },
      { name: "Careers", href: "/about/careers" },
      { name: "Achievements", href: "/about/achievements" }
    ]
  },
  { name: "Services", href: "/#services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState<
    string | null
  >("tech");
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileOpenCategories, setMobileOpenCategories] = useState<string[]>(
    [],
  );
  const [mobileOpenServices, setMobileOpenServices] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("home");
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
        setActiveServiceCategory("tech");
      }

      // Close quick actions when clicking outside
      const target = event.target as Element;
      if (!target.closest('[aria-label="Quick Actions"]') && !target.closest('.fixed.top-20.right-4')) {
        setQuickActionsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setMobileServicesOpen(false);
    setMobileAboutOpen(false);
    setMobileOpenCategories([]);
    setMobileOpenServices([]);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen((prev) => !prev);
    setActiveServiceCategory("tech");
  };

  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen);
    setMobileOpenCategories([]);
    setMobileOpenServices([]);
  };

  const toggleMobileAbout = () => {
    setMobileAboutOpen(!mobileAboutOpen);
  };

  const toggleMobileCategory = (category: string) => {
    setMobileOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category],
    );
  };

  const toggleMobileService = (serviceTitle: string) => {
    setMobileOpenServices((prev) =>
      prev.includes(serviceTitle)
        ? prev.filter((service) => service !== serviceTitle)
        : [...prev, serviceTitle],
    );
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
    setMobileAboutOpen(false);
    setMobileOpenCategories([]);
    setMobileOpenServices([]);
    setQuickActionsOpen(false);

    if (sectionId.startsWith("/#")) {
      if (window.location.pathname !== "/") {
        navigate(sectionId);
        return;
      }
      const element = document.getElementById(sectionId.substring(2));
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      navigate(sectionId);
    }
  };

  const handleServiceClick = (service: any) => {
    // If service has submenu, toggle it instead of navigating
    if (service.submenu) {
      toggleMobileService(service.title);
      return;
    }

    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileAboutOpen(false);
    setMobileOpenCategories([]);
    setMobileOpenServices([]);

    if (service.path) {
      navigate(service.path);
    } else {
      if (window.location.pathname !== "/") {
        navigate("/#services");
      } else {
        scrollToSection("#services");
      }
    }
  };

  // Mobile-first navbar with proper header
  if (isMobile) {
    return (
      <>
        {/* Mobile Header - WhatsApp Style with Logo and Search */}
        <header
          className={`fixed top-0 w-full z-50 transition-all duration-300 h-16 flex items-center ${
            isScrolled
              ? "bg-gradient-to-r from-black/98 via-zinc-900/98 to-black/98 backdrop-blur-xl border-b border-green-500/20 shadow-xl shadow-green-500/10"
              : "bg-gradient-to-r from-black/95 via-zinc-900/95 to-black/95 backdrop-blur-lg"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div
                onClick={() => navigate("/")}
                className="cursor-pointer"
              >
                <div className="font-bold text-white flex items-center">
                  <h1 className="font-['Orbitron'] text-xl sm:text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#00FF00] via-[#008000] to-[#004400] mb-0 digital-glow relative z-10 hover:scale-105 transition-transform duration-300">
                    <span className="text-xl sm:text-2xl">&lt;/&gt;</span>
                  </h1>
                </div>
              </div>

              {/* Premium Quick Actions - Hamburger Style */}
              <div className="flex items-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setQuickActionsOpen(!quickActionsOpen);
                  }}
                  aria-label="Quick Actions"
                  className="relative p-3 bg-gradient-to-br from-zinc-800/50 via-zinc-900/80 to-black/90 backdrop-blur-md rounded-xl border border-green-500/30 shadow-lg hover:shadow-green-500/25 transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center overflow-hidden"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Premium hamburger icon with animation */}
                  <div className="flex flex-col space-y-1 transition-all duration-300">
                    <motion.div 
                      className={`w-5 h-0.5 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full transition-all duration-300 ${
                        quickActionsOpen ? 'rotate-45 translate-y-1.5' : ''
                      }`}
                      animate={{
                        rotate: quickActionsOpen ? 45 : 0,
                        y: quickActionsOpen ? 6 : 0
                      }}
                    />
                    <motion.div 
                      className={`w-5 h-0.5 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full transition-all duration-300 ${
                        quickActionsOpen ? 'opacity-0' : 'opacity-100'
                      }`}
                      animate={{
                        opacity: quickActionsOpen ? 0 : 1
                      }}
                    />
                    <motion.div 
                      className={`w-5 h-0.5 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full transition-all duration-300 ${
                        quickActionsOpen ? '-rotate-45 -translate-y-1.5' : ''
                      }`}
                      animate={{
                        rotate: quickActionsOpen ? -45 : 0,
                        y: quickActionsOpen ? -6 : 0
                      }}
                    />
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Premium Quick Actions Dropdown */}
        <AnimatePresence>
          {quickActionsOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20, rotateX: -15 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 300,
                opacity: { duration: 0.2 }
              }}
              className="fixed top-20 right-4 z-[60] min-w-[220px] perspective-1000"
            >
              <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/98 to-zinc-900/95 backdrop-blur-2xl rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/10 p-1 overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/10 to-teal-500/5 opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400/10 via-transparent to-transparent" />

                {/* Premium glass morphism effect */}
                <div className="relative bg-black/20 backdrop-blur-sm rounded-xl border border-white/5">
                  <div className="flex flex-col gap-1 p-3">
                    {/* WhatsApp */}
                    <motion.a
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://wa.me/911169310715"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setQuickActionsOpen(false)}
                      className="relative flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 hover:from-green-500/10 hover:to-emerald-500/10 border border-transparent hover:border-green-500/20 transition-all duration-300 group overflow-hidden"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10 flex items-center gap-4">
                        <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl border border-green-500/30 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                          <svg className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white group-hover:text-green-300 font-semibold text-sm transition-colors">WhatsApp</span>
                          <span className="text-gray-400 text-xs group-hover:text-green-400/70 transition-colors">Quick chat</span>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ChevronRight className="h-4 w-4 text-green-400" />
                      </div>
                    </motion.a>

                    {/* Schedule Meeting */}
                    <motion.button
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setQuickActionsOpen(false);
                        navigate("/schedule");
                      }}
                      className="relative flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 hover:from-blue-500/10 hover:to-indigo-500/10 border border-transparent hover:border-blue-500/20 transition-all duration-300 group overflow-hidden"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10 flex items-center gap-4">
                        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl border border-blue-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                          <Calendar className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white group-hover:text-blue-300 font-semibold text-sm transition-colors">Schedule</span>
                          <span className="text-gray-400 text-xs group-hover:text-blue-400/70 transition-colors">Book meeting</span>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ChevronRight className="h-4 w-4 text-blue-400" />
                      </div>
                    </motion.button>

                    {/* Email */}
                    <motion.a
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      href="mailto:contact@sisko.dev"
                      onClick={() => setQuickActionsOpen(false)}
                      className="relative flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 hover:from-purple-500/10 hover:to-pink-500/10 border border-transparent hover:border-purple-500/20 transition-all duration-300 group overflow-hidden"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10 flex items-center gap-4">
                        <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl border border-purple-500/30 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                          <svg className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white group-hover:text-purple-300 font-semibold text-sm transition-colors">Email</span>
                          <span className="text-gray-400 text-xs group-hover:text-purple-400/70 transition-colors">Send message</span>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ChevronRight className="h-4 w-4 text-purple-400" />
                      </div>
                    </motion.a>

                    {/* AI Chatbot */}
                    <motion.button
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setQuickActionsOpen(false);
                        // Trigger chatbot open event
                        window.dispatchEvent(new CustomEvent('openChatbot'));
                      }}
                      className="relative flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 hover:from-cyan-500/10 hover:to-blue-500/10 border border-transparent hover:border-cyan-500/20 transition-all duration-300 group overflow-hidden"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10 flex items-center gap-4">
                        <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl border border-cyan-500/30 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                          <svg className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            <path d="M13 10V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V10"/>
                            <circle cx="12" cy="13" r="1"/>
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white group-hover:text-cyan-300 font-semibold text-sm transition-colors">AI Assistant</span>
                          <span className="text-gray-400 text-xs group-hover:text-cyan-400/70 transition-colors">Get instant help</span>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ChevronRight className="h-4 w-4 text-cyan-400" />
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Mobile Bottom Navigation - Compact */}
        <motion.nav 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black via-zinc-900/95 to-zinc-800/90 backdrop-blur-xl border-t border-green-500/20 shadow-xl pb-[max(0.5rem,env(safe-area-inset-bottom))]"
        ></motion.nav>
          {/* Subtle glass morphism background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-zinc-900/40 to-transparent" />

          <div className="relative flex items-center justify-around px-1 py-2">
            {/* Home */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab("home");
                if (window.location.pathname !== "/") {
                  navigate("/#home");
                } else {
                  scrollToSection("#home");
                }
              }}
              className={`relative flex flex-col items-center py-2 px-2 rounded-xl min-w-[50px] transition-all duration-200 group ${
                activeTab === "home"
                  ? "bg-gradient-to-t from-orange-500/20 to-orange-400/10 border border-orange-500/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              {/* Active indicator */}
              {activeTab === "home" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              )}

              <Home className={`h-4 w-4 mb-1 transition-colors ${
                activeTab === "home" ? "text-orange-400" : "text-gray-400 group-hover:text-white"
              }`} />
              <span className={`text-xs font-medium transition-colors ${
                activeTab === "home" ? "text-orange-400" : "text-gray-400 group-hover:text-white"
              }`}>Home</span>
            </motion.button>

            {/* Services */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab("services");
                toggleMobileServices();
              }}
              className={`relative flex flex-col items-center py-2 px-2 rounded-xl min-w-[50px] transition-all duration-200 group ${
                activeTab === "services"
                  ? "bg-gradient-to-t from-blue-500/20 to-blue-400/10 border border-blue-500/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              {/* Active indicator */}
              {activeTab === "services" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              )}

              <Code className={`h-4 w-4 mb-1 transition-colors ${
                activeTab === "services" ? "text-blue-400" : "text-gray-400 group-hover:text-white"
              }`} />
              <span className={`text-xs font-medium transition-colors ${
                activeTab === "services" ? "text-blue-400" : "text-gray-400 group-hover:text-white"
              }`}>Services</span>
            </motion.button>

            {/* About */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab("about");
                setIsMobileMenuOpen(true);
                setMobileAboutOpen(true);
              }}
              className={`relative flex flex-col items-center py-2 px-2 rounded-xl min-w-[50px] transition-all duration-200 group ${
                activeTab === "about"
                  ? "bg-gradient-to-t from-green-500/20 to-green-400/10 border border-green-500/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              {/* Active indicator */}
              {activeTab === "about" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              )}

              <Users className={`h-4 w-4 mb-1 transition-colors ${
                activeTab === "about" ? "text-green-400" : "text-gray-400 group-hover:text-white"
              }`} />
              <span className={`text-xs font-medium transition-colors ${
                activeTab === "about" ? "text-green-400" : "text-gray-400 group-hover:text-white"
              }`}>About</span>
            </motion.button>

            {/* Blog */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab("blog");
                navigate("/blog");
              }}
              className={`relative flex flex-col items-center py-2 px-2 rounded-xl min-w-[50px] transition-all duration-200 group ${
                activeTab === "blog"
                  ? "bg-gradient-to-t from-purple-500/20 to-purple-400/10 border border-purple-500/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              {/* Active indicator */}
              {activeTab === "blog" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              )}

              <FileText className={`h-4 w-4 mb-1 transition-colors ${
                activeTab === "blog" ? "text-purple-400" : "text-gray-400 group-hover:text-white"
              }`} />
              <span className={`text-xs font-medium transition-colors ${
                activeTab === "blog" ? "text-purple-400" : "text-gray-400 group-hover:text-white"
              }`}>Blog</span>
            </motion.button>

            {/* Contact */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab("contact");
                scrollToSection("/contact");
              }}
              className={`relative flex flex-col items-center py-2 px-2 rounded-xl min-w-[50px] transition-all duration-200 group ${
                activeTab === "contact"
                  ? "bg-gradient-to-t from-pink-500/20 to-pink-400/10 border border-pink-500/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              {/* Active indicator */}
              {activeTab === "contact" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              )}

              <MessageCircle className={`h-4 w-4 mb-1 transition-colors ${
                activeTab === "contact" ? "text-pink-400" : "text-gray-400 group-hover:text-white"
              }`} />
              <span className={`text-xs font-medium transition-colors ${
                activeTab === "contact" ? "text-pink-400" : "text-gray-400 group-hover:text-white"
              }`}>Contact</span>
            </motion.button>
          </div>
        </motion.nav>

        {/* Services Menu Overlay (Direct from bottom navigation) */}
        <AnimatePresence>
          {mobileServicesOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/50"
              onClick={() => setMobileServicesOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-zinc-900/98 to-black/98 backdrop-blur-xl rounded-t-2xl max-h-[85vh] overflow-y-auto border-t border-green-500/20"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Handle Bar */}
                <div className="flex justify-center py-3 bg-gradient-to-b from-zinc-900/98 to-black/98 rounded-t-2xl">
                  <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-4 pb-3 border-b border-green-500/20 bg-gradient-to-b from-zinc-900/98 to-black/98 sticky top-0 z-10">
                  <h2 className="text-lg font-semibold text-white">Our Services</h2>
                  <button
                    onClick={() => setMobileServicesOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>

                {/* Services Content */}
                <div className="p-4 space-y-2">
                  {Object.keys(servicesData).map((category) => (
                    <div key={category} className="bg-zinc-800 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleMobileCategory(category)}
                        className="w-full flex items-center justify-between gap-4 p-4 hover:bg-zinc-700 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                            <Settings className="h-5 w-5 text-green-400" />
                          </div>
                          <span className="font-medium text-white capitalize">
                            {category === "tech" ? "Technology Services" : "Legal & Compliance"}
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                            mobileOpenCategories.includes(category) ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileOpenCategories.includes(category) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-b from-zinc-800 to-black/70 border-t border-zinc-700"
                          >
                            {servicesData[category as keyof typeof servicesData].map((service, idx) => (
                              <div key={idx} className="p-3">
                                <button
                                  onClick={() => handleServiceClick(service)}
                                  className="w-full flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-zinc-700 transition-all group"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                                      {React.createElement(service.icon, {
                                        className: "h-4 w-4 text-green-400"
                                      })}
                                    </div>
                                    <span className="text-sm text-white/80 group-hover:text-white font-medium">
                                      {service.title}
                                    </span>
                                  </div>
                                  {service.submenu && (
                                    <ChevronDown
                                      className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                                        mobileOpenServices.includes(service.title) ? "rotate-180" : ""
                                      }`}
                                    />
                                  )}
                                </button>

                                {/* Service Submenu */}
                                <AnimatePresence>
                                  {service.submenu && mobileOpenServices.includes(service.title) && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      className="ml-6 mt-2 space-y-1"
                                    >
                                      {service.submenu.map((subItem, subIdx) => (
                                        <motion.button
                                          key={subIdx}
                                          initial={{ x: -10, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          transition={{ duration: 0.2, delay: subIdx * 0.03 }}
                                          onClick={() => {
                                            setMobileServicesOpen(false);
                                            setMobileOpenCategories([]);
                                            setMobileOpenServices([]);
                                            if (subItem.path) navigate(subItem.path);
                                          }}
                                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-700 transition-all group"
                                        >
                                          <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center">
                                            {React.createElement(subItem.icon, {
                                              className: "h-3 w-3 text-green-400"
                                            })}
                                          </div>
                                          <span className="text-xs text-white/70 group-hover:text-white font-medium">
                                            {subItem.title}
                                          </span>
                                        </motion.button>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Full Screen Menu (Swiggy-style with submenu) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/50"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setMobileAboutOpen(false);
              }}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-zinc-900/98 to-black/98 backdrop-blur-xl rounded-t-2xl max-h-[85vh] overflow-y-auto border-t border-green-500/20"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Handle Bar */}
                <div className="flex justify-center py-3 bg-gradient-to-b from-zinc-900/98 to-black/98 rounded-t-2xl">
                  <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-4 pb-3 border-b border-green-500/20 bg-gradient-to-b from-zinc-900/98 to-black/98 sticky top-0 z-10">
                  <h2 className="text-lg font-semibold text-white">
                    {mobileAboutOpen ? "About Us" : "Menu"}
                  </h2>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setMobileAboutOpen(false);
                    }}
                    className="p-2 rounded-full hover:bg-white/10"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>

                {/* Menu Content */}
                <div className="p-4 space-y-2">
                  {/* Show About Us submenu if opened from bottom nav */}
                  {mobileAboutOpen && (
                    <div className="space-y-2">
                      {navLinks.find(link => link.name === "About Us")?.submenu?.map((subItem, subIdx) => {
                        const getAboutIcon = (name: string) => {
                          switch (name) {
                            case "Company Overview": return Home;
                            case "Our Story": return FileText;
                            // case "Leadership": return Users;
                            case "Vision & Mission": return ChevronRight;
                            case "Core Values": return Settings;
                            case "Careers": return Calendar;
                            case "Achievements": return Award;
                            default: return Settings;
                          }
                        };

                        return (
                          <motion.a
                            key={subIdx}
                            href={subItem.href}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: subIdx * 0.03 }}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileAboutOpen(false);
                            }}
                            className="w-full flex items-center gap-4 p-4 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-all"
                          >
                            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                              {React.createElement(getAboutIcon(subItem.name), {
                                className: "h-5 w-5 text-green-400"
                              })}
                            </div>
                            <span className="font-medium text-white">{subItem.name}</span>
                          </motion.a>
                        );
                      })}
                      <div className="pt-4 border-t border-zinc-700">
                        <button
                          onClick={() => setMobileAboutOpen(false)}
                          className="w-full flex items-center gap-4 p-4 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-all"
                        >
                          <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                            <ArrowRight className="h-5 w-5 text-green-400 rotate-180" />
                          </div>
                          <span className="font-medium text-white">Back to Menu</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Regular menu items when About submenu is not open */}
                  {!mobileAboutOpen && (
                    <div className="space-y-2">
                      {/* Home */}
                      <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (window.location.pathname !== "/") {
                        navigate("/");
                      } else {
                        scrollToSection("#home");
                      }
                    }}
                    className="w-full flex items-center gap-4 p-4 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-all"
                  >
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Home className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="font-medium text-white">Home</span>
                  </button>

                  {/* Services with Submenu */}
                  <div className="bg-zinc-800 rounded-xl overflow-hidden">
                    <button
                      onClick={toggleMobileServices}
                      className="w-full flex items-center justify-between gap-4 p-4 hover:bg-zinc-700 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                          <Settings className="h-5 w-5 text-green-400" />
                        </div>
                        <span className="font-medium text-white">Services</span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gradient-to-b from-zinc-800 to-black/70 border-t border-zinc-700"
                        >
                          {Object.keys(servicesData).map((category) => (
                            <div key={category} className="border-b border-zinc-700">
                              <button
                                onClick={() => toggleMobileCategory(category)}
                                className="w-full flex items-center justify-between px-8 py-3 hover:bg-zinc-700 transition-all"
                              >
                                <span className="text-green-400 font-medium text-xs capitalize">
                                  {category === "tech" ? "Technology Services" : "Legal & Compliance Services"}
                                </span>
                                <ChevronDown
                                  className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                                    mobileOpenCategories.includes(category) ? "rotate-180" : ""
                                  }`}
                                />
                              </button>

                              <AnimatePresence>
                                {mobileOpenCategories.includes(category) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="bg-black/50"
                                  >
                                    {servicesData[category as keyof typeof servicesData].map((service, idx) => (
                                      <div key={idx}>
                                        <motion.button
                                          initial={{ x: -20, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          transition={{
                                            duration: 0.2,
                                            delay: idx * 0.05,
                                          }}
                                          onClick={() =>
                                            handleServiceClick(service)
                                          }
                                          className="w-full flex items-center justify-between gap-3 px-12 py-3 hover:bg-zinc-700 transition-all group"
                                        >
                                          <div className="flex items-center gap-4">
                                            <div className="text-green-400/80 group-hover:text-green-400 transition-colors flex-shrink-0">
                                              <div className="h-3 w-3">
                                                {React.createElement(
                                                  service.icon,
                                                )}
                                              </div>
                                            </div>
                                            <span className="text-white/80 group-hover:text-white text-xs font-medium">
                                              {service.title}
                                            </span>
                                          </div>
                                          {service.submenu && (
                                            <ChevronDown
                                              className={`h-3 w-3 text-green-400/60 transition-transform duration-300 ${
                                                mobileOpenServices.includes(
                                                  service.title,
                                                )
                                                  ? "rotate-180"
                                                  : ""
                                              }`}
                                            />
                                          )}
                                        </motion.button>

                                        {/* Service Submenu */}
                                        <AnimatePresence>
                                          {service.submenu && mobileOpenServices.includes(service.title) && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.25 }}
                                              className="bg-zinc-950/90 border-l-2 border-green-500/30 ml-16 overflow-hidden"
                                            >
                                              {service.submenu.map(
                                                (subItem, subIdx) => (
                                                  <motion.button
                                                    key={subIdx}
                                                    initial={{
                                                      x: -15,
                                                      opacity: 0,
                                                    }}
                                                    animate={{
                                                      x: 0,
                                                      opacity: 1,
                                                    }}
                                                    transition={{
                                                      duration: 0.2,
                                                      delay: subIdx * 0.03,
                                                    }}
                                                    onClick={() => {
                                                      setIsMobileMenuOpen(
                                                        false,
                                                      );
                                                      setMobileServicesOpen(
                                                        false,
                                                      );
                                                      setMobileOpenCategories(
                                                        [],
                                                      );
                                                      setMobileOpenServices(
                                                        [],
                                                      );
                                                      if (subItem.path)
                                                        navigate(subItem.path);
                                                    }}
                                                    className="w-full flex items-center gap-4 px-8 py-2 hover:bg-zinc-700 transition-all duration-200 group"
                                                  >
                                                    <div className="text-green-400/60 group-hover:text-green-400 transition-colors flex-shrink-0 flex items-center">
                                                      <div className="h-2.5 w-2.5">
                                                        {React.createElement(
                                                          subItem.icon,
                                                          {
                                                            className:
                                                              "h-2.5 w-2.5",
                                                          },
                                                        )}
                                                      </div>
                                                    </div>
                                                    <span className="text-white/60 group-hover:text-white text-[10px] font-medium">
                                                      {subItem.title}
                                                    </span>
                                                  </motion.button>
                                                ),
                                              )}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* About with Submenu */}
                  <div className="bg-zinc-800 rounded-xl overflow-hidden">
                    <button
                      onClick={toggleMobileAbout}
                      className="w-full flex items-center justify-between gap-4 p-4 hover:bg-zinc-700 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-green-400" />
                        </div>
                        <span className="font-medium text-white">About Us</span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                          mobileAboutOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileAboutOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gradient-to-b from-zinc-800 to-black/70 border-t border-zinc-700 p-3 space-y-1"
                        >
                          {navLinks.find(link => link.name === "About Us")?.submenu?.map((subItem, subIdx) => {
                            const getAboutIcon = (name: string) => {
                              switch (name) {
                                case "Company Overview":
                                  return <Home className="h-4 w-4 text-green-400" />;
                                case "Our Story":
                                  return <FileText className="h-4 w-4 text-green-400" />;
                                case "Vision & Mission":
                                  return <ChevronRight className="h-4 w-4 text-green-400" />;
                                case "Core Values":
                                  return <Settings className="h-4 w-4 text-green-400" />;
                                case "Careers":
                                  return <Calendar className="h-4 w-4 text-green-400" />;
                                case "Achievements":
                                  return <Award className="h-4 w-4 text-green-400" />;
                                default:
                                  return <Settings className="h-4 w-4 text-green-400" />;
                              }
                            };

                            return (
                              <motion.a
                                key={subIdx}
                                href={subItem.href}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.2, delay: subIdx * 0.03 }}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setMobileAboutOpen(false);
                                }}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-700 transition-all group"
                              >
                                <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                                  {React.createElement(getAboutIcon(subItem.name), {
                                    className: "h-4 w-4 text-green-400"
                                  })}
                                </div>
                                <span className="text-sm text-white/80 group-hover:text-white font-medium">
                                  {subItem.name}
                                </span>
                              </motion.a>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Blog */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/blog");
                    }}
                    className="w-full flex items-center gap-4 p-4 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-all"
                  >
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="font-medium text-white">Blog</span>
                  </button>

                  {/* Contact */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToSection("/contact");
                    }}
                    className="w-full flex items-center gap-4 p-4 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-all"
                  >
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="font-medium text-white">Contact Us</span>
                  </button>

                    {/* Quick Actions */}
                    <div className="mt-6 pt-4 border-t border-zinc-700">
                      <h3 className="text-base font-medium text-white mb-3">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate("/schedule");
                          }}
                          className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/30"
                        >
                          <Calendar className="h-5 w-5 text-green-400" />
                          <span className="text-sm font-medium text-green-400">Schedule Meeting</span>
                        </button>
                        <a
                          href="tel:+911169310715"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/30"
                        >
                          <PhoneCall className="h-5 w-5 text-blue-400" />
                          <span className="text-sm font-medium text-blue-400">Call Now</span>
                        </a>
                      </div>


                    </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Chatbot Component */}
        <AIChatBot />
      </>
    );
  }

  // Desktop Navigation (unchanged)
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 h-14 sm:h-16 lg:h-20 flex items-center ${
        isScrolled
          ? "bg-gradient-to-r from-black/98 via-zinc-900/98 to-black/98 backdrop-blur-xl border-b border-green-500/20 shadow-xl shadow-green-500/10"
          : "bg-gradient-to-r from-black/95 via-zinc-900/95 to-black/95 backdrop-blur-lg"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="flex items-center justify-between bg-gradient-to-r from-zinc-900/50 via-transparent to-zinc-900/50 rounded-full px-3 sm:px-4 lg:px-6 py-2 backdrop-blur-sm border border-green-500/10">
          {/* Logo */}
          <div className="flex items-center">
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer"
            >
              <div className="font-bold text-white flex items-center">
                <h1 className="font-['Orbitron'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#00FF00] via-[#008000] to-[#004400] mb-0 digital-glow relative z-10 hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl sm:text-4xl">&lt;/&gt;</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-2 lg:space-x-4 xl:space-x-8">
            {navLinks.map((link, index) => {
              if (link.name === "Services") {
                return (
                  <div
                    key={index}
                    className="relative"
                    ref={servicesDropdownRef}
                  >
                    <button
                      onClick={toggleServicesDropdown}
                      className="relative text-white hover:text-primary font-semibold text-base transition-colors duration-400 group flex items-center gap-1 tracking-wide"
                    >
                      {link.name}
                      <ChevronDown
                        className={`h-2 w-4 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`}
                      />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </button>

                    {/* Desktop Services Dropdown */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-14 -left-60 mt-2 w-[600px] rounded-lg border-zinc-800 z-50 bg-zinc-900/95 backdrop-blur-sm border border-green-500/20 shadow-xl shadow-black/50"
                        >
                          <div className="flex">
                            {/* Category Menu */}
                            <div className="w-1/3 bg-black p-2">
                              {Object.keys(servicesData).map((category) => (
                                <button
                                  key={category}
                                  onMouseEnter={() =>
                                    setActiveServiceCategory(category)
                                  }
                                  onClick={() =>
                                    setActiveServiceCategory(category)
                                  }
                                  className={`w-full text-left p-3 rounded-md transition-colors duration-200 flex justify-between items-center ${
                                    activeServiceCategory === category
                                      ? "bg-primary/10 text-primary"
                                      : "text-white hover:bg-zinc-800"
                                  }`}
                                >
                                  <span className="capitalize">
                                    {category} Services
                                  </span>
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                              ))}
                            </div>

                            {/* Services List */}
                            <div className="w-2/3 p-4 bg-black">
                              <AnimatePresence mode="wait">
                                {activeServiceCategory && (
                                  <motion.div
                                    key={activeServiceCategory}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <h3 className="text-lg font-medium text-primary mb-3 capitalize">
                                      {activeServiceCategory} Solutions
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                      {servicesData[
                                        activeServiceCategory as keyof typeof servicesData
                                      ].map((service, idx) => (
                                        <div
                                          key={idx}
                                          className="relative group/service"
                                        >
                                          <motion.button
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                              duration: 0.2,
                                              delay: idx * 0.05,
                                            }}
                                            onClick={() => {
                                              setServicesDropdownOpen(false);
                                              if (service.path) {
                                                navigate(service.path);
                                              } else {
                                                if (window.location.pathname !== "/") {
                                                  navigate("/#services");
                                                } else {
                                                  scrollToSection("#services");
                                                }
                                              }
                                            }}
                                            className="flex items-start gap-3 p-2 rounded-md hover:bg-zinc-800 transition-colors group w-full"
                                          >
                                            <div className="text-primary flex items-center">
                                              <div className="h-4 w-4">
                                                {React.createElement(
                                                  service.icon,
                                                  { className: "h-4 w-4" }
                                                )}
                                              </div>
                                            </div>
                                            <div className="text-left flex-1">
                                              <h4 className="text-[15px] text-white group-hover:text-primary transition-colors flex items-center justify-between">
                                                {service.title}
                                                {service.submenu && (
                                                  <ChevronRight className="h-4 w-4 ml-2" />
                                                )}
                                              </h4>
                                              <p className="text-xs text-muted-foreground mt-1">
                                                {service.features[0]}
                                              </p>
                                            </div>
                                          </motion.button>

                                          {/* Desktop submenu */}
                                          {service.submenu && (
                                            <div className="absolute left-full top-0 ml-2 min-w-[300px] z-50 hidden group-hover/service:block">
                                              <div className="bg-zinc-950/95 backdrop-blur-sm rounded-lg shadow-xl border border-green-500/20 p-4 max-h-[400px] overflow-y-auto">
                                                {service.submenu.map(
                                                  (subItem, subIdx) => (
                                                    <motion.button
                                                      key={subIdx}
                                                      initial={{
                                                        opacity: 0,
                                                        x: -10,
                                                      }}
                                                      animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                      }}
                                                      transition={{
                                                        duration: 0.2,
                                                        delay: subIdx * 0.05,
                                                      }}
                                                      onClick={() => {
                                                        setServicesDropdownOpen(false);
                                                        if (subItem.path) {
                                                          navigate(subItem.path);
                                                        }
                                                      }}
                                                      className="flex items-start gap-3 p-2 rounded-md hover:bg-zinc-800 transition-colors group w-full"
                                                    >
                                                      <div className="text-primary/80 flex items-center">
                                                        <div className="h-4 w-4">
                                                          {React.createElement(
                                                            subItem.icon,
                                                            {
                                                              className:
                                                                "h-4 w-4 opacity-75 hover:opacity-100 transition-opacity",
                                                            },
                                                          )}
                                                        </div>
                                                      </div>
                                                      <div className="text-left">
                                                        <h4 className="text-white group-hover:text-primary transition-colors text-sm">
                                                          {subItem.title}
                                                        </h4>
                                                      </div>
                                                    </motion.button>
                                                  ),
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // About Us with submenu
              if (link.name === "About Us") {
                return (
                  <div key={index} className="relative group">
                    <button
                      className="relative text-white hover:text-primary font-semibold text-base transition-colors duration-300 group flex items-center gap-1 tracking-wide"
                    >
                      {link.name}
                      <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </button>

                    {/* Desktop About Us Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-900/95 backdrop-blur-sm border border-green-500/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-2">
                        {link.submenu?.map((subItem, subIdx) => {
                          const getAboutIcon = (name: string) => {
                            switch (name) {
                              case "Company Overview":
                                return <Home className="h-3 w-3 text-green-400" />;
                              case "Our Story":
                                return <FileText className="h-3 w-3 text-green-400" />;
                              case "Leadership":
                                return <Users className="h-3 w-3 text-green-400" />;
                              case "Vision & Mission":
                                return <ChevronRight className="h-3 w-3 text-green-400" />;
                              case "Core Values":
                                return <Settings className="h-3 w-3 text-green-400" />;
                              case "Careers":
                                return <Calendar className="h-3 w-3 text-green-400" />;
                              case "Achievements":
                                return <Award className="h-3 w-3 text-green-400" />;
                              default:
                                return <Settings className="h-3 w-3 text-green-400" />;
                            }
                          };

                          return (
                            <a
                              key={subIdx}
                              href={subItem.href}
                              className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-zinc-800/70 rounded-md transition-all duration-200 text-xs font-medium hover:font-semibold"
                            >
                              {getAboutIcon(subItem.name)}
                              <span>{subItem.name}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              // Regular nav links
              return (
                <div key={index} className="flex items-center gap-16">
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="relative text-white hover:text-primary font-semibold text-base transition-colors duration-300 group tracking-wide"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </button>


                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
              className="p-2 sm:p-3 hover:bg-green-500/10 rounded-lg border border-green-500/30 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              ) : (
                <Menu className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-14 sm:top-16 lg:top-20 left-0 right-0 bg-gradient-to-b from-zinc-900/98 to-black/98 backdrop-blur-xl border-t border-green-500/20 overflow-y-auto max-h-[calc(100vh-4rem)] z-50 shadow-2xl"
          >
            {/* Mobile Contact Options */}
            <div className="flex items-center justify-center gap-4 p-4 border-b border-green-500/10 bg-zinc-900/50">
              <a
                href="tel:+911169310715"
                className="flex items-center justify-center w-14 h-14 text-green-400 transition-all hover:scale-110"
              >
                <PhoneCall className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/911169310715"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 text-green-400 transition-all hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <button
                onClick={() => navigate("/schedule")}
                className="flex items-center justify-center w-14 h-14 text-green-400 transition-all hover:scale-110"
              >
                <Calendar className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="pb-6">
              {navLinks.map((link, index) => {
                if (link.name === "About Us") {
                  return (
                    <div key={index} className="border-b border-green-500/10">
                      <button
                        onClick={toggleMobileAbout}
                        className="w-full flex items-center justify-between px-6 py-4 text-white hover:text-green-400 hover:bg-zinc-800/50 transition-all duration-200 text-[10px] font-light tracking-wide uppercase font-['Inter']"
                      >
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-green-400" />
                          <span>{link.name}</span>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            mobileAboutOpen
                              ? "rotate-180 text-green-400"
                              : "text-gray-400"
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileAboutOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-b from-zinc-800 to-black/70 border-t border-zinc-700"
                          >
                            {link.submenu?.map((subItem, subIdx) => {
                              const getAboutIcon = (name: string) => {
                                switch (name) {
                                  case "Company Overview":
                                    return <Home className="h-4 w-4 text-green-400" />;
                                  case "Our Story":
                                    return <FileText className="h-4 w-4 text-green-400" />;
                                  case "Leadership":
                                    return <Users className="h-4 w-4 text-green-400" />;
                                  case "Vision & Mission":
                                    return <ChevronRight className="h-4 w-4 text-green-400" />;
                                  case "Core Values":
                                    return <Settings className="h-4 w-4 text-green-400" />;
                                  case "Careers":
                                    return <Calendar className="h-4 w-4 text-green-400" />;
                                  case "Achievements":
                                    return <Award className="h-4 w-4 text-green-400" />;
                                  default:
                                    return <Settings className="h-4 w-4 text-green-400" />;
                                }
                              };

                              return (
                                <motion.a
                                  key={subIdx}
                                  href={subItem.href}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{
                                    duration: 0.2,
                                    delay: subIdx * 0.05,
                                  }}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setMobileAboutOpen(false);
                                  }}
                                  className="flex items-center gap-3 px-8 py-3 text-white/80 hover:text-white hover:bg-zinc-800/50 transition-all duration-200 text-xs border-b border-green-500/5 last:border-b-0 font-['Inter']"
                                >
                                  {getAboutIcon(subItem.name)}
                                  <span className="text-xs font-medium">{subItem.name}</span>
                                </motion.a>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (link.name === "Services") {
                  return (
                    <div key={index} className="border-b border-green-500/10">
                      <button
                        onClick={toggleMobileServices}
                        className="w-full flex items-center justify-between px-6 py-4 text-white hover:text-green-400 hover:bg-zinc-800/50 transition-all duration-200 text-[10px] font-light tracking-wide uppercase font-['Inter']"
                      >
                        <div className="flex items-center gap-3">
                          <Settings className="h-5 w-5 text-green-400" />
                          <span>{link.name}</span>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            mobileServicesOpen
                              ? "rotate-180 text-green-400"
                              : "text-gray-400"
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-b from-zinc-800 to-black/70 border-t border-zinc-700"
                          >
                            {Object.keys(servicesData).map((category) => (
                              <div
                                key={category}
                                className="border-b border-zinc-700 last:border-b-0"
                              >
                                <button
                                  onClick={() => toggleMobileCategory(category)}
                                  className="w-full flex items-center justify-between px-8 py-3 hover:bg-zinc-700 transition-all"
                                >
                                  <span className="text-green-400 font-medium text-xs capitalize">
                                    {category === "tech" ? "Technology Services" : "Legal & Compliance Services"}
                                  </span>
                                  <ChevronDown
                                    className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                                      mobileOpenCategories.includes(category) ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>

                                <AnimatePresence>
                                  {mobileOpenCategories.includes(category) && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      className="bg-black/50"
                                    >
                                      {servicesData[
                                        category as keyof typeof servicesData
                                      ].map((service, idx) => (
                                        <div key={idx}>
                                          <motion.button
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{
                                              duration: 0.2,
                                              delay: idx * 0.05,
                                            }}
                                            onClick={() =>
                                              handleServiceClick(service)
                                            }
                                            className="w-full flex items-center justify-between gap-3 px-12 py-3 hover:bg-zinc-700 transition-all group"
                                          >
                                            <div className="flex items-center gap-4">
                                              <div className="text-green-400/80 group-hover:text-green-400 transition-colors flex-shrink-0">
                                                <div className="h-3 w-3">
                                                  {React.createElement(
                                                    service.icon,
                                                  )}
                                                </div>
                                              </div>
                                              <span className="text-white/80 group-hover:text-white text-xs font-medium">
                                                {service.title}
                                              </span>
                                            </div>
                                            {service.submenu && (
                                              <ChevronDown
                                                className={`h-3 w-3 text-green-400/60 transition-transform duration-300 ${
                                                  mobileOpenServices.includes(
                                                    service.title,
                                                  )
                                                    ? "rotate-180"
                                                    : ""
                                                }`}
                                              />
                                            )}
                                          </motion.button>

                                          {/* Service Submenu */}
                                          <AnimatePresence>
                                            {service.submenu && mobileOpenServices.includes(service.title) && (
                                              <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="bg-zinc-950/90 border-l-2 border-green-500/30 ml-16 overflow-hidden"
                                              >
                                                {service.submenu.map(
                                                  (subItem, subIdx) => (
                                                    <motion.button
                                                      key={subIdx}
                                                      initial={{
                                                        x: -15,
                                                        opacity: 0,
                                                      }}
                                                      animate={{
                                                        x: 0,
                                                        opacity: 1,
                                                      }}
                                                      transition={{
                                                        duration: 0.2,
                                                        delay: subIdx * 0.03,
                                                      }}
                                                      onClick={() => {
                                                        setIsMobileMenuOpen(
                                                          false,
                                                        );
                                                        setMobileServicesOpen(
                                                          false,
                                                        );
                                                        setMobileOpenCategories(
                                                          [],
                                                        );
                                                        setMobileOpenServices(
                                                          [],
                                                        );
                                                        if (subItem.path)
                                                          navigate(subItem.path);
                                                      }}
                                                      className="w-full flex items-center gap-4 px-8 py-2 hover:bg-zinc-700 transition-all duration-200 group"
                                                    >
                                                      <div className="text-green-400/60 group-hover:text-green-400 transition-colors flex-shrink-0 flex items-center">
                                                        <div className="h-2.5 w-2.5">
                                                          {React.createElement(
                                                            subItem.icon,
                                                            {
                                                              className:
                                                                "h-2.5 w-2.5",
                                                            },
                                                          )}
                                                        </div>
                                                      </div>
                                                      <span className="text-white/60 group-hover:text-white text-[10px] font-medium">
                                                        {subItem.title}
                                                      </span>
                                                    </motion.button>
                                                  ),
                                                )}
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </div>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Regular nav links (excluding About Us as it's handled above)
                if (link.name !== "About Us") {
                  const getIcon = (name: string) => {
                    switch (name) {
                      case "Home":
                        return <Home className="h-5 w-5 text-green-400" />;
                      case "Blog":
                        return <FileText className="h-5 w-5 text-green-400" />;
                      case "Contact Us":
                        return <MessageCircle className="h-5 w-5 text-green-400" />;
                      default:
                        return <Settings className="h-5 w-5 text-green-400" />;
                    }
                  };

                  return (
                    <button
                      key={index}
                      onClick={() => scrollToSection(link.href)}
                      className="w-full flex items-center justify-between px-6 py-4 text-white hover:text-green-400 hover:bg-zinc-800/50 transition-all duration-200 text-[10px] font-light tracking-wide uppercase font-['Inter']"
                    >
                      <div className="flex items-center gap-3">
                        {getIcon(link.name)}
                        <span>{link.name}</span>
                      </div>
                    </button>
                  );
                }
                return null;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chatbot Component */}
      <AIChatBot />
    </header>
  );
};

export default memo(Navbar);