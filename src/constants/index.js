// All copy and facts live here. Every number is sourced from a repo README,
// the GitHub API, or the resume — see .claude/skills/portfolio-content.

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
  { id: "projects", title: "work" },
  { id: "lab", title: "lab" },
  { id: "opensource", title: "oss" },
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
  { label: "GLASSHOUSE", value: "LIVE ON BASE MAINNET · ETHONLINE '26", dir: "up" },
  { label: "UPTIME TARGET", value: "99.995% · ACTIVE-ACTIVE", dir: "up" },
];

const stack = [
  {
    group: "languages",
    items: ["C++ (C++23)", "Rust", "TypeScript", "JavaScript", "Haskell", "Python", "Solidity", "Move", "SQL"],
  },
  {
    group: "frontend",
    items: ["React 19", "Next.js 16", "Astro", "Preact + Signals", "Tailwind", "Motion", "TanStack Query", "Zustand", "d3", "lightweight-charts", "wagmi / viem", "MDX + KaTeX"],
  },
  {
    group: "frontend quality",
    items: ["Playwright e2e", "axe a11y tests", "Vitest", "JS size budgets", "Design tokens", "Web Workers"],
  },
  {
    group: "systems / low-latency",
    items: ["Lock-free DS", "SPSC queues", "Cache tuning", "Zero-alloc design", "Tokio", "Linux"],
  },
  {
    group: "backend / distributed",
    items: ["Envoy / Istio", "Redis Streams", "PostgreSQL", "Axum", "Node.js", "AWS", "Docker", "Kubernetes"],
  },
  {
    group: "markets / chains",
    items: ["Order books", "Market microstructure", "AMMs", "Backtesting", "Base / EVM", "Sui / Aptos", "Solana / Anchor", "The Graph"],
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
      "Working on code-level latency optimizations for a tier-1 banking client integration.",
      "Contributing to a complete migration of reconciliation (recon) onto a common Rust framework, using ART traffic recording and rehearsal to verify behavior parity.",
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

// Flagship projects: each has a case study at /work/:slug (see caseStudies.js).
// Chip kinds — perf: measured number (green), cap: capability (cyan).
const projects = [
  {
    slug: "glasshouse",
    name: "Glasshouse",
    title: "Glasshouse — sealed-bid taker priority",
    kicker: "ETHOnline 2026 · live on Base mainnet",
    description:
      "A custom 1inch SwapVM instruction (opcode 0x2e) that sells the right to fill an order by sealed, second-price auction. The site is a static Next.js export that reads the contract straight from the visitor's browser — no backend, no database.",
    metrics: [
      { t: "live on base mainnet", k: "cap" },
      { t: "maker gives up 9,756 vs 10,618 bps", k: "perf" },
      { t: "97 solidity + 59 js tests", k: "cap" },
    ],
    tags: ["next.js 16", "react 19", "tailwind 4", "wagmi", "viem", "solidity", "the graph"],
    live: "https://glasshouse-ashy.vercel.app",
    link: "https://github.com/IIITManjeet/Glasshouse",
  },
  {
    slug: "braid",
    name: "Braid",
    title: "Braid — one order, four venues, two chains",
    kicker: "Sui + Aptos testnet · route-split UI",
    description:
      "An exchange with four venue types — constant product, StableSwap, concentrated liquidity and a crit-bit order book — and a router that splits one order across all four and settles it atomically. Implemented in Sui Move and Aptos Move, with a Rust replica both VMs are held to.",
    metrics: [
      { t: "570 sui + 574 aptos move tests", k: "cap" },
      { t: "quote 4 µs p99", k: "perf" },
      { t: "4-way plan in 4 ms", k: "perf" },
    ],
    tags: ["next.js 16", "react 19", "tanstack query", "move", "rust", "axum"],
    live: "https://braid-4piq.onrender.com",
    link: "https://github.com/IIITManjeet/Braid",
  },
  {
    slug: "quantout",
    name: "quantout",
    title: "quantout — an interactive quant curriculum",
    kicker: "collaboration with hr483 · Astro rebuild",
    description:
      "I rebuilt a quant-learning site in Astro with Preact islands: a 206-lesson curriculum across six learning paths, 150+ lessons rewritten as predict–interact–reveal simulations, a market-making game, spaced-repetition reviews and an accessibility-tested CI.",
    metrics: [
      { t: "150+ interactive lessons", k: "cap" },
      { t: "playwright + axe in ci", k: "cap" },
      { t: "js size budget", k: "cap" },
    ],
    tags: ["astro", "preact", "signals", "d3", "mdx", "katex", "supabase"],
    live: null,
    link: null,
    note: "private repository — walkthrough on request",
  },
  {
    slug: "orderbook",
    name: "orderbookC20 + matchbook",
    title: "Order books — from C++23 to on-chain",
    kicker: "C++23 engine · Solana CLOB DEX + trading terminal",
    description:
      "A zero-allocation C++23 limit order book benchmarked at tens of millions of ops/sec, and Matchbook: a central limit order book DEX on Solana with perpetual futures, a Rust indexer and a Next.js trading terminal streaming live devnet data.",
    metrics: [
      { t: "22M ops/sec sweeps · 46 ns/op", k: "perf" },
      { t: "p50 10–20 µs event→fill", k: "perf" },
      { t: "live devnet terminal", k: "cap" },
    ],
    tags: ["c++23", "rust", "anchor", "next.js", "lightweight-charts", "zustand"],
    live: "https://iiitmanjeet.github.io/matchbook/",
    link: "https://github.com/IIITManjeet/matchbook",
  },
];

// Smaller projects shown as a compact list.
const moreProjects = [
  {
    name: "event-driven-rust-engine",
    title: "Event-driven trading engine",
    description: "Async multi-exchange market data, pluggable strategies, paper execution, PnL tracking and a risk kill-switch.",
    tags: ["rust", "tokio"],
    link: "https://github.com/IIITManjeet/event-driven-rust-engine",
  },
  {
    name: "ledger-rs",
    title: "Double-entry ledger",
    description: "Atomic transaction posting, reconciliation and balance-consistency checks on async Rust and PostgreSQL.",
    tags: ["rust", "postgresql", "axum"],
    link: "https://github.com/IIITManjeet/ledger-rs",
  },
  {
    name: "redisC-",
    title: "Redis from scratch",
    description: "In-memory key-value store in C++: custom event loop, non-blocking sockets, protocol parsing, TTL expiry.",
    tags: ["c++", "networking"],
    link: "https://github.com/IIITManjeet/redisC-",
  },
  {
    name: "Mindful-Journal",
    title: "Mindful Journal",
    description: "AI-assisted journaling and mood analytics, with a responsive UI refresh: local-time greeting, calendar, logo.",
    tags: ["typescript", "react", "ai"],
    link: "https://github.com/IIITManjeet/Mindful-Journal",
    live: "https://mindful-journal-one.vercel.app",
  },
  {
    name: "Hack36",
    title: "Mental health companion",
    description: "Flutter app backed by a deployed ML model API for mood detection — built at Hack36.",
    tags: ["flutter", "ml"],
    link: "https://github.com/IIITManjeet/Hack36",
  },
];

// Open source: only merged and open PRs (closed-unmerged are not contributions).
// stars: snapshot from the GitHub API on 2026-10-05; Mudlet is refreshed live.
const openSource = [
  {
    repo: "superradcompany/microsandbox",
    about: "Rust · microVM runtime",
    stars: "8.5k",
    prs: [
      { title: "fix(sdk): enable TLS interception when modify adds a secret", status: "merged", link: "https://github.com/superradcompany/microsandbox/pull/1432" },
      { title: "feat(sdk/go): support AttachWith for non-default guest users", status: "merged", link: "https://github.com/superradcompany/microsandbox/pull/1252" },
      { title: "feat(sdk): add live resize status readback and wait helpers", status: "open", link: "https://github.com/superradcompany/microsandbox/pull/1636" },
      { title: "fix(metrics): follow live memory resizes in memory limit and usage", status: "open", link: "https://github.com/superradcompany/microsandbox/pull/1679" },
    ],
  },
  {
    repo: "Project-HAMi/HAMi",
    about: "Go · GPU sharing on Kubernetes",
    stars: "4.7k",
    prs: [
      { title: "fix(scheduler): ignore unrecognized scheduler-policy annotations so the configured policy stands", status: "merged", link: "https://github.com/Project-HAMi/HAMi/pull/2769" },
    ],
  },
  {
    repo: "Mudlet/Mudlet",
    about: "C++/Qt · cross-platform MUD client",
    stars: "900+",
    prs: [
      { title: "Fix: a negative wrap indent no longer crashes Mudlet", status: "merged", link: "https://github.com/Mudlet/Mudlet/pull/10392" },
      { title: "Fix: replace() no longer crashes Mudlet when the selection runs backwards", status: "merged", link: "https://github.com/Mudlet/Mudlet/pull/10389" },
      { title: "Fix: use-after-free when a package uninstalls itself from its own alias/key/trigger", status: "merged", link: "https://github.com/Mudlet/Mudlet/pull/9383" },
      { title: "fix: copying of default profiles after fresh install", status: "merged", link: "https://github.com/Mudlet/Mudlet/pull/9317" },
    ],
  },
  {
    repo: "lambdaclass/ethrex",
    about: "Rust · Ethereum execution client",
    stars: "900+",
    prs: [
      { title: "fix(l1): iterate from the seek key in the in-memory backend", status: "open", link: "https://github.com/lambdaclass/ethrex/pull/7137" },
    ],
  },
  {
    repo: "kubeedge/ianvs",
    about: "Python · distributed AI benchmarking",
    stars: "200+",
    prs: [
      { title: "fix(core/lifelong): fail fast when splitting_method under-produces dataset splits", status: "open", link: "https://github.com/kubeedge/ianvs/pull/825" },
    ],
  },
  {
    repo: "StabilityNexus/Windmill-EVM-Contracts",
    about: "Solidity · auction-based order-book exchange",
    stars: null,
    prs: [
      { title: "perf(batch): read and write primary order once in matchOrdersBatch", status: "merged", link: "https://github.com/StabilityNexus/Windmill-EVM-Contracts/pull/22" },
      { title: "test: cover native ETH settlement and EthTransferFailed paths (3 PRs)", status: "merged", link: "https://github.com/StabilityNexus/Windmill-EVM-Contracts/pulls?q=is%3Apr+author%3AIIITManjeet+is%3Amerged" },
    ],
  },
];

const services = [
  {
    title: "Trading & Market Systems",
    desc: "Order books, matching engines, market-data pipelines, backtesting infrastructure and exchange integrations.",
    mono: "latency: nanoseconds",
    accent: "acc",
    proof: "see the benchmarks",
    proofHref: "#projects",
  },
  {
    title: "Backend & Distributed Systems",
    desc: "Payment infrastructure, multi-region active-active architectures, service mesh, observability and high-throughput APIs.",
    mono: "uptime target: 99.995%",
    accent: "acc",
    proof: "see where I've shipped",
    proofHref: "#experience",
  },
  {
    title: "Data-dense Frontends",
    desc: "Trading terminals, protocol dashboards and interactive explainers — React, Next.js and Astro, tested for accessibility and performance.",
    mono: "stack: react · next · astro",
    accent: "cy",
    proof: "try the lab",
    proofHref: "#lab",
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
  "Systems / Backend role",
  "Trading / Quant Dev role",
  "Frontend / Full-stack role",
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
  moreProjects,
  openSource,
  services,
  achievements,
  contactRoles,
};
