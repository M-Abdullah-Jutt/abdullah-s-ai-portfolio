# Muhammad Abdullah — AI Engineer Portfolio

A premium, interactive personal portfolio website showcasing the technical work, projects, and research of Muhammad Abdullah, specializing in Agentic AI, Large Language Model (LLM) Systems, and Data Science.

---

## 🚀 Key Features

### 1. Portfolio Showcase
- **Dynamic Projects Section**: Fetches and renders featured projects dynamically from a persistent state.
- **Interactive About Me**: Displays experience, education, and achievements alongside a custom styled portrait image with responsive scaling and hover glow card backdrops.
- **Functional Contact Form**: Direct form submission that registers contact messages in the inbox database.

### 2. Technical Blog Pages (`/blog`)
- **Category Filter Tabs**: Smoothly filter articles matching tags like *Agentic AI*, *Data Engineering*, *RAG Systems*, or *Automation*.
- **Instant Search**: Client-side filtering across article titles, summaries, and keyword tags.
- **Reading View**: Premium content layouts featuring reading time, total page views tracking, and a floating metadata details card.
- **Read Progress Bar**: Smooth scrolling indicator at the top of the browser viewport.
- **Easy Sharing**: Click-to-copy utility button to copy the direct article URL.

### 3. Hidden Administrative Dashboard (`/admin`)
- **Branding-safe Routing**: No public-facing links in the navbar; accessed by going directly to the `/admin` URL.
- **Authentication Protected**: Secure lock requiring administrative verification credentials.
- **Overview Metrics**: Display of total projects, published/draft articles, inbox log metrics, and visitor traffic trends.
- **Analytics Chart**: Visual area chart rendering dummy traffic and contact volumes.
- **Full CRUD Blog Editor**: Form dialogs to edit existing posts or publish new rich HTML technical articles (supporting Draft vs. Published states).
- **Full CRUD Project Editor**: Create, modify, or remove homepage showcased projects in real-time.
- **Inbox Center**: Inspect message contents in detail, mark them as read, or delete submissions.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18 & TypeScript
- **Bundler & Dev Server**: Vite 5
- **Styling**: Tailwind CSS, Vanilla CSS, and custom HSL gradient tokens
- **Interactive Elements**: shadcn/ui components (Dialog, Tabs, Table, Cards, Badges, Toasts)
- **Data Querying**: TanStack React Query
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: Reactive Local Storage Database (`src/lib/store.ts`)

---

## 🔑 Admin Access Details

To access and test the dashboard workspace:
1. Navigate directly to `http://localhost:8080/admin` (or the deployed admin route).
2. Enter the following password to log in:
   - **Password**: `password123`

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or bun

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Build the application for production:
   ```bash
   npm run build
   ```
