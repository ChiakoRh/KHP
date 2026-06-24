const CONFIG_KEY = "monogatari_start_config";
const WEATHER_CACHE_KEY = "monogatari_weather_cache";
const WEATHER_CACHE_DURATION = 900000; // 15 minutes
const CLOCK_UPDATE_INTERVAL = 1000;
const THEME_CHECK_INTERVAL = 60000; // 1 minute

// Search engine options
const SEARCH_ENGINES = {
  google: {
    name: "Google",
    url: "https://www.google.com/search?q=",
    icon: "google"
  },
  duckduckgo: {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    icon: "duckduckgo"
  },
  bing: {
    name: "Bing",
    url: "https://www.bing.com/search?q=",
    icon: "search"
  },
  brave: {
    name: "Brave",
    url: "https://search.brave.com/search?q=",
    icon: "search"
  },
  yandex: {
    name: "Yandex",
    url: "https://yandex.com/search/?text=",
    icon: "search"
  }
};

// Minified icon dictionary
const iconDict = {
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
  school: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
  video: '<path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>',
  code: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
  terminal: '<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>',
  globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
  search: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
  settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
  bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
  clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
  music: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>',
  map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',
  rss: '<path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
  wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
  acorn: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 2c-2.5 0-4.5 1.5-5.5 3.5S4 10 4 12c0 3 2.5 5 5 5h6c2.5 0 5-2 5-5 0-2-1.5-4.5-2.5-6.5S14.5 2 12 2z"/><path d="M12 17v5" /><path d="M9 22h6" /></svg>',
  terminal2: '<svg class="icon" viewBox="0 0 24 24"><path d="M8 9l3 3-3 3M13 17h4" /><rect x="3" y="4" width="18" height="16" rx="2" ry="2" /></svg>',
  google: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none"/><text x="5" y="17" font-size="14" font-weight="bold">G</text></svg>',
  duckduckgo: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none"/><path d="M8 10h8M8 14h6" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/></svg>'
};

// Weather icons
const wxIcons = {
  sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  rain: `<svg viewBox="0 0 24 24"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>`,
  snow: `<svg viewBox="0 0 24 24"><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></svg>`,
  thunder: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
};

// Default shortcuts
const DEFAULT_SHORTCUTS = [
  { label: "YouTube", url: "https://youtube.com", icon: "video", color: "teal" },
  { label: "Archwiki", url: "https://wiki.archlinux.org/", icon: "terminal" },
  { label: "Outlook", url: "https://outlook.office.com", icon: "mail" },
];

// Default config with Iran location (Tehran coordinates)
const DEFAULT_CONFIG = {
  username: "user",
  location: { lat: 35.6892, lon: 51.3890 }, // Tehran, Iran
  searchEngine: "google",
  clockFormat: "24h",
  calendar: "gregorian",
  language: "en",
  customCSS: "",
  todoList: [],
  shortcuts: [...DEFAULT_SHORTCUTS],
  activeTheme: "hanekawa",
  tsukihiMode: "auto",
  karenMode: "auto",
  kanbaruMode: "auto",
  mayoiMode: "auto",
  sodachiMode: "auto",
  ougiMode: "auto",
  shinobuMode: "auto",
};

// Mathematics equations for Sodachi theme
const MATHEMATICS_AXIOMS = [
  `\\begin{cases} \\frac{dx}{dt} = \\sigma(y - x) \\\\ \\frac{dy}{dt} = x(\\rho - z) - y \\\\ \\frac{dz}{dt} = xy - \\beta z \\end{cases}`,
  `z_{n+1} = z_n^2 + c`,
  `e^{i\\pi} + 1 = 0`,
  `G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}`,
  `i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\hat{H}\\Psi(\\mathbf{r},t)`,
  `\\rho\\left(\\frac{\\partial \\mathbf{v}}{\\partial t} + (\\mathbf{v} \\cdot \\nabla)\\mathbf{v}\\right) = -\\nabla p + \\mu\\nabla^2 \\mathbf{v} + \\mathbf{f}`,
  `\\begin{cases} \\nabla \\cdot \\mathbf{E} = 0 \\\\ \\nabla \\cdot \\mathbf{B} = 0 \\\\ \\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\ \\nabla \\times \\mathbf{B} = \\frac{1}{c^2}\\frac{\\partial \\mathbf{E}}{\\partial t} \\end{cases}`,
  `(i\\gamma^\\mu\\partial_\\mu - m)\\psi = 0`,
  `\\zeta(s) = \\frac{1}{\\Gamma(s)}\\int_0^\\infty \\frac{x^{s-1}}{e^x-1} dx`,
  `\\mathcal{L} = -\\frac{1}{4} F_{\\mu\\nu}^a F^{a\\mu\\nu}`,
];

