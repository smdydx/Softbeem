import express, { type Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { Blog } from "./models/Blog";
import { Contact } from "./models/Contact";
import { Meeting } from "./models/Meeting";
import { JobPosting, Career } from "./models/Career";
import { Chat } from "./models/Chat";
// Twilio import aur client initialization hata diya gaya hai

export async function registerRoutes(app: Express): Promise<Server> {
  // Meeting APIs
  app.post("/api/meetings", async (req, res) => {
    try {
      const meeting = new Meeting(req.body);
      await meeting.save();
      res.status(201).json(meeting);
    } catch (error) {
      res.status(500).json({ message: "Failed to schedule meeting" });
    }
  });

  app.get("/api/meetings", async (req, res) => {
    try {
      const meetings = await Meeting.find().sort({ createdAt: -1 });
      res.json(meetings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meetings" });
    }
  });

  app.put("/api/meetings/:id", async (req, res) => {
    try {
      const meeting = await Meeting.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );

      // Twilio notification logic hata diya gaya hai

      res.json(meeting);
    } catch (error) {
      res.status(500).json({ message: "Failed to update meeting status" });
    }
  });

  const httpServer = createServer(app);

  // Blog APIs
  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  app.post("/api/blogs", async (req, res) => {
    try {
      const blog = new Blog(req.body);
      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Failed to create blog" });
    }
  });

  // Contact form API
  app.post("/api/contacts", async (req, res) => {
    try {
      const contact = new Contact(req.body);
      await contact.save();
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ message: "Failed to save contact" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Job posting routes for admin
  app.post("/api/careers/jobs", async (req, res) => {
    try {
      const { title, department, location, type, description, requirements } = req.body;
      
      const jobPosting = new JobPosting({
        title,
        department,
        location,
        type,
        description,
        requirements: requirements.filter((req: string) => req.trim() !== '')
      });
      
      await jobPosting.save();
      res.status(201).json(jobPosting);
    } catch (error) {
      console.error('Job posting error:', error);
      res.status(500).json({ message: "Failed to create job posting", error: error.message });
    }
  });

  app.get("/api/careers/jobs", async (req, res) => {
    try {
      const jobs = await JobPosting.find().sort({ createdAt: -1 });
      res.json(jobs);
    } catch (error) {
      console.error('Fetch jobs error:', error);
      res.status(500).json({ message: "Failed to fetch job postings", error: error.message });
    }
  });

  // Delete job posting (optional)
  app.delete("/api/careers/jobs/:id", async (req, res) => {
    try {
      await JobPosting.findByIdAndDelete(req.params.id);
      res.json({ message: "Job posting deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete job posting" });
    }
  });

  // Career application routes
  app.post("/api/careers/apply", async (req, res) => {
    try {
      if (!req.files?.photo || !req.files?.resume) {
        return res.status(400).json({ message: "Photo and resume are required" });
      }

      const photoUrl = await uploadFile(req.files.photo);
      const resumeUrl = await uploadFile(req.files.resume);

      const application = new Career({
        ...req.body,
        photoUrl,
        resumeUrl
      });
      await application.save();
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit application" });
    }
  });

  app.get("/api/careers/applications", async (req, res) => {
    try {
      const applications = await Career.find().sort({ createdAt: -1 });
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.get("/api/meetings", async (req, res) => {
    try {
      const meetings = await Meeting.find().sort({ createdAt: -1 });
      res.json(meetings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meetings" });
    }
  });

  // Chat API endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      let response = "I understand your message. How can I help you further?";

      const chat = new Chat({
        message,
        response
      });

      await chat.save();
      res.json({ response });
    } catch (error) {
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });


  const publicPath = path.join(process.cwd(), 'dist/public');

  if (process.env.NODE_ENV === 'production') {
    // Serve static files
    app.use(express.static(publicPath));

    // Handle client-side routing - serve index.html for all routes
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(publicPath, 'index.html'));
      }
    });

    // Handle API routes first
    app.use('/api', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        next();
      }
    });

    // Serve index.html for all non-API routes (client-side routing)
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(publicPath, 'index.html'));
      }
    });
  } else {
    const { setupVite } = await import('./vite');
    await setupVite(app, httpServer);
  }

  return httpServer;
}