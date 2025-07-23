import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Users,
  Clock,
  Award,
  FileCode,
  Globe,
  Smartphone
} from "lucide-react";
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
      description: "Tailored blockchain solutions for your business needs",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Custom business logic implementation",
        "Multi-blockchain compatibility",
        "Gas optimization techniques",
        "Security audit included",
        "Complete testing suite"
      ],
      price: "₹50,000",
      duration: "2-4 weeks"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "DeFi Protocol Development",
      description: "Build decentralized finance applications with advanced features",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Yield farming protocols",
        "Liquidity pool management",
        "Automated market makers (AMM)",
        "Governance token integration",
        "Flash loan protection"
      ],
      price: "₹2,50,000",
      duration: "6-8 weeks"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Contract Auditing",
      description: "Comprehensive security audit and optimization services",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Security vulnerability assessment",
        "Gas optimization analysis",
        "Code quality review",
        "Detailed audit report",
        "Remediation recommendations"
      ],
      price: "₹75,000",
      duration: "1-2 weeks"
    }
  ];

  const technologies = [
    { name: "Solidity", icon: "🔷", expertise: "Expert" },
    { name: "Ethereum", icon: "⚡", expertise: "Expert" },
    { name: "Polygon", icon: "🟣", expertise: "Advanced" },
    { name: "Binance Smart Chain", icon: "🟡", expertise: "Advanced" },
    { name: "Hardhat", icon: "⚒️", expertise: "Expert" },
    { name: "Truffle", icon: "🍫", expertise: "Advanced" },
    { name: "Web3.js", icon: "🌐", expertise: "Expert" },
    { name: "OpenZeppelin", icon: "🛡️", expertise: "Expert" }
  ];

  const process = [
    {
      step: "01",
      title: "Requirement Analysis",
      description: "Understanding your business logic and blockchain requirements"
    },
    {
      step: "02", 
      title: "Architecture Design",
      description: "Designing optimal smart contract architecture and gas efficiency"
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Writing secure code with comprehensive test coverage"
    },
    {
      step: "04",
      title: "Security Audit",
      description: "Thorough security review and vulnerability assessment"
    },
    {
      step: "05",
      title: "Deployment & Support",
      description: "Mainnet deployment with ongoing maintenance support"
    }
  ];

  const faqs = [
    {
      question: "What blockchain networks do you support?",
      answer: "We develop smart contracts for Ethereum, Polygon, Binance Smart Chain, Avalanche, and other EVM-compatible networks. We can also work with non-EVM chains like Solana upon request."
    },
    {
      question: "How do you ensure smart contract security?",
      answer: "We follow industry best practices including comprehensive testing, security audits, gas optimization, and use established libraries like OpenZeppelin. Every contract undergoes rigorous testing before deployment."
    },
    {
      question: "What's included in the smart contract audit?",
      answer: "Our audit includes security vulnerability assessment, gas optimization analysis, code quality review, detailed report with findings, and recommendations for improvements."
    },
    {
      question: "Do you provide post-deployment support?",
      answer: "Yes, we offer 3 months of free support after deployment, including bug fixes, minor updates, and technical assistance. Extended support packages are also available."
    },
    {
      question: "How long does smart contract development take?",
      answer: "Timeline depends on complexity. Simple contracts take 1-2 weeks, while complex DeFi protocols can take 6-8 weeks. We provide detailed timelines during project planning."
    }
  ];

  return (
    <div className="min-h-screen bg-[#000510] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/video/ent-blockvid.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
              <Code className="w-4 h-4 mr-2" />
              Blockchain Development
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
              Smart Contract Development
            </h1>

            <p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
              Build secure, efficient, and scalable smart contracts with our expert blockchain developers
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                <FileCode className="w-5 h-5 mr-2" />
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500/50 hover:bg-blue-500/10 px-8 py-4">
                <Globe className="w-5 h-5 mr-2" />
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-[#000510]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Smart Contract Services
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              From simple token contracts to complex DeFi protocols, we deliver enterprise-grade blockchain solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-blue-950/30 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                <div className="p-6">
                  <div className="relative mb-6">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm rounded-lg p-2">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-blue-200 mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-blue-100">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-blue-500/20">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">{service.price}</div>
                      <div className="text-sm text-blue-300">{service.duration}</div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Technologies We Master
            </h2>
            <p className="text-xl text-blue-200">
              Cutting-edge tools and frameworks for robust smart contract development
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="bg-blue-900/30 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 text-center p-6">
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="font-semibold text-white mb-2">{tech.name}</h3>
                <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                  {tech.expertise}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-[#000510]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Our Development Process
            </h2>
            <p className="text-xl text-blue-200">
              A proven methodology ensuring secure and efficient smart contract delivery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-blue-200">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-blue-950/30 border-blue-500/20 rounded-lg px-6">
                  <AccordionTrigger className="text-white hover:text-blue-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-blue-200">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Build Your Smart Contract?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Let's discuss your blockchain project and create secure, efficient smart contracts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4">
              <Smartphone className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4">
              <Globe className="w-5 h-5 mr-2" />
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartContractDev;