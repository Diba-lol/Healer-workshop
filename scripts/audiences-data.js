// ========================================================
// HEALER – 5-AUDIENCE CONTENT CONFIG (SEO & OUTCOME UPDATED)
// ========================================================

const WORKSHOP_CONFIG = {
  date: "Sunday, 30 Nov 2026",   // Edit before launch
  time: "11:00 AM IST",          // Edit before launch
  duration: "90 Minutes",        // Edit before launch
  mode: "Online"
};

const STANDARD_10_DAYS = [
  { phase: "Days 1–5 · Discover Who You Are", short: "Driving Force", title: "Day 1 — Discover your driving force", desc: "Uncover the core inner motivation that energises your best work and keeps you moving forward." },
  { phase: "Days 1–5 · Discover Who You Are", short: "Zone of Genius", title: "Day 2 — Unlock your flow state and zone of genius", desc: "Identify the activities where time disappears and your natural talent performs effortlessly." },
  { phase: "Days 1–5 · Discover Who You Are", short: "Core Values", title: "Day 3 — Identify your core values", desc: "Clarify the non-negotiable values that must be honoured for you to feel genuinely fulfilled." },
  { phase: "Days 1–5 · Discover Who You Are", short: "Strengths", title: "Day 4 — Understand your strengths and weaknesses", desc: "Map where you naturally excel and where you drain energy, so you stop forcing the wrong fit." },
  { phase: "Days 1–5 · Discover Who You Are", short: "Personality", title: "Day 5 — Decode your personality type", desc: "Understand how your personality shapes your work style, environment needs, and decision-making." },
  { phase: "Days 6–9 · Discover What You Are Meant to Do", short: "Top 3 Choices", title: "Day 6 — Discover your multiple intelligences & top three career choices", desc: "Explore your multiple intelligences and narrow down your top three aligned career possibilities." },
  { phase: "Days 6–9 · Discover What You Are Meant to Do", short: "3P Framework", title: "Day 7 — Apply the 3P Framework to evaluate your options", desc: "Test your top options against a structured framework so your choice is both meaningful and practical." },
  { phase: "Days 6–9 · Discover What You Are Meant to Do", short: "Life Vision", title: "Day 8 — Write your life vision statement", desc: "Define the long-term life you are building so your career supports your whole life—not just a job title." },
  { phase: "Days 6–9 · Discover What You Are Meant to Do", short: "No. 1 Blueprint", title: "Day 9 — Align your results into a personalised blueprint", desc: "Bring every assessment insight together into one clear blueprint supporting your No. 1 career choice." },
  { phase: "Day 10 · Discover How to Get There", short: "Action Roadmap", title: "Day 10 — Create your personalised career roadmap", desc: "Turn clarity into a practical, step-by-step action plan you can start executing immediately." }
];

const RETIRED_10_DAYS = [
  ...STANDARD_10_DAYS.slice(0, 5),
  { phase: "Days 6–9 · Discover What You Are Meant to Do", short: "3 Pursuits", title: "Day 6 — Explore multiple intelligences & narrow down three meaningful pursuits", desc: "Explore your multiple intelligences and identify three fulfilling pursuits—paid or unpaid." },
  STANDARD_10_DAYS[6],
  STANDARD_10_DAYS[7],
  { phase: "Days 6–9 · Discover What You Are Meant to Do", short: "Blueprint", title: "Day 9 — Align your insights into a personalised blueprint", desc: "Combine your self-discovery insights into a personalised blueprint for your preferred direction." },
  { phase: "Day 10 · Discover How to Get There", short: "Next Chapter", title: "Day 10 — Create a practical roadmap for your next chapter", desc: "Build a realistic, energising roadmap that respects your health, energy, and priorities." }
];

