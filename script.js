const STORAGE_KEY = 'memoryAppTemplateConfigV2';

const defaultTemplateConfig = {
    pageTitle: 'Memory Moments Template',
    headerTitle: 'Memory Moments',
    subtitle: 'Click a card to reveal the story behind the photo',
    footerText: 'Create your own memory collection',
    globalSong: '',
    memories: [
        {
            image: 'https://picsum.photos/900/1200?random=101',
            title: 'First Milestone',
            description: 'Add the details of an important moment here. You can include who was there, what happened, and why it matters.',
            song: ''
        },
        {
            image: 'https://picsum.photos/900/1200?random=102',
            title: 'Favorite Day',
            description: 'Describe a favorite day that you want to remember. Keep it short or detailed based on your style.',
            song: ''
        },
        {
            image: 'https://picsum.photos/900/1200?random=103',
            title: 'Special Trip',
            description: 'Capture highlights from a trip, event, or celebration. Add line breaks with <br> if you want formatted text.',
            song: ''
        },
        {
            image: 'https://picsum.photos/900/1200?random=104',
            title: 'Shared Lesson',
            description: 'Write about something meaningful you learned through this memory and why you want to save it.',
            song: ''
        },
        {
            image: 'https://picsum.photos/900/1200?random=105',
            title: 'Future Goal',
            description: 'Use this card for a memory in progress or a future plan you are excited about.',
            song: ''
        },
        {
            image: 'https://picsum.photos/900/1200?random=106',
            title: 'Celebration',
            description: 'Document a celebration or win that deserves a permanent place in your memory timeline.',
            song: ''
        }
    ]
};

let activeConfig = normalizeConfig(defaultTemplateConfig);
let activeAudio = null;

function getEditorFeedbackElement() {
    return document.getElementById('editor-feedback');
}

function setEditorFeedback(message, type) {
    const feedback = getEditorFeedbackElement();
    if (!feedback) {
        return;
    }

    feedback.textContent = message || '';
    feedback.classList.remove('success', 'warning');
    if (type) {
        feedback.classList.add(type);
    }
}

function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function normalizeConfig(rawConfig) {
    const config = rawConfig || {};
    const normalizedMemories = Array.isArray(config.memories) ? config.memories : [];
    return {
        pageTitle: (config.pageTitle || '').trim() || 'Memory App Template',
        headerTitle: (config.headerTitle || '').trim() || 'Memory App Template',
        subtitle: (config.subtitle || '').trim() || 'Click each card to reveal a memory',
        footerText: (config.footerText || '').trim() || 'Made with love',
        globalSong: (config.globalSong || '').trim(),
        memories: normalizedMemories.map(function (memory) {
            return {
                image: (memory.image || '').trim(),
                title: (memory.title || '').trim() || 'Untitled Memory',
                description: (memory.description || '').trim() || 'Add your memory description here.',
                song: (memory.song || '').trim()
            };
        }).filter(function (memory) {
            return memory.image || memory.title || memory.description || memory.song;
        })
    };
}

function loadConfig() {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (!savedConfig) {
        return normalizeConfig(defaultTemplateConfig);
    }

    try {
        return normalizeConfig(JSON.parse(savedConfig));
    } catch (error) {
        return normalizeConfig(defaultTemplateConfig);
    }
}

function saveConfig(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

function updateTextContent() {
    document.title = activeConfig.pageTitle;
    document.getElementById('main-title').textContent = activeConfig.headerTitle;
    document.getElementById('subtitle').textContent = activeConfig.subtitle;
    document.getElementById('footer-text').textContent = activeConfig.footerText;
}

function stopActiveAudio() {
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        activeAudio = null;
    }
}

function playAudioForMemory(memory) {
    const songToPlay = memory.song || activeConfig.globalSong;
    if (!songToPlay) {
        stopActiveAudio();
        return;
    }

    stopActiveAudio();
    activeAudio = new Audio(songToPlay);
    activeAudio.play().catch(function () {
        // Ignore autoplay-related errors; playback requires user gesture in some browsers.
    });
}