// Theme type mappings for mode applications
const THEME_CONFIGS = {
  tsukihi: { key: "tsukihiMode", apply: applyTsukihiMode },
  karen: { key: "karenMode", apply: applyKarenMode },
  mayoi: { key: "mayoiMode", apply: applyMayoiMode },
  kanbaru: { key: "kanbaruMode", apply: applyKanbaruMode },
  sodachi: { key: "sodachiMode", apply: applySodachiMode },
  ougi: { key: "ougiMode", apply: applyOugiMode },
  shinobu: { key: "shinobuMode", apply: applyShinobuMode },
};

// Initialize global state
window.state = { config: { ...DEFAULT_CONFIG } };

// Helper: Get current theme from URL
function getCurrentTheme() {
  const page = window.location.pathname.split("/").pop().replace(".html", "");
  return page || window.state.config.activeTheme;
}

// Helper: Check if it's night time (7 PM to 6 AM)
function isNightTime() {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 6;
}

// Helper: Check if it's day time (6 AM to 7 PM)
function isDayTime() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 19;
}

// Helper: Get search URL based on saved preference
function getSearchUrl(query) {
  const engine = window.state.config.searchEngine || "google";
  const searchEngine = SEARCH_ENGINES[engine] || SEARCH_ENGINES.google;
  return searchEngine.url + encodeURIComponent(query);
}

// Jalali (Persian) date conversion
function toJalali(gy, gm, gd) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy, jm, jd;
  let gy2 = gm > 2 ? gy + 1 : gy;
  let days = 355666 + 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + days % 31;
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + (days - 186) % 30;
  }
  return { year: jy, month: jm, day: jd };
}

function formatJalali(date) {
  const j = toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  return `${j.year}.${j.month.toString().padStart(2, "0")}.${j.day.toString().padStart(2, "0")}`;
}

function formatJalaliLong(date) {
  const j = toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  return `${j.day} ${months[j.month - 1]} ${j.year}`;
}

// Persian translations
const LANG = {
  en: {
    search: "Search...",
    settings: "SETTINGS",
    save: "SAVE",
    welcome: "Welcome",
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    stillUp: "Still up",
  },
  fa: {
    search: "جستجو...",
    settings: "تنظیمات",
    save: "ذخیره",
    welcome: "خوش آمدید",
    goodMorning: "صبح بخیر",
    goodAfternoon: "عصر بخیر",
    goodEvening: "شب بخیر",
    stillUp: "بیداری هنوز؟",
  }
};

// Load and merge saved config
function loadConfig() {
  const saved = localStorage.getItem(CONFIG_KEY);
  if (!saved) return;
  
  try {
    const parsed = JSON.parse(saved);
    window.state.config = { ...DEFAULT_CONFIG, ...parsed };
    
    // Ensure location defaults to Iran if not set
    if (!parsed.location || (parsed.location.lat === 43.653 && parsed.location.lon === -79.383)) {
      window.state.config.location = { lat: 35.6892, lon: 51.3890 };
    }
    
    // Restore shortcuts with colors from defaults
    if (parsed.shortcuts) {
      window.state.config.shortcuts = parsed.shortcuts.map((s, i) => {
        if (s.color !== undefined) return s;
        const match = DEFAULT_SHORTCUTS.find(d => d.url === s.url) || DEFAULT_SHORTCUTS[i];
        return match?.color ? { ...s, color: match.color } : s;
      });
    }
  } catch (e) {
    console.warn("Failed to parse saved config", e);
  }
}

