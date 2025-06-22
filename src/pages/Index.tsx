
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

// Weather API configuration
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Users will need to replace this
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';

interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    uv: number;
    vis_km: number;
  };
}

const fetchWeatherData = async (): Promise<WeatherData> => {
  const response = await fetch(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=Colombo,Sri Lanka&aqi=no`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
};

const WeatherIcon = ({ condition }: { condition: string }) => {
  const iconClass = "w-16 h-16 text-white drop-shadow-lg";
  
  if (condition.toLowerCase().includes('sunny') || condition.toLowerCase().includes('clear')) {
    return <Sun className={iconClass} />;
  } else if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('shower')) {
    return <CloudRain className={iconClass} />;
  } else if (condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast')) {
    return <Cloud className={iconClass} />;
  } else {
    return <Sun className={iconClass} />;
  }
};

const WeatherCard = ({ data }: { data: WeatherData }) => {
  const { toast } = useToast();
  
  useEffect(() => {
    console.log('Weather data loaded:', data);
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Main Weather Card */}
      <Card className="p-8 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 border-none shadow-2xl">
        <div className="text-center text-white">
          <div className="flex items-center justify-center mb-4">
            <WeatherIcon condition={data.current.condition.text} />
          </div>
          
          <h1 className="text-4xl font-bold mb-2">{data.location.name}</h1>
          <p className="text-blue-100 mb-4">{data.location.country}</p>
          
          <div className="text-6xl font-light mb-2">{Math.round(data.current.temp_c)}°</div>
          <p className="text-xl text-blue-100 mb-4">{data.current.condition.text}</p>
          
          <p className="text-sm text-blue-200">
            Last updated: {new Date(data.location.localtime).toLocaleString()}
          </p>
        </div>
      </Card>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-purple-400 to-purple-600 border-none shadow-lg">
          <div className="flex items-center space-x-4 text-white">
            <Droplets className="w-8 h-8" />
            <div>
              <p className="text-purple-100 text-sm">Humidity</p>
              <p className="text-2xl font-bold">{data.current.humidity}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-400 to-green-600 border-none shadow-lg">
          <div className="flex items-center space-x-4 text-white">
            <Wind className="w-8 h-8" />
            <div>
              <p className="text-green-100 text-sm">Wind Speed</p>
              <p className="text-2xl font-bold">{data.current.wind_kph} km/h</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-400 to-orange-600 border-none shadow-lg">
          <div className="flex items-center space-x-4 text-white">
            <Sun className="w-8 h-8" />
            <div>
              <p className="text-orange-100 text-sm">UV Index</p>
              <p className="text-2xl font-bold">{data.current.uv}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-cyan-400 to-cyan-600 border-none shadow-lg">
          <div className="flex items-center space-x-4 text-white">
            <Eye className="w-8 h-8" />
            <div>
              <p className="text-cyan-100 text-sm">Visibility</p>
              <p className="text-2xl font-bold">{data.current.vis_km} km</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <Card className="p-8 bg-gradient-to-br from-blue-400 to-blue-600 border-none">
        <div className="text-center space-y-4">
          <Skeleton className="w-16 h-16 rounded-full mx-auto bg-blue-300" />
          <Skeleton className="h-8 w-48 mx-auto bg-blue-300" />
          <Skeleton className="h-6 w-32 mx-auto bg-blue-300" />
          <Skeleton className="h-16 w-24 mx-auto bg-blue-300" />
          <Skeleton className="h-6 w-40 mx-auto bg-blue-300" />
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 bg-gray-100 border-none">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-8 h-8 rounded bg-gray-300" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-gray-300" />
                <Skeleton className="h-6 w-16 bg-gray-300" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const { toast } = useToast();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', 'colombo'],
    queryFn: fetchWeatherData,
    retry: 2,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  useEffect(() => {
    if (error) {
      console.error('Weather API Error:', error);
      toast({
        title: "Weather Data Unavailable",
        description: "Please add your WeatherAPI key to fetch live weather data. Using demo mode for now.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Demo data for when API key is not configured
  const demoData: WeatherData = {
    location: {
      name: "Colombo",
      country: "Sri Lanka",
      localtime: new Date().toISOString(),
    },
    current: {
      temp_c: 29,
      condition: {
        text: "Partly cloudy",
        icon: "",
      },
      humidity: 78,
      wind_kph: 15,
      uv: 8,
      vis_km: 10,
    },
  };

  const weatherData = data || (error ? demoData : null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Colombo Weather Compass
            </h1>
            <p className="text-xl text-blue-100 drop-shadow">
              Real-time weather updates for Colombo, Sri Lanka
            </p>
          </div>

          {/* Weather Content */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : weatherData ? (
            <WeatherCard data={weatherData} />
          ) : (
            <Card className="p-8 text-center bg-white/10 backdrop-blur border-white/20">
              <div className="text-white">
                <Thermometer className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl font-bold mb-2">Weather data unavailable</h2>
                <p className="text-blue-100 mb-4">
                  Unable to fetch weather information at this time.
                </p>
                <button
                  onClick={() => refetch()}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </Card>
          )}

          {/* Setup Instructions */}
          {error && (
            <Card className="mt-6 p-6 bg-white/10 backdrop-blur border-white/20">
              <div className="text-white text-center">
                <h3 className="text-lg font-semibold mb-2">Setup Instructions</h3>
                <p className="text-blue-100 text-sm">
                  To get live weather data, sign up for a free API key at{' '}
                  <a 
                    href="https://weatherapi.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-blue-200"
                  >
                    weatherapi.com
                  </a>
                  {' '}and replace 'YOUR_API_KEY_HERE' in the code with your actual API key.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
