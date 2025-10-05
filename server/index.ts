import express, { type Request, Response, NextFunction } from "express";
import cors from 'cors';
import { connectDB } from './db';
import { registerRoutes } from "./routes";
import { log } from "./vite";
import fileUpload from 'express-fileupload';
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload()); // Add file upload middleware

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Connect to MongoDB
connectDB();

// Example file upload route (replace with your actual implementation)
app.post('/api/upload', (req: any, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let sampleFile = req.files.sampleFile as any;
  let uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function (err: any) {
    if (err) return res.status(500).send(err);
    res.send('File uploaded!');
  });
});

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io available to routes
app.set('io', io);

// Register routes and start server
registerRoutes(app, httpServer).then((server) => {
  const port = process.env.PORT || 5000;
  const host = '0.0.0.0';

  // Graceful shutdown handling
  process.on('SIGTERM', () => {
    server.close(() => {
      log('Server shutting down');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    server.close(() => {
      log('Server shutting down');
      process.exit(0);
    });
  });

  httpServer.on('error', (e: any) => {
    if (e.code === 'EADDRINUSE') {
      log(`Port ${port} is busy, retrying...`);
      setTimeout(() => {
        httpServer.close();
        httpServer.listen(Number(port), host);
      }, 1000);
    }
  });

  httpServer.listen(Number(port), host, () => {
    log(`Server running at http://${host}:${port}`);
  });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});