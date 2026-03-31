import { Brain, Server, Database, Cloud, Workflow, Award, Bot } from "lucide-react";

const skillCategories = [
  {
    title: "AI & Agentic Systems",
    icon: Brain,
    color: "text-primary",
    bg: "bg-primary/10",
    skills: ["LangChain", "LangGraph", "RAG", "Multi-Agent", "Vector DBs", "Prompt Engineering"],
  },
  {
    title: "ML & Deep Learning",
    icon: Bot,
    color: "text-secondary",
    bg: "bg-secondary/10",
    skills: ["Scikit-learn", "Computer Vision", "LLM APIs", "Whisper", "DeepSeek", "GPT-4o"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-primary",
    bg: "bg-primary/10",
    skills: ["Python", "FastAPI", "Flask", "REST APIs", "JWT Auth", "Streamlit"],
  },
  {
    title: "Data Engineering",
    icon: Database,
    color: "text-secondary",
    bg: "bg-secondary/10",
    skills: ["Pandas", "NumPy", "ETL", "SQL Server", "MySQL", "Redshift"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "text-primary",
    bg: "bg-primary/10",
    skills: ["AWS Lambda", "S3", "EC2", "Azure ML", "Azure AI", "Docker"],
  },
  {
    title: "Automation & Tools",
    icon: Workflow,
    color: "text-secondary",
    bg: "bg-secondary/10",
    skills: ["n8n", "Make", "Git", "Power BI", "WebRTC", "LiveKit"],
  },
];

const certifications = [
  { name: "AI-900", issuer: "Microsoft" },
  { name: "Certified Data Analyst", issuer: "TDI" },
  { name: "Data Analytics / BI", issuer: "Digiskills" },
  { name: "Python Developer", issuer: "Innovista" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono-accent text-sm text-primary mb-2">{"// Skills & Tools"}</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">
          My <span className="text-gradient">tech stack</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="glass-card p-6 glow-border glow-border-hover transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${cat.bg} ${cat.color}`}>
                  <cat.icon size={20} />
                </div>
                <h4 className="font-semibold text-sm">{cat.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted/60 text-muted-foreground border border-border/50 hover:border-primary/40 hover:text-foreground transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <h4 className="font-mono-accent text-sm text-secondary mb-6">{"// Certifications"}</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="glass-card p-4 flex items-center gap-3 glow-border glow-border-hover transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                <Award size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
