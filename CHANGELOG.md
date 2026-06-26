# Changelog

## [1.2] - 2026-06-24

### Fixed
- Jalali (Persian) calendar showing incorrect dates (e.g. `1396.13.7925`)
- Tsukihi theme greeting not updating with the actual username
- Service Worker registration failing when loaded from `themes/` subdirectory
- Manifest icon paths pointing to wrong location (`hanekawa1.png` -> `assets/images/hanekawa1.png`)
- Removed invalid `chrome_settings_overrides.homepage` that caused Chrome extension load error
- Removed duplicate Acorn and Quercus default shortcuts

### Added
- `browser_url_overrides` for Firefox newtab support
- Dynamic greeting in Tsukihi theme based on time of day
- English README (`README.md`)
- Persian README (`README_fa.md`)
- This changelog (`CHANGELOG.md`)

### Changed
- Project reorganized: themes moved to `themes/`, JS to `js/`, assets to `assets/`
- SW registration path auto-detects subdirectory

---

## [1.1] - 2026-06-23

### Added
- 5 search engines: Google, DuckDuckGo, Bing, Brave, Yandex
- Clock format toggle (12h / 24h)
- Calendar type toggle (Gregorian / Jalali)
- Language selector (English / Farsi)
- Todo list with checkboxes
- Custom CSS injection
- Escape key to close settings
- Weather loading state indicator

### Fixed
- Duplicate inline search scripts across all 12 theme HTML files
- Duplicate Tsukihi inline ripple/shape morphing code
- Hanekawa.js duplicate search/weather/clock code (cleaned from 474 to ~80 lines)
- Base.css old settings modal styles conflicting with settings.js
- SW.js duplicate fetch event listeners

### Changed
- Settings menu completely rebuilt with icon picker, theme grid, and mode selectors
- Default location changed to Tehran, Iran (lat: 35.6892, lon: 51.3890)

---

## [1.0] - 2026-06-22

### Added
- Initial release
- 12 Monogatari character themes
- Weather display via Open-Meteo API
- Customizable shortcuts with 30+ SVG icons
- Service Worker for offline support
- Settings menu with theme selection
- Automatic day/night theme switching
