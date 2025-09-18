import React from 'react';
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Cpu, Globe } from "lucide-react";

function BlockchainServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.1),_transparent_50%)]" />
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-6"
            >
              Blockchain Development Services
            </motion.h1>
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Harness the power of blockchain technology with our comprehensive development services. 
              From smart contracts to DeFi solutions, we build the future of decentralized applications.
            </motion.p>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="flex gap-4 justify-center flex-wrap"
            >
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-lg px-8"
                onClick={() => window.location.href = '/schedule'}
              >
                Get Started Now <ArrowRight className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500/10 text-lg px-8"
                onClick={() => window.location.href = '/schedule'}
              >
                Schedule Consultation <Zap className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn("up", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            Our Blockchain Solutions
          </motion.h2>
          
          <ImageRow />
          
          <motion.div
            variants={fadeIn("up", "tween", 0.3, 1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-lg px-12"
              onClick={() => window.location.href = '/schedule'}
            >
              Start Your Blockchain Project <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function ImageRow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      <BlockchainImage src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop" alt="Blockchain 1" />
      <BlockchainImage src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop" alt="Blockchain 2" />
      <BlockchainImage src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&h=300&fit=crop" alt="dApp Development" />
      <BlockchainImage src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=500&h=300&fit=crop" alt="Crypto Wallet" />
      <BlockchainImage src="https://images.unsplash.com/photo-1644088379091-d574269d422f?w=500&h=300&fit=crop" alt="Layer 2 Blockchain" />
      <BlockchainImage src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=500&h=300&fit=crop" alt="Blockchain Protocol" />
      <BlockchainImage src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=500&h=300&fit=crop" alt="NFT Marketplace" />
      <BlockchainImage src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=500&h=300&fit=crop" alt="Smart Contract" />
      <BlockchainImage src="https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=500&h=300&fit=crop" alt="Metaverse" />
    </div>
  );
}

interface BlockchainImageProps {
  src: string;
  alt: string;
}

function BlockchainImage({ src, alt }: BlockchainImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '300px', height: '200px', margin: '10px', objectFit: 'cover' }}
    />
  );
}

export default BlockchainServicePage;