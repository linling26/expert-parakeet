if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
            registration.update(); // Service Workerの更新を強制
        });
    });
}

const toggleButton = document.getElementById('toggleButton');
const textContainer = document.getElementById('textContainer');
const fileContent = document.getElementById('fileContent');

let isTextLoaded = false;

// ボタンのクリックでテキスを読み込む
loadButton.addEventListener('click', () => {
    
    loadTextFile('/expert-parakeet/documents/sample.txt');
    isTextLoaded = true;
       
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


