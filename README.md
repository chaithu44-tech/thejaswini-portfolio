# CK Thejaswini — High-Fashion Editorial Portfolio Website

An editorial, responsive portfolio website created for **CK Thejaswini**, B.Tech student (2nd Year) at **Jain University**, aspiring software developer, and participant in the **Smart India Hackathon (SIH)**.

---

## ✨ Features & Architectural Highlights

- **Brutalist / High-Fashion Editorial Aesthetic:**
  - Distinctive luxury palette inspired by her resume and reference: Warm Taupe (`#DDD6CE`), Deep Charcoal Obsidian (`#121110`), Crisp Editorial White (`#FAF7F2`), and Desert Gold / Terracotta accents (`#D4A373`).
  - Giant layered `PORTFOLIO` display typography, rotating circular stamp badge, and subtle ambient glow effects.
- **Dual Visual Themes (Dark & Light Mode):**
  - Instant theme toggle persisted with `localStorage` and synchronized icons.
- **Interactive "Student Gap Analyser" Simulator:**
  - Real-time client-side interactive mini-demo where recruiters and peers can select career tracks (Python & FastAPI Backend, Full-Stack, Java Developer, SDE General), select their current skills, and dynamically calculate their internship readiness score and remedial curriculum.
- **Technical Case Study Modal:**
  - 4-stage architectural breakdown (Candidate Profiling, Role Taxonomy Mapping, Gap Differential Engine, Curated Roadmap) and FastAPI RESTful Python endpoint code sample.
- **1:1 Printable Executive Resume Modal:**
  - Re-created 1:1 following the exact visual layout of CK Thejaswini's uploaded resume (charcoal top band, circular portrait avatar, warm taupe sidebar, white main body).
  - Includes a dedicated `window.print()` button with `@media print` rules formatted for A4 PDF export.
- **Interactive Skills Matrix:**
  - Tabbed filter for Programming Languages (Python, Java), Web & Frameworks (FastAPI, HTML5), Core Foundations (Problem-Solving, OOP), and Career Interests.
  - Animated proficiency level meters.
- **Hackathon & Achievements Showcase:**
  - Smart India Hackathon (SIH) national innovation participation, academic project-based learning, and collaborative ideation timeline.
- **One-Click Contact & Scannable QR Code:**
  - Direct clipboard copy for email (`thejuck28@gmail.com`) with animated toast feedback.
  - Direct call link (`+91 9524329827`).
  - Custom SVG scannable QR code (`assets/qr-contact.svg`) for instant mobile contact.
  - Validated interactive contact form with error cues.
- **Tactile Sound Effects (Web Audio API):**
  - Optional subtle haptic sound ticks on clicks with toggle button.
- **Live Bengaluru (IST) Clock:**
  - Real-time IST clock in side rails, hero meta strip, and footer.

---

## 📂 Project Structure

```text
thejaswini-portfolio/
├── index.html                  # Semantic HTML5 layout & modal templates
├── style.css                   # Editorial CSS styling, dark/light themes, print rules
├── script.js                   # Interactive logic, live simulator, sound FX & modals
├── README.md                   # Documentation
└── assets/
    ├── portrait.jpg            # Original high-res studio portrait
    ├── portrait-hero.jpg       # Optimized 800x800 cropped hero photo
    ├── portrait-avatar.png     # Circular transparent avatar
    ├── qr-contact.svg          # Scannable email QR code SVG
    ├── resume-original.jpg     # User uploaded resume copy
    └── resume-reference.jpg    # Reference template copy
```

---

## 🚀 How to Run Locally

You can launch a local HTTP server using Python:

```bash
# Navigate to the project directory
cd /Users/bunnyroyal/.gemini/antigravity/scratch/thejaswini-portfolio

# Start a local HTTP server
python3 -m http.server 8080
```

Then open your browser and navigate to:
```text
http://localhost:8080
```

---

## 🌐 Deploying to GitHub Pages

1. Initialize git and commit:
   ```bash
   cd /Users/bunnyroyal/.gemini/antigravity/scratch/thejaswini-portfolio
   git init
   git add .
   git commit -m "Initial commit of CK Thejaswini portfolio"
   ```
2. Push to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/thejaswini-portfolio.git
   git push -u origin main
   ```
3. Enable GitHub Pages in your repository settings:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment**, select `Deploy from a branch` and choose `main` / `(root)`.

---

© 2026 CK THEJASWINI. All rights reserved.
