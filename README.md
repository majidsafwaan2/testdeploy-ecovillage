# Conservation Chatbot

**An interactive AI chatbot that creates meaningful connections between visitors and endangered animals. By allowing users to have personal conversations with animals like Raja the Tiger or Shelly the Sea Turtle, the chatbot fosters emotional engagement and empathy. This deep, personal connection transforms abstract conservation concepts into relatable experiences, significantly increasing visitor engagement and driving support for conservation organizations. The result is higher donation rates, increased volunteer sign-ups, and stronger advocacy for endangered species protection.**

[![npm version](https://badge.fury.io/js/conservation-chatbot.svg)](https://badge.fury.io/js/conservation-chatbot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start (3 Lines!)

```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Organization Name',
  animals: 'Panda, Tiger'
});
```

**[Complete NGO Setup Guide](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/NGO_SETUP_GUIDE.md)**

## Features

- **9 Endangered Animals**: Tiger, Sea Turtle, Gorilla, Elephant, Polar Bear, Orangutan, Rhino, Panda, Vaquita
- **Organization-Specific**: Tailors responses to your conservation focus
- **Fully Customizable**: Colors, fonts, corner sharpness, animal selection
- **Mobile Responsive**: Works perfectly on all devices
- **Secure**: API key handling and best practices
- **Lightweight**: No heavy dependencies
- **NGO-Focused**: Built specifically for conservation organizations

## Perfect For

- **Wildlife Conservation NGOs**
- **Marine Conservation Organizations**
- **Forest Protection Groups**
- **Climate Organizations**
- **Zoos & Sanctuaries**
- **Environmental Education**

## Installation

```bash
npm install conservation-chatbot
```

## Basic Usage

### Simple Setup
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Organization',
  organizationType: 'wildlife',
  animals: 'Tiger, Elephant'
});
```

### With Custom Styling
```javascript
import { initConservationChatbot, themePresets } from 'conservation-chatbot';

initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Organization',
  organizationType: 'marine',
  animals: 'Sea Turtle, Vaquita',
  styles: themePresets.ocean
});
```

## Organization Types

The chatbot automatically tailors responses based on your organization type:

- **`wildlife`** - Wildlife conservation, anti-poaching, habitat protection
- **`marine`** - Ocean conservation, marine life, plastic pollution
- **`forest`** - Forest conservation, deforestation, biodiversity
- **`climate`** - Climate change, emissions, environmental activism
- **`general`** - General environmental conservation

## Animal Selection

### Simple String Selection
```javascript
animals: 'Panda, Tiger, Elephant'  // Just specify what you want
```

### All Animals
```javascript
// Don't specify animals to use all 9 animals
```

### Available Animals
- **Raja** (Tiger) - Endangered
- **Shelly** (Sea Turtle) - Endangered  
- **Kibo** (Gorilla) - Endangered
- **Nuru** (Elephant) - Endangered
- **Tula** (Polar Bear) - Vulnerable
- **Bima** (Orangutan) - Critically Endangered
- **Zola** (Rhino) - Critically Endangered
- **Mei** (Panda) - Vulnerable
- **Luna** (Vaquita) - Critically Endangered

## Customization

### Colors
```javascript
styles: {
  colors: {
    primary: '#2d5016',      // Main color
    secondary: '#4a7c59',    // Secondary color
    accent: '#8bc34a',       // Accent color
    background: 'rgba(255, 255, 255, 0.2)',
    text: '#333',
    textLight: 'white'
  }
}
```

### Fonts
```javascript
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

### Corner Sharpness
```javascript
styles: {
  borderRadius: {
    small: '6px',
    medium: '12px',
    large: '18px',
    round: '50%'
  }
}
```

### Pre-built Themes
```javascript
import { themePresets } from 'conservation-chatbot';

styles: themePresets.nature  // or 'dark', 'light', 'ocean'
```

## Complete Examples

### Wildlife Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Wildlife Organization',
  organizationType: 'wildlife',
  animals: 'Tiger, Elephant, Gorilla',
  styles: {
    colors: {
      primary: '#8B4513',
      secondary: '#A0522D',
      accent: '#D2691E'
    }
  }
});
```

### Marine Organization
```javascript
import { initConservationChatbot, themePresets } from 'conservation-chatbot';

initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Marine Organization',
  organizationType: 'marine',
  animals: 'Sea Turtle, Vaquita',
  styles: themePresets.ocean
});
```

## Advanced Features

### Custom Animals
```javascript
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

### Dynamic Updates
```javascript
const chatbot = initConservationChatbot({
  apiKey: 'your-api-key',
  organization: 'Your Org'
});

// Add new animal
chatbot.addAnimal(newAnimal);

// Update styles
chatbot.updateStyles({
  colors: { primary: '#ff0000' }
});
```

## Integration Examples

### HTML
```html
<!DOCTYPE html>
<html>
<head>
    <title>Conservation Site</title>
</head>
<body>
    <h1>Welcome to Our Conservation Organization</h1>
    
    <script type="module">
        import { initConservationChatbot } from 'conservation-chatbot';
        
        initConservationChatbot({
            apiKey: 'your-gemini-api-key',
            organization: 'Your Organization',
            organizationType: 'wildlife',
            animals: 'Tiger, Elephant'
        });
    </script>
</body>
</html>
```

### React
```jsx
import { useEffect } from 'react';
import { initConservationChatbot } from 'conservation-chatbot';

function ConservationPage() {
  useEffect(() => {
    initConservationChatbot({
      apiKey: process.env.REACT_APP_GEMINI_API_KEY,
      organization: 'Your Organization',
      organizationType: 'marine',
      animals: 'Sea Turtle, Vaquita'
    });
  }, []);

  return <div>Your conservation content</div>;
}
```

## Security

### Development
```javascript
apiKey: 'AIzaSy...' // Direct API key (OK for development)
```

### Production
```javascript
apiKey: process.env.GEMINI_API_KEY // Environment variable (recommended)
```

## Prerequisites

1. **Gemini API Key**: Get one from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Node.js**: For npm installation
3. **Modern Browser**: Supports ES6 modules

## Troubleshooting

### Common Issues

1. **Chatbot doesn't appear**:
   - Check browser console for errors
   - Verify API key is correct
   - Ensure animals are specified correctly

2. **API errors**:
   - Check your Gemini API key
   - Verify you have API quota
   - Check network connectivity

3. **Styling not working**:
   - Check CSS syntax
   - Verify style object structure
   - Try theme presets first

## Documentation

- **[Complete NGO Setup Guide](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/NGO_SETUP_GUIDE.md)** - Detailed setup for conservation organizations
- **[API Reference](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/docs/API.md)** - Full API documentation
- **[Customization Guide](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/docs/CUSTOMIZATION.md)** - Advanced styling options
- **[Examples](https://github.com/majidsafwaan2/conservation-chatbot/tree/main/examples)** - Working examples and demos

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/LICENSE) file for details.

## Acknowledgments

- Built for conservation organizations worldwide
- Powered by Google Gemini AI
- Inspired by endangered animals and their stories

---

**Ready to help endangered animals?** [Get started with the NGO Setup Guide](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/NGO_SETUP_GUIDE.md)