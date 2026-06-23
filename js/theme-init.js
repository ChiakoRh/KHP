// Theme initialization - runs before page loads to prevent flash of wrong theme
(function() {
  'use strict';
  
  // Configuration - easily adjustable
  const CONFIG_KEY = "monogatari_start_config";
  const DEFAULT_THEME = "hanekawa";
  const DEFAULT_LOCATION = { lat: 35.6892, lon: 51.3890 }; // Tehran, Iran
  
  // Valid themes set (immutable)
  const VALID_THEMES = Object.freeze(new Set([
    "hanekawa", "black_hanekawa", "hitagi", "nadeko",
    "ononoki", "shinobu", "tsukihi", "karen",
    "mayoi", "kanbaru", "sodachi", "ougi"
  ]));
  
  // Themes that ALWAYS set data-theme attribute
  const ALWAYS_SET_THEME = Object.freeze(new Set([
    "tsukihi", "karen", "kanbaru", "sodachi", "shinobu"
  ]));
  
  // Themes that only use dark mode (no explicit light)
  const DARK_ONLY_THEMES = Object.freeze(new Set([
    "mayoi", "ougi"
  ]));
  
  // Helper: Get current page theme from URL
  function getPageTheme() {
    const path = window.location.pathname.split("/").pop();
    return path.replace(".html", "");
  }
  
  // Helper: Check if current time is night (7 PM to 6 AM)
  function isNightTime() {
    const hour = new Date().getHours();
    return hour >= 19 || hour < 6;
  }
  
  // Helper: Load config from localStorage and ensure Iran default location
  function loadConfig() {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (!saved) {
      // Create default config with Iran location
      const defaultConfig = {
        username: "user",
        location: DEFAULT_LOCATION,
        searchEngine: "google",
        shortcuts: [
          { label: "Quercus", url: "https://q.utoronto.ca/", icon: "school", color: "coral" },
          { label: "Acorn", url: "https://acorn.utoronto.ca/", icon: "book" },
          { label: "YouTube", url: "https://youtube.com", icon: "video", color: "teal" },
          { label: "Archwiki", url: "https://wiki.archlinux.org/", icon: "terminal" },
          { label: "Outlook", url: "https://outlook.office.com", icon: "mail" }
        ],
        activeTheme: DEFAULT_THEME,
        tsukihiMode: "auto",
        karenMode: "auto",
        kanbaruMode: "auto",
        mayoiMode: "auto",
        sodachiMode: "auto",
        ougiMode: "auto",
        shinobuMode: "auto"
      };
      localStorage.setItem(CONFIG_KEY, JSON.stringify(defaultConfig));
      return defaultConfig;
    }
    
    try {
      const config = JSON.parse(saved);
      
      // Migrate old Canada location to Iran if needed
      if (config.location && config.location.lat === 43.653 && config.location.lon === -79.383) {
        config.location = DEFAULT_LOCATION;
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
        console.log("[Theme-Init] Migrated Canada location to Tehran, Iran");
      }
      
      // Set default location if not present
      if (!config.location) {
        config.location = DEFAULT_LOCATION;
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
      }
      
      // Set default search engine if not present
      if (!config.searchEngine) {
        config.searchEngine = "google";
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
      }
      
      return config;
    } catch (e) {
      console.warn("Failed to parse config in theme-init:", e);
      return {};
    }
  }
  
  // Helper: Apply theme to HTML element
  function applyTheme(theme, mode, isNight) {
    const htmlEl = document.documentElement;
    
    // Handle dark-only themes (mayoi, ougi)
    if (DARK_ONLY_THEMES.has(theme)) {
      const shouldBeDark = mode === "dark" || (mode === "auto" && isNight);
      if (shouldBeDark) {
        htmlEl.setAttribute("data-theme", "dark");
      } else {
        htmlEl.removeAttribute("data-theme");
      }
      return;
    }
    
    // Handle themes that always set explicit light/dark
    if (ALWAYS_SET_THEME.has(theme)) {
      let finalMode;
      if (mode === "auto") {
        finalMode = isNight ? "dark" : "light";
      } else {
        finalMode = mode;
      }
      htmlEl.setAttribute("data-theme", finalMode);
      return;
    }
    
    // Default theme (hanekawa, black_hanekawa, hitagi, nadeko, ononoki)
    // These don't have mode settings, so we do nothing
    // Individual HTML files handle their own styling
  }
  
  // Helper: Validate and redirect if needed
  function handleRedirect(pageTheme, config) {
    const savedTheme = config.activeTheme;
    
    // Case 1: Saved theme exists and is valid, but we're on wrong page
    if (savedTheme && VALID_THEMES.has(savedTheme)) {
      if (pageTheme !== savedTheme) {
        window.location.replace(savedTheme + ".html");
        return true; // Redirect happened
      }
      return false; // Already on correct page
    }
    
    // Case 2: No saved theme or invalid page
    if (!pageTheme || !VALID_THEMES.has(pageTheme)) {
      window.location.replace(DEFAULT_THEME + ".html");
      return true; // Redirect happened
    }
    
    return false; // No redirect needed
  }
  
  // Helper: Preload critical assets into service worker cache
  function preloadCriticalAssets() {
    if (!('caches' in window)) return;
    
    // Wait until page is idle to preload
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        caches.open('monogatari-cache-v1').then(async (cache) => {
          const criticalAssets = [
            'core.js',
            'settings.js',
            'theme-init.js',
            'hanekawa.html',
            '../assets/images/hanekawa1.png',
            '../assets/images/hanekawa2.png',
            '../assets/images/hanekawa3.png'
          ];
          
          for (const asset of criticalAssets) {
            try {
              const cached = await cache.match(asset);
              if (!cached) {
                const response = await fetch(asset);
                if (response.ok) {
                  await cache.put(asset, response);
                  console.log(`[Theme-Init] Preloaded: ${asset}`);
                }
              }
            } catch (e) {
              // Silently fail - asset will load normally
            }
          }
        });
      }, { timeout: 3000 });
    }
  }
  
  // Main execution
  try {
    const config = loadConfig();
    const pageTheme = getPageTheme();
    
    // Handle redirects first
    const redirected = handleRedirect(pageTheme, config);
    if (redirected) return; // Stop execution, redirect in progress
    
    // Determine active theme
    const activeTheme = pageTheme || config.activeTheme || DEFAULT_THEME;
    
    // Get mode setting for this theme (if any)
    const modeKey = activeTheme + "Mode";
    const mode = config[modeKey] || "auto";
    const isNight = isNightTime();
    
    // Apply the theme
    applyTheme(activeTheme, mode, isNight);
    
    // Preload critical assets for faster subsequent loads (only on main themes)
    if (activeTheme === 'hanekawa') {
      preloadCriticalAssets();
    }
    
  } catch (e) {
    // Silent fail - worst case, page loads with default styling
    console.warn("Theme initialization failed:", e);
  }
})();