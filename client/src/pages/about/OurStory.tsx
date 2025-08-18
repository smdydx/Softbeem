
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Calendar, TrendingUp, Award, Users } from "lucide-react";

const OurStory = () => {
  const milestones = [
    {
      year: "2014",
      title: "The Beginning",
      description: "Founded by a team of tech enthusiasts and legal experts with a vision to bridge the gap between technology and compliance.",
      icon: <Users className="w-6 h-6" />,
      achievements: ["Initial team of 5 professionals", "First legal-tech hybrid service model"]
    },
    {
      year: "2016",
      title: "First Major Breakthrough",
      description: "Secured our first major enterprise client and expanded into blockchain technology services.",
      icon: <TrendingUp className="w-6 h-6" />,
      achievements: ["50+ successful projects", "Blockchain division launch", "Team expanded to 15"]
    },
    {
      year: "2018",
      title: "Innovation & Recognition",
      description: "Launched innovative compliance automation tools and received industry recognition.",
      icon: <Award className="w-6 h-6" />,
      achievements: ["100+ clients milestone", "Industry excellence award", "Patent for compliance automation"]
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Adapted to remote work culture and launched comprehensive digital transformation services.",
      icon: <Calendar className="w-6 h-6" />,
      achievements: ["Remote-first operations", "Cloud services expansion", "200+ projects completed"]
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Established international presence and expanded service offerings across multiple countries.",
      icon: <TrendingUp className="w-6 h-6" />,
      achievements: ["International offices", "Multi-country compliance", "500+ satisfied clients"]
    },
    {
      year: "2024",
      title: "Future Ready",
      description: "Continuing to innovate with AI-powered solutions and expanding our global footprint.",
      icon: <Award className="w-6 h-6" />,
      achievements: ["AI integration", "Global partnerships", "Next-gen solutions"]
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
              Our <span className="bg-gradient-to-r from-primary to-orange-500 text-transparent bg-clip-text">Journey</span>
            </motion.h1>
            
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              From a small startup to a global technology and legal solutions provider - 
              discover the story behind Softbeem's remarkable growth and evolution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Introduction */}
      <section className="py-16">
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
              How It All Started
            </motion.h2>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="prose prose-lg max-w-none text-muted-foreground"
            >
              <p className="text-lg leading-relaxed mb-6">
                In 2014, a group of passionate technology professionals and legal experts came together 
                with a shared vision: to create a company that could seamlessly bridge the gap between 
                cutting-edge technology and complex legal compliance requirements.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                What started as a small team working from a modest office has grown into a global 
                organization serving clients across multiple continents. Our journey has been marked 
                by continuous innovation, strategic growth, and an unwavering commitment to excellence.
              </p>
              
              <p className="text-lg leading-relaxed">
                Today, Softbeem stands as a testament to what's possible when technology meets legal 
                expertise, creating solutions that not only solve today's challenges but anticipate 
                tomorrow's opportunities.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn("up", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Milestones & Growth
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", index * 0.1, 1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 mb-16 last:mb-0"
              >
                {/* Year */}
                <div className="md:w-1/4">
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                    <div className="text-primary">{milestone.icon}</div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="md:w-3/4">
                  <div className="bg-zinc-800/30 rounded-lg p-6 border border-primary/10">
                    <h3 className="text-xl font-bold text-primary mb-3">{milestone.title}</h3>
                    <p className="text-muted-foreground mb-4">{milestone.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {milestone.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <motion.h2
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-3xl font-bold"
            >
              Our Growth Story in Numbers
            </motion.h2>
            
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { from: "5", to: "50+", label: "Team Members" },
                { from: "1", to: "500+", label: "Projects Completed" },
                { from: "1", to: "15+", label: "Countries Served" },
                { from: "0", to: "10+", label: "Years of Excellence" }
              ].map((stat, index) => (
                <div key={index} className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {stat.from} → {stat.to}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Future Vision */}
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
              Looking Ahead
            </motion.h2>
            
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              As we continue our journey, we remain committed to innovation, excellence, and 
              delivering exceptional value to our clients. Our story is far from over - we're 
              just getting started on the next chapter of transforming how businesses approach 
              technology and legal compliance in an increasingly digital world.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default OurStory;
