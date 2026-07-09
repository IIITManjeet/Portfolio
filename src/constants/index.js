const socials = {
  github: "https://github.com/IIITManjeet",
  linkedin: "https://www.linkedin.com/in/manjeet-pathak-896638223/",
  leetcode: "https://leetcode.com/u/conqueror_61_m/",
  codeforces: "https://codeforces.com/profile/Manjeet_Pathak",
  codechef: "https://www.codechef.com/users/conqueror61",
  atcoder: "https://atcoder.jp/users/Man_Pat061",
  email: "manjeetpathak2003@gmail.com",
};

const navLinks = [
  { id: "about", title: "about" },
  { id: "experience", title: "exp" },
  { id: "projects", title: "projects" },
  { id: "opensource", title: "oss" },
  { id: "work", title: "hire-me" },
  { id: "achievements", title: "ranks" },
  { id: "contact", title: "contact" },
];

const ticker = [
  { label: "LEETCODE", value: "2170 · GUARDIAN · TOP 1.13%", dir: "up" },
  { label: "CODEFORCES", value: "1605 · EXPERT · #736 R1024", dir: "up" },
  { label: "CODECHEF", value: "2033 · 5★ · #32 STARTERS 176", dir: "up" },
  { label: "ICPC", value: "AMRITAPURI FINALS '23 · 108/228", dir: "flat" },
  { label: "HACKERCUP", value: "ROUND 2 · '23 & '24", dir: "flat" },
  { label: "ATCODER", value: "4 KYU · #424 ABC392", dir: "up" },
  { label: "CGPA", value: "9.66 · DEPT TOPPER · IIIT BHOPAL", dir: "up" },
  { label: "ORDERBOOK", value: "22M OPS/SEC · 46NS/OP", dir: "up" },
  { label: "UPTIME TARGET", value: "99.995% · ACTIVE-ACTIVE", dir: "up" },
];

const stack = [
  {
    group: "languages",
    items: ["C++ (C++23)", "Rust", "Haskell", "Python", "TypeScript", "JavaScript", "C", "SQL", "Dart"],
  },
  {
    group: "systems / low-latency",
    items: ["Lock-free DS", "SPSC queues", "Cache tuning", "Zero-alloc design", "GDB", "CMake", "Linux"],
  },
  {
    group: "quant / trading",
    items: ["Order books", "Market microstructure", "Backtesting", "Algorithmic trading", "Trend following", "Mean reversion", "Risk management"],
  },
  {
    group: "backend / distributed",
    items: ["Node.js", "NestJS", "Express", "Istio / Envoy", "Redis Streams", "PostgreSQL", "MySQL", "MongoDB", "AWS", "Docker", "Kubernetes", "Tokio"],
  },
  {
    group: "web / web3 / ai",
    items: ["React / Next.js", "React Native", "Solana", "CyberConnect", "QuestEngine", "S3", "Redux", "Tailwind", "Flutter", "LLM / GPT APIs"],
  },
];

