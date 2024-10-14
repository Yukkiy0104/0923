document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoadedイベントが発生しました');

    function searchQA() {
        const input = document.getElementById('search-input').value.toLowerCase();
        const resultsDiv = document.getElementById('search-results');
        // 入力チェック
        if (!input) {
            resultsDiv.innerHTML = '';
            const context = document.querySelectorAll('details');
            const instance = new Mark(context);
            instance.unmark();
            return;
        }
        const qaItems = document.querySelectorAll('summary');
        let results = '';
        let matchCount = 0;
        qaItems.forEach((summary, index) => {
            if (summary.textContent.toLowerCase().includes(input)) {
                const qaId = summary.parentElement.id;
                results += `<p><a href="#${qaId}" onclick="openQA('${qaId}', '${input}')">${summary.textContent}</a></p>`;
                matchCount++;
            }
        });
        if (results) {
            resultsDiv.innerHTML = `<p>検索結果：該当${matchCount}件</p> ` + results;
        } else {
            resultsDiv.innerHTML = '<p>検索結果：該当なし</p>';
        }
        // 検索実行後にページ最上部へ遷移
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // 既存のマークアップを解除
        const context = document.querySelectorAll('details');
        const instance = new Mark(context);
        instance.unmark();
        // 検索ワードをマークアップ
        instance.mark(input);
    }

    // 検索結果のリンクから特定のQAを開く
    function openQA(qaId, input) {
        const qaElement = document.getElementById(qaId);
        if (qaElement) {
            qaElement.open = true; // アコーディオンを開く
            // 検索ワードをマークアップ
            const context = qaElement;
            const instance = new Mark(context);
            instance.unmark();
            instance.mark(input);
        }
    }

    // 指定されたカテゴリーまでスクロール
    function scrollToCategory(categoryId) {
        const element = document.getElementById(categoryId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // 先頭に"質問："を表示させる
    document.querySelectorAll('details summary').forEach(summary => {
        summary.textContent = '質問： ' + summary.textContent;
    });

    // 検索ボックスの入力イベントを監視してリセット処理を追加
    document.getElementById('search-input').addEventListener('input', function() {
        const input = this.value;
        if (!input) {
            const resultsDiv = document.getElementById('search-results');
            resultsDiv.innerHTML = '';
            const context = document.querySelectorAll('details');
            const instance = new Mark(context);
            instance.unmark();
        }
    });

    // サイドバーのカテゴリ表示機能
    function toggleSubcategory(index) {
        const subcategory = document.getElementById(`subcategory-${index}`);
        const button = subcategory.previousElementSibling;
        if (subcategory.style.display === "none") {
            subcategory.style.display = "block";
            button.classList.add("open");
        } else {
            subcategory.style.display = "none";
            button.classList.remove("open");
        }
    }

    window.searchQA = searchQA;
    window.openQA = openQA;
    window.scrollToCategory = scrollToCategory;
    window.toggleSubcategory = toggleSubcategory;
});
