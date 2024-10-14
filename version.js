// バージョン番号（簡単なタイムスタンプを使用）
const version = `v=${Date.now()}`; 

// CSSとJSファイルのURLにバージョンを追加
document.getElementById('styleLink').href = `style.css?${version}`;
document.getElementById('mainScript').src = `main.js?${version}`;

console.log(`バージョン: ${version} が適用されました。`);
