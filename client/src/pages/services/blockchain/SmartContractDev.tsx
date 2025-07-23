import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Code, ArrowRight } from "lucide-react";

const SmartContractDev = () => {
  const technologies = [
    { name: "Solidity", icon: "💎" },
    { name: "Rust", icon: "⚙️" },
    { name: "Vyper", icon: "🐍" },
    { name: "Web3.js", icon: "🌐" },
    { name: "Hardhat", icon: "🏗️" },
    { name: "Truffle", icon: "🔧" },
  ];

  const features = [
    {
      title: "Custom Smart Contract Development",
      description: "We design and develop smart contracts tailored to your specific business requirements, ensuring functionality, efficiency, and scalability.",
      image: "/images/smartcontract.jpg",
    },
    {
      title: "Smart Contract Auditing",
      description: "We thoroughly review smart contracts to detect vulnerabilities, optimize performance, and guarantee security before deployment",
      image: "/images/SmartContractAudit.jpg",
    },
    {
      title: "DeFi Protocol Development",
      description: "We build secure and scalable decentralized finance (DeFi) protocols to help you launch innovative financial products on blockchain.",
      image: "/images/DeFiProtocol.jpg",
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-zinc-900 to-black overflow-hidden pt-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(0,255,0,0.1)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(0,128,0,0.1)_0%,_transparent_50%)] pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 md:px-6 lg:px-8"
      >
        {/* Hero Section */}
        <motion.div 
          variants={fadeIn("up", "tween", 0.2, 1)} 
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Code className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-6">
            Smart Contract Development
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl">
            Expert smart contract development services with a focus on security, efficiency, and scalability.
          </p>
        </motion.div>

        {/* Hero Content Section */}
        <motion.div 
          variants={fadeIn("up", "tween", 0.3, 1)} 
          className="flex flex-col lg:flex-row gap-8 md:gap-12 mb-16 md:mb-24"
        >
          <div className="w-full lg:w-1/2 h-64 md:h-96 overflow-hidden rounded-xl shadow-lg">
            <img
              src="/images/smartcontract.jpg"
              alt="Smart Contract Banner"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
              Comprehensive Smart Contract Solutions
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              "Smart contracts are the backbone of decentralized applications and blockchain solutions. Our team specializes in crafting highly secure, efficient, and tailored smart contracts that meet your unique business needs."
            </p>
            <div className="mt-6 md:mt-8">
              <Button className="w-full md:w-auto">
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={fadeIn("up", "tween", 0.4, 1)} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24"
        >
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl border border-green-500/10 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/40" />
              <div className="relative p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Technologies Section */}
        <motion.div 
          variants={fadeIn("up", "tween", 0.5, 1)} 
          className="mb-16 md:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Technologies We Use
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-4 md:p-6 rounded-xl bg-zinc-900/50 border border-green-500/10 hover:border-green-500/30 transition-all duration-300"
              >
                <span className="text-3xl md:text-4xl mb-2 md:mb-3">{tech.icon}</span>
                <span className="font-medium text-sm md:text-base text-center">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Our Approach Section */}
        <motion.div 
          variants={fadeIn("up", "tween", 0.6, 1)} 
          className="mb-16 md:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Our Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Approach Cards */}
            {[
              {
                icon: "💡",
                title: "Consultation",
                content: "Expert guidance through every phase of development",
                quote: "Helping you turn ideas into reality."
              },
              {
                icon: "🚀",
                title: "Development",
                content: "Secure, scalable, and robust blockchain solutions",
                quote: "Building the future of decentralized systems."
              },
              {
                icon: "🔒",
                title: "Security & Audits",
                content: "Comprehensive security checks and optimizations",
                quote: "Your safety is our priority."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-6 md:p-8 bg-zinc-900/50 border border-green-500/10 hover:border-green-500/30 rounded-2xl transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 text-center">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mb-4 text-center">
                  {item.content}
                </p>
                <p className="text-green-400/80 text-sm italic text-center">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          variants={fadeIn("up", "tween", 0.7, 1)} 
          className="mb-16 md:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: "👨💻",
                title: "Expert Team",
                content: "Certified blockchain developers with 5+ years experience"
              },
              {
                icon: "🛡️",
                title: "Security First",
                content: "Multiple audit layers and penetration testing"
              },
              {
                icon: "⚡",
                title: "Fast Delivery",
                content: "Agile development process with quick iterations"
              },
              {
                icon: "🔁",
                title: "Lifetime Support",
                content: "24/7 maintenance and upgrade support"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-6 md:p-8 bg-zinc-900/50 border border-green-500/10 hover:border-green-500/30 rounded-2xl transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          variants={fadeIn("up", "tween", 0.8, 1)} 
          className="mb-16 md:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
            {[
              {
                question: "What is a Smart Contract?",
                answer: "Self-executing contracts with terms written in code, running on blockchain for automated transactions."
              },
              {
                question: "How do you ensure security?",
                answer: "Through multi-layered audits, formal verification, and continuous monitoring."
              },
              {
                question: "Development timeline?",
                answer: "Typically 2-6 weeks depending on complexity, with agile delivery milestones."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="p-6 md:p-8 bg-zinc-900/50 border border-green-500/10 rounded-xl"
              >
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          variants={fadeIn("up", "tween", 0.9, 1)} 
          className="text-center py-12 md:py-16 bg-zinc-900/50 rounded-2xl border border-green-500/10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Start Your Blockchain Journey
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 md:mb-10 text-sm md:text-base">
            Ready to implement secure, efficient smart contracts? Let's discuss your project.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              Schedule Consultation
            </Button>
            <Button variant="outline" className="w-full md:w-auto border-green-500/30 text-green-400 hover:bg-green-500/10">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default SmartContractDev;
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { ArrowRight, Shield, Code, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SmartContractDev = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Smart Contract Development",
      description: "We develop tailored smart contracts for your specific business needs, ensuring optimal functionality and security.",
      features: ["Custom Logic Implementation", "Gas Optimization", "Multi-chain Support", "Upgradeable Contracts"],
      image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&h=400&fit=crop"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Smart Contract Audit & Security",
      description: "Comprehensive security audits to identify vulnerabilities and ensure your smart contracts are bulletproof.",
      features: ["Security Analysis", "Vulnerability Assessment", "Code Review", "Best Practices Implementation"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "DeFi Smart Contracts",
      description: "Specialized development of DeFi protocols including DEXs, lending platforms, and yield farming contracts.",
      features: ["AMM Development", "Lending Protocols", "Yield Farming", "Governance Tokens"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Token Contract Development",
      description: "Create ERC-20, ERC-721, ERC-1155 tokens with advanced features and complete compliance.",
      features: ["ERC Standards", "Tokenomics Design", "Minting/Burning", "Transfer Restrictions"],
      image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=600&h=400&fit=crop"
    }
  ];

  const blockchains = [
    { name: "Ethereum", icon: "⟠", color: "text-blue-400" },
    { name: "Binance Smart Chain", icon: "🟡", color: "text-yellow-400" },
    { name: "Polygon", icon: "🟣", color: "text-purple-400" },
    { name: "Avalanche", icon: "🔺", color: "text-red-400" },
    { name: "Solana", icon: "🌈", color: "text-green-400" },
    { name: "Cardano", icon: "🔵", color: "text-blue-400" },
    { name: "Polkadot", icon: "⚫", color: "text-pink-400" },
    { name: "Arbitrum", icon: "🔷", color: "text-blue-500" }
  ];

  return (
    <main className="relative min-h-screen bg-zinc-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-blue-900/20"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 sm:pt-28 md:pt-32 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Smart Contract Development</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Secure Smart Contract Solutions
            </h1>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Build robust, secure, and efficient smart contracts that power the future of decentralized applications. 
              Our expert developers ensure your contracts are optimized for performance and security.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div variants={fadeIn("up", "tween", 0.3, 1)} className="mb-20">
            <div className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=400&fit=crop"
                alt="Smart Contract Development"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl font-bold">Professional Smart Contract Development</h3>
                <p className="text-gray-300">Secure, Audited, and Optimized Solutions</p>
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeIn("up", "tween", 0.4 + index * 0.1, 1)}
                className="group relative overflow-hidden rounded-2xl border border-green-500/10 hover:border-green-500/30 transition-all duration-300 backdrop-blur-sm shadow-xl"
              >
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/40"></div>
                </div>

                <div className="relative p-8 h-full flex flex-col">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supported Blockchains */}
          <motion.div variants={fadeIn("up", "tween", 0.8, 1)} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Supported Blockchain Networks</h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                We develop smart contracts across multiple blockchain platforms, ensuring compatibility and optimal performance.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {blockchains.map((blockchain, index) => (
                <div
                  key={blockchain.name}
                  className="flex flex-col items-center p-6 rounded-2xl bg-zinc-900/50 border border-green-500/10 hover:border-green-500/30 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-4xl mb-3">{blockchain.icon}</span>
                  <h3 className={`font-medium text-center ${blockchain.color}`}>{blockchain.name}</h3>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Development Process */}
          <motion.div variants={fadeIn("up", "tween", 0.9, 1)} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Development Process</h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                We follow a systematic approach to ensure your smart contracts are secure, efficient, and bug-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Requirements Analysis",
                  description: "Understanding your business logic and requirements",
                  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                },
                {
                  step: "02",
                  title: "Smart Contract Design",
                  description: "Architecting secure and efficient contract structure",
                  image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop"
                },
                {
                  step: "03",
                  title: "Development & Testing",
                  description: "Coding with best practices and comprehensive testing",
                  image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop"
                },
                {
                  step: "04",
                  title: "Audit & Deployment",
                  description: "Security audit and mainnet deployment",
                  image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?w=400&h=300&fit=crop"
                }
              ].map((process, index) => (
                <div key={process.step} className="relative">
                  <div className="rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={process.image} 
                      alt={process.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-primary text-black font-bold px-3 py-1 rounded-full">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                  <p className="text-gray-400">{process.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={fadeIn("up", "tween", 1.0, 1)} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  question: "What is a smart contract and why do I need one?",
                  answer: "Smart contracts are self-executing contracts with terms directly written into code. They automatically execute when predetermined conditions are met, eliminating the need for intermediaries and reducing costs while increasing transparency and security."
                },
                {
                  question: "How much does smart contract development cost?",
                  answer: "The cost varies based on complexity, features, and blockchain platform. Simple token contracts start from $2,000, while complex DeFi protocols can range from $10,000 to $50,000 or more. We provide detailed quotes after understanding your requirements."
                },
                {
                  question: "How long does it take to develop a smart contract?",
                  answer: "Development time depends on complexity. Simple contracts take 1-2 weeks, while complex systems with multiple contracts can take 6-12 weeks. This includes development, testing, audit, and deployment phases."
                },
                {
                  question: "Do you provide smart contract audits?",
                  answer: "Yes, we provide comprehensive smart contract audits including security analysis, vulnerability assessment, gas optimization, and best practices implementation. All our contracts undergo rigorous testing before deployment."
                },
                {
                  question: "Can you upgrade smart contracts after deployment?",
                  answer: "We can implement upgradeable smart contract patterns using proxy contracts, allowing for future updates while maintaining security. However, this must be planned during the initial development phase."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="rounded-xl border border-green-500/10 hover:border-green-500/30 transition-all duration-300 bg-zinc-900/50"
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="px-6 py-4 text-left">
                        <span className="text-lg font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4">
                        <p className="text-gray-400">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={fadeIn("up", "tween", 1.1, 1)} className="text-center">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-12 border border-green-500/10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Smart Contract?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Let's discuss your project requirements and create secure, efficient smart contracts that power your decentralized application.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  <Link to="/schedule">Schedule Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-green-500/30 hover:bg-green-500/10">
                  <Link to="/services/blockchain">View All Services</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default SmartContractDev;
