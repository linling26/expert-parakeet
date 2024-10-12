const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('ServiceWorker registered:', registration.scope);
        }).catch((error) => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

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
