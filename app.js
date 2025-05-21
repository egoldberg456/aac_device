// Initialize the speech synthesis
const synth = window.speechSynthesis;

// Function to create and add buttons to the grid
function createButtons() {
    const buttonGrid = document.getElementById('button-grid');
    
    buttonConfig.buttons.forEach(button => {
        const buttonElement = document.createElement('button');
        buttonElement.className = 'aac-button';
        buttonElement.id = button.id;
        
        // Create image element
        const img = document.createElement('img');
        img.src = button.image;
        img.alt = button.text;
        
        // Create text element
        const text = document.createElement('span');
        text.textContent = button.text;
        
        // Add click event for text-to-speech
        buttonElement.addEventListener('click', () => {
            speakText(button.text);
        });
        
        // Add elements to button
        buttonElement.appendChild(img);
        buttonElement.appendChild(text);
        
        // Add button to grid
        buttonGrid.appendChild(buttonElement);
    });
}

// Function to handle text-to-speech
function speakText(text) {
    // Cancel any ongoing speech
    synth.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure speech settings
    utterance.rate = 0.9; // Slightly slower than normal
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Speak the text
    synth.speak(utterance);
}

// Create an images directory if it doesn't exist
function createImagesDirectory() {
    // This is just a placeholder - in a real implementation,
    // you would need to provide actual images for each button
    console.log('Please add appropriate images to the images/ directory for each button.');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    createImagesDirectory();
    createButtons();

    // Initialize developer mode toggle
    const devModeToggle = document.getElementById('devModeToggle');
    const devButtons = document.querySelector('.dev-buttons');

    console.log('Dev Mode Toggle element:', devModeToggle);
    console.log('Dev Buttons element:', devButtons);

    devModeToggle.addEventListener('change', (e) => {
        console.log('Toggle changed:', e.target.checked);
        if (e.target.checked) {
            devButtons.style.display = 'flex';
            console.log('Setting display to flex');
        } else {
            devButtons.style.display = 'none';
            console.log('Setting display to none');
        }
        console.log('Current dev buttons display:', devButtons.style.display);
    });

    // Add click handlers for dev buttons
    const settingsButton = document.getElementById('settingsButton');
    const dataButton = document.getElementById('dataButton');

    console.log('Settings button element:', settingsButton);
    console.log('Data button element:', dataButton);

    settingsButton.addEventListener('click', () => {
        console.log('Settings button clicked');
        // TODO: Implement settings functionality
    });

    dataButton.addEventListener('click', () => {
        console.log('Data button clicked');
        // TODO: Implement data functionality
    });
}); 