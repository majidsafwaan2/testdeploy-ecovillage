# NGO Setup Guide - Conservation Chatbot

**Complete setup guide for NGOs and conservation organizations**

## Quick Start (3 Lines of Code!)

```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Organization Name',
  animals: 'Panda, Tiger'
});
```

## Prerequisites

1. **Get a Gemini API Key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key (starts with `AIzaSy...`)

2. **Install the Library**:
   ```bash
   npm install conservation-chatbot
   ```

## Basic Setup

### Step 1: Import the Library
```javascript
import { initConservationChatbot } from 'conservation-chatbot';
```

### Step 2: Initialize with Your Organization
```javascript
const chatbot = initConservationChatbot({
  apiKey: 'AIzaSy...', // Your Gemini API key
  organization: 'Your Organization', // Your organization name
  organizationType: 'wildlife' // Type of conservation work
});
```

### Step 3: That's It!
The chatbot will appear as a floating button in the bottom-right corner of your website.

## Animal Selection

### Option 1: Simple String Selection
```javascript
// Just specify the animals you want
animals: 'Panda, Tiger, Elephant'
```

### Option 2: All Animals
```javascript
// Don't specify animals to use all 9 animals
animals: undefined // or omit this line
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

## Organization Types

The chatbot will tailor responses based on your organization type:

### `wildlife`
- Focuses on wildlife conservation
- Anti-poaching efforts
- Habitat protection
- Wildlife threats

### `marine`
- Ocean conservation
- Marine life protection
- Plastic pollution
- Marine ecosystems

### `forest`
- Forest conservation
- Deforestation issues
- Biodiversity protection
- Rainforest preservation

### `climate`
- Climate change impacts
- Carbon emissions
- Environmental activism
- Renewable energy

### `general`
- General environmental conservation
- Sustainability
- How people can help

## Customization Options

### 1. Colors
```javascript
const chatbot = initConservationChatbot({
  apiKey: 'your-api-key',
  organization: 'Your Org',
  styles: {
    colors: {
      primary: '#2d5016',      // Main color (header, buttons)
      secondary: '#4a7c59',    // Secondary color (prompts)
      accent: '#8bc34a',       // Accent color (heart hover)
      background: 'rgba(255, 255, 255, 0.2)', // Chat background
      text: '#333',            // Text color
      textLight: 'white'       // Light text color
    }
  }
});
```

### 2. Fonts
```javascript
styles: {
  fonts: {
    family: 'Georgia, serif', // Font family
    size: {
      small: '13px',         // Small text
      medium: '14px',        // Medium text
      large: '16px'          // Large text
    }
  }
}
```

### 3. Corner Sharpness (Border Radius)
```javascript
styles: {
  borderRadius: {
    small: '6px',           // Small radius
    medium: '12px',         // Medium radius
    large: '18px',          // Large radius
    round: '50%'            // Round elements
  }
}
```

### 4. Pre-built Themes
```javascript
import { themePresets } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-api-key',
  organization: 'Your Org',
  styles: themePresets.nature  // or 'dark', 'light', 'ocean'
});
```

## Complete Examples

### Example 1: Wildlife Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Wildlife Organization',
  organizationType: 'wildlife',
  animals: 'Tiger, Elephant, Gorilla',
  styles: {
    colors: {
      primary: '#8B4513',
      secondary: '#A0522D',
      accent: '#D2691E'
    },
    fonts: {
      family: 'Arial, sans-serif'
    },
    borderRadius: {
      large: '25px'
    }
  }
});
```

### Example 2: Marine Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Marine Organization',
  organizationType: 'marine',
  animals: 'Sea Turtle, Vaquita',
  styles: themePresets.ocean
});
```

### Example 3: Forest Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Forest Organization',
  organizationType: 'forest',
  animals: 'Orangutan, Gorilla',
  styles: themePresets.nature
});
```

### Example 4: Climate Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Climate Organization',
  organizationType: 'climate',
  animals: 'Polar Bear, Elephant',
  styles: {
    colors: {
      primary: '#2E8B57',
      secondary: '#3CB371',
      accent: '#90EE90'
    }
  }
});
```

## Advanced Customization

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
    system: "You are a gray wolf. Speak with pack mentality...",
    intro: "Howl! I'm Shadow, a gray wolf...",
    color: 'bg-gray-600'
  })
];

const chatbot = initConservationChatbot({
  apiKey: 'your-api-key',
  organization: 'Your Org',
  animals: customAnimals
});
```

### Dynamic Updates
```javascript
const chatbot = initConservationChatbot({
  apiKey: 'your-api-key',
  organization: 'Your Org'
});

// Add a new animal later
chatbot.addAnimal(newAnimal);

// Update styles
chatbot.updateStyles({
  colors: { primary: '#ff0000' }
});
```

## Integration Examples

### HTML Page
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
            animals: 'Tiger, Elephant'
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
    initConservationChatbot({
        apiKey: '<?php echo get_option("gemini_api_key"); ?>',
        organization: '<?php echo get_bloginfo("name"); ?>',
        organizationType: 'wildlife',
        animals: 'Panda, Tiger'
    });
});
</script>
```

## Security Best Practices

### Development
```javascript
// OK for development
const chatbot = initConservationChatbot({
  apiKey: 'AIzaSy...' // Direct API key
});
```

### Production
```javascript
// Better for production - use environment variables
const chatbot = initConservationChatbot({
  apiKey: process.env.GEMINI_API_KEY // Environment variable
});
```

### Backend Proxy (Most Secure)
```javascript
// Create a backend endpoint that handles API calls
// Frontend sends requests to your server
// Server makes API calls with your key
```

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

### Support
- Check the [main README](../README.md) for more details
- Create an issue on GitHub
- Contact support at support@conservation-chatbot.com

## Success!

Once set up, your visitors will see:
- A floating chat button in the bottom-right corner
- Animals that represent your organization's mission
- Responses tailored to your conservation focus
- Calls-to-action for your organization

The chatbot will automatically:
- Mention your organization name
- Focus on your conservation type
- Encourage visitors to support your mission
- Provide educational content about endangered animals

---

**Need help?** Check the [main documentation](../README.md) or create an issue on GitHub. 