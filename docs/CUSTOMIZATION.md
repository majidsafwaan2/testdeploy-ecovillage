# Customization Guide

## Colors
Customize the main color palette:
```js
styles: {
  colors: {
    primary: '#2d5016',      // Main color (header, buttons)
    secondary: '#4a7c59',    // Secondary color (prompts)
    accent: '#8bc34a',       // Accent color (heart hover)
    background: 'rgba(255,255,255,0.2)', // Chat background
    text: '#333',            // Text color
    textLight: 'white'       // Light text color
  }
}
```

## Fonts
```js
styles: {
  fonts: {
    family: 'Georgia, serif',
    size: {
      small: '13px',
      medium: '14px',
      large: '16px'
    }
  }
}
```

## Corner Sharpness (Border Radius)
```js
styles: {
  borderRadius: {
    small: '6px',
    medium: '12px',
    large: '18px',
    round: '50%'
  }
}
```

## Theme Presets
```js
import { themePresets } from 'conservation-chatbot';

styles: themePresets.nature  // or 'dark', 'light', 'ocean'
```

## Custom Animals
```js
import { createAnimal } from 'conservation-chatbot/animals';

const customAnimals = [
  createAnimal({
    id: 'local-wolf',
    name: 'Shadow',
    species: 'Gray Wolf',
    conservationStatus: 'Endangered',
    location: 'Yellowstone',
    photo: '/images/wolf.jpg',
    label: 'Wolf',
    system: "You are a gray wolf...",
    intro: "Howl! I'm Shadow...",
    color: 'bg-gray-600'
  })
];
```

## Dynamic Updates
```js
const chatbot = initConservationChatbot({
  apiKey: 'your-api-key',
  organization: 'Your Org'
});

// Add a new animal
chatbot.addAnimal(newAnimal);

// Update styles
chatbot.updateStyles({
  colors: { primary: '#ff0000' }
});
```

## Container
By default, the chatbot attaches to `document.body`. You can specify a different container:
```js
container: '#my-widget-container'
``` 