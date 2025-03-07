// Initialize Firebase with a public test database
// This is a read/write public database just for this application
// In a real production app, you would use proper authentication
const firebaseConfig = {
    apiKey: "AIzaSyBr5X9yDFnuqJ4UYJPx-jnS8N1PrKgGPOY",
    authDomain: "anthonykait-memories.firebaseapp.com",
    databaseURL: "https://anthonykait-memories-default-rtdb.firebaseio.com",
    projectId: "anthonykait-memories",
    storageBucket: "anthonykait-memories.appspot.com",
    messagingSenderId: "107508133764",
    appId: "1:107508133764:web:d61c0a95e22ab79fe4f8d7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const memoriesRef = database.ref('memories');

// Define memories data - 6 large cards
const memories = [
    {
        image: 'IMG_4496.jpeg',
        title: 'Your Strength',
        description: 'You always know how to make me laugh, even on the toughest days. Your sense of humor brightens every moment we spend together. I love how you can turn any situation into something we can smile about.<br><br>P.S. Thank you for always including me.'
    },
    {
        image: 'IMG_6009.jpeg',
        title: 'Your Humor',
        description: 'The way you face challenges head-on inspires me every day. Your determination and resilience make me proud to call you mine. I admire how you never back down when things get tough.<br><br>P.S. Shelf'
    },
    {
        image: 'IMG_8835.jpeg',
        title: 'Your Ambition',
        description: 'I admire how passionate you are about your goals. The way you work toward what you want with such dedication shows your incredible character. Your drive inspires me to pursue my own dreams.<br><br>P.S. Thank you for every adventure'
    },
    {
        image: 'IMG_9418.jpeg',
        title: 'Your Support',
        description: 'You believe in me even when I don\'t believe in myself. Your unwavering support gives me the confidence to pursue my dreams. Thank you for always being my biggest cheerleader and strongest advocate.<br><br>P.S. Thank you for teaching me how to do this.'
    },
    {
        image: 'IMG_9535.jpeg',
        title: 'Your Thoughtfulness',
        description: 'You always remember the little things that matter to me. The way you pay attention to details and go out of your way to make me feel special means more than I can express. Your thoughtful nature is truly special.<br><br>P.S. Your the most handsome man'
    },
    {
        image: 'IMG_8801.jpeg',
        title: 'Bond',
        description: 'You make me feel truly valued, cherished and loved. You are the most thoughtful, caring, and generous I have ever known. I never take it for granted, and I\'m thankful for you every single day.<br><br>P.S. I cannot wait to bring you on a first class vacation.'
    }
];

// Create flip cards
function createFlipCards() {
    const memoryGrid = document.querySelector('.memory-grid');
    memoryGrid.innerHTML = '';
    
    // First load any responses from Firebase
    memoriesRef.once('value')
        .then((snapshot) => {
            const savedResponses = snapshot.val() || {};
            
            // Now create the cards with the responses from Firebase
            memories.forEach((memory, index) => {
                // Load Anthony's response from Firebase if it exists
                const anthonyResponse = savedResponses[index] || '';
                const showingResponseForm = false; // Form starts hidden
                
                const flipCard = document.createElement('div');
                flipCard.className = 'flip-card';
                flipCard.dataset.index = index;
                
                const responseHtml = anthonyResponse ? 
                    `<div class="anthony-response-container">
                        <h4>Anthony's Memory:</h4>
                        <p class="anthony-response">${anthonyResponse.replace(/\n/g, '<br>')}</p>
                        <button class="edit-response-btn">Edit</button>
                    </div>` : '';
                
                const responseForm = `
                    <div class="response-form ${showingResponseForm ? '' : 'hidden'}">
                        <h4>Anthony, share your favorite memory from this picture:</h4>
                        <textarea class="response-textarea" placeholder="Write your favorite memory here...">${anthonyResponse}</textarea>
                        <div class="response-buttons">
                            <button class="save-response-btn">Save</button>
                            <button class="cancel-response-btn">Cancel</button>
                        </div>
                    </div>
                `;
                
                flipCard.innerHTML = `
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src="${memory.image}" alt="${memory.title}" loading="lazy">
                        </div>
                        <div class="flip-card-back">
                            <h3>${memory.title}</h3>
                            <div class="kait-message">
                                <h4>From Kait:</h4>
                                <p>${memory.description}</p>
                            </div>
                            ${!showingResponseForm && !anthonyResponse ? 
                                `<button class="add-response-btn">Favorite memory from this picture</button>` : ''}
                            ${!showingResponseForm && anthonyResponse ? responseHtml : ''}
                            ${responseForm}
                        </div>
                    </div>
                `;
                
                // Simpler event handling for better compatibility
                flipCard.addEventListener('click', function(e) {
                    // Don't flip if clicking on buttons or textarea
                    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'TEXTAREA') {
                        e.stopPropagation();
                        return;
                    }
                    
                    // Remove flipped class from all other cards
                    document.querySelectorAll('.flip-card.flipped').forEach(card => {
                        if (card !== this) {
                            card.classList.remove('flipped');
                        }
                    });
                    // Toggle this card
                    this.classList.toggle('flipped');
                });
                
                // Add event listeners for the response buttons
                flipCard.querySelector('.flip-card-back').addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent the card from flipping when clicking buttons
                    
                    const cardIndex = flipCard.dataset.index;
                    
                    if (e.target.classList.contains('add-response-btn')) {
                        flipCard.querySelector('.response-form').classList.remove('hidden');
                        e.target.classList.add('hidden');
                    }
                    
                    if (e.target.classList.contains('edit-response-btn')) {
                        flipCard.querySelector('.response-form').classList.remove('hidden');
                        flipCard.querySelector('.anthony-response-container').classList.add('hidden');
                    }
                    
                    if (e.target.classList.contains('save-response-btn')) {
                        const responseText = flipCard.querySelector('.response-textarea').value;
                        
                        // Save to Firebase
                        updateStatus('syncing', 'Saving memory...');
                        
                        memoriesRef.child(cardIndex).set(responseText)
                            .then(() => {
                                // Update the displayed response
                                if (flipCard.querySelector('.anthony-response-container')) {
                                    flipCard.querySelector('.anthony-response-container').remove();
                                }
                                
                                // Create new response container
                                const responseContainer = document.createElement('div');
                                responseContainer.className = 'anthony-response-container';
                                responseContainer.innerHTML = `
                                    <h4>Anthony's Memory:</h4>
                                    <p class="anthony-response">${responseText.replace(/\n/g, '<br>')}</p>
                                    <button class="edit-response-btn">Edit</button>
                                `;
                                
                                // Insert before response form
                                const responseForm = flipCard.querySelector('.response-form');
                                responseForm.parentNode.insertBefore(responseContainer, responseForm);
                                
                                // Hide the form
                                responseForm.classList.add('hidden');
                                
                                // Show success notification
                                showToast('Memory saved and shared with Kait!');
                                updateStatus('connected', 'Connected and sharing memories');
                            })
                            .catch(error => {
                                console.error("Error saving response:", error);
                                showToast('Error saving memory. Please try again.');
                                updateStatus('error', 'Connection error. Please refresh the page.');
                            });
                    }
                    
                    if (e.target.classList.contains('cancel-response-btn')) {
                        flipCard.querySelector('.response-form').classList.add('hidden');
                        
                        // Show the add button if there's no response yet
                        const anthonyResponse = savedResponses[cardIndex];
                        if (!anthonyResponse) {
                            const addButton = flipCard.querySelector('.add-response-btn');
                            if (addButton) {
                                addButton.classList.remove('hidden');
                            } else {
                                // Create the add button if it doesn't exist
                                const addButton = document.createElement('button');
                                addButton.className = 'add-response-btn';
                                addButton.textContent = 'Favorite memory from this picture';
                                flipCard.querySelector('.flip-card-back').appendChild(addButton);
                            }
                        } else {
                            // Show the existing response
                            if (flipCard.querySelector('.anthony-response-container')) {
                                flipCard.querySelector('.anthony-response-container').classList.remove('hidden');
                            }
                        }
                    }
                });
                
                memoryGrid.appendChild(flipCard);
            });
        })
        .catch(error => {
            console.error("Error loading memories:", error);
            updateStatus('error', 'Connection error. Please refresh the page.');
        });
}

