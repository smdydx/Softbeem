
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
  Smartphone
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [contacts, setContacts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBlog, setEditBlog] = useState(null);

  // Site content management with real-time updates
  const { settings, updateSettings, updateTheme, loading: settingsLoading } = useSiteSettings();
  
  const [themeSettings, setThemeSettings] = useState({
    themeColor: '#00FF00',
    fontFamily: 'Inter',
    logoUrl: '/images/ramaera-logo.jpg',
    companyName: 'Ramaera Industries'
  });

  const [headerContent, setHeaderContent] = useState({
    logo: '/images/ramaera-logo.jpg',
    title: 'Ramaera Industries'
  });

  const [heroContent, setHeroContent] = useState({
    title: 'Leading Technology Solutions',
    subtitle: 'Empowering businesses with cutting-edge blockchain and IT solutions',
    backgroundVideo: '/video/hero-backvideo.mp4'
  });
  
  const [serviceCategories, setServiceCategories] = useState([
    {
      id: 'blockchain',
      name: 'Blockchain Services',
      description: 'Complete blockchain development solutions',
      icon: 'Code',
      services: [
        { 
          id: 'smart-contracts', 
          name: 'Smart Contract Development', 
          price: '₹50,000',
          description: 'Custom smart contract development with security audit',
          features: ['Security Audit', 'Gas Optimization', 'Testing Suite'],
          image: '/images/smartcontract.jpg',
          path: '/services/blockchain/smart-contracts'
        },
        { 
          id: 'token-dev', 
          name: 'Token Development', 
          price: '₹75,000',
          description: 'ERC-20, ERC-721, and custom token development',
          features: ['Multi-chain Support', 'Custom Features', 'Audit Included'],
          image: '/images/tokenpic.jpg',
          path: '/services/blockchain/token'
        },
        { 
          id: 'nft-marketplace', 
          name: 'NFT Marketplace', 
          price: '₹1,50,000',
          description: 'Complete NFT marketplace with trading features',
          features: ['Minting', 'Trading', 'Royalties', 'Wallet Integration'],
          image: '/images/cryptopic.jpg',
          path: '/services/blockchain/nft'
        }
      ]
    },
    {
      id: 'it-services',
      name: 'IT Services',
      description: 'Comprehensive IT solutions for modern businesses',
      icon: 'Smartphone',
      services: [
        { 
          id: 'web-dev', 
          name: 'Web Development', 
          price: '₹25,000',
          description: 'Modern responsive websites with latest technologies',
          features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
          image: '/images/services/website-builder.jpg',
          path: '/services/it/web-dev'
        },
        { 
          id: 'app-dev', 
          name: 'App Development', 
          price: '₹60,000',
          description: 'Native and cross-platform mobile applications',
          features: ['iOS & Android', 'Cross-platform', 'App Store Deploy'],
          image: '/images/devimage.jpg',
          path: '/services/it/app-dev'
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
    path: ''
  });

  const [editingService, setEditingService] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: 'Code'
  });

  // Sidebar menu structure
  const sidebarMenu = [
    {
      id: 'overview',
      title: 'Dashboard Overview',
      icon: Home,
      children: []
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
        { id: 'pages', title: 'Page Content', icon: BookOpen }
      ]
    },
    {
      id: 'media',
      title: 'Media Library',
      icon: Image,
      children: [
        { id: 'images', title: 'Images', icon: Image },
        { id: 'videos', title: 'Videos', icon: Eye }
      ]
    },
    {
      id: 'blogs',
      title: 'Blog Management',
      icon: BookOpen,
      children: []
    },
    {
      id: 'services',
      title: 'Services Management',
      icon: Settings,
      children: [
        { id: 'service-categories', title: 'Service Categories', icon: CircuitBoard },
        { id: 'service-items', title: 'Individual Services', icon: Database },
        { id: 'service-content', title: 'Service Content', icon: Shield }
      ]
    },
    {
      id: 'jobs',
      title: 'Career Management',
      icon: Briefcase,
      children: []
    },
    {
      id: 'schedule',
      title: 'Meetings',
      icon: Calendar,
      children: []
    },
    {
      id: 'messages',
      title: 'Messages',
      icon: MessageSquare,
      children: []
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: BarChart3,
      children: []
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
        await Promise.all([fetchData(), fetchJobs()]);
        setLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Service Management Functions
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
      services: []
    };

    setServiceCategories([...serviceCategories, newCat]);
    setNewCategory({ name: '', description: '', icon: 'Code' });
    
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
      path: newService.path
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
      path: ''
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
      content: formData.get('content')
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
      requirements: formData.get('requirements').split('\n').filter(r => r.trim())
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
        fetchData();
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
    activeUsers: meetings.length
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Eye, label: 'Total Views', value: stats.totalViews, color: 'from-blue-400 to-blue-600' },
                { icon: FileText, label: 'Total Blogs', value: stats.totalBlogs, color: 'from-emerald-400 to-emerald-600' },
                { icon: MessageSquare, label: 'Messages', value: stats.totalMessages, color: 'from-purple-400 to-purple-600' },
                { icon: Users, label: 'Active Meetings', value: stats.activeUsers, color: 'from-amber-400 to-amber-600' }
              ].map(({ icon: Icon, label, value, color }) => (
                <Card key={label} className="p-6 bg-blue-950/30 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-400">{label}</p>
                      <h3 className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mt-2`}>
                        {value}
                      </h3>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h2 className="text-2xl font-bold mb-6 text-white">Theme Settings</h2>
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
              </div>
              
              <Button 
                onClick={() => updateTheme(themeSettings)} 
                className="mt-6 bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Apply Theme Changes
              </Button>
            </Card>
          </div>
        );

      case 'service-categories':
        return (
          <div className="space-y-6">
            {/* Add New Category */}
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Add New Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div className="flex gap-2">
                  <Select value={newCategory.icon} onValueChange={(value) => setNewCategory({...newCategory, icon: value})}>
                    <SelectTrigger className="bg-blue-900/20 border-blue-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Code">Code</SelectItem>
                      <SelectItem value="Smartphone">Smartphone</SelectItem>
                      <SelectItem value="Shield">Shield</SelectItem>
                      <SelectItem value="Globe">Globe</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addNewCategory} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Existing Categories */}
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Service Categories Management</h2>
              </div>
              
              <div className="space-y-4">
                {serviceCategories.map((category, index) => (
                  <Card key={category.id} className="p-4 bg-blue-900/20 border-blue-500/10">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                        <p className="text-blue-400 text-sm">{category.description}</p>
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
                              <p className="text-gray-400 text-xs mt-1">{service.description}</p>
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
                            <div className="text-xs text-gray-500">
                              Features: {service.features.join(', ')}
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

      case 'service-items':
        return (
          <div className="space-y-6">
            {/* Add New Service */}
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select 
                    value={editingService?.categoryId || newService.categoryId} 
                    onValueChange={(value) => editingService ? 
                      setEditingService({...editingService, categoryId: value}) : 
                      setNewService({...newService, categoryId: value})
                    }
                  >
                    <SelectTrigger className="bg-blue-900/20 border-blue-500/20">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input
                    placeholder="Service Name"
                    value={editingService?.name || newService.name}
                    onChange={(e) => editingService ? 
                      setEditingService({...editingService, name: e.target.value}) : 
                      setNewService({...newService, name: e.target.value})
                    }
                    className="bg-blue-900/20 border-blue-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Price (e.g., ₹50,000)"
                    value={editingService?.price || newService.price}
                    onChange={(e) => editingService ? 
                      setEditingService({...editingService, price: e.target.value}) : 
                      setNewService({...newService, price: e.target.value})
                    }
                    className="bg-blue-900/20 border-blue-500/20"
                  />
                  
                  <Input
                    placeholder="Path (e.g., /services/blockchain/smart-contracts)"
                    value={editingService?.path || newService.path}
                    onChange={(e) => editingService ? 
                      setEditingService({...editingService, path: e.target.value}) : 
                      setNewService({...newService, path: e.target.value})
                    }
                    className="bg-blue-900/20 border-blue-500/20"
                  />
                </div>

                <Textarea
                  placeholder="Service Description"
                  value={editingService?.description || newService.description}
                  onChange={(e) => editingService ? 
                    setEditingService({...editingService, description: e.target.value}) : 
                    setNewService({...newService, description: e.target.value})
                  }
                  className="bg-blue-900/20 border-blue-500/20"
                />

                <Input
                  placeholder="Image URL"
                  value={editingService?.image || newService.image}
                  onChange={(e) => editingService ? 
                    setEditingService({...editingService, image: e.target.value}) : 
                    setNewService({...newService, image: e.target.value})
                  }
                  className="bg-blue-900/20 border-blue-500/20"
                />

                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-2">Features</label>
                  {(editingService?.features || newService.features).map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        placeholder="Feature"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...(editingService?.features || newService.features)];
                          newFeatures[index] = e.target.value;
                          if (editingService) {
                            setEditingService({...editingService, features: newFeatures});
                          } else {
                            setNewService({...newService, features: newFeatures});
                          }
                        }}
                        className="flex-1 bg-blue-900/20 border-blue-500/20"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newFeatures = (editingService?.features || newService.features).filter((_, i) => i !== index);
                          if (editingService) {
                            setEditingService({...editingService, features: newFeatures});
                          } else {
                            setNewService({...newService, features: newFeatures});
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newFeatures = [...(editingService?.features || newService.features), ''];
                      if (editingService) {
                        setEditingService({...editingService, features: newFeatures});
                      } else {
                        setNewService({...newService, features: newFeatures});
                      }
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>

                <div className="flex gap-4">
                  {editingService ? (
                    <>
                      <Button 
                        onClick={() => {
                          const { categoryId, ...serviceData } = editingService;
                          updateService(categoryId, editingService.id, serviceData);
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Update Service
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setEditingService(null)}
                        className="border-blue-500/50"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={addNewService} className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Services List */}
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">All Services</h3>
              <div className="space-y-4">
                {serviceCategories.map(category => (
                  <div key={category.id}>
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">{category.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.services.map(service => (
                        <Card key={service.id} className="p-4 bg-blue-900/20 border-blue-500/10">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-medium text-white">{service.name}</h5>
                              <p className="text-blue-400 text-sm">{service.price}</p>
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
                          {service.image && (
                            <img src={service.image} alt={service.name} className="w-full h-20 object-cover rounded mb-2" />
                          )}
                          <p className="text-gray-400 text-xs">{service.description}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'header':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h2 className="text-2xl font-bold mb-6 text-white">Header Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-2">Logo URL</label>
                  <Input
                    value={headerContent.logo}
                    onChange={(e) => setHeaderContent({...headerContent, logo: e.target.value})}
                    className="bg-blue-900/20 border-blue-500/20"
                    placeholder="Logo image URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-2">Company Title</label>
                  <Input
                    value={headerContent.title}
                    onChange={(e) => setHeaderContent({...headerContent, title: e.target.value})}
                    className="bg-blue-900/20 border-blue-500/20"
                    placeholder="Company name"
                  />
                </div>
                <Button onClick={saveHeaderContent} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Header Settings
                </Button>
              </div>
            </Card>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h2 className="text-2xl font-bold mb-6 text-white">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-2">Hero Title</label>
                  <Input
                    value={heroContent.title}
                    onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                    className="bg-blue-900/20 border-blue-500/20"
                    placeholder="Main hero title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-2">Hero Subtitle</label>
                  <Textarea
                    value={heroContent.subtitle}
                    onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                    className="bg-blue-900/20 border-blue-500/20"
                    placeholder="Hero subtitle/description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-2">Background Video URL</label>
                  <Input
                    value={heroContent.backgroundVideo}
                    onChange={(e) => setHeroContent({...heroContent, backgroundVideo: e.target.value})}
                    className="bg-blue-900/20 border-blue-500/20"
                    placeholder="Background video URL"
                  />
                </div>
                <Button onClick={saveHeroContent} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Hero Settings
                </Button>
              </div>
            </Card>
          </div>
        );

      case 'blogs':
        return (
          <div className="space-y-6">
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
                <Input
                  name="image"
                  placeholder="Image URL"
                  defaultValue={editBlog?.image}
                  className="bg-blue-900/20 border-blue-500/20"
                />
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

      case 'jobs':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-blue-950/30 border-blue-500/20">
              <h2 className="text-2xl font-bold mb-6 text-white">Post New Job</h2>
              <form onSubmit={handleJobSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="title"
                    placeholder="Job Title"
                    className="bg-blue-900/20 border-blue-500/20"
                    required
                  />
                  <Input
                    name="department"
                    placeholder="Department"
                    className="bg-blue-900/20 border-blue-500/20"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="location"
                    placeholder="Location"
                    className="bg-blue-900/20 border-blue-500/20"
                    required
                  />
                  <Input
                    name="type"
                    placeholder="Job Type"
                    className="bg-blue-900/20 border-blue-500/20"
                    required
                  />
                </div>
                <Textarea
                  name="description"
                  placeholder="Job Description"
                  className="min-h-[100px] bg-blue-900/20 border-blue-500/20"
                  required
                />
                <Textarea
                  name="requirements"
                  placeholder="Requirements (One per line)"
                  className="min-h-[100px] bg-blue-900/20 border-blue-500/20"
                  required
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Post Job
                </Button>
              </form>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <Card key={job._id} className="p-4 bg-blue-950/30 border-blue-500/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-white">{job.title}</h3>
                      <p className="text-sm text-blue-400">{job.department}</p>
                      <p className="text-sm text-gray-400">{job.location} • {job.type}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        fetch(`/api/careers/jobs/${job._id}`, { method: 'DELETE' })
                          .then(fetchJobs);
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <Card key={meeting._id} className="p-6 bg-blue-950/30 border-blue-500/20">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{meeting.name}</h3>
                    <p className="text-blue-400">{meeting.email}</p>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(meeting.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mt-3">{meeting.purpose}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <Badge className={`px-4 py-1.5 ${
                      meeting.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                      meeting.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                      'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                    </Badge>
                    {meeting.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleMeetingStatus(meeting._id, 'approved')}
                          className="bg-emerald-600 hover:bg-emerald-700"
                          size="sm"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleMeetingStatus(meeting._id, 'rejected')}
                          variant="destructive"
                          size="sm"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'messages':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <Card key={contact._id} className="p-6 bg-blue-950/30 border-blue-500/20">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-white">{contact.name}</h3>
                      <p className="text-sm text-blue-400">{contact.email}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 bg-blue-900/20 p-4 rounded-lg">{contact.message}</p>
                </div>
              </Card>
            ))}
          </div>
        );

      default:
        return <div className="text-white">Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#000510] text-white flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-blue-950/40 border-r border-blue-500/20 transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-blue-500/20">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Admin Panel
              </h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-blue-400 hover:bg-blue-500/10"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 overflow-y-auto p-2">
          {sidebarMenu.map((item) => (
            <div key={item.id} className="mb-2">
              <button
                onClick={() => {
                  if (item.children.length > 0) {
                    toggleCategory(item.id);
                  } else {
                    setActiveSection(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id ? 'bg-blue-600 text-white' : 'text-blue-400 hover:bg-blue-500/10'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.children.length > 0 && (
                      expandedCategories[item.id] ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                    )}
                  </>
                )}
              </button>
              
              {/* Submenu */}
              {sidebarOpen && item.children.length > 0 && expandedCategories[item.id] && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setActiveSection(child.id)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                        activeSection === child.id ? 'bg-blue-600 text-white' : 'text-blue-400 hover:bg-blue-500/10'
                      }`}
                    >
                      <child.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="flex-1 text-left text-sm">{child.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-blue-500/20">
          <Button 
            variant="outline"
            className="w-full border-blue-500/50 hover:bg-blue-500/10"
            onClick={() => {
              localStorage.removeItem('adminAuth');
              navigate('/admin/login');
            }}
          >
            {sidebarOpen ? 'Logout' : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-950/30 p-6 border-b border-blue-500/20 sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {sidebarMenu.find(item => item.id === activeSection)?.title || 
                 sidebarMenu.find(item => item.children.some(child => child.id === activeSection))?.children.find(child => child.id === activeSection)?.title ||
                 'Dashboard'}
              </h1>
              <div className="flex items-center gap-2 text-blue-400 mt-1">
                <CircuitBoard className="h-4 w-4" />
                <p className="text-sm">System Status: Online</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                Real-time Updates
              </Badge>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
