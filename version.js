document.addEventListener('DOMContentLoaded', () => {
    // バージョン番号（タイムスタンプを使用）
    const version = `v=${Date.now()}`; 

    // CSSとJSファイルのURLにバージョンを追加
    const styleLink = document.getElementById('styleLink');
    const mainScript = document.getElementById('mainScript');

    if (styleLink) {
        styleLink.href = `style.css?${version}`;
    }
    if (mainScript) {
        mainScript.src = `main.js?${version}`;
    }

    // Service Workerの登録とバージョンの送信
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/expert-parakeet/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration);

                // Service Workerがアクティブになったらバージョンを送信
                if (registration.active) {
                    registration.active.postMessage({ type: 'SET_VERSION', version });
                } else {
                    // Service Workerがアクティブになった際にバージョンを送信
                    navigator.serviceWorker.addEventListener('controllerchange', () => {
                        navigator.serviceWorker.controller?.postMessage({ type: 'SET_VERSION', version });
                    });
                }
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    }

    console.log(`バージョン: ${version} が適用されました。`);
});
