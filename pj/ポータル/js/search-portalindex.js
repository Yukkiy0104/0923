document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoadedイベントが発生しました');

    function searchTitle() {
        const input = document.getElementById('search-input').value.toLowerCase();
        const allData = [...window.weeklyData, ...window.monthlyData, ...window.pastData];
        const filteredData = allData.filter(item => item.title.toLowerCase().includes(input));

        let resultContainer = document.getElementById('search-results');
        if (!resultContainer) {
            resultContainer = document.createElement('div');
            resultContainer.id = 'search-results';
            document.body.appendChild(resultContainer);
        }

        if (input === '') {
            resultContainer.style.display = 'none';
            resultContainer.innerHTML = ''; // 検索ボックスが空白の場合に結果をクリア
        } else {
            resultContainer.style.display = 'block';
            const resultLinks = filteredData.map(item => {
                const flagIcon = item.flag === '0' ? '<span style="display: inline-block; min-width: 30px;"></span>' : '<span style="display: inline-block; min-width: 30px;">🚩</span>';
                return `${flagIcon} <a href="${item.link}" target="_blank" style="text-decoration: none;">${item.title}</a>`;
            });
            resultContainer.innerHTML = resultLinks.join('<br>');
        }
    }

    document.getElementById('search-input').addEventListener('input', searchTitle);

    // 各セクションのコンテンツを読み込む（例: weekly, monthly, past）
    function loadSectionContent(data, elementId) {
        const contentElement = document.getElementById(elementId);
        const content = data.map(item => {
            const flagIcon = item.flag === '0' ? '' : '🚩';
            return `${flagIcon} <a href="${item.link}" target="_blank">${item.title}</a>`;
        }).slice(0, 6).join('<br>');

        contentElement.innerHTML = content;
    }

    // データを読み込む
    loadSectionContent(window.weeklyData, 'weekly-content');
    loadSectionContent(window.monthlyData, 'monthly-content');
    loadSectionContent(window.pastData, 'past-content');
});
