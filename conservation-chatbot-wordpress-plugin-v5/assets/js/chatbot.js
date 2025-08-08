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
        if (!document.getElementById('conservation-chatbot-styles')) {
            const styleTag = document.createElement('style');
            styleTag.id = 'conservation-chatbot-styles';
            styleTag.textContent = getChatbotCSS();
            document.head.appendChild(styleTag);
        }
    }
    
    /**
     * Get the complete CSS for the chatbot - with WordPress customization support
     */
    function getChatbotCSS() {
        // Get customization settings from WordPress, with fallbacks to current hardcoded values
        const custom = typeof cc_settings !== 'undefined' && cc_settings.customization ? cc_settings.customization : {};
        
        // Default values (current hardcoded appearance)
        const defaults = {
            position: 'bottom-right',
            colors: {
                primary: '#2d5016',
                secondary: '#4a7c59', 
                accent: '#8bc34a',
                background: 'rgba(255, 255, 255, 0.2)',
                text: '#333333',
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
        const positionCSS = getPositionCSS(settings.position);
        
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
                background: ${settings.colors.background};
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
                background: ${settings.colors.primary};
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${settings.colors.text_light};
                font-size: ${settings.fonts.size_large};
            }

            #conservation-chatbot-launcher:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 16px rgba(0,0,0,0.3);
            }

            #conservation-chatbot-launcher:active {
                transform: scale(0.95);
            }

            /* Chat header */
            .conservation-chatbot-header {
                background: ${settings.colors.primary};
                color: ${settings.colors.text_light};
                padding: 12px 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-radius: ${settings.border_radius.chat_window}px ${settings.border_radius.chat_window}px 0 0;
                font-size: ${settings.fonts.size_large};
                font-weight: bold;
            }

            .conservation-chatbot-header-left {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .conservation-chatbot-avatar {
                width: ${settings.sizes.avatar_size}px;
                height: ${settings.sizes.avatar_size}px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid ${settings.colors.text_light};
            }

            .conservation-chatbot-animal-select {
                background: transparent;
                border: none;
                color: ${settings.colors.text_light};
                font-size: ${settings.fonts.size_medium};
                cursor: pointer;
                margin-left: 3px;
            }

            .conservation-chatbot-animal-select option {
                background: ${settings.colors.primary};
                color: ${settings.colors.text_light};
            }

            .conservation-chatbot-heart-button {
                background: transparent;
                border: none;
                color: ${settings.colors.text_light};
                font-size: 28px;
                cursor: pointer;
                margin-left: -12px;
                transition: transform 0.2s ease;
            }

            .conservation-chatbot-heart-button:hover {
                transform: scale(1.1);
            }

            .conservation-chatbot-heart-button.liked {
                color: #ff6b6b;
            }

            .conservation-chatbot-close-button {
                background: transparent;
                border: none;
                color: ${settings.colors.text_light};
                font-size: ${settings.sizes.close_button_size}px;
                cursor: pointer;
                padding: 0;
                width: ${settings.sizes.close_button_size}px;
                height: ${settings.sizes.close_button_size}px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            }

            .conservation-chatbot-close-button:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            /* Chat messages area */
            .conservation-chatbot-messages {
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 8px;
                background: transparent;
            }

            /* Individual message bubbles */
            .conservation-chatbot-message {
                max-width: 75%;
                padding: 6px 10px;
                border-radius: ${settings.border_radius.chat_bubbles}px;
                word-wrap: break-word;
                white-space: pre-wrap;
                font-size: ${settings.fonts.size_large};
                line-height: 1.4;
            }

            .conservation-chatbot-message.user {
                align-self: flex-end;
                background: ${settings.colors.accent};
                color: ${settings.colors.text_light};
            }

            .conservation-chatbot-message.animal {
                align-self: flex-start;
                background: ${settings.colors.secondary};
                color: ${settings.colors.text_light};
            }

            /* Thinking indicator */
            .conservation-chatbot-thinking {
                align-self: flex-start;
                background: ${settings.colors.secondary};
                color: ${settings.colors.text_light};
                padding: 8px 12px;
                border-radius: ${settings.border_radius.chat_bubbles}px;
                font-size: ${settings.fonts.size_large};
                font-style: italic;
                opacity: 0.8;
            }

            /* Quick prompt buttons */
            .conservation-chatbot-prompts {
                padding: 12px 16px;
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                background: rgba(255, 255, 255, 0.05);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }

            .conservation-chatbot-prompt-button {
                background: ${settings.colors.primary};
                color: ${settings.colors.text_light};
                border: none;
                padding: 6px 12px;
                border-radius: ${settings.border_radius.prompt_buttons}px;
                cursor: pointer;
                font-size: ${settings.fonts.size_medium};
                transition: background-color 0.2s ease;
                white-space: nowrap;
            }

            .conservation-chatbot-prompt-button:hover {
                background: ${settings.colors.accent};
            }

            /* Input area */
            .conservation-chatbot-input-area {
                padding: 12px 16px;
                background: rgba(255, 255, 255, 0.05);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                gap: 8px;
                align-items: center;
            }

            .conservation-chatbot-input {
                flex: 1;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: ${settings.border_radius.input_field}px;
                padding: 8px 12px;
                color: ${settings.colors.text_light};
                font-size: ${settings.fonts.size_medium};
                outline: none;
                transition: border-color 0.2s ease;
            }

            .conservation-chatbot-input:focus {
                border-color: ${settings.colors.accent};
            }

            .conservation-chatbot-input::placeholder {
                color: rgba(255, 255, 255, 0.6);
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
                background-color: #333;
            }

            .conservation-chatbot-send-button:disabled {
                background-color: #555;
                cursor: not-allowed;
            }

            /* Scrollbar styling */
            .conservation-chatbot-messages::-webkit-scrollbar {
                width: 6px;
            }

            .conservation-chatbot-messages::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
            }

            .conservation-chatbot-messages::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 3px;
            }

            .conservation-chatbot-messages::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.5);
            }

            /* Responsive adjustments */
            @media (max-width: 480px) {
                #conservation-chatbot-container {
                    width: calc(100vw - 40px);
                    height: calc(100vh - 120px);
                    bottom: 10px;
                    right: 20px;
                    left: 20px;
                }
                
                #conservation-chatbot-launcher {
                    bottom: 10px;
                    right: 20px;
                }
            }
        `;
    }
    
    /**
     * Get position CSS based on selected position
     */
    function getPositionCSS(position) {
        switch(position) {
            case 'bottom-left':
                return 'bottom: 20px; left: 20px;';
            case 'top-right':
                return 'top: 20px; right: 20px;';
            case 'top-left':
                return 'top: 20px; left: 20px;';
            case 'bottom-right':
            default:
                return 'bottom: 20px; right: 20px;';
        }
    }
    
    /**
     * Get animal emoji
     */
    function getAnimalEmoji(animalId) {
        const emojis = {
            'tiger': '🐯',
            'elephant': '🐘',
            'panda': '🐼'
        };
        return emojis[animalId] || '🐯';
    }
    
    /**
     * Create the chatbot UI
     */
    function createChatbotUI() {
        // Create launcher
        const launcherElement = document.createElement('div');
        launcherElement.id = 'conservation-chatbot-launcher';
        launcherElement.innerHTML = getAnimalEmoji('tiger'); // Will be updated when animal loads
        document.body.appendChild(launcherElement);
        
        // Create main container
        const chatContainer = document.createElement('div');
        chatContainer.id = 'conservation-chatbot-container';
        
        // Create header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'conservation-chatbot-header';
        
        const headerLeftDiv = document.createElement('div');
        headerLeftDiv.className = 'conservation-chatbot-header-left';
        
        const headerAvatar = document.createElement('img');
        headerAvatar.src = 'https://via.placeholder.com/100x100/FF6B35/FFFFFF?text=Tiger';
        headerAvatar.alt = 'Animal Avatar';
        headerAvatar.className = 'conservation-chatbot-avatar';
        
        // Create animal selector
        const animalSelect = document.createElement('select');
        animalSelect.className = 'conservation-chatbot-animal-select';
        
        // Populate with animals
        const availableAnimals = getAnimals();
        if (availableAnimals.length > 0) {
            availableAnimals.forEach((animal, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `Talk to ${animal.name}`;
                if (index === currentAnimalIndex) {
                    option.selected = true;
                }
                animalSelect.appendChild(option);
            });
        } else {
            // Fallback if no animals available
            const option = document.createElement('option');
            option.value = 0;
            option.textContent = 'No animals available';
            animalSelect.appendChild(option);
        }
        
        // Create heart button
        const heartButton = document.createElement('button');
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
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'conservation-chatbot-close-button';
        closeButton.innerHTML = '&times;';
        
        // Assemble header
        headerLeftDiv.appendChild(headerAvatar);
        headerLeftDiv.appendChild(animalSelect);
        headerLeftDiv.appendChild(heartButton);
        headerDiv.appendChild(headerLeftDiv);
        headerDiv.appendChild(closeButton);
        chatContainer.appendChild(headerDiv);
        
        // Create messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.className = 'conservation-chatbot-messages';
        chatContainer.appendChild(messagesContainer);
        
        // Create input area
        const inputArea = document.createElement('div');
        inputArea.className = 'conservation-chatbot-input-area';
        
        // Create prompt buttons using WordPress settings
        const promptsContainer = document.createElement('div');
        promptsContainer.className = 'conservation-chatbot-prompts';
        
        // Get prompt settings from WordPress
        const custom = typeof cc_settings !== 'undefined' && cc_settings.customization ? cc_settings.customization : {};
        const prompts = custom.prompts || {};
        const features = custom.features || {};
        
        // Only show prompts if enabled
        if (features.enable_quick_prompts !== false) {
            const promptData = [
                { text: prompts.prompt_1_text || 'Fun Fact', prompt: prompts.prompt_1_message || 'Tell me a fun fact!' },
                { text: prompts.prompt_2_text || 'Threats', prompt: prompts.prompt_2_message || "What's your biggest threat?" },
                { text: prompts.prompt_3_text || 'Help', prompt: prompts.prompt_3_message || 'How can I help protect you?' }
            ];
            
            const promptButtons = [];
            promptData.forEach(data => {
                if (data.text && data.prompt) {
                    const button = document.createElement('button');
                    button.className = 'conservation-chatbot-prompt-button';
                    button.textContent = data.text;
                    button.dataset.prompt = data.prompt;
                    promptsContainer.appendChild(button);
                    promptButtons.push(button);
                }
            });
            
            // Store prompt buttons for event listeners
            window.cc_promptButtons = promptButtons;
        }
        
        chatContainer.appendChild(promptsContainer);
        
        // Create input field
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'conservation-chatbot-input';
        inputElement.placeholder = 'Ask me anything...';
        inputArea.appendChild(inputElement);
        
        // Create send button
        const sendButton = document.createElement('button');
        sendButton.className = 'conservation-chatbot-send-button';
        sendButton.textContent = 'Send';
        inputArea.appendChild(sendButton);
        
        chatContainer.appendChild(inputArea);
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
            headerAvatar: headerAvatar
        };
        
        // Initialize with first animal
        const initialAnimals = getAnimals();
        if (initialAnimals.length > 0) {
            const firstAnimal = initialAnimals[0];
            launcherElement.innerHTML = getAnimalEmoji(firstAnimal.id);
            headerAvatar.src = firstAnimal.photo;
            headerAvatar.alt = `${firstAnimal.name} Avatar`;
        } else {
            // Fallback if no animals available
            launcherElement.innerHTML = '🐯';
            headerAvatar.src = 'https://via.placeholder.com/100x100/FF6B35/FFFFFF?text=Tiger';
            headerAvatar.alt = 'Default Avatar';
        }
    }
    
    /**
     * Initialize event listeners
     */
    function initEventListeners() {
        const elements = window.cc_elements;
        
        // Toggle chat
        elements.launcher.addEventListener('click', toggleChat);
        elements.close.addEventListener('click', toggleChat);
        
        // Animal selection
        elements.animalSelect.addEventListener('change', (e) => {
            const selectedIndex = parseInt(e.target.value);
            if (!isNaN(selectedIndex)) {
                switchAnimal(selectedIndex);
            }
        });
        
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
        
        // Prompt buttons
        if (window.cc_promptButtons) {
            window.cc_promptButtons.forEach(button => {
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
                addMessageToUI(greeting, 'animal');
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
            elements.headerAvatar.src = currentAnimal.photo;
            elements.headerAvatar.alt = `${currentAnimal.name} Avatar`;
            elements.launcher.innerHTML = getAnimalEmoji(currentAnimal.id);
            
            // Clear messages and add new greeting
            elements.messages.innerHTML = '';
            const greeting = currentAnimal.intro || `Hello! I'm ${currentAnimal.name}. What would you like to know about me and my conservation?`;
            addMessageToUI(greeting, 'animal');
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
            elements.headerAvatar.src = currentAnimal.photo;
            elements.launcher.innerHTML = getAnimalEmoji(currentAnimal.id);
        }
    }
    
    /**
     * Get animals data - using WordPress settings
     */
    function getAnimals() {
        // Default animals (exact replica of original)
        const defaultAnimals = {
            'tiger': {
                id: 'tiger',
                name: 'Raja',
                species: 'Bengal Tiger',
                conservationStatus: 'Endangered',
                location: 'Sundarbans',
                photo: 'https://via.placeholder.com/100x100/FF6B35/FFFFFF?text=Tiger',
                intro: "Rawrr... I'm Raja, a Bengal tiger from the Sundarbans. My brother Shere vanished after crossing into poacher territory. Ask me anything you're curious about."
            },
            'elephant': {
                id: 'elephant',
                name: 'Nuru',
                species: 'African Elephant',
                conservationStatus: 'Endangered',
                location: 'Savannah',
                photo: 'https://via.placeholder.com/100x100/6B7280/FFFFFF?text=Elephant',
                intro: "Pwaaah... I'm Nuru, an African elephant from the savannah. My cousin Zina disappeared after men came for her tusks. Ask me anything you're curious about."
            },
            'panda': {
                id: 'panda',
                name: 'Mei',
                species: 'Giant Panda',
                conservationStatus: 'Vulnerable',
                location: 'Sichuan',
                photo: 'https://via.placeholder.com/100x100/000000/FFFFFF?text=Panda',
                intro: "Mmmmph... I'm Mei, a giant panda from Sichuan. My twin didn't make it past the first week. Ask me anything you're curious about."
            }
        };
        
        // Get selected animals from WordPress settings
        const selectedAnimals = typeof cc_settings !== 'undefined' && cc_settings.animals ? cc_settings.animals : ['tiger', 'elephant', 'panda'];
        
        // Return only selected animals, fallback to all if none selected
        const filteredAnimals = selectedAnimals.map(animalId => defaultAnimals[animalId]).filter(Boolean);
        return filteredAnimals.length > 0 ? filteredAnimals : Object.values(defaultAnimals);
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
                    addMessageToUI(response.data.response, 'animal');
                } else {
                    addMessageToUI('Sorry, I encountered an error. Please try again.', 'animal');
                }
                
                setInputState(true);
            },
            error: function() {
                hideThinkingIndicator(thinkingIndicator);
                addMessageToUI('No response received. Please check your connection.', 'animal');
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
        messageDiv.classList.add('conservation-chatbot-message', sender === 'bot' ? 'animal' : 'user');
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
        thinkingDiv.classList.add('conservation-chatbot-thinking');
        thinkingDiv.textContent = 'Animal is typing...';
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
        
        // Disable/enable prompt buttons
        if (window.cc_promptButtons) {
            window.cc_promptButtons.forEach(btn => btn.disabled = !enabled);
        }
        
        if (enabled) {
            elements.input.focus();
        }
    }
    
})(jQuery); 