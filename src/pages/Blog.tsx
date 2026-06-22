import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, Eye, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { getBlogPosts, subscribeToDBChanges, BlogPost } from "@/lib/store";

const categories = ["All", "Agentic AI", "Data Engineering", "RAG Systems", "Automation"];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Only display published posts to visitors
    const loadPosts = () => {
      const allPosts = getBlogPosts();
      setPosts(allPosts.filter((p) => p.status === "published"));
    };

    loadPosts();
    return subscribeToDBChanges(loadPosts);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Blog Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-glow-pulse" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono-accent mb-6 animate-fade-up">
            <BookOpen size={12} />
            <span>AI & Engineering Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight animate-fade-up-delay-1">
            Technical <span className="text-gradient">Insights</span> & Research
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up-delay-2">
            Articles on Agentic AI, Large Language Models (LLMs), serverless data pipelines, and smart process automation.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative animate-fade-up-delay-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search articles by title, tags, summary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 bg-muted/20 border-border/80 focus:border-primary/50 text-foreground w-full rounded-xl py-6"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-6 py-4 border-y border-border/40 bg-card/20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-accent border transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-primary/25 border-primary text-primary font-medium"
                  : "bg-muted/30 border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-card/10 border border-border/40 rounded-2xl glass-card">
            <p className="text-muted-foreground text-lg mb-2">No articles found</p>
            <p className="text-sm text-muted-foreground/60">Try searching for different terms or reset the filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredPosts.map((post, i) => (
              <article
                key={post.id}
                className={`glass-card p-6 glow-border glow-border-hover transition-all duration-300 group flex flex-col h-full ${
                  i === 0 && selectedCategory === "All" && searchQuery === "" ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono-accent">
                  <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
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
                  <span className="flex items-center gap-1 text-muted-foreground ml-auto">
                    <Eye size={12} />
                    {post.views}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-muted/40 text-muted-foreground border border-border/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-xs font-mono-accent text-primary group-hover:text-secondary hover:underline flex items-center gap-1"
                  >
                    Read Full Article
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