// Save config to localStorage
function saveConfig() {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(window.state.config));
}

// Theme mode apply functions
function applyTsukihiMode() {
  const mode = window.state.config.tsukihiMode || "auto";
  const isDark = mode === "auto" ? isNightTime() : mode === "dark";
  document.documentElement.toggleAttribute("data-theme", isDark);
}

function applyMayoiMode() {
  const mode = window.state.config.mayoiMode || "auto";
  const isDark = mode === "auto" ? isNightTime() : mode === "dark";
  document.documentElement.toggleAttribute("data-theme", isDark);
}

function applyKanbaruMode() {
  const mode = window.state.config.kanbaruMode || "auto";
  const isDark = mode === "auto" ? isNightTime() : mode === "dark";
  document.documentElement.toggleAttribute("data-theme", isDark);
}

function applySodachiMode() {
  const mode = window.state.config.sodachiMode || "auto";
  const isDark = mode === "auto" ? isNightTime() : mode === "dark";
  document.documentElement.toggleAttribute("data-theme", isDark);
}

function applyOugiMode() {
  const mode = window.state.config.ougiMode || "auto";
  const isDark = mode === "auto" ? isNightTime() : mode === "dark";
  document.documentElement.toggleAttribute("data-theme", isDark);
}

function applyKarenMode() {
  const mode = window.state.config.karenMode || "auto";
  const isLight = mode === "auto" ? isDayTime() : mode === "light";
  document.documentElement.toggleAttribute("data-theme", isLight);
}

function applyShinobuMode() {
  const mode = window.state.config.shinobuMode || "auto";
  const isLight = mode === "auto" ? isDayTime() : mode === "light";
  document.documentElement.toggleAttribute("data-theme", isLight);
}

// Set up theme interval if needed
function setupThemeInterval(theme) {
  const config = THEME_CONFIGS[theme];
  if (config) {
    config.apply();
    setInterval(config.apply, THEME_CHECK_INTERVAL);
  }
}

// Update clock displays
function updateClock() {
  const now = new Date();
  const config = window.state?.config || DEFAULT_CONFIG;
  const is24h = config.clockFormat !== "12h";
  const cal = config.calendar || "gregorian";
  const lang = config.language || "en";
  
  let hours, display;
  if (is24h) {
    hours = now.getHours().toString().padStart(2, "0");
    display = `${hours}:${now.getMinutes().toString().padStart(2, "0")}`;
  } else {
    const h = now.getHours();
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    display = `${h12}:${now.getMinutes().toString().padStart(2, "0")} ${ampm}`;
  }
  
  document.querySelectorAll("#clock").forEach(el => {
    el.textContent = display;
  });
  
  document.querySelectorAll("#date").forEach(el => {
    if (cal === "jalali") {
      el.textContent = formatJalali(now);
    } else {
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      el.textContent = `${year}.${month}.${day}`;
    }
  });
  
  // Translate placeholders
  document.querySelectorAll("#search").forEach(el => {
    el.placeholder = LANG[lang]?.search || "Search...";
  });
}

// Weather helpers
function getWeatherIcon(code, isDay) {
  if (code === 0) return isDay ? wxIcons.sun : wxIcons.moon;
  if (code >= 1 && code <= 3) return wxIcons.cloud;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return wxIcons.rain;
  if (code >= 71 && code <= 86) return wxIcons.snow;
  if (code >= 95) return wxIcons.thunder;
  return wxIcons.cloud;
}

