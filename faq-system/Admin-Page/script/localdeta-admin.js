// ページが読み込まれた後に実行
window.addEventListener('DOMContentLoaded', (event) => {
    // ローカルストレージからデータを取得
    const detailsCount = localStorage.getItem('detailsCount');
    const lastModified = localStorage.getItem('lastModified');
    // データ数を表示
    if (detailsCount !== null) {
        document.getElementById('data-count').textContent = `現在のQ&A数：${detailsCount}`;
    } else {
        document.getElementById('data-count').textContent = '現在のQA&数：データが見つかりません';
    }
    // 最終更新日時を表示
    if (lastModified !== null) {
        document.getElementById('last-modified').textContent = `最終更新日時：${lastModified}`;
    } else {
        document.getElementById('last-modified').textContent = '最終更新日時：データが見つかりません';
    }
});
