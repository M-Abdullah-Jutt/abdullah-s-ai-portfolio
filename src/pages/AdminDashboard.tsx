import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BarChart, BookOpen, Briefcase, Mail, LogOut, Plus, Trash2, 
  Edit2, Eye, ShieldAlert, CheckCircle, ArrowRight, X, Clock 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

import { 
  Project, BlogPost, ContactMessage,
  getProjects, saveProject, deleteProject,
  getBlogPosts, saveBlogPost, deleteBlogPost,
  getContactMessages, markMessageRead, deleteContactMessage,
  isAdminAuthenticated, loginAdmin, logoutAdmin,
  subscribeToDBChanges
} from "@/lib/store";

// Mock analytics data for the chart
const analyticsData = [
  { day: "Mon", views: 120, messages: 0 },
  { day: "Tue", views: 150, messages: 1 },
  { day: "Wed", views: 220, messages: 2 },
  { day: "Thu", views: 190, messages: 1 },
  { day: "Fri", views: 280, messages: 0 },
  { day: "Sat", views: 310, messages: 4 },
  { day: "Sun", views: 250, messages: 1 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // DB States
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Dialog and Form States
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  
  const [blogDialogOpen, setBlogDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost> | null>(null);

  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);

  // Sync state with DB changes
  useEffect(() => {
    const loadData = () => {
      setProjects(getProjects());
      setBlogPosts(getBlogPosts());
      setMessages(getContactMessages());
      setIsAuthenticated(isAdminAuthenticated());
    };

    loadData();
    return subscribeToDBChanges(loadData);
  }, []);

  // --- Auth Handlers ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (success) {
      setIsAuthenticated(true);
      setLoginError("");
      setPasswordInput("");
      toast({ title: "Login Successful", description: "Welcome back, Admin!" });
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    toast({ title: "Logged Out", description: "You have been logged out of the admin panel." });
  };

  // --- Project Handlers ---
  const openNewProjectDialog = () => {
    setCurrentProject({ title: "", description: "", tech: [], github: "" });
    setProjectDialogOpen(true);
  };

  const openEditProjectDialog = (proj: Project) => {
    setCurrentProject({ ...proj });
    setProjectDialogOpen(true);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject?.title || !currentProject?.description) {
      toast({ title: "Validation Error", description: "Title and Description are required.", variant: "destructive" });
      return;
    }
    
    saveProject({
      id: currentProject.id,
      title: currentProject.title,
      description: currentProject.description,
      tech: Array.isArray(currentProject.tech) 
        ? currentProject.tech 
        : (currentProject.tech as string).split(",").map(t => t.trim()).filter(Boolean),
      github: currentProject.github || "https://github.com/M-Abdullah-Jutt"
    });

    toast({ 
      title: currentProject.id ? "Project Updated" : "Project Created", 
      description: `Project "${currentProject.title}" has been saved.` 
    });
    setProjectDialogOpen(false);
    setCurrentProject(null);
  };

  const handleProjectDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete project "${title}"?`)) {
      deleteProject(id);
      toast({ title: "Project Deleted", description: `"${title}" has been removed.` });
    }
  };

  // --- Blog Handlers ---
  const openNewBlogDialog = () => {
    setCurrentBlog({ 
      title: "", 
      slug: "", 
      summary: "", 
      content: "", 
      category: "Agentic AI", 
      tags: [], 
      readTime: "5 min read", 
      status: "draft",
      publishedAt: new Date().toISOString().split("T")[0]
    });
    setBlogDialogOpen(true);
  };

  const openEditBlogDialog = (post: BlogPost) => {
    setCurrentBlog({ ...post });
    setBlogDialogOpen(true);
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBlog?.title || !currentBlog?.content || !currentBlog?.summary) {
      toast({ title: "Validation Error", description: "Title, Summary, and Content are required.", variant: "destructive" });
      return;
    }

    const slug = currentBlog.slug || currentBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    saveBlogPost({
      id: currentBlog.id,
      title: currentBlog.title,
      slug,
      summary: currentBlog.summary,
      content: currentBlog.content,
      category: currentBlog.category || "Agentic AI",
      tags: Array.isArray(currentBlog.tags)
        ? currentBlog.tags
        : (currentBlog.tags as string).split(",").map(t => t.trim()).filter(Boolean),
      readTime: currentBlog.readTime || "5 min read",
      publishedAt: currentBlog.publishedAt || new Date().toISOString().split("T")[0],
      status: currentBlog.status as "published" | "draft"
    });

    toast({ 
      title: currentBlog.id ? "Article Updated" : "Article Created", 
      description: `"${currentBlog.title}" has been saved.` 
    });
    setBlogDialogOpen(false);
    setCurrentBlog(null);
  };

  const handleBlogDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete article "${title}"?`)) {
      deleteBlogPost(id);
      toast({ title: "Article Deleted", description: `"${title}" has been removed.` });
    }
  };

  // --- Message Handlers ---
  const handleViewMessage = (msg: ContactMessage) => {
    setViewingMessage(msg);
    setMessageDialogOpen(true);
    markMessageRead(msg.id);
  };

  const handleMessageDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteContactMessage(id);
      toast({ title: "Message Deleted", description: "Message has been permanently removed." });
    }
  };

  // --- Render Login Page ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border/80 shadow-2xl relative z-10 glow-border">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
              <ShieldAlert size={24} />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Admin Console</CardTitle>
            <CardDescription className="text-muted-foreground">
              Verify credentials to access portfolio settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-mono-accent">Username</label>
                <Input 
                  type="text" 
                  value="admin" 
                  disabled 
                  className="bg-muted/40 text-muted-foreground border-border/50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-mono-accent">Password</label>
                <Input 
                  type="password" 
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="bg-muted/20 border-border/80 focus:border-primary/50"
                  autoFocus
                />
              </div>
              {loginError && <p className="text-xs text-destructive text-center">{loginError}</p>}
              
              <Button type="submit" className="w-full font-mono-accent">
                Sign In
              </Button>
            </form>

            <div className="pt-4 border-t border-border/40 text-center">
              <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
                Go to Website Home
                <ArrowRight size={12} />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Helper Note for User review */}
        <div className="mt-8 text-center text-xs text-muted-foreground max-w-sm border border-dashed border-primary/20 p-3 rounded-lg bg-primary/5 relative z-10">
          <p className="font-semibold text-primary mb-1">🔑 Demo Credentials</p>
          <p>Password: <code className="bg-card px-1.5 py-0.5 rounded text-foreground border border-border">password123</code></p>
        </div>
      </div>
    );
  }

  // --- Render Authenticated Dashboard Workspace ---
  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Admin Nav */}
      <header className="border-b border-border/50 bg-card/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono-accent text-lg font-bold text-gradient">{"<MA_Console />"}</span>
            <Badge variant="outline" className="border-primary/30 text-primary font-mono-accent text-[10px]">
              Admin Session
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm" className="font-mono-accent text-xs">
              <Link to="/" target="_blank">View Live Site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-mono-accent text-xs">
              <LogOut size={14} className="mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-10">
        <Tabs defaultValue="overview" className="space-y-8">
          
          <TabsList className="bg-muted/30 border border-border/50 p-1 flex justify-start flex-wrap h-auto gap-1">
            <TabsTrigger value="overview" className="font-mono-accent text-xs flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <BarChart size={14} /> Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="font-mono-accent text-xs flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Briefcase size={14} /> Projects ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="blog" className="font-mono-accent text-xs flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <BookOpen size={14} /> Blog Articles ({blogPosts.length})
            </TabsTrigger>
            <TabsTrigger value="inbox" className="font-mono-accent text-xs flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary/20 data-[state=active]:text-primary relative">
              <Mail size={14} /> Inbox
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-primary text-[8px] font-bold flex items-center justify-center text-primary-foreground">
                  {unreadMessagesCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* TAB: OVERVIEW STATS & CHARTS */}
          <TabsContent value="overview" className="space-y-8 animate-fade-up">
            {/* Quick Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card/40 border-border/40">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono-accent uppercase tracking-wider">Total Projects</p>
                    <h3 className="text-3xl font-extrabold mt-1">{projects.length}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Briefcase size={20} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/40">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono-accent uppercase tracking-wider">Blog Articles</p>
                    <h3 className="text-3xl font-extrabold mt-1">{blogPosts.length}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <BookOpen size={20} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/40">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono-accent uppercase tracking-wider">Inbox Messages</p>
                    <h3 className="text-3xl font-extrabold mt-1">{messages.length}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Mail size={20} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/40">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono-accent uppercase tracking-wider">Estimated Visits</p>
                    <h3 className="text-3xl font-extrabold mt-1">
                      {blogPosts.reduce((acc, curr) => acc + curr.views, 1500)}
                    </h3>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Eye size={20} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Chart */}
            <Card className="bg-card/40 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Visitor Traffic & Engagement</CardTitle>
                <CardDescription>Mock analytics trend showing page views and inbox messages received over the past week.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.3)" />
                    <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        borderColor: "hsl(var(--border))",
                        borderRadius: "8px" 
                      }} 
                    />
                    <Area type="monotone" dataKey="views" name="Page Views" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: PROJECT CRUD */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Manage Showcase Projects</h3>
                <p className="text-xs text-muted-foreground">Add or modify work projects shown on the homepage.</p>
              </div>
              <Button onClick={openNewProjectDialog} className="font-mono-accent text-xs">
                <Plus size={16} className="mr-1" /> Add Project
              </Button>
            </div>

            <Card className="bg-card/30 border-border/40">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Project Title</TableHead>
                    <TableHead>Tech Stack</TableHead>
                    <TableHead>GitHub URL</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No projects defined. Add a project to show.
                      </TableCell>
                    </TableRow>
                  ) : (
                    projects.map((proj) => (
                      <TableRow key={proj.id} className="hover:bg-muted/20 border-border/30">
                        <TableCell className="font-medium text-foreground">{proj.title}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {proj.tech.map((t) => (
                              <Badge key={t} variant="secondary" className="text-[10px] py-0 px-1.5 font-mono-accent">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono-accent truncate max-w-[200px]">
                          {proj.github}
                        </TableCell>
                        <TableCell className="text-right space-x-1.5">
                          <Button variant="ghost" size="icon" onClick={() => openEditProjectDialog(proj)} className="w-8 h-8 text-muted-foreground hover:text-primary">
                            <Edit2 size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleProjectDelete(proj.id, proj.title)} className="w-8 h-8 text-muted-foreground hover:text-destructive">
                            <Trash2 size={14} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* TAB: BLOG CRUD */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Manage Blog Articles</h3>
                <p className="text-xs text-muted-foreground">Write technical posts or save drafts.</p>
              </div>
              <Button onClick={openNewBlogDialog} className="font-mono-accent text-xs">
                <Plus size={16} className="mr-1" /> New Article
              </Button>
            </div>

            <Card className="bg-card/30 border-border/40">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Article Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Publish Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No articles created yet. Write a new post!
                      </TableCell>
                    </TableRow>
                  ) : (
                    blogPosts.map((post) => (
                      <TableRow key={post.id} className="hover:bg-muted/20 border-border/30">
                        <TableCell className="font-medium text-foreground">{post.title}</TableCell>
                        <TableCell className="text-xs font-mono-accent">{post.category}</TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono-accent">{post.publishedAt}</TableCell>
                        <TableCell>
                          <Badge variant={post.status === "published" ? "default" : "outline"} className={`text-[10px] ${post.status === "published" ? "bg-green-600/20 text-green-500 hover:bg-green-600/30 border-green-600/30" : ""}`}>
                            {post.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-mono-accent text-muted-foreground">{post.views}</TableCell>
                        <TableCell className="text-right space-x-1.5">
                          <Button variant="ghost" size="icon" asChild className="w-8 h-8 text-muted-foreground hover:text-foreground">
                            <Link to={`/blog/${post.id}`} target="_blank">
                              <Eye size={14} />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openEditBlogDialog(post)} className="w-8 h-8 text-muted-foreground hover:text-primary">
                            <Edit2 size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleBlogDelete(post.id, post.title)} className="w-8 h-8 text-muted-foreground hover:text-destructive">
                            <Trash2 size={14} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* TAB: INBOX MESSAGES */}
          <TabsContent value="inbox" className="space-y-6">
            <div>
              <h3 className="text-xl font-bold">Contact Inbox</h3>
              <p className="text-xs text-muted-foreground">View and read messages sent through the homepage contact form.</p>
            </div>

            <Card className="bg-card/30 border-border/40">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Date</TableHead>
                    <TableHead>Sender Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Snippet</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Your inbox is currently empty.
                      </TableCell>
                    </TableRow>
                  ) : (
                    messages.map((msg) => (
                      <TableRow key={msg.id} className={`hover:bg-muted/20 border-border/30 ${!msg.read ? "bg-primary/5 hover:bg-primary/10" : ""}`}>
                        <TableCell className="text-xs font-mono-accent text-muted-foreground whitespace-nowrap">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className={`font-medium ${!msg.read ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                          {msg.name}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono-accent">{msg.email}</TableCell>
                        <TableCell className="text-xs text-muted-foreground truncate max-w-[200px]">{msg.message}</TableCell>
                        <TableCell>
                          <Badge variant={msg.read ? "outline" : "default"} className={`text-[10px] ${!msg.read ? "bg-primary/20 text-primary border-primary/30" : ""}`}>
                            {msg.read ? "READ" : "UNREAD"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-1.5">
                          <Button variant="ghost" size="icon" onClick={() => handleViewMessage(msg)} className="w-8 h-8 text-muted-foreground hover:text-primary">
                            <Eye size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleMessageDelete(msg.id)} className="w-8 h-8 text-muted-foreground hover:text-destructive">
                            <Trash2 size={14} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

        </Tabs>
      </main>

      {/* --- DIALOGS & SHEET MODALS --- */}

      {/* DIALOG: Project Editor Form */}
      <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent className="bg-card border-border shadow-2xl max-w-lg">
          <DialogHeader>
            <DialogTitle>{currentProject?.id ? "Edit Showcase Project" : "Add Showcase Project"}</DialogTitle>
            <DialogDescription>Fill out the metadata of the project you want to feature on the homepage.</DialogDescription>
          </DialogHeader>
          {currentProject && (
            <form onSubmit={handleProjectSubmit} className="space-y-4 py-2">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-mono-accent">Project Title</label>
                <Input 
                  value={currentProject.title || ""} 
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })} 
                  className="bg-muted/10 border-border/80 text-sm focus:border-primary/50"
                  placeholder="e.g. LLM Multi-Agent Sandbox"
                  maxLength={100}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-mono-accent">Tech Stack (comma separated)</label>
                  <Input 
                    value={Array.isArray(currentProject.tech) ? currentProject.tech.join(", ") : currentProject.tech || ""} 
                    onChange={(e) => setCurrentProject({ ...currentProject, tech: e.target.value })} 
                    className="bg-muted/10 border-border/80 text-sm focus:border-primary/50"
                    placeholder="e.g. Python, LangChain, React"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-mono-accent">GitHub Repo URL</label>
                  <Input 
                    value={currentProject.github || ""} 
                    onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })} 
                    className="bg-muted/10 border-border/80 text-sm focus:border-primary/50"
                    placeholder="https://github.com/..."
                    maxLength={255}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-mono-accent">Description</label>
                <Textarea 
                  value={currentProject.description || ""} 
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })} 
                  className="bg-muted/10 border-border/80 text-sm focus:border-primary/50 min-h-[100px]"
                  placeholder="Summarize key features, architectures, and tech tools..."
                  maxLength={500}
                />
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => setProjectDialogOpen(false)} className="text-xs font-mono-accent">
                  Cancel
                </Button>
                <Button type="submit" className="text-xs font-mono-accent">
                  Save Project
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* DIALOG: Blog Article Editor Form */}
      <Dialog open={blogDialogOpen} onOpenChange={setBlogDialogOpen}>
        <DialogContent className="bg-card border-border shadow-2xl max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentBlog?.id ? "Edit Blog Article" : "Write Blog Article"}</DialogTitle>
            <DialogDescription>Write or modify a technical article. Use standard HTML tags inside content for styling.</DialogDescription>
          </DialogHeader>
          {currentBlog && (
            <form onSubmit={handleBlogSubmit} className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-mono-accent">Article Title</label>
                  <Input 
                    value={currentBlog.title || ""} 
                    onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })} 
                    className="bg-muted/10 border-border/80 text-sm focus:border-primary/50"
                    placeholder="e.g. Mastering Multi-Agent Workflows"
                    maxLength={150}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-mono-accent">Slug URL Identifier (optional)</label>
                  <Input 
                    value={currentBlog.slug || ""} 
                    onChange={(e) => setCurrentBlog({ ...currentBlog, slug: e.target.value })} 
                    className="bg-muted/10 border-border/80 text-sm focus:border-primary/50"
                    placeholder="e.g. mastering-multi-agent-workflows"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-mono-accent">Category</label>
                  <select 
                    value={currentBlog.category || "Agentic AI"} 
                    onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-border/80 bg-muted/10 text-foreground px-3 py-2 text-sm focus:outline-none focus:border-primary/50 font-sans"
                  >
                    <option value="Agentic AI">Agentic AI</option>
                    <option value="Data Engineering">Data Engineering</option>
                    <option value="RAG Systems">RAG Systems</option>
                    <option value="Automation">Automation</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-mono-accent">Read Time</label>
                  <Input 
                    value={currentBlog.readTime || ""} 
                    onChange={(e) => setCurrentBlog({ ...currentBlog, readTime: e.target.value })} 
                    className="bg-muted/10 border-border/80 text-sm focus:border-primary/50"
                    placeholder="e.g. 5 min read"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-mono-accent">Status</label>
                  <select 
                    value={currentBlog.status || "draft"} 
                    onChange={(e) => setCurrentBlog({ ...currentBlog, status: e.target.value as "published" | "draft" })}
                    className="flex h-10 w-full rounded-md border border-border/80 bg-muted/10 text-foreground px-3 py-2 text-sm focus:outline-none focus:border-primary/50 font-sans"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-mono-accent">Tags (comma separated)</label>
                <Input 
                  value={Array.isArray(currentBlog.tags) ? currentBlog.tags.join(", ") : currentBlog.tags || ""} 
                  onChange={(e) => setCurrentBlog({ ...currentBlog, tags: e.target.value })} 
                  className="bg-muted/10 border-border/80 text-sm focus:border-primary/50"
                  placeholder="e.g. ReAct, Agents, LangChain"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-mono-accent">Summary / Excerpt</label>
                <Textarea 
                  value={currentBlog.summary || ""} 
                  onChange={(e) => setCurrentBlog({ ...currentBlog, summary: e.target.value })} 
                  className="bg-muted/10 border-border/80 text-sm focus:border-primary/50 min-h-[60px]"
                  placeholder="A short snippet shown in the blog grid..."
                  maxLength={300}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-mono-accent">Article Body (Supports HTML tags for formatting)</label>
                <Textarea 
                  value={currentBlog.content || ""} 
                  onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })} 
                  className="bg-muted/10 border-border/80 font-mono text-xs focus:border-primary/50 min-h-[220px] leading-relaxed"
                  placeholder="<h3>My Header</h3><p>Content goes here...</p>"
                />
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => setBlogDialogOpen(false)} className="text-xs font-mono-accent">
                  Cancel
                </Button>
                <Button type="submit" className="text-xs font-mono-accent">
                  Save Article
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* DIALOG: Contact Message Viewer */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="bg-card border-border shadow-2xl max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2 text-xs text-primary font-mono-accent">
              <Mail size={12} />
              <span>Message Log Detail</span>
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              {viewingMessage?.name}
            </DialogTitle>
            <DialogDescription className="text-xs font-mono-accent text-muted-foreground">
              Sent: {viewingMessage && new Date(viewingMessage.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          
          {viewingMessage && (
            <div className="space-y-4 py-2">
              <div className="p-3.5 rounded-lg bg-muted/40 border border-border/60">
                <p className="text-[10px] text-muted-foreground font-mono-accent mb-1">Reply Email</p>
                <a href={`mailto:${viewingMessage.email}`} className="text-sm text-primary hover:underline font-mono-accent">
                  {viewingMessage.email}
                </a>
              </div>

              <div>
                <p className="text-[10px] text-muted-foreground font-mono-accent mb-1">Message Content</p>
                <div className="p-4 rounded-lg bg-muted/20 border border-border/30 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {viewingMessage.message}
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" onClick={() => setMessageDialogOpen(false)} className="text-xs font-mono-accent w-full">
                  Close Log
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminDashboard;
