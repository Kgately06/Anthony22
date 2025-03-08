// Define memories data - 6 large cards
const memories = [
    {
        image: 'IMG_4496.jpeg',
        secondMedia: 'Anthonyvideo1.mp4', // Using the correct video filename with extension
        isSecondMediaVideo: true, // Set to true since it's a video
        title: 'Your Strength',
        description: 'You always know how to make me laugh, even on the toughest days. Your sense of humor brightens every moment we spend together. I love how you can turn any situation into something we can smile about.<br><br>P.S. Thank you for always including me.'
    },
    {
        image: 'IMG_6009.jpeg',
        secondMedia: 'IMG_6009.jpeg', // Replace with your second image or video
        isSecondMediaVideo: false, // Set to true if secondMedia is a video
        title: 'Your Humor',
        description: 'The way you face challenges head-on inspires me every day. Your determination and resilience make me proud to call you mine. I admire how you never back down when things get tough.<br><br>P.S. Shelf'
    },
    {
        image: 'IMG_8835.jpeg',
        secondMedia: 'IMG_8835.jpeg', // Replace with your second image or video
        isSecondMediaVideo: true, // Set to true if secondMedia is a video
        title: 'Your Ambition',
        description: 'I admire how passionate you are about your goals. The way you work toward what you want with such dedication shows your incredible character. Your drive inspires me to pursue my own dreams.<br><br>P.S. Thank you for every adventure'
    },
    {
        image: 'IMG_9418.jpeg',
        secondMedia: 'IMG_9418.jpeg', // Replace with your second image or video
        isSecondMediaVideo: false, // Set to true if secondMedia is a video
        title: 'Your Support',
        description: 'You believe in me even when I don\'t believe in myself. Your unwavering support gives me the confidence to pursue my dreams. Thank you for always being my biggest cheerleader and strongest advocate.<br><br>P.S. Thank you for teaching me how to do this.'
    },
    {
        image: 'IMG_9535.jpeg',
        secondMedia: 'IMG_9535.jpeg', // Replace with your second image or video
        isSecondMediaVideo: true, // Set to true if secondMedia is a video
        title: 'Your Thoughtfulness',
        description: 'You always remember the little things that matter to me. The way you pay attention to details and go out of your way to make me feel special means more than I can express. Your thoughtful nature is truly special.<br><br>P.S. Your the most handsome man'
    },
    {
        image: 'IMG_8801.jpeg',
        secondMedia: 'IMG_8801.jpeg', // Replace with your second image or video
        isSecondMediaVideo: true, // Set to true if secondMedia is a video
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
        flipCard.dataset.flipped = 'false';
        flipCard.dataset.imageToggled = 'false';
        
        // Create second media element based on type
        let secondMediaHtml = '';
        if (memory.isSecondMediaVideo) {
            secondMediaHtml = `
                <div class="second-media video-container hidden">
                    <video class="memory-video" playsinline controls>
                        <source src="${memory.secondMedia}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="video-play-overlay">
                        <i class="fas fa-play-circle"></i>
                    </div>
                </div>
            `;
        } else {
            secondMediaHtml = `<img src="${memory.secondMedia}" alt="${memory.title}" loading="lazy" class="second-media hidden">`;
        }
        
        // Set initial card structure
        flipCard.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front flip-trigger">
                    <img src="${memory.image}" alt="${memory.title}" loading="lazy" class="first-image">
                    ${secondMediaHtml}
                </div>
                <div class="flip-card-back">
                    <h3 class="flip-trigger">${memory.title}</h3>
                    <div class="kait-message flip-trigger">
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
        
        // Add flipping functionality to the entire card (both front and back)
        flipCard.querySelector('.flip-card-front').addEventListener('click', function(e) {
            // Don't flip if clicking on video controls
            if (e.target.closest('.video-container') && 
                (e.target.tagName === 'VIDEO' || e.target.closest('.video-play-overlay'))) {
                e.stopPropagation();
                
                // Handle video play
                const videoContainer = e.target.closest('.video-container');
                if (videoContainer) {
                    const video = videoContainer.querySelector('video');
                    const overlay = videoContainer.querySelector('.video-play-overlay');
                    
                    if (video && overlay) {
                        overlay.style.display = 'none';
                        video.play();
                        e.preventDefault();
                        return;
                    }
                }
                return;
            }
            
            const card = this.closest('.flip-card');
            
            // Remove flipped class from all other cards
            document.querySelectorAll('.flip-card.flipped').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('flipped');
                    otherCard.dataset.flipped = 'false';
                }
            });
            
            // Toggle this card
            card.classList.toggle('flipped');
            card.dataset.flipped = card.classList.contains('flipped') ? 'true' : 'false';
            e.stopPropagation();
        });
        
        // Make card background area also clickable for flipping
        flipCard.querySelector('.flip-card-back').addEventListener('click', function(e) {
            // Don't flip if clicking on buttons, textarea, or interactive elements
            if (e.target.tagName === 'BUTTON' || 
                e.target.tagName === 'TEXTAREA' || 
                e.target.closest('.response-form') || 
                e.target.closest('.response-buttons') || 
                e.target.closest('.anthony-response-container') || 
                (e.target.classList.contains('add-response-btn'))) {
                return;
            }
            
            // If clicking on background or non-interactive elements, flip the card
            const card = this.closest('.flip-card');
            
            // Remove flipped class from all other cards
            document.querySelectorAll('.flip-card.flipped').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('flipped');
                    otherCard.dataset.flipped = 'false';
                }
            });
            
            // Toggle this card
            card.classList.toggle('flipped');
            card.dataset.flipped = card.classList.contains('flipped') ? 'true' : 'false';
            
            // If we're flipping back to the front, toggle the image/video
            if (!card.classList.contains('flipped')) {
                toggleFrontMedia(card, memory.isSecondMediaVideo);
            }
        });
        
        memoryGrid.appendChild(flipCard);
        
        // Load the response from Firebase
        loadResponse(index, flipCard);
    });
    
    // Set up event listeners for response buttons on all cards
    setupResponseEventListeners();
    
    // Add specific click handlers for the message areas with visual indicators
    document.querySelectorAll('.kait-message.flip-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            // If we're clicking directly on the message (not a child element that needs special handling)
            if (e.target === this || e.target.tagName === 'P' || e.target.tagName === 'H4') {
                const flipCard = this.closest('.flip-card');
                const index = parseInt(flipCard.dataset.index);
                
                // Remove flipped class from all other cards
                document.querySelectorAll('.flip-card.flipped').forEach(otherCard => {
                    if (otherCard !== flipCard) {
                        otherCard.classList.remove('flipped');
                        otherCard.dataset.flipped = 'false';
                    }
                });
                
                // Toggle this card
                flipCard.classList.toggle('flipped');
                flipCard.dataset.flipped = flipCard.classList.contains('flipped') ? 'true' : 'false';
                
                // If we're flipping back to the front, toggle the image/video
                if (!flipCard.classList.contains('flipped')) {
                    toggleFrontMedia(flipCard, memories[index].isSecondMediaVideo);
                }
                
                e.stopPropagation();
            }
        });
    });
    
    // Add handlers for card titles
    document.querySelectorAll('h3.flip-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            const flipCard = this.closest('.flip-card');
            const index = parseInt(flipCard.dataset.index);
            
            // Remove flipped class from all other cards
            document.querySelectorAll('.flip-card.flipped').forEach(otherCard => {
                if (otherCard !== flipCard) {
                    otherCard.classList.remove('flipped');
                    otherCard.dataset.flipped = 'false';
                }
            });
            
            // Toggle this card
            flipCard.classList.toggle('flipped');
            flipCard.dataset.flipped = flipCard.classList.contains('flipped') ? 'true' : 'false';
            
            // If we're flipping back to the front, toggle the image/video
            if (!flipCard.classList.contains('flipped')) {
                toggleFrontMedia(flipCard, memories[index].isSecondMediaVideo);
            }
            
            e.stopPropagation();
        });
    });
    
    // Add event listeners for video play overlays
    document.querySelectorAll('.video-play-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            const video = this.parentNode.querySelector('video');
            if (video) {
                this.style.display = 'none';
                video.play();
                e.stopPropagation();
            }
        });
    });
    
    // Add event listeners for videos
    document.querySelectorAll('.memory-video').forEach(video => {
        // Show overlay when video ends
        video.addEventListener('ended', function() {
            const overlay = this.parentNode.querySelector('.video-play-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
        });
        
        // Show overlay when video is paused
        video.addEventListener('pause', function() {
            const overlay = this.parentNode.querySelector('.video-play-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
        });
        
        // Hide overlay when video plays
        video.addEventListener('play', function() {
            const overlay = this.parentNode.querySelector('.video-play-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
    });
}

// Function to toggle between the first image and second media (image or video)
function toggleFrontMedia(card, isVideo) {
    const firstImage = card.querySelector('.first-image');
    const secondMedia = isVideo ? 
        card.querySelector('.second-media.video-container') : 
        card.querySelector('.second-media');
    
    if (!secondMedia) return;
    
    // Always toggle to the second media when flipping back
    firstImage.classList.add('hidden');
    secondMedia.classList.remove('hidden');
    card.dataset.imageToggled = 'true';
    
    // If it's a video, play it automatically
    if (isVideo) {
        const video = secondMedia.querySelector('video');
        const overlay = secondMedia.querySelector('.video-play-overlay');
        
        if (video) {
            // Reset the video to the beginning
            video.currentTime = 0;
            
            // Show the play overlay initially
            if (overlay) {
                overlay.style.display = 'flex';
            }
        }
    }
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
            const data = snapshot.val();
            
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');
            
            if (data) {
                // Handle both old format (string) and new format (object with text and timestamp)
                const responseText = typeof data === 'string' ? data : data.text;
                const timestamp = typeof data === 'string' ? null : data.timestamp;
                
                // If a response exists, show it
                const responseContainer = flipCard.querySelector('.anthony-response-container');
                
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

// Format date in a nice readable format
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
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
                    const data = snapshot.val();
                    // Handle both old format (string) and new format (object with text and timestamp)
                    const existingResponse = typeof data === 'string' ? data : (data ? data.text : '');
                    
                    textarea.value = existingResponse;
                    
                    // Show the form and hide the response container
                    responseForm.classList.remove('hidden');
                    responseContainer.classList.add('hidden');
                });
            }
            
            // Save button clicked
            if (e.target.classList.contains('save-response-btn')) {
                const responseText = textarea.value;
                
                // Create response object with text and timestamp
                const responseData = {
                    text: responseText,
                    timestamp: new Date().toISOString()
                };
                
                // Save to Firebase
                memoriesRef.child(index).set(responseData)
                    .then(() => {
                        // Update the displayed response
                        responseContainer.innerHTML = `
                            <h4>Anthony's Memory:</h4>
                            <p class="anthony-response">${responseText.replace(/\n/g, '<br>')}</p>
                            <p class="memory-timestamp">Added on ${formatDate(new Date())}</p>
                            <button class="edit-response-btn">Edit</button>
                        `;
                        
                        // Show the response and hide the form
                        responseContainer.classList.remove('hidden');
                        responseForm.classList.add('hidden');
                    })
                    .catch(error => {
                        console.error("Error saving response:", error);
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
    
    // Check if all cards have memories
    checkAllMemoriesComplete();
    
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

// Check if all cards have memories and show special message
function checkAllMemoriesComplete() {
    let allCardsCount = memories.length;
    let completedCount = 0;
    
    // Create promise array to check all memory entries
    const promises = [];
    
    for (let i = 0; i < allCardsCount; i++) {
        promises.push(
            new Promise((resolve) => {
                memoriesRef.child(i.toString()).once('value', (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        completedCount++;
                    }
                    resolve();
                });
            })
        );
    }
    
    // When all checks are complete
    Promise.all(promises).then(() => {
        if (completedCount === allCardsCount && !document.querySelector('.love-letter')) {
            showLoveLetter();
        } else if (completedCount > 0) {
            // Show progress
            const progressContainer = document.createElement('div');
            progressContainer.className = 'memory-progress';
            progressContainer.innerHTML = `
                <p>${completedCount} of ${allCardsCount} memories shared</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(completedCount/allCardsCount) * 100}%"></div>
                </div>
            `;
            
            // Insert after music player
            const musicPlayer = document.querySelector('.music-player-container');
            if (musicPlayer && !document.querySelector('.memory-progress')) {
                musicPlayer.parentNode.insertBefore(progressContainer, musicPlayer.nextSibling);
            }
        }
    });
}

// Show special love letter when all memories are complete
function showLoveLetter() {
    const loveLetter = document.createElement('div');
    loveLetter.className = 'love-letter';
    
    loveLetter.innerHTML = `
        <div class="love-letter-inner">
            <h3>A Special Note</h3>
            <p>Dear Anthony,</p>
            <p>Now that you've shared your memories on all of these special moments, I wanted to tell you how much it means to me that we've created these memories together.</p>
            <p>Every picture, every moment we've shared has been a treasure to me. Thank you for being the amazing person you are and for making my life so much brighter.</p>
            <p>I can't wait to create countless more memories with you.</p>
            <p class="love-signature">With all my love,<br>Kait</p>
        </div>
    `;
    
    // Insert before memory grid
    const memoryGrid = document.querySelector('.memory-grid');
    memoryGrid.parentNode.insertBefore(loveLetter, memoryGrid);
    
    // Add animation class after a short delay
    setTimeout(() => {
        loveLetter.classList.add('revealed');
        
        // Create confetti celebration
        createConfetti();
    }, 500);
}

// Create confetti celebration effect
function createConfetti() {
    const confettiCount = 100;
    const container = document.querySelector('body');
    
    // Remove any existing confetti
    const existingConfetti = document.querySelectorAll('.confetti');
    existingConfetti.forEach(c => c.remove());
    
    // Create new confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random position, size, and animation duration
        const left = Math.random() * 100;
        const width = Math.random() * 10 + 5;
        const height = Math.random() * 10 + 5;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        confetti.style.left = `${left}vw`;
        confetti.style.width = `${width}px`;
        confetti.style.height = `${height}px`;
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.animationDelay = `${delay}s`;
        
        container.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

// Add event listener to save buttons to check completion
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('save-response-btn')) {
        // Wait a bit for the save to complete
        setTimeout(() => {
            checkAllMemoriesComplete();
        }, 1000);
    }
}); 