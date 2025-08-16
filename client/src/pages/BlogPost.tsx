
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${id}`);
      const data = await res.json();
      setBlog(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 md:px-6 py-16"
      >
        {/* Back Button */}
        <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="mb-8">
          <Link to="/blog">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Blog Content */}
        <motion.article variants={fadeIn("up", "tween", 0.2, 1)} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span className="mx-2">•</span>
              <User className="h-4 w-4 mr-2" />
              <span>{blog.author}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
            
            {blog.category && (
              <span className="bg-primary/90 text-white text-sm font-medium px-3 py-1 rounded-full">
                {blog.category}
              </span>
            )}
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-8">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-lg leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          {/* Share Button */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Button 
              onClick={() => navigator.share && navigator.share({
                title: blog.title,
                url: window.location.href
              })}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share this post
            </Button>
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
};

export default BlogPost;
