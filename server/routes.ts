import express, { type Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { Blog } from "./models/Blog";
import { Contact } from "./models/Contact";
import { Meeting } from "./models/Meeting";
import { JobPosting, Career } from "./models/Career";
import { Chat } from "./models/Chat";
// Twilio import aur client initialization hata diya gaya hai

import { SiteSettings } from "./models/SiteSettings";
import { Job } from "./models/Job"; // Import Job model

export async function registerRoutes(app: Express, httpServer?: Server): Promise<Server> {
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

  if (!httpServer) {
    httpServer = createServer(app);
  }

  // Blog APIs
  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  // Get individual blog by ID
  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog" });
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
    } catch (error: any) {
      console.error('Job posting error:', error);
      res.status(500).json({ message: "Failed to create job posting", error: error.message });
    }
  });

  app.get("/api/careers/jobs", async (req, res) => {
    try {
      const jobs = await JobPosting.find().sort({ createdAt: -1 });
      res.json(jobs);
    } catch (error: any) {
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

  // Admin routes
  app.post('/api/admin/jobs', async (req, res) => {
    try {
      const job = new Job(req.body);
      await job.save();
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create job' });
    }
  });

  // Real-time site settings management
  app.put('/api/admin/site-settings', async (req, res) => {
    try {
      const { settingKey, settingValue } = req.body;
      const io = app.get('io');

      const settings = await SiteSettings.findOneAndUpdate(
        { settingKey },
        { settingValue, updatedAt: new Date() },
        { upsert: true, new: true }
      );

      // Emit real-time update to all connected clients
      io.emit('siteSettingsUpdate', { settingKey, settingValue });

      res.json({ success: true, data: settings });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update site settings' });
    }
  });

  app.get('/api/admin/site-settings/:key?', async (req, res) => {
    try {
      const { key } = req.params;

      if (key) {
        const setting = await SiteSettings.findOne({ settingKey: key });
        res.json({ data: setting?.settingValue || null });
      } else {
        const allSettings = await SiteSettings.find();
        const settingsMap: Record<string, any> = {};
        allSettings.forEach(setting => {
          settingsMap[setting.settingKey] = setting.settingValue;
        });
        res.json({ data: settingsMap });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch site settings' });
    }
  });

  // Bulk update for theme settings
  app.put('/api/admin/theme-settings', async (req, res) => {
    try {
      const { themeSettings } = req.body;
      const io = app.get('io');

      const updatePromises = Object.keys(themeSettings).map(key => 
        SiteSettings.findOneAndUpdate(
          { settingKey: key },
          { settingValue: themeSettings[key], updatedAt: new Date() },
          { upsert: true, new: true }
        )
      );

      await Promise.all(updatePromises);

      // Emit theme update to all clients
      io.emit('themeUpdate', themeSettings);

      res.json({ success: true, message: 'Theme settings updated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update theme settings' });
    }
  });

  // Service management routes
  app.put('/api/admin/services', async (req, res) => {
    try {
      const { services } = req.body;
      const io = app.get('io');

      const settings = await SiteSettings.findOneAndUpdate(
        { settingKey: 'services' },
        { settingValue: services, updatedAt: new Date() },
        { upsert: true, new: true }
      );

      io.emit('servicesUpdate', services);

      res.json({ success: true, data: settings });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update services' });
    }
  });

  // Get all service categories
  app.get('/api/admin/service-categories', async (req, res) => {
    try {
      const settings = await SiteSettings.findOne({ settingKey: 'serviceCategories' });
      res.json({ success: true, data: settings?.settingValue || [] });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service categories' });
    }
  });

  // Update service categories
  app.put('/api/admin/service-categories', async (req, res) => {
    try {
      const { categories } = req.body;
      const io = app.get('io');

      const settings = await SiteSettings.findOneAndUpdate(
        { settingKey: 'serviceCategories' },
        { settingValue: categories, updatedAt: new Date() },
        { upsert: true, new: true }
      );

      io.emit('serviceCategoriesUpdate', categories);

      res.json({ success: true, data: settings });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update service categories' });
    }
  });

  // Add new service category
  app.post('/api/admin/service-categories', async (req, res) => {
    try {
      const { category } = req.body;
      const io = app.get('io');

      const existingSettings = await SiteSettings.findOne({ settingKey: 'serviceCategories' });
      const categories = existingSettings?.settingValue || [];

      categories.push(category);

      const settings = await SiteSettings.findOneAndUpdate(
        { settingKey: 'serviceCategories' },
        { settingValue: categories, updatedAt: new Date() },
        { upsert: true, new: true }
      );

      io.emit('serviceCategoriesUpdate', categories);

      res.json({ success: true, data: settings });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add service category' });
    }
  });

  // Delete service category
  app.delete('/api/admin/service-categories/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const io = app.get('io');

      const existingSettings = await SiteSettings.findOne({ settingKey: 'serviceCategories' });
      const categories = existingSettings?.settingValue || [];

      const updatedCategories = categories.filter((cat: any) => cat.id !== id);

      const settings = await SiteSettings.findOneAndUpdate(
        { settingKey: 'serviceCategories' },
        { settingValue: updatedCategories, updatedAt: new Date() },
        { upsert: true, new: true }
      );

      io.emit('serviceCategoriesUpdate', updatedCategories);

      res.json({ success: true, data: settings });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete service category' });
    }
  });

  // Update individual service
  app.put('/api/admin/services/:categoryId/:serviceId', async (req, res) => {
    try {
      const { categoryId, serviceId } = req.params;
      const { service } = req.body;
      const io = app.get('io');

      const existingSettings = await SiteSettings.findOne({ settingKey: 'serviceCategories' });
      const categories = existingSettings?.settingValue || [];

      const updatedCategories = categories.map((cat: any) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            services: cat.services.map((svc: any) => 
              svc.id === serviceId ? { ...svc, ...service } : svc
            )
          };
        }
        return cat;
      });

      const settings = await SiteSettings.findOneAndUpdate(
        { settingKey: 'serviceCategories' },
        { settingValue: updatedCategories, updatedAt: new Date() },
        { upsert: true, new: true }
      );

      io.emit('serviceCategoriesUpdate', updatedCategories);

      res.json({ success: true, data: settings });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update service' });
    }
  });

  // Delete individual service
  app.delete('/api/admin/services/:categoryId/:serviceId', async (req, res) => {
    try {
      const { categoryId, serviceId } = req.params;
      const io = app.get('io');

      const existingSettings = await SiteSettings.findOne({ settingKey: 'serviceCategories' });
      const categories = existingSettings?.settingValue || [];

      const updatedCategories = categories.map((cat: any) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            services: cat.services.filter((svc: any) => svc.id !== serviceId)
          };
        }
        return cat;
      });

      const settings = await SiteSettings.findOneAndUpdate(
        { settingKey: 'serviceCategories' },
        { settingValue: updatedCategories, updatedAt: new Date() },
        { upsert: true, new: true }
      );

      io.emit('serviceCategoriesUpdate', updatedCategories);

      res.json({ success: true, data: settings });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete service' });
    }
  });

  app.post('/api/admin/media/upload', async (req, res) => {
    try {
      // Handle file upload
      res.json({ success: true, url: '/uploaded/file.jpg' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload media' });
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

    async function uploadFile(file: any): Promise<string> {
        // Implement your file upload logic here
        // This is a placeholder implementation
        console.log("Simulating file upload for:", file.name);
        return Promise.resolve(`/uploads/${file.name}`);
    }

  return httpServer;
}