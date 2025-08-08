# Conservation Chatbot WordPress Plugin

[![Version](https://img.shields.io/badge/version-46-blue.svg)](https://github.com/majidsafwaan2/conservation-chatbot-wp-version)
[![WordPress](https://img.shields.io/badge/WordPress-5.0+-green.svg)](https://wordpress.org/)
[![License](https://img.shields.io/badge/license-GPL%20v2-orange.svg)](LICENSE)

A professional, feature-rich WordPress plugin that creates an interactive AI-powered chatbot specifically designed for conservation organizations, wildlife sanctuaries, and environmental NGOs. The chatbot allows visitors to engage with endangered animals through realistic conversations, learn about conservation efforts, and take action to support wildlife protection.

## 🌟 Features

### Core Functionality
- **AI-Powered Conversations** - Realistic animal personalities using advanced AI
- **Endangered Animal Focus** - Pre-configured with 25+ endangered species
- **Organization-Specific** - Tailored responses for your conservation mission
- **Mobile Responsive** - Perfect experience on all devices
- **Multilingual Support** - Ready for international organizations

### Interactive Features
- **Animal Selection** - Users can choose which animal to chat with
- **Quick Prompts** - Pre-defined conversation starters
- **Heart/Like System** - Users can show appreciation
- **Custom Animals** - Add your own animals with stories and images
- **Real-time Updates** - Settings changes appear immediately

### Customization Options
- **Visual Design** - Fully customizable colors, fonts, and styling
- **Position Control** - Place chatbot anywhere on your site
- **Feature Toggles** - Enable/disable specific features
- **Brand Integration** - Match your organization's branding
- **Advanced Settings** - Fine-tune every aspect of the chatbot

## 📋 Table of Contents

1. [Installation](#installation)
2. [Quick Start Guide](#quick-start-guide)
3. [Configuration](#configuration)
4. [Customization](#customization)
5. [Advanced Features](#advanced-features)
6. [Troubleshooting](#troubleshooting)
7. [API Reference](#api-reference)
8. [Examples](#examples)
9. [Support](#support)
10. [Contributing](#contributing)

## 🚀 Installation

### Prerequisites
- WordPress 5.0 or higher
- PHP 7.4 or higher
- MySQL 5.6 or higher
- SSL certificate (recommended for production)
- Gemini API key (free tier available)

### Method 1: Manual Installation (Recommended)

1. **Download the Plugin**
   ```bash
   # Clone the repository
   git clone https://github.com/majidsafwaan2/conservation-chatbot-wp-version.git
   
   # Or download the latest release ZIP file
   ```

2. **Upload to WordPress**
   - Navigate to your WordPress admin panel
   - Go to **Plugins** → **Add New** → **Upload Plugin**
   - Choose the `conservation-chatbot-wordpress-plugin-v46.zip` file
   - Click **Install Now**

3. **Activate the Plugin**
   - After installation, click **Activate Plugin**
   - The plugin will automatically create necessary database tables

### Method 2: FTP Installation

1. **Extract the Plugin**
   ```bash
   unzip conservation-chatbot-wordpress-plugin-v46.zip
   ```

2. **Upload via FTP**
   - Connect to your server via FTP
   - Navigate to `/wp-content/plugins/`
   - Upload the `conservation-chatbot-wordpress-plugin-v38` folder
   - Rename it to `conservation-chatbot`

3. **Activate in WordPress**
   - Go to **Plugins** → **Installed Plugins**
   - Find "Conservation Chatbot" and click **Activate**

## 🎯 Quick Start Guide

### Step 1: Get Your API Key

1. **Visit Google AI Studio**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click **Create API Key**
   - Copy the generated API key

2. **Configure the Plugin**
   - Go to **Conservation Chatbot** → **Settings**
   - Paste your API key in the **API Key** field
   - Click **Save Changes**

### Step 2: Configure Your Organization

1. **Organization Details**
   ```
   Organization Name: Your Conservation Organization
   Organization Type: wildlife (or marine, forest, climate)
   ```

2. **Basic Settings**
   - Enable the chatbot
   - Choose display position (bottom-right recommended)
   - Select theme (nature, ocean, forest, etc.)

### Step 3: Customize Animals

1. **Select Default Animals**
   - Go to **Animals** tab
   - Choose from Bengal Tiger, African Elephant, Giant Panda
   - Enable/disable as needed

2. **Add Custom Animals** (Optional)
   - Click **Add Custom Animal**
   - Fill in name, type, story, and image
   - Enable the animal for use

### Step 4: Test Your Chatbot

1. **Visit Your Website**
   - Navigate to any page on your site
   - Look for the chatbot launcher (bottom-right by default)
   - Click to open the chat

2. **Test Conversations**
   - Try the quick prompts (Fun Fact, Threats, Help)
   - Ask questions about conservation
   - Test animal switching

## ⚙️ Configuration

### General Settings

| Setting | Description | Default | Required |
|---------|-------------|---------|----------|
| Enable Chatbot | Turn the chatbot on/off | Enabled | Yes |
| Organization Name | Your organization's name | Save the Elephants | Yes |
| Organization Type | Type of conservation work | wildlife | Yes |
| API Key | Google Gemini API key | - | Yes |

### Appearance Settings

#### Position Options
- **Bottom Right** (default) - Most common placement
- **Bottom Left** - Alternative placement
- **Top Right** - For specific layouts
- **Top Left** - For specific layouts

#### Theme Options
- **Nature** - Green and earth tones
- **Ocean** - Blue and marine colors
- **Forest** - Dark green theme
- **Desert** - Warm earth tones
- **Custom** - Your own color scheme

#### Size Controls
```css
/* Default sizes */
Chat Window: 320px × 450px
Launcher: 60px × 60px
Avatar: 40px × 40px
```

### Feature Settings

#### Available Features
- **Heart Feature** - Users can like/love animals
- **Animal Selector** - Dropdown to choose animals
- **Quick Prompts** - Pre-defined conversation starters

#### Enabling/Disabling Features
1. Go to **Conservation Chatbot** → **Settings**
2. Scroll to **Feature Settings**
3. Check/uncheck desired features
4. Click **Save Changes**

## 🎨 Customization

### Color Customization

#### Primary Colors
```css
/* Default color scheme */
Primary: #222 (Dark gray)
Secondary: #444 (Medium gray)
Accent: #222 (Dark gray)
Background: rgba(255, 255, 255, 0.2) (Semi-transparent white)
Text: #ffffff (White)
Text Light: #ffffff (White)
```

#### Custom Color Implementation
1. Go to **Appearance** tab
2. Use color pickers to select colors
3. Preview changes in real-time
4. Save when satisfied

### Typography Settings

#### Font Options
- **Font Family**: Arial, sans-serif (default)
- **Font Sizes**:
  - Small: 12px
  - Medium: 14px
  - Large: 16px

#### Custom Fonts
```css
/* Example custom font */
Font Family: 'Roboto', sans-serif;
Font Size Small: 13px;
Font Size Medium: 15px;
Font Size Large: 18px;
```

### Border Radius Customization

#### Available Controls
- **Chat Window**: 12px (default)
- **Chat Bubbles**: 18px (default)
- **Launcher**: 50px (default)
- **Input Field**: 20px (default)
- **Prompt Buttons**: 15px (default)

### Advanced Styling

#### Custom CSS (Optional)
```css
/* Example custom styles */
#conservation-chatbot-container {
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    backdrop-filter: blur(20px);
}

.conservation-chatbot-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🔧 Advanced Features

### Custom Animals

#### Adding Custom Animals
1. Go to **Animals** → **Custom Animals**
2. Click **Add Custom Animal**
3. Fill in required fields:
   - **Name**: Animal's name (e.g., "Luna")
   - **Type**: Species type (e.g., "Snow Leopard")
   - **Story**: Animal's background story
   - **Image**: URL or upload image
   - **Enabled**: Check to activate

#### Custom Animal Example
```json
{
  "name": "Luna",
  "type": "Snow Leopard",
  "story": "Luna is a majestic snow leopard rescued from illegal wildlife trade. She now serves as an ambassador for her species, helping educate visitors about the threats facing snow leopards in the wild.",
  "image": "https://example.com/luna-snow-leopard.jpg",
  "enabled": true
}
```

### Prompt Customization

#### Default Prompts
- **Prompt 1**: "Fun Fact" → "Tell me a fun fact!"
- **Prompt 2**: "Threats" → "What's your biggest threat?"
- **Prompt 3**: "Help" → "How can I help protect you?"

#### Custom Prompt Example
```json
{
  "prompt_1_text": "Climate Impact",
  "prompt_1_message": "How does climate change affect your species?",
  "prompt_2_text": "Solutions",
  "prompt_2_message": "What solutions exist for climate change?",
  "prompt_3_text": "Take Action",
  "prompt_3_message": "How can I help fight climate change?"
}
```

### API Integration

#### Gemini API Configuration
```php
// Example API configuration
$api_key = 'your-gemini-api-key';
$model = 'gemini-1.5-flash';
$max_tokens = 100;
$temperature = 0.7;
```

#### Custom API Endpoints
```php
// Example custom endpoint
add_action('wp_ajax_custom_chatbot_response', 'handle_custom_response');
add_action('wp_ajax_nopriv_custom_chatbot_response', 'handle_custom_response');

function handle_custom_response() {
    // Custom response handling
    wp_die();
}
```

## 🐛 Troubleshooting

### Common Issues

#### Issue 1: Chatbot Not Appearing
**Symptoms**: Chatbot launcher not visible on website
**Solutions**:
1. Check if plugin is activated
2. Verify chatbot is enabled in settings
3. Check page visibility settings
4. Clear browser cache
5. Check for JavaScript errors

```bash
# Check browser console for errors
F12 → Console → Look for red error messages
```

#### Issue 2: API Key Errors
**Symptoms**: "API key not configured" or "Invalid API key"
**Solutions**:
1. Verify API key is correct
2. Check API key permissions
3. Ensure API key is active
4. Test API key in Google AI Studio

```php
// Debug API key
error_log('API Key: ' . substr($api_key, 0, 10) . '...');
```

#### Issue 3: Custom Animals Not Saving
**Symptoms**: Custom animals disappear after saving
**Solutions**:
1. Check database permissions
2. Verify JSON encoding
3. Check for JavaScript errors
4. Ensure proper form submission

```javascript
// Debug custom animals
console.log('Custom animals:', cc_settings.custom_animals);
```

#### Issue 4: Features Not Updating
**Symptoms**: Feature changes don't appear on frontend
**Solutions**:
1. Clear browser cache
2. Check feature settings
3. Verify JavaScript loading
4. Test refresh functions

```javascript
// Force refresh features
window.refreshConservationChatbotFeatures();
```

#### Issue 5: Styling Issues
**Symptoms**: Chatbot looks broken or unstyled
**Solutions**:
1. Check CSS loading
2. Verify theme settings
3. Clear cache
4. Check for CSS conflicts

```css
/* Debug styling */
#conservation-chatbot-container {
    border: 2px solid red !important;
}
```

### Performance Issues

#### Slow Loading
**Causes**:
- Large images
- Too many custom animals
- Server performance
- Network issues

**Solutions**:
1. Optimize images (max 500KB)
2. Limit custom animals (max 10)
3. Enable caching
4. Use CDN for assets

#### Memory Issues
**Causes**:
- Too many animals loaded
- Large conversation history
- Inefficient queries

**Solutions**:
1. Limit animal selection
2. Clear conversation history
3. Optimize database queries
4. Monitor server resources

### Security Issues

#### API Key Exposure
**Risk**: API key visible in source code
**Solutions**:
1. Use environment variables
2. Store in database
3. Implement proper access controls
4. Regular key rotation

#### XSS Prevention
**Risk**: Malicious code injection
**Solutions**:
1. Sanitize all inputs
2. Escape outputs
3. Use nonces
4. Validate data

## 📚 API Reference

### JavaScript API

#### Global Functions
```javascript
// Refresh all chatbot components
window.refreshConservationChatbot();

// Refresh specific components
window.refreshConservationChatbotFeatures();
window.refreshConservationChatbotPrompts();

// Force refresh components
window.forceRefreshConservationChatbotFeatures();
window.forceRefreshConservationChatbotPrompts();
```

#### Settings Object
```javascript
// Access settings
window.cc_settings = {
    api_key: 'your-api-key',
    organization: 'Your Organization',
    organization_type: 'wildlife',
    animals: ['tiger', 'elephant', 'panda'],
    custom_animals: [...],
    customization: {
        position: 'bottom-right',
        theme: 'nature',
        colors: {...},
        fonts: {...},
        features: {
            enable_heart: true,
            enable_animal_selector: true,
            enable_quick_prompts: true
        },
        prompts: {...}
    }
};
```

### PHP API

#### Hooks and Filters
```php
// Add custom animals
add_filter('cc_custom_animals', 'add_custom_animals');
function add_custom_animals($animals) {
    $animals[] = [
        'name' => 'Custom Animal',
        'type' => 'Species',
        'story' => 'Story...',
        'image' => 'image-url',
        'enabled' => true
    ];
    return $animals;
}

// Modify chatbot behavior
add_action('cc_chatbot_init', 'custom_chatbot_init');
function custom_chatbot_init() {
    // Custom initialization
}

// Custom response handling
add_filter('cc_ai_response', 'modify_ai_response');
function modify_ai_response($response, $animal, $message) {
    // Modify AI response
    return $response;
}
```

#### Database Tables
```sql
-- Settings table
wp_options (cc_chatbot_settings)

-- Custom animals (stored as JSON in options)
-- No separate table needed
```

## 💡 Examples

### Example 1: Marine Conservation Organization

#### Configuration
```json
{
  "organization_name": "Ocean Guardians",
  "organization_type": "marine",
  "theme": "ocean",
  "colors": {
    "primary": "#006994",
    "secondary": "#004d6b",
    "accent": "#00b4d8"
  },
  "animals": ["dolphin", "whale", "turtle"],
  "custom_animals": [
    {
      "name": "Coral",
      "type": "Coral Reef",
      "story": "I'm a vibrant coral reef ecosystem...",
      "image": "coral-reef.jpg"
    }
  ]
}
```

### Example 2: Forest Conservation NGO

#### Configuration
```json
{
  "organization_name": "Forest Protectors",
  "organization_type": "forest",
  "theme": "forest",
  "colors": {
    "primary": "#2d5016",
    "secondary": "#4a7c59",
    "accent": "#6b8e23"
  },
  "animals": ["tiger", "elephant", "panda"],
  "features": {
    "enable_heart": true,
    "enable_animal_selector": true,
    "enable_quick_prompts": true
  }
}
```

### Example 3: Climate Change Organization

#### Configuration
```json
{
  "organization_name": "Climate Action Now",
  "organization_type": "climate",
  "theme": "custom",
  "colors": {
    "primary": "#e74c3c",
    "secondary": "#c0392b",
    "accent": "#f39c12"
  },
  "prompts": {
    "prompt_1_text": "Climate Impact",
    "prompt_1_message": "How does climate change affect your species?",
    "prompt_2_text": "Solutions",
    "prompt_2_message": "What solutions exist for climate change?",
    "prompt_3_text": "Take Action",
    "prompt_3_message": "How can I help fight climate change?"
  }
}
```

## 🆘 Support

### Getting Help

#### Documentation
- [Full Documentation](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/wiki)
- [API Reference](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/wiki/API-Reference)
- [Troubleshooting Guide](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/wiki/Troubleshooting)

#### Community Support
- [GitHub Issues](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/issues)
- [WordPress Support Forums](https://wordpress.org/support/)
- [Discord Community](https://discord.gg/conservation-chatbot)

#### Professional Support
- **Email**: support@conservation-chatbot.com
- **Response Time**: 24-48 hours
- **Priority Support**: Available for enterprise customers

### Reporting Issues

#### Before Reporting
1. Check the [troubleshooting guide](#troubleshooting)
2. Search existing [issues](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/issues)
3. Test with default settings
4. Clear cache and cookies

#### Issue Template
```markdown
**Environment**
- WordPress Version: 6.0
- PHP Version: 8.1
- Plugin Version: 46
- Theme: Twenty Twenty-Three
- Browser: Chrome 120

**Issue Description**
Detailed description of the problem...

**Steps to Reproduce**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**
What should happen...

**Actual Behavior**
What actually happens...

**Screenshots**
[Add screenshots if applicable]

**Additional Information**
Any other relevant details...
```

## 🤝 Contributing

### Development Setup

#### Prerequisites
- Node.js 16+
- PHP 8.0+
- WordPress development environment
- Git

#### Local Development
```bash
# Clone the repository
git clone https://github.com/majidsafwaan2/conservation-chatbot-wp-version.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

#### Coding Standards
- Follow WordPress coding standards
- Use PHP_CodeSniffer
- Write unit tests
- Document all functions

#### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Update documentation
6. Submit pull request

### Testing

#### Manual Testing
1. Test all features
2. Verify responsive design
3. Check browser compatibility
4. Test performance

#### Automated Testing
```bash
# Run tests
npm test

# Run specific tests
npm test -- --grep "feature name"
```

## 📄 License

This project is licensed under the GPL v2 License - see the [LICENSE](LICENSE) file for details.

### License Terms
- **Free for personal use**
- **Commercial use allowed**
- **Modification permitted**
- **Distribution allowed**
- **Attribution required**

## 🙏 Acknowledgments

- **Google AI** - For providing the Gemini API
- **WordPress Community** - For the amazing platform
- **Conservation Organizations** - For inspiration and feedback
- **Open Source Contributors** - For making this possible

## 📞 Contact

- **Website**: [https://conservation-chatbot.com](https://conservation-chatbot.com)
- **Email**: info@conservation-chatbot.com
- **Twitter**: [@ConservationBot](https://twitter.com/ConservationBot)
- **LinkedIn**: [Conservation Chatbot](https://linkedin.com/company/conservation-chatbot)

---

**Made with ❤️ for conservation organizations worldwide**

*This plugin is designed to help conservation organizations engage with their audience and raise awareness about endangered species and environmental protection.*