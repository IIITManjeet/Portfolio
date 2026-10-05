// Long-form case studies for /work/:slug. Sourced only from each repo's
// README (Glasshouse, Braid, matchbook, orderbookC20) and, for quantout,
// the author's commit history on the rebuild branch.

const caseStudies = {
  glasshouse: {
    period: "Sep 2026 · ETHOnline 2026",
    role: "Solo — contracts, subgraph, keeper and site",
    summary:
      "Taker priority allocated by sealed competitive bid — not by identity, not by clock. A custom 1inch SwapVM instruction, opcode 0x2e, live on Base mainnet.",
    problem: [
      "SwapVM ships two ways to decide who may fill an order, and neither asks what the fill is worth.",
      "By identity (WhitelistSequential, 0x2d): a hardcoded ladder of privileged takers — an unlisted taker reverts until the whole ladder has elapsed.",
      "By clock (DutchAuctionBalanceIn, 0x94): the price is a pure function of block.timestamp, so every bidder in a block sees the same price and allocation falls to intra-block ordering. The surplus goes to the builder, not the maker.",
    ],
    approach: [
      "A third gate: a sealed-bid, second-price auction settled on chain. Bidders commit a hash, reveal in a window, and the highest bid wins while paying max(reserve, second bid).",
      "The winner gets an exclusive fill window; afterwards the order opens to anyone at base price.",
      "The bid is a price improvement applied to balanceIn, so ordinary SwapVM settlement delivers the surplus to the maker — no transfer, no custody, no fee router. The book has no owner, no admin and no upgrade path.",
    ],
    frontend: [
      "Next.js 16 static export with React 19 and Tailwind 4 — no server and no API route. The board reads the contract over eth_call from the visitor's own browser, and any node can be swapped in with ?rpc=.",
      "Wallet flows with wagmi and viem: seal, reveal and fill. The bid salt is written to localStorage and read back before the wallet prompt opens, because a bid whose secret was never stored can never be revealed.",
      "An /evidence page with a receipt per auction and an independent replay that re-derives every outcome from raw reveals. A provenance lint fails the build if a figure on the site does not name what produced it.",
      "History comes from a subgraph published to The Graph Network; the live card reads the chain directly.",
    ],
    evidence: [
      { k: "Maker gives up — identity gate (0x2d)", v: "10,000 bps", kind: "cap" },
      { k: "Maker gives up — clock gate (0x94)", v: "10,618 bps", kind: "cap" },
      { k: "Maker gives up — Glasshouse (0x2e)", v: "9,756 bps", kind: "perf" },
      { k: "Mainnet order 0x58296d32…", v: "winner bid 400, cleared at 250", kind: "cap" },
      { k: "Independent replay", v: "8 passed · 0 failed", kind: "cap" },
      { k: "Tests", v: "97 Solidity · 59 JavaScript", kind: "cap" },
    ],
    evidenceNote:
      "The three-gate figures come from one Foundry test (test_Comparison_AllThreeGatesOnTheSameOrder) — same order, same participants, same curve. Lower is better for the maker.",
    stack: ["Next.js 16", "React 19", "Tailwind 4", "wagmi", "viem", "TanStack Query", "Motion", "Solidity", "Foundry", "Hardhat 3", "The Graph"],
    links: [
      { label: "live site", href: "https://glasshouse-ashy.vercel.app" },
      { label: "evidence page", href: "https://glasshouse-ashy.vercel.app/evidence" },
      { label: "source", href: "https://github.com/IIITManjeet/Glasshouse" },
    ],
  },

  braid: {
    period: "Aug – Sep 2026",
    role: "Solo — Move contracts, Rust services, web app",
    summary:
      "One order, four pricing engines, two Move chains, and a proof they agree.",
    problem: [
      "Liquidity for one pair is fragmented across venue types whose prices respond to size very differently — a constant-product pool, a stable pool, a concentrated range and an order book.",
      "Routing one order across them needs pricing math that is exact to the unit, because the chain will be held to the quoted output.",
    ],
    approach: [
      "Four venues in increasing order of math difficulty: CPMM (x·y = k), Curve StableSwap (Newton–Raphson for D and y), CLMM (tick bitmap, 1.0001^tick sqrt-price math, cross-tick stepping) and a crit-bit CLOB with price-time priority.",
      "An off-chain Rust optimizer equalises marginal output across venues; the chain executes the pre-computed route atomically. The Route type has no abilities — a hot potato — so a transaction cannot be built without the final min_out check.",
      "A differential fuzzer generates cases from a bit-exact Rust replica of the pricing math and runs the same corpus through both the Sui and Aptos Move VMs.",
    ],
    frontend: [
      "A Next.js 16 / React 19 app with TanStack Query and five views: Route, Venues, Deployments, Benchmarks and Verification.",
      "The page owns no pricing: it draws what a thin Axum server computes with the same crates the fuzzer checks. Reimplementing the math in TypeScript would throw that guarantee away, so none of it is.",
      "The Route view's leg table is the argument, not a summary: allocation, consumed amount and marginal rate per venue — idle venues show what they would pay for the next unit. A chart plots effective price across four decades of order size.",
      "Chart decisions made on purpose: gas is never plotted on one chart with two axes (MIST and Aptos gas units differ), and bars show cost over an empty route so the fixed per-transaction cost doesn't hide the venues.",
      "With a Sui wallet the page builds the same programmable transaction the CLI does and hands it to the wallet.",
    ],
    evidence: [
      { k: "Move tests", v: "570 Sui · 574 Aptos", kind: "cap" },
      { k: "Generated cases run by both VMs", v: "3,029 formula · 150 scenarios · 25 plans", kind: "cap" },
      { k: "Implementations agreeing on one order", v: "4 → 7,986,004 out", kind: "cap" },
      { k: "Single quote", v: "4 µs p99", kind: "perf" },
      { k: "Planning a four-way split", v: "4 ms", kind: "perf" },
    ],
    evidenceNote:
      "Machine-checked: k never decreases and the pool cannot be drained, for every u64.",
    stack: ["Next.js 16", "React 19", "TanStack Query", "Sui Move", "Aptos Move", "Rust", "Axum"],
    links: [
      { label: "live app", href: "https://braid-4piq.onrender.com" },
      { label: "source", href: "https://github.com/IIITManjeet/Braid" },
    ],
    note: "The live app runs on a free instance — the first load wakes it up.",
  },

  quantout: {
    period: "Sep 2026",
    role: "Collaboration with hr483 — I wrote the Astro rebuild",
    summary:
      "A quant-finance learning platform rebuilt from a static site into an interactive curriculum: you predict, interact with a simulation, then see the reveal.",
    problem: [
      "The original site was a set of static notes. Quant ideas — order book dynamics, the central limit theorem, option Greeks — are much easier to learn by manipulating them than by reading them.",
    ],
    approach: [
      "A content model and a 206-lesson curriculum across six learning paths, with onboarding, an adaptive placement quiz, unit gating and legacy-URL redirects.",
      "A predict → interact → reveal lesson system, a small charting kit and a simulation Web Worker so heavy simulations never block input.",
      "A tested quant maths package (Black-Scholes, Greeks, Kelly, RNG, statistics) and a tested order-book matching engine that the lessons and games share.",
    ],
    frontend: [
      "Astro 7 with Preact islands and @preact/signals — static by default, interactive only where a lesson needs it.",
      "150+ lessons rewritten as interactive pieces: an order-book simulator, a matching scrubber, Glosten–Milgrom, Kyle, Almgren–Chriss and Avellaneda–Stoikov models, a CLT sampler, a Bayes grid, an SVD rebuild, gradient descent and more.",
      "A market-making game with three levels, 13 rebuilt visual essays and a history-of-speed timeline.",
      "XP, streaks, levels and badges; FSRS spaced-repetition reviews; Supabase magic-link sign-in with sync; Pagefind search; MDX + KaTeX for maths.",
      "Quality gates in CI: Playwright end-to-end tests, axe accessibility checks and a JavaScript size budget. A theme toggle and an optional 'Classic' skin that reproduces the previous site.",
    ],
    evidence: [
      { k: "Curriculum", v: "206 lessons · 6 paths", kind: "cap" },
      { k: "Lessons rebuilt as interactive", v: "150+", kind: "cap" },
      { k: "Market-making game", v: "3 levels", kind: "cap" },
      { k: "CI gates", v: "e2e · axe · JS budget", kind: "cap" },
    ],
    evidenceNote:
      "Counts are taken from the rebuild branch's commit history (Sep 29–30, 2026). The repository is private; a walkthrough is available on request.",
    stack: ["Astro 7", "Preact", "Signals", "MDX", "KaTeX", "d3", "Pagefind", "Supabase", "ts-fsrs", "Playwright", "axe", "Vitest"],
    links: [],
  },

  orderbook: {
    period: "May – Jul 2026",
    role: "Solo",
    summary:
      "The same idea built twice at very different layers: a nanosecond-scale C++23 matching engine, and a full order-book exchange on Solana with a professional trading terminal.",
    problem: [
      "An order book is a small data structure with very hard requirements: price-time priority, no allocation on the hot path, and correctness under every interleaving of inserts, cancels and sweeps.",
    ],
    approach: [
      "orderbookC20 — a C++23 limit order book with a cache-padded wait-free SPSC ring buffer, an object-pool allocator and an intrusive FIFO per price level. A live paper-trader consumes Binance Futures or Spot through the same pipeline and prints event→fill latency percentiles at exit.",
      "Matchbook — an on-chain CLOB in Anchor/Rust with zero-copy book accounts, an event queue settled by a permissionless crank, and SOL-PERP perpetual futures with funding and liquidations. A Rust indexer (Tokio + Axum) rebuilds the book from events into Postgres and serves REST + WebSocket.",
    ],
    frontend: [
      "Matchbook's trading terminal: Next.js with TradingView lightweight-charts candles, a depth-visualized ladder where clicking a level loads its price into the ticket, a trade tape, and a ticket that signs real place_order / cancel_order transactions.",
      "Roles (operator / trader / viewer) are derived from on-chain state; perp mode adds positions, margin math and collateral management behind a market switcher. State is managed with Zustand.",
      "The terminal probes the indexer on load and falls back to a built-in simulator feed when it is unreachable, so the UI is explorable with nothing else running.",
      "Tested at every layer: unit tests with Vitest and Puppeteer end-to-end flows for both spot and perps. orderbookC20 also ships a dependency-free telemetry dashboard published to GitHub Pages.",
    ],
    evidence: [
      { k: "Aggressive sweep (match)", v: "~22 M/s · ~46 ns/op", kind: "perf" },
      { k: "Insert limit (no match)", v: "~9.2 M/s · ~108 ns/op", kind: "perf" },
      { k: "Insert + cancel", v: "~23 M/s · ~42 ns/op", kind: "perf" },
      { k: "Event→fill latency, busy-spin", v: "min ~5 µs · p50 ~10–20 µs", kind: "perf" },
      { k: "Matchbook", v: "live on Solana devnet", kind: "cap" },
    ],
    evidenceNote:
      "Throughput: Apple M-series, single thread, -O3 -march=native, Google Benchmark. Latency excludes the TLS+TCP round trip to Binance.",
    stack: ["C++23", "CMake", "Google Benchmark", "Rust", "Anchor", "Tokio", "Axum", "PostgreSQL", "Next.js", "lightweight-charts", "Zustand", "Vitest"],
    links: [
      { label: "matchbook terminal", href: "https://iiitmanjeet.github.io/matchbook/" },
      { label: "matchbook source", href: "https://github.com/IIITManjeet/matchbook" },
      { label: "orderbookC20 dashboard", href: "https://iiitmanjeet.github.io/orderbookC20/" },
      { label: "orderbookC20 source", href: "https://github.com/IIITManjeet/orderbookC20" },
    ],
  },
};

export default caseStudies;
