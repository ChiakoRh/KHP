/**
 * Monogatari Start Page - Settings Menu
 * Features: Visual icon picker, global shortcuts, beautiful UI
 * FIXED: No scrolling - fits exactly in viewport
 */

// ==================== STYLES ====================

const SETTINGS_CSS = `
#settings-shell {
  --ui-bg: #121212;
  --ui-panel: #1e1e1e;
  --ui-text: #e0e0e0;
  --ui-border: 3px solid #000;
  --ui-outline: #333;
  --ui-label: #aaa;
  --ui-input-bg: #121212;
  --ui-input-text: #e0e0e0;
  --ui-input-border: #333;
  --ui-box-shadow: 12px 12px 0 #000;
}

#settings-shell[data-settings-theme="light"] {
  --ui-bg: #f4f4f4;
  --ui-panel: #e8e8e8;
  --ui-text: #1a1a1a;
  --ui-border: 3px solid #999;
  --ui-outline: #bbb;
  --ui-label: #555;
  --ui-input-bg: #fff;
  --ui-input-text: #1a1a1a;
  --ui-input-border: #999;
  --ui-box-shadow: 12px 12px 0 #999;
}

#settings-shell * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* PREVENT ANY SCROLLING ON BODY */
html, body {
  overflow: hidden !important;
  height: 100% !important;
  width: 100% !important;
  position: fixed;
}

#settings-shell .settings-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  overflow: hidden !important;
}

#settings-shell .settings-modal[hidden] {
  display: none !important;
}

#settings-shell .settings-content {
  position: relative;
  background: var(--ui-panel);
  color: var(--ui-text);
  border: var(--ui-border);
  box-shadow: var(--ui-box-shadow);
  padding: 20px 28px;
  width: 92vw;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  font-family: "Space Grotesk", "Segoe UI", system-ui, sans-serif;
  transition: background 0.15s, color 0.15s;
  max-height: 88vh;
  overflow-y: auto;
  border-radius: 8px;
}

/* Custom scrollbar for content (thin, doesn't affect layout) */
#settings-shell .settings-content::-webkit-scrollbar {
  width: 4px;
}
#settings-shell .settings-content::-webkit-scrollbar-track {
  background: var(--ui-outline);
  border-radius: 4px;
}
#settings-shell .settings-content::-webkit-scrollbar-thumb {
  background: var(--ui-text);
  border-radius: 4px;
}

/* Header with title and actions */
.settings-header {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 6px;
  border-bottom: 2px solid var(--ui-outline);
  flex-wrap: wrap;
  gap: 10px;
}

.settings-header h2 {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -1px;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.theme-toggle-btn,
.close-btn {
  height: 36px;
  background: var(--ui-panel);
  border: 2px solid var(--ui-outline);
  color: var(--ui-text);
  font-family: "Space Grotesk", sans-serif;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  border-radius: 4px;
}

.theme-toggle-btn {
  padding: 0 14px;
  font-size: 11px;
  letter-spacing: 1px;
  white-space: nowrap;
}

.close-btn {
  width: 36px;
  font-size: 18px;
}

.theme-toggle-btn:hover,
.close-btn:hover {
  background: var(--ui-text);
  color: var(--ui-panel);
  border-color: var(--ui-text);
}

#settings-shell .settings-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

#settings-shell .section-header {
  font-size: 15px;
  font-weight: 900;
  letter-spacing: -0.5px;
  border-left: 4px solid var(--ui-outline);
  padding-left: 10px;
  margin-bottom: 12px;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--ui-text);
}

#settings-shell .section-header span {
  font-size: 10px;
  color: var(--ui-label);
  letter-spacing: 2px;
}

#settings-shell label {
  display: block;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 4px;
  color: var(--ui-label);
  letter-spacing: 1px;
}

#settings-shell section {
  margin-bottom: 12px;
}

#settings-shell input,
#settings-shell select {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid var(--ui-input-border);
  background: var(--ui-input-bg);
  color: var(--ui-input-text);
  font-family: "Space Grotesk", sans-serif;
  font-size: 13px;
  font-weight: 600;
  outline: none;
  transition: border-color 0.1s;
  border-radius: 4px;
}

#settings-shell input:focus,
#settings-shell select:focus {
  border-color: var(--ui-text);
}

#settings-shell .geo-inputs {
  display: flex;
  gap: 12px;
}

/* Shortcut Row Styles */
.shortcut-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
}

.shortcut-row input {
  padding: 8px 10px;
  font-size: 12px;
}

/* Icon Picker Button */
.icon-picker {
  position: relative;
  flex: 1;
}

.icon-picker-btn {
  width: 100%;
  padding: 8px 10px;
  background: var(--ui-input-bg);
  border: 2px solid var(--ui-input-border);
  color: var(--ui-input-text);
  font-family: "Space Grotesk", sans-serif;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.1s;
  border-radius: 4px;
}

.icon-picker-btn:hover {
  border-color: var(--ui-text);
  background: var(--ui-outline);
}

.picker-icon-preview {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  flex-shrink: 0;
}

/* Icon Dropdown */
.icon-dropdown {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: var(--ui-panel);
  border: 2px solid var(--ui-outline);
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  margin-bottom: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.icon-option {
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--ui-outline);
  transition: background 0.1s;
}

.icon-option:last-child {
  border-bottom: none;
}

.icon-option:hover {
  background: var(--ui-outline);
}

.icon-option svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.icon-option span {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

/* Remove Button */
.remove-shortcut {
  padding: 0 12px;
  background: #cc0000;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 900;
  font-size: 14px;
  transition: background 0.1s;
  border-radius: 4px;
  height: 36px;
}

.remove-shortcut:hover {
  background: #ff0000;
}

/* Add Button */
#add-shortcut-btn {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  background: var(--ui-outline);
  color: var(--ui-text);
  border: 2px solid var(--ui-outline);
  font-family: "Space Grotesk", sans-serif;
  font-weight: 900;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 4px;
}

#add-shortcut-btn:hover {
  background: var(--ui-text);
  color: var(--ui-panel);
  border-color: var(--ui-text);
}

/* Theme Grid */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.theme-grid button {
  padding: 6px 4px;
  border: 2px solid var(--ui-outline);
  background: var(--ui-bg);
  color: var(--ui-text);
  cursor: pointer;
  font-family: "Space Grotesk", sans-serif;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  transition: all 0.1s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 4px;
}

.theme-grid button.active {
  background: var(--ui-text);
  color: var(--ui-bg);
  border-color: var(--ui-text);
}

/* Bottom Actions */
.bottom-actions {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.save-btn {
  width: 100%;
  padding: 12px;
  background: var(--ui-outline);
  color: var(--ui-text);
  border: 2px solid var(--ui-outline);
  font-family: "Space Grotesk", sans-serif;
  font-weight: 900;
  font-size: 13px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.1s;
  border-radius: 4px;
}

.save-btn:hover {
  background: var(--ui-text);
  color: var(--ui-panel);
  border-color: var(--ui-text);
}

.reset-btn {
  width: 100%;
  padding: 8px;
  background: transparent;
  color: var(--ui-label);
  border: 2px solid var(--ui-outline);
  font-family: "Space Grotesk", sans-serif;
  font-weight: 900;
  font-size: 11px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.1s;
  border-radius: 4px;
}

.reset-btn:hover {
  border-color: #cc0000;
  color: #cc0000;
}

/* Todo Input Styles */
.todo-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  align-items: center;
}

.todo-row input {
  padding: 8px 10px;
  font-size: 12px;
}

.todo-check {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--ui-text);
}

.todo-remove {
  padding: 0 10px;
  background: transparent;
  color: #cc0000;
  border: 2px solid #cc0000;
  cursor: pointer;
  font-weight: 900;
  font-size: 12px;
  border-radius: 4px;
  height: 32px;
}

.todo-remove:hover {
  background: #cc0000;
  color: white;
}

#add-todo-btn {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  background: var(--ui-outline);
  color: var(--ui-text);
  border: 2px solid var(--ui-outline);
  font-family: "Space Grotesk", sans-serif;
  font-weight: 900;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 4px;
}

#add-todo-btn:hover {
  background: var(--ui-text);
  color: var(--ui-panel);
  border-color: var(--ui-text);
}

/* Scrollbar Styling for dropdowns */
.icon-dropdown::-webkit-scrollbar {
  width: 4px;
}

.icon-dropdown::-webkit-scrollbar-track {
  background: var(--ui-bg);
  border-radius: 3px;
}

.icon-dropdown::-webkit-scrollbar-thumb {
  background: var(--ui-outline);
  border-radius: 3px;
}
`;

