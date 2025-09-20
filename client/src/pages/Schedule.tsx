
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import ScheduleMeetingForm from "@/components/ScheduleMeetingForm";
import { useEffect } from "react";

const Schedule = () => {
  useEffect(() => {
    // Hide floating contact buttons on schedule page
    const contactButtons = document.querySelector('.fixed.left-1\\/2.top-1\\/2');
    if (contactButtons) {
      (contactButtons as HTMLElement).style.display = 'none';
    }
    
    return () => {
      // Show contact buttons when leaving the page
      const contactButtons = document.querySelector('.fixed.left-1\\/2.top-1\\/2');
      if (contactButtons) {
        (contactButtons as HTMLElement).style.display = 'flex';
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 md:pt-24 lg:pt-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8"
      >
        <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            Schedule a Meeting
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 leading-relaxed">
            Book a consultation with our experts to discuss your project requirements and explore solutions.
          </p>
        </motion.div>

        <motion.div variants={fadeIn("up", "tween", 0.3, 1)} className="w-full max-w-7xl mx-auto">
          <ScheduleMeetingForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Schedule;
