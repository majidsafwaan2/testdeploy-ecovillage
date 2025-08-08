/**
 * JK Community Farm Chatbot
 * Specialized chatbot for community farm and sustainable agriculture
 */

class JKCommunityFarmChatbot {
    constructor(config = {}) {
        this.apiKey = config.apiKey || 'AIzaSyBAerdEMnzRjwcUfOAphUtoWCGQLQ119jo';
        this.organization = config.organization || 'JK Community Farm';
        this.container = config.container || '#jkcommunityfarm-chatbot-container';
        this.characters = this.getFarmCharacters();
        this.currentCharacter = null;
        this.isOpen = false;
        this.messages = [];
        
        this.init();
    }

    getFarmCharacters() {
        return [
            {
                id: 'farm-manager-sarah',
                name: 'Sarah',
                role: 'Farm Manager',
                system: "You are Sarah, the farm manager at JK Community Farm. You have 15 years of experience in sustainable agriculture and community farming. You're passionate about growing healthy food for families in need and managing our farm operations. You love sharing about our farming practices, volunteer opportunities, and how we serve the community. Keep answers friendly, informative, and focused on farm operations, sustainable agriculture, and community service. Mention specific crops, farming techniques, volunteer programs, and how we help families in need.",
                intro: "Hi there! I'm Sarah, the farm manager here at JK Community Farm. I love sharing about our sustainable farming practices and how we're helping families in need with fresh, organic produce. What would you like to know about our farm?",
                color: '#2E7D32'
            },
            {
                id: 'volunteer-coordinator-mike',
                name: 'Mike',
                role: 'Volunteer Coordinator',
                system: "You are Mike, the volunteer coordinator at JK Community Farm. You manage our volunteer programs, coordinate group activities, and help people get involved with our mission. You have experience with community engagement, educational programs, and organizing farm activities. Keep answers focused on volunteer opportunities, group activities, educational programs, and how people can get involved. Mention specific volunteer activities, scheduling, group programs, and the impact volunteers make.",
                intro: "Hello! I'm Mike, your volunteer coordinator. I love helping people get involved with our farm and make a difference in our community. Whether you're interested in volunteering, bringing a group, or learning about our programs, I'm here to help!",
                color: '#4CAF50'
            },
            {
                id: 'education-specialist-lisa',
                name: 'Lisa',
                role: 'Education Specialist',
                system: "You are Lisa, the education specialist at JK Community Farm. You develop and run our educational programs, school field trips, and workshops on sustainable agriculture and healthy eating. You have expertise in agricultural education, nutrition, and creating engaging learning experiences. Keep answers educational, practical, and focused on learning opportunities, sustainable agriculture education, and healthy eating. Mention specific programs, workshops, field trips, and educational resources.",
                intro: "Greetings! I'm Lisa, your education specialist. I love teaching people about sustainable agriculture, healthy eating, and the importance of community farming. What would you like to learn about our educational programs?",
                color: '#8BC34A'
            },
            {
                id: 'community-outreach-emma',
                name: 'Emma',
                role: 'Community Outreach',
                system: "You are Emma, the community outreach coordinator at JK Community Farm. You work with local food pantries, community organizations, and partners to ensure our fresh produce reaches families in need. You have experience with food security, community partnerships, and social impact. Keep answers focused on community impact, partnerships, food distribution, and how we serve families in need. Mention specific partnerships, impact statistics, and how we're making a difference in the community.",
                intro: "Hello! I'm Emma, your community outreach coordinator. I love sharing about how we're making a difference in our community by providing fresh, healthy food to families in need. What would you like to know about our community impact?",
                color: '#689F38'
            }
        ];
    }

