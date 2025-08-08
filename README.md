# JK Community Farm Website

A modern, responsive website for JK Community Farm - a 501(c)(3) nonprofit organization dedicated to providing fresh, organic produce to families in need.

## 🌱 About

JK Community Farm is a nonprofit organization that grows healthy food and gives it to people who need it. Our mission is to provide fresh, organic produce to families in need throughout the Washington, D.C. metropolitan area.

## ✨ Features

- **Modern Design**: Clean, professional design with a focus on accessibility and user experience
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Chatbot**: AI-powered chatbot with farm-specific characters and knowledge
- **Contact Forms**: Functional contact and donation forms
- **News Section**: Latest news and updates from the farm
- **Volunteer Information**: Easy access to volunteer opportunities and programs
- **Educational Content**: Information about sustainable agriculture and community programs

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/majidsafwaan2/testdeploy-ecovillage.git
cd testdeploy-ecovillage
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
jk-community-farm/
├── index.html              # Main homepage
├── styles.css              # Main stylesheet
├── main.js                 # Main JavaScript functionality
├── chatbot.js              # AI chatbot implementation
├── images/                 # Image assets
├── pages/                  # Additional pages
├── vercel.json            # Vercel deployment configuration
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## 🤖 Chatbot Features

The website includes an AI-powered chatbot with four specialized characters:

1. **Sarah (Farm Manager)**: Expert in farm operations and sustainable agriculture
2. **Mike (Volunteer Coordinator)**: Helps with volunteer opportunities and group activities
3. **Lisa (Education Specialist)**: Provides information about educational programs
4. **Emma (Community Outreach)**: Shares information about community impact and partnerships

### Chatbot Capabilities

- Character selection dropdown
- Real-time AI responses
- Farm-specific knowledge base
- Typing indicators
- Message history
- Mobile-responsive design

## 🎨 Design System

### Colors
- Primary: `#2E7D32` (Dark Green)
- Secondary: `#4CAF50` (Green)
- Accent: `#8BC34A` (Light Green)
- Text: `#333` (Dark Gray)
- Background: `#f8f9fa` (Light Gray)

### Typography
- Font Family: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Components
- Buttons (Primary, Secondary, Outline)
- Cards (News, Involvement, Donation)
- Forms (Contact, Newsletter)
- Navigation (Header, Footer)
- Statistics (Impact numbers)

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel --prod
```

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the contents to your web server

## 🔧 Configuration

### Environment Variables

The chatbot uses the following environment variables:
- `GEMINI_API_KEY`: Google Gemini API key for AI responses

### Customization

1. **Colors**: Update CSS variables in `styles.css`
2. **Content**: Modify HTML content in `index.html`
3. **Chatbot**: Customize characters in `chatbot.js`
4. **Images**: Replace placeholder images with actual farm photos

## 📊 Performance

- Optimized images with lazy loading
- Minified CSS and JavaScript
- Fast loading times
- SEO optimized
- Accessibility compliant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for high-quality images
- [Font Awesome](https://fontawesome.com) for icons
- [Google Fonts](https://fonts.google.com) for typography
- [Vercel](https://vercel.com) for hosting and deployment

## 📞 Contact

- **Website**: [jkcommunityfarm.org](https://jkcommunityfarm.org)
- **Email**: info@jkcommunityfarm.org
- **Phone**: (555) 123-4567
- **Address**: 123 Farm Road, Loudoun County, VA 20175

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/majidsafwaan2/testdeploy-ecovillage/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Made with ❤️ for JK Community Farm**