// ========================================================
// HEALER MASTERMIND – VAULT, KINETIC STATS, REVEAL & MODAL
// ========================================================

const MASTERMIND_SECRETS = [
  { short: "Clarity Code", tag: "Self-Awareness", title: "The Personality Clarity Code", desc: "Uncover how your natural traits shape your decisions, energy, and blind spots so you stop working against yourself." },
  { short: "Overthinking Loop", tag: "Mental Reset", title: "Breaking the Overthinking Loop", desc: "Learn a 3-step mental reset that stops analysis paralysis and turns hesitation into calm, decisive action." },
  { short: "Emotional Reset", tag: "Resilience", title: "Emotional Reset Framework", desc: "Practical grounding tools to handle stress, negative spirals, and sudden pressure without burning out." },
  { short: "Energy Alignment", tag: "Peak Focus", title: "The Energy Alignment Formula", desc: "Audit the habits, environments, and commitments draining your focus—and redesign your week around peak energy." },
  { short: "True Confidence", tag: "Inner Strength", title: "Authentic Confidence Blueprint", desc: "Build quiet, unshakable self-trust so you can speak up, lead, and make bold choices without second-guessing." },
  { short: "Boundary Mastery", tag: "Relationships", title: "Boundary Mastery", desc: "Protect your time and emotional space in work and relationships with clear, respectful, guilt-free boundaries." },
  { short: "Career Alignment", tag: "Direction", title: "Career & Purpose Alignment", desc: "Map your personality strengths to real-world career paths and projects that keep you fulfilled long-term." },
  { short: "Communication", tag: "Influence", title: "High-Clarity Communication", desc: "Master listening, direct expression, and empathy so your conversations build deeper trust effortlessly." },
  { short: "Habit Architecture", tag: "90-Day System", title: "90-Day Habit Architecture", desc: "Design frictionless daily routines that lock in your workshop breakthroughs over the next 90 days." },
  { short: "Healer Mindset", tag: "Long-Term Growth", title: "The Healer Mindset", desc: "Integrate self-awareness, resilience, and continuous growth into a sustainable lifestyle you actually enjoy." }
];

// 1. Live Reading Progress Bar
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? `${(window.scrollY / docHeight) * 100}%` : "0%";
  }, { passive: true });
}

// 2. Scroll Reveal
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
}

// 3. Interactive 10 Secrets Vault
function initSecretsVault() {
  const grid = document.getElementById("secretPillsGrid");
  const badge = document.getElementById("stageSecretBadge");
  const tag = document.getElementById("stageTag");
  const title = document.getElementById("stageTitle");
  const desc = document.getElementById("stageDesc");
  const content = document.getElementById("stageContent");
  const fill = document.getElementById("stageProgressFill");
  const prevBtn = document.getElementById("prevSecretBtn");
  const nextBtn = document.getElementById("nextSecretBtn");

  if (!grid) return;

  let activeIndex = 0;

  grid.innerHTML = MASTERMIND_SECRETS.map((item, idx) => {
    const num = String(idx + 1).padStart(2, "0");
    return `
      <button type="button" class="secret-pill-btn ${idx === 0 ? "is-active" : ""}" data-index="${idx}" role="tab" aria-selected="${idx === 0}">
        <span class="pill-num">${num}</span>
        <span class="pill-short">${item.short}</span>
      </button>
    `;
  }).join("");

  const pills = grid.querySelectorAll(".secret-pill-btn");

  function showSecret(index) {
    activeIndex = (index + MASTERMIND_SECRETS.length) % MASTERMIND_SECRETS.length;
    const item = MASTERMIND_SECRETS[activeIndex];
    const num = String(activeIndex + 1).padStart(2, "0");

    pills.forEach((btn, i) => {
      const active = i === activeIndex;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    badge.textContent = `SECRET ${num} OF 10`;
    tag.textContent = item.tag;
    title.textContent = item.title;
    desc.textContent = item.desc;
    fill.style.width = `${((activeIndex + 1) / MASTERMIND_SECRETS.length) * 100}%`;

    // Re-trigger smooth fade animation
    content.style.animation = "none";
    content.offsetHeight;
    content.style.animation = "";
  }

  pills.forEach(btn => {
    btn.addEventListener("click", () => showSecret(Number(btn.dataset.index)));
  });

  prevBtn?.addEventListener("click", () => showSecret(activeIndex - 1));
  nextBtn?.addEventListener("click", () => showSecret(activeIndex + 1));

  showSecret(0);
}

// 4. Count-Up Animation for Open Kinetic Stats
function initStatsCounter() {
  const statEls = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();

      function tick(now) {
        const p = Math.min((now - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });
  statEls.forEach(el => observer.observe(el));
}

// 5. Registration Modal
function initRegisterModal() {
  const modal = document.getElementById("registerModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const form = document.getElementById("registerForm");
  const successBox = document.getElementById("registerSuccess");
  if (!modal) return;

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };
  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  document.querySelectorAll(".open-register-modal").forEach(btn => btn.addEventListener("click", openModal));
  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  form?.addEventListener("submit", e => {
    e.preventDefault();
    form.hidden = true;
    successBox.hidden = false;
  });
}

initScrollProgress();
initScrollReveal();
initSecretsVault();
initStatsCounter();
initRegisterModal();