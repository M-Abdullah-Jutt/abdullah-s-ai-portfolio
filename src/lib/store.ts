export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  status: "published" | "draft";
  views: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const STORAGE_KEYS = {
  PROJECTS: "portfolio_projects",
  BLOG_POSTS: "portfolio_blog_posts",
  MESSAGES: "portfolio_messages",
  AUTH: "portfolio_admin_auth",
};

// Custom event to trigger updates across tabs and components
const DB_CHANGE_EVENT = "portfolio-db-change";

const notifyChange = () => {
  window.dispatchEvent(new Event(DB_CHANGE_EVENT));
};

export const subscribeToDBChanges = (callback: () => void) => {
  window.addEventListener(DB_CHANGE_EVENT, callback);
  return () => window.removeEventListener(DB_CHANGE_EVENT, callback);
};

// Initial Seed Data
const initialProjects: Project[] = [
  {
    id: "p1",
    title: "Agentic AI Interviewer",
    description: "Real-time AI-powered mock interviewer with voice interaction, live avatar rendering using LiveKit, LangChain, and WebRTC. Conducts dynamic interviews with follow-up questions.",
    tech: ["LangChain", "LiveKit", "WebRTC", "FastAPI", "Python"],
    github: "https://github.com/M-Abdullah-Jutt",
  },
  {
    id: "p2",
    title: "Forex Data Pipeline",
    description: "Automated serverless ETL pipeline on AWS. Ingests live forex data using Lambda & EventBridge, stores in S3, transforms and loads into Redshift for analytics.",
    tech: ["AWS Lambda", "EventBridge", "S3", "Redshift", "Python"],
    github: "https://github.com/M-Abdullah-Jutt",
  },
  {
    id: "p3",
    title: "Travel Planner Agent",
    description: "Multi-agent travel planning system built with Google ADK. Coordinates flight search, hotel booking, and itinerary generation agents for end-to-end trip planning.",
    tech: ["Google ADK", "Multi-Agent", "Python", "LLM APIs"],
    github: "https://github.com/M-Abdullah-Jutt",
  },
  {
    id: "p4",
    title: "Pakistan Constitution AI Assistant",
    description: "RAG-based chatbot that answers legal questions from Pakistan's Constitution. Uses vector embeddings, semantic search, and GPT-4o-mini for accurate responses.",
    tech: ["RAG", "GPT-4o-mini", "Vector DB", "LangChain", "Streamlit"],
    github: "https://github.com/M-Abdullah-Jutt",
  },
  {
    id: "p5",
    title: "LinkedIn Post Automation",
    description: "Agentic workflow that automates LinkedIn content creation. Reduced manual effort by 80% through intelligent content generation and scheduling pipelines.",
    tech: ["n8n", "LLM APIs", "Automation", "Python"],
    github: "https://github.com/M-Abdullah-Jutt",
  },
  {
    id: "p6",
    title: "Student Performance Prediction",
    description: "An end-to-end Machine Learning pipeline designed to predict student academic performance based on demographic and educational factors, enabling early interventions.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Flask", "Machine Learning"],
    github: "https://github.com/M-Abdullah-Jutt/Student-Performance-Prediction",
  },
];

const initialBlogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Rise of Agentic AI: Beyond Simple Prompts",
    slug: "rise-of-agentic-ai",
    summary: "An in-depth look at how autonomous agents are transforming the AI landscape using reasoning loops, tool integration, and planning frameworks.",
    category: "Agentic AI",
    tags: ["Agentic AI", "AI Agents", "LangChain", "ReAct"],
    readTime: "5 min read",
    publishedAt: "2026-06-15",
    status: "published",
    views: 154,
    content: `
      <h3>Introduction to Agentic Workflows</h3>
      <p>For the past few years, the standard way of interacting with Large Language Models (LLMs) has been zero-shot prompting: sending a text prompt and expecting a single final answer. While powerful, this approach struggles with complex, multi-step reasoning, error correction, and long-term planning.</p>
      
      <p>Enter <strong>Agentic AI</strong>. Rather than running the LLM in a single straight pass, agentic systems wrap the LLM in loops of reasoning, planning, and execution. By deploying autonomous agents, we allow AI to take actions, review outcomes, and dynamically adjust its behavior.</p>
      
      <h3>The Key Architectures of AI Agents</h3>
      <p>Most modern Agentic AI workflows rely on three main pillars:</p>
      <ol>
        <li><strong>Planning & Reasoning:</strong> Systems like ReAct (Reasoning and Acting) prompt the LLM to think first, decide on an action, execute it, observe the output, and repeat until resolved.</li>
        <li><strong>Tool Use:</strong> Agents are given calculators, search engines, database connectors, and API triggers. The LLM acts as the central router, choosing when and how to call these tools.</li>
        <li><strong>Multi-Agent Coordination:</strong> Complex tasks are broken down into roles (e.g., a software developer agent, a code reviewer agent, and a QA agent) which converse with one another to deliver high-quality code.</li>
      </ol>

      <blockquote class="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
        "Agentic workflows are the key to unlocking true autonomous operations. By moving from static generation to interactive problem solving, we bridge the gap between AI assistants and AI colleagues."
      </blockquote>

      <h3>Practical Implementation with LangChain</h3>
      <p>In our portfolio project <em>Agentic AI Interviewer</em>, we designed an agent using LangChain and FastAPI. The agent listens to responses, analyzes them for correctness, dynamically updates the candidate's scorecard, and determines which topic to probe next. The system responds under 800ms using WebRTC stream handling, resulting in a highly natural, human-like voice interview experience.</p>
      
      <h3>Conclusion</h3>
      <p>The transition from prompts to agents is a massive leap forward. As tooling evolves, agentic AI will become the standard architecture for solving intricate enterprise automation challenges.</p>
    `,
  },
  {
    id: "b2",
    title: "Designing Serverless ETL Pipelines on AWS",
    slug: "designing-serverless-etl-pipelines-aws",
    summary: "A technical walkthrough on constructing automated, cost-effective serverless data ingestion pipelines using Lambda, S3, and Redshift.",
    category: "Data Engineering",
    tags: ["AWS", "Lambda", "ETL", "Redshift", "Python"],
    readTime: "7 min read",
    publishedAt: "2026-06-10",
    status: "published",
    views: 98,
    content: `
      <h3>The Challenge of Live Ingestion</h3>
      <p>Data engineering pipelines often require ingestion of continuous high-volume feeds, such as real-time financial markets or user clickstreams. Managing traditional servers for these workloads introduces overhead, sizing challenges, and high standby costs. Designing a serverless architecture helps scale dynamically based on demand.</p>
      
      <h3>Architecture Overview</h3>
      <p>For our Forex Data Pipeline, we designed a serverless architecture on AWS utilizing the following elements:</p>
      <ul>
        <li><strong>EventBridge:</strong> Triggers our ingestion mechanism at set intervals (e.g., every minute).</li>
        <li><strong>AWS Lambda:</strong> A microservice written in Python that fetches currency exchange rates from live REST APIs.</li>
        <li><strong>Amazon S3:</strong> Raw JSON files are deposited directly into a secure S3 landing zone bucket, functioning as our data lake storage.</li>
        <li><strong>Redshift Copy Commands:</strong> A transformation Lambda processes raw files into optimized CSV formats and executes a fast COPY command to load data into Amazon Redshift tables.</li>
      </ul>

      <h3>Benefits of Serverless ETL</h3>
      <p>By moving to a completely serverless layout, the system gains several massive advantages:</p>
      <ol>
        <li><strong>Zero Idle Cost:</strong> You only pay for the milliseconds the Lambda runs and the storage consumed in S3.</li>
        <li><strong>High Scalability:</strong> AWS handles scaling out automatically if concurrent data sources increase.</li>
        <li><strong>Low Operations:</strong> No server patching, upgrading, or capacity provision is needed.</li>
      </ol>

      <p>This design makes ingestion highly resilient and keeps maintenance efforts extremely low.</p>
    `,
  },
  {
    id: "b3",
    title: "Building RAG Chatbots with High Accuracy",
    slug: "building-rag-chatbots-high-accuracy",
    summary: "A case study on building a high-precision Q&A bot for legal documents, highlighting chunking strategies, embeddings, and rankers.",
    category: "RAG Systems",
    tags: ["RAG", "Vector DB", "Embeddings", "GPT-4o-mini"],
    readTime: "6 min read",
    publishedAt: "2026-06-05",
    status: "published",
    views: 215,
    content: `
      <h3>RAG is Easy to Start, Hard to Master</h3>
      <p>Retrieval-Augmented Generation (RAG) has become the standard pattern for building chatbots that have access to custom, private data. However, simple implementations suffer from low retrieval recall, hallucinations, and formatting failures when confronted with complex, formal texts like legal constitutions.</p>
      
      <h3>Overcoming Bottlenecks in the legal domain</h3>
      <p>When developing the <strong>Pakistan Constitution AI Assistant</strong>, we realized that basic chunking (e.g. 500-character split with overlap) breaks articles in half, losing critical legal context. We designed several key improvements:</p>
      <ul>
        <li><strong>Semantic Document Chunking:</strong> We split documents matching structural boundaries (Articles, Sections, Clauses) rather than simple character counts.</li>
        <li><strong>Metadata Enrichment:</strong> Each chunk is tagged with its article number, chapter title, and keywords. During search, metadata filtering helps narrow down queries before vector match.</li>
        <li><strong>Hybrid Search & Reranking:</strong> We combine keyword search (BM25) and semantic vector search (using Cohere/OpenAI embeddings), then pass the combined top 20 candidates to a Cohere Reranker model to find the top 5 most relevant legal segments.</li>
      </ul>

      <h3>Results</h3>
      <p>Applying these techniques boosted answer accuracy from 64% to 91% in benchmark testing. Hallucinations were completely eliminated by prompting the LLM to strictly cite relevant article numbers and decline answering if the answer was not found in the documents.</p>
    `,
  },
  {
    id: "b4",
    title: "n8n and LLM Pipelines: Automating Content workflows",
    slug: "n8n-llm-pipelines-automating-content",
    summary: "How I reduced content creation time by 80% using n8n agentic workflows for automated LinkedIn and blog posting.",
    category: "Automation",
    tags: ["n8n", "Automation", "LLM APIs", "LinkedIn"],
    readTime: "4 min read",
    publishedAt: "2026-06-18",
    status: "draft",
    views: 12,
    content: `
      <h3>Automating Content Ingestion</h3>
      <p>Creating regular professional content is essential for AI engineers, but it is highly time consuming. To solve this, I built an automated agent workflow using <strong>n8n</strong> to automate the brainstorming, drafting, editing, and publishing stages of LinkedIn posts.</p>
      
      <h3>The n8n Flow Structure</h3>
      <p>The automation flow operates in four steps:</p>
      <ol>
        <li><strong>Inspiration Gathering:</strong> An RSS feed reader fetches top AI research papers and technical blog posts daily.</li>
        <li><strong>Drafting:</strong> A LangChain agent node reads the papers, extracts key takeaways, and drafts a 3-paragraph educational LinkedIn post.</li>
        <li><strong>Refinement:</strong> A secondary LLM node acts as a strict editor, optimizing headings, ensuring line breaks are readable, and adding tags.</li>
        <li><strong>Approval & Scheduling:</strong> The draft is sent to a Slack channel with "Approve" and "Edit" buttons. Once approved, the post is pushed to the LinkedIn API scheduler.</li>
      </ol>
      
      <p>This pipeline saves significant manual typing time while maintaining quality by keeping a human editor in the loop.</p>
    `,
  },
];

