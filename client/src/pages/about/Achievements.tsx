
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { 
  Award, 
  Trophy, 
  Star, 
  Users, 
  Building, 
  Globe, 
  TrendingUp,
  Calendar,
  Target,
  CheckCircle2
} from "lucide-react";

const Achievements = () => {
  const awards = [
    {
      year: "2024",
      title: "Excellence in Digital Innovation",
      organization: "Tech Industry Association",
      description: "Recognized for groundbreaking blockchain solutions and legal-tech integration.",
      icon: <Trophy className="w-8 h-8" />
    },
    {
      year: "2023",
      title: "Best Legal Technology Provider",
      organization: "Legal Services Excellence Awards",
      description: "Awarded for outstanding contribution to legal technology advancement.",
      icon: <Award className="w-8 h-8" />
    },
    {
      year: "2022",
      title: "Startup of the Year",
      organization: "Business Innovation Council",
      description: "Recognized for rapid growth and innovative business model.",
      icon: <Star className="w-8 h-8" />
    },
    {
      year: "2021",
      title: "Client Satisfaction Excellence",
      organization: "Customer Service Institute",
      description: "Achieved 98% client satisfaction rating across all service categories.",
      icon: <Trophy className="w-8 h-8" />
    }
  ];

  const milestones = [
    {
      year: "2024",
      achievements: [
        "Expanded to 15+ countries globally",
        "Launched AI-powered compliance platform",
        "Achieved 500+ successful project milestone",
        "Established strategic partnerships with Fortune 500 companies"
      ]
    },
    {
      year: "2023",
      achievements: [
        "Opened international offices in 5 countries",
        "Developed proprietary blockchain framework",
        "Reached 300+ client milestone",
        "Launched 24/7 global support center"
      ]
    },
    {
      year: "2022",
      achievements: [
        "Secured Series A funding round",
        "Launched comprehensive legal compliance suite",
        "Achieved ISO 27001 certification",
        "Established partnerships with major law firms"
      ]
    },
    {
      year: "2021",
      achievements: [
        "Reached 100+ successful projects",
        "Expanded team to 50+ professionals",
        "Launched remote-first operations",
        "Developed cloud-native solutions platform"
      ]
    }
  ];

  const recognitions = [
    {
      category: "Industry Recognition",
      items: [
        "Featured in Top 50 Legal Tech Companies",
        "Listed among Fastest Growing Startups",
        "Blockchain Innovation Leader Award",
        "Digital Transformation Excellence"
      ]
    },
    {
      category: "Client Partnerships",
      items: [
        "Trusted by 500+ global clients",
        "Strategic partnerships with Fortune 500",
        "Government contracts in 3 countries",
        "Long-term agreements with major enterprises"
      ]
    },
    {
      category: "Technical Excellence",
      items: [
        "Patent for compliance automation",
        "Open-source contributions",
        "Industry-standard certifications",
        "Security and quality accreditations"
      ]
    },
    {
      category: "Social Impact",
      items: [
        "Pro bono services for startups",
        "Educational partnerships",
        "Community development initiatives",
        "Environmental sustainability programs"
      ]
    }
  ];

  const keyMetrics = [
    {
      number: "500+",
      label: "Projects Completed",
      icon: <Target className="w-6 h-6" />
    },
    {
      number: "15+",
      label: "Countries Served",
      icon: <Globe className="w-6 h-6" />
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      icon: <Star className="w-6 h-6" />
    },
    {
      number: "50+",
      label: "Team Members",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "10+",
      label: "Years Experience",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      number: "24/7",
      label: "Global Support",
      icon: <Building className="w-6 h-6" />
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
              Our <span className="bg-gradient-to-r from-primary to-orange-500 text-transparent bg-clip-text">Achievements</span>
            </motion.h1>
            
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              A journey marked by recognition, growth, and unwavering commitment to 
              excellence in technology and legal services.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", index * 0.1, 1)}
                className="bg-zinc-900/30 rounded-xl p-6 border border-primary/10 text-center hover:border-primary/30 transition-all"
              >
                <div className="text-primary mb-3">{metric.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-2">{metric.number}</h3>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-zinc-900/50">
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
              <h2 className="text-4xl font-bold">Awards & Recognition</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Industry recognition for our commitment to innovation, excellence, 
                and client satisfaction.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/30 rounded-xl p-8 border border-primary/10 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      {award.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-primary font-semibold mb-2">{award.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{award.organization}</p>
                      <p className="text-sm text-muted-foreground">{award.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Milestones Timeline */}
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
              <h2 className="text-4xl font-bold">Key Milestones</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Significant achievements that mark our growth and evolution as a company.
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", "tween", index * 0.1, 1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-8 mb-12 last:mb-0"
                >
                  <div className="flex-shrink-0">
                    <div className="bg-primary/10 rounded-lg p-4 text-center min-w-[100px]">
                      <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-zinc-900/30 rounded-xl p-6 border border-primary/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {milestone.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recognition Categories */}
      <section className="py-20 bg-zinc-900/50">
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
              <h2 className="text-4xl font-bold">Recognition & Partnerships</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive recognition across various aspects of our business operations.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {recognitions.map((recognition, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/30 rounded-xl p-8 border border-primary/10"
                >
                  <h3 className="text-2xl font-bold text-primary mb-6">{recognition.category}</h3>
                  <div className="space-y-3">
                    {recognition.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-20">
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
              Looking Forward
            </motion.h2>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="bg-zinc-900/30 rounded-2xl p-8 border border-primary/10"
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our achievements to date are just the beginning. We continue to set ambitious 
                goals and work towards new milestones that will further establish our position 
                as a global leader in technology and legal consulting.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-primary mb-2">2025 Goals</h4>
                  <p className="text-sm text-muted-foreground">Expand to 25+ countries globally</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-primary mb-2">Innovation</h4>
                  <p className="text-sm text-muted-foreground">Launch next-gen AI platform</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-primary mb-2">Growth</h4>
                  <p className="text-sm text-muted-foreground">1000+ successful projects</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Achievements;