async function updateWeather() {
  const cacheStr = localStorage.getItem(WEATHER_CACHE_KEY);
  const now = Date.now();
  const { lat, lon } = window.state.config.location;
  
  // Show loading state
  document.querySelectorAll("#wx-temp, #weather").forEach(el => {
    if (el.id === "wx-temp" || (el.id === "weather" && !el.querySelector("#wx-temp"))) {
      el.textContent = "⏳";
    }
  });
  
  // Check cache
  if (cacheStr) {
    try {
      const cache = JSON.parse(cacheStr);
      const isSameLoc = cache.lat === lat && cache.lon === lon;
      if (now - cache.timestamp < WEATHER_CACHE_DURATION && isSameLoc) {
        applyWeatherData(cache.temp, cache.code, cache.isDay);
        return;
      }
    } catch (e) { /* ignore */ }
  }
  
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`);
    if (!res.ok) throw new Error("Weather API failed");
    
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const code = data.current.weather_code || 0;
    const isDay = data.current.is_day === 1;
    
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ temp, code, isDay, timestamp: now, lat, lon }));
    applyWeatherData(temp, code, isDay);
  } catch (err) {
    applyWeatherData("ERR", 0, true);
  }
}

function applyWeatherData(temp, code, isDay) {
  window.currentWeatherCode = code;
  window.currentWeatherIsDay = isDay;
  window.currentTemperature = temp;
  
  const tempStr = temp === "ERR" ? temp : `${temp}°C`;
  document.querySelectorAll("#wx-temp, #weather").forEach(el => {
    if (el.id === "weather" && (el.querySelector("#wx-temp") || (el.innerHTML.includes("<span") && el.id === "weather"))) return;
    el.textContent = tempStr;
  });
  
  const iconHtml = getWeatherIcon(code, isDay);
  document.querySelectorAll("#wx-icon").forEach(el => {
    el.innerHTML = iconHtml;
  });
  
  document.dispatchEvent(new CustomEvent("weatherUpdated"));
}

// Shortcut injection
function injectShortcuts() {
  const container = document.querySelector("nav.links, nav.nav-links, #links, .links-block, .links-grid");
  if (!container) return;
  
  const theme = getCurrentTheme();
  const shortcuts = window.state.config.shortcuts;
  
  const generateLink = (s) => {
    const iconSvg = `<svg class="icon" viewBox="0 0 24 24" ${theme !== "nadeko" ? 'style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;margin-right:8px"' : ''}>${iconDict[s.icon] || iconDict.link}</svg>`;
    
    switch (theme) {
      case "hanekawa": case "hitagi": case "sodachi": case "ougi": case "shinobu":
        return `<a href="${s.url}" class="link">${iconSvg}<span>${s.label}</span></a>`;
      case "nadeko":
        return `<a href="${s.url}" class="link">${iconSvg}${s.label}</a>`;
      case "tsukihi":
        const colorClass = s.color ? ` ${s.color}` : "";
        return `<a href="${s.url}" class="link-chip${colorClass} interactive"><div class="state-layer"></div><span>${s.label}</span></a>`;
      case "karen":
        return `<a href="${s.url}" class="link"><svg viewBox="0 0 24 24">${iconDict[s.icon] || iconDict.link}</svg><span>${s.label}</span></a>`;
      case "mayoi": case "kanbaru":
        return `<a href="${s.url}" class="shortcut"><svg viewBox="0 0 24 24">${iconDict[s.icon] || iconDict.link}</svg><span>${s.label}</span></a>`;
      default:
        return `<a href="${s.url}" class="link">${s.label}</a>`;
    }
  };
  
  const html = shortcuts.map(generateLink).join("");
  container.insertAdjacentHTML(theme === "nadeko" ? "beforeend" : "afterbegin", html);
}

// Theme-specific initialization
function initSodachiTheme() {
  const loopEl = document.getElementById("equation-loop");
  if (!loopEl) return;
  
  const waitForKatex = () => {
    if (typeof katex === "undefined") {
      setTimeout(waitForKatex, 100);
      return;
    }
    
    let index = 0;
    const nextEquation = () => {
      loopEl.style.opacity = "0";
      loopEl.style.filter = "blur(4px)";
      setTimeout(() => {
        katex.render(MATHEMATICS_AXIOMS[index], loopEl, { displayMode: true });
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        loopEl.style.opacity = isDark ? "0.35" : "0.25";
        loopEl.style.filter = "blur(0px)";
        index = (index + 1) % MATHEMATICS_AXIOMS.length;
      }, 800);
      setTimeout(nextEquation, 4500);
    };
    nextEquation();
  };
  waitForKatex();
  
  setTimeout(() => {
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) greetingEl.textContent = `GIVEN: ${window.state.config.username.toUpperCase()}`;
    
    const linksContainer = document.getElementById("links");
    if (linksContainer) {
      linksContainer.querySelectorAll(".link").forEach((link, idx) => {
        const num = (idx + 1).toString().padStart(2, "0");
        const span = link.querySelector("span");
        if (span) {
          span.textContent = `[${num}] ` + span.textContent;
        }
      });
    }
  }, 100);
}

function initHitagiTheme() {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = Math.random() * 15 + 10 + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";
    document.body.appendChild(particle);
  }
}

function initKanbaruTheme() {
  const updateGreeting = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const greetingEl = document.getElementById("greeting-box");
    const searchEl = document.getElementById("search");
    if (!greetingEl || !searchEl) return;
    
    greetingEl.textContent = isDark ? `Good evening, ${window.state.config.username}-senpai.` : `Welcome back, ${window.state.config.username}-senpai.`;
    searchEl.placeholder = "Type to search...";
  };
  
  const observer = new MutationObserver((mutations) => {
    if (mutations.some(m => m.attributeName === "data-theme")) updateGreeting();
  });
  observer.observe(document.documentElement, { attributes: true });
  updateGreeting();
}

function initKarenTheme() {
  const images = ["../assets/images/karen1.jpg", "../assets/images/karen2.jpg", "../assets/images/karen3.jpg", "../assets/images/karen4.jpg", "../assets/images/karen5.jpg", "../assets/images/karen6.jpg", "../assets/images/karen7.jpg"];
  const visualEl = document.getElementById("karen-visual");
  const wrapperEl = document.getElementById("hero-wrapper");
  if (!visualEl || !wrapperEl) return;
  
  let currentIndex = Math.floor(Math.random() * images.length);
  visualEl.src = images[currentIndex];
  
  setInterval(() => {
    wrapperEl.classList.remove("cycle-in");
    wrapperEl.classList.add("cycle-out");
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      visualEl.src = images[currentIndex];
      visualEl.onload = () => {
        wrapperEl.classList.remove("cycle-out");
        wrapperEl.classList.add("cycle-in");
      };
    }, 300);
  }, THEME_CHECK_INTERVAL);
}

function initMayoiTheme() {
  const buildGreeting = (text) => {
    const box = document.getElementById("greeting-box");
    if (!box) return;
    box.innerHTML = "";
    for (const char of text) {
      const span = document.createElement("span");
      span.className = "stutter-char";
      span.innerHTML = char === " " ? "&nbsp;" : char;
      box.appendChild(span);
    }
  };
  
  const updateGreeting = () => {
    const hour = new Date().getHours();
    let text;
    if (hour >= 5 && hour < 12) text = `good morning ${window.state.config.username}`;
    else if (hour >= 12 && hour < 17) text = `good afternoon ${window.state.config.username}`;
    else if (hour >= 17 && hour < 22) text = `good evening ${window.state.config.username}`;
    else text = `still up, ${window.state.config.username}?`;
    buildGreeting(text);
  };
  
  updateGreeting();
  setInterval(updateGreeting, THEME_CHECK_INTERVAL);
}

function initTsukihiTheme() {
  const SHAPE_4 = "M32.0,2.0L34.3,2.3L36.5,3.3L38.5,4.8L40.2,6.8L41.6,8.9L42.6,11.1L43.5,13.2L44.3,15.0L45.1,16.6L46.1,17.9L47.4,18.9L49.0,19.7L50.8,20.5L52.9,21.4L55.1,22.4L57.2,23.8L59.2,25.5L60.7,27.5L61.7,29.7L62.0,32.0L61.7,34.3L60.7,36.5L59.2,38.5L57.2,40.2L55.1,41.6L52.9,42.6L50.8,43.5L49.0,44.3L47.4,45.1L46.1,46.1L45.1,47.4L44.3,49.0L43.5,50.8L42.6,52.9L41.6,55.1L40.2,57.2L38.5,59.2L36.5,60.7L34.3,61.7L32.0,62.0L29.7,61.7L27.5,60.7L25.5,59.2L23.8,57.2L22.4,55.1L21.4,52.9L20.5,50.8L19.7,49.0L18.9,47.4L17.9,46.1L16.6,45.1L15.0,44.3L13.2,43.5L11.1,42.6L8.9,41.6L6.8,40.2L4.8,38.5L3.3,36.5L2.3,34.3L2.0,32.0L2.3,29.7L3.3,27.5L4.8,25.5L6.8,23.8L8.9,22.4L11.1,21.4L13.2,20.5L15.0,19.7L16.6,18.9L17.9,17.9L18.9,16.6L19.7,15.0L20.5,13.2L21.4,11.1L22.4,8.9L23.8,6.8L25.5,4.8L27.5,3.3L29.7,2.3Z";
  const SHAPE_6 = "M32.0,10.0L33.8,9.7L35.7,8.8L37.8,7.7L40.2,6.7L42.7,6.2L45.1,6.3L47.1,7.3L48.7,9.1L49.6,11.4L50.0,14.0L50.2,16.5L50.3,18.7L50.8,20.5L51.8,21.9L53.3,23.2L55.2,24.5L57.3,25.9L59.2,27.7L60.5,29.8L61.0,32.0L60.5,34.2L59.2,36.3L57.3,38.1L55.2,39.5L53.3,40.8L51.8,42.1L50.8,43.5L50.3,45.3L50.2,47.5L50.0,50.0L49.6,52.6L48.7,54.9L47.1,56.7L45.1,57.7L42.7,57.8L40.2,57.3L37.8,56.3L35.7,55.2L33.8,54.3L32.0,54.0L30.2,54.3L28.3,55.2L26.2,56.3L23.8,57.3L21.3,57.8L18.9,57.7L16.9,56.7L15.3,54.9L14.4,52.6L14.0,50.0L13.8,47.5L13.7,45.3L13.2,43.5L12.2,42.1L10.7,40.8L8.8,39.5L6.7,38.1L4.8,36.3L3.5,34.2L3.0,32.0L3.5,29.8L4.8,27.7L6.7,25.9L8.8,24.5L10.7,23.2L12.2,21.9L13.2,20.5L13.7,18.7L13.8,16.5L14.0,14.0L14.4,11.4L15.3,9.1L16.9,7.3L18.9,6.3L21.3,6.2L23.8,6.7L26.2,7.7L28.3,8.8L30.2,9.7Z";

  // Update greeting with actual username
  const greetingEl = document.getElementById("greeting");
  if (greetingEl) {
    const hour = new Date().getHours();
    const username = window.state?.config?.username || "user";
    let text;
    if (hour >= 5 && hour < 12) text = `good morning, ${username}.`;
    else if (hour >= 12 && hour < 17) text = `good afternoon, ${username}.`;
    else if (hour >= 17 && hour < 22) text = `good evening, ${username}.`;
    else text = `still up, ${username}?`;
    greetingEl.textContent = text;
  }

  const shapePath = document.querySelector(".settings-btn .btn-shape path");
  if (shapePath) {
    shapePath.setAttribute("d", SHAPE_4);
    const btn = document.getElementById("open-settings-btn");
    if (btn) {
      btn.addEventListener("mouseenter", () => shapePath.setAttribute("d", SHAPE_6));
      btn.addEventListener("mouseleave", () => shapePath.setAttribute("d", SHAPE_4));
    }
  }

  const createRipple = (event) => {
    const el = event.currentTarget;
    const diameter = Math.max(el.clientWidth, el.clientHeight);
    const radius = diameter / 2;
    const rect = el.getBoundingClientRect();
    const clientX = event.clientX || rect.left + radius;
    const clientY = event.clientY || rect.top + radius;
    
    const circle = document.createElement("div");
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${clientX - rect.left - radius}px`;
    circle.style.top = `${clientY - rect.top - radius}px`;
    circle.classList.add("ripple");
    
    const existingRipple = el.querySelector(".ripple");
    if (existingRipple) existingRipple.remove();
    
    el.appendChild(circle);
    setTimeout(() => circle.remove(), 400);
  };
  
  document.querySelectorAll(".interactive").forEach(el => {
    el.addEventListener("mousedown", createRipple);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        createRipple(e);
      }
    });
  });
}

