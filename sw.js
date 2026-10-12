// Service Worker for Cycafe CSC Dashboard
// Optimized for lightning-fast reloads, instant asset serving, and reliable offline support

const CACHE_NAME = 'cycafe-v18-native-reviewlink';

// Core local shell files to pre-cache
const STATIC_ASSETS = [
    './',
    './index.html',
    './auth-ui.js?v=14',
    './main.css?v=12',
    './photoshop-studio.css',
    './ai-chat.css',
    './photoshop-studio.js',
    './ai-chat.js',
    './cyber-services-data.js',
    './quick-actions-ai.js',
    './govt-updates.js?v=14',
    './content-defaults.js',
    './content-store.js?v=8',
    './content-public.js?v=14',
    './content-firebase.js?v=8',
    './notifications.js?v=10',
    './billing.js?v=11',
    './file-converter.js?v=12',
    './config.local.js',
    './config.js',
    './manifest.json',
    './images/cycafe-icon.png',
    './images/cycafe-logo.png',
    './favicon.ico',
    './favicon.png'
];

// CDN resources to pre-cache and cache on demand
const CDN_ASSETS = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js'
];

// Install event - Pre-cache static and CDN assets without failing on individual errors
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log('[SW] Pre-caching core assets for high-speed delivery');
            const allToCache = [...STATIC_ASSETS, ...CDN_ASSETS];
            await Promise.allSettled(
                allToCache.map(async (url) => {
                    try {
                        const response = await fetch(url, { cache: 'no-cache' });
                        if (response.ok) {
                            await cache.put(url, response);
                        }
                    } catch (err) {
                        console.warn('[SW] Could not pre-cache asset:', url, err);
                    }
                })
            );
            console.log('[SW] Pre-caching complete');
        })
    );
});

// Activate event - Immediately clean old caches and claim existing clients
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Removing outdated cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Activated & claimed clients');
                return self.clients.claim();
            })
    );
});

// Fetch event - Ultra fast caching strategy
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip non-http(s) schemes (e.g., chrome-extension)
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // A customer QR must never fall back to the dashboard/login shell.
    if (url.pathname.endsWith('/review.html')) {
        event.respondWith(fetch(request));
        return;
    }

    // Never cache dynamic Firebase / Google Cloud API requests
    if (
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('firebaseio.com') ||
        url.pathname.includes('/v1/projects')
    ) {
        return;
    }

    // Strategy 1: HTML Page Navigation
    // Fast network fetch with 1000ms timeout fallback to instant cached index.html
    if (request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    const fetchPromise = fetch(request);
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Network timeout')), 1000)
                    );
                    const networkResponse = await Promise.race([fetchPromise, timeoutPromise]);
                    if (networkResponse && networkResponse.ok) {
                        const responseClone = networkResponse.clone();
                        event.waitUntil(
                            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone))
                        );
                        return networkResponse;
                    }
                } catch (err) {
                    // Fall back to cache on slow network or offline
                }

                const cachedResponse =
                    (await caches.match(request)) ||
                    (await caches.match('./index.html')) ||
                    (await caches.match('/index.html'));

                if (cachedResponse) {
                    return cachedResponse;
                }

                // If nothing in cache, do standard fetch
                return fetch(request);
            })()
        );
        return;
    }

    // Strategy 2: Static Assets (CSS, JS, Fonts, Images, CDNs)
    // Stale-While-Revalidate: Return cached response in ~1ms immediately, update in background!
    event.respondWith(
        (async () => {
            const cachedResponse = await caches.match(request);

            const fetchAndUpdate = fetch(request)
                .then(async (networkResponse) => {
                    if (networkResponse && networkResponse.ok) {
                        const cache = await caches.open(CACHE_NAME);
                        cache.put(request, networkResponse.clone());
                    }
                    return networkResponse;
                })
                .catch(() => null);

            // If we have a cached response, return it instantly!
            if (cachedResponse) {
                event.waitUntil(fetchAndUpdate);
                return cachedResponse;
            }

            // Otherwise, wait for network fetch
            const networkResponse = await fetchAndUpdate;
            if (networkResponse) {
                return networkResponse;
            }

            return new Response('Offline - asset not cached', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'text/plain' }
            });
        })()
    );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
