# 🛡️ HARICHANDHAN MATTAPARTHI — Cybersecurity Portfolio

> **"Exploring Cybersecurity. Building the Future."**  
> A modern, responsive, premium-quality personal portfolio website with an authentic Dark Hacker / Cybersecurity aesthetic, custom interactive Linux terminal, telemetry bar, and clean architecture.

---

## 👤 Profile Information

| Attribute | Details |
| :--- | :--- |
| **Full Name** | **HARICHANDHAN MATTAPARTHI** |
| **Professional Title** | B.Tech Student \| Cybersecurity Enthusiast |
| **Education** | B.Tech 1st Year — Cybersecurity (Class of 2029) |
| **College** | DRK Institute of Science and Technology |
| **Location** | Hyderabad, Telangana, India |
| **Primary Focus** | Ethical Hacking, Linux, Programming, and Digital Security |
| **Direct Email** | [mharichandhan@gmail.com](mailto:mharichandhan@gmail.com) |
| **GitHub** | [github.com/mharichandhan-cyber](https://github.com/mharichandhan-cyber) |
| **LinkedIn** | [linkedin.com/in/harichandhan-mattaparthi-3215373b6](https://www.linkedin.com/in/harichandhan-mattaparthi-3215373b6/) |
| **Instagram** | [instagram.com/_hxri.chxndhxn_](https://www.instagram.com/_hxri.chxndhxn_/) |

---

## 🎨 Design Theme & Technical Aesthetics

- **Primary Background**: Deep Black (`#080B09`)
- **Accent Color**: Neon Green (`#39FF14`) with custom neon glow filters
- **Secondary Colors**: Dark Charcoal (`#0D1310`), Cyber Cyan (`#00F3FF`), and Warning Amber (`#FFB703`)
- **Typography**: 
  - `JetBrains Mono` for terminal commands, headings, metadata, and status bars.
  - `Space Grotesk` for high-legibility body descriptions and structured cards.
- **Hacker Elements**:
  - Live system telemetry ticker (`SYSTEM: ONLINE // DEFCON 5 // NODE: HYD_IN`)
  - Full-featured interactive CLI terminal emulator (`whoami`, `about`, `skills`, `projects`, `sudo`, `matrix`, `cat resume`, etc.)
  - Subtle matrix digital rain background canvas (low CPU impact, automatically respects `prefers-reduced-motion`)
  - CRT scanline effect and cyber HUD corner brackets
  - Real-time typewriter effect in the hero section
  - Glassmorphic translucent cards (`backdrop-filter: blur(12px)`)
  - Smooth animated scroll indicators and circular back-to-top button

---

## 📂 Project Structure

```plaintext
cybersecurity-portfolio/
├── index.html                 # Complete semantic HTML5 structure with SEO metadata
├── style.css                  # Responsive dark hacker design system & animations
├── script.js                  # Preloader, matrix canvas, typewriter, CLI terminal engine
├── assets/
│   ├── favicon.svg            # Custom neon cybersecurity shield favicon
│   ├── avatar.svg             # Cyber HUD avatar placeholder (with profile photo fallback)
│   └── HARICHANDHAN_MATTAPARTHI_Resume.txt # Formatted 1st-year academic dossier
└── README.md                  # Documentation and GitHub Pages deployment instructions
```

---

## 🚀 How to Run Locally

You do not need any build tools, Node.js packages, or npm dependencies! It is built with 100% pure HTML5, CSS3, and Vanilla JavaScript.

### Method 1: Direct Browser Launch (Easiest)
Simply double-click `index.html` or right-click `index.html` and choose **Open With > Google Chrome** (or your preferred browser).

### Method 2: VS Code Live Server
1. Open the `cybersecurity-portfolio` folder in **Visual Studio Code**.
2. Install the **Live Server** extension by *Ritwick Dey* (if not already installed).
3. Right-click `index.html` and click **"Open with Live Server"**.

### Method 3: Using Python HTTP Server
Open your terminal in the portfolio directory and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🌐 How to Deploy to GitHub Pages (Free Hosting)

Deploying this website to **GitHub Pages** takes less than 3 minutes and gives you a free live URL: `https://mharichandhan-cyber.github.io/portfolio/`.

### Step 1: Create a New GitHub Repository
1. Log in to your GitHub account: [https://github.com/mharichandhan-cyber](https://github.com/mharichandhan-cyber).
2. Click the **`+`** icon in the top-right corner and select **New repository**.
3. Repository name: `portfolio` (or `mharichandhan-cyber.github.io`).
4. Set visibility to **Public**.
5. Leave "Add a README file" unchecked (we already have one).
6. Click **Create repository**.

### Step 2: Initialize Git and Push Your Code
Open PowerShell or your command prompt in this directory (`C:\Users\LENOVO\.gemini\antigravity\scratch\cybersecurity-portfolio`):

```bash
# 1. Initialize local Git repository
git init

# 2. Stage all files
git add .

# 3. Create initial commit
git commit -m "feat: Initial commit for Harichandhan Mattaparthi cybersecurity portfolio"

# 4. Set main branch
git branch -M main

# 5. Link to your GitHub remote repository
# (Replace with your exact repo link if you named it differently)
git remote add origin https://github.com/mharichandhan-cyber/portfolio.git

# 6. Push code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your GitHub repository, click on the **Settings** tab.
2. In the left navigation sidebar, click on **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/(root)`.
4. Click **Save**.
5. Wait 30–60 seconds. Refresh the page, and GitHub will provide your live URL:
   ```plaintext
   Your site is live at https://mharichandhan-cyber.github.io/portfolio/
   ```

---

## ⚙️ How to Customize

### 1. Adding Your Real Profile Picture
1. Save your photograph (e.g. `profile.jpg` or `profile.png`) into the `assets/` folder.
2. Open `index.html`, locate the `<img>` tag with `id="profile-img"` (around line 140), and change the source:
   ```html
   <img src="assets/profile.jpg" alt="Harichandhan Mattaparthi" class="avatar-img" id="profile-img">
   ```
   *(If the file is ever missing or moves, the built-in fallback will automatically load `assets/avatar.svg` so your website never has a broken image!)*

### 2. Updating with Your Real PDF Resume
1. Export your resume from Word/Canva/LaTeX as a PDF and save it as `assets/Harichandhan_Mattaparthi_Resume.pdf`.
2. In `index.html` or `script.js`, change the download link to point directly to `assets/Harichandhan_Mattaparthi_Resume.pdf`.

### 3. Adding Real Projects Once Built
When you build your first project (e.g. your Python Port Scanner):
1. In `index.html`, find the `<section id="projects">` section.
2. Update the status tag from `IN RESEARCH & DESIGN` to `ACTIVE / COMPLETED`.
3. Add your actual GitHub repository URL to the project card button!

---

## 🔒 Accessibility & Performance Standards

- **Prefers-Reduced-Motion**: Automatically disables matrix animations, scanlines, and typewriter transitions when reduced-motion mode is detected on the visitor's device.
- **Mobile Responsive**: Tested across desktop (1920px, 1440px), laptop (1280px), tablet (768px), and mobile (375px–480px).
- **SEO & Social Cards**: Pre-configured with OpenGraph and Twitter card metadata for crisp previews when shared on LinkedIn, Discord, or Twitter.
- **Pure Native Code**: Zero heavy dependencies, zero tracking scripts, lightning-fast first contentful paint.

---

*Designed & Built for **Harichandhan Mattaparthi** — B.Tech 1st Year Cybersecurity Student.*