function initShinobuTheme() {
  const container = document.getElementById("ember-container");
  if (!container) return;
  
  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const ember = document.createElement("div");
    ember.className = "ember";
    const size = Math.random() * 4 + 1;
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;
    ember.style.left = `${Math.random() * 100}vw`;
    ember.style.animationDuration = `${Math.random() * 15 + 10}s`;
    ember.style.animationDelay = `${Math.random() * 15}s`;
    
    if (Math.random() > 0.7) {
      ember.style.background = "#d10000";
      ember.style.boxShadow = "0 0 4px #d10000";
    }
    container.appendChild(ember);
  }
}

function initThemeSpecificFeatures(theme) {
  const themeHandlers = {
    sodachi: initSodachiTheme,
    hitagi: initHitagiTheme,
    kanbaru: initKanbaruTheme,
    karen: initKarenTheme,
    mayoi: initMayoiTheme,
    tsukihi: initTsukihiTheme,
    shinobu: initShinobuTheme,
  };
  
  const handler = themeHandlers[theme];
  if (handler) handler();
}

// Inject custom CSS
function injectCustomCSS() {
  const existing = document.getElementById("custom-user-css");
  if (existing) existing.remove();
  const css = window.state?.config?.customCSS;
  if (!css) return;
  const style = document.createElement("style");
  style.id = "custom-user-css";
  style.textContent = css;
  document.head.appendChild(style);
}

