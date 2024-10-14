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

    console.log(`バージョン: ${version} が適用されました。`);
});
