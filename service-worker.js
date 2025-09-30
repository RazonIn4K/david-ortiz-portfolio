// Lightweight Service Worker for GitHub Pages
// Provides offline support with minimal complexity

// Cache versioning with build hash for cache-busting
const BUILD_HASH = "v1"; // Stable cache version; bump this via build pipeline to invalidate old caches
const CACHE_NAME = `david-ortiz-${BUILD_HASH}`;
const STATIC_CACHE = `static-${BUILD_HASH}`;
const DYNAMIC_CACHE = `dynamic-${BUILD_HASH}`;
const urlsToCache = [
  "/",
  "/index.html",
  "/src/css/styles.css",
  "/src/js/script.js",
  "/src/js/main.min.js",
  "/src/js/unified-analytics.min.js",
  "/src/js/global-scroll-manager.min.js",
  "/src/js/consent-banner.min.js",
  "/src/js/lazy-loader.min.js",
  "/src/services/config.js",
  "/assets/icons/icon.svg",
  "/manifest.json",
];

// Install event - cache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("[SW] Caching essential assets with build:", BUILD_HASH);
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error("[SW] Cache installation failed:", err);
      }),
  );
  // Force immediate activation
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log("[SW] Removing old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  // Take control immediately
  self.clients.claim();
});

// Fetch event - network-first strategy with fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests (GA, Vercel Analytics, etc.)
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== location.origin) {
    return;
  }

  // Skip API endpoints (they won't work offline on GitHub Pages)
  if (requestUrl.pathname.startsWith("/api/")) {
    return;
  }

  // Skip dynamic content that shouldn't be cached
  if (
    requestUrl.hostname.includes("beautiful.ai") ||
    requestUrl.hostname.includes("googletagmanager.com") ||
    requestUrl.hostname.includes("google-analytics.com") ||
    requestUrl.hostname.includes("vercel-scripts.com")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200) {
          return response;
        }

        // Clone the response before caching
        const responseToCache = response.clone();

        caches
          .open(DYNAMIC_CACHE)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          })
          .catch((err) => {
            console.error("[SW] Cache put failed:", err);
          });

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then((response) => {
          if (response) {
            console.log("[SW] Serving from cache:", event.request.url);
            return response;
          }

          // For navigation requests, return the offline page
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }

          // Return a basic offline response
          return new Response("Offline - Content not available", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          });
        });
      }),
  );
});

// Message event - handle cache updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
