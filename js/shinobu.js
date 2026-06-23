// Shinobu theme - Optimized with caching prevention and smooth transitions
(function() {
  'use strict';
  
  // ==================== CONFIGURATION ====================
  const SHINOBU_IMAGES = ["../assets/images/shinobu1.png", "../assets/images/shinobu2.png", "../assets/images/shinobu3.png"];
  const CYCLE_INTERVAL = 120000; // 2 minutes (120,000 ms)
  const FADE_DURATION = 500; // 500ms fade transition
  
  // Store the last used image to prevent repeats
  const STORED_IMAGE_KEY = "shinobu_last_image";
  
  // ==================== DOM ELEMENT CACHE ====================
  let visualEl = null;
  let currentIndex = -1;
  let intervalId = null;
  let observer = null;
  
  // ==================== HELPER FUNCTIONS ====================
  
  // Get image with cache buster to prevent browser caching
  function getImageWithCacheBuster(imageName) {
    const timestamp = Date.now();
    return `${imageName}?v=${timestamp}`;
  }
  
  // Get random image index different from current
  function getRandomImageIndex() {
    if (SHINOBU_IMAGES.length === 1) return 0;
    
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * SHINOBU_IMAGES.length);
    } while (newIndex === currentIndex);
    return newIndex;
  }
  
  // Get random image index different from last used (for initial load)
  function getInitialImageIndex() {
    const lastImage = sessionStorage.getItem(STORED_IMAGE_KEY);
    if (lastImage !== null && SHINOBU_IMAGES.length > 1) {
      const lastIndex = parseInt(lastImage, 10);
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * SHINOBU_IMAGES.length);
      } while (newIndex === lastIndex);
      return newIndex;
    }
    return Math.floor(Math.random() * SHINOBU_IMAGES.length);
  }
  
  // Preload image to ensure it loads correctly
  function preloadImage(imageName) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(imageName);
      img.onerror = () => reject(imageName);
      img.src = imageName;
    });
  }
  
  // Change to next random image
  async function cycleImage() {
    if (!visualEl) return;
    
    const nextIndex = getRandomImageIndex();
    const nextImage = SHINOBU_IMAGES[nextIndex];
    
    try {
      // Preload the next image
      await preloadImage(nextImage);
      
      // Fade out
      visualEl.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
      visualEl.style.opacity = "0";
      
      // Change image after fade out
      setTimeout(async () => {
        try {
          // Apply with cache buster
          visualEl.src = getImageWithCacheBuster(nextImage);
          currentIndex = nextIndex;
          
          // Force reflow to ensure transition works
          void visualEl.offsetHeight;
          
          // Fade in
          visualEl.style.opacity = "1";
          
          // Store in sessionStorage
          sessionStorage.setItem(STORED_IMAGE_KEY, currentIndex.toString());
        } catch (e) {
          console.error("Error changing image:", e);
          visualEl.style.opacity = "1";
        }
      }, FADE_DURATION);
    } catch (error) {
      console.error(`Failed to preload image: ${nextImage}`);
      // Try a different image as fallback
      const fallbackIndex = (nextIndex + 1) % SHINOBU_IMAGES.length;
      if (fallbackIndex !== currentIndex) {
        const fallbackImage = SHINOBU_IMAGES[fallbackIndex];
        try {
          await preloadImage(fallbackImage);
          visualEl.src = getImageWithCacheBuster(fallbackImage);
          currentIndex = fallbackIndex;
          visualEl.style.opacity = "1";
          sessionStorage.setItem(STORED_IMAGE_KEY, currentIndex.toString());
        } catch (e) {
          console.error("All images failed to load");
        }
      }
    }
  }
  
  // Set initial random image
  async function setInitialImage() {
    if (!visualEl) return;
    
    const initialIndex = getInitialImageIndex();
    const initialImage = SHINOBU_IMAGES[initialIndex];
    
    try {
      // Preload the image
      await preloadImage(initialImage);
      
      // Apply with cache buster
      visualEl.src = getImageWithCacheBuster(initialImage);
      visualEl.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
      visualEl.style.opacity = "1";
      currentIndex = initialIndex;
      
      // Store in sessionStorage
      sessionStorage.setItem(STORED_IMAGE_KEY, currentIndex.toString());
      console.log(`Shinobu initial image: ${initialImage}`);
    } catch (error) {
      console.error(`Failed to load initial image: ${initialImage}`);
      // Fallback to first image
      visualEl.src = getImageWithCacheBuster(SHINOBU_IMAGES[0]);
      visualEl.style.opacity = "1";
      currentIndex = 0;
      sessionStorage.setItem(STORED_IMAGE_KEY, "0");
    }
  }
  
  // Start cycling images
  function startCycling() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(cycleImage, CYCLE_INTERVAL);
  }
  
  // Stop cycling (cleanup)
  function stopCycling() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  
  // Check if Shinobu is active and it's light mode
  function shouldRunLightMode() {
    const theme = document.documentElement.getAttribute("data-theme");
    return theme === "light";
  }
  
  // Check if current page is Shinobu theme
  function isShinobuTheme() {
    const path = window.location.pathname.split("/").pop();
    return path === "shinobu.html" || path === "shinobu";
  }
  
  // Handle theme changes
  function onThemeChange() {
    if (!isShinobuTheme()) return;
    if (!visualEl) return;
    
    if (shouldRunLightMode()) {
      // Switching to light mode - start cycling
      if (!intervalId) {
        setInitialImage();
        startCycling();
        visualEl.style.display = ""; // Show the image
      }
    } else {
      // Switching to dark mode - stop cycling
      stopCycling();
      if (visualEl) {
        visualEl.style.opacity = "0";
        // Optionally hide the image in dark mode
        setTimeout(() => {
          if (!shouldRunLightMode()) {
            visualEl.style.display = "none";
          }
        }, FADE_DURATION);
      }
    }
  }
  
  // ==================== INITIALIZATION ====================
  async function init() {
    // Only run on Shinobu theme pages
    if (!isShinobuTheme()) return;
    
    visualEl = document.getElementById("shinobu-visual");
    if (!visualEl) {
      console.warn("shinobu-visual element not found");
      return;
    }
    
    // Set up CSS for smooth transitions
    visualEl.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
    
    // Only cycle images in light mode (dark mode uses kisshot.webp)
    if (shouldRunLightMode()) {
      await setInitialImage();
      startCycling();
    } else {
      // Dark mode - hide the image initially
      visualEl.style.opacity = "0";
      visualEl.style.display = "none";
    }
    
    // Listen for theme changes (if user switches via settings)
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          onThemeChange();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
  }
  
  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  
  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    stopCycling();
    if (observer) observer.disconnect();
  });
})();