// Global UI initialization
function initGlobalUI() {
  const flashOverlay = document.getElementById("flash-overlay");
  if (flashOverlay) {
    setTimeout(() => { flashOverlay.style.opacity = "0"; }, 300);
  }
  
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && searchInput.value.trim()) {
        const query = searchInput.value.trim();
        if (flashOverlay) flashOverlay.style.opacity = "1";
        setTimeout(() => {
          window.location.href = getSearchUrl(query);
        }, 150);
      }
    });
  }
  
  // Escape key to close settings
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && typeof window.closeSettings === "function") {
      window.closeSettings();
    }
  });
  
  // Delegate settings button clicks
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#settings-btn, .settings-btn, .btn-settings, #open-settings-btn");
    const isTextMatch = e.target.textContent?.trim().toUpperCase() === "SETTINGS";
    
    if ((btn || isTextMatch) && typeof window.openSettings === "function") {
      e.preventDefault();
      window.openSettings();
    }
  });
  
  const video = document.getElementById("bg-video");
  if (video) {
    video.addEventListener("error", () => { video.style.display = "none"; });
  }
}

// Handle video pause/play on visibility change
function initVisibilityHandler() {
  document.addEventListener("visibilitychange", () => {
    document.querySelectorAll("video").forEach(v => {
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    });
  });
}

