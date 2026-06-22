import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Eye, Share2, Check, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getBlogPosts, incrementViews, BlogPost } from "@/lib/store";

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    const allPosts = getBlogPosts();
    const foundPost = allPosts.find((p) => p.id === id);
    
    if (foundPost) {
      setPost(foundPost);
      // Increment view count
      incrementViews(id);
    } else {
      setPost(null);
    }
  }, [id]);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Article link copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center text-center p-6 pt-32">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you are looking for does not exist or has been deleted.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-[60] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Navigation & Actions Row */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-mono-accent text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="font-mono-accent border-border/80 text-xs hover:border-primary/50"
          >
            {copied ? <Check size={14} className="mr-2 text-green-500" /> : <Share2 size={14} className="mr-2" />}
            {copied ? "Copied" : "Share Link"}
          </Button>
        </div>

        {/* Article Metadata Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono-accent mb-4">
            <span className="px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar size={12} />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Eye size={12} />
              {post.views} views
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-foreground mb-6">
            {post.title}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed border-l-2 border-primary/50 pl-4 py-1 italic">
            {post.summary}
          </p>
        </header>

        {/* Content & Sidebar Grid */}
        <div className="grid lg:grid-cols-12 gap-12 mt-12">
          
          {/* Main Article Body */}
          <article className="lg:col-span-9">
            <div 
              className="prose prose-invert max-w-none 
                text-muted-foreground leading-relaxed text-base space-y-6
                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:font-sans
                [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-foreground [&>h4]:mt-6 [&>h4]:mb-2
                [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4
                [&>p>strong]:text-foreground [&>p>strong]:font-semibold
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:my-4 [&>ol>li>strong]:text-foreground
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:my-4 [&>ul>li>strong]:text-foreground
                [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:text-muted-foreground
                [&_code]:bg-muted/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-primary [&_code]:text-sm [&_code]:font-mono-accent
                [&_pre]:bg-muted/30 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-border/50 [&_pre]:font-mono-accent [&_pre]:text-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Floating Author Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 h-fit">
            <div className="glass-card p-6 border-border/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Muhammad Abdullah</h4>
                  <p className="text-[10px] text-muted-foreground font-mono-accent">Author / AI Engineer</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Specializing in Agentic LLM systems, scalable ETL data pipelines, and intelligent automation processes.
              </p>
              
              <div className="pt-4 border-t border-border/40 text-xs text-muted-foreground space-y-2">
                <div className="flex items-center justify-between">
                  <span>Reads</span>
                  <span className="font-mono-accent text-foreground">{post.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Category</span>
                  <span className="font-mono-accent text-foreground">{post.category}</span>
                </div>
              </div>
            </div>
          </aside>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default BlogPostDetail;
