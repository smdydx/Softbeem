
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Tag, ArrowRight, Filter } from "lucide-react";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    }
  };

  const categories = ['All', 'Blockchain', 'Technology', 'Business', 'Legal'];

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || blog.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16"
      >
        {/* Hero Section */}
        <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
            Our Blog
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            Stay updated with our latest insights, news, and expert opinions on blockchain, technology, and business.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div variants={fadeIn("up", "tween", 0.3, 1)} className="mb-8 sm:mb-12">
          {/* Mobile Layout */}
          <div className="block md:hidden space-y-4">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 h-12 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg text-sm hover:bg-zinc-700 transition-colors"
              >
                <Filter className="h-4 w-4" />
                Categories
              </button>
              <span className="text-xs text-muted-foreground">
                {filteredBlogs.length} articles found
              </span>
            </div>

            {/* Category Pills - Mobile */}
            {showFilters && (
              <div className="grid grid-cols-2 gap-2 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category.toLowerCase());
                      setShowFilters(false);
                    }}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.toLowerCase()
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-zinc-800 text-muted-foreground hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-zinc-800 text-muted-foreground hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <motion.div 
            variants={fadeIn("up", "tween", 0.4, 1)}
            className="text-center py-12 sm:py-16"
          >
            <div className="text-4xl sm:text-6xl mb-4">📝</div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Try adjusting your search or category filter
            </p>
          </motion.div>
        )}

        {/* Blog Grid */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              variants={fadeIn("up", "tween", 0.1 * (index % 6), 1)}
            >
              <Card className="overflow-hidden bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 border-zinc-800 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 group h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={blog.image || 'https://via.placeholder.com/400x250'} 
                    alt={blog.title}
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {blog.category || 'Technology'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  {/* Meta Info */}
                  <div className="flex items-center text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap gap-2">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <span className="text-zinc-600">•</span>
                    <div className="flex items-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                      <span className="truncate max-w-20 sm:max-w-none">{blog.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 flex-grow">
                    {blog.title}
                  </h2>

                  {/* Content Preview */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                    {blog.content}
                  </p>

                  {/* Read More Button */}
                  <div className="mt-auto">
                    <button 
                      onClick={() => window.open(`/blog/${blog._id}`, '_blank')}
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1.5 group/btn transition-all duration-300 hover:gap-2"
                    >
                      Read More 
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button - if needed */}
        {filteredBlogs.length > 0 && (
          <motion.div
            variants={fadeIn("up", "tween", 0.5, 1)}
            className="text-center mt-8 sm:mt-12"
          >
            <button className="px-6 sm:px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base">
              Load More Articles
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Blog;
