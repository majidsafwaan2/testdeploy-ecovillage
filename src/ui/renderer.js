// src/ui/renderer.js

/**
 * @file This file contains the logic for rendering the conservation chatbot UI.
 * It dynamically injects all necessary CSS and creates the interactive chatbot
 * launcher and main chat window.
 * All styling is contained within the CHATBOT_STYLES constant.
 */

// All CSS for the chatbot UI is embedded here as a JavaScript template literal string.
// This ensures that the styling is self-contained within the module and does not
// rely on an external CSS file, simplifying packaging and deployment.
const CHATBOT_STYLES = `
    /* Base styles for the main container of the chatbot */
    #conservation-chatbot-container {
        font-family: Arial, sans-serif;
        position: fixed; /* Positions the chat window relative to the viewport */
        bottom: 20px;    /* 20px from the bottom edge of the viewport */
        right: 20px;     /* 20px from the right edge of the viewport */
        width: 320px;    /* Fixed width for the chat window */
        height: 450px;   /* Fixed height for the chat window */
        border: 1px solid rgba(255, 255, 255, 0.3); /* Soft, semi-transparent white border for glass effect */
        border-radius: 12px; /* Rounded corners for a modern, glassy look */
        
        /* Core "Liquid Glass" effect properties */
        background: rgba(255, 255, 255, 0.2); /* Semi-transparent white background */
        backdrop-filter: blur(10px) saturate(180%); /* Blurs and saturates content behind the element */
        -webkit-backdrop-filter: blur(10px) saturate(180%); /* Vendor prefix for Safari compatibility */
        
        /* Box shadow for depth and an inner highlight */
        box-shadow: 0 4px 12px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        
        /* Initial state for animations (hidden and scaled down) */
        display: none; /* Starts hidden to prevent flash of unstyled content */
        flex-direction: column; /* Arranges content vertically when visible */
        overflow: hidden; /* Hides content that overflows the container */
        
        /* Transition properties for smooth expand/collapse animation */
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        transform: translateY(100%) scale(0.8); /* Starts off-screen (bottom) and slightly smaller */
        opacity: 0; /* Starts fully transparent */
        pointer-events: none; /* Prevents interaction when hidden */
        z-index: 10000; /* Ensures the chatbot is on top of most other page content */
    }

    /* Styles for when the chat window is in its expanded (visible) state */
    #conservation-chatbot-container.expanded {
        display: flex; /* Makes the chat window visible (overrides display: none) */
        transform: translateY(0) scale(1); /* Moves into view and to full size */
        opacity: 1; /* Makes it fully opaque */
        pointer-events: all; /* Allows interaction */
    }

    /* Styles for the collapsed chatbot "launcher" button (the small circle) */
    #conservation-chatbot-launcher {
        position: fixed; /* Positions the launcher relative to the viewport */
        bottom: 20px;    /* Same bottom position as the chat window */
        right: 20px;     /* Same right position as the chat window */
        width: 60px;     /* Width of the circular launcher */
        height: 60px;    /* Height of the circular launcher */
        border-radius: 50%; /* Makes the element a perfect circle */
        background-color: #222;
        display: flex;   /* Uses flexbox for centering content */
        justify-content: center; /* Centers content horizontally */
        align-items: center; /* Centers content vertically */
        cursor: pointer; /* Changes cursor to a pointer on hover, indicating interactivity */
        box-shadow: 0 2px 10px rgba(0,0,0,0.2); /* Shadow for a floating effect */
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; /* Smooth hide/show animation */
        z-index: 10001; /* Ensures the launcher is above the chat window when collapsed */
    }

    /* Styles for when the launcher is hidden (chat window is open) */
    #conservation-chatbot-launcher.hidden {
        opacity: 0; /* Makes the launcher fully transparent */
        pointer-events: none; /* Prevents interaction when hidden */
        transform: scale(0.5); /* Shrinks the launcher slightly as it disappears */
    }

    /* Styles for the animal photo within the launcher button */
    #conservation-chatbot-launcher img {
        width: 50px; /* Size of the animal photo */
        height: 50px; /* Size of the animal photo */
        border-radius: 50%; /* Makes the photo circular */
        object-fit: cover; /* Ensures the image covers the area without distortion */
        border: 2px solid white; /* A white border around the photo */
    }

    /* Styles for the header section of the chat window */
    .conservation-chatbot-header {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: #222;
        color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset;
    }

    /* Groups the avatar and title in the header */
    .conservation-chatbot-header .title-group {
        display: flex;
        align-items: center;
        flex: 1;
    }

    /* Chatbot title (animal's name) in the header */
    .conservation-chatbot-header h3 {
        margin: 0; /* Removes default margin */
        font-size: 16px; /* Font size for the title */
        white-space: nowrap; /* Prevents text from wrapping */
        overflow: hidden; /* Hides overflowing text */
        text-overflow: ellipsis; /* Adds ellipsis if text overflows */
    }

    /* Avatar within the chat window header */
    .conservation-chatbot-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
        border: 2px solid rgba(255, 255, 255, 0.8); /* Slightly transparent white border */
    }

    /* Animal selection dropdown styles */
    .conservation-chatbot-animal-select {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 6px;
        color: white;
        padding: 4px 8px;
        font-size: 14px;
        cursor: pointer;
        margin-left: 20px;
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

    /* Close button in the chat header */
    .conservation-chatbot-close-button {
        background: none; /* No background */
        border: none; /* No border */
        color: white; /* White 'x' symbol */
        font-size: 24px; /* Large font size for visibility */
        cursor: pointer; /* Pointer cursor on hover */
        line-height: 1; /* Ensures 'x' is vertically centered */
        margin-left: auto; /* Pushes button to the far right */
        padding: 0; /* Removes default padding */
    }

    .conservation-chatbot-close-button:hover {
        opacity: 0.8; /* Slight fade on hover */
    }

    /* Container for chat messages */
    .conservation-chatbot-messages {
        flex-grow: 1; /* Allows this section to take up available vertical space */
        overflow-y: auto; /* Enables vertical scrolling if messages overflow */
        padding: 10px; /* Padding inside the messages area */
        display: flex;
        flex-direction: column; /* Stacks messages vertically */
        gap: 8px; /* Space between individual messages */
        background-color: transparent; /* Makes background transparent to show backdrop-filter */
    }

    /* Base styles for individual chat messages */
    .conservation-chatbot-message {
        max-width: 75%; /* Limits message width to 75% of container */
        padding: 8px 12px; /* Padding inside the message bubble */
        border-radius: 18px; /* Rounded corners for message bubbles */
        word-wrap: break-word; /* Wraps long words */
        white-space: pre-wrap; /* Preserves whitespace and line breaks */
    }

    /* Styles for chatbot's messages */
    .conservation-chatbot-message.bot {
        align-self: flex-start;
        background-color: #f1f1f1;
        color: #333;
        border-bottom-left-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    /* Styles for user's messages */
    .conservation-chatbot-message.user {
        align-self: flex-end;
        background-color: #222;
        color: white;
        border-bottom-right-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    /* Container for the input field and send button */
    .conservation-chatbot-input-container {
        display: flex; /* Uses flexbox */
        flex-wrap: wrap; /* Allows items (prompts, input) to wrap to new lines */
        padding: 10px; /* Padding around input elements */
        border-top: 1px solid rgba(255, 255, 255, 0.3); /* Translucent top border */
        background-color: rgba(255, 255, 255, 0.3); /* Translucent input background */
        backdrop-filter: blur(5px); /* Applies blur to the input area too */
        -webkit-backdrop-filter: blur(5px); /* Safari prefix */
        border-bottom-left-radius: 8px; /* Matches container's border-radius */
        border-bottom-right-radius: 8px; /* Matches container's border-radius */
        gap: 8px; /* Space between flex items */
    }

    /* Container for default prompt buttons */
    .conservation-chatbot-default-prompts {
        width: 100%; /* Takes full width of its parent container */
        display: flex;
        flex-wrap: wrap; /* Allows buttons to wrap to new line */
        gap: 5px; /* Space between prompt buttons */
        justify-content: center; /* Centers the buttons horizontally */
        margin-bottom: 5px; /* Space below prompt buttons */
        transition: opacity 0.3s ease; /* For smooth disabling effect */
    }

    /* Styling for individual default prompt buttons */
    .conservation-chatbot-default-prompts .default-prompt-btn {
        background-color: #444;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 15px;
        padding: 6px 12px;
        font-size: 13px;
        cursor: pointer;
        transition: background-color 0.2s ease, opacity 0.2s ease;
        flex-shrink: 0;
        white-space: nowrap;
    }

    .conservation-chatbot-default-prompts .default-prompt-btn:hover {
        background-color: #666;
    }

    .conservation-chatbot-default-prompts .default-prompt-btn:active {
        transform: translateY(1px); /* Simple press down effect on click */
    }

    .conservation-chatbot-default-prompts .default-prompt-btn:disabled {
        background-color: rgba(106, 13, 173, 0.3); /* Lighter, less opaque when disabled */
        cursor: not-allowed; /* Not-allowed cursor when disabled */
    }

    /* Chat input field */
    .conservation-chatbot-input {
        flex-grow: 1; /* Allows input to take up available horizontal space */
        padding: 8px; /* Padding inside the input field */
        border: 1px solid rgba(255, 255, 255, 0.5); /* Semi-transparent border */
        background-color: rgba(255, 255, 255, 0.6); /* Slightly more opaque background for input */
        color: #333; /* Dark text for input */
        border-radius: 20px; /* Rounded input field */
        margin-right: 8px; /* Space between input and send button */
        font-size: 14px; /* Font size for input text */
        outline: none; /* Removes outline on focus */
        min-width: 0; /* Allows the input field to shrink on smaller screens */
    }

    /* Placeholder text style for the input field */
    .conservation-chatbot-input::placeholder {
        color: rgba(0,0,0,0.5); /* Semi-transparent placeholder text */
    }

    /* Send button styles */
    .conservation-chatbot-send-button {
        background-color: #222;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 8px 15px;
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

    /* Thinking Indicator (typing animation) */
    .conservation-chatbot-message.bot.thinking {
        display: inline-flex; /* Uses flex to align dots horizontally */
        align-items: center; /* Centers dots vertically */
        /* Reuses styles from .conservation-chatbot-message.bot for consistency */
        background-color: rgba(255, 255, 255, 0.4);
        color: #333;
        border-bottom-left-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        padding: 8px 12px;
        max-width: 75%;
        align-self: flex-start;
        border-radius: 18px;
    }

    .conservation-chatbot-message.bot.thinking .dot {
        width: 8px;      /* Size of each dot */
        height: 8px;     /* Size of each dot */
        background-color: #555; /* Color of the dots */
        border-radius: 50%; /* Makes dots circular */
        margin: 0 2px;   /* Space between dots */
        animation: blink 1.4s infinite ease-in-out both; /* Applies blinking animation */
    }

    /* Individual animation delays for cascading blink effect */
    .conservation-chatbot-message.bot.thinking .dot:nth-child(1) { animation-delay: 0s; }
    .conservation-chatbot-message.bot.thinking .dot:nth-child(2) { animation-delay: 0.2s; }
    .conservation-chatbot-message.bot.thinking .dot:nth-child(3) { animation-delay: 0.4s; }

    /* Keyframes for the blinking animation */
    @keyframes blink {
        0%, 80%, 100% { opacity: 0; } /* Invisible at start, 80%, and end */
        40% { opacity: 1; } /* Fully visible at 40% of animation */
    }

    .conservation-chatbot-heart-button {
        margin-right: 0;
    }
`;

