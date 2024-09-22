// detailsタグの数をカウント
const detailsCount = document.querySelectorAll('details').length;
// 最終更新日時を取得
const now = new Date();
const lastModified = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
// ローカルストレージに保存
localStorage.setItem('detailsCount', detailsCount);
localStorage.setItem('lastModified', lastModified);