function createFlipCards() {
    const memoryGrid = document.querySelector('.memory-grid');
    memoryGrid.innerHTML = '';

    if (!activeConfig.memories.length) {
        const emptyState = document.createElement('p');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No memories yet. Open the template editor to add one.';
        memoryGrid.appendChild(emptyState);
        return;
    }

    activeConfig.memories.forEach(function (memory) {
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

function renderMemoryEditorRows() {
    const list = document.getElementById('memory-editor-list');
    list.innerHTML = '';

    activeConfig.memories.forEach(function (memory, index) {
        const item = document.createElement('div');
        item.className = 'editor-memory-item';
        item.innerHTML = [
            '<h3>Memory ' + (index + 1) + '</h3>',
            '<label>Image filename or URL</label>',
            '<input type="text" data-field="image" data-index="' + index + '" value="' + memory.image + '">',
            '<label>Card title</label>',
            '<input type="text" data-field="title" data-index="' + index + '" value="' + memory.title + '">',
            '<label>Description (supports <br> for line breaks)</label>',
            '<textarea data-field="description" data-index="' + index + '" rows="4">' + memory.description + '</textarea>',
            '<label>Optional song filename or URL (memory-specific)</label>',
            '<input type="text" data-field="song" data-index="' + index + '" value="' + memory.song + '">',
            '<p class="editor-row-feedback" data-row-feedback="' + index + '"></p>',
            '<button type="button" class="danger remove-memory" data-index="' + index + '">Remove Memory</button>'
        ].join('');
        list.appendChild(item);
    });
}

function populateEditor() {
    document.getElementById('editor-page-title').value = activeConfig.pageTitle;
    document.getElementById('editor-header-title').value = activeConfig.headerTitle;
    document.getElementById('editor-subtitle').value = activeConfig.subtitle;
    document.getElementById('editor-footer-text').value = activeConfig.footerText;
    document.getElementById('editor-global-song').value = activeConfig.globalSong;
    renderMemoryEditorRows();
}

function collectEditorConfig() {
    const editorMemories = Array.from(document.querySelectorAll('.editor-memory-item')).map(function (item) {
        return {
            image: item.querySelector('[data-field="image"]').value.trim(),
            title: item.querySelector('[data-field="title"]').value.trim(),
            description: item.querySelector('[data-field="description"]').value.trim(),
            song: item.querySelector('[data-field="song"]').value.trim()
        };
    });

    return normalizeConfig({
        pageTitle: document.getElementById('editor-page-title').value,
        headerTitle: document.getElementById('editor-header-title').value,
        subtitle: document.getElementById('editor-subtitle').value,
        footerText: document.getElementById('editor-footer-text').value,
        globalSong: document.getElementById('editor-global-song').value,
        memories: editorMemories
    });
}

function getEditorWarnings(config) {
    const warnings = [];

    if (!config.memories.length) {
        warnings.push('No memories were added.');
    }

    config.memories.forEach(function (memory, index) {
        const label = 'Memory ' + (index + 1);
        if (!memory.image) {
            warnings.push(label + ' is missing an image path.');
        }
        if (!memory.title) {
            warnings.push(label + ' is missing a title.');
        }
        if (!memory.description) {
            warnings.push(label + ' is missing a description.');
        }
    });

    return warnings;
}

function getMemoryRowWarnings(config) {
    return config.memories.map(function (memory) {
        const messages = [];
        if (!memory.image) {
            messages.push('Add an image path.');
        }
        if (!memory.title) {
            messages.push('Add a title.');
        }
        if (!memory.description) {
            messages.push('Add a description.');
        }
        return messages;
    });
}

function renderMemoryRowWarnings(config) {
    const rowWarnings = getMemoryRowWarnings(config);
    rowWarnings.forEach(function (messages, index) {
        const feedback = document.querySelector('[data-row-feedback="' + index + '"]');
        if (!feedback) {
            return;
        }

        feedback.textContent = messages.join(' ');
        feedback.classList.toggle('warning', messages.length > 0);
    });
}

function validateEditorLive() {
    const previewConfig = collectEditorConfig();
    renderMemoryRowWarnings(previewConfig);
}

function renderApp() {
    updateTextContent();
    createFlipCards();
    populateEditor();
    renderMemoryRowWarnings(activeConfig);
}

function handleEditorActions(event) {
    const removeButton = event.target.closest('.remove-memory');
    if (!removeButton) {
        return;
    }

    const index = Number(removeButton.getAttribute('data-index'));
    activeConfig.memories.splice(index, 1);
    renderApp();
    validateEditorLive();
}

function addMemory() {
    activeConfig.memories.push({
        image: '',
        title: 'New Memory',
        description: 'Write your memory here.',
        song: ''
    });
    renderApp();
    setEditorFeedback('New memory added. Fill in image, title, and description.', 'warning');
}

function saveFromEditor() {
    const nextConfig = collectEditorConfig();
    const warnings = getEditorWarnings(nextConfig);
    activeConfig = nextConfig;
    saveConfig(activeConfig);
    stopActiveAudio();
    renderApp();
    renderMemoryRowWarnings(activeConfig);

    if (warnings.length) {
        setEditorFeedback('Saved with warnings. Please review highlighted memory fields.', 'warning');
        return;
    }

    setEditorFeedback('Saved successfully.', 'success');
}

function resetTemplate() {
    localStorage.removeItem(STORAGE_KEY);
    activeConfig = normalizeConfig(deepClone(defaultTemplateConfig));
    stopActiveAudio();
    renderApp();
    setEditorFeedback('Reset to default template.', 'success');
}

document.addEventListener('DOMContentLoaded', function () {
    activeConfig = loadConfig();
    renderApp();

    document.getElementById('memory-editor-list').addEventListener('click', handleEditorActions);
    document.getElementById('memory-editor-list').addEventListener('input', validateEditorLive);
    document.getElementById('add-memory').addEventListener('click', addMemory);
    document.getElementById('save-template').addEventListener('click', saveFromEditor);
    document.getElementById('reset-template').addEventListener('click', resetTemplate);
});