/* ========================================================
   HEALER WORKSHOP — COMPLETE INTERACTIONS & AUDIENCE SYNC
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const audienceKey = (params.get("audience") || "students").toLowerCase();

  const store =
    typeof AUDIENCES_DATA !== "undefined"
      ? AUDIENCES_DATA
      : typeof audiencesData !== "undefined"
        ? audiencesData
        : null;

  const audience = store ? store[audienceKey] || store.students || null : null;

  /* ------------------------------------------------------
     1. SCROLL PROGRESS & REVEAL ANIMATIONS
     ------------------------------------------------------ */
  const progressBar = document.querySelector(".scroll-progress");
  const updateProgress = () => {
    if (!progressBar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ------------------------------------------------------
     2. SMART MOBILE STICKY CTA
     ------------------------------------------------------ */
  const stickyBar = document.querySelector(".mobile-sticky-cta");
  const heroEl = document.querySelector(".hero-center");
  const finalEl = document.querySelector(".final-cta-banner");

  if (stickyBar && heroEl && finalEl && "IntersectionObserver" in window) {
    let heroInView = true;
    let finalInView = false;

    const syncSticky = () => {
      stickyBar.classList.toggle("is-visible", !heroInView && !finalInView);
    };

    const stickyObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroEl) heroInView = entry.isIntersecting;
          if (entry.target === finalEl) finalInView = entry.isIntersecting;
        });
        syncSticky();
      },
      { threshold: 0.15 }
    );

    stickyObs.observe(heroEl);
    stickyObs.observe(finalEl);
  }

  /* ------------------------------------------------------
      3. ENTRY PAGE (index.html) PATH SELECTION
      ------------------------------------------------------ */
  const cards = Array.from(document.querySelectorAll(".identity-card"));
  const nextPathBtn =
    document.getElementById("discoverPathBtn") ||
    document.querySelector(".entry-cta-wrap .btn-primary") ||
    document.querySelector(".entry-cta-wrap button");
  const hintEl = document.getElementById("selectionHint") || document.querySelector(".selection-hint");

  if (cards.length > 0) {
    let chosen = "";

    const selectCard = (card) => {
      cards.forEach((c) => {
        c.classList.remove("is-selected");
        c.setAttribute("aria-checked", "false");
      });

      card.classList.add("is-selected");
      card.setAttribute("aria-checked", "true");

      const headingText = card.querySelector("strong")?.textContent?.trim().toLowerCase() || "";
      let inferredKey = "students";
      if (headingText.includes("mid-career") || headingText.includes("professional")) {
        inferredKey = "professionals";
      } else if (headingText.includes("homemaker")) {
        inferredKey = "homemakers";
      } else if (headingText.includes("parent")) {
        inferredKey = "parents";
      } else if (headingText.includes("retired") || headingText.includes("senior")) {
        inferredKey = "retired";
      }

      chosen =
        card.dataset.audience ||
        card.dataset.path ||
        card.dataset.value ||
        card.getAttribute("data-audience") ||
        inferredKey;

      if (nextPathBtn) {
        nextPathBtn.disabled = false;
        nextPathBtn.removeAttribute("disabled");
      }

      const label = card.querySelector("strong")?.textContent?.trim() || chosen;
      if (hintEl) {
        hintEl.textContent = `Selected: ${label} — click Discover My Path to continue.`;
      }
    };

    cards.forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", (e) => {
        e.preventDefault();
        selectCard(card);
      });
    });

    if (nextPathBtn) {
      nextPathBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetAudience = chosen || "students";
        window.location.href = `workshop.html?audience=${encodeURIComponent(targetAudience)}`;
      });
    }
  }

  /* ------------------------------------------------------
     4. AUDIENCE CONTENT HYDRATION (KEEPS ALL SECTIONS & IMAGES)
     ------------------------------------------------------ */
  if (audience) {
    const heroTitle = document.querySelector(".hero-title");
    const heroSub = document.querySelector(".hero-subtitle");
    const editionPill = document.querySelector(".edition-pill");

    if (typeof audience.heroTitle === "string" && audience.heroTitle.trim() && heroTitle) {
      heroTitle.innerHTML = audience.heroTitle;
    }
    if (typeof audience.heroSubtitle === "string" && audience.heroSubtitle.trim() && heroSub) {
      heroSub.textContent = audience.heroSubtitle;
    }
    if (typeof audience.badge === "string" && audience.badge.trim() && editionPill) {
      editionPill.innerHTML = `<span class="live-dot"></span>${audience.badge}`;
    }

    // Update only text inside existing discovery cards so <img> elements remain in place
    const discoveryCards = document.querySelectorAll("#discoveriesGrid .art-card");
    if (Array.isArray(audience.discoveries) && discoveryCards.length > 0) {
      audience.discoveries.slice(0, discoveryCards.length).forEach((item, idx) => {
        if (!item) return;
        const card = discoveryCards[idx];
        const badgeEl = card.querySelector(".day-float-badge");
        const titleEl = card.querySelector(".art-card-body h3");
        const descEl = card.querySelector(".art-card-body p");
        const imgEl = card.querySelector(".art-img");

        if (badgeEl && item.badge) badgeEl.textContent = item.badge;
        if (titleEl && item.title) titleEl.textContent = item.title;
        if (descEl && (item.desc || item.description)) {
          descEl.textContent = item.desc || item.description;
        }
        if (imgEl) {
          const fallbackImg = `assets/discovery-${idx + 1}.png`;
          const targetImg = item.img || item.image || fallbackImg;
          if (!imgEl.getAttribute("src")) {
            imgEl.setAttribute("src", targetImg);
          }
        }
      });
    }
  }

  /* ------------------------------------------------------
     5. 10-DAY BLUEPRINT VAULT SWITCHER
     ------------------------------------------------------ */
  const defaultDays = [
    { day: 1, tag: "Days 1–5 · Discover Who You Are", short: "Driving Force", title: "Day 1 — Discover your driving force", desc: "Uncover the core inner motivation that energises your best work and keeps you moving forward." },
    { day: 2, tag: "Days 1–5 · Discover Who You Are", short: "Flow & Genius", title: "Day 2 — Unlock your flow state and zone of genius", desc: "Identify the activities where time disappears and your natural talent performs effortlessly." },
    { day: 3, tag: "Days 1–5 · Discover Who You Are", short: "Core Values", title: "Day 3 — Define your non-negotiable core values", desc: "Clarify what matters most so your career choices feel authentic rather than borrowed." },
    { day: 4, tag: "Days 1–5 · Discover Who You Are", short: "Personality Fit", title: "Day 4 — Map your personality and work style", desc: "See which environments, teams, and problem types help you thrive long-term." },
    { day: 5, tag: "Days 1–5 · Discover Who You Are", short: "Strengths Audit", title: "Day 5 — Audit your hidden strengths and signals", desc: "Connect everyday wins and feedback into a clear picture of what you do well." },
    { day: 6, tag: "Days 6–8 · Align Purpose & Direction", short: "Purpose Bridge", title: "Day 6 — Bridge your strengths with real-world problems", desc: "See how your natural gifts translate into meaningful paths and roles." },
    { day: 7, tag: "Days 6–8 · Align Purpose & Direction", short: "Career Options", title: "Day 7 — Filter high-fit career directions", desc: "Narrow noisy options down to paths that match your curiosity, lifestyle, and growth goals." },
    { day: 8, tag: "Days 6–8 · Align Purpose & Direction", short: "Life Vision", title: "Day 8 — Shape your 3-to-5-year life vision", desc: "Align your career choice with the kind of day-to-day life and freedom you want." },
    { day: 9, tag: "Days 9–10 · Build Your Roadmap", short: "No. 1 Blueprint", title: "Day 9 — Lock in your No. 1 career blueprint", desc: "Commit to a clear primary direction with confidence instead of second-guessing." },
    { day: 10, tag: "Days 9–10 · Build Your Roadmap", short: "Action Roadmap", title: "Day 10 — Build your 30-day action roadmap", desc: "Turn clarity into concrete weekly steps, skills to explore, and milestones to start right away." }
  ];

  const daysList =
    audience && Array.isArray(audience.days) && audience.days.length === 10
      ? audience.days
      : defaultDays;

  const pillsGrid = document.getElementById("secretPillsGrid");
  const stageBadge = document.getElementById("stageDayBadge");
  const stageTag = document.getElementById("stageTag");
  const stageTitle = document.getElementById("stageTitle");
  const stageDesc = document.getElementById("stageDesc");
  const stageFill = document.getElementById("stageProgressFill");
  const prevBtn = document.getElementById("prevDayBtn");
  const nextBtn = document.getElementById("nextDayBtn");
  const stageNext = document.getElementById("stageNextCta");

  let currentDayIdx = 0;

  const showDay = (idx) => {
    const safeIdx = ((idx % daysList.length) + daysList.length) % daysList.length;
    currentDayIdx = safeIdx;
    const d = daysList[safeIdx] || defaultDays[safeIdx];
    const num = d.day || safeIdx + 1;

    if (stageBadge) stageBadge.textContent = `DAY ${String(num).padStart(2, "0")} OF 10`;
    if (stageTag && d.tag) stageTag.textContent = d.tag;
    if (stageTitle && d.title) stageTitle.textContent = d.title;
    if (stageDesc && d.desc) stageDesc.textContent = d.desc;
    if (stageFill) stageFill.style.width = `${((safeIdx + 1) / daysList.length) * 100}%`;

    if (pillsGrid) {
      pillsGrid.querySelectorAll(".secret-pill-btn").forEach((btn, i) => {
        const active = i === safeIdx;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", String(active));
      });
    }
  };

  if (pillsGrid) {
    pillsGrid.innerHTML = daysList
      .map((d, i) => {
        const num = String((d && d.day) || i + 1).padStart(2, "0");
        const label = (d && d.short) || `Day ${num}`;
        return `
          <button type="button" class="secret-pill-btn ${i === 0 ? "is-active" : ""}" aria-pressed="${i === 0}">
            <span class="pill-num">D${num}</span>
            <span class="pill-short">${label}</span>
          </button>
        `;
      })
      .join("");

    pillsGrid.querySelectorAll(".secret-pill-btn").forEach((btn, i) => {
      btn.addEventListener("click", () => showDay(i));
    });
  }

  prevBtn?.addEventListener("click", () => showDay(currentDayIdx - 1));
  nextBtn?.addEventListener("click", () => showDay(currentDayIdx + 1));
  stageNext?.addEventListener("click", () => showDay(currentDayIdx + 1));

  if (stageBadge || stageTitle) showDay(0);

  /* ------------------------------------------------------
     6. FAQ ACCORDION
     ------------------------------------------------------ */
  document.querySelectorAll(".faq-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const panel = item?.querySelector(".faq-body");
      if (!item || !panel) return;

      const open = item.classList.contains("is-open");
      item.classList.toggle("is-open", !open);
      btn.setAttribute("aria-expanded", String(!open));
      panel.style.maxHeight = !open ? `${panel.scrollHeight}px` : "0px";
    });
  });

  /* ------------------------------------------------------
     7. REGISTRATION MODAL
     ------------------------------------------------------ */
  const modal = document.getElementById("registerModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const form = document.getElementById("registerForm");
  const successBox = document.getElementById("registerSuccess");
  const resetBtn = document.getElementById("resetRegisterBtn");

  const openRegModal = () => {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeRegModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".open-modal-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openRegModal();
    });
  });

  closeBtn?.addEventListener("click", closeRegModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeRegModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) closeRegModal();
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (successBox) {
      form.hidden = true;
      successBox.hidden = false;
    }
  });

  resetBtn?.addEventListener("click", () => {
    if (form && successBox) {
      form.reset();
      successBox.hidden = true;
      form.hidden = false;
    }
  });
});