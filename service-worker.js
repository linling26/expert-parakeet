let CACHE_VERSION = 'v1'; // デフォルトバージョン
let CACHE_NAME = `my-cache-${CACHE_VERSION}`;

const CACHE_FILES = [
    '/expert-parakeet/',
    '/expert-parakeet/index.html',
    '/expert-parakeet/style.css',
    '/expert-parakeet/main.js'
];

// メッセージを受け取り、キャッシュバージョンを更新
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SET_VERSION') {
        const newVersion = event.data.version;
        if (newVersion !== CACHE_VERSION) {
            CACHE_VERSION = newVersion;
            CACHE_NAME = `my-cache-${CACHE_VERSION}`;
            console.log(`新しいキャッシュ名: ${CACHE_NAME}`);
        }
    }
});

// インストール時にキャッシュを追加
self.addEventListener('install', (event) => {
    console.log(`Service Worker: インストール中... バージョン: ${CACHE_NAME}`);
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: キャッシュ中...');
            return cache.addAll(CACHE_FILES);
        })
    );
    self.skipWaiting(); // インストール後即時有効化
});

// アクティブ化時に古いキャッシュを削除
self.addEventListener('activate', (event) => {
    console.log('Service Worker: アクティベート中...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`古いキャッシュを削除: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim(); // すべてのページに即時適用
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
