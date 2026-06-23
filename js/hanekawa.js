// Hanekawa theme - Sequential image cycling (only on refresh/theme change)
(function() {
  'use strict';
  
  // Hanekawa images for background cycling (in order)
  const HANEKAWA_IMAGES = ["../assets/images/hanekawa1.png", "../assets/images/hanekawa2.png", "../assets/images/hanekawa3.png"];
  
  // Key for storing the next image index
  const NEXT_IMAGE_INDEX_KEY = "hanekawa_next_index";
  
  // Get the next image index in sequence (cycles through 0,1,2,0,1,2...)
  function getNextImageIndex() {
    let nextIndex = parseInt(localStorage.getItem(NEXT_IMAGE_INDEX_KEY), 10);
    if (isNaN(nextIndex) || nextIndex >= HANEKAWA_IMAGES.length) {
      nextIndex = 0;
    }
    const followingIndex = (nextIndex + 1) % HANEKAWA_IMAGES.length;
    localStorage.setItem(NEXT_IMAGE_INDEX_KEY, followingIndex);
    return nextIndex;
  }
  
  function getImageWithCacheBuster(imageName) {
    return `${imageName}?v=${Date.now()}`;
  }
  
  function preloadImage(imageName) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(imageName);
      img.onerror = () => reject(imageName);
      img.src = imageName;
    });
  }
  
  async function preloadAllImages() {
    if (!('caches' in window)) return;
    try {
      const cache = await caches.open('monogatari-cache-v1');
      for (const image of HANEKAWA_IMAGES) {
        const cached = await cache.match(image);
        if (!cached) {
          const response = await fetch(image);
          if (response.ok) await cache.put(image, response);
        }
      }
    } catch (e) {}
  }
  
  async function setSequentialBackgroundImage() {
    const bodyEl = document.body;
    if (!bodyEl) return;
    const imageIndex = getNextImageIndex();
    const nextImage = HANEKAWA_IMAGES[imageIndex];
    try {
      await preloadImage(nextImage);
      bodyEl.style.backgroundImage = `url('${getImageWithCacheBuster(nextImage)}')`;
    } catch (error) {
      bodyEl.style.backgroundImage = `url('${HANEKAWA_IMAGES[0]}')`;
    }
  }
  
  async function init() {
    console.log("Initializing Hanekawa theme...");
    
    const flashOverlay = document.getElementById("flash-overlay");
    if (flashOverlay) {
      window.addEventListener("load", () => {
        setTimeout(() => { flashOverlay.style.opacity = "0"; }, 300);
      });
    }
    
    await setSequentialBackgroundImage();
    preloadAllImages();
    console.log("Hanekawa theme initialized successfully");
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();