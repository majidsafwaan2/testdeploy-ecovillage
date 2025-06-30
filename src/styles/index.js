/**
 * @fileoverview Style customization utilities for the conservation chatbot.
 * Provides CSS-in-JS approach similar to Mantine's styles API.
 */

// Default theme configuration
export const defaultTheme = {
  colors: {
    primary: '#222',
    secondary: '#444',
    accent: '#ff69b4',
    background: 'rgba(255, 255, 255, 0.2)',
    text: '#333',
    textLight: 'white'
  },
  fonts: {
    family: 'Arial, sans-serif',
    size: {
      small: '13px',
      medium: '14px',
      large: '16px'
    }
  },
  borderRadius: {
    small: '6px',
    medium: '12px',
    large: '18px',
    round: '50%'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '10px',
    lg: '20px'
  }
};

/**
 * Creates custom CSS styles that can override the default theme
 * @param {Object} customStyles - Custom style overrides
 * @returns {string} CSS string with custom styles
 */
export const createCustomStyles = (customStyles = {}) => {
  const theme = { ...defaultTheme, ...customStyles };
  
  return `
    /* Custom styles for conservation chatbot */
    #conservation-chatbot-container {
        font-family: ${theme.fonts?.family || defaultTheme.fonts.family};
        border-radius: ${theme.borderRadius?.large || defaultTheme.borderRadius.large};
        background: ${theme.colors?.background || defaultTheme.colors.background};
    }

    #conservation-chatbot-launcher {
        background-color: ${theme.colors?.primary || defaultTheme.colors.primary};
        border-radius: ${theme.borderRadius?.round || defaultTheme.borderRadius.round};
    }

    .conservation-chatbot-header {
        background-color: ${theme.colors?.primary || defaultTheme.colors.primary};
        border-top-left-radius: ${theme.borderRadius?.medium || defaultTheme.borderRadius.medium};
        border-top-right-radius: ${theme.borderRadius?.medium || defaultTheme.borderRadius.medium};
        color: ${theme.colors?.textLight || defaultTheme.colors.textLight};
    }

    .conservation-chatbot-message.user {
        background-color: ${theme.colors?.primary || defaultTheme.colors.primary};
        color: ${theme.colors?.textLight || defaultTheme.colors.textLight};
        border-bottom-right-radius: ${theme.borderRadius?.small || defaultTheme.borderRadius.small};
    }

    .conservation-chatbot-send-button {
        background-color: ${theme.colors?.primary || defaultTheme.colors.primary};
        color: ${theme.colors?.textLight || defaultTheme.colors.textLight};
        border-radius: ${theme.borderRadius?.large || defaultTheme.borderRadius.large};
        font-size: ${theme.fonts?.size?.medium || defaultTheme.fonts.size.medium};
    }

    .conservation-chatbot-send-button:hover {
        background-color: ${theme.colors?.secondary || defaultTheme.colors.secondary};
    }

    .conservation-chatbot-default-prompts .default-prompt-btn {
        background-color: ${theme.colors?.secondary || defaultTheme.colors.secondary};
        color: ${theme.colors?.textLight || defaultTheme.colors.textLight};
        border-radius: ${theme.borderRadius?.large || defaultTheme.borderRadius.large};
        font-size: ${theme.fonts?.size?.small || defaultTheme.fonts.size.small};
    }

    .conservation-chatbot-default-prompts .default-prompt-btn:hover {
        background-color: ${theme.colors?.primary || defaultTheme.colors.primary};
    }

    .conservation-chatbot-heart-button {
        color: ${theme.colors?.textLight || defaultTheme.colors.textLight};
    }

    .conservation-chatbot-heart-button:hover {
        color: ${theme.colors?.accent || defaultTheme.colors.accent};
    }
  `;
};

/**
 * Mantine-style styles API for component customization
 * @param {Object} styles - Style overrides for specific components
 * @returns {Object} Style object with CSS classes
 */
export const createStyles = (styles = {}) => {
  const styleId = `conservation-chatbot-custom-${Date.now()}`;
  
  // Inject custom styles
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = createCustomStyles(styles);
    document.head.appendChild(styleElement);
  }
  
  return {
    // Return class names that can be applied to elements
    container: 'conservation-chatbot-container',
    launcher: 'conservation-chatbot-launcher',
    header: 'conservation-chatbot-header',
    messages: 'conservation-chatbot-messages',
    input: 'conservation-chatbot-input',
    sendButton: 'conservation-chatbot-send-button',
    promptButtons: 'conservation-chatbot-default-prompts',
    heartButton: 'conservation-chatbot-heart-button',
    closeButton: 'conservation-chatbot-close-button',
    
    // Method to remove custom styles
    remove: () => {
      if (typeof document !== 'undefined') {
        const styleElement = document.getElementById(styleId);
        if (styleElement) {
          styleElement.remove();
        }
      }
    }
  };
};

/**
 * Quick theme presets for common use cases
 */
export const themePresets = {
  dark: {
    colors: {
      primary: '#1a1a1a',
      secondary: '#333',
      background: 'rgba(0, 0, 0, 0.8)',
      text: '#fff',
      textLight: '#fff'
    }
  },
  light: {
    colors: {
      primary: '#f8f9fa',
      secondary: '#e9ecef',
      background: 'rgba(255, 255, 255, 0.9)',
      text: '#212529',
      textLight: '#495057'
    }
  },
  nature: {
    colors: {
      primary: '#2d5016',
      secondary: '#4a7c59',
      background: 'rgba(76, 175, 80, 0.1)',
      accent: '#8bc34a'
    }
  },
  ocean: {
    colors: {
      primary: '#1976d2',
      secondary: '#42a5f5',
      background: 'rgba(33, 150, 243, 0.1)',
      accent: '#64b5f6'
    }
  }
};

export default {
  createCustomStyles,
  createStyles,
  themePresets,
  defaultTheme
}; 