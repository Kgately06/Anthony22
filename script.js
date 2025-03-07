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
        // Load Anthony's response from localStorage if it exists
        const anthonyResponse = localStorage.getItem(`anthony-response-${index}`) || '';
        const showingResponse = localStorage.getItem(`showing-response-${index}`) === 'true';
        
        const flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        
        const responseHtml = anthonyResponse ? 
            `<div class="anthony-response-container">
                <h4>Anthony's Memory:</h4>
                <p class="anthony-response">${anthonyResponse.replace(/\n/g, '<br>')}</p>
                <button class="edit-response-btn">Edit</button>
            </div>` : '';
        
        const responseForm = `
            <div class="response-form ${showingResponse ? '' : 'hidden'}">
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
                    ${!showingResponse && !anthonyResponse ? 
                        `<button class="add-response-btn">Favorite memory from this picture</button>` : ''}
                    ${!showingResponse && anthonyResponse ? responseHtml : ''}
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
            
            if (e.target.classList.contains('add-response-btn')) {
                flipCard.querySelector('.response-form').classList.remove('hidden');
                e.target.classList.add('hidden');
                localStorage.setItem(`showing-response-${index}`, 'true');
            }
            
            if (e.target.classList.contains('edit-response-btn')) {
                flipCard.querySelector('.response-form').classList.remove('hidden');
                flipCard.querySelector('.anthony-response-container').classList.add('hidden');
                localStorage.setItem(`showing-response-${index}`, 'true');
            }
            
            if (e.target.classList.contains('save-response-btn')) {
                const responseText = flipCard.querySelector('.response-textarea').value;
                localStorage.setItem(`anthony-response-${index}`, responseText);
                
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
                localStorage.setItem(`showing-response-${index}`, 'false');
            }
            
            if (e.target.classList.contains('cancel-response-btn')) {
                flipCard.querySelector('.response-form').classList.add('hidden');
                
                // Show the add button if there's no response yet
                const anthonyResponse = localStorage.getItem(`anthony-response-${index}`);
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
                
                localStorage.setItem(`showing-response-${index}`, 'false');
            }
        });
        
        memoryGrid.appendChild(flipCard);
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