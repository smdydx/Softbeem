
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Code, Server, Database, Smartphone, Globe, Shield, Zap, CheckCircle, ArrowRight, Users, Trophy, Clock, Star } from "lucide-react";

const WebDev = () => {
  const services = [
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Business Websites",
      description: "Professional corporate websites that showcase your brand",
      features: ["Responsive Design", "SEO Optimized", "Content Management", "Contact Forms"],
      price: "₹25,000",
      timeline: "2-3 weeks"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
      title: "E-Commerce Stores",
      description: "Complete online stores with payment integration",
      features: ["Shopping Cart", "Payment Gateway", "Inventory Management", "Order Tracking"],
      price: "₹75,000",
      timeline: "4-6 weeks"
    },
    {
      icon: <Code className="w-8 h-8 text-purple-400" />,
      title: "Web Applications",
      description: "Custom web apps tailored to your business needs",
      features: ["Custom Features", "Database Integration", "User Authentication", "Admin Panel"],
      price: "₹1,50,000",
      timeline: "6-10 weeks"
    },
    {
      icon: <Server className="w-8 h-8 text-orange-400" />,
      title: "CMS Platforms",
      description: "Content management systems for easy updates",
      features: ["Easy Content Updates", "Multi-user Access", "SEO Tools", "Analytics"],
      price: "₹50,000",
      timeline: "3-4 weeks"
    }
  ];

  const technologies = [
    { name: "React", icon: "⚛️", color: "text-blue-400" },
    { name: "Next.js", icon: "▲", color: "text-white" },
    { name: "Node.js", icon: "🟢", color: "text-green-400" },
    { name: "MongoDB", icon: "🍃", color: "text-green-500" },
    { name: "TypeScript", icon: "📘", color: "text-blue-500" },
    { name: "Tailwind", icon: "🎨", color: "text-cyan-400" }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We understand your requirements and goals"
    },
    {
      step: "02", 
      title: "Design",
      description: "Create wireframes and visual designs"
    },
    {
      step: "03",
      title: "Development",
      description: "Build your website with latest technologies"
    },
    {
      step: "04",
      title: "Testing",
      description: "Thorough testing across all devices"
    },
    {
      step: "05",
      title: "Launch",
      description: "Deploy and make your website live"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "12+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  const features = [
    "Mobile-First Responsive Design",
    "SEO Optimized Architecture", 
    "Fast Loading Speed",
    "Security Best Practices",
    "Cross-Browser Compatibility",
    "Modern UI/UX Design",
    "Content Management System",
    "Analytics Integration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative container mx-auto px-4"
        >
          <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Web Development
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your digital presence with cutting-edge web solutions that drive results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                Start Your Project
              </button>
              <button className="px-8 py-4 border border-gray-500 text-gray-300 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-all">
                View Portfolio
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-zinc-800/30">
        <motion.div
          variants={staggerContainer}
          initial="hidden" 
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", 0.1 * index, 1)}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Web Development Services
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From simple websites to complex web applications, we deliver solutions that grow your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", 0.1 * index, 1)}
                className="group bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  {service.icon}
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-gray-400 mb-6 text-lg">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-zinc-700">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{service.price}</div>
                    <div className="text-sm text-gray-500">{service.timeline}</div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Get Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-zinc-800/30">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Technologies We Use</h2>
            <p className="text-xl text-gray-400">Modern tools and frameworks for exceptional results</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", 0.1 * index, 1)}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all"
              >
                <div className={`text-4xl mb-3 ${tech.color}`}>{tech.icon}</div>
                <div className="text-white font-semibold">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Our Development Process</h2>
            <p className="text-xl text-gray-400">A proven approach that delivers exceptional results</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", 0.1 * index, 1)}
                className="relative"
              >
                <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all">
                  <div className="text-3xl font-bold text-blue-400 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-800/30">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Why Choose Our Web Development?</h2>
            <p className="text-xl text-gray-400">Features that set us apart from the competition</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", 0.1 * index, 1)}
                className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all"
              >
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-white">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Build Your Website?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Transform your ideas into powerful web solutions. Get started with a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                  Get Free Consultation
                </button>
                <button className="px-8 py-4 border border-gray-500 text-gray-300 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-all">
                  View Our Work
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default WebDev;
