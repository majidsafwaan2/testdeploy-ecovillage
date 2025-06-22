/**
 * @typedef {Object} Animal
 * @property {string} name - The name of the animal (e.g., 'Leo').
 * @property {string} species - The species of the animal (e.g., 'Amur Leopard').
 * @property {string} conservationStatus - The conservation status (e.g., 'Critically Endangered').
 * @property {string} location - The natural habitat location (e.g., 'Russian Far East').
 */

/**
 * @typedef {Object} ChatbotOptions
 * @property {Animal} animal - Details about the animal persona.
 * @property {string} photo - URL or path to the animal's photo for the UI.
 * @property {string} [customPersonality] - Optional custom personality description.
 * @property {string[]} [facts] - Optional array of facts the animal should know.
 * @property {function(string): string} [userPromptHook] - Optional function to modify user input.
 */

/**
 * @typedef {Object} ChatbotInstance
 * @property {function(string): Promise<string>} respondTo - Function to get a response from the chatbot.
 * @property {function(): string} getAnimalName - Helper to get the animal's name.
 * @property {function(): string} getAnimalPhoto - Helper to get the animal's photo.
 */
