# Publishing Guide for Conservation Chatbot

This guide will help you publish the Conservation Chatbot library to npm and GitHub.

## 📦 NPM Publishing

### Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **Login**: Run `npm login` in your terminal
3. **Unique Package Name**: Ensure the package name is unique (check if `conservation-chatbot` is available)

### Publishing Steps

1. **Update Version** (if needed):
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

2. **Test the Build**:
   ```bash
   npm run test
   npm run build
   ```

3. **Publish to NPM**:
   ```bash
   npm publish
   ```

### Automated Publishing

The GitHub workflow (`.github/workflows/publish.yml`) will automatically publish to npm when you create a new release on GitHub.

## 🚀 GitHub Setup

### 1. Create Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `conservation-chatbot`
3. Make it public
4. Don't initialize with README (we already have one)

### 2. Update Repository URLs

Update the `package.json` with your actual GitHub username:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/conservation-chatbot.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/conservation-chatbot/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/conservation-chatbot#readme"
}
```

### 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Conservation Chatbot library"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/conservation-chatbot.git
git push -u origin main
```

### 4. Set up GitHub Pages

1. Go to repository Settings > Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages`
4. Deploy the demo site:
   ```bash
   npm run deploy
   ```

### 5. Create First Release

1. Go to repository > Releases
2. Click "Create a new release"
3. Tag: `v1.0.0`
4. Title: `v1.0.0 - Initial Release`
5. Description: Copy from CHANGELOG.md
6. Publish release

## 🔧 Configuration Checklist

### Before Publishing

- [ ] Update `package.json` with your GitHub username
- [ ] Test the library: `npm run test`
- [ ] Build the library: `npm run build`
- [ ] Check that all files are included in the package
- [ ] Verify the README.md is complete
- [ ] Test the demo locally: `npm run dev`

### Package Contents

The published package will include:
- `dist/` - Built library files
- `src/animals/` - Animal data and utilities
- `src/styles/` - Styling utilities
- `README.md` - Documentation
- `CHANGELOG.md` - Version history
- `package.json` - Package metadata

## 🎯 Usage Examples

### For Users

Once published, users can install and use the library:

```bash
npm install conservation-chatbot
```

```javascript
import { initConservationChatbot } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-gemini-api-key'
});
```

### Customization Examples

```javascript
// Nature theme
import { initConservationChatbot, themePresets } from 'conservation-chatbot';

const chatbot = initConservationChatbot({
  apiKey: 'your-api-key',
  styles: themePresets.nature
});
```

```javascript
// Custom animals
import { initConservationChatbot, createAnimal } from 'conservation-chatbot';

const customAnimals = [
  createAnimal({
    id: 'local-wolf',
    name: 'Shadow',
    species: 'Gray Wolf',
    // ... other properties
  })
];

const chatbot = initConservationChatbot({
  apiKey: 'your-api-key',
  animals: customAnimals
});
```

## 🔒 Security Notes

### API Key Security

- **Development**: API key can be in client-side code for testing
- **Production**: Use environment variables or backend proxy
- **Documentation**: Include security best practices in README

### Environment Variables

For production, users should:
1. Store API key in environment variables
2. Use backend proxy for API calls
3. Implement rate limiting

## 📈 Post-Publishing

### Monitor Usage

- Check npm download statistics
- Monitor GitHub repository activity
- Respond to issues and pull requests

### Updates

For future updates:
1. Make changes to the code
2. Update CHANGELOG.md
3. Update version in package.json
4. Create new GitHub release
5. The workflow will auto-publish to npm

## 🆘 Troubleshooting

### Common Issues

1. **Package name taken**: Choose a different name or scope
2. **Build fails**: Check vite.config.js and dependencies
3. **Publish fails**: Ensure you're logged in to npm
4. **GitHub Pages not working**: Check gh-pages branch exists

### Support

- Create issues on GitHub for bugs
- Use GitHub Discussions for questions
- Update documentation as needed

---

## 🎉 Success!

Once published, your library will be available at:
- **NPM**: `https://www.npmjs.com/package/conservation-chatbot`
- **GitHub**: `https://github.com/YOUR_USERNAME/conservation-chatbot`
- **Demo**: `https://YOUR_USERNAME.github.io/conservation-chatbot/`

Users can now easily integrate conservation chatbots into their websites with just a few lines of code! 