// ==================== SERVICE WORKER REGISTRATION ====================
// Register service worker for offline support and faster loading

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service Worker not supported in this browser');
    return;
  }

  // Determine correct SW path based on current page location
  const isSubdir = window.location.pathname.includes('/themes/');
  const swPath = isSubdir ? '../sw.js' : 'sw.js';
  
  // Wait for page to fully load before registering
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(swPath)
      .then((registration) => {
        console.log('[SW] Service Worker registered successfully:', registration.scope);
        
        // Check for updates every hour
        setInterval(() => {
          registration.update().catch(err => console.log('[SW] Update check failed:', err));
        }, 60 * 60 * 1000);
      })
      .catch((error) => {
        console.error('[SW] Service Worker registration failed:', error);
      });
  });
}

// ==================== MAIN INITIALIZATION ====================

function initCore() {
  loadConfig();
  
  const theme = getCurrentTheme();
  window.state.config.activeTheme = theme;
  
  setupThemeInterval(theme);
  initGlobalUI();
  initThemeSpecificFeatures(theme);
  
  updateClock();
  setInterval(updateClock, CLOCK_UPDATE_INTERVAL);
  
  // Apply custom CSS
  injectCustomCSS();
  
  updateWeather();
  injectShortcuts();
  initVisibilityHandler();
  
  // Register service worker after core is initialized
  registerServiceWorker();
}

// Start the app
window.addEventListener("DOMContentLoaded", initCore);