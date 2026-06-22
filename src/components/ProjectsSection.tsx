import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects, subscribeToDBChanges } from "@/lib/store";

const ProjectsSection = () => {
  const [projects, setProjects] = useState(getProjects());

  useEffect(() => {
    return subscribeToDBChanges(() => {
      setProjects(getProjects());
    });
  }, []);
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono-accent text-sm text-primary mb-2">{"// Projects"}</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">
          Featured <span className="text-gradient">work</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`glass-card p-6 glow-border glow-border-hover transition-all duration-300 group ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors shrink-0 ml-4"
                >
                  <Github size={18} />
                </a>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="font-mono-accent border-primary/30 hover:border-primary/60">
            <a href="https://github.com/M-Abdullah-Jutt" target="_blank" rel="noopener noreferrer">
              <Github size={16} className="mr-2" />
              View All on GitHub
              <ExternalLink size={14} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
