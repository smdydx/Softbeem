import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, User, Mail, Phone, Building, CheckCircle, MessageSquare, Globe, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number too long"),
  date: z.date({
    required_error: "Please select a date for the meeting",
  }),
  time: z.string().min(1, "Please select a preferred time"),
  purpose: z.string().min(10, "Please provide at least 10 characters").max(500, "Purpose too long"),
  companyName: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Generate time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      slots.push({ value: time, label: displayTime });
    }
  }
  return slots;
};

const ScheduleMeetingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      purpose: "",
      companyName: "",
    },
  });

  const timeSlots = generateTimeSlots();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Format data to match API expectations
      const formattedData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        purpose: data.purpose,
        companyName: data.companyName || '',
      };

      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error('Failed to schedule meeting');
      }

      setIsSubmitted(true);
      toast({
        title: "Meeting Request Sent! ✅",
        description: "We'll confirm your meeting schedule shortly via WhatsApp.",
      });

      form.reset();
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

  const characterCount = form.watch('purpose')?.length || 0;

  if (isSubmitted) {
    return (
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-950/50 dark:via-emerald-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                  Meeting Request Submitted!
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Thank you! We've received your meeting request and will confirm the schedule via WhatsApp within 24 hours.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">What happens next?</h4>
                <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                  <li>✓ Our team will review your request</li>
                  <li>✓ You'll receive a WhatsApp confirmation</li>
                  <li>✓ Meeting details will be shared via email</li>
                </ul>
              </div>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/50"
              >
                Book Another Meeting
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-4 sm:gap-6 lg:gap-8"
      >
        {/* Main Form */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-2 border-gray-200/50 dark:border-gray-800/50 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5" />
          <CardHeader className="relative p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Schedule Your Meeting
            </CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base">
              Book a consultation with our experts to discuss your project requirements
            </p>
          </CardHeader>
          <CardContent className="relative p-4 sm:p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="w-4 h-4 text-emerald-600" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter your full name"
                              className="pl-10 h-11 sm:h-12 border-2 focus:border-emerald-500 transition-all duration-200 text-base"
                              {...field}
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-emerald-600" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="your.email@example.com"
                              type="email"
                              className="pl-10 h-11 sm:h-12 border-2 focus:border-emerald-500 transition-all duration-200 text-base"
                              {...field}
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        Phone Number (WhatsApp Preferred)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="+91 9876543210"
                            type="tel"
                            inputMode="tel"
                            className="pl-10 sm:pl-12 h-12 border-2 focus:border-emerald-500 transition-all duration-200 text-base"
                            {...field}
                          />
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date and Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-emerald-600" />
                          Preferred Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "h-11 sm:h-12 pl-10 text-left font-normal border-2 focus:border-emerald-500 text-base",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          Preferred Time
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 sm:h-12 border-2 focus:border-emerald-500 text-base">
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot.value} value={slot.value}>
                                {slot.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Company Name */}
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-emerald-600" />
                        Company Name (Optional)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Your company name"
                            className="pl-10 sm:pl-12 h-12 border-2 focus:border-emerald-500 transition-all duration-200 text-base"
                            {...field}
                          />
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Meeting Purpose */}
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                          Meeting Purpose
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {characterCount}/500
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe the purpose of the meeting and what you'd like to discuss..."
                          className="min-h-[100px] sm:min-h-[120px] border-2 focus:border-emerald-500 transition-all duration-200 resize-none text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 h-12 sm:h-14 text-base sm:text-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/25"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Scheduling Meeting...
                      </div>
                    ) : (
                      "Schedule Meeting"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 border border-emerald-200 dark:border-emerald-800 rounded-lg">
              <p className="text-sm text-emerald-700 dark:text-emerald-300 text-center">
                💬 We'll confirm your meeting schedule via WhatsApp within 24 hours
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Info Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          <Card className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-emerald-950/50 dark:via-green-950/50 dark:to-emerald-900/50 border-emerald-200 dark:border-emerald-800">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-emerald-700 dark:text-emerald-300">
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-emerald-700 dark:text-emerald-300">Monday - Friday</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">9:00 AM - 7:00 PM IST</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-emerald-700 dark:text-emerald-300">Response Time</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">Within 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-blue-700 dark:text-blue-300">
                What to Expect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">Project Discussion</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Detailed review of your requirements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">Solution Strategy</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Customized approach for your needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">Timeline & Budget</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Clear project roadmap and pricing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 dark:from-purple-950/50 dark:via-violet-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 sm:p-6">
              <div className="text-center">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  Prefer to Call?
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-4">
                  Connect with us directly for immediate assistance
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ScheduleMeetingForm;