// Function to show toast notification
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast-notification');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Function to update status message
function updateStatus(status, message) {
    const statusElement = document.getElementById('status-message');
    statusElement.textContent = message;
    
    // Remove all classes and add the new one
    statusElement.className = '';
    if (status !== 'connected') {
        statusElement.classList.add(status);
    }
}

// Listen for changes to the database to keep in sync
function setupRealtimeUpdates() {
    memoriesRef.on('value', (snapshot) => {
        const savedResponses = snapshot.val() || {};
        
        // Update any visible cards with new data
        Object.keys(savedResponses).forEach(index => {
            const card = document.querySelector(`.flip-card[data-index="${index}"]`);
            if (card) {
                const responseContainer = card.querySelector('.anthony-response-container');
                if (responseContainer) {
                    // Update existing response container
                    const responseParagraph = responseContainer.querySelector('.anthony-response');
                    if (responseParagraph) {
                        responseParagraph.innerHTML = savedResponses[index].replace(/\n/g, '<br>');
                    }
                } else {
                    // Create new response container if it doesn't exist and there's data
                    const responseText = savedResponses[index];
                    if (responseText) {
                        // Remove add button if it exists
                        const addButton = card.querySelector('.add-response-btn');
                        if (addButton) {
                            addButton.remove();
                        }
                        
                        // Create new response container
                        const newResponseContainer = document.createElement('div');
                        newResponseContainer.className = 'anthony-response-container';
                        newResponseContainer.innerHTML = `
                            <h4>Anthony's Memory:</h4>
                            <p class="anthony-response">${responseText.replace(/\n/g, '<br>')}</p>
                            <button class="edit-response-btn">Edit</button>
                        `;
                        
                        // Find where to insert it
                        const responseForm = card.querySelector('.response-form');
                        responseForm.parentNode.insertBefore(newResponseContainer, responseForm);
                    }
                }
                
                // Also update textarea content in case it's being edited
                const textarea = card.querySelector('.response-textarea');
                if (textarea) {
                    textarea.value = savedResponses[index] || '';
                }
            }
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createFlipCards();
    setupRealtimeUpdates();
    
    // Make sure no cards start flipped
    document.querySelectorAll('.flip-card').forEach(card => {
        card.classList.remove('flipped');
    });
    
    // Check the connection to Firebase
    const connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
            updateStatus('connected', 'Connected and sharing memories');
        } else {
            updateStatus('error', 'Waiting for connection...');
        }
    });
    
    // Fix for iOS Safari 100vh issue
    function fixHeight() {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
    
    // Run on page load
    fixHeight();
    
    // Run on resize
    window.addEventListener('resize', fixHeight);
    window.addEventListener('orientationchange', fixHeight);
}); 