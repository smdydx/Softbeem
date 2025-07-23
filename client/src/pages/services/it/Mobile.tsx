
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Smartphone, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Mobile = () => {
  const services = [
    {
      title: "Grocery Delivery App",
      description: "User-friendly grocery shopping and delivery platform with real-time tracking",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Multiple Store Integration", "Real-time Order Tracking", "Secure Payment Gateway", "Smart Cart Management"]
    },
    {
      title: "Medicine Delivery App",
      description: "HIPAA-compliant healthcare and medicine delivery solution",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Prescription Upload", "Medicine Reminders", "Pharmacy Network", "Secure Health Data"]
    },
    {
      title: "Taxi Booking App",
      description: "Advanced ride-hailing platform with driver-passenger matching",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Real-time Tracking", "Fare Calculator", "Driver Verification", "Route Optimization"]
    },
    {
      title: "Food Delivery App",
      description: "Complete restaurant marketplace and delivery management system",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Restaurant Dashboard", "Order Management", "Live Tracking", "Rating System"]
    },
    {
      title: "Online Learning App",
      description: "Interactive EdTech platform for seamless learning experience",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Video Lectures", "Progress Tracking", "Quiz System", "Live Sessions"]
    },
    {
      title: "Dating & Social App",
      description: "Feature-rich social connection platform with advanced matching",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Smart Matching", "Real-time Chat", "Profile Verification", "Privacy Controls"]
    },
    {
      title: "Fitness Tracking App",
      description: "Comprehensive health and fitness monitoring solution",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Workout Plans", "Progress Analytics", "Diet Tracking", "Community Features"]
    },
    {
      title: "Laundry Service App",
      description: "On-demand laundry service booking and management platform",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Service Scheduling", "Price Calculator", "Status Updates", "Delivery Tracking"]
    },
    {
      title: "Property Rental App",
      description: "Advanced real estate listing and rental management system",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Property Listings", "Virtual Tours", "Booking System", "Payment Integration"]
    }
  ];

  const faqs = [
    {
      question: "What platforms do you develop for?",
      answer: "We develop native apps for iOS and Android, as well as cross-platform solutions using React Native and Flutter."
    },
    {
      question: "How long does it take to develop a mobile app?",
      answer: "Development time varies based on complexity - simple apps take 2-3 months, while complex applications may take 4-6 months."
    },
    {
      question: "Do you provide app maintenance services?",
      answer: "Yes, we offer comprehensive maintenance packages including updates, bug fixes, and performance optimization."
    },
    {
      question: "What about app store submission?",
      answer: "We handle the complete app store submission process for both Apple App Store and Google Play Store."
    },
    {
      question: "Can you integrate third-party services?",
      answer: "Yes, we can integrate various third-party APIs, payment gateways, analytics, and other services based on your requirements."
    }
  ];

  return (
    <div className="bg-background py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        {/* Hero Section */}
        <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Smartphone className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-6">
            Mobile App Development
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg mb-8">
            Transform your business with cutting-edge mobile applications. We create robust, scalable, and user-friendly 
            apps that deliver exceptional user experiences across all platforms.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Start Your Project <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Services Grid */}
        <motion.div variants={fadeIn("up", "tween", 0.3, 1)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="bg-zinc-900/50 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={fadeIn("up", "tween", 0.4, 1)} className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-zinc-900/50 rounded-lg p-6 border border-blue-500/10">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Mobile;
