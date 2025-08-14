
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Globe, ShoppingCart, Newspaper, Tag, Heart, Briefcase, Calendar, Code, Server, Shield, Smartphone, Database, Zap, Layers } from "lucide-react";
import { useState } from "react";

const WebDev = () => {
  const [imageError, setImageError] = useState(false);
  const [componentError, setComponentError] = useState(false);

  if (componentError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-24 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl mb-4">Web Development Services</h1>
          <p>Loading content...</p>
        </div>
      </div>
    );
  }

  const services = [
    {
      icon: <Globe className="w-8 h-8 text-green-400" />,
      title: "Website Builder Platform",
      description: "Create stunning, professional-grade websites with our intuitive drag-and-drop builder that requires no coding knowledge. Perfect for businesses, portfolios, and personal sites.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Drag & Drop Interface with real-time preview",
        "100+ Responsive Templates for all industries",
        "Custom Domain Integration with SSL security",
        "Built-in SEO Optimization Tools for better rankings",
        "Analytics integration to track visitor behavior"
      ]
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-green-400" />,
      title: "eCommerce Store Platform",
      description: "Launch your fully-featured online store with multi-vendor support, secure payments, and comprehensive inventory management to scale your business.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Multi-Vendor Marketplace capabilities",
        "20+ Payment Gateway Integrations (Stripe, PayPal, etc.)",
        "Advanced Inventory Management with low stock alerts",
        "Real-time Order Tracking System with notifications",
        "Customer review and rating system"
      ]
    },
    {
      icon: <Newspaper className="w-8 h-8 text-green-400" />,
      title: "Blog & News Publishing CMS",
      description: "Enterprise-grade content management system designed for publishers, bloggers, and media houses with advanced content scheduling and distribution features.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Advanced Rich Text Editor with media embedding",
        "Content Scheduling with calendar view",
        "Multi-level Category Management with tags",
        "User Comments System with moderation tools",
        "AMP support for faster mobile loading"
      ]
    },
    {
      icon: <Tag className="w-8 h-8 text-green-400" />,
      title: "Classified Ads Portal",
      description: "Powerful classified marketplace solution with advanced search, geolocation, and monetization features to create your own Craigslist-style platform.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Ad Listing Management with expiration dates",
        "Category Navigation with filters",
        "Location-based Search with Google Maps integration",
        "User Dashboard with saved favorites",
        "Premium listing options for monetization"
      ]
    },
    {
      icon: <Heart className="w-8 h-8 text-green-400" />,
      title: "Matrimony Portal",
      description: "Complete matrimonial matching platform with AI-powered recommendations, verified profiles, and secure communication channels for serious matchmaking.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Detailed Profile Management with verification",
        "AI-based Match Recommendations",
        "Secure Chat Integration with read receipts",
        "Advanced Privacy Controls for sensitive data",
        "Horoscope matching and compatibility scoring"
      ]
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-400" />,
      title: "Job Recruitment Portal",
      description: "Comprehensive job board solution connecting employers with qualified candidates through intelligent matching algorithms and resume parsing technology.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Advanced Job Posting System with rich formatting",
        "Resume Database with search functionality",
        "Application Tracking System (ATS) for employers",
        "Company Profiles with branding options",
        "Automated job matching for candidates"
      ]
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-400" />,
      title: "Event Management Portal",
      description: "End-to-end event planning and ticketing system with calendar integration, attendee management, and promotional tools for event organizers.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Event Creation with rich media and descriptions",
        "Ticket Management with multiple pricing tiers",
        "Calendar Integration with sync capabilities",
        "Attendee Management with check-in system",
        "Promotional tools and affiliate tracking"
      ]
    }
  ];

  const technologies = [
    { name: "React/Next.js", icon: <Code className="w-6 h-6" />, description: "Modern frontend frameworks for blazing fast, SEO-friendly web applications" },
    { name: "Node.js", icon: <Server className="w-6 h-6" />, description: "Scalable backend runtime for building efficient server-side applications" },
    { name: "MongoDB", icon: <Database className="w-6 h-6" />, description: "NoSQL database for flexible, high-performance data storage" },
    { name: "GraphQL", icon: <Layers className="w-6 h-6" />, description: "Efficient API query language for precise data fetching" },
    { name: "Tailwind CSS", icon: <Smartphone className="w-6 h-6" />, description: "Utility-first CSS framework for responsive, modern designs" },
    { name: "Security", icon: <Shield className="w-6 h-6" />, description: "Enterprise-grade security including OAuth, JWT, and data encryption" },
    { name: "WebSockets", icon: <Zap className="w-6 h-6" />, description: "Real-time communication for chat and live updates" },
  ];

  const faqs = [
    {
      question: "What technologies do you use for web development?",
      answer: "We specialize in the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js for optimal performance. Our solutions also incorporate modern tools like GraphQL for efficient data fetching, Tailwind CSS for responsive designs, and Docker for containerization. We choose technologies based on your specific project requirements, budget, and scalability needs."
    },
    {
      question: "How long does it take to develop a website?",
      answer: "Development timelines vary significantly based on complexity: Basic brochure websites (5-10 pages): 2-3 weeks • Custom business websites: 3-6 weeks • eCommerce platforms: 6-10 weeks • Complex web applications: 3-6 months. We provide detailed project timelines after our initial consultation and requirements analysis."
    },
    {
      question: "Do you provide website maintenance services?",
      answer: "Yes, we offer three tiers of maintenance packages: Basic (updates & backups): $99/month • Standard (includes security monitoring): $199/month • Premium (24/7 support + emergency fixes): $399/month. All plans include monthly performance reports, software updates, and security patches to keep your site running smoothly."
    },
    {
      question: "Is the website mobile responsive?",
      answer: "Absolutely. We build all websites with a mobile-first approach, ensuring perfect functionality across all devices. Our responsive designs automatically adapt to phones (iOS/Android), tablets (iPad/Android), and desktops. We test on 50+ real devices (not just emulators) to guarantee flawless performance."
    },
    {
      question: "What about website security?",
      answer: "Security is our top priority. We implement: SSL encryption (HTTPS) • Regular security audits • Web Application Firewall (WAF) • DDoS protection • SQL injection prevention • Regular automated backups • Two-factor authentication for admin areas • GDPR/CCPA compliance features. Enterprise clients can opt for additional security layers."
    },
    {
      question: "Can you migrate my existing website?",
      answer: "Yes, we specialize in seamless website migrations with zero downtime. Our process includes: Complete backup of your current site • Database migration • Content transfer • URL redirect mapping • Testing on staging environment • DNS transition planning. We've successfully migrated 200+ websites with no data loss."
    },
    {
      question: "Do you provide content creation services?",
      answer: "We partner with professional copywriters and photographers to offer: SEO-optimized content writing • Product photography • Infographic design • Video production • Blog article creation (from $50/article). Our content team understands how to create materials that convert visitors into customers."
    },
    {
      question: "What's your pricing structure?",
      answer: "We offer transparent pricing models: Fixed-price projects (for well-defined requirements) • Time & materials (for agile development) • Retainer agreements (for ongoing work). Typical investment ranges: Basic website: $2,000-$5,000 • eCommerce site: $6,000-$15,000 • Custom web applications: $15,000+. Request a free quote for accurate pricing."
    }
  ];

  const processSteps = [
    {
      title: "Discovery & Planning",
      description: "We start with in-depth consultations to understand your business goals, target audience, and technical requirements. This phase includes competitor analysis, sitemap creation, and technology stack selection."
    },
    {
      title: "UI/UX Design",
      description: "Our designers create wireframes and prototypes focusing on user experience. You'll receive 2-3 design concepts for feedback before we proceed to development."
    },
    {
      title: "Development",
      description: "Using agile methodology, we build your website in sprints with regular demos. Frontend and backend development happen simultaneously for efficiency."
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing across browsers, devices, and performance metrics. We check for bugs, security vulnerabilities, and UX issues before launch."
    },
    {
      title: "Deployment & Training",
      description: "We handle server setup, domain configuration, and go-live support. You'll receive comprehensive training on managing your content through our CMS."
    },
    {
      title: "Ongoing Support",
      description: "Post-launch, we offer maintenance packages, performance monitoring, and enhancement services to keep your website current and competitive."
    }
  ];

  try {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="container mx-auto px-4 py-20"
      >
        {/* Hero Section */}
        <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
            Professional Web Development & CMS Solutions
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Transform your digital presence with our cutting-edge web development services. Since 2012, we've helped 500+ businesses 
            across 15 industries build scalable, secure, and high-performing web platforms that drive growth and engagement. 
            Whether you need a simple website or a complex web application, our full-stack expertise delivers results.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={fadeIn("up", "tween", 0.3, 1)} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-zinc-800/50 p-6 rounded-lg text-center border border-green-500/20">
            <div className="text-3xl font-bold text-green-400 mb-2">12+</div>
            <div className="text-gray-300">Years Experience</div>
          </div>
          <div className="bg-zinc-800/50 p-6 rounded-lg text-center border border-green-500/20">
            <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
            <div className="text-gray-300">Projects Delivered</div>
          </div>
          <div className="bg-zinc-800/50 p-6 rounded-lg text-center border border-green-500/20">
            <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
            <div className="text-gray-300">Client Satisfaction</div>
          </div>
          <div className="bg-zinc-800/50 p-6 rounded-lg text-center border border-green-500/20">
            <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-gray-300">Support Available</div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div variants={fadeIn("up", "tween", 0.4, 1)} className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">Our Web Development Services</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-10">
            We specialize in building custom web solutions tailored to your business needs. 
            From simple websites to complex web applications, our full-cycle development process ensures quality at every stage.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", 0.2 * index, 1)}
                className="bg-zinc-800/50 rounded-lg overflow-hidden border border-green-500/20 hover:border-green-500/50 transition-colors"
              >
                <div className="h-48 relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/services/website-builder.jpg';
                      setImageError(true);
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {service.icon}
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div variants={fadeIn("up", "tween", 0.5, 1)} className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">Our Technology Stack</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-10">
            We use cutting-edge technologies to build fast, secure, and scalable web applications.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-zinc-800/50 p-4 rounded-lg border border-green-500/20 text-center">
                <div className="flex justify-center mb-3 text-green-400">
                  {tech.icon}
                </div>
                <h4 className="font-medium mb-1 text-white">{tech.name}</h4>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Development Process */}
        <motion.div variants={fadeIn("up", "tween", 0.6, 1)} className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">Our Development Process</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-10">
            Transparent, collaborative, and efficient - our 6-phase process ensures your project's success from concept to launch.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-zinc-800/50 p-6 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/20 text-green-400 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={fadeIn("up", "tween", 0.7, 1)} className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-10">
            Get answers to common questions about our web development services and process.
          </p>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-zinc-800/50 rounded-lg p-6 border border-green-500/20 hover:border-green-500/50 transition-colors">
                <h3 className="text-xl font-semibold mb-3 text-white">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={fadeIn("up", "tween", 0.8, 1)} className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Build Your Website?</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Whether you have a project in mind or need guidance on your web strategy, our team is ready to help.
          </p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
            Get a Free Consultation
          </button>
        </motion.div>
      </motion.div>
    </main>
    );
  } catch (error) {
    console.error('WebDev component error:', error);
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-24 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl mb-4">Web Development Services</h1>
          <p>Content temporarily unavailable. Please try again.</p>
        </div>
      </div>
    );
  }
};

export default WebDev;
