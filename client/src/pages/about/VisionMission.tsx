
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Eye, Target, Heart, Lightbulb } from "lucide-react";

const VisionMission = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Embracing emerging technologies and creative solutions to stay ahead of industry trends.",
      details: [
        "Continuous research and development",
        "Adoption of cutting-edge technologies",
        "Creative problem-solving approaches"
      ]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Integrity",
      description: "Operating with honesty, transparency, and ethical business practices in all our interactions.",
      details: [
        "Transparent communication",
        "Ethical business practices",
        "Honest and fair dealings"
      ]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Excellence",
      description: "Delivering high-quality solutions that exceed client expectations and industry standards.",
      details: [
        "Quality-driven processes",
        "Continuous improvement",
        "Exceeding expectations"
      ]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Client-Centricity",
      description: "Prioritizing client success and building long-term partnerships based on trust and results.",
      details: [
        "Client-focused solutions",
        "Long-term partnerships",
        "Results-driven approach"
      ]
    }
  ];

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
            <motion.h1
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Our <span className="bg-gradient-to-r from-primary to-orange-500 text-transparent bg-clip-text">Vision & Mission</span>
            </motion.h1>
            
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Guided by clear vision and driven by purpose, we're committed to 
              transforming the digital landscape through innovative solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeIn("right", "tween", 0.2, 1)}>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Vision"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              variants={fadeIn("left", "tween", 0.3, 1)}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Our Vision</span>
              </div>
              
              <h2 className="text-4xl font-bold">
                Leading the Future of <span className="text-primary">Digital Innovation</span>
              </h2>
              
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be a globally recognized leader in technology and legal consulting, 
                  known for delivering integrated, reliable, and transformative solutions 
                  that drive business success in the digital age.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We envision a world where technology and legal compliance work seamlessly 
                  together, enabling businesses to innovate without limitations while 
                  maintaining full regulatory adherence.
                </p>
              </div>
              
              <div className="bg-zinc-900/30 rounded-xl p-6 border border-primary/10">
                <h3 className="text-xl font-semibold text-primary mb-3">Vision Goals</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Global market leadership</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Industry innovation standards</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Sustainable business growth</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div
              variants={fadeIn("right", "tween", 0.3, 1)}
              className="space-y-6 order-2 lg:order-1"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Our Mission</span>
              </div>
              
              <h2 className="text-4xl font-bold">
                Empowering Businesses Through <span className="text-primary">Integrated Solutions</span>
              </h2>
              
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To deliver cutting-edge technology and legal services that drive business 
                  innovation, ensure regulatory compliance, and foster long-term growth for 
                  our clients across all industries.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We are committed to providing comprehensive solutions that bridge the gap 
                  between technological advancement and legal requirements, enabling our 
                  clients to thrive in an increasingly complex digital landscape.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-800/30 rounded-lg p-4 border border-primary/10">
                  <h4 className="font-semibold text-primary mb-2">Technology</h4>
                  <p className="text-sm text-muted-foreground">Innovative solutions for digital transformation</p>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-4 border border-primary/10">
                  <h4 className="font-semibold text-primary mb-2">Legal</h4>
                  <p className="text-sm text-muted-foreground">Comprehensive compliance and advisory services</p>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-4 border border-primary/10">
                  <h4 className="font-semibold text-primary mb-2">Growth</h4>
                  <p className="text-sm text-muted-foreground">Strategic solutions for business expansion</p>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-4 border border-primary/10">
                  <h4 className="font-semibold text-primary mb-2">Partnership</h4>
                  <p className="text-sm text-muted-foreground">Long-term relationships built on trust</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn("left", "tween", 0.2, 1)}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Mission"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center space-y-16"
          >
            <motion.div
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="space-y-4"
            >
              <h2 className="text-4xl font-bold">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The fundamental principles that guide our actions, decisions, 
                and relationships with clients, partners, and team members.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/30 rounded-xl p-8 border border-primary/10 hover:border-primary/30 transition-all group"
                >
                  <div className="text-primary mb-6 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-muted-foreground mb-6">{value.description}</p>
                  
                  <div className="space-y-2">
                    {value.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <motion.h2
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-3xl font-bold"
            >
              Our Commitment to You
            </motion.h2>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="bg-zinc-800/30 rounded-2xl p-8 border border-primary/10"
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At Softbeem, we don't just provide services – we build partnerships. 
                Our commitment extends beyond project delivery to ensuring your long-term 
                success in an ever-evolving digital landscape.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <h4 className="font-semibold text-primary mb-2">Quality Assurance</h4>
                  <p className="text-sm text-muted-foreground">Every solution meets the highest standards</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-primary mb-2">Continuous Support</h4>
                  <p className="text-sm text-muted-foreground">Ongoing assistance for sustained success</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-primary mb-2">Innovation Focus</h4>
                  <p className="text-sm text-muted-foreground">Always ahead of industry trends</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default VisionMission;
