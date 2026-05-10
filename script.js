const pageConfig = {
    pageTitle: 'Memory Moments',
    headerTitle: 'Memory Moments',
    subtitle: 'Click each card to reveal the memory and message',
    footerText: 'Made with love',
    globalSong: '',
    memories: [
        {
            image: 'https://picsum.photos/900/1200?random=101',
            title: 'First Milestone',
            description: 'Replace this text with your own memory.',
            song: ''
        },
        {
            image: 'https://picsum.photos/900/1200?random=102',
            title: 'Favorite Day',
            description: 'You can add line breaks with <br> in descriptions.',
            song: ''
        },
        {
            image: 'https://picsum.photos/900/1200?random=103',
            title: 'Special Trip',
            description: 'Use local files like IMG_0001.jpeg or full URLs.',
            song: ''
        },
        {
            image: 'https://picsum.photos/900/1200?random=104',
            title: 'Shared Lesson',
            description: 'Optional: add a per-card song with the song field.',
            song: ''
        },
        {
            image: 'https://picsum.photos/900/1200?random=105',
            title: 'Future Goal',
            description: 'If card song is empty, globalSong is used instead.',
            song: ''
        },
        {
            image: 'https://picsum.photos/900/1200?random=106',
            title: 'Celebration',
            description: 'Add or remove objects in this list to change cards.',
            song: ''
        }
    ]
};

let activeAudio = null;

function applyPageText() {
    document.title = pageConfig.pageTitle;
    document.getElementById('main-title').textContent = pageConfig.headerTitle;
    document.getElementById('subtitle').textContent = pageConfig.subtitle;
    document.getElementById('footer-text').textContent = pageConfig.footerText;
}

function stopAudio() {
    if (!activeAudio) {
        return;
    }
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
}

function playAudioForMemory(memory) {
    const song = (memory.song || '').trim() || (pageConfig.globalSong || '').trim();
    if (!song) {
        stopAudio();
        return;
    }

    stopAudio();
    activeAudio = new Audio(song);
    activeAudio.play().catch(function () {
        // Some browsers require explicit user interaction for audio playback.
    });
}

function renderCards() {
    const memoryGrid = document.querySelector('.memory-grid');
    memoryGrid.innerHTML = '';

    if (!Array.isArray(pageConfig.memories) || !pageConfig.memories.length) {
        const emptyState = document.createElement('p');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No memories configured yet. Add items in script.js.';
        memoryGrid.appendChild(emptyState);
        return;
    }

    pageConfig.memories.forEach(function (memory) {
        const flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        flipCard.innerHTML = [
            '<div class="flip-card-inner">',
            '<div class="flip-card-front">',
            '<img src="' + memory.image + '" alt="' + memory.title + '">',
            '</div>',
            '<div class="flip-card-back">',
            '<h3>' + memory.title + '</h3>',
            '<p>' + memory.description + '</p>',
            '</div>',
            '</div>'
        ].join('');

        flipCard.addEventListener('click', function () {
            this.classList.toggle('flipped');
            playAudioForMemory(memory);
        });

        memoryGrid.appendChild(flipCard);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    applyPageText();
    renderCards();
});