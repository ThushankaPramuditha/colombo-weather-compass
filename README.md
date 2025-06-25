
# Colombo Weather Compass 🌤️

A beautiful, responsive weather application that displays real-time weather information for Colombo, Sri Lanka.

## Features

- 🌡️ **Current Temperature** - Real-time temperature display
- 💧 **Humidity Levels** - Current humidity percentage
- 💨 **Wind Speed** - Wind speed in km/h
- ☀️ **UV Index** - Current UV radiation levels
- 👁️ **Visibility** - Current visibility distance
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Beautiful UI** - Modern gradient design with weather-themed colors
- ⚡ **Real-time Updates** - Data refreshes every 5 minutes
- 🔄 **Loading States** - Smooth loading animations

## Quick Start

1. **Get a Weather API Key**
   - Sign up for a free account at [WeatherAPI.com](https://weatherapi.com)
   - Get your free API key from the dashboard

2. **Configure the API Key**
   - Open `src/pages/Index.tsx`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```typescript
   const WEATHER_API_KEY = 'your_actual_api_key_here';
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment

This project is built with Vite and can be easily deployed to:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

### Deploying to Vercel

1. Connect your GitHub repository to Vercel
2. Add your `WEATHER_API_KEY` as an environment variable in Vercel dashboard
3. Deploy automatically on every push

### Environment Variables for Production

For production deployment, it's recommended to use environment variables instead of hardcoding the API key:

```typescript
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'YOUR_API_KEY_HERE';
```

Then set `VITE_WEATHER_API_KEY` in your hosting platform's environment variables.

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible UI components
- **TanStack Query** - Powerful data fetching and caching
- **Lucide React** - Beautiful, customizable icons
- **WeatherAPI** - Reliable weather data source

## API Information

This application uses the [WeatherAPI.com](https://weatherapi.com) free tier which provides:
- 1 million API calls per month
- Current weather data
- No credit card required for free tier
- Real-time weather updates

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   └── Index.tsx       # Main weather display page
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## Demo Mode

The application includes a demo mode that displays sample weather data when:
- No API key is configured
- API requests fail
- Network connectivity issues occur

This ensures the application remains functional for demonstration purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Live Demo

[View Live Demo](https://colombo-weather-compass.vercel.app/) *(Replace with your actual deployment URL)*

---

