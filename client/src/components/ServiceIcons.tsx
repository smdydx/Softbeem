
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  FileText, 
  Shield, 
  Coins, 
  Server, 
  Globe as GlobeIcon, 
  Gamepad2 
} from 'lucide-react';

const ServiceIcons = () => {
  const services = [
    { icon: Code, name: 'Blockchain', color: 'text-green-400' },
    { icon: Shield, name: 'Smart Contract', color: 'text-green-300' },
    { icon: Smartphone, name: 'Mobile App', color: 'text-blue-400' },
    { icon: GlobeIcon, name: 'Web Dev', color: 'text-orange-400' },
    { icon: Server, name: 'IT Services', color: 'text-yellow-400' },
    { icon: FileText, name: 'Legal', color: 'text-purple-400' },
    { icon: Coins, name: 'Token', color: 'text-red-400' },
    { icon: Gamepad2, name: 'Game Dev', color: 'text-cyan-400' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
      {services.map((service, index) => (
        <motion.div
          key={service.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 3
          }}
          className="flex flex-col items-center gap-1 p-2 rounded-lg bg-zinc-800/30 backdrop-blur-sm border border-green-500/10 hover:border-green-500/30 transition-all"
        >
          <service.icon className={`w-4 h-4 ${service.color}`} />
          <span className="text-[10px] text-white/80 font-medium">{service.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceIcons;
