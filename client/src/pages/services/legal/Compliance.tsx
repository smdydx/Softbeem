
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, slideIn } from "@/lib/animations";
import { ArrowRight, Check, ExternalLink, Phone, MessageCircle, Star, Users, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { useEffect } from "react";

const images = [
  "/images/services/business-growth.jpg",
  "/images/services/bussiness.jpg",
  "/images/services/classified.jpg",
];

const services = [
  {
    title: "Company Incorporation Services",
    icon: "🏢",
    color: "from-blue-500 to-cyan-500",
    items: [
      "Private Limited Company Registration",
      "Public Limited Company Registration",
      "One Person Company (OPC) Registration",
      "Limited Liability Partnership (LLP) Registration",
      "Section 8 (Non-Profit Company) Registration",
      "Producer Company Registration",
      "Nidhi Company Registration",
      "Foreign Company Setup",
    ],
  },
  {
    title: "Company Law Compliance Services",
    icon: "⚖️",
    color: "from-purple-500 to-indigo-500",
    items: [
      "Annual Returns Filing (MGT-7, AOC-4)",
      "Statutory Registers Maintenance",
      "Board & General Meetings",
      "ROC Compliance Filings",
      "Company Conversions",
      "MOA and AOA Alterations",
    ],
  },
  {
    title: "Corporate Governance Services",
    icon: "🏛️",
    color: "from-emerald-500 to-teal-500",
    items: [
      "Corporate Governance Advisory",
      "Secretarial Audit",
      "Code of Conduct & Policies",
      "Committee Setup",
    ],
  },
  {
    title: "Event-Based Compliance Services",
    icon: "📅",
    color: "from-orange-500 to-red-500",
    items: [
      "Allotment of Shares (Rights Issue, Private Placement, Bonus Issue)",
      "Transfer/Transmission of Shares",
      "Share Buy-back",
      "Mergers, Amalgamations, and Demergers",
      "Strike off (Closure) of Companies",
    ],
  },
  {
    title: "FEMA and RBI Compliance Services",
    icon: "🏦",
    color: "from-pink-500 to-rose-500",
    items: [
      "FDI (Foreign Direct Investment) Reporting (FC-GPR, FC-TRS)",
      "External Commercial Borrowing (ECB) filings",
      "Liaison/Branch/Project Office Setup Compliance",
      "ODI (Overseas Direct Investment) compliance",
    ],
  },
  {
    title: "Intellectual Property Rights Support",
    icon: "💡",
    color: "from-yellow-500 to-amber-500",
    items: [
      "Trademark Registration",
      "Copyright Registration",
      "Patent Application Assistance",
      "Drafting IP Assignment/License Agreements",
    ],
  },
  {
    title: "Legal Drafting Services",
    icon: "✍️",
    color: "from-violet-500 to-purple-500",
    items: [
      "Shareholders Agreements",
      "Founders Agreements",
      "Joint Venture Agreements",
      "Service Agreements",
      "Employment Contracts",
      "Non-Disclosure Agreements (NDAs)",
    ],
  },
  {
    title: "Advisory Services",
    icon: "🧑‍💼",
    color: "from-lime-500 to-green-500",
    items: [
      "Startup Advisory (Funding, Structuring, ESOPs)",
      "Due Diligence Reports (for M&A, Investors)",
      "Corporate Restructuring Advisory",
      "Insolvency and Bankruptcy Advisory (under IBC)",
    ],
  },
  {
    title: "Labour Law Registrations and Compliance",
    icon: "👷",
    color: "from-sky-500 to-blue-500",
    items: [
      "Shops and Establishment Registration",
      "Provident Fund (PF) and Employee State Insurance (ESI) Registration",
      "Professional Tax Registration",
      "Labour Welfare Fund compliance",
    ],
  },
  {
    title: "Certification Services",
    icon: "📜",
    color: "from-indigo-500 to-purple-500",
    items: [
      "Secretarial Audit Reports",
      "Compliance Certificates (e.g., for Listed Companies)",
      "Certification under SEBI Regulations",
      "Certification for Mergers/Amalgamations",
      "Certification under FEMA/RBI Compliance",
    ],
  },
  {
    title: "Listing Compliance",
    icon: "📈",
    color: "from-green-500 to-emerald-500",
    items: [
      "BSE/NSE Listing Assistance",
      "SEBI (LODR) Compliance",
      "Periodic Disclosures and Filings",
    ],
  },
  {
    title: "Specialized Services",
    icon: "💼",
    color: "from-red-500 to-pink-500",
    items: [
      "Virtual Company Secretary Services (for Startups and SMEs)",
      "ESOP Structuring and Administration",
      "Corporate Social Responsibility (CSR) Compliance",
      "Risk Management Advisory",
      "Internal Controls and Process Advisory",
    ],
  },
  {
    title: "Good & Services Tax (GST)",
    icon: "📊",
    color: "from-cyan-500 to-blue-500",
    items: [
      "GST Registration",
      "GST Registration Amendment",
      "GST Cancellation/Surrender",
      "GST LUT Filing (Annual)",
      "Gst Invoice & E-Way Bill",
      "GST Nil Return Filing",
      "GST Return Filing",
      "GST Annual Return - GSTR - 9",
      "Merchant Exporter GST",
    ]
  },
];

// Enhanced ContactButtons component
function ContactButtons() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
      <motion.a
        href="https://wa.me/+911169310715"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-xl transition-all duration-300 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.a>
      <motion.a
        href="tel:+911169310715"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-xl transition-all duration-300 group"
      >
        <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.a>
    </div>
  );
}