const experiences = [
  {
    title: "Software Development Engineer (ASDE)",
    company_name: "Juspay",
    date: "AUG 2025 — PRESENT",
    tech: ["Distributed Systems", "Haskell", "Rust", "Envoy", "Istio", "Redis", "AWS"],
    points: [
      "Designed a globally distributed active-active multi-cell architecture with AWS Global Accelerator and multi-region load balancing, targeting 99.995% uptime with seamless failover.",
      "Engineered a routing-id-based affinity system (x-routing-id) and an ID replication pipeline on Redis Streams for routing consistency across cells.",
      "Built a multi-layered request resolution system (affinity + replicated lookup + fanout fallback) and optimized Istio service-mesh routing for fault tolerance and latency.",
      "Shipped observability & control systems — health checks, maker-checker, a Rust dashboard — for real-time traffic management and merchant onboarding.",
    ],
  },
  {
    title: "Quant Analyst Associate · Part Time",
    company_name: "D+A Strategies",
    date: "MAY 2026 — PRESENT",
    tech: ["Python", "Backtesting", "Signal Research"],
    points: [
      "Lecture on quant research pitfalls — survivorship bias, look-ahead bias, overfitting, backtest design — for the analyst division.",
      "Building an adaptive trend-following strategy: quantitative signal generation, adaptive modeling, systematic risk management.",
    ],
  },
  {
    title: "SDE — Backend",
    company_name: "Buyhatke Internet Pvt Ltd",
    date: "OCT 2024 — JUL 2025",
    tech: ["Node.js", "Express", "MySQL", "CRON"],
    points: [
      "Built a score-based payment routing system across multiple payment gateways for reliable transaction processing.",
      "Integrated a gift-card system with multiple partners via Onramp.money.",
      "Optimized queries and automated workflows; improved SpendLens & AutoCoupons serving 50K+ daily users.",
    ],
  },
  {
    title: "Teaching Assistant",
    company_name: "IIIT Bhopal",
    date: "AUG 2023 — 2024",
    tech: ["Mentoring", "Coursework"],
    points: [
      "Teaching Assistant under Prof. Dr. Gaurav Kumar Bharti, supporting coursework and labs while maintaining a 9.66 CGPA.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "GrowthFarm (SingularityAI)",
    date: "MAY 2023 — JUL 2023",
    tech: ["NestJS", "Docker", "Kubernetes", "GPT APIs"],
    points: [
      "Built reliable front-ends for web and Android applications and a NestJS backend for SaaS products.",
      "Incorporated GPT-based data scraping via third-party APIs; deployed with Docker and Kubernetes.",
      "Participated in code reviews, providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web3 Full Stack Intern",
    company_name: "Metaverse Ventures Pvt Ltd",
    date: "FEB 2023 — MAY 2023",
    tech: ["Next.js", "Redux", "Web3", "S3"],
    points: [
      "Engineered performant Web3 frontends with Next.js and Tailwind.",
      "Integrated QuestEngine and CyberConnect with S3-backed storage.",
    ],
  },
  {
    title: "Web Development Lead (prev. Assistant Web Developer)",
    company_name: "CODAME, IIIT Bhopal",
    date: "OCT 2022 — 2024",
    tech: ["Next.js", "Team Lead", "Performance"],
    points: [
      "Led a team of three developers building and maintaining the official CODAME club website and the CodeUtsava hackathon web experience.",
      "Shipped the club's official site with lazy loading, caching, and cross-browser optimizations, boosting performance by ~15%.",
      "Mentored team members on technology choices, frameworks, and best practices.",
    ],
  },
];

const projects = [
  {
    name: "orderbookC20",
    title: "Low-Latency Order Book & Matching Engine",
    description:
      "Limit order book in modern C++23 — cache-padded wait-free SPSC ring buffer, object-pool allocator, intrusive FIFO per price level for a zero-allocation hot path. Live Binance Futures/Spot feed with event→fill telemetry. Benchmarked with Google Benchmark on Apple M-series.",
    metrics: [
      { t: "22M ops/sec sweeps", k: "perf" },
      { t: "9M ops/sec inserts", k: "perf" },
      { t: "46–108 ns/op", k: "perf" },
      { t: "p50 10–20 µs e2e", k: "perf" },
    ],
    tags: ["c++23", "lock-free", "google-benchmark", "cmake"],
    link: "https://github.com/IIITManjeet/orderbookC20",
  },
  {
    name: "event-driven-rust-engine",
    title: "Event-Driven Trading Engine",
    description:
      "Async multi-exchange market-data ingestion (Binance, Bybit, CoinGecko, Binance Futures) with pluggable strategies, paper-trade execution, portfolio & PnL tracking, cross-exchange arbitrage, and a risk layer with exposure limits and an automated kill-switch.",
    metrics: [
      { t: "multi-exchange", k: "cap" },
      { t: "realized/unrealized PnL", k: "cap" },
      { t: "auto kill-switch", k: "cap" },
    ],
    tags: ["rust", "tokio", "async-traits", "quant"],
    link: "https://github.com/IIITManjeet/event-driven-rust-engine",
  },
  {
    name: "ledger-rs",
    title: "Double-Entry Ledger System",
    description:
      "High-performance double-entry ledger in Rust for financial transaction processing and audit-safe accounting — atomic transaction posting, account reconciliation, and balance-consistency guarantees on async Rust + PostgreSQL.",
    metrics: [
      { t: "atomic posting", k: "cap" },
      { t: "audit-safe", k: "cap" },
      { t: "balance-consistent", k: "cap" },
    ],
    tags: ["rust", "postgresql", "axum", "docker"],
    link: "https://github.com/IIITManjeet/ledger-rs",
  },
  {
    name: "redisC-",
    title: "Redis From Scratch",
    description:
      "A Redis-style in-memory key-value store built from the ground up in C++ — custom event loop over non-blocking sockets, protocol parsing, hashtables and TTL expiry — to understand what makes production caches fast.",
    metrics: [
      { t: "custom event loop", k: "cap" },
      { t: "non-blocking io", k: "cap" },
      { t: "ttl expiry", k: "cap" },
    ],
    tags: ["c++", "networking", "systems"],
    link: "https://github.com/IIITManjeet/redisC-",
  },
  {
    name: "Mindful-Journal",
    title: "Mindful Journal — AI Wellness",
    description:
      "AI-powered mood tracking and emotional wellness application — journaling with LLM-assisted reflection and mood analytics over time, on a modern TypeScript stack.",
    metrics: [
      { t: "ai reflections", k: "cap" },
      { t: "mood analytics", k: "cap" },
    ],
    tags: ["typescript", "react", "ai"],
    link: "https://github.com/IIITManjeet/Mindful-Journal",
  },
  {
    name: "Hack36",
    title: "Mental Health Companion",
    description:
      "Flutter application backed by a deployed ML model API for mood detection and support — built at Hack36 and starred 25× on GitHub.",
    metrics: [
      { t: "25★ on github", k: "perf" },
      { t: "deployed ml api", k: "cap" },
    ],
    tags: ["flutter", "ml", "hackathon"],
    link: "https://github.com/IIITManjeet/Hack36",
  },
];

const openSource = [
  {
    repo: "Mudlet/Mudlet",
    stars: "880+★ · C++/Qt · cross-platform MUD client",
    title: "fix: copying of default profiles after fresh install",
    status: "merged",
    link: "https://github.com/Mudlet/Mudlet/pull/9317",
  },
  {
    repo: "Mudlet/Mudlet",
    stars: "880+★ · C++/Qt · cross-platform MUD client",
    title: "fix: crash when a package uninstalls itself from its own alias/key/trigger",
    status: "open",
    link: "https://github.com/Mudlet/Mudlet/pull/9383",
  },
  {
    repo: "PasswordMan · responsive-navbar · dailyProblems · more",
    stars: "community repos · JS / TS / C++",
    title: "8+ merged PRs — features, bug fixes, docs across open-source repos",
    status: "merged",
    link: "https://github.com/search?q=author%3AIIITManjeet+is%3Apr+is%3Amerged&type=pullrequests",
  },
];

const services = [
  {
    title: "Quant Dev",
    desc: "Order books, matching engines, backtesting infra, strategy research tooling, exchange integrations, market-data pipelines.",
    mono: "latency: nanoseconds",
    accent: "acc",
    proof: "see the benchmarks",
    proofHref: "#projects",
  },
  {
    title: "Backend & Distributed Systems",
    desc: "Payment infrastructure, active-active architectures, service mesh, observability, high-throughput APIs that don't fall over.",
    mono: "uptime: 99.995%",
    accent: "acc",
    proof: "see where I've shipped",
    proofHref: "#experience",
  },
  {
    title: "Web3",
    desc: "dApp frontends, Solana & protocol integrations (CyberConnect, QuestEngine), and freelance client delivery on modern React/Next.js stacks.",
    mono: "stack: react · next · solana",
    accent: "cy",
    proof: "start a project",
    proofHref: "#contact",
  },
];

const achievements = [
  { stat: "2170", title: "LeetCode Guardian", detail: "max rating — top 1.13% globally", link: socials.leetcode },
  { stat: "108th", title: "ICPC Regionals Finalist", detail: "of 228 — Amritapuri Finals 2023", link: null },
  { stat: "2033", title: "CodeChef 5★", detail: "global rank 32 — Starters 176", link: socials.codechef },
  { stat: "1605", title: "Codeforces Expert", detail: "global rank 736 — Round 1024", link: socials.codeforces },
  { stat: "R2", title: "Meta HackerCup", detail: "qualified 2023 & 2024 — best rank 1875", link: null },
  { stat: "2nd", title: "CodeUtsava 6.0", detail: "1st runner-up — national hackathon", link: null },
  { stat: "9.66", title: "Department Topper", detail: "B.Tech IT — IIIT Bhopal '25", link: null },
  { stat: "4kyu", title: "AtCoder Cyan", detail: "global rank 424 — ABC 392", link: socials.atcoder },
];

const contactRoles = [
  "Quant Dev role",
  "Backend / Distributed Systems role",
  "Web3 role",
  "Freelance project",
  "Something else",
];

export {
  socials,
  navLinks,
  ticker,
  stack,
  experiences,
  projects,
  openSource,
  services,
  achievements,
  contactRoles,
};
