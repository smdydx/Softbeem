
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, User, Mail, Phone, Building } from "lucide-react";

const ScheduleMeetingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    purpose: "",
    companyName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to schedule meeting');
      }
      
      toast({
        title: "Meeting Request Sent!",
        description: "We'll confirm your meeting schedule shortly via WhatsApp.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        purpose: "",
        companyName: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="meeting" className="w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 bg-zinc-900/50 backdrop-blur-lg rounded-xl border-2 border-zinc-800/50 my-6 sm:my-8 md:my-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Schedule a Meeting
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-400 text-center mb-4 sm:mb-6 md:mb-8 px-2">
          Book a consultation with our experts to discuss your project requirements
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="flex items-center text-xs sm:text-sm font-medium text-gray-300">
                <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-400" />
                Full Name
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-zinc-800/50 border-zinc-700/50 focus:border-green-500/50 focus:ring-green-500/20 h-12 text-base px-4 transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="flex items-center text-xs sm:text-sm font-medium text-gray-300">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-400" />
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-zinc-800/50 border-zinc-700/50 focus:border-green-500/50 focus:ring-green-500/20 h-12 text-base px-4 transition-all duration-200"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="flex items-center text-xs sm:text-sm font-medium text-gray-300">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-400" />
              Phone Number (WhatsApp)
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-zinc-800/50 border-zinc-700/50 focus:border-green-500/50 focus:ring-green-500/20 h-12 text-base px-4 transition-all duration-200"
              placeholder="+91 9876543210"
            />
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="flex items-center text-xs sm:text-sm font-medium text-gray-300">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-400" />
                Preferred Date
              </label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="bg-zinc-800/50 border-zinc-700/50 focus:border-green-500/50 focus:ring-green-500/20 h-12 text-base px-4 transition-all duration-200"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="flex items-center text-xs sm:text-sm font-medium text-gray-300">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-400" />
                Preferred Time
              </label>
              <Input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="bg-zinc-800/50 border-zinc-700/50 focus:border-green-500/50 focus:ring-green-500/20 h-12 text-base px-4 transition-all duration-200"
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="flex items-center text-xs sm:text-sm font-medium text-gray-300">
              <Building className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-400" />
              Company Name (Optional)
            </label>
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="bg-zinc-800/50 border-zinc-700/50 focus:border-green-500/50 focus:ring-green-500/20 h-12 text-base px-4 transition-all duration-200"
              placeholder="Your company name"
            />
          </div>

          {/* Meeting Purpose */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="flex items-center text-xs sm:text-sm font-medium text-gray-300">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-400" />
              Meeting Purpose
            </label>
            <Textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="bg-zinc-800/50 border-zinc-700/50 focus:border-green-500/50 focus:ring-green-500/20 min-h-[120px] text-base resize-none px-4 py-3 transition-all duration-200"
              placeholder="Please describe the purpose of the meeting and what you'd like to discuss..."
            />
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2 sm:pt-4"
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 h-14 text-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/25"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Scheduling...
                </div>
              ) : (
                "Schedule Meeting"
              )}
            </Button>
          </motion.div>
        </form>

        {/* Additional Info */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-xs sm:text-sm text-green-400 text-center">
            💬 We'll confirm your meeting schedule via WhatsApp within 24 hours
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ScheduleMeetingForm;
