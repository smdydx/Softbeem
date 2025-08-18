import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { 
  PencilIcon, 
  TrashIcon, 
  MessageSquare, 
  FileText,
  Eye,
  Users,
  Bell,
  CircuitBoard,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Menu,
  X,
  Home,
  Settings,
  Image,
  Globe,
  Layout,
  Database,
  Mail,
  Briefcase,
  BookOpen,
  Shield,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Save,
  Plus,
  Minus,
  Upload,
  Code,
  Smartphone,
  TrendingUp,
  TrendingDown,
  Activity,
  RefreshCw,
  Search,
  Filter,
  Download,
  FileImage,
  Video,
  Settings2,
  Zap,
  Target,
  UserPlus,
  MessageCircle,
  Archive
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State management
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [contacts, setContacts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBlog, setEditBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Analytics state
  const [analytics, setAnalytics] = useState({
    dailyViews: 0,
    weeklyViews: 0,
    monthlyViews: 0,
    conversionRate: 0,
    avgSessionTime: 0,
    bounceRate: 0
  });

  // Site content management with real-time updates
  const { settings, updateSettings, updateTheme, loading: settingsLoading } = useSiteSettings();

  const [themeSettings, setThemeSettings] = useState({
    themeColor: '#00FF00',
    fontFamily: 'Inter',
    logoUrl: '/images/ramaera-logo.jpg',
    companyName: 'Ramaera Industries',
    darkMode: true,
    customCSS: ''
  });

  const [headerContent, setHeaderContent] = useState({
    logo: '/images/ramaera-logo.jpg',
    title: 'Ramaera Industries',
    tagline: 'Leading Technology Solutions'
  });

  const [heroContent, setHeroContent] = useState({
    title: 'Leading Technology Solutions',
    subtitle: 'Empowering businesses with cutting-edge blockchain and IT solutions',
    backgroundVideo: '/video/hero-backvideo.mp4',
    ctaText: 'Get Started',
    ctaLink: '/services'
  });

  const [serviceCategories, setServiceCategories] = useState([
    {
      id: 'blockchain',
      name: 'Blockchain Services',
      description: 'Complete blockchain development solutions',
      icon: 'Code',
      status: 'active',
      featured: true,
      services: [
        { 
          id: 'smart-contracts', 
          name: 'Smart Contract Development', 
          price: '₹50,000',
          description: 'Custom smart contract development with security audit',
          features: ['Security Audit', 'Gas Optimization', 'Testing Suite'],
          image: '/images/smartcontract.jpg',
          path: '/services/blockchain/smart-contracts',
          status: 'active',
          popularity: 95
        },
        { 
          id: 'token-dev', 
          name: 'Token Development', 
          price: '₹75,000',
          description: 'ERC-20, ERC-721, and custom token development',
          features: ['Multi-chain Support', 'Custom Features', 'Audit Included'],
          image: '/images/tokenpic.jpg',
          path: '/services/blockchain/token',
          status: 'active',
          popularity: 88
        },
        { 
          id: 'nft-marketplace', 
          name: 'NFT Marketplace', 
          price: '₹1,50,000',
          description: 'Complete NFT marketplace with trading features',
          features: ['Minting', 'Trading', 'Royalties', 'Wallet Integration'],
          image: '/images/cryptopic.jpg',
          path: '/services/blockchain/nft',
          status: 'active',
          popularity: 92
        }
      ]
    },
    {
      id: 'it-services',
      name: 'IT Services',
      description: 'Comprehensive IT solutions for modern businesses',
      icon: 'Smartphone',
      status: 'active',
      featured: true,
      services: [
        { 
          id: 'web-dev', 
          name: 'Web Development', 
          price: '₹25,000',
          description: 'Modern responsive websites with latest technologies',
          features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
          image: '/images/services/website-builder.jpg',
          path: '/services/it/web-dev',
          status: 'active',
          popularity: 97
        },
        { 
          id: 'app-dev', 
          name: 'App Development', 
          price: '₹60,000',
          description: 'Native and cross-platform mobile applications',
          features: ['iOS & Android', 'Cross-platform', 'App Store Deploy'],
          image: '/images/devimage.jpg',
          path: '/services/it/app-dev',
          status: 'active',
          popularity: 89
        }
      ]
    }
  ]);

  // New service form state
  const [newService, setNewService] = useState({
    categoryId: '',
    name: '',
    price: '',
    description: '',
    features: [''],
    image: '',
    path: '',
    status: 'active'
  });

  const [editingService, setEditingService] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: 'Code',
    status: 'active',
    featured: false
  });

  // Sidebar menu structure with enhanced organization
  const sidebarMenu = [
    {
      id: 'overview',
      title: 'Dashboard Overview',
      icon: Home,
      children: []
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: BarChart3,
      children: [
        { id: 'site-analytics', title: 'Site Analytics', icon: Activity },
        { id: 'performance', title: 'Performance Metrics', icon: TrendingUp },
        { id: 'user-behavior', title: 'User Behavior', icon: Users },
        { id: 'reports', title: 'Custom Reports', icon: FileText }
      ]
    },
    {
      id: 'content',
      title: 'Content Management',
      icon: FileText,
      children: [
        { id: 'theme', title: 'Theme Settings', icon: Settings },
        { id: 'header', title: 'Header Settings', icon: Layout },
        { id: 'hero', title: 'Hero Section', icon: Image },
        { id: 'footer', title: 'Footer Settings', icon: Globe },
        { id: 'pages', title: 'Page Content', icon: BookOpen },
        { id: 'seo', title: 'SEO Settings', icon: Search }
      ]
    },
    {
      id: 'media',
      title: 'Media Library',
      icon: Image,
      children: [
        { id: 'images', title: 'Images', icon: FileImage },
        { id: 'videos', title: 'Videos', icon: Video },
        { id: 'uploads', title: 'File Manager', icon: Upload }
      ]
    },
    {
      id: 'blogs',
      title: 'Blog Management',
      icon: BookOpen,
      children: [
        { id: 'all-blogs', title: 'All Posts', icon: FileText },
        { id: 'blog-categories', title: 'Categories', icon: Settings2 },
        { id: 'blog-analytics', title: 'Blog Analytics', icon: BarChart3 }
      ]
    },
    {
      id: 'services',
      title: 'Services Management',
      icon: Settings,
      children: [
        { id: 'service-categories', title: 'Service Categories', icon: CircuitBoard },
        { id: 'service-items', title: 'Individual Services', icon: Database },
        { id: 'service-content', title: 'Service Content', icon: Shield },
        { id: 'pricing-management', title: 'Pricing Management', icon: Target }
      ]
    },
    {
      id: 'jobs',
      title: 'Career Management',
      icon: Briefcase,
      children: [
        { id: 'job-postings', title: 'Job Postings', icon: UserPlus },
        { id: 'applications', title: 'Applications', icon: FileText }
      ]
    },
    {
      id: 'schedule',
      title: 'Meetings & Schedule',
      icon: Calendar,
      children: [
        { id: 'pending-meetings', title: 'Pending Meetings', icon: Clock },
        { id: 'scheduled-meetings', title: 'Scheduled', icon: CheckCircle2 },
        { id: 'meeting-history', title: 'Meeting History', icon: Archive }
      ]
    },
    {
      id: 'messages',
      title: 'Communication',
      icon: MessageSquare,
      children: [
        { id: 'contact-messages', title: 'Contact Messages', icon: Mail },
        { id: 'chat-support', title: 'Chat Support', icon: MessageCircle },
        { id: 'notifications', title: 'Notifications', icon: Bell }
      ]
    },
    {
      id: 'system',
      title: 'System Management',
      icon: Settings2,
      children: [
        { id: 'site-settings', title: 'Site Settings', icon: Globe },
        { id: 'performance-monitor', title: 'Performance', icon: Activity },
        { id: 'backup-restore', title: 'Backup & Restore', icon: Database }
      ]
    }
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminAuth');
        if (!token) {
          navigate('/admin/login');
          return;
        }
        await Promise.all([fetchData(), fetchJobs(), fetchAnalytics()]);
        setLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [navigate]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
        setMobileMenuOpen(false);
      } else {
        setSidebarOpen(true);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside or changing sections
  useEffect(() => {
    if (isMobile && mobileMenuOpen) {
      const handleClickOutside = (event) => {
        if (!event.target.closest('.admin-sidebar')) {
          setMobileMenuOpen(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobile, mobileMenuOpen]);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [contactsRes, blogsRes, meetingsRes] = await Promise.all([
        fetch('/api/contacts'),
        fetch('/api/blogs'),
        fetch('/api/meetings')
      ]);

      if (!contactsRes.ok || !blogsRes.ok || !meetingsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [contactsData, blogsData, meetingsData] = await Promise.all([
        contactsRes.json(),
        blogsRes.json(),
        meetingsRes.json()
      ]);

      setContacts(contactsData || []);
      setBlogs(blogsData || []);
      setMeetings(meetingsData || []);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setRefreshing(false);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/careers/jobs');
      if (response.ok) {
        const jobsData = await response.json();
        setJobs(jobsData);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      // Simulate analytics data - in real app, fetch from analytics API
      setAnalytics({
        dailyViews: Math.floor(Math.random() * 1000) + 500,
        weeklyViews: Math.floor(Math.random() * 5000) + 2000,
        monthlyViews: Math.floor(Math.random() * 20000) + 10000,
        conversionRate: (Math.random() * 5 + 2).toFixed(2),
        avgSessionTime: Math.floor(Math.random() * 300 + 120),
        bounceRate: (Math.random() * 30 + 20).toFixed(2)
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleMobileMenuToggle = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Enhanced Service Management Functions
  const addNewCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    const newCat = {
      id: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      name: newCategory.name,
      description: newCategory.description,
      icon: newCategory.icon,
      status: newCategory.status,
      featured: newCategory.featured,
      services: []
    };

    setServiceCategories([...serviceCategories, newCat]);
    setNewCategory({ name: '', description: '', icon: 'Code', status: 'active', featured: false });

    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  const deleteCategory = (categoryId) => {
    setServiceCategories(serviceCategories.filter(cat => cat.id !== categoryId));
    toast({
      title: "Success",
      description: "Category deleted successfully",
    });
  };

  const addNewService = () => {
    if (!newService.categoryId || !newService.name.trim()) {
      toast({
        title: "Error",
        description: "Category and service name are required",
        variant: "destructive",
      });
      return;
    }

    const service = {
      id: newService.name.toLowerCase().replace(/\s+/g, '-'),
      name: newService.name,
      price: newService.price,
      description: newService.description,
      features: newService.features.filter(f => f.trim()),
      image: newService.image,
      path: newService.path,
      status: newService.status,
      popularity: Math.floor(Math.random() * 100)
    };

    setServiceCategories(prev => 
      prev.map(cat => 
        cat.id === newService.categoryId 
          ? { ...cat, services: [...cat.services, service] }
          : cat
      )
    );

    setNewService({
      categoryId: '',
      name: '',
      price: '',
      description: '',
      features: [''],
      image: '',
      path: '',
      status: 'active'
    });

    toast({
      title: "Success",
      description: "Service added successfully",
    });
  };

  const updateService = (categoryId, serviceId, updatedService) => {
    setServiceCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              services: cat.services.map(service =>
                service.id === serviceId ? { ...service, ...updatedService } : service
              )
            }
          : cat
      )
    );

    setEditingService(null);
    toast({
      title: "Success",
      description: "Service updated successfully",
    });
  };

  const deleteService = (categoryId, serviceId) => {
    setServiceCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              services: cat.services.filter(service => service.id !== serviceId)
            }
          : cat
      )
    );

    toast({
      title: "Success",
      description: "Service deleted successfully",
    });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const blogData = {
      title: formData.get('title'),
      author: formData.get('author'),
      image: formData.get('image'),
      content: formData.get('content'),
      status: formData.get('status') || 'published',
      tags: formData.get('tags')?.split(',').map(tag => tag.trim()) || []
    };

    try {
      if (editBlog) {
        await fetch(`/api/blogs/${editBlog._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData)
        });
      } else {
        await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData)
        });
      }

      await fetchData();
      setEditBlog(null);
      form.reset();
      toast({
        title: editBlog ? "Blog updated" : "Blog created",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error('Error submitting blog:', error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jobData = {
      title: formData.get('title'),
      department: formData.get('department'),
      location: formData.get('location'),
      type: formData.get('type'),
      description: formData.get('description'),
      requirements: formData.get('requirements').split('\n').filter(r => r.trim()),
      status: formData.get('status') || 'active',
      salary: formData.get('salary')
    };

    try {
      const response = await fetch('/api/careers/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });

      if (response.ok) {
        toast({
          title: "Job Posted",
          description: "The job has been posted successfully.",
        });
        e.target.reset();
        fetchJobs();
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMeetingStatus = async (id, status) => {
    try {
      await fetch(`/api/meetings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
      toast({
        title: "Meeting status updated",
        description: `Meeting has been ${status}`,
      });
    } catch (error) {
      console.error('Failed to update meeting status:', error);
    }
  };

  const saveHeaderContent = async () => {
    try {
      await updateTheme(headerContent);
      toast({
        title: "Header Updated",
        description: "Header content saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save header content",
        variant: "destructive",
      });
    }
  };

  const saveHeroContent = async () => {
    try {
      await updateTheme(heroContent);
      toast({
        title: "Hero Section Updated",
        description: "Hero content saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save hero content",
        variant: "destructive",
      });
    }
  };

  const saveThemeSettings = async () => {
    try {
      await updateTheme(themeSettings);
      toast({
        title: "Theme Updated",
        description: "Theme settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save theme settings",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000510] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary rounded-full border-t-transparent animate-spin" />
          <p className="text-primary text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalViews: blogs.reduce((acc, blog) => acc + (blog.views || 0), 0),
    totalBlogs: blogs.length,
    totalMessages: contacts.length,
    activeUsers: meetings.length,
    pendingMeetings: meetings.filter(m => m.status === 'pending').length,
    totalServices: serviceCategories.reduce((acc, cat) => acc + cat.services.length, 0)
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6 mobile-space-y-4">
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 admin-stats-grid">
              {[
                { 
                  icon: Eye, 
                  label: 'Total Views', 
                  value: stats.totalViews, 
                  color: 'from-blue-400 to-blue-600',
                  trend: '+12%',
                  trendUp: true
                },
                { 
                  icon: FileText, 
                  label: 'Total Blogs', 
                  value: stats.totalBlogs, 
                  color: 'from-emerald-400 to-emerald-600',
                  trend: '+8%',
                  trendUp: true
                },
                { 
                  icon: MessageSquare, 
                  label: 'Messages', 
                  value: stats.totalMessages, 
                  color: 'from-purple-400 to-purple-600',
                  trend: '+15%',
                  trendUp: true
                },
                { 
                  icon: Users, 
                  label: 'Active Meetings', 
                  value: stats.activeUsers, 
                  color: 'from-amber-400 to-amber-600',
                  trend: '+5%',
                  trendUp: true
                }
              ].map(({ icon: Icon, label, value, color, trend, trendUp }) => (
                <Card key={label} className="p-4 md:p-6 bg-blue-950/30 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 dashboard-card admin-card">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-blue-400 mobile-text-xs">{label}</p>
                      <h3 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mt-2`}>
                        {value}
                      </h3>
                      <div className="flex items-center mt-2 gap-1">
                        {trendUp ? (
                          <TrendingUp className="h-3 w-3 text-green-400" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-400" />
                        )}
                        <span className={`text-xs mobile-text-xs ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
                          {trend}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 md:p-3 rounded-xl bg-blue-500/10 flex-shrink-0">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="p-4 md:p-6 bg-blue-950/30 border-blue-500/20 admin-card">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-white">Quick Actions</h2>
                <Button
                  onClick={fetchData}
                  disabled={refreshing}
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                  size={isMobile ? "sm" : "default"}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  <span className="mobile-text-sm">Refresh Data</span>
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 quick-actions-grid">
                {[
                  { label: 'Create Blog', icon: FileText, action: () => handleSectionChange('all-blogs'), color: 'bg-emerald-600' },
                  { label: 'Post Job', icon: Briefcase, action: () => handleSectionChange('job-postings'), color: 'bg-purple-600' },
                  { label: 'Add Service', icon: Plus, action: () => handleSectionChange('service-items'), color: 'bg-blue-600' },
                  { label: 'View Analytics', icon: BarChart3, action: () => handleSectionChange('analytics'), color: 'bg-amber-600' }
                ].map(({ label, icon: Icon, action, color }) => (
                  <Button
                    key={label}
                    onClick={action}
                    className={`${color} hover:opacity-90 p-4 md:p-6 h-auto flex flex-col gap-2 quick-action-button`}
                  >
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-xs md:text-sm mobile-text-xs">{label}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 recent-activity-grid">
              <Card className="p-4 md:p-6 bg-blue-950/30 border-blue-500/20 admin-card">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4">Recent Messages</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {contacts.slice(0, 5).map((contact) => (
                    <div key={contact._id} className="p-3 bg-blue-900/20 rounded-lg">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white mobile-text-sm truncate">{contact.name}</p>
                          <p className="text-sm text-blue-400 mobile-text-xs truncate">{contact.email}</p>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2 mobile-text-xs">{contact.message}</p>
                        </div>
                        <span className="text-xs text-gray-500 mobile-text-xs flex-shrink-0">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4 md:p-6 bg-blue-950/30 border-blue-500/20 admin-card">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4">Pending Meetings</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {meetings.filter(m => m.status === 'pending').slice(0, 5).map((meeting) => (
                    <div key={meeting._id} className="p-3 bg-amber-900/20 rounded-lg border border-amber-500/20">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white mobile-text-sm truncate">{meeting.name}</p>
                          <p className="text-sm text-amber-400 mobile-text-xs truncate">{meeting.email}</p>
                          <div className="flex gap-2 text-xs text-gray-400 mt-1 mobile-text-xs">
                            <span>{new Date(meeting.date).toLocaleDateString()}</span>
                            <span>{meeting.time}</span>
                          </div>
                        </div>
                        <Badge className="bg-amber-500/10 text-amber-500 text-xs flex-shrink-0">Pending</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        );

      case 'analytics':
      case 'site-analytics':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h2 className="text-2xl font-bold mb-6 text-white">Site Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: 'Daily Views', value: analytics.dailyViews, icon: Eye, color: 'text-blue-400' },
                  { label: 'Weekly Views', value: analytics.weeklyViews, icon: TrendingUp, color: 'text-emerald-400' },
                  { label: 'Monthly Views', value: analytics.monthlyViews, icon: BarChart3, color: 'text-purple-400' },
                  { label: 'Conversion Rate', value: `${analytics.conversionRate}%`, icon: Target, color: 'text-amber-400' },
                  { label: 'Avg Session Time', value: `${Math.floor(analytics.avgSessionTime / 60)}m ${analytics.avgSessionTime % 60}s`, icon: Clock, color: 'text-pink-400' },
                  { label: 'Bounce Rate', value: `${analytics.bounceRate}%`, icon: Activity, color: 'text-red-400' }
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-400">{label}</p>
                        <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
                      </div>
                      <Icon className={`h-8 w-8 ${color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Popular Services</h3>
              <div className="space-y-3">
                {serviceCategories.flatMap(cat => cat.services)
                  .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
                  .slice(0, 5)
                  .map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white font-medium">{service.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-bold">{service.popularity || 0}%</span>
                        <div className="w-16 h-2 bg-blue-900 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-400 rounded-full" 
                            style={{ width: `${service.popularity || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h2 className="text-2xl font-bold mb-6 text-white">Advanced Theme Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-2">Primary Theme Color</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={themeSettings.themeColor}
                      onChange={(e) => setThemeSettings({...themeSettings, themeColor: e.target.value})}
                      className="w-20 h-10 p-1 bg-blue-900/20 border-blue-500/20"
                    />
                    <Input
                      value={themeSettings.themeColor}
                      onChange={(e) => setThemeSettings({...themeSettings, themeColor: e.target.value})}
                      className="flex-1 bg-blue-900/20 border-blue-500/20"
                      placeholder="#00FF00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-2">Font Family</label>
                  <Select 
                    value={themeSettings.fontFamily} 
                    onValueChange={(value) => setThemeSettings({...themeSettings, fontFamily: value})}
                  >
                    <SelectTrigger className="bg-blue-900/20 border-blue-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Orbitron">Orbitron (Tech Style)</SelectItem>
                      <SelectItem value="Rajdhani">Rajdhani (Modern)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-2">Company Logo URL</label>
                  <Input
                    value={themeSettings.logoUrl}
                    onChange={(e) => setThemeSettings({...themeSettings, logoUrl: e.target.value})}
                    className="bg-blue-900/20 border-blue-500/20"
                    placeholder="Logo image URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-2">Company Name</label>
                  <Input
                    value={themeSettings.companyName}
                    onChange={(e) => setThemeSettings({...themeSettings, companyName: e.target.value})}
                    className="bg-blue-900/20 border-blue-500/20"
                    placeholder="Company name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-blue-400 mb-2">Custom CSS</label>
                  <Textarea
                    value={themeSettings.customCSS || ''}
                    onChange={(e) => setThemeSettings({...themeSettings, customCSS: e.target.value})}
                    className="bg-blue-900/20 border-blue-500/20 min-h-[120px] font-mono text-sm"
                    placeholder="/* Add custom CSS here */"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button 
                  onClick={saveThemeSettings} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Apply Theme Changes
                </Button>
                <Button 
                  variant="outline"
                  className="border-blue-500/50"
                  onClick={() => setThemeSettings({
                    themeColor: '#00FF00',
                    fontFamily: 'Inter',
                    logoUrl: '/images/ramaera-logo.jpg',
                    companyName: 'Ramaera Industries',
                    darkMode: true,
                    customCSS: ''
                  })}
                >
                  Reset to Default
                </Button>
              </div>
            </Card>
          </div>
        );

      case 'service-categories':
        return (
          <div className="space-y-6">
            {/* Enhanced search and filter */}
            <Card className="p-4 bg-blue-950/30 border-blue-500/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-blue-900/20 border-blue-500/20"
                  />
                </div>
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-48 bg-blue-900/20 border-blue-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="featured">Featured Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Add New Category - Enhanced */}
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Add New Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="bg-blue-900/20 border-blue-500/20"
                />
                <Input
                  placeholder="Description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  className="bg-blue-900/20 border-blue-500/20"
                />
                <Select value={newCategory.icon} onValueChange={(value) => setNewCategory({...newCategory, icon: value})}>
                  <SelectTrigger className="bg-blue-900/20 border-blue-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Code">Code</SelectItem>
                    <SelectItem value="Smartphone">Smartphone</SelectItem>
                    <SelectItem value="Shield">Shield</SelectItem>
                    <SelectItem value="Globe">Globe</SelectItem>
                    <SelectItem value="Zap">Zap</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Select value={newCategory.status} onValueChange={(value) => setNewCategory({...newCategory, status: value})}>
                    <SelectTrigger className="bg-blue-900/20 border-blue-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addNewCategory} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center gap-2 text-blue-400">
                  <input 
                    type="checkbox" 
                    checked={newCategory.featured}
                    onChange={(e) => setNewCategory({...newCategory, featured: e.target.checked})}
                    className="rounded"
                  />
                  <span>Featured Category</span>
                </label>
              </div>
            </Card>

            {/* Enhanced Categories List */}
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Service Categories Management</h2>
                <Badge className="bg-blue-500/10 text-blue-400">
                  {serviceCategories.length} Categories
                </Badge>
              </div>

              <div className="space-y-4">
                {serviceCategories
                  .filter(cat => {
                    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesFilter = filterBy === 'all' || 
                      (filterBy === 'active' && cat.status === 'active') ||
                      (filterBy === 'featured' && cat.featured);
                    return matchesSearch && matchesFilter;
                  })
                  .map((category, index) => (
                  <Card key={category.id} className="p-4 bg-blue-900/20 border-blue-500/10">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                            {category.featured && (
                              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                                Featured
                              </Badge>
                            )}
                            <Badge className={`${
                              category.status === 'active' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                              {category.status}
                            </Badge>
                          </div>
                          <p className="text-blue-400 text-sm">{category.description}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {category.services.length} services
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-blue-500/50">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {category.services.map((service) => (
                        <div key={service.id} className="p-3 bg-black/20 rounded-lg border border-blue-500/10">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <p className="text-white font-medium">{service.name}</p>
                              <p className="text-blue-400 text-sm">{service.price}</p>
                              <p className="text-gray-400 text-xs mt-1 line-clamp-2">{service.description}</p>
                              {service.popularity && (
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="w-full h-1 bg-blue-900 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-green-400 rounded-full" 
                                      style={{ width: `${service.popularity}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-green-400">{service.popularity}%</span>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => setEditingService({...service, categoryId: category.id})}
                              >
                                <PencilIcon className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => deleteService(category.id, service.id)}
                              >
                                <TrashIcon className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          {service.features && (
                            <div className="text-xs text-gray-500 mt-2">
                              <strong>Features:</strong> {service.features.slice(0, 2).join(', ')}
                              {service.features.length > 2 && '...'}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'all-blogs':
        return (
          <div className="space-y-6">
            {/* Enhanced Blog Management */}
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h2 className="text-2xl font-bold mb-6 text-white">
                {editBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="title"
                    placeholder="Blog Title"
                    defaultValue={editBlog?.title}
                    className="bg-blue-900/20 border-blue-500/20"
                    required
                  />
                  <Input
                    name="author"
                    placeholder="Author Name"
                    defaultValue={editBlog?.author}
                    className="bg-blue-900/20 border-blue-500/20"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="image"
                    placeholder="Image URL"
                    defaultValue={editBlog?.image}
                    className="bg-blue-900/20 border-blue-500/20"
                  />
                  <Input
                    name="tags"
                    placeholder="Tags (comma separated)"
                    defaultValue={editBlog?.tags?.join(', ')}
                    className="bg-blue-900/20 border-blue-500/20"
                  />
                </div>
                <Select name="status" defaultValue={editBlog?.status || 'published'}>
                  <SelectTrigger className="bg-blue-900/20 border-blue-500/20">
                    <SelectValue placeholder="Post Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  name="content"
                  placeholder="Blog Content"
                  defaultValue={editBlog?.content}
                  className="min-h-[200px] bg-blue-900/20 border-blue-500/20"
                  required
                />
                <div className="flex justify-end gap-4">
                  {editBlog && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setEditBlog(null)}
                      className="border-blue-500/50 hover:bg-blue-500/10"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editBlog ? 'Update Post' : 'Create Post'}
                  </Button>
                </div>
              </form>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogs.map((blog) => (
                <Card key={blog._id} className="p-4 bg-blue-950/30 border-blue-500/20">
                  <div className="flex gap-4">
                    {blog.image && (
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-white">{blog.title}</h3>
                          <p className="text-sm text-blue-400">By {blog.author}</p>
                          <div className="flex gap-2 mt-2">
                            {blog.tags?.slice(0, 2).map(tag => (
                              <Badge key={tag} className="bg-blue-500/10 text-blue-400 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditBlog(blog)}
                            className="border-blue-500/50 hover:bg-blue-500/10"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              fetch(`/api/blogs/${blog._id}`, { method: 'DELETE' })
                                .then(fetchData);
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Section Under Development</h3>
            <p className="text-gray-400">This section is being enhanced. Select another option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#000510] text-white flex">
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div className="admin-overlay active" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Enhanced Sidebar */}
      <div className={`${
        isMobile 
          ? `admin-sidebar ${mobileMenuOpen ? 'open' : ''}`
          : sidebarOpen ? 'w-80' : 'w-16'
      } bg-blue-950/40 border-r border-blue-500/20 transition-all duration-300 flex flex-col admin-sidebar`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-blue-500/20">
          <div className="flex items-center justify-between">
            {(sidebarOpen || mobileMenuOpen) && (
              <div>
                <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Admin Panel
                </h2>
                <p className="text-xs text-blue-400 mt-1">Enhanced Dashboard v2.0</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMobileMenuToggle}
              className="text-blue-400 hover:bg-blue-500/10"
            >
              {(sidebarOpen || mobileMenuOpen) ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Sidebar Menu */}
        <div className="flex-1 overflow-y-auto p-2">
          {sidebarMenu.map((item) => (
            <div key={item.id} className="mb-2">
              <button
                onClick={() => {
                  if (item.children.length > 0) {
                    toggleCategory(item.id);
                  } else {
                    handleSectionChange(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 sidebar-item ${
                  activeSection === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-400 hover:bg-blue-500/10'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {(sidebarOpen || mobileMenuOpen) && (
                  <>
                    <span className="flex-1 text-left font-medium text-sm md:text-base">{item.title}</span>
                    {item.children.length > 0 && (
                      <div className={`transition-transform duration-200 ${expandedCategories[item.id] ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    )}
                  </>
                )}
              </button>

              {/* Enhanced Submenu */}
              {(sidebarOpen || mobileMenuOpen) && item.children.length > 0 && expandedCategories[item.id] && (
                <div className="ml-4 mt-2 space-y-1 sidebar-submenu">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleSectionChange(child.id)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                        activeSection === child.id ? 'bg-blue-600 text-white' : 'text-blue-400 hover:bg-blue-500/10'
                      }`}
                    >
                      <child.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="flex-1 text-left text-xs md:text-sm">{child.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Sidebar Footer */}
        <div className="p-4 border-t border-blue-500/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full realtime-indicator"></div>
            {(sidebarOpen || mobileMenuOpen) && <span className="text-xs text-green-400">System Online</span>}
          </div>
          <Button 
            variant="outline"
            className="w-full border-red-500/50 hover:bg-red-500/10 text-red-400"
            size={isMobile ? "sm" : "default"}
            onClick={() => {
              localStorage.removeItem('adminAuth');
              navigate('/admin/login');
            }}
          >
            {(sidebarOpen || mobileMenuOpen) ? (
              <span className="text-sm">Logout</span>
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 overflow-y-auto admin-content" style={{ minHeight: '100vh', backgroundColor: '#000510' }}>
        {/* Enhanced Header */}
        <div className="bg-blue-950/30 p-4 md:p-6 border-b border-blue-500/20 sticky top-0 z-10 backdrop-blur-sm admin-header">
          {/* Mobile menu button */}
          {isMobile && (
            <div className="flex items-center justify-between mb-4 sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobileMenuToggle}
                className="text-blue-400 hover:bg-blue-500/10"
              >
                <Menu className="h-5 w-5 mr-2" />
                <span className="text-sm">Menu</span>
              </Button>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="admin-header-info">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {sidebarMenu.find(item => item.id === activeSection)?.title || 
                 sidebarMenu.find(item => item.children.some(child => child.id === activeSection))?.children.find(child => child.id === activeSection)?.title ||
                 'Dashboard'}
              </h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-blue-400 mt-1">
                <div className="flex items-center gap-2">
                  <CircuitBoard className="h-4 w-4" />
                  <p className="text-xs md:text-sm mobile-text-xs">System Status: Online</p>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <p className="text-xs md:text-sm mobile-text-xs">{stats.totalMessages} Active Messages</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 admin-header-actions">
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 realtime-indicator text-xs text-center">
                Real-time Updates
              </Badge>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={fetchData}
                disabled={refreshing}
                className="border-blue-500/50 hover:bg-blue-500/10"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Content Area */}
        <div className="p-4 md:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;