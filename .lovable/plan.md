

# Personal Portfolio Website — Muhammad Abdullah

## Overview

A dark, techy portfolio website for an AI Engineer & Data Scientist. Four main sections: Hero + About, Projects, Skills & Tools, and Contact Form. Dark color scheme with glowing accents and subtle animations.

## Design Direction

- **Theme**: Dark background (#0a0a0f) with blue/cyan accent glows (#3b82f6, #06b6d4)
- **Style**: Terminal/code-inspired elements, gradient borders, subtle grid backgrounds, glassmorphic cards
- **Typography**: Monospace for accents (code feel), clean sans-serif for body
- **Animations**: Fade-in on scroll, typing effect on hero tagline, hover glow on cards

## Sections

### 1. Hero Section
- Name: **Muhammad Abdullah**
- Title: "AI Engineer | Agentic AI & LLM Systems"
- Summary from CV (condensed)
- CTA buttons: "View Projects" and "Contact Me"
- Animated typing effect for role titles
- Subtle particle/grid background

### 2. About Section
- Professional summary from CV
- Current role: AI Engineer Intern at NextGen Schooling
- Previous: Python Intern at Cycomverse
- Education: Intermediate in CS, Govt. Graduate College Arifwala
- Achievements: Top 10% National AI Wrapper Competition (Rank #8), National Agentic AI Hackathon participant

### 3. Skills & Tools Section
- Grouped skill cards with icons:
  - **AI & Agentic Systems**: LangChain, LangGraph, RAG, Multi-Agent, Vector DBs, Prompt Engineering
  - **ML & Deep Learning**: Scikit-learn, Computer Vision, LLM APIs (Whisper, DeepSeek)
  - **Backend**: Python, FastAPI, Flask, REST APIs, JWT Auth
  - **Data Engineering**: Pandas, NumPy, ETL, SQL Server, MySQL, Redshift
  - **Cloud & DevOps**: AWS (Lambda, S3, EC2, Redshift), Azure (ML Studio, AI Services), Docker
  - **Automation**: n8n, Make, Git, Power BI
- **Certifications** subsection:
  - AI-900 (Microsoft)
  - Certified Data Analyst (TDI)
  - Data Analytics/BI (Digiskills)
  - Python Developer (Innovista)

### 4. Projects Section
- Cards with glowing borders, GitHub links:
  1. **Agentic AI Interviewer** — Real-time voice + avatar with LiveKit, LangChain, WebRTC
  2. **Forex Data Pipeline** — AWS ETL with Lambda, EventBridge, S3, Redshift
  3. **Travel Planner** — Multi-agent system using Google ADK
  4. **Pakistan Constitution AI Assistant** — RAG chatbot with GPT-4o-mini
  5. **LinkedIn Post Automation** — Agentic workflow, 80% effort reduction

### 5. Contact Form
- Name, email, message fields
- Social links: GitHub, LinkedIn, email
- Toast notification on submit

## Technical Plan

### Files to create/modify:

1. **`src/index.css`** — Update CSS variables for dark techy theme, add custom animations (glow, typing, fade-in)
2. **`src/pages/Index.tsx`** — Main page composing all sections
3. **`src/components/HeroSection.tsx`** — Animated hero with typing effect
4. **`src/components/AboutSection.tsx`** — Bio, experience, education, achievements
5. **`src/components/SkillsSection.tsx`** — Skill category cards + certifications
6. **`src/components/ProjectsSection.tsx`** — Project cards with GitHub links
7. **`src/components/ContactSection.tsx`** — Contact form with validation
8. **`src/components/Navbar.tsx`** — Fixed top nav with smooth scroll links
9. **`src/components/Footer.tsx`** — Social links and copyright

### Dependencies
- `lucide-react` (already available) for icons
- No additional packages needed