// It's good practice to import types for JSDoc, even if not directly used in runtime logic.
// This improves code readability and allows IDEs to provide better autocompletion and type checking.
import '../types.js';

/**
 * Renders the conservation chatbot's user interface into a specified HTML container element.
 * This function handles the dynamic creation of the chatbot launcher (a small circle),
 * the main chat window, and all its interactive elements, including message display,
 * user input, send button, and quick-prompt buttons. It also manages UI state
 * such as chat expansion/collapse and a thinking indicator during AI responses.
 *
 * @param {HTMLElement} containerElement - The DOM element where the chatbot UI will be inserted.
 * Typically, this would be `document.body` or a specific
 * `div` in the host application.
 * @param {Array} animals - Array of animal objects with id, name, species, conservationStatus, location, and photo properties.
 * @param {Function} createChatbotInstance - Function to create a chatbot instance for a given animal.
 */
export function renderChatbotUI(containerElement, animals, createChatbotInstance) {
    // --- Input Validation ---
    // Ensure that a valid HTML element is provided to attach the chatbot UI.
    if (!containerElement) {
        console.error("Conservation Chatbot: Container element not found for chatbot UI. Please provide a valid HTMLElement.");
        return;
    }
    // Ensure that a valid array of animals is provided.
    if (!Array.isArray(animals) || animals.length === 0) {
        console.error("Conservation Chatbot: Invalid animals array provided. Please provide a non-empty array of animals.");
        return;
    }
    // Ensure that a valid createChatbotInstance function is provided.
    if (typeof createChatbotInstance !== 'function') {
        console.error("Conservation Chatbot: Invalid createChatbotInstance function provided. Please provide a function that creates chatbot instances.");
        return;
    }

    // --- CSS Injection ---
    // Dynamically inject the CSS into the document's <head> section.
    // This approach keeps the styling encapsulated within the JavaScript module
    // and prevents issues with external CSS file paths in different environments.
    // A check is performed to prevent duplicate injection if the function is called multiple times.
    if (!document.getElementById('conservation-chatbot-styles')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'conservation-chatbot-styles'; // Assign a unique ID for easy lookup
        styleTag.textContent = CHATBOT_STYLES;       // Set the CSS content
        document.head.appendChild(styleTag);          // Append to the head
    }

    // Initialize with the first animal
    let currentAnimalIndex = 0;
    let currentChatbotInstance = createChatbotInstance(animals[currentAnimalIndex]);

    // --- Create Chatbot Launcher (Circular Icon) ---
    // This is the initial small, clickable circle that appears on the page.
    const launcherElement = document.createElement('div');
    launcherElement.id = 'conservation-chatbot-launcher';
    // The inner HTML includes the animal's photo as the launcher's avatar.
    const launcherImg = document.createElement('img');
    launcherImg.src = currentChatbotInstance.getAnimalPhoto();
    launcherImg.alt = `${currentChatbotInstance.getAnimalName()} Avatar`;
    launcherElement.appendChild(launcherImg);
    document.body.appendChild(launcherElement); // Append the launcher directly to the document body

    // --- Create Main Chat Container (Full Chat Window) ---
    // This element holds the entire chat interface (header, messages, input).
    // It is initially hidden by the CSS and expands on launcher click.
    const chatContainer = document.createElement('div');
    chatContainer.id = 'conservation-chatbot-container';

    // Header Section
    const headerDiv = document.createElement('div');
    headerDiv.className = 'conservation-chatbot-header';
    const titleGroupDiv = document.createElement('div');
    titleGroupDiv.className = 'title-group';
    const headerAvatar = document.createElement('img');
    headerAvatar.src = currentChatbotInstance.getAnimalPhoto();
    headerAvatar.alt = `${currentChatbotInstance.getAnimalName()} Avatar`;
    headerAvatar.className = 'conservation-chatbot-avatar';
    headerAvatar.style.marginRight = '3px'; // 3px right margin to avatar
    // Create animal selection dropdown
    const animalSelect = document.createElement('select');
    animalSelect.className = 'conservation-chatbot-animal-select';
    animalSelect.style.marginLeft = '3px'; // 3px left margin from avatar
    animalSelect.style.minWidth = 'unset'; // Remove min width
    animalSelect.style.padding = '4px 6px'; // Make compact
    // Populate dropdown with animals (no placeholder)
    animals.forEach((animal, index) => {
        const option = document.createElement('option');
        option.value = index;
        // Use the animal's personal name instead of label
        option.textContent = `Talk to ${animal.name}`;
        if (index === currentAnimalIndex) {
            option.selected = true;
        }
        animalSelect.appendChild(option);
    });
    // Create heart button
    const heartButton = document.createElement('button');
    heartButton.className = 'conservation-chatbot-heart-button';
    heartButton.innerHTML = '♥';
    heartButton.title = 'Show your love!';
    heartButton.style.marginLeft = '-20px'; // Move heart 20px to the left
    heartButton.style.width = '80px'; // Make the heart wider
    heartButton.style.fontSize = '28px'; // Bigger heart
    heartButton.style.background = 'none';
    heartButton.style.border = 'none';
    heartButton.style.color = 'white';
    heartButton.style.cursor = 'pointer';
    heartButton.style.transition = 'color 0.2s';
    heartButton.style.height = '36px'; // Taller heart
    heartButton.style.borderRadius = '50%'; // Fully rounded, less pointy
    heartButton.style.display = 'flex';
    heartButton.style.alignItems = 'center';
    heartButton.style.justifyContent = 'center';
    heartButton.style.lineHeight = '1';
    heartButton.style.padding = '0';

    // Heart button logic for persistent pink state
    let liked = false;
    function updateHeartColor() {
        heartButton.style.color = liked ? '#ff69b4' : 'white';
    }
    heartButton.addEventListener('mouseenter', () => {
        if (!liked) heartButton.style.color = '#ff69b4';
    });
    heartButton.addEventListener('mouseleave', () => {
        if (!liked) heartButton.style.color = 'white';
    });
    heartButton.addEventListener('mousedown', () => {
        // No-op, handled by click
    });
    heartButton.addEventListener('mouseup', () => {
        // No-op, handled by click
    });
    heartButton.addEventListener('click', () => {
        liked = !liked;
        updateHeartColor();
    });
    updateHeartColor();

    const closeButton = document.createElement('button');
    closeButton.className = 'conservation-chatbot-close-button';
    closeButton.innerHTML = '&times;'; // HTML entity for 'x'
    // Only append avatar, dropdown, and heart (no title text)
    titleGroupDiv.appendChild(headerAvatar);
    titleGroupDiv.appendChild(animalSelect);
    titleGroupDiv.appendChild(heartButton);
    headerDiv.appendChild(titleGroupDiv);
    headerDiv.appendChild(closeButton);
    chatContainer.appendChild(headerDiv);

    // Messages Container
    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'conservation-chatbot-messages';
    chatContainer.appendChild(messagesContainer);

    // Input Container
    const inputContainer = document.createElement('div');
    inputContainer.className = 'conservation-chatbot-input-container';

    // Default Prompts Container
    const defaultPromptsContainer = document.createElement('div');
    defaultPromptsContainer.className = 'conservation-chatbot-default-prompts';
    const defaultPromptsData = [
        { text: 'Fun Fact', prompt: 'Tell me a fun fact!' },
        { text: 'Threats', prompt: "What's your biggest threat?" },
        { text: 'Help', prompt: 'How can I help protect you?' }
    ];
    const defaultPromptButtons = [];
    defaultPromptsData.forEach(data => {
        const button = document.createElement('button');
        button.className = 'default-prompt-btn';
        button.textContent = data.text;
        button.dataset.prompt = data.prompt; // Store prompt in a data attribute
        defaultPromptsContainer.appendChild(button);
        defaultPromptButtons.push(button); // Collect references
    });
    inputContainer.appendChild(defaultPromptsContainer);

    // Input Field
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.className = 'conservation-chatbot-input';
    inputElement.placeholder = 'Ask me anything...';
    inputContainer.appendChild(inputElement);

    // Send Button
    const sendButton = document.createElement('button');
    sendButton.className = 'conservation-chatbot-send-button';
    sendButton.textContent = 'Send';
    inputContainer.appendChild(sendButton);

    chatContainer.appendChild(inputContainer);

    // Append the main chat container to the provided `containerElement`.
    containerElement.appendChild(chatContainer);

    // Function to switch to a different animal
    const switchAnimal = (animalIndex) => {
        if (animalIndex >= 0 && animalIndex < animals.length) {
            currentAnimalIndex = animalIndex;
            currentChatbotInstance = createChatbotInstance(animals[currentAnimalIndex]);
            
            // Update UI elements
            launcherImg.src = currentChatbotInstance.getAnimalPhoto();
            launcherImg.alt = `${currentChatbotInstance.getAnimalName()} Avatar`;
            headerAvatar.src = currentChatbotInstance.getAnimalPhoto();
            headerAvatar.alt = `${currentChatbotInstance.getAnimalName()} Avatar`;
            
            // Clear messages and add new greeting using animal's intro if available
            messagesContainer.innerHTML = '';
            const currentAnimal = animals[currentAnimalIndex];
            const greeting = currentAnimal.intro || `Hello! I'm ${currentChatbotInstance.getAnimalName()}. What would you like to know about me and my conservation?`;
            addMessageToUI(greeting, 'bot');
        }
    };

    // --- UI State Management ---
    let isChatOpen = false; // Tracks the current visibility state of the chat window

    /**
     * Toggles the visibility of the main chat window and the launcher button.
     * Manages CSS classes to trigger transition animations and `display` property
     * to ensure elements are correctly hidden/shown.
     */
    const toggleChat = () => {
        isChatOpen = !isChatOpen; // Invert the state

        if (isChatOpen) {
            // --- Open Chat Logic ---
            chatContainer.style.display = 'flex'; // Make the container visible before animating
            // Use requestAnimationFrame to ensure the browser applies 'display: flex'
            // before the 'expanded' class is added, allowing CSS transitions to run smoothly.
            requestAnimationFrame(() => {
                chatContainer.classList.add('expanded');
                launcherElement.classList.add('hidden');
            });

            // Add an initial greeting message from the bot only if the chat
            // is empty or only contains a thinking indicator (e.g., after an error).
            if (messagesContainer.children.length === 0 ||
                (messagesContainer.children.length === 1 && messagesContainer.children[0].classList.contains('thinking'))) {
                 const currentAnimal = animals[currentAnimalIndex];
                 const greeting = currentAnimal.intro || `Hello! I'm ${currentChatbotInstance.getAnimalName()}. What would you like to know about me and my conservation?`;
                 addMessageToUI(greeting, 'bot');
            }
            inputElement.focus(); // Focus the input field for immediate typing
        } else {
            // --- Close Chat Logic ---
            chatContainer.classList.remove('expanded'); // Start the collapse animation
            launcherElement.classList.remove('hidden'); // Show the launcher

            // Wait for the CSS transition to complete (0.3s) before setting display to 'none'.
            // This ensures the animation is fully visible before the element is removed from layout.
            setTimeout(() => {
                chatContainer.style.display = 'none';
            }, 300); // The timeout duration should match the CSS transition duration
        }
    };

    // --- Event Listeners for Chat UI Controls ---
    launcherElement.addEventListener('click', toggleChat); // Open chat on launcher click
    closeButton.addEventListener('click', toggleChat);     // Close chat on close button click
    animalSelect.addEventListener('change', (e) => {
        const selectedIndex = parseInt(e.target.value);
        if (!isNaN(selectedIndex)) {
            switchAnimal(selectedIndex);
        }
    });

    /**
     * Appends a new message bubble to the chat conversation history.
     * Automatically scrolls to the bottom to show the latest message.
     * @param {string} text - The content of the message.
     * @param {'user' | 'bot'} sender - Specifies if the message is from the 'user' or 'bot'.
     * @returns {HTMLElement} The newly created message DOM element.
     */
    function addMessageToUI(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('conservation-chatbot-message', sender);
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        // Scroll to the bottom of the messages container to show the latest message.
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return messageDiv; // Return the element, useful for manipulating it (e.g., removing thinking icon)
    }

    /**
     * Displays a "thinking..." indicator in the chat window, mimicking typing.
     * The indicator consists of three pulsating dots.
     * @returns {HTMLElement} The created thinking indicator element.
     */
    function showThinkingIndicator() {
        const thinkingDiv = document.createElement('div');
        thinkingDiv.classList.add('conservation-chatbot-message', 'bot', 'thinking');
        thinkingDiv.innerHTML = `
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `;
        messagesContainer.appendChild(thinkingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return thinkingDiv; // Return the element so it can be targeted for removal
    }

    /**
     * Removes a previously displayed "thinking..." indicator from the chat UI.
     * @param {HTMLElement} indicatorElement - The specific DOM element of the thinking indicator to remove.
     */
    function removeThinkingIndicator(indicatorElement) {
        if (indicatorElement && indicatorElement.parentNode) {
            indicatorElement.parentNode.removeChild(indicatorElement);
        }
    }

    /**
     * Handles sending a message to the chatbot and displaying the response.
     * This function manages the entire message flow: user input, thinking indicator,
     * API call, and response display.
     * @param {string} userMessageInput - The text message from the user.
     */
    const sendMessage = async (userMessageInput) => {
        if (!userMessageInput.trim()) return; // Don't send empty messages

        // Add user message to UI
        addMessageToUI(userMessageInput, 'user');

        // Show thinking indicator
        const thinkingIndicator = showThinkingIndicator();

        // Disable input and buttons during processing
        inputElement.disabled = true;
        sendButton.disabled = true;
        defaultPromptButtons.forEach(btn => btn.disabled = true);

        try {
            // Get response from chatbot
            const botResponse = await currentChatbotInstance.respondTo(userMessageInput);
            
            // Remove thinking indicator
            removeThinkingIndicator(thinkingIndicator);
            
            // Add bot response to UI
            addMessageToUI(botResponse, 'bot');
        } catch (error) {
            console.error('Error getting response from chatbot:', error);
            
            // Remove thinking indicator
            removeThinkingIndicator(thinkingIndicator);
            
            // Add error message
            addMessageToUI("I'm sorry, I'm having trouble responding right now. Please try again!", 'bot');
        } finally {
            // Re-enable input and buttons
            inputElement.disabled = false;
            sendButton.disabled = false;
            defaultPromptButtons.forEach(btn => btn.disabled = false);
            inputElement.focus(); // Refocus input for continued conversation
        }
    };

    // --- Event Listeners for Message Sending ---
    // Send message on Enter key press
    inputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !inputElement.disabled) {
            const message = inputElement.value.trim();
            if (message) {
                inputElement.value = ''; // Clear input
                sendMessage(message);
            }
        }
    });

    // Send message on send button click
    sendButton.addEventListener('click', () => {
        if (!inputElement.disabled) {
            const message = inputElement.value.trim();
            if (message) {
                inputElement.value = ''; // Clear input
                sendMessage(message);
            }
        }
    });

    // Handle default prompt button clicks
    defaultPromptButtons.forEach(button => {
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