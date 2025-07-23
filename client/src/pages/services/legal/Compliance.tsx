import { motion } from "framer-motion";
import { staggerContainer, fadeIn, slideIn } from "@/lib/animations";
import { ArrowRight, Check } from "lucide-react";
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
    items: [
      "BSE/NSE Listing Assistance",
      "SEBI (LODR) Compliance",
      "Periodic Disclosures and Filings",
    ],
  },
  {
    title: "Specialized Services",
    icon: "💼",
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

// ContactButtons component
function ContactButtons() {
  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-3 z-50">
      <a
        href="https://wa.me/+911169310715"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <a
        href="tel:+911169310715"
        className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </div>
  );
}

export default function Compliance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[80vh] md:h-[85vh] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Carousel className="h-full" autoplay interval={5000}>
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative h-full"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6 }}
              >
                <img
                  src={`/images/services/img1.jpg`} // Ensure this path is correct within the public directory
                  alt="Legal Services"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-zinc-900" />
              </motion.div>
            ))}
          </Carousel>
        </motion.div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.h1
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-4 sm:mb-6 md:mb-8 leading-tight"
            >
              Start Right. Build Smart. Grow Legally.
            </motion.h1>
            <motion.p
  variants={fadeIn("up", "tween", 0.3, 1)}
  className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed text-center px-4 sm:px-6 md:px-8"
>
  At SOFTBEEM,powered by RAMAERA Legal Infotech Pvt Ltd,we offer end-to-end company incorporation services to help entrepreneurs,startups,and corporates establish legally compliant entities in India — quickly, seamlessly, and affordably.
</motion.p>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-lg px-8"
              >
                Call Us <ArrowRight className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500/10 text-lg px-8"
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ContactButtons />

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(74,222,128,0.1),_transparent_50%)]" />
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-3xl font-bold mb-6 text-green-400"
            >
              Who We Are
            </motion.h2>
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-gray-300 mb-8"
            >
              At SOFTBEEM, we are a team of dedicated legal and compliance
              experts with years of experience in corporate law and regulatory
              requirements. Our mission is to simplify complex compliance
              processes and ensure your business operates within the legal
              framework smoothly and efficiently.
            </motion.p>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-zinc-800/30 p-6 rounded-xl border border-green-500/10">
                <h3 className="text-xl font-bold mb-3 text-white">Expertise</h3>
                <p className="text-gray-400">
                  Specialized knowledge in corporate law and compliance across
                  industries
                </p>
              </div>
              <div className="bg-zinc-800/30 p-6 rounded-xl border border-green-500/10">
                <h3 className="text-xl font-bold mb-3 text-white">
                  Experience
                </h3>
                <p className="text-gray-400">
                  10+ years of helping businesses navigate regulatory
                  requirements
                </p>
              </div>
              <div className="bg-zinc-800/30 p-6 rounded-xl border border-green-500/10">
                <h3 className="text-xl font-bold mb-3 text-white">
                  Commitment
                </h3>
                <p className="text-gray-400">
                  Dedicated to providing timely and accurate compliance
                  solutions
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}

      {/* Services Grid with Hover Effects */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(74,222,128,0.1),_transparent_50%)]" />
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                whileHover={{ scale: 1.02 }}
                className="group bg-zinc-800/30 backdrop-blur-sm p-8 rounded-2xl border border-green-500/10 hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{service.icon}</span>
                  <h3 className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {service.items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <Link
                        to={`/services/legal/${item.toLowerCase().replace(/[\s()]/g, "-")}`}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-3xl font-bold text-green-400"
            >
              What Our Clients Say
            </motion.h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                name: "Rajesh Kumar",
                position: "CEO",
                company: "TechStart Solutions",
                content:
                  "SOFTBEEM's compliance services have been instrumental in keeping our company compliant with all regulatory requirements. Their expertise and professionalism are unmatched.",
              },
              {
                name: "Priya Sharma",
                position: "Director",
                company: "Innovation Corp",
                content:
                  "The team's thorough understanding of corporate compliance helped us navigate complex regulatory challenges. Their support has been invaluable to our business growth.",
              },
              {
                name: "Amit Patel",
                position: "Founder",
                company: "Digital Ventures",
                content:
                  "Exceptional service and attention to detail. They made the entire compliance process seamless and stress-free. Highly recommended for any business seeking compliance solutions.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", 0.3 + index * 0.1, 1)}
                className="bg-zinc-800/30 p-8 rounded-xl border border-green-500/10 hover:border-green-500/30 transition-all duration-300">
                <p className="text-gray-300 italic mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-green-400">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}