const AUDIENCES_DATA = {
  students: {
    key: "students",
    label: "Students",
    pageTitle: "Career Clarity Workshop for Students | Find Your No. 1 Career in 10 Days – Healer",
    heroBadge: "FREE LIFE PURPOSE & CAREER CLARITY WORKSHOP · STUDENTS",
    heroTitle: 'Confused About Your Career? Find Your <span class="text-gradient">No. 1 Career Choice in 10 Days.</span>',
    heroSubtitle: "Go from career confusion to a purpose- and passion-aligned career roadmap—discover your natural strengths through psychometric assessment before choosing the wrong degree.",
    heroCta: "Discover My Right Career – Register Free",
    painPoints: [
      "You are unsure which degree or career to pursue.",
      "You have too many interests or have not discovered what you enjoy yet.",
      "Family and friends give you conflicting career advice.",
      "You worry about investing time and money in the wrong course.",
      "You want a meaningful future but do not know where to begin."
    ],
    painClosing: "Choose a direction based on who you are, not just what others expect.",
    discoveries: [
      { badge: "Discovery 01", title: "Discover Who You Are", desc: "Explore your natural talents, interests, values and personality.", img: "assets/day1-clarity.jpg" },
      { badge: "Discovery 02", title: "Discover What You Are Meant to Do", desc: "Learn how to connect your life purpose and career possibilities.", img: "assets/day2-overthinking.jpg" },
      { badge: "Discovery 03", title: "Discover How to Get There", desc: "Understand how to begin creating a practical roadmap.", img: "assets/day3-blueprint.jpg" }
    ],
    challengeSub: "10 Days. One Clear Career Direction. Just 30 minutes a day, except one 60-minute session (5.5 hours total).",
    days: STANDARD_10_DAYS,
    outcomesHeading: "What You Will Work Towards",
    outcomes: [
      "Your personal life purpose statement.",
      "A deeper understanding of your natural strengths and interests.",
      "Your No. 1 career choice.",
      "Your long-term life vision.",
      "Your personalised career blueprint and roadmap."
    ],
    outcomesNote: "Attend the free masterclass to discover the framework and learn how to enrol in the optional paid 10-Day Challenge.",
    differentText: "Rather than relying on a single career test or a list of recommendations, the Life Purpose & Career Blueprint™ framework brings together multiple layers of self-discovery. Understand not just which career to choose, but why it may be right for you.",
    whoShouldAttend: "School and college students exploring their future, and recent graduates seeking direction. Minors should register with a parent or guardian.",
    testimonialsSub: "From feeling lost and unaware of their talents to discovering meaningful goals and gaining clarity about their future.",
    faqs: [
      { q: "Is the masterclass free?", a: "Yes, registration is completely free." },
      { q: "What if I have limited exposure?", a: "The framework helps you identify promising directions and where further practical exploration is needed." },
      { q: "Will I complete my blueprint in the masterclass?", a: "The free session introduces the framework. The optional paid 10-day challenge guides you through the complete process." }
    ],
    finalHeading: "Explore your options before making your next education or career decision.",
    finalSub: "You do not need to have your entire life figured out to take the first step. Discover who you are, what you are meant to do, and how to get there.",
    isParentFlow: false
  },

  professionals: {
    key: "professionals",
    label: "Working Professionals",
    pageTitle: "Career Clarity Workshop for Working Professionals | Mid-Career Transition – Healer",
    heroBadge: "FREE LIFE PURPOSE & CAREER CLARITY WORKSHOP · PROFESSIONALS",
    heroTitle: 'Good Salary, Still Unhappy? Find Your <span class="text-gradient">Purpose-Aligned Career in 10 Days.</span>',
    heroSubtitle: "Go from career confusion to discovering your passion-aligned No. 1 career choice and practical transition roadmap—without blindly quitting your job.",
    heroCta: "Find My Fulfilling Career – Register Free",
    painPoints: [
      "You earn well but feel unhappy or empty at work.",
      "You constantly wonder whether you chose the wrong career.",
      "You have multiple interests but cannot narrow them down.",
      "You do not know what you are naturally good at.",
      "Your salary, EMIs and family responsibilities make change feel risky.",
      "Self-help books and career assessments have not given you clarity.",
      "You fear making another wrong career decision.",
      "You live for weekends and holidays rather than enjoying everyday work."
    ],
    painClosing: "You deserve a career that makes you look forward to Mondays, not just Fridays.",
    discoveries: [
      { badge: "Discovery 01", title: "Discover Who You Are", desc: "Explore your natural talents, interests, values and personality.", img: "assets/day1-clarity.jpg" },
      { badge: "Discovery 02", title: "Discover What You Are Meant to Do", desc: "Learn how to connect your life purpose and career possibilities.", img: "assets/day2-overthinking.jpg" },
      { badge: "Discovery 03", title: "Discover How to Get There", desc: "Understand how to begin creating a practical roadmap.", img: "assets/day3-blueprint.jpg" }
    ],
    challengeSub: "10 Days. One Clear Career Direction. Just 30 minutes a day, except one 60-minute session (5.5 hours total).",
    days: STANDARD_10_DAYS,
    outcomesHeading: "What You Will Work Towards",
    outcomes: [
      "Your personal life purpose statement.",
      "A deeper understanding of your natural strengths and interests.",
      "Your No. 1 career choice.",
      "Your long-term life vision.",
      "Your personalised career blueprint and roadmap."
    ],
    outcomesNote: "Attend the free masterclass to discover the framework and learn how to enrol in the optional paid 10-Day Challenge.",
    differentText: "Rather than relying on a single career test or a list of recommendations, the Life Purpose & Career Blueprint™ framework brings together multiple layers of self-discovery. Understand not just which career to choose, but why it may be right for you.",
    whoShouldAttend: "Working professionals seeking meaningful work, career clarity or a carefully planned career transition.",
    testimonialsSub: "From feeling stuck and unfulfilled to discovering meaningful goals and gaining clarity about their career direction.",
    faqs: [
      { q: "Is the masterclass free?", a: "Yes, registration is completely free." },
      { q: "Do I need to quit my job?", a: "No. Explore practical next steps while considering your existing financial responsibilities." },
      { q: "Will I complete my blueprint in the masterclass?", a: "The free session introduces the framework. The optional paid 10-day challenge guides you through the complete process." }
    ],
    finalHeading: "You can earn back money, but you cannot earn back the years spent in a career you do not love.",
    finalSub: "Your life is more than earning a salary, paying bills and waiting for the weekend. Discover who you are, what you are meant to do, and how to get there.",
    isParentFlow: false
  },

  homemakers: {
    key: "homemakers",
    label: "Homemakers",
    pageTitle: "Career Restart & Clarity Workshop for Homemakers | 10-Day Blueprint – Healer",
    heroBadge: "FREE LIFE PURPOSE & CAREER CLARITY WORKSHOP · HOMEMAKERS",
    heroTitle: 'Rediscover Yourself & Find Your <span class="text-gradient">No. 1 Career Direction in 10 Days.</span>',
    heroSubtitle: "Go from self-doubt after a career break to discovering your natural talents, life purpose, and a passion-aligned career roadmap that fits your life.",
    heroCta: "Rediscover My Potential – Register Free",
    painPoints: [
      "You have spent years caring for your family and want to explore your own aspirations.",
      "You are unsure what you are naturally good at.",
      "You want to restart a career or explore work for the first time.",
      "You worry about a career gap or balancing family responsibilities.",
      "You want to build confidence and work towards financial independence."
    ],
    painClosing: "Your dreams deserve space in your life too.",
    discoveries: [
      { badge: "Discovery 01", title: "Discover Who You Are", desc: "Explore your natural talents, interests, values and personality.", img: "assets/day1-clarity.jpg" },
      { badge: "Discovery 02", title: "Discover What You Are Meant to Do", desc: "Learn how to connect your life purpose and career possibilities.", img: "assets/day2-overthinking.jpg" },
      { badge: "Discovery 03", title: "Discover How to Get There", desc: "Understand how to begin creating a practical roadmap.", img: "assets/day3-blueprint.jpg" }
    ],
    challengeSub: "10 Days. One Clear Career Direction. Just 30 minutes a day, except one 60-minute session (5.5 hours total).",
    days: STANDARD_10_DAYS,
    outcomesHeading: "What You Will Work Towards",
    outcomes: [
      "Your personal life purpose statement.",
      "A deeper understanding of your natural strengths and interests.",
      "Your No. 1 career choice.",
      "Your long-term life vision.",
      "Your personalised career blueprint and roadmap."
    ],
    outcomesNote: "Attend the free masterclass to discover the framework and learn how to enrol in the optional paid 10-Day Challenge.",
    differentText: "Rather than relying on a single career test or a list of recommendations, the Life Purpose & Career Blueprint™ framework brings together multiple layers of self-discovery. Understand not just which career to choose, but why it may be right for you.",
    whoShouldAttend: "Homemakers and people returning to work after a career break who want to explore a meaningful professional direction.",
    testimonialsSub: "From feeling unsure of their talents to rediscovering confidence, purpose, and a meaningful direction.",
    faqs: [
      { q: "Is the masterclass free?", a: "Yes, registration is completely free." },
      { q: "Can I attend if I have never worked or have a long career gap?", a: "Yes. The framework starts with self-discovery and helps you explore realistic next steps based on your circumstances." },
      { q: "Will I complete my blueprint in the masterclass?", a: "The free session introduces the framework. The optional paid 10-day challenge guides you through the complete process." }
    ],
    finalHeading: "You do not have to have everything figured out before you begin.",
    finalSub: "Take the first step towards rediscovering your potential and building a future that feels meaningful to you.",
    isParentFlow: false
  },

  parents: {
    key: "parents",
    label: "Parents",
    pageTitle: "Career Guidance Workshop for Parents | Help Your Child Choose the Right Career – Healer",
    heroBadge: "FREE LIFE PURPOSE & CAREER CLARITY WORKSHOP · PARENTS",
    heroTitle: 'Help Your Child Discover Their <span class="text-gradient">No. 1 Career Choice in 10 Days.</span>',
    heroSubtitle: "Move from career confusion to a clear, psychometric-backed career roadmap before investing years and lakhs in the wrong degree.",
    heroCta: "Reserve My Free Masterclass Seat",
    painPoints: [
      "Your child does not know what they want to do in life.",
      "They have too many interests or have not discovered what they enjoy.",
      "You worry about spending lakhs on the wrong degree.",
      "You fear they may choose a career based on peer pressure or salary alone.",
      "You worry about their future financial stability and happiness.",
      "You want to guide them without forcing your own ambitions on them."
    ],
    painClosing: "Give your child the opportunity to build a future that reflects who they truly are.",
    discoveries: [
      { badge: "Discovery 01", title: "Discover Who They Are", desc: "Understand the role of natural talents, interests, values and personality.", img: "assets/day1-clarity.jpg" },
      { badge: "Discovery 02", title: "Discover What They Are Meant to Do", desc: "Explore how purpose and career possibilities can align.", img: "assets/day2-overthinking.jpg" },
      { badge: "Discovery 03", title: "Discover How to Get There", desc: "Learn how to support a practical education and career roadmap.", img: "assets/day3-blueprint.jpg" }
    ],
    challengeSub: "10 Days. One Clear Career Direction. A guided self-discovery journey for your child — just 30 minutes a day, except one 60-minute session (5.5 hours total).",
    days: STANDARD_10_DAYS,
    outcomesHeading: "What Your Child Will Work Towards",
    outcomes: [
      "A personal life purpose statement.",
      "A deeper understanding of natural strengths and interests.",
      "A preferred career direction to explore and validate.",
      "A long-term life vision.",
      "A personalised career blueprint and roadmap."
    ],
    outcomesNote: "Attend the free masterclass to discover the framework and learn how to enrol your child in the optional paid 10-Day Challenge.",
    differentText: "Rather than relying on a single aptitude test or a list of recommendations, the Life Purpose & Career Blueprint™ brings together multiple layers of self-discovery. Help your child understand why a career may be right for them, not just which career to choose.",
    whoShouldAttend: "Parents of school and college students aged 15–22 who are unsure about their future, have multiple interests or need more exposure to career possibilities.",
    testimonialsSub: "From feeling lost and unaware of their talents to discovering meaningful goals and gaining clarity about their future.",
    faqs: [
      { q: "Is the masterclass free?", a: "Yes, registration is completely free." },
      { q: "Who attends the challenge?", a: "Your child is the participant. Parents can support their exploration without deciding for them." },
      { q: "What if my child has no clear interests?", a: "The framework helps identify promising directions and areas that need further exploration." },
      { q: "Will the masterclass give my child a complete blueprint?", a: "No. It introduces the framework; the optional paid challenge guides the full process." }
    ],
    finalHeading: "Before investing years and money in a degree, help your child understand their strengths.",
    finalSub: "Give them the confidence to make an informed decision. Help your child discover who they are, what they are meant to do and how to get there.",
    isParentFlow: true
  },

  retired: {
    key: "retired",
    label: "Retired / Senior Citizens",
    pageTitle: "Life Purpose Workshop After Retirement | Design Your Next Chapter in 10 Days – Healer",
    heroBadge: "FREE LIFE PURPOSE & CAREER CLARITY WORKSHOP · RETIRED",
    heroTitle: 'Retired From Your Job, Not Your Purpose. <span class="text-gradient">Clarity in 10 Days.</span>',
    heroSubtitle: "Discover your untapped strengths and build a purpose-aligned roadmap for your next chapter—mentoring, volunteering, entrepreneurship, or meaningful pursuits.",
    heroCta: "Discover My Next Chapter – Register Free",
    painPoints: [
      "You miss the sense of direction your work once gave you.",
      "You have more time but are unsure what to do with it.",
      "You want to contribute, learn or pursue interests you postponed.",
      "You wonder how to use your experience in a meaningful way.",
      "You want a fulfilling routine that respects your health, energy and priorities."
    ],
    painClosing: "Your experience still matters—design a next chapter filled with meaning.",
    discoveries: [
      { badge: "Discovery 01", title: "Discover Who You Are", desc: "Reconnect with your strengths, interests and values beyond your former job.", img: "assets/day1-clarity.jpg" },
      { badge: "Discovery 02", title: "Discover What You Are Meant to Do", desc: "Explore meaningful pursuits and the contribution you want to make.", img: "assets/day2-overthinking.jpg" },
      { badge: "Discovery 03", title: "Discover How to Get There", desc: "Begin planning realistic next steps for your next chapter.", img: "assets/day3-blueprint.jpg" }
    ],
    challengeSub: "10 Days. A Meaningful Next Chapter. Just 30 minutes a day, except one 60-minute session (5.5 hours total).",
    days: RETIRED_10_DAYS,
    outcomesHeading: "What You Will Work Towards",
    outcomes: [
      "A personal purpose statement.",
      "A deeper understanding of your strengths and interests.",
      "A preferred meaningful pursuit (paid or unpaid).",
      "A long-term life vision.",
      "A personalised roadmap for your next chapter."
    ],
    outcomesNote: "Attend the free masterclass to discover the framework and learn about the optional paid 10-Day Challenge.",
    differentText: "Rather than recommending a job or a hobby alone, the framework combines multiple layers of self-discovery to help you choose a direction that fits your values, abilities and circumstances.",
    whoShouldAttend: "Retired or soon-to-retire individuals seeking purpose, personal growth or a meaningful pursuit, whether paid or unpaid.",
    testimonialsSub: "100+ individuals coached across audiences to discover clarity and meaningful direction.",
    faqs: [
      { q: "Is the masterclass free?", a: "Yes, registration is completely free." },
      { q: "Do I need to start a new career?", a: "No. Your direction can include volunteering, mentoring, creative pursuits or learning." },
      { q: "Will I finish my blueprint in the masterclass?", a: "The free session introduces the framework; the optional paid challenge guides the full process." }
    ],
    finalHeading: "Your experience still matters.",
    finalSub: "Give yourself the opportunity to explore what brings meaning to your next chapter.",
    isParentFlow: false
  }
};