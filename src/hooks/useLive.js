import { useEffect, useState } from "react";

// Module-level cache so every component shares one round of fetches.
let cachePromise = null;

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.json();
}

function fetchLiveStats() {
  if (!cachePromise) {
    cachePromise = (async () => {
      const [cf, hack36, mudlet] = await Promise.allSettled([
        fetchJson(
          "https://codeforces.com/api/user.info?handles=Manjeet_Pathak"
        ),
        fetchJson("https://api.github.com/repos/IIITManjeet/Hack36"),
        fetchJson("https://api.github.com/repos/Mudlet/Mudlet"),
      ]);
      const stats = {};
      if (cf.status === "fulfilled" && cf.value.status === "OK") {
        const u = cf.value.result[0];
        stats.cf = {
          rating: u.rating,
          maxRating: u.maxRating,
          rank: u.rank,
        };
      }
      if (hack36.status === "fulfilled")
        stats.hack36Stars = hack36.value.stargazers_count;
      if (mudlet.status === "fulfilled")
        stats.mudletStars = mudlet.value.stargazers_count;
      return stats;
    })().catch(() => ({}));
  }
  return cachePromise;
}

/** Live profile stats with static fallbacks — resolves once per page load. */
export function useLiveStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    let alive = true;
    fetchLiveStats().then((s) => alive && setStats(s));
    return () => {
      alive = false;
    };
  }, []);
  return stats; // null while loading, {} on total failure
}
