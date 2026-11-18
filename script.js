/**
 * HARICHANDHAN MATTAPARTHI — CYBERSECURITY PORTFOLIO
 * Interactive Client Logic & Terminal Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Preloader / Cyber Boot Sequence
  // --------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloader-bar-fill');
  const skipBootBtn = document.getElementById('skip-boot-btn');

  let bootDone = false;

  function endBootSequence() {
    if (bootDone) return;
    bootDone = true;
    if (preloaderFill) preloaderFill.style.width = '100%';
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }
    }, 250);
  }

  // Simulated boot progress
  if (preloader && preloaderFill) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(endBootSequence, 300);
      }
      preloaderFill.style.width = progress + '%';
    }, 120);

    if (skipBootBtn) {
      skipBootBtn.addEventListener('click', endBootSequence);
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !bootDone) {
        endBootSequence();
      }
    });

    // Safety fallback: auto-dismiss after 2.5s maximum
    setTimeout(endBootSequence, 2500);
  }

  // --------------------------------------------------------------------------
  // 2. Dynamic Year Update
  // --------------------------------------------------------------------------
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 3. Header Scroll Effect & Mobile Drawer
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer on navigation click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Active Nav Link on Scroll (IntersectionObserver)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 5. Typewriter Effect in Hero Section
  // --------------------------------------------------------------------------
  const typedHeadlineEl = document.getElementById('typed-headline');
  const headlines = [
    "Exploring Cybersecurity. Building the Future.",
    "B.Tech 1st Year Undergrad @ DRKIST Hyderabad.",
    "Linux & Bash Scripting Explorer.",
    "Mastering Python, C++, and System Defense."
  ];

  let headlineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 70;

  function typeEffect() {
    if (!typedHeadlineEl) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typedHeadlineEl.textContent = headlines[0];
      return;
    }

    const currentText = headlines[headlineIdx];

    if (isDeleting) {
      typedHeadlineEl.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 35;
    } else {
      typedHeadlineEl.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 70;
    }

    if (!isDeleting && charIdx === currentText.length) {
      // Pause at full sentence
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      headlineIdx = (headlineIdx + 1) % headlines.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // --------------------------------------------------------------------------
  // 6. Cyber Background Canvas: Matrix Rain & Tech Grid
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('cyber-bg');
  let isMatrixBoost = false;

  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    }, { passive: true });

    // Matrix characters: Binary, hex, and cyber symbols
    const chars = '01010101ABCDEF0123456789$#><:/*+~-';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = [];

    function initColumns() {
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -height);
      }
    }

    initColumns();

    let lastDraw = 0;
    function drawMatrix(timestamp) {
      const fps = isMatrixBoost ? 45 : 24;
      const interval = 1000 / fps;

      if (timestamp - lastDraw > interval) {
        lastDraw = timestamp;

        // Faint translucent black overlay creates trail effect
        ctx.fillStyle = isMatrixBoost ? 'rgba(8, 11, 9, 0.12)' : 'rgba(8, 11, 9, 0.08)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Head of drop is bright neon green / white, tail is darker green
          ctx.fillStyle = isMatrixBoost ? '#39FF14' : 'rgba(57, 255, 20, 0.5)';
          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.985) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      if (!document.hidden) {
        requestAnimationFrame(drawMatrix);
      }
    }

    requestAnimationFrame(drawMatrix);

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        requestAnimationFrame(drawMatrix);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Interactive Hacker Terminal Engine
  // --------------------------------------------------------------------------
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalScreen = document.getElementById('terminal-screen');
  const termClearBtn = document.getElementById('term-clear-btn');
  const termHelpBtn = document.getElementById('term-help-btn');
  const cmdPills = document.querySelectorAll('.cmd-pill');

  const commandHistory = [];
  let historyIndex = -1;

  // Available commands database
  const commands = {
    help: () => `
      <p><span class="term-highlight">AVAILABLE COMMANDS:</span></p>
      <table>
        <tr><td class="term-key">whoami</td><td>Print current identity & credentials</td></tr>
        <tr><td class="term-key">about</td><td>Display education, college & interests</td></tr>
        <tr><td class="term-key">skills</td><td>List technical competencies currently being learned</td></tr>
        <tr><td class="term-key">projects</td><td>Display project pipeline & upcoming tools</td></tr>
        <tr><td class="term-key">journey</td><td>Display B.Tech cybersecurity roadmap</td></tr>
        <tr><td class="term-key">contact</td><td>List email, GitHub, LinkedIn & Instagram</td></tr>
        <tr><td class="term-key">socials</td><td>Interactive table of external links</td></tr>
        <tr><td class="term-key">cat resume</td><td>Output complete text dossier of curriculum vitae</td></tr>
        <tr><td class="term-key">status</td><td>Display system defense telemetry</td></tr>
        <tr><td class="term-key">date</td><td>Show system time and local node timestamp</td></tr>
        <tr><td class="term-key">matrix</td><td>Toggle matrix digital rain acceleration</td></tr>
        <tr><td class="term-key">banner</td><td>Display ASCII art system banner</td></tr>
        <tr><td class="term-key">sudo [cmd]</td><td>Execute command as root (admin privilege check)</td></tr>
        <tr><td class="term-key">clear</td><td>Clear terminal screen output</td></tr>
      </table>
    `,

    whoami: () => `
      <p><span class="term-highlight">HARICHANDHAN MATTAPARTHI</span></p>
      <p>Title: B.Tech Student | Cybersecurity Enthusiast</p>
      <p>Role: 1st Year Undergrad (Class of 2029)</p>
      <p>Node: DRK Institute of Science and Technology, Hyderabad, India</p>
      <p>Motto: "Exploring Cybersecurity. Building the Future."</p>
    `,

    about: () => `
      <p><span class="term-highlight">// SYSTEM DOSSIER: ABOUT ME</span></p>
      <p>I am a passionate 1st year B.Tech student at DRK Institute of Science and Technology in Hyderabad, India.</p>
      <p>Curious about ethical hacking, Linux systems, programming, and digital security architectures.</p>
      <p>Focusing on foundational problem solving in C++, scripting with Python, and mastering the Unix command line.</p>
    `,

    skills: () => `
      <p><span class="term-highlight">// TECHNICAL ARSENAL (CURRENTLY LEARNING)</span></p>
      <table>
        <tr><td class="term-key">Python</td><td>[LEARNING] Automation, CLI scripts, socket networking fundamentals</td></tr>
        <tr><td class="term-key">C++</td><td>[LEARNING] Object-oriented design, pointers, algorithms, memory models</td></tr>
        <tr><td class="term-key">Linux</td><td>[LEARNING] Bash navigation, file hierarchy, permissions, process monitoring</td></tr>
        <tr><td class="term-key">Git & GitHub</td><td>[LEARNING] Version control, branch management, repo hosting</td></tr>
      </table>
      <p style="color: var(--text-muted); font-size: 0.78rem;">Note: Honest 1st year targets without exaggerated claims.</p>
    `,

    projects: () => `
      <p><span class="term-highlight">// UPCOMING LABS & REPOSITORIES (PIPELINE)</span></p>
      <p>1. <strong>Network Port Scanner & Banner Grabber</strong> (Python 3, Socket API) - Target 01</p>
      <p>2. <strong>Linux System Hardening & Audit Script</strong> (Bash, Unix Audit) - Target 02</p>
      <p>3. <strong>C++ Cryptographic Hash & Cipher Utility</strong> (C++, Crypto Math) - Target 03</p>
      <p>Public code will be pushed to: <a href="https://github.com/mharichandhan-cyber" target="_blank" class="term-highlight">https://github.com/mharichandhan-cyber</a></p>
    `,

    journey: () => `
      <p><span class="term-highlight">// LEARNING TRAJECTORY</span></p>
      <p>• Year 1 (CURRENT): Core Computing, C++, Python, Linux CLI at DRKIST</p>
      <p>• Year 2 (UPCOMING): Computer Networking (TCP/IP), Wireshark, OS Internals</p>
      <p>• Year 3 (UPCOMING): Ethical Hacking Labs, TryHackMe, Web App Security (OWASP)</p>
      <p>• Year 4 & Beyond: Defensive Security Practitioner, Certifications, Career Launch</p>
    `,

    contact: () => `
      <p><span class="term-highlight">// SECURE CHANNELS</span></p>
      <p>Email: <a href="mailto:mharichandhan@gmail.com" class="term-highlight">mharichandhan@gmail.com</a></p>
      <p>GitHub: <a href="https://github.com/mharichandhan-cyber" target="_blank" class="term-highlight">https://github.com/mharichandhan-cyber</a></p>
      <p>LinkedIn: <a href="https://www.linkedin.com/in/harichandhan-mattaparthi-3215373b6/" target="_blank" class="term-highlight">https://www.linkedin.com/in/harichandhan-mattaparthi-3215373b6/</a></p>
      <p>Instagram: <a href="https://www.instagram.com/_hxri.chxndhxn_/" target="_blank" class="term-highlight">https://www.instagram.com/_hxri.chxndhxn_/</a></p>
    `,

    socials: () => `
      <table>
        <tr><td class="term-key">GitHub</td><td><a href="https://github.com/mharichandhan-cyber" target="_blank" class="term-highlight">@mharichandhan-cyber</a></td></tr>
        <tr><td class="term-key">LinkedIn</td><td><a href="https://www.linkedin.com/in/harichandhan-mattaparthi-3215373b6/" target="_blank" class="term-highlight">harichandhan-mattaparthi</a></td></tr>
        <tr><td class="term-key">Email</td><td><a href="mailto:mharichandhan@gmail.com" class="term-highlight">mharichandhan@gmail.com</a></td></tr>
        <tr><td class="term-key">Instagram</td><td><a href="https://www.instagram.com/_hxri.chxndhxn_/" target="_blank" class="term-highlight">@_hxri.chxndhxn_</a></td></tr>
      </table>
    `,

    date: () => `
      <p>Current Node Time: <span class="term-highlight">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</span></p>
    `,

    status: () => `
      <p>FIREWALL: <span class="term-highlight">ACTIVE [ENFORCED]</span></p>
      <p>THREAT LEVEL: <span style="color: var(--accent-green);">DEFCON 5 (ALL CLEAR)</span></p>
      <p>SYSTEM LOCATION: Hyderabad, Telangana, India [17.3850° N, 78.4867° E]</p>
      <p>MEMORY USAGE: Nominal // V8 Engine Active</p>
    `,

    matrix: () => {
      isMatrixBoost = !isMatrixBoost;
      return `<p>Matrix digital rain mode: <span class="term-highlight">${isMatrixBoost ? 'ACCELERATED [ON]' : 'NORMAL [OFF]'}</span></p>`;
    },

    banner: () => `
      <pre class="ascii-art" style="font-size: 0.6rem;">
  _    _          _____  _____ _____ _    _          _   _ _____  _    _          _   _ 
 | |  | |   /\   |  __ \|_   _/ ____| |  | |   /\   | \ | |  __ \| |  | |   /\   | \ | |
 | |__| |  /  \  | |__) | | || |    | |__| |  /  \  |  \| | |  | | |__| |  /  \  |  \| |
 |  __  | / /\ \ |  _  /  | || |    |  __  | / /\ \ | . ` | |  | |  __  | / /\ \ | . ` |
 | |  | |/ ____ \| | \ \ _| || |____| |  | |/ ____ \| |\  | |__| | |  | |/ ____ \| |\  |
 |_|  |_/_/    \_\_|  \_\_____\_____|_|  |_/_/    \_\_| \_|_____/|_|  |_/_/    \_\_| \_|
      </pre>
      <p>[ HARICHANDHAN MATTAPARTHI // CYBERSECURITY UNDERGRAD ]</p>
    `,

    resume: () => `
      <p><span class="term-highlight">// RESUME SUMMARY</span></p>
      <p>HARICHANDHAN MATTAPARTHI | B.Tech Cybersecurity (1st Year) | DRKIST</p>
      <p>Skills: Python, C++, Linux, Git & GitHub</p>
      <p>Download or preview using the Resume section below or click the 'Preview Resume Dossier' button.</p>
    `,

    'cat resume': () => `
      <p><span class="term-highlight">================ RESUME DOSSIER ================</span></p>
      <p><strong>NAME:</strong> HARICHANDHAN MATTAPARTHI</p>
      <p><strong>TITLE:</strong> B.Tech Student | Cybersecurity Enthusiast</p>
      <p><strong>COLLEGE:</strong> DRK Institute of Science and Technology, Hyderabad</p>
      <p><strong>YEAR:</strong> 1st Year Undergrad</p>
      <p><strong>EMAIL:</strong> mharichandhan@gmail.com</p>
      <p><strong>TECHNICAL SKILLS:</strong> Python, C++, Linux CLI, Git & GitHub</p>
      <p><strong>OBJECTIVE:</strong> Exploring ethical hacking, systems programming, and cyber defense.</p>
      <p><span class="term-highlight">================================================</span></p>
    `,

    clear: () => {
      if (terminalHistory) terminalHistory.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Track command history
    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Build entry
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-cmd-line';
    cmdLine.innerHTML = `
      <span class="prompt-user">guest</span>@<span class="prompt-path">harichandhan</span>:~$ 
      <span class="terminal-cmd-text">${escapeHtml(trimmed)}</span>
    `;
    entry.appendChild(cmdLine);

    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output';

    const lower = trimmed.toLowerCase();

    // Check specific commands
    if (lower === 'clear') {
      commands.clear();
      if (terminalInput) terminalInput.value = '';
      return;
    }

    if (lower.startsWith('sudo')) {
      outputDiv.innerHTML = `
        <p style="color: var(--accent-red);">
          [ACCESS DENIED] User 'guest' is not in the sudoers file. 
          This incident will be reported to Harichandhan.
        </p>
      `;
    } else if (commands[lower]) {
      outputDiv.innerHTML = commands[lower]();
    } else if (lower === 'echo' || lower.startsWith('echo ')) {
      outputDiv.innerHTML = `<p>${escapeHtml(trimmed.substring(5))}</p>`;
    } else if (lower === 'exit' || lower === 'quit') {
      outputDiv.innerHTML = `<p>Session cannot be terminated from web interface. Use your browser tab to close.</p>`;
    } else {
      outputDiv.innerHTML = `
        <p style="color: var(--accent-yellow);">
          Command not found: <code>${escapeHtml(trimmed)}</code>. 
          Type <span class="term-highlight">help</span> to view all available commands.
        </p>
      `;
    }

    entry.appendChild(outputDiv);
    terminalHistory.appendChild(entry);

    // Auto-scroll to bottom of terminal
    if (terminalScreen) {
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }

    if (terminalInput) terminalInput.value = '';
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeCommand(terminalInput.value);
    });

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const current = terminalInput.value.toLowerCase().trim();
        if (current) {
          const match = Object.keys(commands).find(c => c.startsWith(current));
          if (match) {
            terminalInput.value = match;
          }
        }
      }
    });

    if (termClearBtn) {
      termClearBtn.addEventListener('click', () => commands.clear());
    }

    if (termHelpBtn) {
      termHelpBtn.addEventListener('click', () => executeCommand('help'));
    }

    cmdPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const cmd = pill.getAttribute('data-cmd');
        if (cmd) {
          executeCommand(cmd);
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. Resume Modal Logic & Download Placeholder
  // --------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const previewResumeBtn = document.getElementById('preview-resume-btn');
  const downloadResumeBtn = document.getElementById('download-resume-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseAction = document.getElementById('modal-close-action');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalDownloadAction = document.getElementById('modal-download-action');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (previewResumeBtn) previewResumeBtn.addEventListener('click', openResumeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeResumeModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeResumeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeResumeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
      closeResumeModal();
    }
  });

  // Placeholder Resume Download trigger
  function triggerResumeDownload() {
    const resumeDossierText = `
========================================================================
                      HARICHANDHAN MATTAPARTHI
           B.Tech Student | Cybersecurity Enthusiast
========================================================================

CONTACT INFORMATION
-------------------
• Email: mharichandhan@gmail.com
• GitHub: https://github.com/mharichandhan-cyber
• LinkedIn: https://www.linkedin.com/in/harichandhan-mattaparthi-3215373b6/
• Instagram: https://www.instagram.com/_hxri.chxndhxn_/
• Location: Hyderabad, Telangana, India

ABOUT ME
--------
Curious about ethical hacking, Linux, programming and digital security. 
Focused on mastering computing architecture, algorithmic logic, and secure 
programming fundamentals.

EDUCATION
---------
• Degree: Bachelor of Technology (B.Tech) in Cybersecurity
• Current Year: 1st Year Undergraduate (Class of 2029)
• College: DRK Institute of Science and Technology, Hyderabad, India

TECHNICAL ARSENAL (CURRENT LEARNING TARGETS)
-------------------------------------------
• Python: Syntax, CLI scripts, automation, socket networking basics
• C++: Object-oriented programming, data structures, pointer memory
• Linux: Unix filesystem, permissions (chmod/chown), Bash scripting
• Git & GitHub: Version control, branch flows, repository management

UPCOMING PROJECTS & LAB ROADMAP
-------------------------------
1. Network Port Scanner & Banner Grabber (Python 3 Socket API)
2. Linux System Hardening & Audit Script (Bash CLI)
3. C++ Cryptographic Hash & Classical Cipher Tool (C++)

========================================================================
[Verified 1st Year Academic Profile Dossier — Harichandhan Mattaparthi]
========================================================================
    `.trim();

    const blob = new Blob([resumeDossierText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'HARICHANDHAN_MATTAPARTHI_CYBER_DOSSIER.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (downloadResumeBtn) downloadResumeBtn.addEventListener('click', triggerResumeDownload);
  if (modalDownloadAction) modalDownloadAction.addEventListener('click', triggerResumeDownload);

  // --------------------------------------------------------------------------
  // 9. Contact Section: Copy Email & Form Submission
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'mharichandhan@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          copyEmailBtn.classList.add('copied');
          setTimeout(() => copyEmailBtn.classList.remove('copied'), 2000);
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    });
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      if (copyEmailBtn) {
        copyEmailBtn.classList.add('copied');
        setTimeout(() => copyEmailBtn.classList.remove('copied'), 2000);
      }
    } catch (err) {
      console.warn('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }

  // Contact Form Handling (Builds mailto link & shows visual confirmation)
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = '[ERROR] All telemetry fields are mandatory.';
        }
        return;
      }

      // Generate mailto link
      const mailtoUrl = `mailto:mharichandhan@gmail.com?subject=${encodeURIComponent(
        `[Cyber Portfolio] ${subject}`
      )}&body=${encodeURIComponent(
        `Sender Name: ${name}\nSender Email: ${email}\n\nMessage Payload:\n${message}\n\n-- Transmitted via Portfolio Cyber Shell`
      )}`;

      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <i class="fa-solid fa-check-circle"></i> Packet prepared! Launching your mail client for <strong>mharichandhan@gmail.com</strong>...
        `;
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
    });
  }

  // --------------------------------------------------------------------------
  // 10. Back to Top Button with Scroll Progress Ring
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.querySelector('.progress-ring-circle');

  if (backToTopBtn && progressCircle) {
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;

    function updateScrollProgress() {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollCurrent = window.scrollY;

      if (scrollTotal > 0) {
        const scrollPercent = scrollCurrent / scrollTotal;
        const offset = circumference - scrollPercent * circumference;
        progressCircle.style.strokeDashoffset = offset;
      }

      if (scrollCurrent > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. Profile Image Fallback Handler
  // --------------------------------------------------------------------------
  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    profileImg.addEventListener('error', () => {
      profileImg.src = 'assets/avatar.svg';
    });
  }
});

