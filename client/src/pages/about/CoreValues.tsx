
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { 
  Lightbulb, 
  Heart, 
  Target, 
  Eye, 
  Users, 
  Shield, 
  Zap, 
  Globe,
  CheckCircle2,
  Award
} from "lucide-react";

const CoreValues = () => {
  const coreValues = [
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Innovation",
      subtitle: "Pioneering Tomorrow's Solutions",
      description: "We embrace emerging technologies and creative solutions to stay ahead of industry trends, constantly pushing the boundaries of what's possible.",
      principles: [
        "Continuous research and development",
        "Adoption of cutting-edge technologies",
        "Creative problem-solving approaches",
        "Forward-thinking methodologies"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Integrity",
      subtitle: "Building Trust Through Transparency",
      description: "Operating with honesty, transparency, and ethical business practices in all our interactions, maintaining the highest standards of professional conduct.",
      principles: [
        "Transparent communication",
        "Ethical business practices",
        "Honest and fair dealings",
        "Accountability in all actions"
      ],
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Excellence",
      subtitle: "Exceeding Expectations Always",
      description: "Delivering high-quality solutions that exceed client expectations and industry standards, with meticulous attention to detail in every project.",
      principles: [
        "Quality-driven processes",
        "Continuous improvement mindset",
        "Exceeding client expectations",
        "Attention to detail"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Client-Centricity",
      subtitle: "Your Success is Our Priority",
      description: "Prioritizing client success and building long-term partnerships based on trust, understanding, and measurable results.",
      principles: [
        "Client-focused solutions",
        "Long-term partnerships",
        "Results-driven approach",
        "Personalized service delivery"
      ],
      color: "from-purple-500 to-violet-500"
    }
  ];

  const culturalAspects = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Environment",
      description: "We foster a culture of teamwork where diverse perspectives combine to create exceptional solutions."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Respect",
      description: "Building relationships based on mutual trust, respect, and understanding across all levels of our organization."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Agile Mindset",
      description: "Embracing change and adapting quickly to evolving market demands and technological advancements."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Perspective",
      description: "Understanding diverse markets and cultures to deliver solutions that work across international boundaries."
    }
  ];

  const practicesInAction = [
    {
      value: "Innovation",
      examples: [
        "Regular hackathons and innovation workshops",
        "Investment in R&D for emerging technologies",
        "Cross-functional collaboration on new solutions",
        "Continuous learning and skill development programs"
      ]
    },
    {
      value: "Integrity",
      examples: [
        "Transparent project reporting and communication",
        "Ethical decision-making in all business dealings",
        "Clear contracts and honest pricing models",
        "Confidentiality and data protection protocols"
      ]
    },
    {
      value: "Excellence",
      examples: [
        "Rigorous quality assurance processes",
        "Industry-standard certifications and compliance",
        "Continuous feedback and improvement cycles",
        "Recognition and rewards for outstanding performance"
      ]
    },
    {
      value: "Client-Centricity",
      examples: [
        "Dedicated account management teams",
        "Regular client satisfaction surveys",
        "Customized solutions for unique requirements",
        "24/7 support and maintenance services"
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
              Our Core <span className="bg-gradient-to-r from-primary to-orange-500 text-transparent bg-clip-text">Values</span>
            </motion.h1>
            
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              The fundamental principles that shape our culture, guide our decisions, 
              and define how we work together to deliver exceptional results.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Values Detailed */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <motion.div
                  variants={fadeIn(index % 2 === 0 ? "right" : "left", "tween", 0.2, 1)}
                  className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                >
                  <div className={`bg-gradient-to-br ${value.color} rounded-2xl p-8 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                      <div className="mb-6">{value.icon}</div>
                      <h2 className="text-3xl font-bold mb-2">{value.title}</h2>
                      <p className="text-lg opacity-90 mb-4">{value.subtitle}</p>
                      <p className="opacity-80">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={fadeIn(index % 2 === 0 ? "left" : "right", "tween", 0.3, 1)}
                  className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                >
                  <h3 className="text-2xl font-bold">How We Practice {value.title}</h3>
                  <div className="space-y-4">
                    {value.principles.map((principle, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{principle}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Aspects */}
      <section className="py-20 bg-zinc-900/50">
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
              <h2 className="text-4xl font-bold">Our Work Culture</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Beyond our core values, we've cultivated a unique culture that promotes 
                innovation, collaboration, and personal growth.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {culturalAspects.map((aspect, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/30 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all group"
                >
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                    {aspect.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{aspect.title}</h3>
                  <p className="text-sm text-muted-foreground">{aspect.description}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values in Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            <motion.div
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-center space-y-4"
            >
              <h2 className="text-4xl font-bold">Values in Action</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how our core values translate into concrete practices and initiatives 
                that benefit our clients, team members, and community.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {practicesInAction.map((practice, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/30 rounded-xl p-8 border border-primary/10"
                >
                  <h3 className="text-2xl font-bold text-primary mb-6">{practice.value} in Practice</h3>
                  <div className="space-y-3">
                    {practice.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Award className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
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
              Join Our Value-Driven Team
            </motion.h2>
            
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-lg text-muted-foreground"
            >
              If our values resonate with you and you're passionate about making a 
              difference in the technology and legal consulting space, we'd love to 
              hear from you.
            </motion.p>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/careers"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Explore Careers
              </a>
              <a
                href="/#contact"
                className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CoreValues;
