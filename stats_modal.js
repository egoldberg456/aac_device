// Stats dialog and chart logic for AAC Device
let statsChartInstance = null;

function showStatsDialog(buttonConfig) {
    const statsDialog = document.getElementById('statsDialog');
    const statsOverlay = document.getElementById('statsDialogOverlay');
    statsDialog.classList.add('active');
    statsOverlay.classList.add('active');
    drawStatsBarChart(buttonConfig);
}

function hideStatsDialog() {
    document.getElementById('statsDialog').classList.remove('active');
    document.getElementById('statsDialogOverlay').classList.remove('active');
}

function drawStatsBarChart(buttonConfig) {
    const ctx = document.getElementById('statsBarChart').getContext('2d');
    // Get icon names and random stats
    const names = buttonConfig.buttons.map(b => b.text);
    const stats = names.map(() => Math.floor(Math.random() * 101));
    // Destroy previous chart if exists
    if (statsChartInstance) {
        statsChartInstance.destroy();
    }
    statsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Clicks',
                data: stats,
                backgroundColor: '#1a73e8',
                borderRadius: 6,
                maxBarThickness: 60,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: false
                    },
                    ticks: {
                        color: '#202124',
                        font: { size: 13 },
                        maxRotation: 30,
                        minRotation: 0,
                        autoSkip: false
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Clicks',
                        color: '#202124',
                        font: { size: 14 }
                    },
                    ticks: {
                        color: '#202124',
                        font: { size: 13 }
                    },
                    grid: {
                        color: '#e0e7ef',
                        borderDash: [4, 4]
                    }
                }
            }
        }
    });
}

export { showStatsDialog, hideStatsDialog }; 