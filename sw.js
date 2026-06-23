// Service Worker for Monogatari Start Page - Caches all assets for fast loading
const CACHE_NAME = 'monogatari-cache-v1';
const OFFLINE_URL = 'hanekawa.html';

// Files to cache immediately on install
const PRE_CACHE_URLS = [
  '/',
  'index.html',
  'themes/hanekawa.html',
  'themes/shinobu.html',
  'themes/tsukihi.html',
  'themes/karen.html',
  'themes/mayoi.html',
  'themes/kanbaru.html',
  'themes/sodachi.html',
  'themes/ougi.html',
  'themes/hitagi.html',
  'themes/nadeko.html',
  'themes/ononoki.html',
  'themes/black_hanekawa.html',
  'js/core.js',
  'js/settings.js',
  'js/theme-init.js',
  'js/index.js',
  'base.css',
  'manifest.json'
];

// Image patterns to cache
const IMAGE_PATTERNS = [
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.gif$/,
  /\.webp$/,
  /\.mp4$/,
  /\.mkv$/
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core assets');
        return cache.addAll(PRE_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] Install failed:', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Helper: Check if URL should be cached
function shouldCache(url) {
  // Don't cache API calls (always get fresh weather)
  if (url.includes('api.open-meteo.com')) return false;
  
  // Don't cache Google Fonts
  if (url.includes('fonts.googleapis.com')) return false;
  if (url.includes('fonts.gstatic.com')) return false;
  
  return true;
}

// Helper: Get cache key with normalized URL (remove cache-busting params)
function getCacheKey(request) {
  const url = new URL(request.url);
  // Remove cache-busting query params for consistent caching
  if (url.searchParams.has('v')) {
    url.searchParams.delete('v');
  }
  return url.toString();
}

// Single fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip API calls (always get fresh weather)
  if (url.hostname === 'api.open-meteo.com') {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Skip Google Fonts
  if (url.hostname.includes('fonts.googleapis.com') || 
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        const cacheKey = getCacheKey(event.request);
        
        // Try to get from cache first
        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Fetch from network
        try {
          const networkResponse = await fetch(event.request);
          
          // Cache successful responses (including images)
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            cache.put(cacheKey, responseToCache);
          }
          
          return networkResponse;
        } catch (error) {
          // For HTML pages, return offline page
          if (event.request.headers.get('accept')?.includes('text/html')) {
            const cachedOffline = await cache.match(OFFLINE_URL);
            if (cachedOffline) return cachedOffline;
          }
          
          return new Response('Network error', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      })
  );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  const data = event.data;
  
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (data.type === 'SETTINGS_UPDATED') {
    console.log('[SW] Settings updated, refreshing cache if needed');
    // Optionally re-cache specific assets
    caches.open(CACHE_NAME).then(async (cache) => {
      // Re-cache core files to ensure latest version
      for (const url of PRE_CACHE_URLS) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response);
            console.log('[SW] Updated cache for:', url);
          }
        } catch (e) {
          console.warn('[SW] Failed to update cache for:', url);
        }
      }
    });
  }
  
  if (data.type === 'CLEAR_CACHE') {
    console.log('[SW] Clearing cache...');
    caches.delete(CACHE_NAME).then(() => {
      console.log('[SW] Cache cleared');
      event.ports[0]?.postMessage({ success: true });
    });
  }
});

