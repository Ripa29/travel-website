import React, { useState } from 'react';
import { Search, MapPin, Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Eye, AlertTriangle } from 'lucide-react';
import WeatherWidget from '../components/WeatherWidget';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const getWeather = async () => {
        if (!location.trim()) return;

        setLoading(true);
        try {
            //  API call
            setTimeout(() => {
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
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching weather:', error);
            setLoading(false);
        }
    };

    const travelAdvisories = [
        {
            location: "Bali, Indonesia",
            level: "moderate",
            message: "Increased volcanic activity. Check travel advisories before booking.",
            icon: "⚠️"
        },
        {
            location: "Thailand",
            level: "low",
            message: "Monsoon season from May to October. Some areas may experience flooding.",
            icon: "🌧️"
        },
        {
            location: "Caribbean Islands",
            level: "high",
            message: "Hurricane season until November. Travel insurance highly recommended.",
            icon: "🌀"
        }
    ];

    const passportRequirements = [
        {
            region: "Europe (Schengen Area)",
            requirement: "Valid passport required. No visa for stays under 90 days (US citizens)"
        },
        {
            region: "Asia",
            requirement: "Passport + visa requirements vary by country. Check specific destinations."
        },
        {
            region: "Australia & New Zealand",
            requirement: "Valid passport and Electronic Travel Authority (ETA) required"
        },
        {
            region: "Africa",
            requirement: "Passport required. Visa requirements vary by country. Yellow fever vaccination may be required."
        }
    ];

    return (
        <div className="py-8 min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Weather & Travel Advisories</h1>

                {/* Weather Search */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Check Weather</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Enter city or destination"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && getWeather()}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            onClick={getWeather}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <Search className="w-5 h-5 mr-2" />
                                    Get Weather
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Weather Display */}
                {weather && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h3 className="text-xl font-semibold mb-4">Weather in {weather.location}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold">{weather.temperature}°C</p>
                                <p className="text-gray-600">{weather.condition}</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <p className="text-lg font-semibold">{weather.humidity}%</p>
                                <p className="text-gray-600">Humidity</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <Wind className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                                <p className="text-lg font-semibold">{weather.windSpeed} km/h</p>
                                <p className="text-gray-600">Wind Speed</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <Eye className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                <p className="text-lg font-semibold">{weather.visibility} km</p>
                                <p className="text-gray-600">Visibility</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Travel Advisories */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
                            Travel Advisories
                        </h3>
                        <div className="space-y-4">
                            {travelAdvisories.map((advisory, index) => (
                                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                                    advisory.level === 'high' ? 'border-red-500 bg-red-50' :
                                        advisory.level === 'moderate' ? 'border-yellow-500 bg-yellow-50' :
                                            'border-green-500 bg-green-50'
                                }`}>
                                    <div className="flex items-start">
                                        <span className="text-2xl mr-3">{advisory.icon}</span>
                                        <div>
                                            <h4 className="font-semibold">{advisory.location}</h4>
                                            <p className="text-sm text-gray-600">{advisory.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Passport Requirements */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4">Passport & Visa Requirements</h3>
                        <div className="space-y-4">
                            {passportRequirements.map((requirement, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                    <h4 className="font-semibold mb-2">{requirement.region}</h4>
                                    <p className="text-sm text-gray-600">{requirement.requirement}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Popular Destinations Weather */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">Popular Destinations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <WeatherWidget location="Bali, Indonesia" compact={true} />
                        <WeatherWidget location="Paris, France" compact={true} />
                        <WeatherWidget location="Tokyo, Japan" compact={true} />
                        <WeatherWidget location="New York, USA" compact={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;