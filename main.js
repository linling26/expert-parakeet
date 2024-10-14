if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/expert-parakeet/service-worker.js').then((registration) => {
            console.log('ServiceWorker registered:', registration.scope);
        }).catch((error) => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

const toggleButton = document.getElementById('toggleButton');
const textContainer = document.getElementById('textContainer');
const fileContent = document.getElementById('fileContent');

let isTextLoaded = false;

// ボタンのクリックでテキストの表示・非表示を切り替える
toggleButton.addEventListener('click', () => {
    const isHidden = textContainer.style.display === 'none';

    if (isHidden) {
        if (!isTextLoaded) {
            loadTextFile('/expert-parakeet/documents/sample.txt');
            isTextLoaded = true;
        }
        textContainer.style.display = 'block';
        toggleButton.textContent = '▲ テキストを非表示';
    } else {
        textContainer.style.display = 'none';
        toggleButton.textContent = '▼ テキストを表示';
    }
});

// テキストファイルを読み込む関数
function loadTextFile(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('ファイルの読み込みに失敗しました');
            }
            return response.text();
        })
        .then(data => {
            fileContent.textContent = data;
        })
        .catch(error => {
            console.error('エラー:', error);
            fileContent.textContent = 'ファイルの読み込みに失敗しました';
        });
}


