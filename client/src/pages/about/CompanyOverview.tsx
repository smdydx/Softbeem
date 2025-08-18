
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Building2, Users, Globe, Award } from "lucide-react";

const CompanyOverview = () => {
  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-primary/10 via-transparent to-orange-500/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6"
            >
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Company Overview</span>
            </motion.div>
            
            <motion.h1
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              About <span className="bg-gradient-to-r from-primary to-orange-500 text-transparent bg-clip-text">Softbeem</span>
            </motion.h1>
            
            <motion.p
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Bridging Technology with Legal Expertise to Empower Businesses in a Digital World
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          >
            <motion.div variants={fadeIn("right", "tween", 0.2, 1)}>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Softbeem Office"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              variants={fadeIn("left", "tween", 0.3, 1)}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                Softbeem is a premier provider of integrated technology and legal solutions, 
                committed to empowering businesses in a digitally driven world. Our firm 
                specializes in delivering innovative, secure, and compliant services that 
                address both technical and regulatory challenges.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Founded with the vision of bridging the gap between technology and legal 
                compliance, we serve businesses across industries with comprehensive solutions 
                that drive growth and ensure regulatory adherence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "10+", label: "Years Experience", icon: Award },
              { number: "500+", label: "Projects Completed", icon: Building2 },
              { number: "100+", label: "Happy Clients", icon: Users },
              { number: "15+", label: "Countries Served", icon: Globe }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", index * 0.1, 1)}
                className="space-y-4"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto" />
                <h3 className="text-3xl font-bold text-primary">{stat.number}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="bg-zinc-900/30 rounded-2xl p-8 border border-primary/10"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To deliver cutting-edge technology and legal services that drive business 
                innovation, ensure regulatory compliance, and foster long-term growth for our clients.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="bg-zinc-900/30 rounded-2xl p-8 border border-primary/10"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To be a globally recognized leader in technology and legal consulting, 
                known for delivering integrated, reliable, and transformative solutions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Short History */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <motion.h2
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-3xl font-bold"
            >
              Our Journey in Brief
            </motion.h2>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="space-y-6 text-left"
            >
              <div className="border-l-4 border-primary pl-6">
                <h4 className="text-xl font-semibold text-primary mb-2">Foundation (2014)</h4>
                <p className="text-muted-foreground">
                  Softbeem was founded with the vision of bridging technology and legal services, 
                  starting as a small team of passionate professionals.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-6">
                <h4 className="text-xl font-semibold text-primary mb-2">Growth & Expansion (2016-2020)</h4>
                <p className="text-muted-foreground">
                  Expanded our service offerings to include blockchain technology, comprehensive 
                  legal compliance, and innovative IT solutions.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-6">
                <h4 className="text-xl font-semibold text-primary mb-2">Global Reach (2021-Present)</h4>
                <p className="text-muted-foreground">
                  Established international presence and became a trusted partner for businesses 
                  seeking integrated technology and legal solutions.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CompanyOverview;
