# API Reference

## `initConservationChatbot(config)`
Initializes the chatbot and injects it into the page.

**Parameters:**
- `config` *(object)*: Configuration object
  - `apiKey` *(string, required)*: Your Gemini API key
  - `organization` *(string, required)*: Your organization name
  - `organizationType` *(string, optional)*: One of `wildlife`, `marine`, `forest`, `climate`, `general`
  - `animals` *(string | array, optional)*: Animal selection (e.g. `'Panda, Tiger'` or array of animal objects)
  - `styles` *(object, optional)*: Custom styles (see Customization Guide)
  - `container` *(string | HTMLElement, optional)*: Where to inject the chatbot (default: `document.body`)
  - `options` *(object, optional)*: Reserved for future use

**Returns:**
- Control object with methods:
  - `updateStyles(newStyles)`
  - `removeCustomStyles()`
  - `getAnimals()`
  - `addAnimal(animal)`
  - `removeAnimal(animalId)`
  - `updateOrganization(newOrg, newOrgType)`

---

## `createAnimalChatbot({ animal, photo, customPersonality, facts })`
Creates a chatbot instance for a specific animal. Used internally.

---

## `renderChatbotUI(container, animals, createChatbotInstance)`
Renders the chatbot UI. Used internally.

---

## `animals`
Array of all built-in animal profiles. Each animal has:
- `id`, `name`, `species`, `conservationStatus`, `location`, `photo`, `label`, `system`, `intro`, `color`

---

## `createAnimal(animalConfig)`
Creates a custom animal profile.

**Parameters:**
- `animalConfig` *(object)*: Animal properties (see above)

---

## `createStyles(styles)`
Applies custom styles to the chatbot. See Customization Guide.

---

## `themePresets`
Pre-built style presets: `nature`, `ocean`, `dark`, `light`.

---

## Example Usage
```js
import { initConservationChatbot, animals, createAnimal, createStyles, themePresets } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-key',
  organization: 'Your Org',
  animals: 'Tiger, Panda',
  styles: themePresets.nature
});
``` 