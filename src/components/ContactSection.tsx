import { useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono-accent text-sm text-primary mb-2">{"// Contact"}</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">
          Get in <span className="text-gradient">touch</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Interested in working together or have a project in mind? Feel free to reach out — I'm always
              open to discussing new opportunities in AI, data engineering, and agentic systems.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:abdullahjut255@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Mail size={18} />
                </div>
                <span className="text-sm">abdullahjut255@gmail.com</span>
              </a>
              <a
                href="https://github.com/M-Abdullah-Jutt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Github size={18} />
                </div>
                <span className="text-sm">M-Abdullah-Jutt</span>
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah-shafqat/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Linkedin size={18} />
                </div>
                <span className="text-sm">abdullah-shafqat</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-muted/30 border-border/50 focus:border-primary/50"
              maxLength={100}
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted/30 border-border/50 focus:border-primary/50"
              maxLength={255}
            />
            <Textarea
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-muted/30 border-border/50 focus:border-primary/50 min-h-[140px]"
              maxLength={1000}
            />
            <Button type="submit" className="w-full font-mono-accent">
              <Send size={16} className="mr-2" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
