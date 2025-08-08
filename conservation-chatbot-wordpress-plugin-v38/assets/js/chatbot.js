/**
 * Conservation Chatbot WordPress Plugin
 * Exact replica of the original conservation chatbot design
 */

(function($) {
    'use strict';
    
    // Global variables
    let currentAnimalIndex = 0;
    let currentChatbotInstance = null;
    let isChatOpen = false;
    let liked = false;
    
    // Initialize when document is ready
    $(document).ready(function() {
        if (typeof cc_settings !== 'undefined') {
            initConservationChatbot();
        }
    });
    
    /**
     * Initialize the conservation chatbot
     */
    function initConservationChatbot() {
        // Inject CSS styles with customization
        injectChatbotStyles();
        
        // Create chatbot UI
        createChatbotUI();
        
        // Initialize event listeners
        initEventListeners();
        
        // Load first animal
        loadAnimal(0);
    }
    
    /**
     * Inject the original chatbot CSS styles
     */
    function injectChatbotStyles() {
        // Remove existing styles if they exist
        const existingStyles = document.getElementById('conservation-chatbot-styles');
        if (existingStyles) {
            existingStyles.remove();
        }
        
        // Create new styles with current settings
        const styleTag = document.createElement('style');
        styleTag.id = 'conservation-chatbot-styles';
        styleTag.textContent = getChatbotCSS();
        document.head.appendChild(styleTag);
    }
    
    /**
     * Get the complete CSS for the chatbot - with WordPress customization support
     */
    function getChatbotCSS() {
        // Get customization settings from WordPress
        const custom = typeof cc_settings !== 'undefined' && cc_settings.customization ? cc_settings.customization : {};
        
        // Default values (original hardcoded appearance)
        const defaults = {
            position: 'bottom-right',
            colors: {
                primary: '#222',
                secondary: '#444',
                accent: '#222',
                background: 'rgba(255, 255, 255, 0.2)',
                text: '#ffffff',
                text_light: '#ffffff'
            },
            fonts: {
                family: 'Arial, sans-serif',
                size_small: '12px',
                size_medium: '14px',
                size_large: '16px'
            },
            sizes: {
                chat_window_width: '320',
                chat_window_height: '450',
                launcher_size: '60',
                avatar_size: '40',
                close_button_size: '24'
            },
            border_radius: {
                chat_window: '12',
                chat_bubbles: '18',
                launcher: '50',
                input_field: '20',
                prompt_buttons: '15'
            }
        };
        
        // Merge custom settings with defaults
        const settings = {
            position: custom.position || defaults.position,
            colors: { ...defaults.colors, ...(custom.colors || {}) },
            fonts: { ...defaults.fonts, ...(custom.fonts || {}) },
            sizes: { ...defaults.sizes, ...(custom.sizes || {}) },
            border_radius: { ...defaults.border_radius, ...(custom.border_radius || {}) }
        };
        
        // Calculate position CSS
        let positionCSS = '';
        switch(settings.position) {
            case 'bottom-left':
                positionCSS = 'bottom: 20px; left: 20px;';
                break;
            case 'top-right':
                positionCSS = 'top: 20px; right: 20px;';
                break;
            case 'top-left':
                positionCSS = 'top: 20px; left: 20px;';
                break;
            default: // bottom-right
                positionCSS = 'bottom: 20px; right: 20px;';
        }
        
        return `
            /* Base styles for the main container of the chatbot */
            #conservation-chatbot-container {
                font-family: ${settings.fonts.family};
                position: fixed;
                ${positionCSS}
                width: ${settings.sizes.chat_window_width}px;
                height: ${settings.sizes.chat_window_height}px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: ${settings.border_radius.chat_window}px;
                
                /* Core "Liquid Glass" effect properties */
                background: rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px) saturate(180%);
                -webkit-backdrop-filter: blur(10px) saturate(180%);
                
                /* Box shadow for depth and an inner highlight */
                box-shadow: 0 4px 12px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
                
                /* Initial state for animations */
                display: none;
                flex-direction: column;
                overflow: hidden;
                
                /* Transition properties for smooth expand/collapse animation */
                transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
                transform: translateY(100%) scale(0.8);
                opacity: 0;
                pointer-events: none;
                z-index: 10000;
            }

            /* Expanded state */
            #conservation-chatbot-container.expanded {
                display: flex;
                transform: translateY(0) scale(1);
                opacity: 1;
                pointer-events: all;
            }

            /* Chat launcher button */
            #conservation-chatbot-launcher {
                position: fixed;
                ${positionCSS}
                width: ${settings.sizes.launcher_size}px;
                height: ${settings.sizes.launcher_size}px;
                border-radius: ${settings.border_radius.launcher}px;
                background-color: ${settings.colors.primary};
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
                z-index: 10001;
            }

            #conservation-chatbot-launcher.hidden {
                opacity: 0;
                pointer-events: none;
                transform: scale(0.5);
            }

            #conservation-chatbot-launcher img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid white;
            }

            /* Header styles */
            .conservation-chatbot-header {
                display: flex;
                align-items: center;
                padding: 10px;
                background-color: ${settings.colors.primary};
                color: ${settings.colors.text_light};
                border-top-left-radius: ${settings.border_radius.chat_window}px;
                border-top-right-radius: ${settings.border_radius.chat_window}px;
                justify-content: space-between;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset;
            }

            .conservation-chatbot-header .title-group {
                display: flex;
                align-items: center;
                flex: 1;
            }

            .conservation-chatbot-header h3 {
                margin: 0;
                font-size: 16px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .conservation-chatbot-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 10px;
                border: 2px solid rgba(255, 255, 255, 0.8);
            }

            /* Animal selector */
            .conservation-chatbot-animal-select {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 6px;
                color: white;
                padding: 4px 8px;
                font-size: 14px;
                cursor: pointer;
                margin-left: 3px;
                margin-right: 0;
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
            }

            .conservation-chatbot-animal-select option {
                background: #222;
                color: white;
            }

            .conservation-chatbot-animal-select:focus {
                outline: none;
                border-color: rgba(255, 255, 255, 0.6);
            }

            /* Close button */
            .conservation-chatbot-close-button {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                line-height: 1;
                margin-left: auto;
                padding: 0;
            }

            .conservation-chatbot-close-button:hover {
                opacity: 0.8;
            }

            /* Messages container */
            .conservation-chatbot-messages {
                flex-grow: 1;
                overflow-y: auto;
                padding: 10px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                background-color: transparent;
            }

            /* Message styles */
            .conservation-chatbot-message {
                max-width: 75%;
                padding: 6px 10px;
                border-radius: 18px;
                word-wrap: break-word;
                white-space: pre-wrap;
                font-size: 16px;
            }

            .conservation-chatbot-message.bot {
                align-self: flex-start;
                background-color: #f1f1f1;
                color: #333;
                border-bottom-left-radius: 4px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }

            .conservation-chatbot-message.user {
                align-self: flex-end;
                background-color: #222;
                color: white;
                border-bottom-right-radius: 4px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }

            /* Input container */
            .conservation-chatbot-input-container {
                display: flex;
                flex-wrap: wrap;
                padding: 10px;
                border-top: 1px solid rgba(255, 255, 255, 0.3);
                background-color: rgba(255, 255, 255, 0.3);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                gap: 8px;
            }

            /* Default prompts */
            .conservation-chatbot-default-prompts {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                justify-content: center;
                margin-bottom: 5px;
                transition: opacity 0.3s ease;
            }

            .conservation-chatbot-default-prompts .default-prompt-btn {
                background-color: #444;
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 15px;
                padding: 6px 12px;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.2s ease, opacity 0.2s ease;
                flex-shrink: 0;
                white-space: nowrap;
            }

            .conservation-chatbot-default-prompts .default-prompt-btn:hover {
                background-color: #666;
            }

            .conservation-chatbot-default-prompts .default-prompt-btn:active {
                transform: translateY(1px);
            }

            .conservation-chatbot-default-prompts .default-prompt-btn:disabled {
                background-color: rgba(106, 13, 173, 0.3);
                cursor: not-allowed;
            }

            /* Input field */
            .conservation-chatbot-input {
                flex-grow: 1;
                padding: 6px 8px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                background-color: rgba(255, 255, 255, 0.6);
                color: #333;
                border-radius: 20px;
                margin-right: 8px;
                margin-left: 2px;
                font-size: 15px;
                outline: none;
                min-width: 0;
            }

            .conservation-chatbot-input::placeholder {
                color: rgba(0,0,0,0.5);
            }

            /* Send button */
            .conservation-chatbot-send-button {
                background-color: #222;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 6px 12px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.2s ease;
                flex-shrink: 0;
            }

            .conservation-chatbot-send-button:hover {
                background-color: #444;
            }

            .conservation-chatbot-send-button:disabled {
                background-color: #cccccc;
                cursor: not-allowed;
            }

            /* Thinking indicator */
            .conservation-chatbot-message.bot.thinking {
                display: inline-flex;
                align-items: center;
                background-color: rgba(255, 255, 255, 0.4);
                color: #333;
                border-bottom-left-radius: 4px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                padding: 6px 10px;
                max-width: 75%;
                align-self: flex-start;
                border-radius: 18px;
                font-size: 16px;
            }

            .conservation-chatbot-message.bot.thinking .dot {
                width: 8px;
                height: 8px;
                background-color: #555;
                border-radius: 50%;
                margin: 0 2px;
                animation: blink 1.4s infinite ease-in-out both;
            }

            .conservation-chatbot-message.bot.thinking .dot:nth-child(1) { animation-delay: 0s; }
            .conservation-chatbot-message.bot.thinking .dot:nth-child(2) { animation-delay: 0.2s; }
            .conservation-chatbot-message.bot.thinking .dot:nth-child(3) { animation-delay: 0.4s; }

            @keyframes blink {
                0%, 80%, 100% { opacity: 0; }
                40% { opacity: 1; }
            }

            .conservation-chatbot-heart-button {
                margin-right: 0;
                height: 32px;
                clip-path: polygon(0 0, 100% 0, 100% 90%, 0 90%);
            }
        `;
    }
    
    /**
     * Create the chatbot UI
     */
    function createChatbotUI() {
        // Get feature settings from WordPress
        const featureSettings = typeof cc_settings !== 'undefined' && cc_settings.customization && cc_settings.customization.features ? cc_settings.customization.features : {};
        
        // Create launcher
        const launcherElement = document.createElement('div');
        launcherElement.id = 'conservation-chatbot-launcher';
        const launcherImg = document.createElement('img');
        launcherImg.src = 'https://via.placeholder.com/100x100/FF6B35/FFFFFF?text=Tiger';
        launcherImg.alt = 'Animal Avatar';
        launcherElement.appendChild(launcherImg);
        document.body.appendChild(launcherElement);
        
        // Create main container
        const chatContainer = document.createElement('div');
        chatContainer.id = 'conservation-chatbot-container';
        
        // Create header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'conservation-chatbot-header';
        
        const titleGroupDiv = document.createElement('div');
        titleGroupDiv.className = 'title-group';
        
        const headerAvatar = document.createElement('img');
        headerAvatar.src = 'https://via.placeholder.com/100x100/FF6B35/FFFFFF?text=Tiger';
        headerAvatar.alt = 'Animal Avatar';
        headerAvatar.className = 'conservation-chatbot-avatar';
        
        // Create animal selector (only if enabled)
        let animalSelect = null;
        if (featureSettings.enable_animal_selector !== false) {
            animalSelect = document.createElement('select');
            animalSelect.className = 'conservation-chatbot-animal-select';
            
            // Populate with animals
            const animals = getAnimals();
            animals.forEach((animal, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `Talk to ${animal.name}`;
                if (index === currentAnimalIndex) {
                    option.selected = true;
                }
                animalSelect.appendChild(option);
            });
        }
        
        // Create heart button (only if enabled)
        let heartButton = null;
        if (featureSettings.enable_heart !== false) {
            heartButton = document.createElement('button');
            heartButton.className = 'conservation-chatbot-heart-button';
            heartButton.innerHTML = '♥';
            heartButton.title = 'Show your love!';
            heartButton.style.marginLeft = '-12px';
            heartButton.style.width = '60px';
            heartButton.style.fontSize = '28px';
            heartButton.style.background = 'none';
            heartButton.style.border = 'none';
            heartButton.style.color = 'white';
            heartButton.style.cursor = 'pointer';
            heartButton.style.transition = 'color 0.2s';
            heartButton.style.height = '32px';
            heartButton.style.borderRadius = '50%';
            heartButton.style.display = 'flex';
            heartButton.style.alignItems = 'center';
            heartButton.style.justifyContent = 'center';
            heartButton.style.lineHeight = '1';
            heartButton.style.padding = '0';
            
            // Heart button logic
            function updateHeartColor() {
                heartButton.style.color = liked ? '#ff69b4' : 'white';
            }
            
            heartButton.addEventListener('mouseenter', () => {
                if (!liked) heartButton.style.color = '#ff69b4';
            });
            
            heartButton.addEventListener('mouseleave', () => {
                if (!liked) heartButton.style.color = 'white';
            });
            
            heartButton.addEventListener('click', () => {
                liked = !liked;
                updateHeartColor();
            });
            
            updateHeartColor();
        }
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'conservation-chatbot-close-button';
        closeButton.innerHTML = '&times;';
        
        // Assemble header
        titleGroupDiv.appendChild(headerAvatar);
        if (animalSelect) {
            titleGroupDiv.appendChild(animalSelect);
        }
        if (heartButton) {
            titleGroupDiv.appendChild(heartButton);
        }
        headerDiv.appendChild(titleGroupDiv);
        headerDiv.appendChild(closeButton);
        chatContainer.appendChild(headerDiv);
        
        // Create messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.className = 'conservation-chatbot-messages';
        chatContainer.appendChild(messagesContainer);
        
        // Create input container
        const inputContainer = document.createElement('div');
        inputContainer.className = 'conservation-chatbot-input-container';
        
        // Create default prompts (only if enabled)
        let defaultPromptsContainer = null;
        let defaultPromptButtons = [];
        
        if (featureSettings.enable_quick_prompts !== false) {
            defaultPromptsContainer = document.createElement('div');
            defaultPromptsContainer.className = 'conservation-chatbot-default-prompts';
            
            // Get prompt settings from WordPress
            const promptSettings = typeof cc_settings !== 'undefined' && cc_settings.customization && cc_settings.customization.prompts ? cc_settings.customization.prompts : {};
            
            const defaultPromptsData = [
                { 
                    text: promptSettings.prompt_1_text || 'Fun Fact', 
                    prompt: promptSettings.prompt_1_message || 'Tell me a fun fact!' 
                },
                { 
                    text: promptSettings.prompt_2_text || 'Threats', 
                    prompt: promptSettings.prompt_2_message || "What's your biggest threat?" 
                },
                { 
                    text: promptSettings.prompt_3_text || 'Help', 
                    prompt: promptSettings.prompt_3_message || 'How can I help protect you?' 
                }
            ];
            
            defaultPromptsData.forEach(data => {
                const button = document.createElement('button');
                button.className = 'default-prompt-btn';
                button.textContent = data.text;
                button.dataset.prompt = data.prompt;
                defaultPromptsContainer.appendChild(button);
                defaultPromptButtons.push(button);
            });
            
            inputContainer.appendChild(defaultPromptsContainer);
        }
        
        // Create input field
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'conservation-chatbot-input';
        inputElement.placeholder = 'Ask me anything...';
        inputContainer.appendChild(inputElement);
        
        // Create send button
        const sendButton = document.createElement('button');
        sendButton.className = 'conservation-chatbot-send-button';
        sendButton.textContent = 'Send';
        inputContainer.appendChild(sendButton);
        
        chatContainer.appendChild(inputContainer);
        document.body.appendChild(chatContainer);
        
        // Store references for event listeners
        window.cc_elements = {
            launcher: launcherElement,
            container: chatContainer,
            messages: messagesContainer,
            input: inputElement,
            send: sendButton,
            close: closeButton,
            animalSelect: animalSelect,
            headerAvatar: headerAvatar,
            launcherImg: launcherImg,
            heartButton: heartButton,
            defaultPromptButtons: defaultPromptButtons
        };
    }
    
    /**
     * Initialize event listeners
     */
    function initEventListeners() {
        const elements = window.cc_elements;
        
        // Toggle chat
        elements.launcher.addEventListener('click', toggleChat);
        elements.close.addEventListener('click', toggleChat);
        
        // Animal selection (only if enabled)
        if (elements.animalSelect) {
            elements.animalSelect.addEventListener('change', (e) => {
                const selectedIndex = parseInt(e.target.value);
                if (!isNaN(selectedIndex)) {
                    switchAnimal(selectedIndex);
                }
            });
        }
        
        // Send message
        elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !elements.input.disabled) {
                const message = elements.input.value.trim();
                if (message) {
                    elements.input.value = '';
                    sendMessage(message);
                }
            }
        });
        
        elements.send.addEventListener('click', () => {
            if (!elements.input.disabled) {
                const message = elements.input.value.trim();
                if (message) {
                    elements.input.value = '';
                    sendMessage(message);
                }
            }
        });
        
        // Default prompt buttons (only if enabled)
        if (elements.defaultPromptButtons && elements.defaultPromptButtons.length > 0) {
            elements.defaultPromptButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (!button.disabled) {
                        const prompt = button.dataset.prompt;
                        if (prompt) {
                            sendMessage(prompt);
                        }
                    }
                });
            });
        }
    }
    
    /**
     * Toggle chat window
     */
    function toggleChat() {
        const elements = window.cc_elements;
        isChatOpen = !isChatOpen;
        
        if (isChatOpen) {
            elements.container.style.display = 'flex';
            requestAnimationFrame(() => {
                elements.container.classList.add('expanded');
                elements.launcher.classList.add('hidden');
            });
            
            if (elements.messages.children.length === 0) {
                const animals = getAnimals();
                const currentAnimal = animals[currentAnimalIndex];
                const greeting = currentAnimal.intro || `Hello! I'm ${currentAnimal.name}. What would you like to know about me and my conservation?`;
                addMessageToUI(greeting, 'bot');
            }
            
            elements.input.focus();
        } else {
            elements.container.classList.remove('expanded');
            elements.launcher.classList.remove('hidden');
            
            setTimeout(() => {
                elements.container.style.display = 'none';
            }, 300);
        }
    }
    
    /**
     * Switch to a different animal
     */
    function switchAnimal(animalIndex) {
        const elements = window.cc_elements;
        const animals = getAnimals();
        
        if (animalIndex >= 0 && animalIndex < animals.length) {
            currentAnimalIndex = animalIndex;
            const currentAnimal = animals[currentAnimalIndex];
            
            // Update UI elements
            elements.launcherImg.src = currentAnimal.photo;
            elements.launcherImg.alt = `${currentAnimal.name} Avatar`;
            elements.headerAvatar.src = currentAnimal.photo;
            elements.headerAvatar.alt = `${currentAnimal.name} Avatar`;
            
            // Clear messages and add new greeting
            elements.messages.innerHTML = '';
            const greeting = currentAnimal.intro || `Hello! I'm ${currentAnimal.name}. What would you like to know about me and my conservation?`;
            addMessageToUI(greeting, 'bot');
        }
    }
    
    /**
     * Load animal data
     */
    function loadAnimal(index) {
        const animals = getAnimals();
        if (index >= 0 && index < animals.length) {
            currentAnimalIndex = index;
            const currentAnimal = animals[currentAnimalIndex];
            
            const elements = window.cc_elements;
            elements.launcherImg.src = currentAnimal.photo;
            elements.headerAvatar.src = currentAnimal.photo;
        }
    }
    
    /**
     * Get animals data - exact replica of original 3 animals
     */
    function getAnimals() {
        // Get selected animals from WordPress settings
        const selectedAnimals = typeof cc_settings !== 'undefined' && cc_settings.animals ? cc_settings.animals : ['tiger', 'elephant', 'panda'];
        
        // All available animals
        const allAnimals = [
            {
                id: 'tiger',
                name: 'Raja',
                species: 'Bengal Tiger',
                conservationStatus: 'Endangered',
                location: 'Sundarbans',
                photo: 'https://via.placeholder.com/100x100/FF6B35/FFFFFF?text=Tiger',
                intro: "Rawrr... I'm Raja, a Bengal tiger from the Sundarbans. My brother Shere vanished after crossing into poacher territory. Ask me anything you're curious about."
            },
            {
                id: 'elephant',
                name: 'Nuru',
                species: 'African Elephant',
                conservationStatus: 'Endangered',
                location: 'Savannah',
                photo: 'https://via.placeholder.com/100x100/6B7280/FFFFFF?text=Elephant',
                intro: "Pwaaah... I'm Nuru, an African elephant from the savannah. My cousin Zina disappeared after men came for her tusks. Ask me anything you're curious about."
            },
            {
                id: 'panda',
                name: 'Mei',
                species: 'Giant Panda',
                conservationStatus: 'Vulnerable',
                location: 'Sichuan',
                photo: 'https://via.placeholder.com/100x100/000000/FFFFFF?text=Panda',
                intro: "Mmmmph... I'm Mei, a giant panda from Sichuan. My twin didn't make it past the first week. Ask me anything you're curious about."
            }
        ];
        
        // Add custom animals if they exist
        const customAnimals = typeof cc_settings !== 'undefined' && cc_settings.custom_animals ? cc_settings.custom_animals : [];
        customAnimals.forEach(customAnimal => {
            if (customAnimal.enabled === '1') {
                allAnimals.push({
                    id: customAnimal.id,
                    name: customAnimal.name,
                    species: customAnimal.type,
                    conservationStatus: 'Custom',
                    location: 'Custom Habitat',
                    photo: customAnimal.image || 'https://via.placeholder.com/100x100/4A90E2/FFFFFF?text=Custom',
                    intro: customAnimal.story || `Hello! I'm ${customAnimal.name}, a ${customAnimal.type}. Ask me anything you're curious about.`
                });
            }
        });
        
        // Filter animals based on selected animals (including custom animals)
        const selectedIds = [...selectedAnimals];
        customAnimals.forEach(customAnimal => {
            if (customAnimal.enabled === '1') {
                selectedIds.push(customAnimal.id);
            }
        });
        
        return allAnimals.filter(animal => selectedIds.includes(animal.id));
    }
    
    /**
     * Send message to chatbot
     */
    function sendMessage(userMessage) {
        if (!userMessage.trim()) return;
        
        const elements = window.cc_elements;
        
        // Add user message to UI
        addMessageToUI(userMessage, 'user');
        
        // Show thinking indicator
        const thinkingIndicator = showThinkingIndicator();
        
        // Disable input and buttons
        setInputState(false);
        
        // Send to AI
        sendToAI(userMessage, thinkingIndicator);
    }
    
    /**
     * Send message to AI
     */
    function sendToAI(userMessage, thinkingIndicator) {
        const animals = getAnimals();
        const currentAnimal = animals[currentAnimalIndex];
        
        // Create the prompt
        const prompt = createPrompt(currentAnimal, userMessage);
        
        // Send to WordPress AJAX
        $.ajax({
            url: cc_settings.ajax_url,
            type: 'POST',
            data: {
                action: 'cc_chat_message',
                nonce: cc_settings.nonce,
                message: userMessage,
                animal: currentAnimal,
                prompt: prompt
            },
            success: function(response) {
                hideThinkingIndicator(thinkingIndicator);
                
                if (response.success) {
                    addMessageToUI(response.data.response, 'bot');
                } else {
                    addMessageToUI('Sorry, I encountered an error. Please try again.', 'bot');
                }
                
                setInputState(true);
            },
            error: function() {
                hideThinkingIndicator(thinkingIndicator);
                addMessageToUI('No response received. Please check your connection.', 'bot');
                setInputState(true);
            }
        });
    }
    
    /**
     * Create prompt for AI
     */
    function createPrompt(animal, userMessage) {
        const { name, species, conservationStatus, location } = animal;
        
        let prompt = `You are ${name}, a ${species} who lives in ${location}. Your primary goal is to educate people and inspire them to act for conservation. You are ${conservationStatus}.`;
        
        prompt += ` Adopt the charming and characteristic personality of a ${species}.`;
        prompt += ` Speak directly as the animal. Use a warm, engaging, and slightly playful tone. Be concise and keep your responses short, ideally under 2-3 sentences. Focus on high-impact information related to your life, threats, or how humans can help.`;
        
        // Add organization context
        if (cc_settings.organization && cc_settings.organization_type) {
            prompt += ` You are representing ${cc_settings.organization}, a ${cc_settings.organization_type} conservation organization. Always mention how ${cc_settings.organization} is working to protect animals like you and how visitors can support your organization's mission.`;
        }
        
        prompt += `\n\nUser asks: "${userMessage}"`;
        prompt += `\n${name} responds:`;
        
        return prompt;
    }
    
    /**
     * Add message to UI
     */
    function addMessageToUI(text, sender) {
        const elements = window.cc_elements;
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('conservation-chatbot-message', sender);
        messageDiv.textContent = text;
        elements.messages.appendChild(messageDiv);
        elements.messages.scrollTop = elements.messages.scrollHeight;
        return messageDiv;
    }
    
    /**
     * Show thinking indicator
     */
    function showThinkingIndicator() {
        const elements = window.cc_elements;
        const thinkingDiv = document.createElement('div');
        thinkingDiv.classList.add('conservation-chatbot-message', 'bot', 'thinking');
        thinkingDiv.innerHTML = `
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `;
        elements.messages.appendChild(thinkingDiv);
        elements.messages.scrollTop = elements.messages.scrollHeight;
        return thinkingDiv;
    }
    
    /**
     * Hide thinking indicator
     */
    function hideThinkingIndicator(indicatorElement) {
        if (indicatorElement && indicatorElement.parentNode) {
            indicatorElement.parentNode.removeChild(indicatorElement);
        }
    }
    
    /**
     * Set input state
     */
    function setInputState(enabled) {
        const elements = window.cc_elements;
        elements.input.disabled = !enabled;
        elements.send.disabled = !enabled;
        
        // Disable prompt buttons if they exist
        if (elements.defaultPromptButtons && elements.defaultPromptButtons.length > 0) {
            elements.defaultPromptButtons.forEach(btn => btn.disabled = !enabled);
        }
        
        if (enabled) {
            elements.input.focus();
        }
    }
    
    /**
     * Refresh chatbot styles - can be called externally
     */
    function refreshChatbotStyles() {
        injectChatbotStyles();
    }
    
    /**
     * Refresh prompt buttons with updated settings
     */
    function refreshPromptButtons() {
        const elements = window.cc_elements;
        if (!elements || !elements.defaultPromptButtons) {
            return;
        }
        
        // Get updated prompt settings from WordPress
        const promptSettings = typeof cc_settings !== 'undefined' && cc_settings.customization && cc_settings.customization.prompts ? cc_settings.customization.prompts : {};
        
        const updatedPromptsData = [
            { 
                text: promptSettings.prompt_1_text || 'Fun Fact', 
                prompt: promptSettings.prompt_1_message || 'Tell me a fun fact!' 
            },
            { 
                text: promptSettings.prompt_2_text || 'Threats', 
                prompt: promptSettings.prompt_2_message || "What's your biggest threat?" 
            },
            { 
                text: promptSettings.prompt_3_text || 'Help', 
                prompt: promptSettings.prompt_3_message || 'How can I help protect you?' 
            }
        ];
        
        // Update existing buttons
        elements.defaultPromptButtons.forEach((button, index) => {
            if (updatedPromptsData[index]) {
                button.textContent = updatedPromptsData[index].text;
                button.dataset.prompt = updatedPromptsData[index].prompt;
            }
        });
    }
    
    /**
     * Refresh features with updated settings
     */
    function refreshFeatures() {
        const elements = window.cc_elements;
        if (!elements) {
            return;
        }
        
        // Get updated feature settings from WordPress
        const featureSettings = typeof cc_settings !== 'undefined' && cc_settings.customization && cc_settings.customization.features ? cc_settings.customization.features : {};
        
        // Handle heart button
        if (elements.heartButton) {
            if (featureSettings.enable_heart === false) {
                // Hide heart button
                elements.heartButton.style.display = 'none';
            } else {
                // Show heart button
                elements.heartButton.style.display = 'flex';
            }
        }
        
        // Handle animal selector
        if (elements.animalSelect) {
            if (featureSettings.enable_animal_selector === false) {
                // Hide animal selector
                elements.animalSelect.style.display = 'none';
            } else {
                // Show animal selector
                elements.animalSelect.style.display = 'block';
            }
        }
        
        // Handle quick prompts
        if (elements.defaultPromptButtons && elements.defaultPromptButtons.length > 0) {
            const promptContainer = elements.defaultPromptButtons[0].closest('.conservation-chatbot-default-prompts');
            if (promptContainer) {
                if (featureSettings.enable_quick_prompts === false) {
                    // Hide prompt container
                    promptContainer.style.display = 'none';
                } else {
                    // Show prompt container
                    promptContainer.style.display = 'flex';
                }
            }
        }
    }
    
    // Make refresh functions available globally
    window.refreshConservationChatbot = refreshChatbotStyles;
    window.refreshConservationChatbotPrompts = refreshPromptButtons;
    window.refreshConservationChatbotFeatures = refreshFeatures;
    
    // Refresh chatbot on page load to show updated animal selection
    $(document).ready(function() {
        // Small delay to ensure settings are loaded
        setTimeout(function() {
            refreshChatbotStyles();
            refreshPromptButtons();
            refreshFeatures();
        }, 100);
    });
    
    // Function to force refresh prompts (can be called externally)
    function forceRefreshPrompts() {
        refreshPromptButtons();
    }
    
    // Function to force refresh features (can be called externally)
    function forceRefreshFeatures() {
        refreshFeatures();
    }
    
    // Make the force refresh functions available globally
    window.forceRefreshConservationChatbotPrompts = forceRefreshPrompts;
    window.forceRefreshConservationChatbotFeatures = forceRefreshFeatures;
    
})(jQuery); 