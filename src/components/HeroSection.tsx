import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  "AI Engineer",
  "Agentic AI Developer",
  "LLM Systems Builder",
  "Data Scientist",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="font-mono-accent text-sm text-primary mb-4 animate-fade-up">
          {"// Hello, World! I'm"}
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-up-delay-1">
          Muhammad{" "}
          <span className="text-gradient">Abdullah</span>
        </h1>

        <div className="h-10 md:h-12 flex items-center justify-center mb-6 animate-fade-up-delay-2">
          <span className="font-mono-accent text-xl md:text-2xl text-muted-foreground">
            {displayed}
          </span>
          <span className="font-mono-accent text-xl md:text-2xl text-primary animate-typing-cursor ml-0.5">|</span>
        </div>

        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-up-delay-3">
          Building intelligent agentic systems, RAG pipelines, and scalable AI solutions.
          Passionate about pushing the boundaries of what's possible with LLMs and multi-agent architectures.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12 animate-fade-up-delay-4">
          <Button asChild size="lg" className="font-mono-accent">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-mono-accent border-primary/30 hover:border-primary/60">
            <a href="#contact">Contact Me</a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-5 animate-fade-up-delay-4">
          <a href="https://github.com/M-Abdullah-Jutt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={22} />
          </a>
          <a href="https://www.linkedin.com/in/abdullah-shafqat/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={22} />
          </a>
          <a href="mailto:abdullahjut255@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail size={22} />
          </a>
        </div>

        <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-float">
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
