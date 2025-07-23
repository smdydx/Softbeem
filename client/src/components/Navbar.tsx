import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight, PhoneCall, Calendar } from "lucide-react";
import { servicesData } from "@/data/services";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/#services" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState<string | null>("tech");
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<string[]>([]);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
        setActiveServiceCategory("tech");
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
    setServicesDropdownOpen(false);
    setOpenMobileSubmenus([]);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen((prev) => !prev);
    setActiveServiceCategory("tech");
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setOpenMobileSubmenus([]);

    if (sectionId.startsWith('/#')) {
      if (window.location.pathname !== '/') {
        window.location.href = sectionId;
        return;
      }
      const element = document.getElementById(sectionId.substring(2));
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      window.location.href = sectionId;
    }
  };

  // Mobile Submenu Handler
   const handleMobileSubmenuToggle = (title: string) => {
    setOpenMobileSubmenus((prev) =>
      prev.includes(title) ? [] : [title]
    );
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 h-14 sm:h-16 lg:h-20 flex items-center ${
      isScrolled
        ? "bg-gradient-to-r from-black/98 via-zinc-900/98 to-black/98 backdrop-blur-xl border-b border-green-500/20 shadow-xl shadow-green-500/10"
        : "bg-gradient-to-r from-black/95 via-zinc-900/95 to-black/95 backdrop-blur-lg"
    }`}>
      {/* ... (Other header content remains same) */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="flex items-center justify-between bg-gradient-to-r from-zinc-900/50 via-transparent to-zinc-900/50 rounded-full px-3 sm:px-4 lg:px-6 py-2 backdrop-blur-sm border border-green-500/10">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center">
            <div onClick={() => window.location.href = '/'} className="cursor-pointer">
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
                  <div key={index} className="relative" ref={servicesDropdownRef}>
                    <button
                      onClick={toggleServicesDropdown}
                      className="relative text-white hover:text-primary font-medium transition-colors duration-400 group flex items-center gap-1"
                    >
                      {link.name}
                      <ChevronDown className={`h-2 w-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    {/* Services Dropdown */}
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
                                  onMouseEnter={() => setActiveServiceCategory(category)}
                                  onClick={() => setActiveServiceCategory(category)}
                                  className={`w-full text-left p-3 rounded-md transition-colors duration-200 flex justify-between items-center ${
                                    activeServiceCategory === category
                                      ? "bg-primary/10 text-primary"
                                      : "text-white hover:bg-zinc"
                                  }`}
                                >
                                  <span className="capitalize">{category} Services</span>
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
                                      {servicesData[activeServiceCategory as keyof typeof servicesData].map((service, idx) => (
                                        <div key={idx} className="relative group/service">
                                          <motion.button
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                                            onClick={() => service.path ? window.location.href = service.path : scrollToSection("/#services")}
                                            className="flex items-start gap-3 p-2 rounded-md hover:bg-zinc-800 transition-colors group w-full"
                                          >
                                            <div className="text-primary flex items-center">
                                              <div className="h-6 w-6">{React.createElement(service.icon)}</div>
                                            </div>
                                            <div className="text-left flex-1">
                                              <h4 className="text-[15px] text-white group-hover:text-primary transition-colors flex items-center justify-between">
                                                {service.title}
                                                {service.submenu && <ChevronRight className="h-4 w-4 ml-2" />}
                                              </h4>
                                              <p className="text-xs text-muted-foreground mt-1">
                                                {service.features[0]}
                                              </p>
                                            </div>
                                          </motion.button>
                                          {/* Desktop submenu (opens on hover) */}
                                          {service.submenu && (
                                            <div className="absolute left-full top-0 ml-2 min-w-[300px] z-50 hidden group-hover/service:block">
                                              <div className="bg-zinc-950/95 backdrop-blur-sm rounded-lg shadow-xl border border-green-500/20 p-4 max-h-[400px] overflow-y-auto">
                                                {service.submenu.map((subItem, subIdx) => (
                                                  <motion.button
                                                    key={subIdx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.2, delay: subIdx * 0.05 }}
                                                    onClick={() => subItem.path ? window.location.href = subItem.path : null}
                                                    className="flex items-start gap-3 p-2 rounded-md hover:bg-zinc-800 transition-colors group w-full"
                                                  >
                                                    <div className="text-primary/80 mt-1">
                                                      <div className="h-3.5 w-3.5">{React.createElement(subItem.icon, { 
                                                        className: "opacity-75 hover:opacity-100 transition-opacity"
                                                      })}</div>
                                                    </div>
                                                    <div className="text-left">
                                                      <h4 className="text-white group-hover:text-primary transition-colors text-sm">
                                                        {subItem.title}
                                                      </h4>
                                                    </div>
                                                  </motion.button>
                                                ))}
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
              // Normal nav links
              return (
                <div key={index} className="flex items-center gap-16">
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="relative text-white hover:text-primary font-medium transition-colors duration-300 group"
                  >
                    {typeof link.name === 'string' ? link.name : ''}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  {link.name === "Contact Us" && (
                    <div className="hidden lg:flex items-center gap-3">
                      <a 
                        href="tel:+911169310715" 
                        className="flex items-center justify-center p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-all transform hover:scale-105 border border-green-500/30"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://wa.me/911169310715"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-all transform hover:scale-105 border border-green-500/30"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                      <Button 
                        onClick={() => window.location.href = '/schedule'} 
                        variant="outline" 
                        className="hidden lg:flex items-center justify-center gap-2 px-3 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/30 text-sm"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Schedule Meeting</span>
                      </Button>
                    </div>
                  )}
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
              className="p-3 hover:bg-green-500/10 rounded-lg border border-green-500/30"
            >
              {isMobileMenuOpen ? (
                <X className="h-8 w-8 text-white" />
              ) : (
                <Menu className="h-8 w-8 text-white" />
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
            transition={{ duration: 0.2 }}
            className="fixed top-16 sm:top-20 lg:top-24 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-green-500/20 overflow-y-auto max-h-[calc(100vh-4rem)] z-50 shadow-lg shadow-black/50"
          >
            {/* Contact Options for Mobile */}
            <div className="flex items-center justify-center gap-4 p-4 border-b border-green-500/10">
              <a 
                href="tel:+911169310715" 
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-all border border-green-500/30"
              >
                <PhoneCall className="w-6 h-6" />
              </a>
              <a 
                href="https://wa.me/911169310715"
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-all border border-green-500/30"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <button 
                onClick={() => window.location.href = '/schedule'} 
                className="flex items-center justify-center w-14 h-12 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-all border border-green-500/30"
              >
                <Calendar className="w-8 h-8" />
              </button>
            </div>
            {/* Mobile Nav Links */}
           <div className="flex flex-col space-y-0 px-4 py-2 pb-20 w-full">
              {Array.isArray(navLinks) && navLinks.map((link, index) => {
    if (link.name === "Services") {
      return (
        <div key={index} className="py-2">
          <button
            onClick={() => {
              setServicesDropdownOpen(!servicesDropdownOpen);
              setOpenMobileSubmenus([]);
            }}
            className="text-white hover:text-primary font-medium transition-colors duration-300 flex items-center justify-between w-full px-4"
          >
            <span>{link.name}</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {servicesDropdownOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pl-4 mt-2 border-l border-zinc-700 space-y-2 max-h-[70vh] overflow-y-auto"
              >
                {Object.keys(servicesData).map((category) => (
                  <div key={category} className="mb-3">
                    <h3 className="text-sm font-medium text-primary mb-2 capitalize">
                      {category} Solutions
                    </h3>
                    <div className="space-y-2">
                      {Array.isArray(servicesData[category as keyof typeof servicesData]) && servicesData[category as keyof typeof servicesData].map((service, idx) => {
                        const isSubmenuOpen = openMobileSubmenus.includes(service.title);
                        return (
                          <div key={idx} className="relative">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (service.submenu) {
                                  handleMobileSubmenuToggle(service.title);
                                } else if (service.path) {
                                  window.location.href = service.path;
                                  setIsMobileMenuOpen(false);
                                }
                              }}
                              className="flex items-start gap-3 p-2 rounded-md hover:bg-zinc-800 transition-colors group w-full"
                            >
                              <div className="text-primary">
                                <div className="h-6 w-6">{React.createElement(service.icon)}</div>
                              </div>
                              <div className="text-left flex-1">
                                <h4 className="text-white group-hover:text-primary transition-colors flex items-center justify-between">
                                  {service.title}
                                  {service.submenu && (
                                    <span className="ml-2 bg-green-500/10 p-1 rounded">
                                      <ChevronDown className="h-4 w-4" />
                                    </span>
                                  )}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {service.features[0]}
                                </p>
                              </div>
                            </button>

                            <AnimatePresence>
                              {service.submenu && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="pl-6 mt-2 space-y-2 origin-top bg-zinc-800/50 rounded-lg py-2"
                                >
                                {Array.isArray(service.submenu) && service.submenu.map((subItem, subIdx) => {
                                  if (!subItem || typeof subItem !== 'object') return null;
                                  return (
                                    <button
                                      key={subIdx}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (subItem.path) window.location.href = subItem.path;
                                        setIsMobileMenuOpen(false);
                                        setOpenMobileSubmenus([]);
                                      }}
                                      className="flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-zinc-700/50 transition-colors"
                                    >
                                      <div className="text-primary">
                                        {subItem.icon && React.createElement(subItem.icon, {
                                          className: "h-4 w-4 opacity-75"
                                        })}
                                      </div>
                                      <span className="text-sm text-white/90">{subItem.title}</span>
                                    </button>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
                // Normal nav links
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToSection(link.href);
                    }}
                    className="block text-white hover:text-primary font-medium py-3 transition-colors duration-300 w-full text-left px-4 border-b border-green-500/10 last:border-none hover:bg-green-500/5"
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;