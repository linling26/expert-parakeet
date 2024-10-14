if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/expert-parakeet/service-worker.js').then((registration) => {
            console.log('ServiceWorker registered:', registration.scope);
        }).catch((error) => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvasサイズを画面に合わせる
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = 2;

// タッチイベントで位置を変更
canvas.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    x = touch.clientX;
    y = touch.clientY;
});

// ゲームループ
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ボールを描画
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#61dafb';
    ctx.fill();

    x += dx;
    y += dy;

    // 壁でバウンド
    if (x + 20 > canvas.width || x - 20 < 0) dx = -dx;
    if (y + 20 > canvas.height || y - 20 < 0) dy = -dy;

    requestAnimationFrame(gameLoop);
}
gameLoop();

const toggleButton = document.getElementById('toggleButton');
const topHalf = document.getElementById('topHalf');
const fileContent = document.getElementById('fileContent');
const showTextButton = document.getElementById('showTextButton');

let isTextLoaded = false; // 一度だけファイルを読み込むためのフラグ

// 「テキストを表示」ボタンのクリックイベント
showTextButton.addEventListener('click', () => {
    if (!isTextLoaded) {
        loadTextFile('sample.txt'); // 初回のみファイルを読み込む
        isTextLoaded = true;
    }
    topHalf.style.display = 'block'; // 上半分の領域を表示
    showTextButton.style.display = 'none'; // 「テキストを表示」ボタンを非表示
});

// 「テキストを非表示」ボタンのクリックイベント
toggleButton.addEventListener('click', () => {
    topHalf.style.display = 'none'; // 上半分の領域を非表示
    showTextButton.style.display = 'inline-block'; // 「テキストを表示」ボタンを再表示
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
            fileContent.textContent = data; // 読み込んだテキストを表示
        })
        .catch(error => {
            console.error('エラー:', error);
            fileContent.textContent = 'ファイルの読み込みに失敗しました';
        });
}

