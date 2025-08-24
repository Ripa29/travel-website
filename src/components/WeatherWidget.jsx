import React, { useState, useEffect } from 'react';
import { MapPin, Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Eye } from 'lucide-react';

const WeatherWidget = ({ location = "Current Location", compact = false }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //  get weather data
        const fetchWeather = async () => {
            setLoading(true);
            try {
                //  weather API like OpenWeatherMap
                const weatherData = {
                    location: location,
                    temperature: Math.floor(Math.random() * 30) + 15,
                    condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
                    humidity: Math.floor(Math.random() * 50) + 30,
                    windSpeed: Math.floor(Math.random() * 20) + 5,
                    visibility: (Math.floor(Math.random() * 10) + 5) / 10,
                    high: Math.floor(Math.random() * 35) + 20,
                    low: Math.floor(Math.random() * 15) + 5
                };
                setWeather(weatherData);
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'Sunny':
                return <Sun className="w-8 h-8 text-yellow-500" />;
            case 'Cloudy':
                return <Cloud className="w-8 h-8 text-gray-500" />;
            case 'Rainy':
                return <CloudRain className="w-8 h-8 text-blue-500" />;
            case 'Partly Cloudy':
                return <Cloud className="w-8 h-8 text-gray-400" />;
            default:
                return <Sun className="w-8 h-8 text-yellow-500" />;
        }
    };

    if (loading) {
        return (
            <div className={`bg-white rounded-lg shadow-md p-4 ${compact ? 'w-full' : 'w-64'}`}>
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!weather) {
        return (
            <div className={`bg-white rounded-lg shadow-md p-4 ${compact ? 'w-full' : 'w-64'}`}>
                <p className="text-gray-500">Weather data unavailable</p>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow-md p-4 ${compact ? 'w-full' : 'w-64'}`}>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm font-medium">{weather.location}</span>
                </div>
                {getWeatherIcon(weather.condition)}
            </div>

            <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold">{weather.temperature}°C</span>
                <span className="text-gray-600">{weather.condition}</span>
            </div>

            {!compact && (
                <>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                            <Droplets className="w-4 h-4 mr-1" />
                            <span>{weather.humidity}%</span>
                        </div>
                        <div className="flex items-center">
                            <Wind className="w-4 h-4 mr-1" />
                            <span>{weather.windSpeed} km/h</span>
                        </div>
                        <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>{weather.visibility} km</span>
                        </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 border-t pt-2">
                        <span>H: {weather.high}°C</span>
                        <span>L: {weather.low}°C</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherWidget;