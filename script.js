// Define memories data - 6 large cards
const memories = [
    {
        image: 'IMG_4496.jpeg',
        secondImage: 'chicago.jpeg', // Using chicago.jpeg as requested
        title: 'Your Strength',
        description: 'You always know how to make me laugh, even on the toughest days. Your sense of humor brightens every moment we spend together. I love how you can turn any situation into something we can smile about.<br><br>P.S. Thank you for always including me.'
    },
    {
        image: 'IMG_6009.jpeg',
        secondImage: 'brady.jpeg', // Using brady.jpeg as requested
        title: 'Your Humor',
        description: 'The way you face challenges head-on inspires me every day. Your determination and resilience make me proud to call you mine. I admire how you never back down when things get tough.<br><br>P.S. Shelf'
    },
    {
        image: 'IMG_8835.jpeg',
        secondImage: 'firstclass.jpeg', // Using firstclass.jpeg as requested
        title: 'Your Ambition',
        description: 'I admire how passionate you are about your goals. The way you work toward what you want with such dedication shows your incredible character. Your drive inspires me to pursue my own dreams.<br><br>P.S. Thank you for every adventure'
    },
    {
        image: 'IMG_9418.jpeg',
        secondImage: 'fun.jpeg', // Using fun.jpeg as requested
        title: 'Your Support',
        description: 'You believe in me even when I don\'t believe in myself. Your unwavering support gives me the confidence to pursue my dreams. Thank you for always being my biggest cheerleader and strongest advocate.<br><br>P.S. Thank you for teaching me how to do this.'
    },
    {
        image: 'IMG_9535.jpeg',
        secondImage: 'flowers.jpeg', // Using flowers.jpeg as requested
        title: 'Your Thoughtfulness',
        description: 'You always remember the little things that matter to me. The way you pay attention to details and go out of your way to make me feel special means more than I can express. Your thoughtful nature is truly special.<br><br>P.S. Your the most handsome man'
    },
    {
        image: 'IMG_8801.jpeg',
        secondImage: 'croatia.jpeg', // Using croatia.jpeg as requested
        title: 'Bond',
        description: 'You make me feel truly valued, cherished and loved. You are the most thoughtful, caring, and generous I have ever known. I never take it for granted, and I\'m thankful for you every single day.<br><br>P.S. I cannot wait to bring you on a first class vacation.'
    }
];

