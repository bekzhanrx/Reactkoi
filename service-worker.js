const CACHE_NAME = 'pwa-cache-v1';
const STATIC_FILES = [
  '/',             // Root HTML
  '/index.html',   // Main HTML
  '/css/style.css',// Example CSS
  '/js/app.js',    // Example JS
  '/images/logo.png', // Example image
];

// Install and pre-cache the static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching static assets');
      return cache.addAll(STATIC_FILES);
    })
  );
});

// Activate and clean old caches if needed
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercept network requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Handle GET requests
  if (event.request.method === 'GET') {
    // Example fallback strategy: Cache, then network
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
        );
      }).catch(() => {
        // Fallback response if offline
        if (event.request.destination === 'document') {
          return caches.match('/index.html'); // Fallback HTML
        }
        if (event.request.destination === 'image') {
          return caches.match('/images/fallback.png'); // Fallback image
        }
        return new Response('Offline');
      })
    );
  }
});
