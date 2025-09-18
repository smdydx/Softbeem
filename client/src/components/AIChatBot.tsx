
import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Minimize2, Phone, Search, FileText, Calendar, Users, Building, Sparkles, MessageSquare } from 'lucide-react';
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
      text: '🙏 नमस्ते! मैं Softbeem का AI Assistant हूं। मैं आपकी मदद कर सकता हूं:\n\n🔷 हमारी सभी Services के बारे में जानकारी\n🔷 Company के बारे में\n🔷 Meeting Schedule करना\n🔷 Career Opportunities\n🔷 Pricing Information\n\nआप मुझसे कुछ भी पूछ सकते हैं!',
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
      phone: "+91-1169310715",
      email: "info@softbeem.com",
      whatsapp: "https://wa.me/911169310715",
      schedule: "Free consultation available",
      response: "24 hours के अंदर response guaranteed"
    }
  };

  // Enhanced response logic with comprehensive AI responses
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Greeting responses
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('हैलो') || lowerQuery.includes('नमस्ते')) {
      return "नमस्ते! 🙏 मैं आपकी कैसे मदद कर सकता हूं? आप मुझसे हमारी services, pricing, company information, या कुछ भी पूछ सकते हैं।";
    }

    // Services related queries
    if (lowerQuery.includes('service') || lowerQuery.includes('सेवा')) {
      if (lowerQuery.includes('blockchain') || lowerQuery.includes('ब्लॉकचेन')) {
        return `🔷 **Blockchain Services:**\n\n${websiteInfo.services.blockchain.join('\n• ')}\n\n💰 **Starting Price:** ${websiteInfo.pricing.blockchain}\n\nकौन सी service के बारे में और जानना चाहते हैं?`;
      }
      if (lowerQuery.includes('web') || lowerQuery.includes('website') || lowerQuery.includes('वेबसाइट')) {
        return `🔷 **Web Development Services:**\n\n• ${websiteInfo.services.it.slice(0, 3).join('\n• ')}\n\n💰 **Starting Price:** ${websiteInfo.pricing.web}\n\nकोई specific requirement है?`;
      }
      if (lowerQuery.includes('legal') || lowerQuery.includes('कानूनी')) {
        return `🔷 **Legal Services:**\n\n• ${websiteInfo.services.legal.join('\n• ')}\n\n💰 **Starting Price:** ${websiteInfo.pricing.legal}\n\nकिस legal service की जरूरत है?`;
      }
      if (lowerQuery.includes('digital') || lowerQuery.includes('marketing') || lowerQuery.includes('मार्केटिंग')) {
        return `🔷 **Digital Marketing Services:**\n\n• ${websiteInfo.services.digital.join('\n• ')}\n\n💰 **Starting Price:** ${websiteInfo.pricing.digital}\n\nकौन सा marketing strategy चाहिए?`;
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
      return `📞 **Contact Information:**\n\n• **Phone:** ${websiteInfo.contact.phone}\n• **Email:** ${websiteInfo.contact.email}\n• **WhatsApp:** ${websiteInfo.contact.whatsapp}\n• **Free Consultation:** ${websiteInfo.contact.schedule}\n• **Response Time:** ${websiteInfo.contact.response}\n\nक्या आप meeting schedule करना चाहते हैं?`;
    }

    // Technology specific queries
    if (lowerQuery.includes('smart contract') || lowerQuery.includes('स्मार्ट कॉन्ट्रैक्ट')) {
      return `🔷 **Smart Contract Development:**\n\n• Ethereum, BSC, Polygon support\n• Security audited contracts\n• Gas optimization\n• Custom functionality\n• Testing & deployment\n\n💰 **Price:** ₹50,000 से शुरू\n\nकौन सा blockchain platform चाहिए?`;
    }

    if (lowerQuery.includes('nft') || lowerQuery.includes('एनएफटी')) {
      return `🔷 **NFT Marketplace Development:**\n\n• Complete NFT platform\n• Minting functionality\n• Trading features\n• Wallet integration\n• Royalty system\n\n💰 **Price:** ₹1,50,000 से शुरू\n\nकैसा NFT marketplace चाहिए?`;
    }

    if (lowerQuery.includes('mobile app') || lowerQuery.includes('app') || lowerQuery.includes('मोबाइल ऐप')) {
      return `📱 **Mobile App Development:**\n\n• iOS & Android native\n• React Native cross-platform\n• Flutter development\n• UI/UX design included\n• App Store deployment\n\n💰 **Price:** ${websiteInfo.pricing.mobile}\n\nकैसा app बनवाना चाहते हैं?`;
    }

    // Career related
    if (lowerQuery.includes('career') || lowerQuery.includes('job') || lowerQuery.includes('नौकरी') || lowerQuery.includes('करियर')) {
      return `💼 **Career Opportunities:**\n\n• Blockchain Developers\n• Web Developers\n• Mobile App Developers\n• Legal Executives\n• Digital Marketing Specialists\n\nहमारी careers page पर जाकर current openings देख सकते हैं।`;
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
    return `मुझे खुशी होगी आपकी मदद करने में! 😊 आप मुझसे पूछ सकते हैं:\n\n🔸 **Services** - हमारी सभी services के बारे में\n🔸 **Pricing** - कीमतों की जानकारी\n🔸 **Company** - Softbeem के बारे में\n🔸 **Contact** - संपर्क की जानकारी\n🔸 **Process** - काम कैसे करते हैं\n🔸 **Technology** - हमारी technologies\n\nकुछ specific पूछना चाहते हैं?`;
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
    { icon: <Building className="h-4 w-4" />, text: "Services", query: "Tell me about your services", color: "blue" },
    { icon: <FileText className="h-4 w-4" />, text: "Pricing", query: "What are your prices?", color: "green" },
    { icon: <Calendar className="h-4 w-4" />, text: "Meeting", query: "I want to schedule a meeting", color: "purple" },
    { icon: <Users className="h-4 w-4" />, text: "About Us", query: "Tell me about Softbeem company", color: "orange" }
  ];

  const handleQuickAction = (query: string) => {
    setInput(query);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="fixed z-[70]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3
            }}
            className="fixed bottom-[6rem] right-4 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] max-h-[600px] bg-gradient-to-b from-zinc-900/98 via-zinc-900/95 to-black/98 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-green-500/30 shadow-2xl shadow-green-500/20 overflow-hidden z-[70]"
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-500/20 animate-pulse" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/30 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full blur-2xl" />
            </div>

            {/* Premium Header */}
            <div className="relative p-3 sm:p-4 md:p-5 bg-gradient-to-r from-green-500/20 via-blue-500/15 to-purple-500/20 border-b border-green-500/30 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <Bot className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse flex items-center justify-center">
                      <Sparkles className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xs sm:text-sm md:text-base bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                      Softbeem AI Assistant
                    </h3>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-green-300 text-[10px] sm:text-xs font-medium">Online • Ready to help</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-1.5 sm:p-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 text-gray-400 hover:text-white transition-all duration-200 backdrop-blur-sm border border-zinc-700/50"
                  >
                    <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-1.5 sm:p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-200 backdrop-blur-sm border border-red-500/30"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Quick Actions */}
            <div className="relative p-2 sm:p-3 md:p-4 border-b border-green-500/20 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50">
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                {quickActions.map((action, index) => {
                  const colorClasses = {
                    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300 hover:from-blue-500/30 hover:to-blue-600/30",
                    green: "from-green-500/20 to-green-600/20 border-green-500/30 text-green-300 hover:from-green-500/30 hover:to-green-600/30",
                    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-300 hover:from-purple-500/30 hover:to-purple-600/30",
                    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-300 hover:from-orange-500/30 hover:to-orange-600/30"
                  };
                  
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleQuickAction(action.query)}
                      className={`flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 md:p-3 bg-gradient-to-r ${colorClasses[action.color as keyof typeof colorClasses]} rounded-xl text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 border backdrop-blur-sm group`}
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                        {action.icon}
                      </div>
                      <span className="truncate group-hover:scale-110 transition-transform">{action.text}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Messages Container with Premium Styling */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] sm:max-w-[85%] p-2 sm:p-3 md:p-4 rounded-2xl whitespace-pre-wrap text-[10px] sm:text-xs md:text-sm leading-relaxed shadow-lg backdrop-blur-sm border ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-white border-green-500/40 shadow-green-500/20' 
                      : 'bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 text-gray-200 border-zinc-700/50 shadow-black/20'
                  }`}>
                    <div className="mb-1 sm:mb-2 break-words font-medium">{message.text}</div>
                    <div className={`text-[8px] sm:text-[10px] md:text-xs opacity-60 font-medium ${message.type === 'user' ? 'text-right text-green-200' : 'text-left text-gray-400'}`}>
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
                  <div className="bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 text-gray-200 p-3 sm:p-4 rounded-2xl border border-zinc-700/50 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-[10px] sm:text-xs font-medium text-green-400">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Premium Input Area */}
            <div className="relative p-2 sm:p-3 md:p-4 border-t border-green-500/30 bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm">
              <div className="flex gap-1.5 sm:gap-2 items-end">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isTyping}
                    className="bg-zinc-800/60 border-green-500/40 text-white placeholder-gray-400 focus:border-green-400 rounded-xl resize-none text-[10px] sm:text-xs md:text-sm pr-8 sm:pr-10 md:pr-12 py-2 sm:py-3 backdrop-blur-sm shadow-inner"
                    style={{ minHeight: '36px' }}
                  />
                  <MessageSquare className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                </div>
                <Button 
                  onClick={handleSend} 
                  disabled={!input.trim() || isTyping}
                  size="icon" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 rounded-xl h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 shrink-0 shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
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
            className="fixed bottom-[6rem] right-4 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 rounded-full text-white shadow-2xl shadow-green-500/40 border border-green-400/50 backdrop-blur-sm group overflow-hidden relative z-[70]"
            onClick={() => setIsOpen(true)}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 rounded-full animate-pulse" />
            
            <Bot className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 relative z-10 group-hover:scale-110 transition-transform" />
            
            {/* Premium status indicator */}
            <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse flex items-center justify-center">
              <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatBot;
