// Index redirector - Routes to the saved active theme
(function() {
  'use strict';
  
  let activeTheme = "hanekawa";
  let searchEngine = "google";
  let defaultLocation = { lat: 35.6892, lon: 51.3890 }; // Tehran, Iran
  
  try {
    const saved = localStorage.getItem("monogatari_start_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.activeTheme) {
        activeTheme = parsed.activeTheme;
      }
      // Ensure default location is set to Iran if not already set or if it's the old Canada location
      if (parsed && parsed.location) {
        // Check if it's the old Canada default (Toronto)
        if (parsed.location.lat === 43.653 && parsed.location.lon === -79.383) {
          parsed.location.lat = defaultLocation.lat;
          parsed.location.lon = defaultLocation.lon;
          localStorage.setItem("monogatari_start_config", JSON.stringify(parsed));
          console.log("[Index] Updated old Canada location to Tehran, Iran");
        }
      } else if (parsed) {
        // No location set, add default Iran location
        parsed.location = defaultLocation;
        localStorage.setItem("monogatari_start_config", JSON.stringify(parsed));
        console.log("[Index] Set default location to Tehran, Iran");
      }
      
      // Ensure search engine is set
      if (parsed && !parsed.searchEngine) {
        parsed.searchEngine = searchEngine;
        localStorage.setItem("monogatari_start_config", JSON.stringify(parsed));
        console.log("[Index] Set default search engine to Google");
      }
    } else {
      // No config exists, create one with Iran location and Google search
      const defaultConfig = {
        username: "user",
        location: defaultLocation,
        searchEngine: searchEngine,
        shortcuts: [
          { label: "YouTube", url: "https://youtube.com", icon: "video", color: "teal" },
          { label: "Archwiki", url: "https://wiki.archlinux.org/", icon: "terminal" },
          { label: "Outlook", url: "https://outlook.office.com", icon: "mail" }
        ],
        activeTheme: "hanekawa",
        tsukihiMode: "auto",
        karenMode: "auto",
        kanbaruMode: "auto",
        mayoiMode: "auto",
        sodachiMode: "auto",
        ougiMode: "auto",
        shinobuMode: "auto"
      };
      localStorage.setItem("monogatari_start_config", JSON.stringify(defaultConfig));
      console.log("[Index] Created default config with Tehran, Iran location");
    }
  } catch (e) {
    console.error("[Index] Config load failed. Defaulting to Hanekawa.", e);
  }
  
  // Validate theme exists before redirecting
  const validThemes = [
    "hanekawa", "black_hanekawa", "hitagi", "nadeko", "ononoki",
    "shinobu", "tsukihi", "karen", "mayoi", "kanbaru", "sodachi", "ougi"
  ];
  
  if (!validThemes.includes(activeTheme)) {
    console.warn(`[Index] Invalid theme: ${activeTheme}, defaulting to hanekawa`);
    activeTheme = "hanekawa";
  }
  
  console.log(`[Index] Redirecting to: themes/${activeTheme}.html`);
  window.location.replace("themes/" + activeTheme + ".html");
})();