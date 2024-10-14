const CACHE_NAME = `my-cache-${version}`;
const urlsToCache = [
    '/expert-parakeet/',
    '/expert-parakeet/index.html',
    '/expert-parakeet/style.css',
    '/expert-parakeet/main.js',
    '/expert-parakeet/manifest.json',
    '/expert-parakeet/icon-192x192.png',
    '/expert-parakeet/icon-512x512.png'
];

// インストール時にキャッシュを追加
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/main.js'
            ]);
        })
    );
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
