// Import the GoogleGenerativeAI class from the SDK
import { GoogleGenerativeAI } from '@google/generative-ai';

// IMPORTANT: For local development, you can place your API key directly here.
// However, for production, NEVER expose your API key in client-side code.
// Use environment variables or a backend proxy in a real application.
const GEMINI_API_KEY = "AIzaSyAH8coSXAFQolBXBg_JdSPn1e6h2MQCTk0"; // <<< REPLACE THIS WITH YOUR ACTUAL API KEY
// EXAMPLE: Try "gemini-1.5-flash" or "gemini-1.5-pro" if "gemini-pro" isn't working
const GEMINI_MODEL_NAME = "gemini-1.5-flash"; // <<< UPDATE THIS WITH YOUR WORKING MODEL NAME

/**
 * Generates the prompt string for the LLM based on animal data.
 * This prompt now includes instructions for conciseness and better personality integration.
 * @param {import('./types').Animal} animal - The animal object.
 * @param {string} userMessage - The user's input message.
 * @param {string} [customPersonality] - Optional custom personality description.
 * @param {string[]} [facts] - Optional array of facts the animal should mention.
 * @returns {string} The formatted prompt for the LLM.
 */
function createPrompt(animal, userMessage, customPersonality, facts) {
  const { name, species, conservationStatus, location } = animal;

  let prompt = `You are ${name}, a ${species} who lives in ${location}. Your primary goal is to educate people and inspire them to act for conservation. You are ${conservationStatus}.`;

  // Enhance personality integration
  if (customPersonality) {
    prompt += ` Your personality is: "${customPersonality}".`;
  } else {
    // Default personality traits if no custom one is provided
    prompt += ` Adopt the charming and characteristic personality of a ${species}.`;
  }

  // Integrate facts more directly
  if (facts && facts.length > 0) {
    prompt += ` You know these key facts about yourself and your species: ${facts.join('. ')}. Incorporate these naturally when relevant.`;
  }

  // Instructions for conciseness and tone
  prompt += ` Speak directly as the animal. Use a warm, engaging, and slightly playful tone. Be concise and keep your responses short, ideally under 2-3 sentences. Focus on high-impact information related to your life, threats, or how humans can help. Avoid verbose greetings or closings.`;

  prompt += `\n\nUser asks: "${userMessage}"`;
  prompt += `\n${name} responds:`; // Instruct Gemini to start with the animal's response directly

  return prompt;
}

/**
 * Creates an instance of the animal chatbot.
 * @param {import('./types').ChatbotOptions} options - Configuration for the chatbot.
 * @returns {import('./types').ChatbotInstance} The chatbot instance.
 */
export function createAnimalChatbot({ animal, photo, customPersonality, facts, userPromptHook }) {
  if (!animal || !animal.name || !animal.species || !animal.conservationStatus || !animal.location) {
    throw new Error("Invalid 'animal' object provided. It must contain name, species, conservationStatus, and location.");
  }
  if (!photo) {
      console.warn("No 'photo' provided for the chatbot. The UI may not display an avatar.");
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  // Initialize the model with the correct, working name from Google AI Studio
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

  /**
   * Sends user input to the LLM and gets a response.
   * @param {string} userInput - The message from the user.
   * @returns {Promise<string>} A promise that resolves with the animal's response.
   */
  const respondTo = async (userInput) => {
    let processedInput = userInput;
    if (userPromptHook) {
      processedInput = userPromptHook(userInput);
    }

    // Pass customPersonality and facts to createPrompt
    const prompt = createPrompt(animal, processedInput, customPersonality, facts);

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 100, // <<< New: Limit response length (adjust as needed)
          temperature: 0.7,     // <<< New: Control creativity (0.0 for factual, 1.0 for more creative)
          topP: 0.9,            // <<< New: Control diversity
          topK: 40,             // <<< New: Control diversity
        },
      });
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      if (error.name === 'GoogleGenerativeAIFetchError' && error.message.includes('404')) {
          console.error(`Attempted model: "${GEMINI_MODEL_NAME}"`);
          return `I'm sorry, the AI model I need (${GEMINI_MODEL_NAME}) isn't available or configured correctly. Please check your API key and try again.`;
      }
      return "I'm sorry, I'm having a little trouble communicating right now. Please try again later!";
    }
  };

  const getAnimalName = () => animal.name;
  const getAnimalPhoto = () => photo;

  return {
    respondTo,
    getAnimalName,
    getAnimalPhoto
  };
}