const SETTINGS_HTML = `
<div id="settings-menu" class="settings-modal" hidden>
  <div class="settings-content">
    
    <!-- HEADER with Title and Actions -->
    <div class="settings-header">
      <h2>⚙️ SETTINGS</h2>
      <div class="header-actions">
        <button id="settings-theme-toggle" class="theme-toggle-btn">🌓 LIGHT MODE</button>
        <button id="close-settings" class="close-btn">✕</button>
      </div>
    </div>

    <!-- LEFT COLUMN: User Data -->
    <div class="settings-column">
      <div class="section-header">
        <span>📝 IDENTITY &amp; LOCATION</span>
      </div>
      
      <section>
        <label>Username</label>
        <input type="text" id="pref-username" placeholder="USERNAME" autocomplete="off" />
      </section>
      
      <section>
        <label>🔍 Search Engine</label>
        <select id="pref-search-engine">
          <option value="google">Google</option>
          <option value="duckduckgo">DuckDuckGo</option>
          <option value="bing">Bing</option>
          <option value="brave">Brave Search</option>
          <option value="yandex">Yandex</option>
        </select>
      </section>
      
      <section>
        <label>📍 Coordinates (Open-Meteo)</label>
        <div class="geo-inputs">
          <input type="number" step="0.001" id="pref-lat" placeholder="LATITUDE" />
          <input type="number" step="0.001" id="pref-lon" placeholder="LONGITUDE" />
        </div>
      </section>

      <section>
        <label>⏰ Clock Format</label>
        <select id="pref-clock-format">
          <option value="24h">24-Hour</option>
          <option value="12h">12-Hour (AM/PM)</option>
        </select>
      </section>

      <section>
        <label>📅 Calendar</label>
        <select id="pref-calendar">
          <option value="gregorian">Gregorian</option>
          <option value="jalali">Persian (Jalali)</option>
        </select>
      </section>

      <section>
        <label>🌐 Language</label>
        <select id="pref-language">
          <option value="en">English</option>
          <option value="fa">فارسی</option>
        </select>
      </section>

      <div class="section-header" style="margin-top: 4px">
        <span>📝 TODO LIST</span>
      </div>
      <section id="todo-inputs" class="todos-container"></section>

      <div class="section-header" style="margin-top: 4px">
        <span>🔗 LINKS &amp; SHORTCUTS</span>
      </div>
      <section id="shortcut-inputs" class="shortcuts-container"></section>
    </div>

    <!-- RIGHT COLUMN: Theme Settings -->
    <div class="settings-column">
      <div class="section-header">
        <span>🎨 THEME CONFIGURATION</span>
      </div>
      
      <section>
        <label>Active Interface</label>
        <div class="theme-grid" id="theme-grid">
          <button data-theme="black_hanekawa">Black Hanekawa</button>
          <button data-theme="hanekawa">Tsubasa</button>
          <button data-theme="mayoi">Mayoi</button>
          <button data-theme="sodachi">Sodachi</button>
          <button data-theme="tsukihi">Tsukihi</button>
          <button data-theme="shinobu">Shinobu</button>
          <button data-theme="hitagi">Hitagi</button>
          <button data-theme="nadeko">Nadeko</button>
          <button data-theme="ononoki">Yotsugi</button>
          <button data-theme="karen">Karen</button>
          <button data-theme="kanbaru">Kanbaru</button>
          <button data-theme="ougi">Ougi</button>
        </div>
      </section>

      <!-- Theme-specific mode sections -->
      <section id="tsukihi-mode-section" hidden>
        <label>Tsukihi Mode</label>
        <select id="pref-tsukihi-mode">
          <option value="auto">Auto (Day/Night)</option>
          <option value="light">Always Light</option>
          <option value="dark">Always Dark</option>
        </select>
      </section>

      <section id="karen-mode-section" hidden>
        <label>Karen Mode</label>
        <select id="pref-karen-mode">
          <option value="auto">Auto (Day/Night)</option>
          <option value="light">Always Light</option>
          <option value="dark">Always Dark</option>
        </select>
      </section>

      <section id="mayoi-mode-section" hidden>
        <label>Mayoi Mode</label>
        <select id="pref-mayoi-mode">
          <option value="auto">Auto (Day/Night)</option>
          <option value="light">Mayoi</option>
          <option value="dark">Mayoi Onee-San</option>
        </select>
      </section>

      <section id="kanbaru-mode-section" hidden>
        <label>Kanbaru Mode</label>
        <select id="pref-kanbaru-mode">
          <option value="auto">Auto (Day/Night)</option>
          <option value="light">Always Light</option>
          <option value="dark">Always Dark</option>
        </select>
      </section>

      <section id="sodachi-mode-section" hidden>
        <label>Sodachi Mode</label>
        <select id="pref-sodachi-mode">
          <option value="auto">Auto (Day/Night)</option>
          <option value="light">Always Light</option>
          <option value="dark">Always Dark</option>
        </select>
      </section>

      <section id="ougi-mode-section" hidden>
        <label>Ougi Mode</label>
        <select id="pref-ougi-mode">
          <option value="auto">Auto (Day/Night)</option>
          <option value="light">Always Light</option>
          <option value="dark">Always Dark</option>
        </select>
      </section>

      <section id="shinobu-mode-section" hidden>
        <label>Shinobu Mode</label>
        <select id="pref-shinobu-mode">
          <option value="auto">Auto (Day/Night)</option>
          <option value="light">Shinobu (Day)</option>
          <option value="dark">Kiss-shot (Night)</option>
        </select>
      </section>

      <section>
        <label>🎨 Custom CSS</label>
        <textarea id="pref-custom-css" placeholder="/* Your custom CSS here */" style="width:100%;min-height:60px;padding:8px 12px;border:2px solid var(--ui-input-border);background:var(--ui-input-bg);color:var(--ui-input-text);font-family:monospace;font-size:11px;border-radius:4px;resize:vertical;"></textarea>
      </section>

      <div class="bottom-actions">
        <button id="save-settings" class="save-btn">💾 APPLY CONFIGURATION</button>
        <button id="reset-settings" class="reset-btn">⟳ FACTORY RESET</button>
      </div>
    </div>
  </div>
</div>
`;

