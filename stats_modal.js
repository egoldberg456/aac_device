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

function showUploadCsvDialog() {
    document.getElementById('uploadCsvDialog').classList.add('active');
    document.getElementById('uploadCsvOverlay').classList.add('active');
    // Attach submit listener here
    const submitCsvButton = document.getElementById('submitCsvButton');
    if (submitCsvButton) {
        // Remove previous listener if any
        submitCsvButton.addEventListener('click', handleCsvSubmit);
    }
}

function hideUploadCsvDialog() {
    document.getElementById('uploadCsvDialog').classList.remove('active');
    document.getElementById('uploadCsvOverlay').classList.remove('active');
}

// Emoji mapping for common items (expand as needed)
const emojiMap = {
    apple: '🍎',
    banana: '🍌',
    car: '🚗',
    dog: '🐶',
    cat: '🐱',
    book: '📚',
    phone: '📱',
    food: '🍔',
    drink: '🥤',
    smile: '😊',
    sun: '☀️',
    star: '⭐',
    heart: '❤️',
    house: '🏠',
    ball: '⚽',
    music: '🎵',
    tree: '🌳',
    fire: '🔥',
    water: '💧',
    fish: '🐟',
    bird: '🐦',
    flower: '🌸',
    bread: '🍞',
    cheese: '🧀',
    egg: '🥚',
    milk: '🥛',
    cookie: '🍪',
    cake: '🍰',
    // ... add more as needed
};

function getEmojiForWord(word) {
    const key = word.trim().toLowerCase();
    return emojiMap[key] || '🔲'; // fallback emoji
}

// CSV parsing and adding icons
function handleCsvSubmit() {
    console.log('Submit CSV button pressed');
    const csvFileInput = document.getElementById('csvFileInput');
    if (!csvFileInput.files || !csvFileInput.files[0]) {
        console.error('No CSV file selected');
        return;
    }
    const file = csvFileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        // Split by newlines, trim, and filter out empty lines
        const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        console.log('Parsed lines from CSV:', lines);
        // For each line, add a new button/icon
        if (buttonConfig && Array.isArray(buttonConfig.buttons)) {
            lines.forEach(name => {
                // Avoid duplicates
                if (buttonConfig.buttons.some(b => b.text === name)) return;
                buttonConfig.buttons.push({
                    id: 'icon_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
                    text: name,
                    image: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='56'>${getEmojiForWord(name)}</text></svg>`
                });
            });
            console.log('Updated buttonConfig.buttons:', buttonConfig.buttons);
            // Re-render buttons
            if (window.createButtons) window.createButtons();
        } else {
            console.error('window.buttonConfig or window.buttonConfig.buttons is not available');
        }
        // Close modal and clear file name
        hideUploadCsvDialog();
        document.getElementById('csvFileName').textContent = '';
        csvFileInput.value = '';
    };
    reader.readAsText(file);
}

// Attach event listeners for upload button and overlay
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        // Upload button in dev-buttons
        const uploadBtn = document.getElementById('uploadButton');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', showUploadCsvDialog);
        }
        // Upload button in stats dialog (legacy, now removed)
        const uploadCsvBtn = document.getElementById('uploadCsvButton');
        if (uploadCsvBtn) {
            uploadCsvBtn.addEventListener('click', showUploadCsvDialog);
        }
        const uploadOverlay = document.getElementById('uploadCsvOverlay');
        if (uploadOverlay) {
            uploadOverlay.addEventListener('click', hideUploadCsvDialog);
        }
        // Import from CSV logic
        const importCsvButton = document.getElementById('importCsvButton');
        const csvFileInput = document.getElementById('csvFileInput');
        const csvFileName = document.getElementById('csvFileName');
        if (importCsvButton && csvFileInput && csvFileName) {
            importCsvButton.addEventListener('click', () => {
                csvFileInput.value = '';
                csvFileInput.click();
            });
            csvFileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    csvFileName.textContent = e.target.files[0].name;
                } else {
                    csvFileName.textContent = '';
                }
            });
        }
    });
}

function createButtons() {
  // ... your code ...
}
window.createButtons = createButtons;

export { showStatsDialog, hideStatsDialog };