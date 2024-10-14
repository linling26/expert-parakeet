let CACHE_NAME = 'my-cache'; // デフォルトのキャッシュ名

// メッセージを受け取り、バージョンをセット
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SET_VERSION') {
        CACHE_NAME = `my-cache-${event.data.version}`;
        console.log(`CACHE_NAME set to: ${CACHE_NAME}`);
    }
});

// インストール時にキャッシュを追加
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/expert-parakeet/',
                '/expert-parakeet/index.html',
                '/expert-parakeet/style.css',
                '/expert-parakeet/main.js'
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

// リソースのフェッチ処理
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
