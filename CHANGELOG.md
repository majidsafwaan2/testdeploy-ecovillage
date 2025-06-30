# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2024-12-30

### Added
- **Custom Animal Photos**: NGOs can now provide their own photos for each animal
- **Photo Requirements Documentation**: Clear guidelines for custom photo formats and sizes
- **Unsplash Integration**: High-quality default animal photos from Unsplash API

### Changed
- **UI Improvements**: 
  - Reduced heart button height and added clip-path to remove bottom sliver
  - Moved input field 2px to the right for better alignment
  - Updated all animal photos to use relevant Unsplash images instead of random placeholders
- **Documentation**: Added comprehensive photo customization guide in NGO Setup Guide

### Fixed
- **Photo Quality**: Replaced all placeholder images with high-quality, relevant animal photos
- **UI Alignment**: Improved input field positioning for better visual balance

## [1.1.1] - 2024-12-30

### Changed
- **Animal Labels**: Updated to use specific species names (e.g., "Bengal Tiger" instead of "Tiger")
- **Conservation Focus**: Removed organization names from section headings, keeping only conservation focus areas
- **Documentation**: Updated README and NGO Setup Guide to reflect new naming conventions

## [1.1.0] - 2024-12-30

### Added
- **Expanded Animal Collection**: Increased from 9 to 27 animals organized by conservation focus areas
- **New Conservation Focus Areas**: Added Bird Conservation, Primate Conservation, Big Cat Conservation, and Marine Mammal Conservation
- **Additional Animals**: Added 18 new animals including Bald Eagle, Snowy Owl, Chimpanzee, African Lion, Sea Otter, and more
- **Comprehensive Documentation**: Updated all documentation to reflect the expanded animal collection

### Changed
- **Animal Organization**: Reorganized animals into 8 distinct conservation focus areas
- **Documentation**: Updated README, NGO Setup Guide, examples, and tests to include all new animals

## [1.0.0] - 2024-12-30

### Added
- **Initial Release**: Complete conservation chatbot library
- **27 Endangered Animals**: Comprehensive collection with realistic personalities and conservation information
- **Organization-Specific AI**: Tailored responses based on conservation focus areas
- **Mantine-Style Styling API**: Flexible CSS customization system
- **Theme Presets**: Pre-built themes for common use cases
- **Dynamic Animal Management**: Add, remove, and customize animals at runtime
- **Professional Documentation**: Complete setup guides and API documentation
- **NPM Package**: Ready-to-use library with automated publishing
- **GitHub Integration**: Full repository with workflows and documentation

### Features
- **Animals Included**:
  - Raja (Bengal Tiger) - Endangered
  - Shelly (Sea Turtle) - Endangered
  - Kibo (Mountain Gorilla) - Endangered
  - Nuru (African Elephant) - Endangered
  - Tula (Polar Bear) - Vulnerable
  - Bima (Bornean Orangutan) - Critically Endangered
  - Zola (Black Rhino) - Critically Endangered
  - Mei (Giant Panda) - Vulnerable
  - Luna (Vaquita) - Critically Endangered

- **Customization Options**:
  - Colors (primary, secondary, accent, background, text)
  - Fonts (family, sizes)
  - Border radius (small, medium, large, round)
  - Theme presets
  - Custom animals creation

- **API Features**:
  - `initConservationChatbot()` - Main initialization
  - `createAnimal()` - Create custom animals
  - `createStyles()` - Mantine-style theming
  - Dynamic animal management
  - Style updates at runtime

### Technical
- Built with Google Gemini AI
- Vanilla JavaScript (no framework dependencies)
- ES6 modules support
- UMD and ES module builds
- CSS-in-JS styling system
- Glass morphism UI design

### Documentation
- Comprehensive README with examples
- API documentation
- Security best practices
- Production setup guide
- Contributing guidelines

---

## [Unreleased]

### Planned
- React component wrapper
- Vue.js component wrapper
- Additional animal species
- Multi-language support
- Advanced analytics dashboard
- A/B testing capabilities
- Integration with popular CMS platforms 