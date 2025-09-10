# Mr. Burritos - Mexican Restaurant AR/3D Menu App

A modern Mexican restaurant web application featuring interactive 3D food models and AR "View in Your Space" functionality. Built with React, Express, and Three.js.

## 🌮 Features

- **70 Authentic Menu Items** across 11 categories
- **Interactive 3D Models** for dishes with GLB support
- **AR View in Your Space** functionality
- **Category-specific Backgrounds** with instant loading
- **Responsive Design** optimized for all devices
- **Fast Performance** with aggressive preloading
- **Modern UI** with Tailwind CSS and shadcn/ui

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for development and building
- Tailwind CSS + shadcn/ui components
- Framer Motion for animations
- Three.js for 3D model rendering
- TanStack Query for server state management
- Wouter for lightweight routing

### Backend  
- Express.js with TypeScript
- In-memory storage (ready for database)
- RESTful API design
- Session-based cart management

### Assets
- 30+ 3D models (.glb format)
- High-quality food background images
- Optimized for fast loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd mr-burritos-github
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open http://localhost:5000 in your browser

## 📁 Project Structure

```
mr-burritos-github/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── data/          # 3D model mappings
│   │   └── lib/           # Utilities and helpers
│   └── index.html
├── server/                # Backend Express application  
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data layer
├── shared/               # Shared types and schemas
├── attached_assets/      # Images and 3D models
└── package.json
```

## 🎯 Key Components

### 3D Model Integration
- Perfect name-based mapping of GLB models to menu items
- Support for shared models (using "And" / "Or" naming)
- Optimized loading with proper error handling

### Performance Optimizations
- Image preloading for instant category switching
- Video preloading for smooth home page experience  
- Efficient 3D model loading
- Browser caching strategies

### Menu Categories
- **Tacos** - Traditional and specialty tacos
- **Burritos** - Various sizes and styles
- **Burgers** - Grilled and specialty burgers
- **Favorites** - Popular customer choices
- **Healthy Corner** - Nutritious options
- **Vegetarian** - Plant-based dishes
- **Sides** - Appetizers and sides
- **Sauces** - Various dipping sauces
- **Kids Meals** - Child-friendly options
- **Drinks** - Beverages and refreshments
- **Offers** - Special deals and combos

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:push` - Update database schema

## 📱 Deployment

The app is optimized for deployment on Replit or any Node.js hosting platform. All assets are included and paths are configured for easy deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for authentic Mexican dining experiences