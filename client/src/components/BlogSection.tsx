import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { blogData } from "@/data/blog";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const [apiBlogs, setApiBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setApiBlogs(Array.isArray(data) ? data.slice(0, 3) : []); // Only show latest 3 blogs
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setApiBlogs([]);
      setLoading(false);
    }
  };

  // Combine API blogs with static blog data, prioritizing API blogs
  const displayBlogs = apiBlogs.length > 0 ? apiBlogs : blogData.slice(0, 3);

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="inline-block mb-4">
            <span className="text-primary font-medium text-sm uppercase tracking-wider relative before:content-[''] before:absolute before:w-8 before:h-[2px] before:bg-primary before:left-full before:top-1/2 before:ml-2 after:content-[''] after:absolute after:w-8 after:h-[2px] after:bg-primary after:right-full after:top-1/2 after:mr-2">
              Our Blog
            </span>
          </motion.div>
          <motion.h2
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Latest Insights & Updates
          </motion.h2>
          <motion.p variants={fadeIn("up", "tween", 0.3, 1)} className="text-muted-foreground">
            Stay updated with the latest trends in technology and legal developments through our blog.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayBlogs.map((post, index) => (
            <BlogCard
              key={post._id || post.id || index}
              post={post}
              delay={0.1 * index}
            />
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn("up", "tween", 0.5, 1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/blog">
            <Button
              variant="transparent"
              size="lg"
              className="flex items-center gap-2"
            >
              View All Posts <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

interface BlogCardProps {
  post: {
    _id?: string;
    id?: number;
    title: string;
    description?: string;
    content?: string;
    date?: string;
    createdAt?: string;
    author: string;
    category?: string;
    categoryColor?: string;
    image?: string;
  };
  delay: number;
}

const BlogCard = ({ post, delay }: BlogCardProps) => {
  // Handle both API blogs and static blogs
  const displayDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : post.date;
  
  const displayDescription = post.content 
    ? post.content.substring(0, 150) + '...'
    : post.description;

  const displayCategory = post.category || 'Technology';
  const displayImage = post.image || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

  return (
    <motion.article
      variants={fadeIn("up", "tween", delay, 0.5)}
      className="bg-zinc-900 rounded-lg overflow-hidden group border border-orange-500/10 shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={displayImage}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span 
            className="bg-primary/90 text-white text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {displayCategory}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{displayDate}</span>
          <span className="mx-2">•</span>
          <User className="h-4 w-4 mr-2" />
          <span>{post.author}</span>
        </div>
        <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
          <Link to="/blog">{post.title}</Link>
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {displayDescription}
        </p>
        <button 
          onClick={() => window.open(`/blog/${post._id || post.id}`, '_blank')}
          className="p-0 flex items-center gap-1 text-primary hover:text-primary/80 transition-colors duration-300 bg-transparent border-none cursor-pointer font-medium text-sm"
        >
          Read More <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
};

export default BlogSection;
