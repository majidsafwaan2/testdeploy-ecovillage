import { defineConfig } from 'vite';
import path from 'path';

// Get the current working directory (project root)
const projectRoot = path.resolve(__dirname);

export default defineConfig({
  // Base URL for deployment (important for GitHub Pages subdirectories)
  base: '/conservation-chatbot/', // <<< CONFIRM THIS MATCHES YOUR REPOSITORY NAME

  // Configure Vite to build the 'examples' directory as the static site
  root: 'examples', // Tells Vite to look for source files, including index.html, inside the 'examples' directory
  build: {
    outDir: '../dist', // Output compiled files to the 'dist' folder in the project root
    emptyOutDir: true, // Clear the 'dist' folder before each build
    
    // Library build configuration for npm
    lib: {
      entry: path.resolve(projectRoot, 'src/index.js'),
      name: 'ConservationChatbot',
      fileName: (format) => `conservation-chatbot.${format}.js`,
      formats: ['es', 'umd']
    },
    
    rollupOptions: {
      // External dependencies that should not be bundled
      external: ['@google/generative-ai'],
      output: {
        // Global variables for UMD build
        globals: {
          '@google/generative-ai': 'GoogleGenerativeAI'
        }
      }
    }
  },

  // Configuration for the development server
  server: {
    open: 'index.html' // Automatically opens 'examples/index.html' when you run 'npm run dev'
  },

  // Alias for resolving your own package during development and building the example
  resolve: {
    alias: {
      // This alias allows 'import { ... } from 'conservation-chatbot''
      // within your examples/index.html to correctly point to your source files in 'src/'.
      'conservation-chatbot': path.resolve(projectRoot, 'src'),
    }
  }
});