const initialMessages: ContactMessage[] = [
  {
    id: "m1",
    name: "Sarah Jenkins",
    email: "sarah.j@techcorp.io",
    message: "Hi Muhammad, I saw your Forex Data Pipeline project. We are looking for an AI Data Engineer to consult on an ETL migration. Are you available for a chat next week?",
    createdAt: "2026-06-21T10:30:00.000Z",
    read: false,
  },
  {
    id: "m2",
    name: "James Miller",
    email: "j.miller@hr-agents.com",
    message: "Hello! I am recruiting for an Agentic AI Engineer role at a fast-growing startup. Your Agentic Interviewer project is very impressive. Let me know if you would like to review the job specs.",
    createdAt: "2026-06-22T08:15:00.000Z",
    read: true,
  },
];

// Database initializers
const getStored = <T>(key: string, fallback: T): T => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
};

const setStored = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
  notifyChange();
};

// --- Projects CRUD ---
export const getProjects = (): Project[] => getStored<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);

export const saveProject = (project: Omit<Project, "id"> & { id?: string }): Project => {
  const projects = getProjects();
  if (project.id) {
    // Edit
    const index = projects.findIndex((p) => p.id === project.id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...project } as Project;
    }
  } else {
    // Create new
    const newProject: Project = {
      ...project,
      id: "p_" + Date.now().toString(36),
    };
    projects.push(newProject);
  }
  setStored(STORAGE_KEYS.PROJECTS, projects);
  return project as Project;
};

