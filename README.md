# ⚡ PromptWars - AI Project Mentor

> **Built for the PromptWars Hackathon** | Powered by **Google Gemini 3.6 Flash** 🚀

**AI Project Mentor** is an end-to-end AI-powered engineering copilot designed to guide developers and students from project ideation to production-ready architecture. It eliminates project selection paralysis, evaluates technical feasibility, generates full system blueprints, creates structured execution roadmaps, and provides a context-aware AI mentor tailored to your specific project context.

---

## 🎯 About The Hackathon & Motivation

This project was built for the **PromptWars Hackathon**, addressing a critical pain point in student and software engineering workflows: **choosing, scoping, and executing complex software projects.**

Many developers struggle with:
- **Scope Creep & Feasibility**: Choosing projects that are either too trivial or impossible to complete given their hardware/time limits.
- **Generic AI Answers**: Chatbots that lack persistent memory of the project's system architecture, APIs, and stack.
- **Lack of Blueprinting**: Moving directly to code without designing clean system architecture, database schemas, or API contracts.

**PromptWars - AI Project Mentor** solves this by leveraging **Google Gemini 3.6 Flash** to deliver structured JSON project proposals, feasibility scores, architectural blueprints, interactive roadmaps, and ATS resume analysis.

---

## ✨ Key Features

### 🧠 1. Personalized AI Project Generator
- Generates 3 distinct, high-impact project concepts tailored to:
  - **Resume & Skills**: Uploaded PDF/DOCX resume or manual skill input.
  - **Target Domains**: Full-Stack, AI/ML, Web3, Mobile, DevOps, CyberSecurity, etc.
  - **Constraints**: Experience level, team size, target duration, available hardware (GPU/RAM), and excluded tech stacks.
  - **Voice & Text Prompts**: Multi-modal input ingestion.

### 📊 2. Project Fit & Feasibility Scoring
- Each generated project receives algorithmic AI evaluations:
  - **Fit Score (0-100)**: Alignment with candidate skills and goals.
  - **Feasibility Score (0-100)**: Resource, time, and hardware practicality.
  - **Innovation Score (0-100)**: Originality and real-world value.
  - **Hallucination & Risk Metrics**: Identifies potential tech stack traps.

### 📐 3. System Architecture & Blueprints
- Automatically drafts complete project specifications:
  - **System Architecture**: Diagrams component flows & data paths.
  - **Database Schemas**: Data models, relationships, and index recommendations.
  - **API Specs**: REST/GraphQL endpoints with query params and response payloads.
  - **AI Model Pipelines**: Input preprocessing, model inference, and output caching steps.

### 🗺️ 4. Interactive 5-Phase Roadmap
- Converts project blueprints into step-by-step milestone roadmaps:
  - **Phase Execution**: Foundation, Core Backend, Frontend & UI, Integration & AI, Deployment & Testing.
  - **Deliverable Checklists**: Micro-tasks to track project progress.

### 🤖 5. Context-Aware AI Engineering Mentor
- Real-time interactive AI chat assistant powered by Gemini 3.6 Flash.
- Remembers the user's active project, architecture, dependencies, and code structure to answer targeted technical questions.

### 📄 6. Resume & ATS Skill Analyzer
- Upload PDF/DOCX resumes for instant parsing.
- Extracts skill taxonomies, experience level, and provides an ATS compatibility score to match developers with suitable project complexity.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS Design System
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)

### Backend
- **Runtime**: Node.js & Express (TypeScript)
- **AI SDK**: `@google/genai` (Google Gen AI SDK)
- **Model**: `gemini-3.6-flash`
- **Validation**: Zod Schema Validation & Type Safety
- **File Parsing**: `pdf-parse`, `mammoth` (DOCX)
- **Security & Utilities**: Helmet, CORS, Express Rate Limit, Multer

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Google Gemini API Key (`GEMINI_API_KEY`)

### 1. Clone the Repository
```bash
git clone https://github.com/Nidhex/PromtWars.git
cd PromtWars
```

### 2. Environment Setup

Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash
```

### 3. Install Dependencies & Start Services

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```
*Backend server will start on `http://localhost:5000`*

#### Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
*Frontend app will start on `http://localhost:5173`*

---

## 📂 Project Structure

```
PromtWars/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Express request handlers
│   │   ├── lib/              # Gemini AI client & env config
│   │   ├── middleware/       # Upload & rate limiting middleware
│   │   ├── routes/           # REST API routes
│   │   ├── schemas/          # Zod validation schemas
│   │   ├── services/         # Gemini, Mentor, Project & Resume services
│   │   └── server.ts         # Backend entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # UI components (Blueprint, Mentor, Resume, etc.)
│   │   ├── pages/            # App pages (Landing, Dashboard, Discover, etc.)
│   │   ├── services/         # API integration services
│   │   └── App.tsx           # React router & main component
│   └── package.json
└── README.md
```

---

## 🔬 API Endpoint Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/projects/generate` | Generates 3 personalized project proposals using Gemini 3.6 Flash |
| `POST` | `/api/mentor/chat` | Context-aware AI mentor chat stream / response |
| `POST` | `/api/resume/analyze` | Parses uploaded resume (PDF/DOCX) & returns ATS skills analysis |

---

## 🏆 Hackathon Submission Details

- **Hackathon**: PromptWars
- **Repository**: [https://github.com/Nidhex/PromtWars](https://github.com/Nidhex/PromtWars)
- **Primary Model**: Google Gemini 3.6 Flash (`gemini-3.6-flash`)
- **Developer**: Nidhex

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
