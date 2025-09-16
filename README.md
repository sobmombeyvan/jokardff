# Jokard React Demo

A React demo application for Jokard - Digital Business Card Platform, converted from the original Vue.js pages.

## Features

- **Home Page**: Welcome page with demo notice and navigation
- **Authentication**: Login page with email and Google OAuth simulation
- **Dashboard**: Analytics dashboard with statistics and charts
- **Business Cards**: Management interface for digital business cards
- **Card Builder**: Multi-step wizard for creating business cards
- **Contact**: Contact form with various inquiry types
- **Pricing**: Pricing plans with feature comparison
- **Help**: Help center with FAQ and support options

## Pages Included

### Public Pages
- `/` - Home page with welcome message
- `/login` - User authentication
- `/contact` - Contact form
- `/pricing` - Pricing plans
- `/help` - Help center and FAQ
- `/test` - Simple test page

### Dashboard Pages
- `/dashboard` - Main dashboard with analytics
- `/dashboard/bcards` - Business cards management
- `/dashboard/bcards/add` - Business card creation wizard

## Technology Stack

- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Custom UI Components** - Reusable component library

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   └── ui/           # Reusable UI components
├── lib/
│   └── utils.js      # Utility functions
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── BusinessCards.jsx
│   ├── AddBusinessCard.jsx
│   ├── Contact.jsx
│   ├── Pricing.jsx
│   ├── Help.jsx
│   └── Test.jsx
├── App.jsx           # Main app component with routing
├── index.js          # App entry point
└── index.css         # Global styles
```

## Features Demonstrated

### UI Components
- Custom Button, Card, Input, Label, Select, and Textarea components
- Responsive design with Tailwind CSS
- Consistent styling and theming

### Navigation
- React Router for client-side routing
- Breadcrumb navigation
- Responsive navigation patterns

### Business Card Builder
- Multi-step wizard interface
- Real-time preview
- Form validation and state management
- Tab-based navigation

### Dashboard
- Statistics cards with mock data
- Chart placeholders (ready for integration)
- Responsive grid layouts

## Customization

The app uses CSS custom properties for theming, making it easy to customize colors and styling:

```css
:root {
  --jokard-primary-color: #042418;
  --jokard-secondary-color: #000000;
  --jokard-card-border-radius: 16px;
  /* ... more custom properties */
}
```

## Notes

- This is a demo application with mock data
- Authentication is simulated (no real backend integration)
- Charts and analytics are placeholder implementations
- All forms include basic validation but no backend submission
- The app is fully responsive and works on mobile devices

## License

This project is for demonstration purposes only.