export default function Compliance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Carousel className="h-full" autoPlay interval={5000}>
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative h-full"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6 }}
              >
                <img
                  src={`/images/services/img1.jpg`}
                  alt="Legal Services"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-zinc-900/90" />
              </motion.div>
            ))}
          </Carousel>
        </motion.div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 mb-6 leading-tight"
            >
              Start Right. Build Smart. Grow Legally.
            </motion.h1>
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto"
            >
              At <span className="text-green-400 font-semibold">SOFTBEEM</span>, powered by RAMAERA Legal Infotech Pvt Ltd, we offer end-to-end company incorporation services to help entrepreneurs, startups, and corporates establish legally compliant entities in India — quickly, seamlessly, and affordably.
            </motion.p>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-8 py-4 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = 'tel:+911169310715'}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('https://wa.me/911169310715', '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ContactButtons />

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10" />
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Users, number: "500+", label: "Happy Clients" },
              { icon: Award, number: "10+", label: "Years Experience" },
              { icon: Star, number: "100%", label: "Success Rate" },
              { icon: Clock, number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", index * 0.1, 1)}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Who We Are Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(74,222,128,0.1),_transparent_50%)]" />
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
            >
              Who We Are
            </motion.h2>
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-xl text-gray-300 mb-12 text-center max-w-4xl mx-auto leading-relaxed"
            >
              At SOFTBEEM, we are a team of dedicated legal and compliance experts with years of experience in corporate law and regulatory requirements. Our mission is to simplify complex compliance processes and ensure your business operates within the legal framework smoothly and efficiently.
            </motion.p>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Expertise",
                  desc: "Specialized knowledge in corporate law and compliance across industries",
                  icon: "🎯",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Experience",
                  desc: "10+ years of helping businesses navigate regulatory requirements",
                  icon: "⭐",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "Commitment",
                  desc: "Dedicated to providing timely and accurate compliance solutions",
                  icon: "🤝",
                  color: "from-green-500 to-emerald-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-zinc-800/40 backdrop-blur-sm p-8 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(74,222,128,0.1),_transparent_50%)]" />
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
          >
            Our Premium Services
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-zinc-800/30 backdrop-blur-sm p-8 rounded-3xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`text-4xl p-3 rounded-2xl bg-gradient-to-br ${service.color} bg-opacity-20`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {service.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-4 group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <Link
                          to={`/services/legal/${item.toLowerCase().replace(/[\s()&]/g, "-").replace(/--+/g, "-")}`}
                          className="text-gray-300 hover:text-green-400 transition-all duration-300 flex-1 group-hover/item:translate-x-2 leading-relaxed font-medium relative"
                        >
                          <span className="border-b border-transparent hover:border-green-400 transition-all duration-300">
                            {item}
                          </span>
                          <ExternalLink className="inline-block w-4 h-4 ml-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 text-green-400" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500/30 rounded-3xl transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-xl text-gray-400"
            >
              Trusted by businesses across India
            </motion.p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {[
              {
                name: "Rajesh Kumar",
                position: "CEO",
                company: "TechStart Solutions",
                content: "SOFTBEEM's compliance services have been instrumental in keeping our company compliant with all regulatory requirements. Their expertise and professionalism are unmatched.",
                rating: 5
              },
              {
                name: "Priya Sharma",
                position: "Director",
                company: "Innovation Corp",
                content: "The team's thorough understanding of corporate compliance helped us navigate complex regulatory challenges. Their support has been invaluable to our business growth.",
                rating: 5
              },
              {
                name: "Amit Patel",
                position: "Founder",
                company: "Digital Ventures",
                content: "Exceptional service and attention to detail. They made the entire compliance process seamless and stress-free. Highly recommended for any business seeking compliance solutions.",
                rating: 5
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", 0.3 + index * 0.1, 1)}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-8 text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                      <p className="text-green-400 font-medium">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-emerald-500/20" />
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Let us handle your legal compliance while you focus on growing your business. Contact us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = 'tel:+911169310715'}
              >
                <Phone className="mr-3 h-6 w-6" />
                Call Now: +91 11693 10715
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white text-xl px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('https://wa.me/911169310715', '_blank')}
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                WhatsApp Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
