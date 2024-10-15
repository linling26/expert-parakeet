if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
            registration.update(); // Service Workerの更新を強制
        });
    });
}

const loadButton = document.getElementById('loadButton');
const toggleButton = document.getElementById('toggleButton');
const textContainer = document.getElementById('textContainer');
const fileContent = document.getElementById('fileContent');

let isTextLoaded = false;

// ボタンのクリックでテキスを読み込む
loadButton.addEventListener('click', () => {
    
    loadTextFile('/expert-parakeet/documents');
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
        .then(response => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = Array.from(doc.querySelectorAll('a'))
                .map(link => link.href)
                .filter(href => href.endsWith('.txt'));

            if (links.length === 0) {
                alert('テキストファイルが見つかりませんでした');
                return;
            }

            const randomFile = links[Math.floor(Math.random() * links.length)];
            return fetch(randomFile);
        })
        .then(response => response.text())
        .then(data => {
            fileContent.textContent = data;
        })
        .catch(error => {
            console.error('エラー:', error);
            alert('ファイルの読み込みに失敗しました');
        });
}


