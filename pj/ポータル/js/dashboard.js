document.addEventListener('DOMContentLoaded', function() {
    console.log('管理者ダッシュボードのロードが完了しました');

    function getPostCounts(data) {
        const counts = {};
        data.forEach(item => {
            const date = item.date;
            if (!counts[date]) {
                counts[date] = 0;
            }
            counts[date]++;
        });
        return counts;
    }

    function getTagCounts(data) {
        const counts = {};
        data.forEach(item => {
            item.tags.forEach(tag => {
                if (!counts[tag]) {
                    counts[tag] = 0;
                }
                counts[tag]++;
            });
        });
        return counts;
    }

    function compareCounts(current, previous) {
        if (current > previous) {
            return `<span style="color:red;">(▲ ${current - previous})</span>`;
        } else if (current < previous) {
            return `<span style="color:blue;">(▼ ${current - previous})</span>`;
        } else {
            return `(±0)`;
        }
    }

    function getPreviousMonthCount(data) {
        const today = new Date();
        const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);

        return data.filter(item => {
            const date = new Date(item.date);
            return date >= firstDayOfPreviousMonth && date < firstDayOfCurrentMonth;
        }).length;
    }

    function getThisMonthCount(data) {
        const today = new Date();
        const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        return data.filter(item => {
            const date = new Date(item.date);
            return date >= firstDayOfCurrentMonth;
        }).length;
    }
    function getPreviousWeekCount(data) {
        const today = new Date();
        const firstDayOfCurrentWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const firstDayOfPreviousWeek = new Date(firstDayOfCurrentWeek);
        firstDayOfPreviousWeek.setDate(firstDayOfPreviousWeek.getDate() - 7);

        return data.filter(item => {
            const date = new Date(item.date);
            return date >= firstDayOfPreviousWeek && date < firstDayOfCurrentWeek;
        }).length;
    }

    function updateDashboardCounts() {
        const weeklyCount = window.weeklyData.filter(item => {
            const today = new Date();
            const firstDayOfCurrentWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const date = new Date(item.date);
            return date >= firstDayOfCurrentWeek;
        }).length;

        const monthlyCount = getThisMonthCount(window.monthlyData) +
                             getThisMonthCount(window.weeklyData) +
                             getThisMonthCount(window.pastData);

        const flaggedCount = window.weeklyData.filter(item => item.flag === '0').length + 
                             window.monthlyData.filter(item => item.flag === '0').length + 
                             window.pastData.filter(item => item.flag === '0').length;
        const totalPosts = window.weeklyData.length + window.monthlyData.length + window.pastData.length;  // 総投稿数

        const previousMonthlyCount = getPreviousMonthCount(window.monthlyData) +
                                     getPreviousMonthCount(window.weeklyData) +
                                     getPreviousMonthCount(window.pastData);

        document.getElementById('weekly-count').innerHTML = `${weeklyCount}`;
        document.getElementById('monthly-count').innerHTML = `${monthlyCount} ${compareCounts(monthlyCount, previousMonthlyCount)}`;
        document.getElementById('flagged-count').innerHTML = flaggedCount;
        document.getElementById('total-posts').innerHTML = totalPosts;  // 総投稿数の表示

        const allData = [...window.weeklyData, ...window.monthlyData, ...window.pastData];

        const recentPostsCount = getPostCounts(allData.filter(item => {
            const topicDate = new Date(item.date);
            const firstDayOfCurrentMonth = new Date();
            firstDayOfCurrentMonth.setDate(1);
            firstDayOfCurrentMonth.setMonth(firstDayOfCurrentMonth.getMonth());
            return topicDate >= firstDayOfCurrentMonth;
        }));

        const allPostsCount = getPostCounts(allData);

        const tagCounts = getTagCounts(allData);

        createLineChart('recentPostsChart', recentPostsCount, '今月の投稿数', 'day', 2);  // 2日刻みに変更
        createLineChart('allPostsChart', allPostsCount, 'すべての日付の投稿数', 'month', 2);
        createPieChart('tagPieChart', tagCounts, 'タグの割合');
    }

    function createLineChart(canvasId, data, title, timeUnit, stepSize) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const labels = Object.keys(data).filter(label => data[label] > 0).map(label => moment(label, 'YYYY/MM/DD').toISOString());
        const values = Object.keys(data).filter(label => data[label] > 0).map(label => data[label]);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: timeUnit,
                            displayFormats: {
                                day: 'MM/DD',
                                month: 'YYYY/MM'
                            }
                        },
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            minRotation: 0
                        },
                        adapters: {
                            date: {
                                locale: 'ja'
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: stepSize
                        }
                    }
                },
                interaction: {
                    mode: 'index',  // 折れ線全体にカーソル合わせで表示
                    intersect: false
                },
                plugins: {
                    tooltip: {
                        enabled: true  // ツールチップを有効化
                    }
                }
            }
        });
    }

    function createPieChart(canvasId, data, title) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const labels = Object.keys(data);
        const values = Object.values(data);

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: values,
                    backgroundColor: labels.map((_, i) => `hsl(${i * 360 / labels.length}, 70%, 70%)`),
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,  // アスペクト比を維持しない
                plugins: {
                    legend: { display: false },  // デフォルトの凡例を非表示
                    datalabels: {
                        formatter: (value, ctx) => {
                            let sum = 0;
                            const dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            const percentage = (value * 100 / sum).toFixed(2) + "%";
                            return percentage;
                        },
                        color: '#fff'
                    }
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 60
                    }
                },
                aspectRatio: 1
            }
        });

        const legendContainer = document.getElementById('tagLegend');
        legendContainer.innerHTML = '';  // 初期化
        labels.forEach((label, i) => {
            const colorBox = `<span class="legend-color-box" style="background-color: hsl(${i * 360 / labels.length}, 70%, 70%);"></span>`;
            const percentage = (values[i] * 100 / values.reduce((a, b) => a + b, 0)).toFixed(2) + "%";
            legendContainer.innerHTML += `<li>${colorBox}${label} ${percentage}</li>`;
        });
    }

    updateDashboardCounts();
});
