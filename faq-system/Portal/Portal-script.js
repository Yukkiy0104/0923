document.addEventListener('DOMContentLoaded', function() {
    // タグ検索ボックスのクリックイベント
    document.getElementById('tag-search-box').addEventListener('click', function() {
        document.getElementById('tag-dropdown-container').style.display = 'block';
    });

    // タグ選択ボタンのクリックイベント
    document.getElementById('tag-select-button').addEventListener('click', function() {
        const selectedTags = Array.from(document.getElementById('tag-dropdown').selectedOptions).map(option => option.value);
        document.getElementById('tag-search-box').value = selectedTags.join(', ');
        document.getElementById('tag-dropdown-container').style.display = 'none';
    });

    // 検索ボタンのクリックイベント
    document.getElementById('search-button').addEventListener('click', function() {
        const searchWord = document.getElementById('word-search-box').value.toLowerCase();
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';

        const topics = document.querySelectorAll('#weekly-topics p, #monthly-topics p');
        topics.forEach(topic => {
            if (topic.textContent.toLowerCase().includes(searchWord)) {
                const resultItem = document.createElement('a');
                resultItem.href = topic.querySelector('a').href;
                resultItem.textContent = topic.textContent;
                searchResults.appendChild(resultItem);
            }
        });

        searchResults.style.display = 'block';
    });

    // 「もっと見る」ボタンのクリックイベント
document.getElementById('show-more-weekly').addEventListener('click', function() {
    document.getElementById('more-weekly-topics').style.display = 'block';
    this.style.display = 'none';
});

document.getElementById('show-more-monthly').addEventListener('click', function() {
    document.getElementById('more-monthly-topics').style.display = 'block';
    this.style.display = 'none';
});

document.getElementById('show-more-past').addEventListener('click', function() {
    document.getElementById('more-past-topics').style.display = 'block';
    this.style.display = 'none';
});
});


