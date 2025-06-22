import { defineConfig } from 'vite';
import path from 'path'; // Import 'path' module

// Get the current working directory (project root)
const projectRoot = path.resolve(__dirname);

export default defineConfig({
  // --- ADD THIS LINE FOR GITHUB PAGES ---
  base: '/conservation-chatbot/', // Replace 'conservation-chatbot' with your actual GitHub repository name
  // --- END ADDITION ---
  build: {
    lib: {
      entry: './src/index.js', // Your main entry file for the npm package
      name: 'ConservationChatbot', // Global variable name if used in a non-module context
      fileName: (format) => `conservation-chatbot.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: ['openai'], // Ensure 'openai' is externalized if you kept it
      output: {
        globals: {
          'openai': 'OpenAI' // How the global object for the external dependency is named
        }
      }
    }
  },
  // For development, we'll want to serve the examples folder
  root: '.', // Serve from the current directory (project root)
  server: {
    open: '/examples/vanilla-demo.html' // Automatically open your demo file
  },
  resolve: {
    alias: {
      // When 'conservation-chatbot' is imported, point to your source directory
      'conservation-chatbot': path.resolve(projectRoot, 'src'),
    }
  }
});