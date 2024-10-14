document.addEventListener('DOMContentLoaded', function() {
    function populateTable(tableId, data) {
        const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // テーブルをクリア

        // データからテーブル行を生成
        data.forEach(item => {
            const tr = document.createElement('tr');

            // 更新日処理
            const tdDate = document.createElement('td');
            tdDate.textContent = item.date;
            tdDate.setAttribute('data-label', '更新日');
            tr.appendChild(tdDate);

            // タイトル処理
            const tdTitle = document.createElement('td');
            const a = document.createElement('a');
            a.href = item.link;
            a.textContent = item.title;
            tdTitle.appendChild(a);
            tdTitle.setAttribute('data-label', 'タイトル');
            tr.appendChild(tdTitle);

            // タグ処理
            const tdTags = document.createElement('td');
            tdTags.textContent = item.tags.map(tag => `#${tag}`).join(' ');
            tdTags.setAttribute('data-label', 'タグ');
            tr.appendChild(tdTags);

            // フラグ処理
            const tdFlag = document.createElement('td');
            if (item.flag === '0') {
                const img = document.createElement('img');
                img.src = '/ポータル/image/redflag.png'; // 赤い旗のアイコンのパス
                img.alt = 'Important';
                img.className = 'flag-icon';
                tdFlag.appendChild(img);
            }
            tdFlag.setAttribute('data-label', 'フラグ');
            tr.appendChild(tdFlag);

            // テーブルに行を追加
            tableBody.appendChild(tr);
        });
    }

    function searchTitle() {
        const input = document.getElementById('search-input').value.toLowerCase();
        const tableId = document.querySelector('table').id;
        let data;

        switch(tableId) {
            case 'table-weekly':
                data = window.weeklyData;
                break;
            case 'table-monthly':
                data = window.monthlyData;
                break;
            case 'table-past':
                data = window.pastData;
                break;
        }

        const filteredData = data.filter(item => 
            item.title.toLowerCase().includes(input) ||
            item.tags.some(tag => tag.toLowerCase().includes(input))
        );
        filterByTags(filteredData);
    }

    function sortTable(column, order) {
        const tableId = document.querySelector('table').id;
        let data;

        switch(tableId) {
            case 'table-weekly':
                data = window.weeklyData;
                break;
            case 'table-monthly':
                data = window.monthlyData;
                break;
            case 'table-past':
                data = window.pastData;
                break;
        }

        data.sort((a, b) => {
            if (column === 'date') {
                return order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
            } else if (column === 'flag') {
                return order === 'asc' ? a.flag.localeCompare(b.flag) : b.flag.localeCompare(a.flag);
            }
        });

        populateTable(tableId, data);
    }

    function filterByTags(data) {
        const checkedTags = Array.from(document.querySelectorAll('.tag-checkbox:checked')).map(cb => cb.value);
        
        if (checkedTags.length > 0) {
            const filteredData = data.filter(item => item.tags.some(tag => checkedTags.includes(tag)));
            populateTable(document.querySelector('table').id, filteredData);
        } else {
            populateTable(document.querySelector('table').id, data);
        }
    }

    // データセットの定義をグローバルスコープに移動
    //必ず、下記のサンプル通りに作ること！
    // { date: '公開日(yyyy/mm/dd)', title: 'タイトル(自由に決めてどうぞ)', link: '/ポータル/iframe/公開用資料/●●(ファイル名+拡張子)', tags: ['タグ(自由に設定OK'], flag: '入力なしor0(入力がない場合はflagなし、0は有)' },


    //今週のTOPIC用
    window.weeklyData = [
        { date: '2024/10/01', title: 'ポータルサイト開設', link: '/templates/Portal-index.html', tags: ['マニュアル'], flag: '0' },
        { date: '2024/10/02', title: 'ポータルサイト閉鎖！', link: '/templates/Feature.html', tags: ['アップデート'], flag: '' },
        { date: '2024/10/01', title: 'ポータルサイト開設', link: '/templates/Portal-index.html', tags: ['マニュアル'], flag: '0' },
    ];

    //今月のTOPIC用
    window.monthlyData = [
        { date: '2024/09/30', title: '月次報告', link: '/templates/MonthlyReport.html', tags: ['レポート'], flag: '' },
        { date: '2024/09/15', title: '新機能テスト', link: '/templates/Test.html', tags: ['テスト'], flag: '0' },
    ];

    //過去の周知用
    window.pastData = [
        { date: '2024/08/01', title: 'サマリー', link: '/templates/Summary.html', tags: ['FAQ'], flag: '' },
        { date: '2024/07/20', title: '旧機能廃止', link: '/templates/OldFeature.html', tags: ['アップデート'], flag: '0' },
        { date: '2024/08/01', title: 'サマリー', link: '/templates/Summary.html', tags: ['概要'], flag: '' },
    ];

    // 関数をグローバルスコープに公開
    window.populateTable = populateTable;
    window.searchTitle = searchTitle;
    window.sortTable = sortTable;

    // チェックボックスの変更イベントにリスナーを追加
    document.querySelectorAll('.tag-checkbox').forEach(cb => {
        cb.addEventListener('change', searchTitle);
    });
});

console.log('weeklyData:', window.weeklyData);
console.log('monthlyData:', window.monthlyData);
console.log('pastData:', window.pastData);