# Agrim Jaimini - Portfolio

A modern, responsive portfolio website built with React 19, TypeScript, and Tailwind CSS. Features smooth animations, dark/light mode, and interactive elements.

## ✨ Features

- **Modern Tech Stack**: React 19, TypeScript, Tailwind CSS
- **Smooth Animations**: Framer Motion powered animations
- **Theme Support**: Dark/Light mode with system preference detection
- **Interactive Elements**: Custom cursor, parallax effects, scroll animations
- **Performance Optimized**: Lazy loading, skeleton screens, optimized images
- **Responsive Design**: Mobile-first approach with modern breakpoints
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Error Handling**: Graceful error boundaries with fallback UI
- **Analytics Ready**: Built-in tracking for user interactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/agrimjaimini/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Building for Production

```bash
npm run build
```

### Deployment

The portfolio is configured for GitHub Pages deployment:

```bash
npm run deploy
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Forms**: Formik, Yup validation
- **Email**: EmailJS
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── InteractiveCursor.tsx
│   ├── LoadingSkeleton.tsx
│   ├── ParallaxSection.tsx
│   ├── ScrollAnimations.tsx
│   ├── ScrollProgress.tsx
│   ├── ThemeToggle.tsx
│   └── Timeline.tsx
├── sections/           # Page sections
│   ├── Contact.tsx
│   ├── Education.tsx
│   ├── Experience.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── data/              # Static data
│   ├── education.ts
│   ├── experience.ts
│   ├── projects.ts
│   └── skills.ts
├── utils/             # Utility functions
│   └── analytics.ts
├── App.tsx           # Main app component
└── index.tsx         # Entry point
```

## 🎨 Customization

### Colors & Themes

The portfolio uses CSS variables for easy theming. Update the colors in `src/index.css`:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  /* ... other variables */
}

.dark {
  --bg-primary: #0a0a0a;
  --text-primary: #ffffff;
  /* ... other variables */
}
```

### Content

Update the content in the `src/data/` files:
- `projects.ts` - Your projects
- `experience.ts` - Work experience
- `education.ts` - Education history
- `skills.ts` - Technical skills

### Styling

The portfolio uses Tailwind CSS with custom utilities. Check `tailwind.config.js` for:
- Custom colors
- Animations
- Glass morphism effects
- Responsive breakpoints

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Focus indicators

## 🔧 Performance

- Lazy loading for images
- Skeleton screens for loading states
- Optimized animations
- Minimal bundle size
- Efficient re-renders

## 📊 Analytics

The portfolio includes built-in analytics tracking:
- Page views
- Project interactions
- Contact form submissions
- Theme changes
- Scroll depth

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [React Icons](https://react-icons.github.io/react-icons/) for additional icons

---

Built with ❤️ by Agrim Jaimini
