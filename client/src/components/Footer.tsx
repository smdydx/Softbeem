import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Linkedin, Facebook, Instagram, ArrowUp, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { settings } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest("POST", "/api/subscribe", { email });
      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    }
  };

  const Navigation = ({ links }: { links: Array<{ name: string; path: string }> }) => {
    return (
      <ul className="space-y-4">
        {Array.isArray(links) && links.map((link, index) => {
          if (!link || typeof link !== 'object') return null;
          return (
            <li key={index}>
              <Link
                to={link.path}
                className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group text-sm lg:text-base"
              >
                <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {typeof link.name === 'string' ? link.name : ''}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Blog & Insights", href: "/blog" },
    { name: "Contact Us", href: "/#contact" },
    { name: "Careers", href: "/careers" },
  ];

  const techServices = [
    { name: "Smart Contract Development", href: "/services/blockchain/smart-contract-development" },
    { name: "Token Development", href: "/services/blockchain/token-development" },
    { name: "NFT Marketplace", href: "/services/blockchain/nft-marketplace" },
    { name: "Crypto Exchange", href: "/services/blockchain/crypto-exchange" },
    { name: "Web Development", href: "/services/it/web-development" },
  ];

  return (
    <footer className="bg-gradient-to-b from-zinc-900 to-black pt-16 pb-8 w-full relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Company Info */}
          <motion.div 
            variants={fadeInUp}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Link to="/" className="cursor-pointer">
              <div className="flex items-center mb-6">
                <img 
                  src={settings.logoUrl || "/images/ramaera-logo.jpg"} 
                  alt={`${settings.companyName || 'Ramaera'} Logo`} 
                  className="h-14 w-14 rounded-full border-2"
                  style={{ borderColor: `${settings.themeColor || '#ff6b35'}30` }}
                />
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white">{settings.companyName || 'Softbeem'}</h3>
                </div>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm lg:text-base">
              Softbeem managed by Ramaera Legal InfoTech Private Limited, a premier technology and legal services company providing innovative solutions for businesses across sectors.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/ramaera-legal-infotech-pvt-ltd/" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 bg-zinc-800/80 hover:bg-green-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-zinc-700/50 hover:border-green-500/30">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61571353791629" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 bg-zinc-800/80 hover:bg-green-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-zinc-700/50 hover:border-green-500/30">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
              </a>
              <a href="https://www.instagram.com/ramaera_legal_infotech_pvt_ltd?igsh=MWt1bWgycHBzMW9iZw==" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 bg-zinc-800/80 hover:bg-green-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-zinc-700/50 hover:border-green-500/30">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="col-span-1">
            <h3 className="text-lg lg:text-xl font-semibold mb-6 text-white flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center group text-sm lg:text-base"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Services */}
          <motion.div variants={fadeInUp} className="col-span-1">
            <h3 className="text-lg lg:text-xl font-semibold mb-6 text-white flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              Tech Services
            </h3>
            <ul className="space-y-3">
              {techServices.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center group text-sm lg:text-base"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={fadeInUp} className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg lg:text-xl font-semibold mb-6 text-white flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              Newsletter
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm lg:text-base">
              Stay updated with our latest technology trends and legal insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-sm lg:text-base" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/20 text-sm lg:text-base"
              >
                Subscribe <Send className="h-4 w-4 ml-2" />
              </Button>
              <p className="text-xs text-gray-500 leading-relaxed">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Ramaera Legal InfoTech Private Limited. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg ${
          showBackToTop ? "visible" : "invisible"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;