// ========================================================
// HEALER – ENTRY SELECTOR, 5-AUDIENCE ENGINE & ANALYTICS
// ========================================================

// Anonymous visitor/session ID for analytics readiness
function getVisitorId() {
  let id = localStorage.getItem("healer_visitor_id");
  if (!id) {
    id = "vis_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem("healer_visitor_id", id);
  }
  return id;
}

// Lightweight event tracker (ready to connect to backend / GA4)
function trackEvent(eventName, payload = {}) {
  const params = new URLSearchParams(window.location.search);
  const event = {
    event_id: "evt_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6),
    event_name: eventName,
    visitor_id: getVisitorId(),
    timestamp: new Date().toISOString(),
    source: params.get("utm_source") || "direct",
    campaign: params.get("utm_campaign") || "none",
    ...payload
  };

  const log = JSON.parse(localStorage.getItem("healer_events_log") || "[]");
  log.push(event);
  localStorage.setItem("healer_events_log", JSON.stringify(log.slice(-50)));
  // Ready for backend: fetch("/api/events", { method: "POST", body: JSON.stringify(event) })
}

// ========================================================
// PAGE 1: COMMON ENTRY PAGE (index.html)
// ========================================================
function initEntryPage() {
  const cards = document.querySelectorAll(".identity-card");
  const continueBtn = document.getElementById("continuePathBtn");
  const hint = document.getElementById("selectionHint");
  if (!cards.length || !continueBtn) return;

  let selectedAudience = localStorage.getItem("healer_selected_identity") || "";

  function applySelection(key, isUserClick = false) {
    selectedAudience = key;
    cards.forEach(card => {
      const match = card.dataset.audience === key;
      card.classList.toggle("is-selected", match);
      card.setAttribute("aria-checked", String(match));
    });

    if (selectedAudience && AUDIENCES_DATA[selectedAudience]) {
      continueBtn.disabled = false;
      hint.textContent = `Selected: ${AUDIENCES_DATA[selectedAudience].label} — click Discover My Path to continue.`;
      if (isUserClick) {
        localStorage.setItem("healer_selected_identity", selectedAudience);
        trackEvent("identity_selected", { selected_identity: selectedAudience });
      }
    }
  }

  // Restore previous choice if user came back to change path
  if (selectedAudience && AUDIENCES_DATA[selectedAudience]) {
    applySelection(selectedAudience, false);
  }

  cards.forEach(card => {
    card.addEventListener("click", () => applySelection(card.dataset.audience, true));
  });

  continueBtn.addEventListener("click", () => {
    if (!selectedAudience) return;
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("audience", selectedAudience);
    window.location.href = `workshop.html?${currentParams.toString()}`;
  });
}

// ========================================================
// PAGE 2: SHARED 5-AUDIENCE LANDING PAGE (workshop.html)
// ========================================================
function initWorkshopPage() {
  const params = new URLSearchParams(window.location.search);
  const urlAudience = params.get("audience");
  const savedAudience = localStorage.getItem("healer_selected_identity");
  const key = AUDIENCES_DATA[urlAudience] ? urlAudience : (AUDIENCES_DATA[savedAudience] ? savedAudience : "students");
  const data = AUDIENCES_DATA[key];

  // Track landing view (keep selected identity separate from inferred page audience)
  trackEvent("landing_view", {
    landing_audience: key,
    selected_identity: savedAudience || null,
    is_direct_visit: !savedAudience
  });

  document.title = data.pageTitle;

  // 01. Hero & Editable Session Metadata
  document.getElementById("heroBadge").textContent = data.heroBadge;
  document.getElementById("heroTitle").innerHTML = data.heroTitle;
  document.getElementById("heroSubtitle").textContent = data.heroSubtitle;
  document.getElementById("heroCtaBtn").textContent = data.heroCta;
  document.getElementById("metaDate").textContent = WORKSHOP_CONFIG.date;
  document.getElementById("metaTime").textContent = WORKSHOP_CONFIG.time;
  document.getElementById("metaDuration").textContent = WORKSHOP_CONFIG.duration;

  // 02. Is This You?
  document.getElementById("painPointsList").innerHTML = data.painPoints
    .map(item => `<li><span class="pain-check" aria-hidden="true">✦</span><span>${item}</span></li>`)
    .join("");
  document.getElementById("painPointsClosing").textContent = data.painClosing;

  // 03. Three Powerful Discoveries
  document.getElementById("discoveriesGrid").innerHTML = data.discoveries.map((d, i) => `
    <article class="art-card reveal" style="--delay: ${i * 120}ms">
      <div class="art-media-box art-fallback-${i + 1}">
        <span class="day-float-badge">${d.badge}</span>
        <img src="${d.img}" alt="${d.title}" class="art-img" onerror="this.style.display='none';" />
        <div class="art-orb orb-a" aria-hidden="true"></div>
        <div class="art-orb orb-b" aria-hidden="true"></div>
      </div>
      <div class="art-card-body">
        <h3>${d.title}</h3>
        <p>${d.desc}</p>
      </div>
    </article>
  `).join("");

  // 04. 10-Day Blueprint Interactive Vault
  document.getElementById("challengeSub").textContent = data.challengeSub;
  initTenDayVault(data.days);

  // 05 & 06. Outcomes, Different & Who Should Attend
  document.getElementById("outcomesHeading").textContent = data.outcomesHeading;
  document.getElementById("outcomesList").innerHTML = data.outcomes
    .map(item => `<li><span class="outcome-dot" aria-hidden="true">✓</span><span>${item}</span></li>`)
    .join("");
  document.getElementById("outcomesNote").textContent = data.outcomesNote;
  document.getElementById("differentText").textContent = data.differentText;
  document.getElementById("whoShouldAttend").textContent = data.whoShouldAttend;

  // 07. Testimonials Subtitle
  document.getElementById("testimonialsSub").textContent = data.testimonialsSub;

  // 10. FAQ Accordion
  renderFaqs(data.faqs);

  // 11. Final CTA
  document.getElementById("finalCtaHeading").textContent = data.finalHeading;
  document.getElementById("finalCtaSub").textContent = data.finalSub;

  // Registration Modal (tailored for Parents vs Individual)
  initRegisterModal(data);
  initScrollProgress();
  initScrollReveal();
}

