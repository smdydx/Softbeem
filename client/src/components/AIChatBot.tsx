
import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Minimize2, Phone, Search, FileText, Calendar, Users, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { servicesData } from '@/data/services';

interface Message {
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      text: 'नमस्ते! मैं Softbeem का AI Assistant हूं। मैं आपकी मदद कर सकता हूं:\n\n🔷 हमारी सभी Services के बारे में जानकारी\n🔷 Company के बारे में\n🔷 Meeting Schedule करना\n🔷 Career Opportunities\n🔷 Pricing Information\n\nआप मुझसे कुछ भी पूछ सकते हैं!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Comprehensive website information
  const websiteInfo = {
    services: {
      blockchain: [
        "Smart Contract Development - Ethereum, BSC, Polygon पर secure smart contracts",
        "Token Development - ERC-20, BEP-20, Custom tokens with full functionality", 
        "NFT Marketplace - Complete NFT platform with minting, trading features",
        "Crypto Exchange - Centralized/Decentralized exchange platforms",
        "DApp Development - Full-stack decentralized applications",
        "Node Setup - Blockchain node setup और maintenance",
        "Block Explorer - Custom blockchain explorers",
        "Metaverse Development - VR/AR metaverse platforms"
      ],
      it: [
        "Web Development - Modern websites using React, Next.js, PHP",
        "Mobile Apps - iOS/Android native और cross-platform apps",
        "Cloud Services - AWS, Azure, Google Cloud solutions",
        "Game Development - Unity, Unreal Engine games",
        "SaaS Solutions - Complete SaaS platforms",
        "E-commerce - Online stores with payment integration"
      ],
      legal: [
        "Company Registration - Private Ltd, Public Ltd, LLP, OPC",
        "GST Registration & Filing - Complete GST compliance",
        "ROC Compliance - Annual returns, statutory filings",
        "Trademark Registration - Brand protection services",
        "Patent Application - IP protection assistance",
        "SEBI Compliance - Securities market compliance",
        "Corporate Governance - Board meetings, resolutions"
      ],
      digital: [
        "SEO Services - Search engine optimization",
        "Social Media Marketing - Complete social media management",
        "PPC Advertising - Google Ads, Facebook Ads campaigns",
        "Content Marketing - Blog writing, content strategy",
        "Email Marketing - Automated email campaigns"
      ]
    },
    company: {
      about: "Softbeem एक leading technology और legal services company है। हम Blockchain, IT Solutions, Legal Compliance और Digital Marketing में expertise रखते हैं।",
      experience: "5+ years का industry experience",
      clients: "500+ satisfied clients worldwide",
      projects: "1000+ successful projects completed",
      team: "50+ expert professionals",
      location: "India के major cities में offices"
    },
    pricing: {
      blockchain: "₹50,000 से शुरू (project complexity के अनुसार)",
      web: "₹25,000 से शुरू (basic website)",
      mobile: "₹75,000 से शुरू (cross-platform app)",
      legal: "₹5,000 से शुरू (company registration)",
      digital: "₹15,000/month से शुरू (complete package)"
    },
    contact: {
      phone: "+91-XXXXXXXXXX",
      email: "info@softbeem.com",
      schedule: "Free consultation available",
      response: "24 hours के अंदर response guaranteed"
    }
  };

