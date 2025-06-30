# Conservation Chatbot

**An interactive AI chatbot that creates meaningful connections between visitors and endangered animals. By allowing users to have personal conversations with animals like Raja the Bengal Tiger or Shelly the Sea Turtle, the chatbot fosters emotional engagement and empathy. This deep, personal connection transforms abstract conservation concepts into relatable experiences, significantly increasing visitor engagement and driving support for conservation organizations. The result is higher donation rates, increased volunteer sign-ups, and stronger advocacy for endangered species protection.**

[![npm version](https://badge.fury.io/js/conservation-chatbot.svg)](https://badge.fury.io/js/conservation-chatbot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start (3 Lines!)

```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Organization Name',
  animals: 'Giant Panda, Bengal Tiger'
});
```

**[Complete NGO Setup Guide](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/NGO_SETUP_GUIDE.md)**

## Features

- **25+ Endangered Animals**: Comprehensive collection organized by conservation focus areas
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
  animals: 'Bengal Tiger, African Elephant'
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
animals: 'Giant Panda, Bengal Tiger, African Elephant'  // Just specify what you want
```

### All Animals
```javascript
// Don't specify animals to use all 25+ animals
```

### Available Animals by Conservation Focus

#### **Global Wildlife Conservation**
- **Raja** (Bengal Tiger) - Endangered
- **Nuru** (African Elephant) - Endangered
- **Mei** (Giant Panda) - Vulnerable
- **Zola** (Black Rhino) - Critically Endangered

#### **Marine Conservation**
- **Shelly** (Sea Turtle) - Endangered
- **Luna** (Vaquita) - Critically Endangered
- **Kai** (Blue Whale) - Endangered
- **Marina** (Bottlenose Dolphin) - Least Concern
- **Finn** (Great White Shark) - Vulnerable

#### **Forest Conservation**
- **Kibo** (Mountain Gorilla) - Endangered
- **Bima** (Bornean Orangutan) - Critically Endangered
- **Luna** (Three-toed Sloth) - Least Concern
- **Shadow** (Jaguar) - Near Threatened
- **Rio** (Keel-billed Toucan) - Least Concern

#### **Climate Conservation**
- **Tula** (Polar Bear) - Vulnerable
- **Waddles** (Emperor Penguin) - Near Threatened
- **Blubber** (Harp Seal) - Least Concern

#### **Bird Conservation**
- **Freedom** (Bald Eagle) - Least Concern
- **Hoot** (Snowy Owl) - Vulnerable
- **Pink** (Greater Flamingo) - Least Concern

#### **Primate Conservation**
- **Zazu** (Ring-tailed Lemur) - Endangered
- **Koko** (Chimpanzee) - Endangered

#### **Big Cat Conservation**
- **Simba** (African Lion) - Vulnerable
- **Spot** (African Leopard) - Vulnerable
- **Swift** (Cheetah) - Vulnerable

#### **Marine Mammal Conservation**
- **River** (Sea Otter) - Endangered
- **Gentle** (West Indian Manatee) - Vulnerable

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

### Wildlife Conservation Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Wildlife Organization',
  organizationType: 'wildlife',
  animals: 'Bengal Tiger, African Elephant, Mountain Gorilla',
  styles: {
    colors: {
      primary: '#8B4513',
      secondary: '#A0522D',
      accent: '#D2691E'
    }
  }
});
```

### Marine Conservation Organization
```javascript
import { initConservationChatbot, themePresets } from 'conservation-chatbot';

initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Marine Organization',
  organizationType: 'marine',
  animals: 'Sea Turtle, Vaquita, Blue Whale',
  styles: themePresets.ocean
});
```

### Forest Conservation Organization
```javascript
import { initConservationChatbot, themePresets } from 'conservation-chatbot';

initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Forest Organization',
  organizationType: 'forest',
  animals: 'Bornean Orangutan, Mountain Gorilla, Jaguar',
  styles: themePresets.nature
});
```

### Climate Conservation Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Climate Organization',
  organizationType: 'climate',
  animals: 'Polar Bear, Emperor Penguin, Harp Seal',
  styles: {
    colors: {
      primary: '#2E8B57',
      secondary: '#3CB371',
      accent: '#90EE90'
    }
  }
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

### Custom Animal Photos
NGOs can provide their own photos for each animal to showcase their specific animals or branding:

#### Step 1: Create Images Folder
```bash
mkdir images
mkdir images/animals
```

#### Step 2: Add Your Photos
Place your animal photos in the `images/animals/` folder:
- `raja-tiger.jpg` (for Raja the Bengal Tiger)
- `nuru-elephant.jpg` (for Nuru the African Elephant)
- `mei-panda.jpg` (for Mei the Giant Panda)
- `shelly-turtle.jpg` (for Shelly the Sea Turtle)

#### Step 3: Update Code
```javascript
import { createAnimal } from 'conservation-chatbot/animals';

const customAnimals = [
  createAnimal({
    id: 'tiger',
    name: 'Raja',
    species: 'Bengal Tiger',
    photo: '/images/animals/raja-tiger.jpg', // Your photo path
    // ... other properties
  }),
  createAnimal({
    id: 'elephant',
    name: 'Nuru',
    species: 'African Elephant',
    photo: '/images/animals/nuru-elephant.jpg', // Your photo path
    // ... other properties
  })
];

initConservationChatbot({
  apiKey: 'your-api-key',
  organization: 'Your Organization',
  animals: customAnimals
});
```

**Photo Requirements:**
- Format: JPG, PNG, or WebP
- Size: 100x100px minimum (auto-resized)
- Aspect Ratio: Square (1:1) recommended
- Quality: High resolution for crisp display

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
    <title>Our Conservation Site</title>
</head>
<body>
    <h1>Welcome to Our Conservation Organization</h1>
    
    <script type="module">
        import { initConservationChatbot } from 'conservation-chatbot';
        
        initConservationChatbot({
            apiKey: 'your-gemini-api-key',
            organization: 'Your Organization',
            organizationType: 'wildlife',
            animals: 'Bengal Tiger, Giant Panda'
        });
    </script>
</body>
</html>
```

### React Component
```jsx
import { useEffect } from 'react';
import { initConservationChatbot } from 'conservation-chatbot';

function ConservationPage() {
  useEffect(() => {
    const chatbot = initConservationChatbot({
      apiKey: process.env.REACT_APP_GEMINI_API_KEY,
      organization: 'Your Organization',
      organizationType: 'marine',
      animals: 'Sea Turtle, Vaquita'
    });
  }, []);

  return <div>Your conservation content</div>;
}
```

### WordPress
```php
// Add to your theme's footer.php or via plugin
wp_enqueue_script('conservation-chatbot', 'path/to/conservation-chatbot.js');

// In your template
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot
    initConservationChatbot({
        apiKey: '<?php echo get_option("gemini_api_key"); ?>',
        organization: '<?php echo get_bloginfo("name"); ?>',
        organizationType: 'wildlife',
        animals: 'Bengal Tiger, Giant Panda'
    });
});
</script>
```

## API Reference

**[Complete API Documentation](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/docs/API.md)**

## Customization Guide

**[Complete Customization Guide](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/docs/CUSTOMIZATION.md)**

## Security Best Practices

1. **Never expose your API key in client-side code**
2. **Use environment variables** for API keys
3. **Implement rate limiting** on your server
4. **Validate user inputs** before sending to AI
5. **Monitor API usage** and costs

## Production Setup

1. **Get a Gemini API key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Install the library**: `npm install conservation-chatbot`
3. **Initialize with your organization** details
4. **Customize styling** to match your brand
5. **Test thoroughly** before going live
6. **Monitor performance** and user engagement

## Support

- **[GitHub Issues](https://github.com/majidsafwaan2/conservation-chatbot/issues)**
- **[Documentation](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/README.md)**
- **[NGO Setup Guide](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/NGO_SETUP_GUIDE.md)**

## Contributing

**[Contributing Guidelines](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/CONTRIBUTING.md)**

## License

MIT License - see [LICENSE](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/LICENSE) file for details.

---

**Transform your conservation website with meaningful animal connections. Start with just 3 lines of code!**