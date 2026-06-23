# Monogatari Start Page

A Monogatari-series themed new tab page for Chromium-based browsers, built as an unpacked extension or standalone HTML page. Features 12 character themes, offline support, weather, search, and customizable shortcuts.

## Features

- **12 Character Themes** -- Hanekawa, Shinobu, Tsukihi, Karen, Mayoi, Kanbaru, Sodachi, Ougi, Hitagi, Nadeko, Ononoki, Black Hanekawa
- **Weather** -- Real-time temperature and weather icons via [Open-Meteo](https://open-meteo.com/) (no API key required, default: Tehran)
- **Search** -- Google, DuckDuckGo, Bing, Brave, Yandex
- **Customizable Shortcuts** -- Add, remove, and reorder bookmarks with 30+ built-in SVG icons
- **Todo List** -- Inline task manager with checkboxes, saved to localStorage
- **Clock & Calendar** -- 12h/24h format, Gregorian or Jalali (Persian) calendar
- **Language** -- English / Farsi interface
- **Custom CSS** -- Inject your own styles via Settings
- **Offline Support** -- Service Worker caches all assets for instant load, works without internet (except weather)
- **Dark/Light Mode** -- Per-theme auto-switching (day/night) or manual override

## Installation

### Chromium Browsers (Opera GX, Chrome, Edge, Brave, Vivaldi)

1. Download and extract this repository to a permanent folder
2. Navigate to `chrome://extensions` (or `opera://extensions`, `edge://extensions`)
3. Enable **Developer mode**
4. Click **Load unpacked** and select the project folder

### Firefox

1. Go to `about:config` and set:
   - `extensions.experiments.enabled` = `true`
   - `xpinstall.signatures.required` = `false`
2. Zip the files, rename to `.xpi`, and drag into Firefox

## Setting as Homepage

### Startup Page (Chromium)

1. Open your desired theme file in the browser
2. Copy the full URL from the address bar (e.g. `file:///C:/Users/you/Desktop/KHP/themes/karen.html`)
3. Go to browser settings -- On startup -- Open a specific page
4. Paste the URL

### Home Button (Chromium)

1. Go to browser settings -- Appearance -- Show home button (enable)
2. Paste the theme URL in the custom URL field

### Firefox

1. Go to Settings -- Home
2. Under "Homepage and new windows", select "Custom URLs"
3. Paste the theme URL

## Usage

| Action | How |
|---|---|
| Change theme | Settings -- THEME CONFIGURATION -- select character |
| Add shortcuts | Settings -- LINKS & SHORTCUTS -- fill label, URL, pick icon |
| Change weather location | Settings -- IDENTITY & LOCATION -- enter latitude/longitude |
| Change search engine | Settings -- IDENTITY & LOCATION -- select engine |
| Toggle clock format | Settings -- IDENTITY & LOCATION -- 24h or 12h |
| Switch calendar | Settings -- IDENTITY & LOCATION -- Gregorian or Jalali |
| Switch language | Settings -- IDENTITY & LOCATION -- EN or FA |
| Add todo items | Settings -- TODO LIST -- type tasks, check off when done |
| Inject custom CSS | Settings -- Custom CSS -- write your styles |

## Theme Image Files

| Theme | Files |
|---|---|
| Hanekawa (Tsubasa) | `hanekawa1.png`, `hanekawa2.png`, `hanekawa3.png` |
| Shinobu (Day) | `shinobu.png` |
| Shinobu (Night / Kiss-shot) | `kisshot.webp` |
| Karen | `karen1.jpg` through `karen6.jpg` |
| Tsukihi | `tsukihi.mp4` |
| Mayoi | `mayoi.mp4`, `mayoi.jpg` |
| Hitagi | `hitagi.mp4` |
| Nadeko | `nadeko.mp4` |
| Black Hanekawa | `black_hanekawa.gif` |
| Ougi | `ougi_light.png`, `ougi_dark.png` |
| Sodachi | `sodachi_trn.png` |
| Kanbaru | (uses CSS gradient, no image) |
| Ononoki | (video placeholder) |

Place images in `assets/images/` and videos in `assets/videos/`.

## Cache Management

The Service Worker cache persists across browser restarts.

- View cache: F12 -- Application -- Cache Storage -- `monogatari-cache-v1`
- Clear cache: open `cache-info.html` or run in console:
  ```js
  caches.delete('monogatari-cache-v1')
  ```

## Project Structure

```
KHP/
  index.html              Entry point (redirects to theme)
  manifest.json           Extension manifest v3
  sw.js                   Service Worker
  base.css                Base styles
  cache-info.html         Cache manager utility
  js/
    core.js               Main logic, weather, clock, search, shortcuts
    settings.js           Settings menu UI and persistence
    index.js              Theme redirector
    theme-init.js         Theme initialization (pre-DOM)
    hanekawa.js           Hanekawa image cycling
    shinobu.js            Shinobu image cycling
  themes/                 All 12 theme HTML files
  assets/
    images/               Character images
    videos/               Character background videos
```

## Troubleshooting

| Problem | Solution |
|---|---|
| Images not loading | Move images to `assets/images/`, check file names match exactly |
| Weather not showing | Check coordinates in Settings (default: Tehran 35.6892, 51.3890) |
| Theme not switching | Clear browser cache and reload |
| Search not working | Check Search Engine setting |

## Browser Compatibility

| Browser | Extension | Start Page | Offline |
|---|---|---|---|
| Opera GX | Yes | Yes | Yes |
| Chrome | Yes | Yes | Yes |
| Edge | Yes | Yes | Yes |
| Brave | Yes | Yes | Yes |
| Firefox | Experimental | Yes | Partial |
| Safari | No | Yes | Partial |

## Credits

Built with vanilla HTML/CSS/JS. No frameworks, no build tools.
