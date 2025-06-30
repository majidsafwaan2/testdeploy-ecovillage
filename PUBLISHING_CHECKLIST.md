# NPM Publishing Checklist

**Complete checklist for publishing the Conservation Chatbot to npm**

## Pre-Publishing Checklist

### 1. Package Configuration
- [ ] **Package name is available**: Check `npm search conservation-chatbot`
- [ ] **Version is correct**: Update in `package.json` if needed
- [ ] **Description is clear**: "Interactive AI chatbot for endangered animals - Perfect for NGOs"
- [ ] **Keywords are relevant**: `chatbot`, `conservation`, `endangered-animals`, `ngo`, `ai`, `gemini`
- [ ] **Author information**: Your name and email
- [ ] **License**: MIT (already set)
- [ ] **Repository**: GitHub URL is correct
- [ ] **Homepage**: Points to GitHub README

### 2. Build & Test
- [ ] **Build the library**: `npm run build`
- [ ] **Test the build**: `npm run test`
- [ ] **Check bundle size**: Should be under 100KB
- [ ] **Verify exports**: All functions are properly exported
- [ ] **Test in browser**: Load the example page
- [ ] **Check for errors**: No console errors

### 3. Documentation
- [ ] **README.md**: Complete and professional
- [ ] **NGO_SETUP_GUIDE.md**: Comprehensive setup guide
- [ ] **CHANGELOG.md**: Updated with current version
- [ ] **Examples work**: `examples/index.html` loads correctly
- [ ] **API documentation**: All functions documented

### 4. Files to Include
- [ ] **Source files**: `src/` directory
- [ ] **Built files**: `dist/` directory (after build)
- [ ] **Type definitions**: If using TypeScript
- [ ] **Examples**: `examples/` directory
- [ ] **Documentation**: README, guides, changelog
- [ ] **License**: LICENSE file

### 5. Files to Exclude
- [ ] **Development files**: `.gitignore` patterns
- [ ] **Test files**: `test/` directory (unless needed)
- [ ] **Build tools**: `vite.config.js`, `package-lock.json`
- [ ] **Environment files**: `.env`, `.env.local`
- [ ] **IDE files**: `.vscode/`, `.idea/`

## Publishing Steps

### Step 1: Prepare Environment
```bash
# 1. Create npm account (if you don't have one)
# Go to https://www.npmjs.com/signup

# 2. Login to npm
npm login

# 3. Check if you're logged in
npm whoami
```

### Step 2: Check Package Name
```bash
# Check if package name is available
npm search conservation-chatbot

# If taken, update package.json with scoped name
# "name": "@your-username/conservation-chatbot"
```

### Step 3: Build and Test
```bash
# Install dependencies
npm install

# Build the library
npm run build

# Test the build
npm run test

# Check what will be published
npm pack --dry-run
```

### Step 4: Publish
```bash
# Publish to npm
npm publish

# For scoped packages (if using @username/package-name)
npm publish --access public
```

### Step 5: Verify Publication
```bash
# Check if published
npm view conservation-chatbot

# Install and test
npm install conservation-chatbot
```

## Post-Publishing Checklist

### 1. Verify Publication
- [ ] **Package appears on npm**: https://www.npmjs.com/package/conservation-chatbot
- [ ] **README displays correctly**: Check npm page
- [ ] **Version is correct**: Matches package.json
- [ ] **Dependencies are listed**: All required packages shown

### 2. Test Installation
```bash
# Create test directory
mkdir test-install
cd test-install

# Initialize new project
npm init -y

# Install your package
npm install conservation-chatbot

# Test import
node -e "console.log(require('conservation-chatbot'))"
```

### 3. Update Documentation
- [ ] **GitHub README**: Add npm badge
- [ ] **GitHub releases**: Create release with changelog
- [ ] **Update examples**: Point to published package
- [ ] **Update guides**: Reference published package

### 4. Marketing & Promotion
- [ ] **GitHub repository**: Update description and topics
- [ ] **Social media**: Announce the release
- [ ] **Conservation communities**: Share with NGOs
- [ ] **Developer communities**: Share on relevant platforms

## Troubleshooting

### Common Issues

1. **Package name taken**:
   ```bash
   # Use scoped package
   npm init --scope=@your-username
   # or
   # Choose different name: conservation-chatbot-ngos
   ```

2. **Build errors**:
   ```bash
   # Check for missing dependencies
   npm install
   
   # Clear cache
   npm cache clean --force
   
   # Rebuild
   npm run build
   ```

3. **Publish errors**:
   ```bash
   # Check if logged in
   npm whoami
   
   # Re-login if needed
   npm logout
   npm login
   ```

4. **Version conflicts**:
   ```bash
   # Update version
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

## Success Metrics

After publishing, track these metrics:

- **Downloads**: `npm view conservation-chatbot downloads`
- **GitHub stars**: Repository popularity
- **Issues**: User feedback and bugs
- **Forks**: Community interest
- **Usage**: Organizations implementing the chatbot

## Next Steps

1. **Monitor feedback**: Check GitHub issues and npm reviews
2. **Update regularly**: Keep the package current
3. **Community engagement**: Respond to questions and issues
4. **Feature requests**: Consider user suggestions
5. **Documentation updates**: Keep guides current

## Support

If you encounter issues:

1. **Check npm documentation**: https://docs.npmjs.com/
2. **GitHub issues**: Create issue in your repository
3. **npm support**: https://www.npmjs.com/support
4. **Community forums**: Stack Overflow, Reddit

---

**Ready to publish?** Run through this checklist and you'll be ready to share your conservation chatbot with the world! 