
import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  Linkedin,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Our Location",
    details: ["H-77, Sector 63, Noida, Uttar Pradesh, India"],
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email Us",
    details: ["support@softbeem.com"],
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Call Us",
    details: ["+911169310715", "+911204152818"],
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Business Hours",
    details: ["Monday-Friday: 10:00 AM - 6:30 PM", "Saturday: 10:00 AM - 2:00 PM"],
  },
];

const socialLinks = [
  { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/company/softbeem/" },
  { icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com/softbeem" },
  { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/softbeem" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Subject: "",
    Service: "",
    Enq_Message: "",
    Company_Name: "Softbeem",
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, privacy: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast({
        title: "Agreement required",
        description: "Please agree to the privacy policy and terms of service.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.Name,
          email: formData.Email,
          phone: formData.Phone,
          subject: formData.Subject,
          service: formData.Service,
          message: formData.Enq_Message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({
        Name: "",
        Email: "",
        Phone: "",
        Subject: "",
        Service: "",
        Enq_Message: "",
        Company_Name: "Softbeem",
        privacy: false,
      });
    } catch (error) {
      toast({
        title: "Message not sent",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-10">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-zinc-900/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="inline-block mb-4">
              <span className="text-primary font-medium text-sm uppercase tracking-wider relative before:content-[''] before:absolute before:w-8 before:h-[2px] before:bg-primary before:left-full before:top-1/2 before:ml-2 after:content-[''] after:absolute after:w-8 after:h-[2px] after:bg-primary after:right-full after:top-1/2 after:mr-2">
                Contact Us
              </span>
            </motion.div>
            <motion.h1
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-green-400"
            >
              Get In Touch
            </motion.h1>
            <motion.p variants={fadeIn("up", "tween", 0.3, 1)} className="text-muted-foreground text-lg md:text-xl mb-8">
              Ready to transform your business with cutting-edge technology and legal expertise?<br />
              Let's discuss your project and bring your vision to life.
            </motion.p>
            
            {/* Quick Contact Buttons */}
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white gap-2"
                onClick={() => window.location.href = "tel:+911169310715"}
              >
                <Phone className="h-5 w-5" />
                Call Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500/10 gap-2"
                onClick={() => window.open("https://wa.me/911169310715", "_blank")}
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500/10 gap-2"
                onClick={() => window.location.href = "mailto:support@softbeem.com"}
              >
                <Mail className="h-5 w-5" />
                Email Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Information */}
            <motion.div variants={fadeIn("right", "tween", 0.2, 1)} className="h-full">
              <div className="bg-zinc-900/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-zinc-800 h-full">
                <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>

                <div className="space-y-8 mb-12">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn("up", "tween", 0.1 * index, 0.5)}
                      className="flex items-start group"
                    >
                      <div className="bg-primary/10 p-3 rounded-xl mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{info.title}</h4>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 mb-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.269350258885!2d77.3602376147705!3d28.60464248242213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce585d24902e1%3A0x5e346d2a1c935937!2sH-77%2C%20Sector%2063%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700522064393!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{border:0}}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  ></iframe>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-medium mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        whileHover={{ y: -3 }}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-800 hover:bg-primary text-white p-3 rounded-xl transition-colors duration-300"
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeIn("left", "tween", 0.2, 1)} className="h-full">
              <form
                onSubmit={handleSubmit}
                className="bg-zinc-900/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-zinc-800 h-full"
              >
                <h3 className="text-2xl font-semibold mb-8">Send Us a Message</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="Name"
                      name="Name"
                      value={formData.Name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-zinc-800/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email *
                    </label>
                    <Input
                      type="email"
                      id="Email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-zinc-800/50"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="Phone"
                    name="Phone"
                    type="tel"
                    value={formData.Phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    required
                    className="bg-zinc-800/50"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Interest
                  </label>
                  <select
                    id="Service"
                    name="Service"
                    value={formData.Service}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-zinc-800/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Blockchain Development">Blockchain Development</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Legal Compliance">Legal Compliance</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    id="Subject"
                    name="Subject"
                    value={formData.Subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="bg-zinc-800/50"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message *
                  </label>
                  <Textarea
                    id="Enq_Message"
                    name="Enq_Message"
                    value={formData.Enq_Message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project or inquiry..."
                    required
                    className="bg-zinc-800/50 resize-none"
                  />
                </div>

                <div className="space-y-8">
                  <div className="flex items-start space-x-3 mb-8">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacy}
                      onCheckedChange={handleCheckboxChange}
                      className="mt-1"
                    />
                    <label
                      htmlFor="privacy"
                      className="text-sm text-muted-foreground leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree with the privacy policy and terms of service
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 py-6"
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
