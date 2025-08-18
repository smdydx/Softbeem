
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openPositions, setOpenPositions] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    comments: "",
    resume: null as File | null,
    photo: null as File | null,
    isRobot: false
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/careers/jobs');
        if (response.ok) {
          const jobs = await response.json();
          setOpenPositions(jobs);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setFormData({ ...formData, photo: file });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive"
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf" || file.type === "application/msword" || 
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFormData({ ...formData, resume: file });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF or DOC/DOCX files only",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isRobot) {
      toast({
        title: "Verification required",
        description: "Please verify that you're not a robot",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && key !== 'isRobot') {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        toast({
          title: "Application Submitted",
          description: "Thank you for applying! We'll get back to you soon.",
        });
        setFormData({
          fullName: "", email: "", phone: "", address: "", position: "",
          experience: "", currentSalary: "", expectedSalary: "", comments: "",
          resume: null, photo: null, isRobot: false
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-black/95">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <motion.h1
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            variants={fadeIn("up", "tween", 0.3, 1)}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            We're always looking for talented individuals who share our passion for innovation and excellence. 
            Explore our open positions and become part of our growing team.
          </motion.p>
        </motion.div>

        {/* Company Culture Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="bg-zinc-900/30 rounded-xl p-8 border border-primary/10 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Innovation First</h3>
            <p className="text-gray-400">
              We foster a culture of creativity and innovation, encouraging our team members 
              to think outside the box and push boundaries.
            </p>
          </motion.div>
          
          <motion.div
            variants={fadeIn("up", "tween", 0.3, 1)}
            className="bg-zinc-900/30 rounded-xl p-8 border border-primary/10 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Growth Opportunities</h3>
            <p className="text-gray-400">
              We invest in our people with continuous learning opportunities, 
              mentorship programs, and clear career advancement paths.
            </p>
          </motion.div>
          
          <motion.div
            variants={fadeIn("up", "tween", 0.4, 1)}
            className="bg-zinc-900/30 rounded-xl p-8 border border-primary/10 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Work-Life Balance</h3>
            <p className="text-gray-400">
              We believe in maintaining a healthy work-life balance with flexible 
              working arrangements and comprehensive benefits.
            </p>
          </motion.div>
        </motion.section>

        {/* Open Positions */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <motion.h2
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="text-3xl font-bold text-white mb-8 text-center"
          >
            Open Positions
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {openPositions.map((position: any, index: number) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", index * 0.1, 1)}
                className="bg-zinc-900/50 border border-green-500/20 rounded-lg p-6 hover:border-green-500/40 transition-all"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{position.title}</h3>
                <div className="space-y-2 text-gray-400">
                  <p><span className="text-primary">Department:</span> {position.department}</p>
                  <p><span className="text-primary">Location:</span> {position.location}</p>
                  <p><span className="text-primary">Type:</span> {position.type}</p>
                  {position.description && (
                    <p className="text-sm mt-3">{position.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {openPositions.length === 0 && (
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">
                No open positions at the moment. Please check back later or submit your resume for future opportunities.
              </p>
            </motion.div>
          )}
        </motion.section>

        {/* Application Form */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <motion.h2
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="text-3xl font-bold text-white mb-8 text-center"
          >
            Apply Now
          </motion.h2>
          
          <motion.form
            variants={fadeIn("up", "tween", 0.3, 1)}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
                className="bg-zinc-800/50 border-gray-600"
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="bg-zinc-800/50 border-gray-600"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
                className="bg-zinc-800/50 border-gray-600"
              />
              <Input
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
                className="bg-zinc-800/50 border-gray-600"
              />
            </div>

            <Input
              placeholder="Apply for Position"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              required
              className="bg-zinc-800/50 border-gray-600"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Experience Level (e.g., 3 years)"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                required
                className="bg-zinc-800/50 border-gray-600"
              />
              <Input
                placeholder="Current Salary"
                value={formData.currentSalary}
                onChange={(e) => setFormData({...formData, currentSalary: e.target.value})}
                required
                className="bg-zinc-800/50 border-gray-600"
              />
            </div>

            <Input
              placeholder="Expected Salary"
              value={formData.expectedSalary}
              onChange={(e) => setFormData({...formData, expectedSalary: e.target.value})}
              required
              className="bg-zinc-800/50 border-gray-600"
            />

            <Textarea
              placeholder="Additional Comments / Cover Letter"
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              className="bg-zinc-800/50 border-gray-600 h-32"
            />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Upload Photo *
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    required
                    className="bg-zinc-800/50 border-gray-600"
                  />
                </div>
                {formData.photo && (
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-6" />
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Upload Resume (PDF/DOC/DOCX) *
                  </label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="bg-zinc-800/50 border-gray-600"
                  />
                </div>
                {formData.resume && (
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-6" />
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isRobot}
                  onChange={(e) => setFormData({...formData, isRobot: e.target.checked})}
                  className="w-4 h-4 rounded border-gray-600"
                />
                <span className="text-gray-400">I'm not a robot</span>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !formData.isRobot}
                className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </motion.form>
        </motion.section>
      </div>
    </div>
  );
};

export default Careers;
