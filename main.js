if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
            registration.update(); // Service Workerの更新を強制
        });
    });
}

navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Service Workerが更新されました');
    window.location.reload(); // ページをリロードして新しいキャッシュを使用
});

const loadButton = document.getElementById('loadButton');
const toggleButton = document.getElementById('toggleButton');
const textContainer = document.getElementById('textContainer');
const fileContent = document.getElementById('fileContent');

let isTextLoaded = false;

// ボタンのクリックでテキスを読み込む
const GITHUB_API_URL = 'https://api.github.com/repos/linling26/expert-parakeet/contents/documents';

// GitHub APIを使ってdocumentsフォルダの内容を取得
loadButton.addEventListener('click', () => {
    fetch(GITHUB_API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('フォルダの取得に失敗しました');
            }
            return response.json();
        })
        .then((files) => {
            const txtFiles = files.filter(file => file.name.endsWith('.txt'));

            if (txtFiles.length === 0) {
                alert('テキストファイルが見つかりませんでした');
                return;
            }

            const randomFile = txtFiles[Math.floor(Math.random() * txtFiles.length)];
            return fetch(randomFile.download_url);
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('ファイルの読み込みに失敗しました');
            }
            return response.text();
        })
        .then((data) => {
            fileContent.textContent = data;
        })
        .catch((error) => {
            console.error('エラー:', error);
            alert('エラーが発生しました: ' + error.message);
        });
});

// ボタンのクリックでテキストの表示・非表示を切り替える
toggleButton.addEventListener('click', () => {

    const isHidden = textContainer.style.display === 'none';
    
    if (isHidden) {
        textContainer.style.display = 'block';
        toggleButton.textContent = '▲ テキストを非表示';
    } else {
        textContainer.style.display = 'none';
        toggleButton.textContent = '▼ テキストを表示';
    }
});


