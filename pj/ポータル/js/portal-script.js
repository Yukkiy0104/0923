document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoadedイベントが発生しました');

    function loadIframeContent(url, elementId, dataKey) {
        console.log(`URL: ${url} から ${elementId} にコンテンツをロードします`);

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);

        iframe.onload = function() {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                console.log('iframeのドキュメント:', doc);

                const script = doc.createElement('script');
                script.type = 'text/javascript';
                script.text = `
                    const links = window.${dataKey}.map(item => {
                        const flagIcon = item.flag === '0' ? '<span style="display: inline-block; width: 30px;">&nbsp;</span>' : '<span style="display: inline-block; width: 30px;">🚩</span>';
                        const date = new Date(item.date);
                        const formattedDate = date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
                        const today = new Date();
                        const oneWeekAgo = new Date();
                        oneWeekAgo.setDate(today.getDate() - 7);
                        const isNew = date >= oneWeekAgo && date <= today ? '<span style="color:red; margin-left: 5px;">NEW</span>' : '';
                        const tags = item.tags && Array.isArray(item.tags) ? item.tags.map(tag => '<span style="background-color: #e0e0e0; padding: 2px 8px; margin-left: 5px; border-radius: 12px; font-size: 0.9em;">#' + tag + '</span>').join('') : '';
                        return \`\${flagIcon} <a href="\${item.link}" target="_blank" style="text-decoration: none;">\${item.title}</a> \${tags} <span style="margin-left: 10px;">[\${formattedDate}]\${isNew}</span>\`;
                    });
                    window.parent.postMessage({ key: '${dataKey}', links: links }, '*');
                `;
                doc.body.appendChild(script);

                window.addEventListener('message', function(event) {
                    if (event.data.key === dataKey && Array.isArray(event.data.links)) {
                        console.log('iframeからのリンク:', event.data.links);
                        document.getElementById(elementId).innerHTML = event.data.links.slice(0, 6).join('<br>');
                        document.body.removeChild(iframe);
                    }
                }, { once: true });
            } catch (error) {
                console.error('iframeの内容を取得する際にエラーが発生しました:', error);
                document.getElementById(elementId).innerHTML = 'コンテンツのロードエラーが発生しました';
            }
        };
    }

    loadIframeContent('/ポータル/iframe/weekly-topic.html', 'weekly-content', 'weeklyData');
    loadIframeContent('/ポータル/iframe/monthly-topic.html', 'monthly-content', 'monthlyData');
    loadIframeContent('/ポータル/iframe/past-topic.html', 'past-content', 'pastData');
});
