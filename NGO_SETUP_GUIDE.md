# NGO Setup Guide - Conservation Chatbot

**Complete setup guide for NGOs and conservation organizations**

## Quick Start (3 Lines of Code!)

```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Organization Name',
  animals: 'Giant Panda, Bengal Tiger'
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
animals: 'Giant Panda, Bengal Tiger, African Elephant'
```

### Option 2: All Animals
```javascript
// Don't specify animals to use all 25+ animals
animals: undefined // or omit this line
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

## Organization Types

The chatbot will tailor responses based on your organization type:

### `wildlife`
- Focuses on wildlife conservation
- Anti-poaching efforts
- Habitat protection
- Species recovery programs

### `marine`
- Ocean conservation
- Marine life protection
- Plastic pollution awareness
- Sustainable fishing

### `forest`
- Forest conservation
- Deforestation prevention
- Biodiversity protection
- Sustainable forestry

### `climate`
- Climate change awareness
- Carbon emissions reduction
- Environmental activism
- Renewable energy advocacy

### `general`
- General environmental conservation
- Mixed conservation efforts
- Educational outreach

## Organization-Specific Examples

### Example 1: Wildlife Conservation NGO
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Wildlife Organization',
  organizationType: 'wildlife',
  animals: 'Bengal Tiger, African Elephant, Mountain Gorilla',
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

### Example 2: Marine Conservation Organization
```javascript
import { initConservationChatbot, themePresets } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Marine Organization',
  organizationType: 'marine',
  animals: 'Sea Turtle, Vaquita, Blue Whale',
  styles: themePresets.ocean
});
```

### Example 3: Forest Conservation Organization
```javascript
import { initConservationChatbot, themePresets } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Forest Organization',
  organizationType: 'forest',
  animals: 'Bornean Orangutan, Mountain Gorilla, Jaguar',
  styles: themePresets.nature
});
```

### Example 4: Climate Conservation Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
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

### Example 5: Bird Conservation Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Bird Conservation Organization',
  organizationType: 'wildlife',
  animals: 'Bald Eagle, Snowy Owl, Greater Flamingo',
  styles: {
    colors: {
      primary: '#8B4513',
      secondary: '#DAA520',
      accent: '#FFD700'
    }
  }
});
```

### Example 6: Primate Conservation Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Primate Conservation Organization',
  organizationType: 'forest',
  animals: 'Mountain Gorilla, Bornean Orangutan, Ring-tailed Lemur, Chimpanzee',
  styles: {
    colors: {
      primary: '#228B22',
      secondary: '#32CD32',
      accent: '#90EE90'
    }
  }
});
```

### Example 7: Big Cat Conservation Organization
```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Big Cat Conservation Organization',
  organizationType: 'wildlife',
  animals: 'Bengal Tiger, African Lion, African Leopard, Cheetah',
  styles: {
    colors: {
      primary: '#FF8C00',
      secondary: '#FFA500',
      accent: '#FFD700'
    }
  }
});
```

### Example 8: Marine Mammal Conservation Organization
```javascript
import { initConservationChatbot, themePresets } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key',
  organization: 'Your Marine Mammal Organization',
  organizationType: 'marine',
  animals: 'Blue Whale, Bottlenose Dolphin, Sea Otter, West Indian Manatee',
  styles: themePresets.ocean
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
    label: 'Gray Wolf',
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

### Vue.js Component
```vue
<template>
  <div>
    <h1>Conservation Page</h1>
  </div>
</template>

<script>
import { initConservationChatbot } from 'conservation-chatbot';

export default {
  name: 'ConservationPage',
  mounted() {
    initConservationChatbot({
      apiKey: process.env.VUE_APP_GEMINI_API_KEY,
      organization: 'Your Organization',
      organizationType: 'forest',
      animals: 'Bornean Orangutan, Mountain Gorilla'
    });
  }
}
</script>
```

## Security Best Practices

### Development
```javascript
apiKey: 'AIzaSy...' // Direct API key (OK for development)
```

### Production
```javascript
apiKey: process.env.GEMINI_API_KEY // Environment variable (recommended)
```

### Server-Side Proxy (Most Secure)
```javascript
// Frontend
apiKey: '/api/chat' // Proxy endpoint

// Backend (Node.js example)
app.post('/api/chat', async (req, res) => {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
    headers: {
      'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });
  res.json(await response.json());
});
```

## Performance Optimization

### Lazy Loading
```javascript
// Load chatbot only when needed
document.addEventListener('scroll', function() {
  if (window.scrollY > 500 && !window.chatbotLoaded) {
    import('conservation-chatbot').then(({ initConservationChatbot }) => {
      initConservationChatbot(config);
      window.chatbotLoaded = true;
    });
  }
});
```

### Conditional Loading
```javascript
// Only load on specific pages
if (window.location.pathname.includes('/conservation')) {
  import('conservation-chatbot').then(({ initConservationChatbot }) => {
    initConservationChatbot(config);
  });
}
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

4. **Animals not showing**:
   - Check animal names match exactly
   - Verify animal IDs are correct
   - Check for typos in animal selection

### Debug Mode
```javascript
const chatbot = initConservationChatbot({
  apiKey: 'your-key',
  organization: 'Your Org',
  animals: 'Bengal Tiger, Giant Panda',
  options: {
    debug: true // Enable debug logging
  }
});
```

## Monitoring & Analytics

### Track Engagement
```javascript
const chatbot = initConservationChatbot({
  apiKey: 'your-key',
  organization: 'Your Org',
  animals: 'Bengal Tiger, Giant Panda',
  options: {
    onMessage: (message) => {
      // Track user interactions
      analytics.track('chatbot_message', {
        animal: message.animal,
        message: message.text
      });
    }
  }
});
```

### Monitor Performance
```javascript
// Track chatbot performance
const startTime = Date.now();
const chatbot = initConservationChatbot(config);

chatbot.onLoad = () => {
  const loadTime = Date.now() - startTime;
  analytics.track('chatbot_load_time', { loadTime });
};
```

## Support & Resources

- **[GitHub Issues](https://github.com/majidsafwaan2/conservation-chatbot/issues)** - Report bugs and request features
- **[API Documentation](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/docs/API.md)** - Complete API reference
- **[Customization Guide](https://github.com/majidsafwaan2/conservation-chatbot/blob/main/docs/CUSTOMIZATION.md)** - Advanced styling options
- **[Examples](https://github.com/majidsafwaan2/conservation-chatbot/tree/main/examples)** - Working examples and demos

## Next Steps

1. **Choose your animals** based on your conservation focus
2. **Customize the styling** to match your brand
3. **Test thoroughly** on your website
4. **Monitor engagement** and adjust as needed
5. **Share your success** with the conservation community

---

**Ready to make a difference? Start connecting visitors with endangered animals today!** 