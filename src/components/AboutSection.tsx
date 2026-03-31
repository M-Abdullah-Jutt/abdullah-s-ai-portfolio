import { Briefcase, GraduationCap, Trophy } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono-accent text-sm text-primary mb-2">{"// About Me"}</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">
          Get to know <span className="text-gradient">me</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Summary */}
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              I'm an <span className="text-foreground font-medium">AI Engineer</span> specializing in
              Agentic AI, LLM-based systems, and scalable data solutions. I design and build multi-agent
              workflows, RAG pipelines, and real-time AI applications using cutting-edge tools like
              LangChain, LangGraph, and cloud-native AWS/Azure services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My work bridges AI research and production systems — from building voice-enabled
              AI interviewers with real-time avatars to architecting serverless ETL pipelines
              on AWS. I thrive on solving complex problems and shipping AI that works in the real world.
            </p>
          </div>

          {/* Experience, Education, Achievements */}
          <div className="space-y-6">
            {/* Experience */}
            <div className="glass-card p-5 glow-border glow-border-hover transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Experience</h4>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground">AI Engineer Intern</span> — NextGen Schooling (2025)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground">Python Intern</span> — Cycomverse (2024)
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="glass-card p-5 glow-border glow-border-hover transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Education</h4>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground">Intermediate in Computer Science</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Govt. Graduate College, Arifwala</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card p-5 glow-border glow-border-hover transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Trophy size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Achievements</h4>
                  <p className="text-sm text-muted-foreground">
                    🏆 <span className="text-foreground">Rank #8</span> — National AI Wrapper Competition (Top 10%)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    🚀 National Agentic AI Hackathon Participant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