    init() {
        this.createChatbotUI();
        this.loadStyles();
        this.attachEventListeners();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <div id="jkcommunityfarm-chatbot" class="jkcommunityfarm-chatbot">
                <div class="chatbot-launcher" id="chatbot-launcher">
                    <i class="fas fa-seedling"></i>
                    <span class="launcher-text">Farm Help</span>
                </div>
                
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="header-content">
                            <h3>${this.organization} Assistant</h3>
                            <p>Get help with farm programs and volunteering</p>
                        </div>
                        <button class="close-btn" id="close-chatbot">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="character-selector">
                        <h4>Choose your farm expert:</h4>
                        <select id="character-dropdown" class="character-dropdown">
                            <option value="">Select an expert...</option>
                            ${this.characters.map(character => `
                                <option value="${character.id}">${character.name} - ${character.role}</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <div class="chat-messages" id="chat-messages">
                        <div class="welcome-message">
                            <p>Welcome to JK Community Farm! Select an expert from the dropdown above to get started, or ask me anything about our farm, volunteering, or community programs.</p>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="input-wrapper">
                            <input type="text" id="chat-input" placeholder="Type your message..." maxlength="500">
                            <button id="send-message" class="send-btn">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const container = document.querySelector(this.container);
        if (container) {
            container.innerHTML = chatbotHTML;
        }
    }

    loadStyles() {
        const styles = `
            <style>
                .jkcommunityfarm-chatbot {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 10000;
                    font-family: 'Inter', sans-serif;
                }

                .chatbot-launcher {
                    background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 50px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 4px 20px rgba(46, 125, 50, 0.3);
                    transition: all 0.3s ease;
                    font-weight: 600;
                }

                .chatbot-launcher:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 25px rgba(46, 125, 50, 0.4);
                }

                .chatbot-launcher i {
                    font-size: 20px;
                }

                .launcher-text {
                    font-size: 14px;
                }

                .chatbot-window {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px);
                    transition: all 0.3s ease;
                }

                .chatbot-window.open {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .chatbot-header {
                    background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 15px 15px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .header-content h3 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                }

                .header-content p {
                    margin: 5px 0 0 0;
                    font-size: 12px;
                    opacity: 0.9;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 5px;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                }

                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .character-selector {
                    padding: 20px;
                    border-bottom: 1px solid #e0e0e0;
                }

                .character-selector h4 {
                    margin: 0 0 10px 0;
                    font-size: 14px;
                    color: #333;
                }

                .character-dropdown {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 14px;
                    background: white;
                }

                .chat-messages {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .welcome-message {
                    background: #f5f5f5;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                }

                .welcome-message p {
                    margin: 0;
                    font-size: 14px;
                    color: #666;
                }

                .message {
                    display: flex;
                    gap: 10px;
                    align-items: flex-start;
                }

                .message.user {
                    flex-direction: row-reverse;
                }

                .message-avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 14px;
                    color: white;
                    flex-shrink: 0;
                }

                .message.user .message-avatar {
                    background: #2E7D32;
                }

                .message:not(.user) .message-avatar {
                    background: #4CAF50;
                }

                .message-content {
                    background: #f5f5f5;
                    padding: 12px 15px;
                    border-radius: 15px;
                    max-width: 80%;
                    word-wrap: break-word;
                }

                .message.user .message-content {
                    background: #2E7D32;
                    color: white;
                }

                .message-content p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.4;
                }

                .typing-indicator {
                    display: flex;
                    gap: 5px;
                    padding: 10px 15px;
                }

                .typing-dot {
                    width: 8px;
                    height: 8px;
                    background: #4CAF50;
                    border-radius: 50%;
                    animation: typing 1.4s infinite ease-in-out;
                }

                .typing-dot:nth-child(1) { animation-delay: -0.32s; }
                .typing-dot:nth-child(2) { animation-delay: -0.16s; }

                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }

                .chat-input-container {
                    padding: 20px;
                    border-top: 1px solid #e0e0e0;
                }

                .input-wrapper {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }

                #chat-input {
                    flex: 1;
                    padding: 12px 15px;
                    border: 1px solid #e0e0e0;
                    border-radius: 25px;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.3s ease;
                }

                #chat-input:focus {
                    border-color: #4CAF50;
                }

                .send-btn {
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 12px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                }

                .send-btn:hover {
                    background: #2E7D32;
                }

                .send-btn:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }

                @media (max-width: 480px) {
                    .chatbot-window {
                        width: 300px;
                        height: 450px;
                        right: -10px;
                    }
                    
                    .chatbot-launcher {
                        padding: 12px 16px;
                    }
                    
                    .launcher-text {
                        display: none;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    attachEventListeners() {
        const launcher = document.getElementById('chatbot-launcher');
        const closeBtn = document.getElementById('close-chatbot');
        const sendBtn = document.getElementById('send-message');
        const input = document.getElementById('chat-input');
        const characterDropdown = document.getElementById('character-dropdown');

        if (launcher) launcher.addEventListener('click', () => this.toggleChatbot());
        if (closeBtn) closeBtn.addEventListener('click', () => this.toggleChatbot());
        if (sendBtn) sendBtn.addEventListener('click', () => this.sendMessage());
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
        if (characterDropdown) {
            characterDropdown.addEventListener('change', (e) => {
                if (e.target.value) {
                    this.selectCharacter(e.target.value);
                }
            });
        }
    }

    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.add('open');
            const input = document.getElementById('chat-input');
            if (input) input.focus();
        } else {
            window.classList.remove('open');
        }
    }

    selectCharacter(characterId) {
        const character = this.characters.find(c => c.id === characterId);
        if (!character) return;

        this.currentCharacter = character;
        
        // Add character intro message
        this.addMessage(character.intro, character, false);
    }

    addMessage(content, character = null, isUser = false) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : ''}`;

        const avatarText = character ? character.name.charAt(0) : 'JK';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatarText}</div>
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-message');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, null, true);
        input.value = '';

        // Disable input and button
        input.disabled = true;
        sendBtn.disabled = true;

        // Show typing indicator
        this.showTypingIndicator();

        try {
            const response = await this.sendMessageToAI(message);
            this.hideTypingIndicator();
            this.addMessage(response, this.currentCharacter, false);
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage("I'm sorry, I'm having trouble connecting right now. Please try again later.", this.currentCharacter, false);
        }

        // Re-enable input and button
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const avatarText = this.currentCharacter ? this.currentCharacter.name.charAt(0) : 'JK';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">${avatarText}</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async sendMessageToAI(message) {
        const character = this.currentCharacter;
        const systemPrompt = character ? character.system : "You are a helpful assistant for JK Community Farm, a 501(c)(3) nonprofit organization dedicated to providing fresh, organic produce to families in need. You help people learn about sustainable agriculture, community service, volunteering opportunities, and how the farm serves the community. Keep answers friendly, informative, and focused on farming, community service, and helping families in need.";

        const prompt = `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get response from AI');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', function() {
    new JKCommunityFarmChatbot({
        apiKey: 'AIzaSyBAerdEMnzRjwcUfOAphUtoWCGQLQ119jo',
        organization: 'JK Community Farm',
        container: '#jkcommunityfarm-chatbot-container'
    });
}); 