export const deleteProject = (id: string) => {
  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  setStored(STORAGE_KEYS.PROJECTS, filtered);
};

// --- Blog Posts CRUD ---
export const getBlogPosts = (): BlogPost[] => getStored<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, initialBlogPosts);

export const saveBlogPost = (post: Omit<BlogPost, "id" | "views"> & { id?: string; views?: number }): BlogPost => {
  const posts = getBlogPosts();
  if (post.id) {
    // Edit
    const index = posts.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...post } as BlogPost;
    }
  } else {
    // Create new
    const newPost: BlogPost = {
      ...post,
      id: "b_" + Date.now().toString(36),
      views: 0,
    } as BlogPost;
    posts.push(newPost);
  }
  setStored(STORAGE_KEYS.BLOG_POSTS, posts);
  return post as BlogPost;
};

export const deleteBlogPost = (id: string) => {
  const posts = getBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  setStored(STORAGE_KEYS.BLOG_POSTS, filtered);
};

export const incrementViews = (id: string) => {
  const posts = getBlogPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index !== -1) {
    posts[index].views += 1;
    setStored(STORAGE_KEYS.BLOG_POSTS, posts);
  }
};

// --- Contact Messages ---
export const getContactMessages = (): ContactMessage[] => getStored<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages);

export const addContactMessage = (name: string, email: string, message: string): ContactMessage => {
  const messages = getContactMessages();
  const newMessage: ContactMessage = {
    id: "m_" + Date.now().toString(36),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  };
  messages.unshift(newMessage); // latest first
  setStored(STORAGE_KEYS.MESSAGES, messages);
  return newMessage;
};

export const markMessageRead = (id: string) => {
  const messages = getContactMessages();
  const index = messages.findIndex((m) => m.id === id);
  if (index !== -1) {
    messages[index].read = true;
    setStored(STORAGE_KEYS.MESSAGES, messages);
  }
};

export const deleteContactMessage = (id: string) => {
  const messages = getContactMessages();
  const filtered = messages.filter((m) => m.id !== id);
  setStored(STORAGE_KEYS.MESSAGES, filtered);
};

// --- Authentication (Password: password123) ---
export const isAdminAuthenticated = (): boolean => {
  return sessionStorage.getItem(STORAGE_KEYS.AUTH) === "true";
};

export const loginAdmin = (password: string): boolean => {
  if (password === "password123") {
    sessionStorage.setItem(STORAGE_KEYS.AUTH, "true");
    notifyChange();
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  notifyChange();
};