// Create flip cards
function createFlipCards() {
    const memoryGrid = document.querySelector('.memory-grid');
    memoryGrid.innerHTML = '';
    
    memories.forEach((memory, index) => {
        // Create the flip card element
        const flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        flipCard.dataset.index = index;
        
        // Create the inner structure
        const flipCardInner = document.createElement('div');
        flipCardInner.className = 'flip-card-inner';
        
        // Create the front of the card
        const flipCardFront = document.createElement('div');
        flipCardFront.className = 'flip-card-front';
        
        // Create single image element
        const img = document.createElement('img');
        img.src = memory.image;
        img.alt = memory.title;
        img.loading = 'lazy';
        
        flipCardFront.appendChild(img);
        
        // Create the back of the card
        const flipCardBack = document.createElement('div');
        flipCardBack.className = 'flip-card-back';
        
        // Add the title
        const title = document.createElement('h3');
        title.textContent = memory.title;
        flipCardBack.appendChild(title);
        
        // Add Kait's message
        const kaitMessage = document.createElement('div');
        kaitMessage.className = 'kait-message';
        
        const fromKait = document.createElement('h4');
        fromKait.textContent = 'From Kait:';
        kaitMessage.appendChild(fromKait);
        
        const messageText = document.createElement('p');
        messageText.innerHTML = memory.description;
        kaitMessage.appendChild(messageText);
        
        flipCardBack.appendChild(kaitMessage);
        
        // Add the button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        const addButton = document.createElement('button');
        addButton.className = 'add-response-btn';
        addButton.textContent = 'Favorite memory from this picture';
        addButton.style.display = 'none'; // Start hidden
        
        buttonContainer.appendChild(addButton);
        flipCardBack.appendChild(buttonContainer);
        
        // Add loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.textContent = 'Loading...';
        flipCardBack.appendChild(loadingIndicator);
        
        // Add response container (hidden initially)
        const responseContainer = document.createElement('div');
        responseContainer.className = 'anthony-response-container';
        responseContainer.style.display = 'none';
        flipCardBack.appendChild(responseContainer);
        
        // Add response form (hidden initially)
        const responseForm = document.createElement('div');
        responseForm.className = 'response-form';
        responseForm.style.display = 'none';
        
        const responsePrompt = document.createElement('h4');
        responsePrompt.textContent = 'Anthony, share your favorite memory from this picture:';
        responseForm.appendChild(responsePrompt);
        
        const textarea = document.createElement('textarea');
        textarea.className = 'response-textarea';
        textarea.placeholder = 'Write your favorite memory here...';
        responseForm.appendChild(textarea);
        
        const responseButtons = document.createElement('div');
        responseButtons.className = 'response-buttons';
        
        const saveButton = document.createElement('button');
        saveButton.className = 'save-response-btn';
        saveButton.textContent = 'Save';
        responseButtons.appendChild(saveButton);
        
        const cancelButton = document.createElement('button');
        cancelButton.className = 'cancel-response-btn';
        cancelButton.textContent = 'Cancel';
        responseButtons.appendChild(cancelButton);
        
        responseForm.appendChild(responseButtons);
        flipCardBack.appendChild(responseForm);
        
        // Assemble the card
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
        
        // Add to the grid
        memoryGrid.appendChild(flipCard);
        
        // Add click event to flip the card
        flipCard.addEventListener('click', function(e) {
            // Don't flip if clicking on buttons, textarea, etc.
            if (e.target.tagName === 'BUTTON' || 
                e.target.tagName === 'TEXTAREA' || 
                e.target.closest('.response-form') || 
                e.target.closest('.response-buttons')) {
                return;
            }
            
            // Close other cards
            document.querySelectorAll('.flip-card.flipped').forEach(card => {
                if (card !== this) {
                    card.classList.remove('flipped');
                }
            });
            
            // Check if we're flipping back to front
            const isCurrentlyFlipped = this.classList.contains('flipped');
            
            // Toggle this card
            this.classList.toggle('flipped');
            
            // If it was flipped and now it's not (meaning we're flipping back to front)
            if (isCurrentlyFlipped) {
                // Toggle the image when flipping back to front
                toggleFrontImage(this);
            }
        });
        
        // Set up button click events
        addButton.addEventListener('click', function(e) {
            e.stopPropagation();
            responseForm.style.display = 'block';
            addButton.style.display = 'none';
        });
        
        saveButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const responseText = textarea.value;
            
            if (responseText.trim() === '') {
                alert('Please enter a memory before saving.');
                return;
            }
            
            // Create response object with text and timestamp
            const responseData = {
                text: responseText,
                timestamp: new Date().toISOString()
            };
            
            // Save to Firebase
            memoriesRef.child(index.toString()).set(responseData)
                .then(() => {
                    // Update the displayed response
                    responseContainer.innerHTML = `
                        <h4>Anthony's Memory:</h4>
                        <p class="anthony-response">${responseText.replace(/\n/g, '<br>')}</p>
                        <p class="memory-timestamp">Added on ${formatDate(new Date())}</p>
                        <button class="edit-response-btn">Edit</button>
                    `;
                    
                    // Show the response and hide the form
                    responseContainer.style.display = 'block';
                    responseForm.style.display = 'none';
                    
                    // Set up edit button
                    const editButton = responseContainer.querySelector('.edit-response-btn');
                    editButton.addEventListener('click', function(e) {
                        e.stopPropagation();
                        textarea.value = responseText;
                        responseForm.style.display = 'block';
                        responseContainer.style.display = 'none';
                    });
                })
                .catch(error => {
                    console.error("Error saving response:", error);
                    alert("There was an error saving your memory. Please try again.");
                });
        });
        
        cancelButton.addEventListener('click', function(e) {
            e.stopPropagation();
            responseForm.style.display = 'none';
            
            // Check if there's a response in Firebase
            memoriesRef.child(index.toString()).once('value', (snapshot) => {
                const existingResponse = snapshot.val();
                
                if (existingResponse) {
                    // If there's a response, show the response container
                    responseContainer.style.display = 'block';
                } else {
                    // If no response, show the add button
                    addButton.style.display = 'inline-block';
                }
            });
        });
        
        // Load response from Firebase
        memoriesRef.child(index.toString()).once('value')
            .then((snapshot) => {
                const data = snapshot.val();
                loadingIndicator.style.display = 'none';
                
                if (data) {
                    // Handle both old format (string) and new format (object with text and timestamp)
                    const responseText = typeof data === 'string' ? data : data.text;
                    const timestamp = typeof data === 'string' ? null : data.timestamp;
                    
                    // If a response exists, show it
                    let timestampHtml = '';
                    if (timestamp) {
                        timestampHtml = `<p class="memory-timestamp">Added on ${formatDate(new Date(timestamp))}</p>`;
                    }
                    
                    responseContainer.innerHTML = `
                        <h4>Anthony's Memory:</h4>
                        <p class="anthony-response">${responseText.replace(/\n/g, '<br>')}</p>
                        ${timestampHtml}
                        <button class="edit-response-btn">Edit</button>
                    `;
                    responseContainer.style.display = 'block';
                    
                    // Set up edit button
                    const editButton = responseContainer.querySelector('.edit-response-btn');
                    editButton.addEventListener('click', function(e) {
                        e.stopPropagation();
                        textarea.value = responseText;
                        responseForm.style.display = 'block';
                        responseContainer.style.display = 'none';
                    });
                } else {
                    // If no response, show the add button
                    addButton.style.display = 'inline-block';
                }
            })
            .catch(error => {
                console.error("Error loading response:", error);
                loadingIndicator.style.display = 'none';
                addButton.style.display = 'inline-block';
            });
    });
}

// Function to toggle between the first and second image
function toggleFrontImage(card) {
    // Simple approach - just replace the image source
    const img = card.querySelector('.flip-card-front img');
    const index = parseInt(card.dataset.index);
    const memory = memories[index];
    
    console.log("Toggling image for card", index);
    console.log("Current src:", img.src);
    console.log("First image:", memory.image);
    console.log("Second image:", memory.secondImage);
    
    // If the current src is the first image, switch to second image
    if (img.src.includes(memory.image)) {
        console.log("Switching to second image");
        img.src = memory.secondImage;
    } else {
        console.log("Switching to first image");
        img.src = memory.image;
    }
}

// Format date in a nice readable format
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createFlipCards();
    
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