  // Enhanced response logic
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Greeting responses
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('हैलो') || lowerQuery.includes('नमस्ते')) {
      return "नमस्ते! मैं आपकी कैसे मदद कर सकता हूं? आप मुझसे हमारी services, pricing, company information, या कुछ भी पूछ सकते हैं।";
    }

    // Services related queries
    if (lowerQuery.includes('service') || lowerQuery.includes('सेवा')) {
      if (lowerQuery.includes('blockchain') || lowerQuery.includes('ब्लॉकचेन')) {
        return `🔷 **Blockchain Services:**\n\n${websiteInfo.services.blockchain.join('\n')}\n\n💰 **Starting Price:** ${websiteInfo.pricing.blockchain}\n\nकौन सी service के बारे में और जानना चाहते हैं?`;
      }
      if (lowerQuery.includes('web') || lowerQuery.includes('website') || lowerQuery.includes('वेबसाइट')) {
        return `🔷 **Web Development Services:**\n\n${websiteInfo.services.it.slice(0, 3).join('\n')}\n\n💰 **Starting Price:** ${websiteInfo.pricing.web}\n\nकोई specific requirement है?`;
      }
      if (lowerQuery.includes('legal') || lowerQuery.includes('कानूनी')) {
        return `🔷 **Legal Services:**\n\n${websiteInfo.services.legal.join('\n')}\n\n💰 **Starting Price:** ${websiteInfo.pricing.legal}\n\nकिस legal service की जरूरत है?`;
      }
      if (lowerQuery.includes('digital') || lowerQuery.includes('marketing') || lowerQuery.includes('मार्केटिंग')) {
        return `🔷 **Digital Marketing Services:**\n\n${websiteInfo.services.digital.join('\n')}\n\n💰 **Starting Price:** ${websiteInfo.pricing.digital}\n\nकौन सा marketing strategy चाहिए?`;
      }
      
      return `हमारी **सभी Services:**\n\n🔸 **Blockchain Development**\n🔸 **Web & Mobile Development** \n🔸 **Legal & Compliance**\n🔸 **Digital Marketing**\n\nकिस category के बारे में जानना चाहते हैं?`;
    }

    // Company information
    if (lowerQuery.includes('company') || lowerQuery.includes('about') || lowerQuery.includes('कंपनी') || lowerQuery.includes('बारे')) {
      return `**Softbeem के बारे में:**\n\n${websiteInfo.company.about}\n\n📊 **हमारी Achievements:**\n• ${websiteInfo.company.experience}\n• ${websiteInfo.company.clients}\n• ${websiteInfo.company.projects}\n• ${websiteInfo.company.team}\n• ${websiteInfo.company.location}`;
    }

    // Pricing queries
    if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('pricing') || lowerQuery.includes('कीमत') || lowerQuery.includes('दाम')) {
      return `💰 **हमारी Pricing:**\n\n🔸 **Blockchain:** ${websiteInfo.pricing.blockchain}\n🔸 **Web Development:** ${websiteInfo.pricing.web}\n🔸 **Mobile Apps:** ${websiteInfo.pricing.mobile}\n🔸 **Legal Services:** ${websiteInfo.pricing.legal}\n🔸 **Digital Marketing:** ${websiteInfo.pricing.digital}\n\n*Final price project requirements के अनुसार vary हो सकती है।`;
    }

    // Contact and meeting
    if (lowerQuery.includes('contact') || lowerQuery.includes('meeting') || lowerQuery.includes('call') || lowerQuery.includes('संपर्क') || lowerQuery.includes('मीटिंग')) {
      return `📞 **Contact Information:**\n\n• **Phone:** ${websiteInfo.contact.phone}\n• **Email:** ${websiteInfo.contact.email}\n• **Free Consultation:** ${websiteInfo.contact.schedule}\n• **Response Time:** ${websiteInfo.contact.response}\n\nक्या आप meeting schedule करना चाहते हैं?`;
    }

    // Technology specific queries
    if (lowerQuery.includes('smart contract') || lowerQuery.includes('स्मार्ट कॉन्ट्रैक्ट')) {
      return `🔷 **Smart Contract Development:**\n\n• Ethereum, BSC, Polygon support\n• Security audited contracts\n• Gas optimization\n• Custom functionality\n• Testing & deployment\n\n💰 **Price:** ₹50,000 से शुरू\n\n कौन सा blockchain platform चाहिए?`;
    }

    if (lowerQuery.includes('nft') || lowerQuery.includes('एनएफटी')) {
      return `🔷 **NFT Marketplace Development:**\n\n• Complete NFT platform\n• Minting functionality\n• Trading features\n• Wallet integration\n• Royalty system\n\n💰 **Price:** ₹1,50,000 से शुरू\n\nकैसा NFT marketplace चाहिए?`;
    }

    if (lowerQuery.includes('mobile app') || lowerQuery.includes('app') || lowerQuery.includes('मोबाइल ऐप')) {
      return `📱 **Mobile App Development:**\n\n• iOS & Android native\n• React Native cross-platform\n• Flutter development\n• UI/UX design included\n• App Store deployment\n\n💰 **Price:** ${websiteInfo.pricing.mobile}\n\nकैसा app बनवाना चाहते हैं?`;
    }

    // Career related
    if (lowerQuery.includes('career') || lowerQuery.includes('job') || lowerQuery.includes('नौकरी') || lowerQuery.includes('करियर')) {
      return `💼 **Career Opportunities:**\n\n• Blockchain Developers\n• Web Developers\n• Mobile App Developers\n• Legal Executives\n• Digital Marketing Specialists\n\nHamari careers page पर जाकर current openings देख सकते हैं।`;
    }

    // Process related
    if (lowerQuery.includes('process') || lowerQuery.includes('how') || lowerQuery.includes('कैसे') || lowerQuery.includes('प्रक्रिया')) {
      return `🔄 **हमारी Working Process:**\n\n1️⃣ **Consultation** - Free discussion\n2️⃣ **Requirement Analysis** - Detailed planning\n3️⃣ **Proposal** - Timeline & pricing\n4️⃣ **Development** - Regular updates\n5️⃣ **Testing** - Quality assurance\n6️⃣ **Delivery** - Final deployment\n7️⃣ **Support** - Post-launch maintenance`;
    }

    // Timeline queries
    if (lowerQuery.includes('time') || lowerQuery.includes('duration') || lowerQuery.includes('कितना समय') || lowerQuery.includes('अवधि')) {
      return `⏰ **Project Timeline:**\n\n• **Simple Website:** 7-15 days\n• **Complex Web App:** 1-3 months\n• **Mobile App:** 2-4 months\n• **Blockchain Project:** 1-6 months\n• **Legal Registration:** 7-30 days\n\n*Exact timeline project complexity पर depend करती है।`;
    }

    // Technology stack
    if (lowerQuery.includes('technology') || lowerQuery.includes('tech') || lowerQuery.includes('तकनीक')) {
      return `💻 **हमारी Technology Stack:**\n\n**Frontend:** React, Next.js, Vue.js\n**Backend:** Node.js, PHP, Python\n**Mobile:** React Native, Flutter\n**Blockchain:** Solidity, Web3.js\n**Database:** MongoDB, MySQL, PostgreSQL\n**Cloud:** AWS, Azure, Google Cloud`;
    }

    // Default response with suggestions
    return `मुझे खुशी होगी आपकी मदद करने में! आप मुझसे पूछ सकते हैं:\n\n🔸 **Services** - हमारी सभी services के बारे में\n🔸 **Pricing** - कीमतों की जानकारी\n🔸 **Company** - Softbeem के बारे में\n🔸 **Contact** - संपर्क की जानकारी\n🔸 **Process** - काम कैसे करते हैं\n🔸 **Technology** - हमारी technologies\n\nकुछ specific पूछना चाहते हैं?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newUserMessage: Message = {
      type: 'user',
      text: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay for better UX
    setTimeout(() => {
      const response = generateResponse(userMessage);
      const botMessage: Message = {
        type: 'bot',
        text: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const quickActions = [
    { icon: <Building className="h-4 w-4" />, text: "Services", query: "Tell me about your services" },
    { icon: <FileText className="h-4 w-4" />, text: "Pricing", query: "What are your prices?" },
    { icon: <Calendar className="h-4 w-4" />, text: "Meeting", query: "I want to schedule a meeting" },
    { icon: <Users className="h-4 w-4" />, text: "About Us", query: "Tell me about Softbeem company" }
  ];

  const handleQuickAction = (query: string) => {
    setInput(query);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-4 right-4 w-[95vw] max-w-md h-[70vh] max-h-[600px] bg-black/95 backdrop-blur-lg border border-green-500/30 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 flex justify-between items-center border-b border-green-500/20 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="h-6 w-6 text-green-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Softbeem AI Assistant</h3>
                <p className="text-green-400 text-xs">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-b border-green-500/10 shrink-0">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.query)}
                  className="flex items-center gap-2 p-2 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg text-xs text-gray-300 hover:text-white transition-all duration-200"
                >
                  {action.icon}
                  {action.text}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-wrap text-sm ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white border border-green-500/30' 
                    : 'bg-zinc-800/80 text-gray-200 border border-zinc-700/50'
                }`}>
                  <div className="mb-1">{message.text}</div>
                  <div className={`text-xs opacity-60 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-zinc-800/80 text-gray-200 p-3 rounded-2xl border border-zinc-700/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs">Typing...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-green-500/20 shrink-0">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isTyping}
                  className="bg-zinc-800/50 border-green-500/30 text-white placeholder-gray-400 focus:border-green-400 rounded-xl resize-none"
                  style={{ minHeight: '40px' }}
                />
              </div>
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isTyping}
                size="icon" 
                className="bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 text-green-400 border border-green-500/30 rounded-xl h-10 w-10 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {!isOpen && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 right-4 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 rounded-full text-green-400 shadow-lg shadow-green-500/25 border border-green-500/30 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default AIChatBot;
