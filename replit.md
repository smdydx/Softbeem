# Replit.md

## Overview

This is a full-stack web application for Ramaera Legal InfoTech Private Limited, a technology consultancy that provides blockchain development, IT services, and legal compliance solutions. The platform serves as a comprehensive business website featuring service showcases, blog functionality, meeting scheduling, career applications, and admin management capabilities.

The application is built as a modern web platform with both client-facing features and administrative tools, targeting businesses seeking technology and legal solutions in blockchain, web development, mobile apps, and compliance services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component architecture
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, professional design
- **Routing**: React Router for client-side navigation and multi-page application structure
- **State Management**: React Context API for site settings and TanStack Query for server state management
- **Animations**: Framer Motion for smooth transitions and interactive elements
- **UI Components**: Radix UI primitives with custom styling for accessibility and consistency

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API development
- **Database**: Dual database approach - MongoDB with Mongoose for dynamic content and user data, PostgreSQL with Drizzle ORM for structured data
- **Authentication**: Simple token-based authentication for admin access
- **File Handling**: Express-fileupload middleware for resume and image uploads
- **Real-time Communication**: Socket.io for live updates and notifications
- **Development**: TypeScript throughout for type safety and better developer experience

### Key Features Implementation
- **Service Showcase**: Comprehensive presentation of blockchain, IT, and legal services with detailed feature lists
- **Blog System**: Dynamic blog with admin creation, categorization, and public viewing
- **Meeting Scheduler**: Customer appointment booking with admin approval workflow
- **Career Portal**: Job application system with file upload capabilities
- **Contact Management**: Form submissions with database storage
- **Admin Dashboard**: Content management and application review interface
- **AI Chatbot**: Interactive customer support with service information

### Data Storage Strategy
- **PostgreSQL**: Used for structured data like users, contacts, and subscribers via Drizzle ORM
- **MongoDB**: Handles dynamic content including blogs, meetings, careers, and site settings
- **Schema Design**: Separate schemas for different data types with appropriate indexing and relationships
- **File Storage**: Server-side file handling for uploaded documents and images

### Design Patterns
- **Component Architecture**: Modular, reusable React components with clear separation of concerns
- **Custom Hooks**: Specialized hooks for mobile detection, socket connections, and viewport handling
- **Context Providers**: Global state management for site settings and user preferences
- **Responsive Design**: Mobile-first approach with breakpoint-specific optimizations
- **Performance Optimization**: Lazy loading, image optimization, and efficient re-rendering strategies

## External Dependencies

### Core Technologies
- **Database Services**: 
  - MongoDB Atlas for document storage and dynamic content
  - PostgreSQL (configured via Drizzle) for relational data
  - Neon Database as PostgreSQL provider
- **Real-time Features**: Socket.io for live communication and updates
- **Email Services**: Nodemailer with SMTP configuration for notifications
- **File Upload**: Express-fileupload for handling document and image uploads

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: ESLint and TypeScript compiler for code validation
- **UI Framework**: Tailwind CSS with PostCSS for styling pipeline
- **Component Library**: Radix UI primitives with shadcn/ui customizations

### Third-party Integrations
- **Google Fonts**: Orbitron and Montserrat font families for branding
- **Socket Communication**: Real-time updates for admin dashboard and notifications
- **Image Assets**: Unsplash integration for placeholder and demo images
- **Mobile Optimization**: Touch device detection and iOS-specific optimizations

### API Services
- **REST Endpoints**: Custom Express.js routes for all CRUD operations
- **File Handling**: Multipart form data processing for career applications
- **Database Connections**: MongoDB connection with retry logic and error handling
- **Real-time Events**: Socket.io event handling for live features

### Environment Configuration
- **Database URLs**: Environment variables for MongoDB and PostgreSQL connections
- **SMTP Settings**: Email service configuration for notifications
- **File Paths**: Configurable upload directories and static asset serving
- **Development Tools**: Hot reloading, error overlays, and development logging

## Replit Environment Setup

### Development Workflow
- **Command**: `npm run dev:server` - Starts the Express backend server which integrates Vite middleware for development
- **Port**: 5000 - The server runs on port 5000 and serves both frontend and API endpoints
- **Host**: 0.0.0.0 - Bound to all interfaces to work with Replit's proxy system
- **Hot Reload**: Vite provides instant HMR for frontend changes

### Architecture in Development
The application uses a monolithic development setup where:
1. Express server starts on port 5000
2. Vite is integrated as Express middleware (via server/vite.ts)
3. API routes are served at `/api/*`
4. All other routes are handled by Vite for the React frontend
5. Socket.io is integrated with the same HTTP server for real-time features

### Production Build
- **Build Command**: `npm run build` - Compiles both frontend (Vite) and backend (esbuild)
- **Start Command**: `npm run start` - Runs the production server
- **Static Files**: Frontend builds to `dist/public` and is served by Express in production

### Database Configuration
- **MongoDB**: Currently using MongoDB Atlas with connection string in code (should use environment variable)
- **PostgreSQL**: Configured via Drizzle ORM for relational data (optional in this setup)

### Known Issues
- WebGL components (JarvisGlobe) require browser with GPU support
- Error handling added for environments without WebGL context

## Recent Changes (October 2025)

### Replit Environment Configuration
- **Server Configuration**: Fixed port configuration to use 5000 consistently for both development and production
- **Vite Proxy**: Removed unnecessary API proxy configuration as backend integrates Vite middleware directly
- **MongoDB Connection**: Configured to use MONGODB_URI environment variable for secure database connection
- **Host Configuration**: Set to 0.0.0.0 to work with Replit's proxy system

### Deployment Setup
- **Target**: VM deployment for maintaining server state and WebSocket connections
- **Build Process**: Compiles frontend with Vite and backend with esbuild
- **Production Start**: Runs compiled Node.js server from dist directory