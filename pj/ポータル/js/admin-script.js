document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded');

    // キャッシュのタイムスタンプをチェック
    const cacheTimestamp = localStorage.getItem('cacheTimestamp');
    const currentTime = new Date().getTime();
    const twelveHours = 12 * 60 * 60 * 1000; // 12時間をミリ秒に変換

    if (cacheTimestamp && (currentTime - cacheTimestamp > twelveHours)) {
        // 12時間以上経過している場合、キャッシュをクリア
        localStorage.clear();
        console.log('Cache cleared');
    }

    // 新しいタイムスタンプを保存
    localStorage.setItem('cacheTimestamp', currentTime);

    // ログインフォームの処理
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const id = document.getElementById('id').value;
            const password = document.getElementById('password').value;

            // ログイン成功フラグを初期化
            let loginSuccess = false;

            if (id === 'admin' && password === 'admin123') {
                localStorage.setItem('loggedIn', 'true'); // ログインフラグを設定
                loginSuccess = true; // ログイン成功フラグを設定
                console.log('Login successful');
            } else {
                alert('ユーザー名またはパスワードが間違っています');
                console.log('Login failed');
            }

            // ログイン成功時にリダイレクト
            if (loginSuccess) {
                console.log('Redirecting to /ポータル/admin-index.html');
                window.location.href = '/ポータル/admin-index.html';
            }
        });
    }

    // ログイン状態のチェック
    if (localStorage.getItem('loggedIn') !== 'true' && window.location.pathname.includes('admin-index.html')) {
        console.log('Not logged in, redirecting to /ポータル/js/Login.html');
        window.location.href = '/ポータル/js/Login.html'; // ログインページにリダイレクト
    }

    // ログアウトリンクの処理
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('loggedIn'); // ログインフラグを削除
            console.log('Logged out, redirecting to /FAQ/faq-index.html');
            window.location.href = '/FAQ/faq-index.html'; // FAQページ(ユーザー用)にリダイレクト
        });
    }
});
