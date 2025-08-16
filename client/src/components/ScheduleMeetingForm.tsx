
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock } from "lucide-react";

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
    <div id="meeting" className="w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 bg-zinc-900/50 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-zinc-800 my-6 sm:my-8 md:my-12">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">Schedule a Meeting</h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium">Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-zinc-800/50 border-zinc-700/50 h-11 sm:h-12 text-sm sm:text-base px-4"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-zinc-800/50 border-zinc-700/50 h-11 sm:h-12 text-sm sm:text-base px-4"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium">Phone (WhatsApp)</label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="bg-zinc-800/50 border-zinc-700/50 h-11 sm:h-12 text-sm sm:text-base px-4"
            placeholder="+91 9876543210"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium">
              <Calendar className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Preferred Date
            </label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="bg-zinc-800/50 border-zinc-700/50 h-11 sm:h-12 text-sm sm:text-base px-4"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium">
              <Clock className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Preferred Time
            </label>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="bg-zinc-800/50 border-zinc-700/50 h-11 sm:h-12 text-sm sm:text-base px-4"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium">Company Name (Optional)</label>
          <Input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="bg-zinc-800/50 border-zinc-700/50 h-11 sm:h-12 text-sm sm:text-base px-4"
            placeholder="Your company name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium">Meeting Purpose</label>
          <Textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="bg-zinc-800/50 border-zinc-700/50 h-24 sm:h-28 md:h-32 text-sm sm:text-base resize-none px-4 py-3"
            placeholder="Please describe the purpose of the meeting and what you'd like to discuss..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg font-medium mt-4 sm:mt-6"
        >
          {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
        </Button>
      </form>
    </div>
  );
};

export default ScheduleMeetingForm;
