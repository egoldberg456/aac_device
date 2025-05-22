// Initialize the speech synthesis
const synth = window.speechSynthesis;

// Global variables for reorder mode
let isReorderMode = false;
let longPressTimer = null;
let draggedButton = null;

// Global variables for edit functionality
let currentEditingButton = null;
let dialogEditingButton = null;
let dialogNewImageData = null;

import { showStatsDialog, hideStatsDialog } from './stats_modal.js';

// Function to create drag preview
function createDragPreview(buttonElement) {
    const preview = document.createElement('div');
    preview.className = 'drag-preview';
    
    // Clone the button's content
    const img = buttonElement.querySelector('img').cloneNode(true);
    const text = buttonElement.querySelector('span').cloneNode(true);
    
    preview.appendChild(img);
    preview.appendChild(text);
    document.body.appendChild(preview);
    
    return preview;
}

// Function to update drag preview position
function updateDragPreviewPosition(preview, e) {
    const rect = preview.getBoundingClientRect();
    const x = e.clientX - rect.width / 2;
    const y = e.clientY - rect.height / 2;
    
    // Keep preview within viewport bounds
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;
    
    preview.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
    preview.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
}

// Function to create and add buttons to the grid
function createButtons() {
    const buttonGrid = document.getElementById('button-grid');
    buttonGrid.innerHTML = ''; // Clear existing buttons
    
    buttonConfig.buttons.forEach(button => {
        const buttonElement = document.createElement('button');
        buttonElement.className = 'aac-button';
        buttonElement.id = button.id;
        buttonElement.draggable = false;
        
        // Create edit chip
        const editChip = document.createElement('div');
        editChip.className = 'edit-chip';
        editChip.textContent = 'Edit';
        
        // Create image element
        const img = document.createElement('img');
        img.src = button.image;
        img.alt = button.text;
        
        // Create text element
        const text = document.createElement('span');
        text.textContent = button.text;
        
        // Add edit chip click handler
        editChip.addEventListener('click', (e) => {
            e.stopPropagation();
            // Show edit dialog (no-op)
        });
        
        // Add touch and mouse events for long press
        buttonElement.addEventListener('touchstart', (e) => {
            handleLongPress(buttonElement, button);
        });
        
        buttonElement.addEventListener('mousedown', (e) => {
            handleLongPress(buttonElement, button);
        });
        
        // Cancel long press on touch/mouse end
        buttonElement.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });
        
        buttonElement.addEventListener('mouseup', () => {
            clearTimeout(longPressTimer);
        });
        
        buttonElement.addEventListener('touchmove', () => {
            clearTimeout(longPressTimer);
        });
        
        buttonElement.addEventListener('mousemove', () => {
            clearTimeout(longPressTimer);
        });
        
        // Add click event for text-to-speech (only when not in reorder mode)
        buttonElement.addEventListener('click', (e) => {
            if (!isReorderMode) {
                if (document.getElementById('devModeToggle').checked) {
                    // In dev mode, show dialog with icon name and editing controls
                    showSimpleDialog(button.text, buttonElement, button);
                } else {
                    speakText(button.text);
                }
            }
        });
        
        // Drag and drop events
        buttonElement.addEventListener('dragstart', (e) => {
            if (isReorderMode) {
                draggedButton = buttonElement;
                buttonElement.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            }
        });
        
        buttonElement.addEventListener('dragend', () => {
            if (isReorderMode) {
                buttonElement.classList.remove('dragging');
                draggedButton = null;
                // Exit reorder mode after drag ends
                exitReorderMode();
            }
        });
        
        buttonElement.addEventListener('dragover', (e) => {
            if (isReorderMode && draggedButton !== buttonElement) {
                e.preventDefault();
                buttonElement.classList.add('drag-over');
            }
        });
        
        buttonElement.addEventListener('dragleave', () => {
            buttonElement.classList.remove('drag-over');
        });
        
        buttonElement.addEventListener('drop', (e) => {
            e.preventDefault();
            if (isReorderMode && draggedButton !== buttonElement) {
                const buttonGrid = document.getElementById('button-grid');
                const buttons = Array.from(buttonGrid.children);
                const draggedIndex = buttons.indexOf(draggedButton);
                const dropIndex = buttons.indexOf(buttonElement);
                
                if (draggedIndex < dropIndex) {
                    buttonElement.parentNode.insertBefore(draggedButton, buttonElement.nextSibling);
                } else {
                    buttonElement.parentNode.insertBefore(draggedButton, buttonElement);
                }
            }
            buttonElement.classList.remove('drag-over');
        });
        
        // Add elements to button
        buttonElement.appendChild(editChip);
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

// Function to handle long press
function handleLongPress(buttonElement, button) {
    if (!isReorderMode) {
        longPressTimer = setTimeout(() => {
            if (document.getElementById('devModeToggle').checked) {
                enterReorderMode();
            }
        }, 500); // 500ms for long press
    }
}

// Function to enter reorder mode
function enterReorderMode() {
    isReorderMode = true;
    const buttons = document.querySelectorAll('.aac-button');
    buttons.forEach(button => {
        button.classList.add('reorder-mode');
        button.draggable = true;
    });
}

// Function to exit reorder mode
function exitReorderMode() {
    isReorderMode = false;
    const buttons = document.querySelectorAll('.aac-button');
    buttons.forEach(button => {
        button.classList.remove('reorder-mode');
        button.draggable = false;
    });
    // Save the new button order
    saveButtonOrder();
}

// Function to save the new button order
function saveButtonOrder() {
    const buttonGrid = document.getElementById('button-grid');
    const newOrder = Array.from(buttonGrid.children).map(button => button.id);
    buttonConfig.buttons.sort((a, b) => {
        return newOrder.indexOf(a.id) - newOrder.indexOf(b.id);
    });
    console.log('New button order saved:', newOrder);
}

// Show simple dialog with icon name in dev mode
function showSimpleDialog(title, buttonElement, buttonConfigObj) {
    const dialog = document.getElementById('simpleDialog');
    const overlay = document.getElementById('simpleDialogOverlay');
    const titleElem = document.getElementById('simpleDialogTitle');
    const inputElem = document.getElementById('editTitleInput');
    titleElem.textContent = title;
    inputElem.value = title;
    dialogEditingButton = { buttonElement, buttonConfigObj };
    dialogNewImageData = null;
    dialog.classList.add('active');
    overlay.classList.add('active');
}

function hideSimpleDialog() {
    document.getElementById('simpleDialog').classList.remove('active');
    document.getElementById('simpleDialogOverlay').classList.remove('active');
    dialogEditingButton = null;
    dialogNewImageData = null;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    createImagesDirectory();
    createButtons();

    // Initialize developer mode toggle
    const devModeToggle = document.getElementById('devModeToggle');
    const devButtons = document.querySelector('.dev-buttons');
    const buttonGrid = document.getElementById('button-grid');

    devModeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            devButtons.style.display = 'flex';
            buttonGrid.classList.add('dev-mode');
        } else {
            devButtons.style.display = 'none';
            buttonGrid.classList.remove('dev-mode');
            // Exit reorder mode if active
            if (isReorderMode) {
                exitReorderMode();
            }
        }
    });

    // Stats dialog overlay click
    const statsOverlay = document.getElementById('statsDialogOverlay');
    statsOverlay.addEventListener('click', hideStatsDialog);

    // Add click handlers for dev buttons
    const settingsButton = document.getElementById('settingsButton');
    const dataButton = document.getElementById('dataButton');

    settingsButton.addEventListener('click', () => {
        console.log('Settings button clicked');
        // TODO: Implement settings functionality
    });

    dataButton.addEventListener('click', () => {
        if (document.getElementById('devModeToggle').checked) {
            showStatsDialog(buttonConfig);
        }
    });

    const overlay = document.getElementById('simpleDialogOverlay');
    overlay.addEventListener('click', hideSimpleDialog);

    // Dialog logic
    const form = document.getElementById('simpleDialogForm');
    const titleInput = document.getElementById('editTitleInput');
    const imageButton = document.getElementById('editImageButton');
    const imageInput = document.getElementById('editImageInput');

    imageButton.addEventListener('click', (e) => {
        e.preventDefault();
        imageInput.click();
    });
    imageInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    dialogNewImageData = ev.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (dialogEditingButton) {
            const newTitle = titleInput.value.trim();
            if (newTitle) {
                // Update config
                dialogEditingButton.buttonConfigObj.text = newTitle;
                // Update UI
                const textElem = dialogEditingButton.buttonElement.querySelector('span');
                textElem.textContent = newTitle;
                // Update dialog title if open
                document.getElementById('simpleDialogTitle').textContent = newTitle;
            }
            if (dialogNewImageData) {
                dialogEditingButton.buttonConfigObj.image = dialogNewImageData;
                const imgElem = dialogEditingButton.buttonElement.querySelector('img');
                imgElem.src = dialogNewImageData;
            }
            hideSimpleDialog();
        }
    });
}); 