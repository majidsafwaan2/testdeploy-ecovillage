/**
 * @fileoverview Main entry point for the Conservation Chatbot library.
 * Provides a clean API for easy integration into any website.
 * Designed specifically for NGOs and conservation organizations.
 */

import { createAnimalChatbot } from './chatbot.js';
import { renderChatbotUI } from './ui/renderer.js';
import { animals, createAnimal } from './animals/index.js';
import { createStyles, themePresets } from './styles/index.js';

/**
 * Main configuration object for the conservation chatbot
 * @typedef {Object} ChatbotConfig
 * @property {string} apiKey - Your Gemini API key
 * @property {string} organization - Your organization name (e.g., "WWF", "Greenpeace")
 * @property {string} organizationType - Type of organization (e.g., "wildlife", "marine", "forest", "general")
 * @property {Array|string} animals - Array of animals or string like "Panda, Tiger"
 * @property {Object} styles - Custom styling options
 * @property {string} container - CSS selector for the container element
 * @property {Object} options - Additional options
 */

/**
 * Parse animal selection string into array
 * @param {string|Array} animalSelection - "Panda, Tiger" or array of animal IDs
 * @returns {Array} Array of animal objects
 */
function parseAnimalSelection(animalSelection) {
  if (Array.isArray(animalSelection)) {
    return animalSelection;
  }
  
  if (typeof animalSelection === 'string') {
    const selectedNames = animalSelection.split(',').map(name => name.trim().toLowerCase());
    return animals.filter(animal => 
      selectedNames.includes(animal.name.toLowerCase()) ||
      selectedNames.includes(animal.label.toLowerCase()) ||
      selectedNames.includes(animal.species.toLowerCase())
    );
  }
  
  return animals; // Default to all animals
}

/**
 * Get organization-specific system prompt
 * @param {string} organizationType - Type of organization
 * @returns {string} Additional system prompt
 */
function getOrganizationPrompt(organizationType) {
  const prompts = {
    wildlife: "Focus on wildlife conservation, habitat protection, and anti-poaching efforts. Mention specific wildlife threats and how your organization helps.",
    marine: "Emphasize ocean conservation, marine life protection, and plastic pollution. Talk about marine ecosystems and ocean health.",
    forest: "Highlight forest conservation, deforestation issues, and biodiversity protection. Discuss rainforest preservation and tree planting.",
    climate: "Focus on climate change impacts, carbon emissions, and environmental activism. Discuss renewable energy and sustainability.",
    general: "Discuss general environmental conservation, sustainability, and how people can help protect the planet."
  };
  
  return prompts[organizationType] || prompts.general;
}

/**
 * Initialize the conservation chatbot with the given configuration
 * @param {ChatbotConfig} config - Configuration object
 * @returns {Object} Chatbot instance with control methods
 */
export function initConservationChatbot(config = {}) {
  const {
    apiKey,
    organization = "Conservation Organization",
    organizationType = "general",
    animals: animalSelection = animals,
    styles = {},
    container = document.body,
    options = {}
  } = config;

  // Validate API key
  if (!apiKey) {
    console.error('Conservation Chatbot: API key is required. Please provide your Gemini API key.');
    return null;
  }

  // Parse animal selection
  const selectedAnimals = parseAnimalSelection(animalSelection);
  
  if (selectedAnimals.length === 0) {
    console.error('Conservation Chatbot: No valid animals found. Please check your animal selection.');
    return null;
  }

  // Apply custom styles if provided
  let customStylesInstance = null;
  if (Object.keys(styles).length > 0) {
    customStylesInstance = createStyles(styles);
  }

  // Get organization-specific prompt
  const orgPrompt = getOrganizationPrompt(organizationType);

  // Create chatbot instance factory with organization context
  const createChatbotInstance = (animal) => {
    // Enhance the animal's system prompt with organization context
    const enhancedSystem = `${animal.system} You are representing ${organization}, a ${organizationType} conservation organization. ${orgPrompt} Always mention how ${organization} is working to protect animals like you and how visitors can support your organization's mission.`;
    
    return createAnimalChatbot({
      animal: {
        name: animal.name,
        species: animal.species,
        conservationStatus: animal.conservationStatus,
        location: animal.location
      },
      photo: animal.photo,
      customPersonality: enhancedSystem,
      facts: [animal.intro]
    });
  };

  // Initialize the UI
  renderChatbotUI(container, selectedAnimals, createChatbotInstance);

  // Return control object
  return {
    // Method to update styles
    updateStyles: (newStyles) => {
      if (customStylesInstance) {
        customStylesInstance.remove();
      }
      customStylesInstance = createStyles(newStyles);
    },

    // Method to remove custom styles
    removeCustomStyles: () => {
      if (customStylesInstance) {
        customStylesInstance.remove();
        customStylesInstance = null;
      }
    },

    // Method to get current animals
    getAnimals: () => selectedAnimals,

    // Method to add a new animal
    addAnimal: (animal) => {
      selectedAnimals.push(animal);
      // Re-render the UI with new animals
      const containerElement = typeof container === 'string' ? document.querySelector(container) : container;
      if (containerElement) {
        // Remove existing chatbot
        const existingChatbot = containerElement.querySelector('#conservation-chatbot-container');
        const existingLauncher = document.querySelector('#conservation-chatbot-launcher');
        if (existingChatbot) existingChatbot.remove();
        if (existingLauncher) existingLauncher.remove();
        
        // Re-render with new animals
        renderChatbotUI(containerElement, selectedAnimals, createChatbotInstance);
      }
    },

    // Method to remove an animal
    removeAnimal: (animalId) => {
      const index = selectedAnimals.findIndex(animal => animal.id === animalId);
      if (index !== -1) {
        selectedAnimals.splice(index, 1);
        // Re-render the UI
        const containerElement = typeof container === 'string' ? document.querySelector(container) : container;
        if (containerElement) {
          const existingChatbot = containerElement.querySelector('#conservation-chatbot-container');
          const existingLauncher = document.querySelector('#conservation-chatbot-launcher');
          if (existingChatbot) existingChatbot.remove();
          if (existingLauncher) existingLauncher.remove();
          
          renderChatbotUI(containerElement, selectedAnimals, createChatbotInstance);
        }
      }
    },

    // Method to update organization
    updateOrganization: (newOrg, newOrgType) => {
      // This would require re-initializing the chatbot
      console.log('Organization updated. Please re-initialize the chatbot for changes to take effect.');
    }
  };
}

// Export individual components for advanced usage
export { createAnimalChatbot } from './chatbot.js';
export { renderChatbotUI } from './ui/renderer.js';

// Export animals and utilities
export { animals, createAnimal } from './animals/index.js';
export { createStyles, themePresets } from './styles/index.js';

// Export default for backward compatibility
export default {
  initConservationChatbot,
  createAnimalChatbot,
  renderChatbotUI,
  animals,
  createAnimal,
  createStyles,
  themePresets
};