// 検索機能
document.addEventListener('DOMContentLoaded', function() {
    // タグ検索機能
    const tagSearchBox = document.getElementById('tag-search-box');
    const tagDropdownContainer = document.getElementById('tag-dropdown-container');
    const tagDropdown = document.getElementById('tag-dropdown');
    const tagSelectButton = document.getElementById('tag-select-button');
    const tagResetButton = document.getElementById('tag-reset-button');
    const wordSearchBox = document.getElementById('word-search-box');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    tagSelectButton.addEventListener('click', function() {
        const selectedTags = Array.from(tagDropdown.selectedOptions).map(option => option.value.trim());
        tagSearchBox.value = selectedTags.join(', ');
        tagDropdownContainer.style.display = 'none';

        // タグに一致しないsectionとpタグを非表示にする
        const sections = document.querySelectorAll('main section, .topics-container section, #past-topics');
        sections.forEach(section => {
            const sectionTags = section.querySelectorAll('[data-tags]');
            let sectionMatch = false;
            sectionTags.forEach(tagElement => {
                const tags = tagElement.getAttribute('data-tags').split(' ').map(tag => tag.trim());
                if (selectedTags.some(tag => tags.includes(tag))) {
                    sectionMatch = true;
                }
            });
            section.style.display = sectionMatch ? 'block' : 'none';

            // 各section内のpタグをチェック
            const paragraphs = section.querySelectorAll('p[data-tags]');
            paragraphs.forEach(paragraph => {
                const tags = paragraph.getAttribute('data-tags').split(' ').map(tag => tag.trim());
                const match = selectedTags.some(tag => tags.includes(tag));
                paragraph.style.display = match ? 'block' : 'none';
            });

            // 「もっと見る」ボタンを非表示にする
            const moreButton = section.querySelector('button[id^="show-more"]');
            if (moreButton) {
                moreButton.style.display = 'none';
            }

            // すべての「もっと見る」コンテンツを表示する
            const moreContent = section.querySelectorAll('div[id^="more-"]');
            moreContent.forEach(content => {
                content.style.display = 'block';
            });
        });
    });

    tagResetButton.addEventListener('click', function() {
        tagSearchBox.value = '';
        wordSearchBox.value = '';
        const sections = document.querySelectorAll('main section, .topics-container section, #past-topics');
        sections.forEach(section => {
            section.style.display = 'block';
            const paragraphs = section.querySelectorAll('p[data-tags]');
            paragraphs.forEach(paragraph => {
                paragraph.style.display = 'block';
            });

            // 「もっと見る」ボタンを再表示する
            const moreButton = section.querySelector('button[id^="show-more"]');
            if (moreButton) {
                moreButton.style.display = 'block';
            }

            // すべての「もっと見る」コンテンツを非表示にする
            const moreContent = section.querySelectorAll('div[id^="more-"]');
            moreContent.forEach(content => {
                content.style.display = 'none';
            });
        });
    });

    tagSearchBox.addEventListener('input', function() {
        const inputTags = tagSearchBox.value.split(',').map(tag => tag.trim());
        const sections = document.querySelectorAll('main section, .topics-container section, #past-topics');
        sections.forEach(section => {
            const sectionTags = section.querySelectorAll('[data-tags]');
            let sectionMatch = false;
            sectionTags.forEach(tagElement => {
                const tags = tagElement.getAttribute('data-tags').split(' ').map(tag => tag.trim());
                if (inputTags.some(tag => tags.includes(tag))) {
                    sectionMatch = true;
                }
            });
            section.style.display = sectionMatch ? 'block' : 'none';

            // 各section内のpタグをチェック
            const paragraphs = section.querySelectorAll('p[data-tags]');
            paragraphs.forEach(paragraph => {
                const tags = paragraph.getAttribute('data-tags').split(' ').map(tag => tag.trim());
                const match = inputTags.some(tag => tags.includes(tag));
                paragraph.style.display = match ? 'block' : 'none';
            });

            // 「もっと見る」ボタンを非表示にする
            const moreButton = section.querySelector('button[id^="show-more"]');
            if (moreButton) {
                moreButton.style.display = 'none';
            }

            // すべての「もっと見る」コンテンツを表示する
            const moreContent = section.querySelectorAll('div[id^="more-"]');
            moreContent.forEach(content => {
                content.style.display = 'block';
            });
        });

        if (tagSearchBox.value === '') {
            sections.forEach(section => {
                section.style.display = 'block';
                const paragraphs = section.querySelectorAll('p[data-tags]');
                paragraphs.forEach(paragraph => {
                    paragraph.style.display = 'block';
                });

                // 「もっと見る」ボタンを再表示する
                const moreButton = section.querySelector('button[id^="show-more"]');
                if (moreButton) {
                    moreButton.style.display = 'block';
                }

                // すべての「もっと見る」コンテンツを非表示にする
                const moreContent = section.querySelectorAll('div[id^="more-"]');
                moreContent.forEach(content => {
                    content.style.display = 'none';
                });
            });
        }
    });

    // ワード検索機能
    searchButton.addEventListener('click', function() {
        const searchWord = wordSearchBox.value.toLowerCase();
        searchResults.innerHTML = '';

        if (searchWord.trim() === '') {
            return; // ワード検索窓が空の場合は検索を実行しない
        }

        const topics = document.querySelectorAll('#weekly-topics p, #monthly-topics p, #past-topics-content p');
        let resultCount = 0;

        topics.forEach(topic => {
            if (topic.textContent.toLowerCase().includes(searchWord)) {
                if (resultCount < 10) {
                    const resultItem = document.createElement('a');
                    resultItem.href = topic.querySelector('a').href;
                    resultItem.textContent = topic.textContent;
                    resultItem.textContent = topic.querySelector('a').textContent; // タグ名を除外してテキストのみを表示
                    searchResults.appendChild(resultItem);
                    resultCount++;
                }
            }
        });

        searchResults.style.display = 'block';
        searchResults.style.maxHeight = '200px';
        searchResults.style.overflowY = 'auto';
    });

    // 「もっと見る」ボタン機能
    const showMoreButtons = document.querySelectorAll('button[id^="show-more"]');
    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moreContentId = button.id.replace('show-more', 'more');
            const moreContent = document.getElementById(moreContentId);
            if (moreContent.style.display === 'none') {
                moreContent.style.display = 'block';
                button.textContent = '閉じる';
            } else {
                moreContent.style.display = 'none';
                button.textContent = 'もっと見る';
            }
        });
    });
});


// タグを表示する関数
function displayTags() {
    const topics = document.querySelectorAll('#weekly-topics p, #monthly-topics p, #past-topics p');
      topics.forEach(function(topic) {
        const tags = topic.getAttribute('data-tags').split(' ');
        const tagContainer = topic.querySelector('.tags');
        tagContainer.innerHTML = ''; // 既存のタグをクリア
        tags.forEach(function(tag) {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagContainer.appendChild(tagElement);
        });
    });
}

// 初期表示時にタグを表示
displayTags(); 