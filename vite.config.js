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
    // Note: 'build.lib' configuration is REMOVED here.
    // This config is now focused on building the demo site for GitHub Pages.
    // If you need to build the npm library package, that would be a separate Vite config or command.
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