/**
 * ============================================================================
 * CK THEJASWINI — EDITORIAL PORTFOLIO JAVASCRIPT
 * Interactive Behaviors, Live Gap Analyser Simulator, Audio FX & Modal Engines
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. STATE & AUDIO ENGINE (WEB AUDIO API)
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
  }

  function playTickSound(freq = 520, duration = 0.04) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted or supported
    }
  }

  // --------------------------------------------------------------------------
  // 2. THEME SWITCHER (DARK / LIGHT EDITORIAL)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('thejaswini_theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
  }

  const savedTheme = localStorage.getItem('thejaswini_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      playTickSound(700, 0.05);
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} theme mode`);
    });
  }

  // --------------------------------------------------------------------------
  // 3. SOUND TOGGLE BUTTON
  // --------------------------------------------------------------------------
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');

  const savedSound = localStorage.getItem('thejaswini_sound');
  if (savedSound !== null) {
    soundEnabled = savedSound === 'true';
  }
  updateSoundIcon();

  function updateSoundIcon() {
    if (!soundIcon) return;
    soundIcon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('thejaswini_sound', soundEnabled);
      updateSoundIcon();
      if (soundEnabled) {
        playTickSound(880, 0.06);
      }
      showToast(soundEnabled ? 'Tactile Sound Effects Enabled' : 'Sound Effects Muted');
    });
  }

  // --------------------------------------------------------------------------
  // 4. LIVE BENGALURU (IST) CLOCK
  // --------------------------------------------------------------------------
  function updateISTClock() {
    try {
      const now = new Date();
      // Indian Standard Time (UTC+5:30)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      const timeString = formatter.format(now);

      const railClock = document.getElementById('rail-clock');
      const heroClock = document.getElementById('hero-clock');
      const footerClock = document.getElementById('footer-ist-clock');

      if (railClock) railClock.textContent = `IST ${timeString.slice(0, 5)}`;
      if (heroClock) heroClock.textContent = `${timeString} IST`;
      if (footerClock) footerClock.textContent = `${timeString} IST`;
    } catch (e) {
      // Timezone fallback
    }
  }
  updateISTClock();
  setInterval(updateISTClock, 1000);

  // --------------------------------------------------------------------------
  // 5. MOBILE NAVIGATION MENU
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      playTickSound(600, 0.04);
      const isOpen = navMenu.classList.contains('mobile-open');
      navMenu.classList.toggle('mobile-open', !isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
    });

    // Close on nav-link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, iconClass = 'fa-solid fa-circle-check') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'editorial-toast';
    toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 7. CLIPBOARD COPY UTILITIES
  // --------------------------------------------------------------------------
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playTickSound(780, 0.05);
      const textToCopy = btn.getAttribute('data-copy') || 'thejuck28@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied ${textToCopy} to clipboard!`);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied ${text} to clipboard!`);
  }

  // --------------------------------------------------------------------------
  // 8. MODAL WINDOWS CONTROLLER
  // --------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const caseStudyModal = document.getElementById('case-study-modal');

  function openModal(modal) {
    if (!modal) return;
    playTickSound(650, 0.06);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    playTickSound(450, 0.05);
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    // Check if other modal open
    const otherOpen = document.querySelector('.editorial-modal.active');
    if (!otherOpen) {
      document.body.style.overflow = '';
    }
  }

  // Trigger buttons for Resume Modal
  document.querySelectorAll('[data-open-resume], #nav-resume-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(resumeModal);
    });
  });

  // Close buttons for Resume Modal
  const closeResumeBtn = document.getElementById('modal-close-resume-btn');
  const backdropResume = document.getElementById('modal-backdrop-resume');
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', () => closeModal(resumeModal));
  if (backdropResume) backdropResume.addEventListener('click', () => closeModal(resumeModal));

  // Print button in Resume Modal
  const printResumeBtn = document.getElementById('modal-print-btn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      playTickSound(800, 0.08);
      window.print();
    });
  }

  // Case study modal triggers
  const openCaseStudyBtn = document.getElementById('open-case-study-btn');
  const closeCaseBtn = document.getElementById('modal-close-case-btn');
  const backdropCase = document.getElementById('modal-backdrop-case');
  const caseToSimBtn = document.getElementById('case-to-simulator-btn');

  if (openCaseStudyBtn) {
    openCaseStudyBtn.addEventListener('click', () => openModal(caseStudyModal));
  }
  if (closeCaseBtn) closeCaseBtn.addEventListener('click', () => closeModal(caseStudyModal));
  if (backdropCase) backdropCase.addEventListener('click', () => closeModal(caseStudyModal));

  if (caseToSimBtn) {
    caseToSimBtn.addEventListener('click', () => {
      closeModal(caseStudyModal);
      const simSection = document.getElementById('simulator');
      if (simSection) {
        simSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  document.querySelectorAll('.modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(caseStudyModal);
      closeModal(resumeModal);
    });
  });

  // ESC key to close any active modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(resumeModal);
      closeModal(caseStudyModal);
    }
  });

  // --------------------------------------------------------------------------
  // 9. INTERACTIVE LIVE "STUDENT GAP ANALYSER" SIMULATOR ENGINE
  // --------------------------------------------------------------------------
  const trackRequirements = {
    'python-backend': {
      title: 'Python & FastAPI Backend Developer',
      required: [
        { id: 'python', name: 'Python Fundamentals', weight: 25 },
        { id: 'fastapi', name: 'FastAPI & REST APIs', weight: 25 },
        { id: 'oop', name: 'Object-Oriented Programming', weight: 15 },
        { id: 'sql', name: 'SQL & Database Basics', weight: 15 },
        { id: 'git', name: 'Git & Version Control', weight: 10 },
        { id: 'logic', name: 'Problem-Solving & Logic', weight: 10 }
      ],
      defaultRecommendations: 'Build a CRUD service using FastAPI, SQLite, and Pydantic validation models.'
    },
    'full-stack': {
      title: 'Full-Stack Web Developer (Python + Web)',
      required: [
        { id: 'python', name: 'Python Fundamentals', weight: 20 },
        { id: 'html-css', name: 'HTML5 & CSS3 Layouts', weight: 20 },
        { id: 'fastapi', name: 'FastAPI & REST APIs', weight: 20 },
        { id: 'sql', name: 'SQL & Database Basics', weight: 15 },
        { id: 'git', name: 'Git & Version Control', weight: 15 },
        { id: 'logic', name: 'Problem-Solving & Logic', weight: 10 }
      ],
      defaultRecommendations: 'Create a responsive web dashboard that consumes FastAPI REST endpoints via fetch requests.'
    },
    'java-developer': {
      title: 'Core Java & Software Developer',
      required: [
        { id: 'java', name: 'Java Core & Syntax', weight: 30 },
        { id: 'oop', name: 'Object-Oriented Programming (OOP)', weight: 25 },
        { id: 'logic', name: 'Problem-Solving & Logic', weight: 20 },
        { id: 'sql', name: 'SQL & Database Basics', weight: 15 },
        { id: 'git', name: 'Git & Version Control', weight: 10 }
      ],
      defaultRecommendations: 'Practice Java Collections Framework, multi-threading basics, and build a modular OOP project.'
    },
    'sde-general': {
      title: 'General SDE Intern (Data Structures & Logic)',
      required: [
        { id: 'logic', name: 'Problem-Solving & Logic', weight: 30 },
        { id: 'oop', name: 'Object-Oriented Programming (OOP)', weight: 25 },
        { id: 'python', name: 'Python Fundamentals', weight: 20 },
        { id: 'git', name: 'Git & Version Control', weight: 15 },
        { id: 'html-css', name: 'HTML5 & CSS3 Layouts', weight: 10 }
      ],
      defaultRecommendations: 'Focus on algorithmic problem solving (arrays, strings, recursion) and modular design.'
    }
  };

  const trackSelect = document.getElementById('career-track-select');
  const checklistContainer = document.getElementById('sim-skill-checklist');
  const runSimBtn = document.getElementById('run-gap-analysis-btn');
  const scoreValEl = document.getElementById('sim-score-val');
  const verdictEl = document.getElementById('sim-verdict');
  const gapsListEl = document.getElementById('sim-gaps-list');
  const recommendTextEl = document.getElementById('sim-recommend-text');

  function calculateGap() {
    playTickSound(720, 0.07);
    if (!trackSelect || !checklistContainer) return;

    const selectedTrackKey = trackSelect.value;
    const track = trackRequirements[selectedTrackKey] || trackRequirements['python-backend'];

    // Gather selected checkboxes
    const checkedValues = new Set();
    checklistContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      checkedValues.add(cb.value);
    });

    let totalScore = 0;
    const missingSkills = [];

    track.required.forEach(item => {
      if (checkedValues.has(item.id)) {
        totalScore += item.weight;
      } else {
        missingSkills.push(item.name);
      }
    });

    totalScore = Math.min(100, Math.max(0, totalScore));

    // Update Score Circle with gentle animation
    if (scoreValEl) {
      animateCounter(scoreValEl, totalScore);
    }

    // Update Verdict
    if (verdictEl) {
      let tagClass = 'ready-tag';
      let tagText = 'Strong Academic Base';
      let desc = 'You have strong fundamentals. Focus on the identified gaps to achieve 100% internship readiness!';

      if (totalScore >= 85) {
        tagText = 'Industry-Ready Candidate';
        desc = 'Outstanding competency alignment! You are well-positioned for competitive software developer internships.';
      } else if (totalScore < 50) {
        tagText = 'Foundational Phase';
        desc = 'Focus on core programming syntax and project-based assignments to build up your baseline readiness.';
      }

      verdictEl.innerHTML = `
        <span class="verdict-tag ${tagClass}">${tagText}</span>
        <p class="verdict-text">${desc}</p>
      `;
    }

    // Update Gaps List
    if (gapsListEl) {
      if (missingSkills.length === 0) {
        gapsListEl.innerHTML = `<li style="color: var(--accent-success); border-color: rgba(52,211,153,0.3); background: rgba(52,211,153,0.1);">None! All benchmark requirements verified</li>`;
      } else {
        gapsListEl.innerHTML = missingSkills.map(s => `<li>${s}</li>`).join('');
      }
    }

    // Update Recommendation Text
    if (recommendTextEl) {
      if (missingSkills.length === 0) {
        recommendTextEl.textContent = 'Ready for production challenges! Build an end-to-end deployed portfolio piece and start applying for internship roles.';
      } else {
        recommendTextEl.textContent = `${track.defaultRecommendations} Specifically target: ${missingSkills.slice(0, 2).join(' & ')}.`;
      }
    }
  }

  function animateCounter(el, targetVal) {
    let current = 0;
    const step = Math.ceil(targetVal / 15);
    const timer = setInterval(() => {
      current += step;
      if (current >= targetVal) {
        current = targetVal;
        clearInterval(timer);
      }
      el.textContent = `${current}%`;
    }, 25);
  }

  if (runSimBtn) {
    runSimBtn.addEventListener('click', calculateGap);
  }

  if (trackSelect) {
    trackSelect.addEventListener('change', () => {
      playTickSound(500, 0.03);
      calculateGap();
    });
  }

  // --------------------------------------------------------------------------
  // 10. SKILLS MATRIX FILTER TABS
  // --------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.skills-filter-tabs .filter-tab');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playTickSound(620, 0.04);
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterVal = tab.getAttribute('data-filter') || 'all';

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 11. CONTACT FORM VALIDATION & SUBMISSION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('portfolio-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      // Validation
      [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
        if (!field) return;
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      });

      // Email format check
      if (emailInput && emailInput.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const group = emailInput.closest('.form-group');
        if (!emailPattern.test(emailInput.value.trim())) {
          group.classList.add('has-error');
          isValid = false;
        }
      }

      if (isValid) {
        playTickSound(880, 0.09);
        const submitBtn = document.getElementById('form-submit-btn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>TRANSMITTING...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        }

        setTimeout(() => {
          showToast(`Thank you! Your message has been sent to CK Thejaswini.`);
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span class="btn-text">TRANSMIT MESSAGE</span> <i class="fa-solid fa-arrow-right-long"></i>`;
          }
        }, 1200);
      } else {
        playTickSound(300, 0.08);
      }
    });

    // Clear error on input
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12. SCROLLSPY NAVIGATION
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('.editorial-section');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 13. PARALLAX & ROTATION HOVER ON PORTRAIT HERO
  // --------------------------------------------------------------------------
  const portraitContainer = document.querySelector('.portrait-stage-container');
  if (portraitContainer) {
    portraitContainer.addEventListener('mousemove', (e) => {
      const rect = portraitContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      portraitContainer.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });

    portraitContainer.addEventListener('mouseleave', () => {
      portraitContainer.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
  }

  // Initialize Simulator on page load
  calculateGap();

})();