function initTenDayVault(days) {
  const grid = document.getElementById("dayPillsGrid");
  const badge = document.getElementById("stageDayBadge");
  const phase = document.getElementById("stagePhase");
  const title = document.getElementById("stageTitle");
  const desc = document.getElementById("stageDesc");
  const content = document.getElementById("stageContent");
  const fill = document.getElementById("stageProgressFill");
  const prevBtn = document.getElementById("prevDayBtn");
  const nextBtn = document.getElementById("nextDayBtn");
  if (!grid) return;

  let activeIndex = 0;

  grid.innerHTML = days.map((item, idx) => {
    const num = String(idx + 1).padStart(2, "0");
    return `
      <button type="button" class="secret-pill-btn ${idx === 0 ? "is-active" : ""}" data-index="${idx}" role="tab" aria-selected="${idx === 0}">
        <span class="pill-num">D${num}</span>
        <span class="pill-short">${item.short}</span>
      </button>
    `;
  }).join("");

  const pills = grid.querySelectorAll(".secret-pill-btn");

  function showDay(index) {
    activeIndex = (index + days.length) % days.length;
    const item = days[activeIndex];
    const num = String(activeIndex + 1).padStart(2, "0");

    pills.forEach((btn, i) => {
      const active = i === activeIndex;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    badge.textContent = `DAY ${num} OF 10`;
    phase.textContent = item.phase;
    title.textContent = item.title;
    desc.textContent = item.desc;
    fill.style.width = `${((activeIndex + 1) / days.length) * 100}%`;

    content.style.animation = "none";
    content.offsetHeight;
    content.style.animation = "";
  }

  pills.forEach(btn => btn.addEventListener("click", () => showDay(Number(btn.dataset.index))));
  prevBtn?.addEventListener("click", () => showDay(activeIndex - 1));
  nextBtn?.addEventListener("click", () => showDay(activeIndex + 1));
  showDay(0);
}

function renderFaqs(faqs) {
  const list = document.getElementById("faqList");
  if (!list) return;

  list.innerHTML = faqs.map((item, idx) => `
    <article class="faq-item ${idx === 0 ? "is-open" : ""}">
      <button type="button" class="faq-trigger" aria-expanded="${idx === 0}">
        <span>${item.q}</span>
        <span class="faq-plus" aria-hidden="true">+</span>
      </button>
      <div class="faq-body" style="${idx === 0 ? "max-height: 200px;" : ""}">
        <div class="faq-body-inner">${item.a}</div>
      </div>
    </article>
  `).join("");

  list.querySelectorAll(".faq-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".faq-item");
      const body = card.querySelector(".faq-body");
      const isOpen = card.classList.contains("is-open");

      list.querySelectorAll(".faq-item").forEach(other => {
        other.classList.remove("is-open");
        other.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-body").style.maxHeight = null;
      });

      if (!isOpen) {
        card.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
}

function initRegisterModal(audienceData) {
  const modal = document.getElementById("registerModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const form = document.getElementById("registerForm");
  const successBox = document.getElementById("registerSuccess");
  const audienceTag = document.getElementById("modalAudienceTag");
  const nameLabel = document.getElementById("nameFieldLabel");
  const participantField = document.getElementById("participantNameField");
  if (!modal) return;

  audienceTag.textContent = `Free Masterclass · ${audienceData.label}`;
  if (audienceData.isParentFlow) {
    nameLabel.textContent = "Parent / Guardian Full Name";
    participantField.hidden = false;
  } else {
    nameLabel.textContent = "Full Name";
    participantField.hidden = true;
  }

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
    trackEvent("masterclass_registered", {
      audience_tag: audienceData.key,
      is_parent_registration: audienceData.isParentFlow
    });
    form.hidden = true;
    successBox.hidden = false;
  });
}

function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? `${(window.scrollY / docHeight) * 100}%` : "0%";
  }, { passive: true });
}

function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// Boot based on current page
if (document.body.dataset.page === "entry") {
  initEntryPage();
} else if (document.body.dataset.page === "workshop") {
  initWorkshopPage();
}