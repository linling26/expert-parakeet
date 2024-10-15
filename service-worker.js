let CACHE_VERSION = `v-${Date.now()}`; // タイムスタンプでバージョンを付与
let CACHE_NAME = `my-cache-${CACHE_VERSION}`;

const CACHE_FILES = [
    '/expert-parakeet/',
    '/expert-parakeet/index.html',
    '/expert-parakeet/style.css',
    '/expert-parakeet/main.js'
];

// インストール時にキャッシュを追加
self.addEventListener('install', (event) => {
    console.log(`Service Worker: インストール中... バージョン: ${CACHE_NAME}`);
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: キャッシュ中...');
            return cache.addAll(CACHE_FILES);
        })
    );
    self.skipWaiting();
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
    console.log('Service Worker: アクティベート中...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            const oldCaches = cacheNames.filter(name => 
                name.startsWith('my-cache-') && name !== CACHE_NAME
            );
            return Promise.all(oldCaches.map((cache) => caches.delete(cache)));
        })
    );
    self.clients.claim();
});

// リソースのフェッチ処理
self.addEventListener('fetch', (event) => {
    console.log(`Service Worker: フェッチ中... ${event.request.url}`);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
