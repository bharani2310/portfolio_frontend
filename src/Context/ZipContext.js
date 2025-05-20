// src/context/PortfolioContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

/* ------------------------------------------------------------------ *
 *  Context + hook
 * ------------------------------------------------------------------ */
const PortfolioContext = createContext(null);

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) console.warn("usePortfolio must be used inside <PortfolioProvider>");
  return ctx;                         // { skills, projects, tech, images }
};

/* ------------------------------------------------------------------ *
 *  Provider
 * ------------------------------------------------------------------ */
const CACHE_KEY = "portfolioData";
const API_URL   =
  "https://portfolio-worker.my-portfolio.workers.dev/api/retrievezip";

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    (async () => {
      /* 1. Try local cache — but only if it's still fresh --------------- */
      const cached      = localStorage.getItem(CACHE_KEY);
      const cacheIsLive = isCacheValid(CACHE_KEY);

      if (cached && cacheIsLive) {
        setPortfolio(JSON.parse(cached));
        return;
      }

      /* 2. Fetch JSON from Worker -------------------------------------- */
      try {
        const res = await fetch(API_URL, { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        /* 3. Store + update state -------------------------------------- */
        localStorage.setItem(CACHE_KEY, JSON.stringify(json));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
        setPortfolio(json);
        window.location.reload()
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);

        /* 4. Fallback to stale cache if we have *something* ------------- */
        if (cached) {
          setPortfolio(JSON.parse(cached));
        }
      }
    })();
  }, []);

  return (
    <PortfolioContext.Provider value={portfolio}>
      {children}
    </PortfolioContext.Provider>
  );
};

/* ------------------------------------------------------------------ *
 *  Cache helpers
 * ------------------------------------------------------------------ */
export const isCacheValid = (key, expiryTime = 6 * 60 * 60 * 1000) => {
  // Look for the timestamp that accompanied the cached payload
  const lastUpdated = parseInt(localStorage.getItem(`${key}_timestamp`), 10) || 0;
  // Return true if the data is newer than <expiryTime> (default 6 h)
  return (Date.now() - lastUpdated) < expiryTime;
};