// ==================== SETTINGS MENU CLASS ====================

class SettingsMenu {
  constructor() {
    // DOM references
    this.shell = null;
    this.menu = null;
    this.savePending = false;
    
    // Icon data
    this.iconList = null;
    this.iconSvgMap = {};
    
    // Mode sections mapping
    this.modeSections = {
      "tsukihi-mode-section": "tsukihi",
      "karen-mode-section": "karen",
      "mayoi-mode-section": "mayoi",
      "kanbaru-mode-section": "kanbaru",
      "sodachi-mode-section": "sodachi",
      "ougi-mode-section": "ougi",
      "shinobu-mode-section": "shinobu"
    };
    
    this._init();
  }
  
  // ==================== INITIALIZATION ====================
  
  _init() {
    this._loadIconData();
    this._injectStyles();
    this._createShell();
    this._cacheDOMElements();
    this._setupEventListeners();
    this._preventBodyScroll();
  }
  
  _preventBodyScroll() {
    // Ensure body never scrolls when modal is active
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  
  _loadIconData() {
    if (typeof iconDict !== 'undefined') {
      this.iconList = Object.keys(iconDict);
      this.iconSvgMap = iconDict;
    } else {
      // Fallback minimal icons
      this.iconList = ['link', 'home', 'search', 'user', 'settings', 'github', 'twitter'];
      this.iconSvgMap = {
        'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
        'home': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
        'search': '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
        'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        'settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
        'github': '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
        'twitter': '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>'
      };
    }
  }
  
  _injectStyles() {
    const styleEl = document.createElement("style");
    styleEl.id = "settings-css";
    styleEl.textContent = SETTINGS_CSS;
    document.head.appendChild(styleEl);
  }
  
  _createShell() {
    this.shell = document.createElement("div");
    this.shell.id = "settings-shell";
    this.shell.innerHTML = SETTINGS_HTML;
    document.body.appendChild(this.shell);
  }
  
  _cacheDOMElements() {
    this.menu = document.getElementById("settings-menu");
    this.themeGrid = document.getElementById("theme-grid");
    this.usernameInput = document.getElementById("pref-username");
    this.searchEngineInput = document.getElementById("pref-search-engine");
    this.latInput = document.getElementById("pref-lat");
    this.lonInput = document.getElementById("pref-lon");
    this.shortcutsContainer = document.getElementById("shortcut-inputs");
    this.clockFormatInput = document.getElementById("pref-clock-format");
    this.calendarInput = document.getElementById("pref-calendar");
    this.languageInput = document.getElementById("pref-language");
    this.customCSSInput = document.getElementById("pref-custom-css");
    this.todosContainer = document.getElementById("todo-inputs");
    this.settingsThemeToggle = document.getElementById("settings-theme-toggle");
    this.closeBtn = document.getElementById("close-settings");
    this.saveBtn = document.getElementById("save-settings");
    this.resetBtn = document.getElementById("reset-settings");
    
    // Mode selectors
    this.tsukihiMode = document.getElementById("pref-tsukihi-mode");
    this.karenMode = document.getElementById("pref-karen-mode");
    this.mayoiMode = document.getElementById("pref-mayoi-mode");
    this.kanbaruMode = document.getElementById("pref-kanbaru-mode");
    this.sodachiMode = document.getElementById("pref-sodachi-mode");
    this.ougiMode = document.getElementById("pref-ougi-mode");
    this.shinobuMode = document.getElementById("pref-shinobu-mode");
  }
  
  // ==================== PUBLIC METHODS ====================
  
  open() {
    this._render();
    if (this.menu) this.menu.hidden = false;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  
  close() {
    if (this.menu) this.menu.hidden = true;
    this._closeAllDropdowns();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
  
  // ==================== RENDERING ====================
  
  _render() {
    if (!window.state || !window.state.config) return;
    
    const config = window.state.config;
    const currentTheme = this._getCurrentTheme(config);
    
    config.activeTheme = currentTheme;
    
    this._renderBasicInfo(config);
    this._renderTodos(config.todoList || []);
    this._renderShortcuts(config.shortcuts || []);
    this._updateActiveThemeButton(currentTheme);
    this._showModeSection(currentTheme);
  }
  
  _getCurrentTheme(config) {
    const page = window.location.pathname.split("/").pop().replace(".html", "");
    return page || config.activeTheme;
  }
  
  _renderBasicInfo(config) {
    if (this.usernameInput) this.usernameInput.value = config.username || "";
    if (this.searchEngineInput) this.searchEngineInput.value = config.searchEngine || "google";
    if (this.latInput) this.latInput.value = config.location?.lat ?? 35.6892;
    if (this.lonInput) this.lonInput.value = config.location?.lon ?? 51.3890;
    if (this.clockFormatInput) this.clockFormatInput.value = config.clockFormat || "24h";
    if (this.calendarInput) this.calendarInput.value = config.calendar || "gregorian";
    if (this.languageInput) this.languageInput.value = config.language || "en";
    if (this.customCSSInput) this.customCSSInput.value = config.customCSS || "";
    
    // Theme mode values
    if (this.tsukihiMode) this.tsukihiMode.value = config.tsukihiMode || "auto";
    if (this.karenMode) this.karenMode.value = config.karenMode || "auto";
    if (this.mayoiMode) this.mayoiMode.value = config.mayoiMode || "auto";
    if (this.kanbaruMode) this.kanbaruMode.value = config.kanbaruMode || "auto";
    if (this.sodachiMode) this.sodachiMode.value = config.sodachiMode || "auto";
    if (this.ougiMode) this.ougiMode.value = config.ougiMode || "auto";
    if (this.shinobuMode) this.shinobuMode.value = config.shinobuMode || "auto";
    
    // Settings panel theme
    const savedTheme = config.settingsTheme || "dark";
    this.shell.setAttribute("data-settings-theme", savedTheme);
    if (this.settingsThemeToggle) {
      const isDark = savedTheme === "dark";
      this.settingsThemeToggle.textContent = isDark ? "☀️ LIGHT MODE" : "🌙 DARK MODE";
      this.settingsThemeToggle.innerHTML = isDark ? "☀️ LIGHT MODE" : "🌙 DARK MODE";
    }
  }
  
  _renderShortcuts(shortcuts) {
    if (!this.shortcutsContainer || !this.iconList) return;
    
    this.shortcutsContainer.innerHTML = shortcuts.map((shortcut, index) => 
      this._createShortcutRow(shortcut, index)
    ).join("");
    
    this.shortcutsContainer.insertAdjacentHTML("beforeend", `
      <button id="add-shortcut-btn">
        <span>+</span> ADD SHORTCUT
      </button>
    `);
    
    this._attachShortcutEventListeners(shortcuts);
  }
  
  _createShortcutRow(shortcut, index) {
    const escapedLabel = this._escapeHtml(shortcut.label);
    const escapedUrl = this._escapeHtml(shortcut.url);
    const currentIcon = shortcut.icon || "link";
    const iconSvg = this.iconSvgMap[currentIcon] || this.iconSvgMap.link;
    
    return `
      <div class="shortcut-row" data-index="${index}">
        <input type="text" class="sc-label" value="${escapedLabel}" placeholder="LABEL" style="flex: 1.5;" />
        <input type="text" class="sc-url" value="${escapedUrl}" placeholder="URL" style="flex: 2.5;" />
        
        <div class="icon-picker">
          <button type="button" class="icon-picker-btn" data-idx="${index}">
            <svg class="picker-icon-preview" viewBox="0 0 24 24">${iconSvg}</svg>
            <span>${currentIcon.toUpperCase()}</span>
          </button>
          <div class="icon-dropdown" data-idx="${index}" style="display: none;">
            ${this._generateIconOptions(currentIcon)}
          </div>
        </div>
        
        <button type="button" class="remove-shortcut" data-idx="${index}">✕</button>
      </div>
    `;
  }
  
  _generateIconOptions(selectedIcon) {
    return this.iconList.map(iconName => `
      <div class="icon-option" data-icon="${iconName}">
        <svg viewBox="0 0 24 24">${this.iconSvgMap[iconName]}</svg>
        <span>${iconName.toUpperCase()}</span>
        ${selectedIcon === iconName ? '<span style="margin-left: auto;">✓</span>' : ''}
      </div>
    `).join("");
  }
  
  _attachShortcutEventListeners(shortcuts) {
    // Icon picker buttons
    document.querySelectorAll(".icon-picker-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = btn.dataset.idx;
        this._closeAllDropdowns();
        const dropdown = document.querySelector(`.icon-dropdown[data-idx="${idx}"]`);
        if (dropdown) dropdown.style.display = "block";
      });
    });
    
    // Icon options
    document.querySelectorAll(".icon-option").forEach(opt => {
      opt.addEventListener("click", () => {
        const iconName = opt.dataset.icon;
        const dropdown = opt.closest(".icon-dropdown");
        const idx = dropdown?.dataset.idx;
        const row = document.querySelector(`.shortcut-row[data-index="${idx}"]`);
        const previewBtn = row?.querySelector(".icon-picker-btn");
        const previewSvg = previewBtn?.querySelector(".picker-icon-preview");
        const previewSpan = previewBtn?.querySelector("span");
        
        if (previewSvg) previewSvg.innerHTML = this.iconSvgMap[iconName];
        if (previewSpan) previewSpan.textContent = iconName.toUpperCase();
        
        if (row) row.dataset.selectedIcon = iconName;
        
        this._closeAllDropdowns();
      });
    });
    
    // Remove buttons
    document.querySelectorAll(".remove-shortcut").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const newShortcuts = [...shortcuts];
        newShortcuts.splice(idx, 1);
        window.state.config.shortcuts = newShortcuts;
        this._renderShortcuts(newShortcuts);
      });
    });
    
    // Add button
    const addBtn = document.getElementById("add-shortcut-btn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const newShortcuts = [...(window.state.config.shortcuts || []), {
          label: "New Link",
          url: "https://example.com",
          icon: "link"
        }];
        window.state.config.shortcuts = newShortcuts;
        this._renderShortcuts(newShortcuts);
      });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener("click", () => this._closeAllDropdowns());
  }
  
  // ==================== TODO LIST RENDERING ====================
  
  _renderTodos(todos) {
    if (!this.todosContainer) return;
    
    this.todosContainer.innerHTML = todos.map((todo, index) => `
      <div class="todo-row" data-index="${index}">
        <input type="checkbox" class="todo-check" ${todo.done ? "checked" : ""} data-idx="${index}" />
        <input type="text" class="todo-text" value="${this._escapeHtml(todo.text)}" placeholder="What to do?" style="flex:1;" data-idx="${index}" />
        <button type="button" class="todo-remove" data-idx="${index}">✕</button>
      </div>
    `).join("");
    
    this.todosContainer.insertAdjacentHTML("beforeend", `
      <button id="add-todo-btn">
        <span>+</span> ADD TODO
      </button>
    `);
    
    this._attachTodoEventListeners(todos);
  }
  
  _attachTodoEventListeners(todos) {
    // Checkbox changes
    this.todosContainer.querySelectorAll(".todo-check").forEach(cb => {
      cb.addEventListener("change", () => {
        const idx = parseInt(cb.dataset.idx);
        const newTodos = [...(window.state.config.todoList || [])];
        if (newTodos[idx]) {
          newTodos[idx] = { ...newTodos[idx], done: cb.checked };
          window.state.config.todoList = newTodos;
        }
      });
    });
    
    // Text input changes
    this.todosContainer.querySelectorAll(".todo-text").forEach(input => {
      input.addEventListener("change", () => {
        const idx = parseInt(input.dataset.idx);
        const newTodos = [...(window.state.config.todoList || [])];
        if (newTodos[idx]) {
          newTodos[idx] = { ...newTodos[idx], text: input.value };
          window.state.config.todoList = newTodos;
        }
      });
    });
    
    // Remove buttons
    this.todosContainer.querySelectorAll(".todo-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const newTodos = [...(window.state.config.todoList || [])];
        newTodos.splice(idx, 1);
        window.state.config.todoList = newTodos;
        this._renderTodos(newTodos);
      });
    });
    
    // Add button
    const addBtn = document.getElementById("add-todo-btn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const newTodos = [...(window.state.config.todoList || []), { text: "", done: false }];
        window.state.config.todoList = newTodos;
        this._renderTodos(newTodos);
      });
    }
  }
  
  _closeAllDropdowns() {
    document.querySelectorAll(".icon-dropdown").forEach(d => d.style.display = "none");
  }
  
  _updateActiveThemeButton(currentTheme) {
    document.querySelectorAll("#settings-shell .theme-grid button[data-theme]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.theme === currentTheme);
    });
  }
  
  _showModeSection(activeTheme) {
    for (const [id, theme] of Object.entries(this.modeSections)) {
      const el = document.getElementById(id);
      if (el) el.hidden = activeTheme !== theme;
    }
  }
  
  // ==================== EVENT HANDLERS ====================
  
  _setupEventListeners() {
    this._setupCloseButton();
    this._setupSaveButton();
    this._setupResetButton();
    this._setupThemeToggle();
    this._setupBackdropClick();
    this._setupThemeGridClick();
  }
  
  _setupCloseButton() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }
  }
  
  _setupSaveButton() {
    if (this.saveBtn) {
      this.saveBtn.addEventListener("click", () => this._save());
    }
  }
  
  _setupResetButton() {
    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", async () => {
        if (!confirm("Factory reset will clear all settings and cached data. Continue?")) return;
        
        localStorage.clear();
        
        if ("serviceWorker" in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations().catch(() => []);
          await Promise.all(registrations.map(r => r.unregister().catch(() => {})));
        }
        
        if ("caches" in window) {
          const keys = await caches.keys().catch(() => []);
          await Promise.all(keys.map(k => caches.delete(k).catch(() => {})));
        }
        
        window.location.replace("hanekawa.html");
      });
    }
  }
  
  _setupThemeToggle() {
    if (this.settingsThemeToggle) {
      this.settingsThemeToggle.addEventListener("click", () => {
        const current = this.shell.getAttribute("data-settings-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        this.shell.setAttribute("data-settings-theme", next);
        this.settingsThemeToggle.innerHTML = next === "dark" ? "☀️ LIGHT MODE" : "🌙 DARK MODE";
      });
    }
  }
  
  _setupBackdropClick() {
    if (this.menu) {
      this.menu.addEventListener("click", (e) => {
        if (e.target === this.menu) this.close();
      });
    }
  }
  
  _setupThemeGridClick() {
    if (this.themeGrid) {
      this.themeGrid.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-theme]");
        if (!btn) return;
        
        document.querySelectorAll("#settings-shell .theme-grid button").forEach(b => 
          b.classList.remove("active")
        );
        btn.classList.add("active");
        this._showModeSection(btn.dataset.theme);
      });
    }
  }
  
  // ==================== SAVE FUNCTIONALITY ====================
  
  _save() {
    if (this.savePending) return;
    this.savePending = true;
    
    requestAnimationFrame(() => {
      if (!window.state?.config) {
        this.savePending = false;
        return;
      }
      
      const config = window.state.config;
      
      // Basic settings
      config.username = this.usernameInput?.value || "";
      config.searchEngine = this.searchEngineInput?.value || "google";
      config.clockFormat = this.clockFormatInput?.value || "24h";
      config.calendar = this.calendarInput?.value || "gregorian";
      config.language = this.languageInput?.value || "en";
      config.customCSS = this.customCSSInput?.value || "";
      config.location.lat = parseFloat(this.latInput?.value) || 35.6892;
      config.location.lon = parseFloat(this.lonInput?.value) || 51.3890;
      config.settingsTheme = this.shell.getAttribute("data-settings-theme") || "dark";
      
      // Theme modes
      config.tsukihiMode = this.tsukihiMode?.value || "auto";
      config.karenMode = this.karenMode?.value || "auto";
      config.mayoiMode = this.mayoiMode?.value || "auto";
      config.kanbaruMode = this.kanbaruMode?.value || "auto";
      config.sodachiMode = this.sodachiMode?.value || "auto";
      config.ougiMode = this.ougiMode?.value || "auto";
      config.shinobuMode = this.shinobuMode?.value || "auto";
      
      // Shortcuts
      const shortcutRows = document.querySelectorAll("#settings-shell .shortcut-row");
      config.shortcuts = Array.from(shortcutRows).map(row => ({
        label: row.querySelector(".sc-label")?.value || "",
        url: row.querySelector(".sc-url")?.value || "",
        icon: row.dataset.selectedIcon || row.querySelector(".icon-picker-btn span")?.textContent?.toLowerCase() || "link"
      }));
      
      // Todos (already updated via event listeners, ensure it exists)
      if (!config.todoList) config.todoList = [];
      
      // Active theme
      const activeBtn = document.querySelector("#settings-shell .theme-grid button.active");
      if (activeBtn) config.activeTheme = activeBtn.dataset.theme;
      
      // Save to localStorage
      localStorage.setItem("monogatari_start_config", JSON.stringify(config));
      
      // Notify service worker
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SETTINGS_UPDATED',
          config: config
        });
      }
      
      this.close();
      
      // Redirect to new theme
      const targetPage = (config.activeTheme || "hanekawa") + ".html";
      window.location.href = targetPage;
      
      this.savePending = false;
    });
  }
  
  // ==================== UTILITIES ====================
  
  _escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, (match) => {
      if (match === "&") return "&amp;";
      if (match === "<") return "&lt;";
      if (match === ">") return "&gt;";
      return match;
    });
  }
}

// ==================== EXPORTS & INITIALIZATION ====================

// Helper function to clear service worker cache
window.clearServiceWorkerCache = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.unregister();
      console.log('[SW] Service worker unregistered');
    }
  }
  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    console.log('[SW] All caches cleared');
  }
  window.location.reload();
};

// Lazy initialization - only create SettingsMenu when needed
let settingsInstance = null;

window.openSettings = () => {
  if (!settingsInstance) {
    settingsInstance = new SettingsMenu();
  }
  settingsInstance.open();
};

window.closeSettings = () => {
  if (settingsInstance) {
    settingsInstance.close();
  }
};

// Auto-init for pages that need settings available immediately
if (typeof window.autoInitSettings !== 'undefined' && window.autoInitSettings) {
  window.addEventListener("DOMContentLoaded", () => {
    if (!settingsInstance) {
      settingsInstance = new SettingsMenu();
    }
  });
}