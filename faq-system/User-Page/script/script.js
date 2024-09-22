// 検索機能
function searchQA() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const resultsDiv = document.getElementById('search-results');

    // 入力チェック
    if (!input) {
        alert('検索ワードを入力してください');
        return;
    }

    const qaItems = document.querySelectorAll('summary');
    let results = '';

    qaItems.forEach((summary, index) => {
        if (summary.textContent.toLowerCase().includes(input)) {
            const qaId = summary.parentElement.id;
            results += `<p><a href="#${qaId}" onclick="openQA('${qaId}')">${summary.textContent}</a></p>`;
        }
    });

    if (results) {
        resultsDiv.innerHTML = `<p>検索結果:</p> `+ results;
    } else {
        resultsDiv.innerHTML = '<p>該当なし</p>';
    }

    // 検索実行後にページ最上部へ遷移
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 検索結果のリンクから特定のQAを開く
function openQA(qaId) {
    const qaElement = document.getElementById(qaId);
    if (qaElement) {
        qaElement.open = true;  // アコーディオンを開く
    }
}

// 指定されたカテゴリーまでスクロール
function scrollToCategory(categoryId) {
    const element = document.getElementById(categoryId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

//QA先頭に”Q”と”A”を表示させる
document.querySelectorAll('details summary').forEach(summary => {
    summary.textContent = 'Q: ' + summary.textContent;
});

document.querySelectorAll('details p').forEach(p => {
    p.textContent = 'A: ' + p.textContent;
});