
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Linkedin, Mail, Award, Users } from "lucide-react";

const Leadership = () => {
  const founders = [
    {
      name: "Rajesh Kumar",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Visionary leader with 15+ years in technology and business strategy. Holds MBA from IIM and B.Tech from IIT.",
      expertise: ["Strategic Planning", "Business Development", "Technology Innovation"],
      linkedin: "#",
      email: "rajesh@softbeem.com"
    },
    {
      name: "Priya Sharma",
      position: "Co-Founder & CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Technology expert specializing in blockchain and enterprise solutions. Former senior architect at top tech companies.",
      expertise: ["Blockchain Technology", "Enterprise Architecture", "AI/ML Solutions"],
      linkedin: "#",
      email: "priya@softbeem.com"
    }
  ];

  const directors = [
    {
      name: "Amit Patel",
      position: "Legal Director",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Legal expert with specialization in corporate law and compliance. Over 12 years of experience in legal consulting.",
      expertise: ["Corporate Law", "Compliance", "Intellectual Property"],
      linkedin: "#",
      email: "amit@softbeem.com"
    },
    {
      name: "Sarah Johnson",
      position: "Operations Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Operations specialist focused on process optimization and team management. Former McKinsey consultant.",
      expertise: ["Operations Management", "Process Optimization", "Team Leadership"],
      linkedin: "#",
      email: "sarah@softbeem.com"
    }
  ];

  const coreTeam = [
    {
      name: "Vikash Singh",
      position: "Senior Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      department: "Technology",
      expertise: ["Full Stack Development", "Cloud Architecture"]
    },
    {
      name: "Anita Reddy",
      position: "Legal Consultant",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      department: "Legal",
      expertise: ["Corporate Compliance", "Contract Law"]
    },
    {
      name: "Michael Chen",
      position: "Blockchain Specialist",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      department: "Technology",
      expertise: ["Smart Contracts", "DeFi Solutions"]
    },
    {
      name: "Kavya Menon",
      position: "Project Manager",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      department: "Operations",
      expertise: ["Agile Management", "Client Relations"]
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
            <motion.div
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6"
            >
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Leadership & Team</span>
            </motion.div>
            
            <motion.h1
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Meet Our <span className="bg-gradient-to-r from-primary to-orange-500 text-transparent bg-clip-text">Leaders</span>
            </motion.h1>
            
            <motion.p
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Driven by visionary leaders and powered by exceptional talent, 
              our team brings together diverse expertise to deliver innovative solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn("up", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Founders
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", index * 0.2, 1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-zinc-900/30 rounded-2xl p-8 border border-primary/10 text-center"
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                
                <h3 className="text-2xl font-bold text-white mb-2">{founder.name}</h3>
                <p className="text-primary font-semibold mb-4">{founder.position}</p>
                <p className="text-muted-foreground mb-6">{founder.bio}</p>
                
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Expertise</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {founder.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center gap-4">
                  <a href={founder.linkedin} className="text-primary hover:text-primary/80">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={`mailto:${founder.email}`} className="text-primary hover:text-primary/80">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn("up", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Board of Directors
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {directors.map((director, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", index * 0.2, 1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-zinc-800/30 rounded-xl p-6 border border-primary/10"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{director.name}</h3>
                    <p className="text-primary font-semibold mb-3">{director.position}</p>
                    <p className="text-sm text-muted-foreground mb-4">{director.bio}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {director.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn("up", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Core Team Members
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreTeam.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", index * 0.1, 1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-zinc-900/30 rounded-xl p-6 border border-primary/10 text-center hover:border-primary/30 transition-all"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mb-2">{member.position}</p>
                <p className="text-xs text-muted-foreground mb-3">{member.department}</p>
                
                <div className="space-y-1">
                  {member.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="block px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Culture */}
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
              What Makes Our Team Special
            </motion.h2>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="space-y-4">
                <Award className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-bold">Excellence</h3>
                <p className="text-muted-foreground">
                  Committed to delivering exceptional results in every project we undertake.
                </p>
              </div>
              
              <div className="space-y-4">
                <Users className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-bold">Collaboration</h3>
                <p className="text-muted-foreground">
                  Working together as one team to achieve extraordinary outcomes.
                </p>
              </div>
              
              <div className="space-y-4">
                <Award className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-muted-foreground">
                  Constantly pushing boundaries to create cutting-edge solutions.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Leadership;
