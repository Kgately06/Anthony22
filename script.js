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
    
    memories.forEach((memory, index) => {
        const flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        flipCard.dataset.index = index;
        
        // Set initial card structure
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
                    <div class="loading-indicator">Loading...</div>
                    <button class="add-response-btn hidden">Favorite memory from this picture</button>
                    <div class="anthony-response-container hidden"></div>
                    <div class="response-form hidden">
                        <h4>Anthony, share your favorite memory from this picture:</h4>
                        <textarea class="response-textarea" placeholder="Write your favorite memory here..."></textarea>
                        <div class="response-buttons">
                            <button class="save-response-btn">Save</button>
                            <button class="cancel-response-btn">Cancel</button>
                        </div>
                    </div>
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
        
        memoryGrid.appendChild(flipCard);
        
        // Load the response from Firebase
        loadResponse(index, flipCard);
    });
    
    // Set up event listeners for response buttons on all cards
    setupResponseEventListeners();
}

// Load response from Firebase
function loadResponse(index, flipCard) {
    const loadingIndicator = flipCard.querySelector('.loading-indicator');
    const addButton = flipCard.querySelector('.add-response-btn');
    
    // Set a timeout to handle potential Firebase connection issues
    const loadingTimeout = setTimeout(() => {
        console.log("Firebase load timeout - showing add button");
        loadingIndicator.classList.add('hidden');
        addButton.classList.remove('hidden');
    }, 5000); // 5 second timeout
    
    memoriesRef.child(index.toString()).once('value')
        .then((snapshot) => {
            clearTimeout(loadingTimeout);
            const anthonyResponse = snapshot.val();
            
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');
            
            if (anthonyResponse) {
                // If a response exists, show it
                const responseContainer = flipCard.querySelector('.anthony-response-container');
                responseContainer.innerHTML = `
                    <h4>Anthony's Memory:</h4>
                    <p class="anthony-response">${anthonyResponse.replace(/\n/g, '<br>')}</p>
                    <button class="edit-response-btn">Edit</button>
                `;
                responseContainer.classList.remove('hidden');
            } else {
                // If no response, show the add button
                addButton.classList.remove('hidden');
            }
        })
        .catch(error => {
            clearTimeout(loadingTimeout);
            console.error("Error loading response:", error);
            
            // Hide loading indicator and show add button on error
            loadingIndicator.classList.add('hidden');
            addButton.classList.remove('hidden');
        });
}

// Set up event listeners for all response buttons
function setupResponseEventListeners() {
    document.querySelectorAll('.flip-card-back').forEach(cardBack => {
        cardBack.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the card from flipping when clicking buttons
            
            const flipCard = this.closest('.flip-card');
            const index = flipCard.dataset.index;
            const responseForm = flipCard.querySelector('.response-form');
            const responseContainer = flipCard.querySelector('.anthony-response-container');
            const addButton = flipCard.querySelector('.add-response-btn');
            const textarea = flipCard.querySelector('.response-textarea');
            
            // Add button clicked
            if (e.target.classList.contains('add-response-btn')) {
                // Get existing response from Firebase to populate textarea
                memoriesRef.child(index).once('value', (snapshot) => {
                    const existingResponse = snapshot.val() || '';
                    textarea.value = existingResponse;
                    
                    // Show the form and hide the add button
                    responseForm.classList.remove('hidden');
                    addButton.classList.add('hidden');
                });
            }
            
            // Edit button clicked
            if (e.target.classList.contains('edit-response-btn')) {
                // Get existing response from Firebase to populate textarea
                memoriesRef.child(index).once('value', (snapshot) => {
                    const existingResponse = snapshot.val() || '';
                    textarea.value = existingResponse;
                    
                    // Show the form and hide the response container
                    responseForm.classList.remove('hidden');
                    responseContainer.classList.add('hidden');
                });
            }
            
            // Save button clicked
            if (e.target.classList.contains('save-response-btn')) {
                const responseText = textarea.value;
                
                // Save to Firebase
                memoriesRef.child(index).set(responseText)
                    .then(() => {
                        // Update the displayed response
                        responseContainer.innerHTML = `
                            <h4>Anthony's Memory:</h4>
                            <p class="anthony-response">${responseText.replace(/\n/g, '<br>')}</p>
                            <button class="edit-response-btn">Edit</button>
                        `;
                        
                        // Show the response and hide the form
                        responseContainer.classList.remove('hidden');
                        responseForm.classList.add('hidden');
                    })
                    .catch(error => {
                        console.error("Error saving response: ", error);
                        alert("There was an error saving your memory. Please try again.");
                    });
            }
            
            // Cancel button clicked
            if (e.target.classList.contains('cancel-response-btn')) {
                // Hide the form
                responseForm.classList.add('hidden');
                
                // Check if there's a response in Firebase
                memoriesRef.child(index).once('value', (snapshot) => {
                    const existingResponse = snapshot.val();
                    
                    if (existingResponse) {
                        // If there's a response, show the response container
                        responseContainer.classList.remove('hidden');
                    } else {
                        // If no response, show the add button
                        addButton.classList.remove('hidden');
                    }
                });
            }
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createFlipCards();
    
    // Make sure no cards start flipped
    document.querySelectorAll('.flip-card').forEach(card => {
        card.classList.remove('flipped');
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