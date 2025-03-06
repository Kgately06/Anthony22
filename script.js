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
    
    memories.forEach(memory => {
        const flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        
        flipCard.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${memory.image}" alt="${memory.title}">
                </div>
                <div class="flip-card-back">
                    <h3>${memory.title}</h3>
                    <p>${memory.description}</p>
                </div>
            </div>
        `;
        
        flipCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        memoryGrid.appendChild(flipCard);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createFlipCards();
}); 