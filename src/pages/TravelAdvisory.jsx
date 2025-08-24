import React from 'react';
import { AlertTriangle, MapPin, Clock, Info } from 'lucide-react';

const TravelAdvisory = () => {
    const advisories = [
        {
            region: "Southeast Asia",
            level: "Exercise Normal Precautions",
            details: "Most areas are safe for travel. Be aware of monsoon season from May to October.",
            updated: "2024-03-15",
            countries: ["Thailand", "Vietnam", "Malaysia", "Singapore"]
        },
        {
            region: "Caribbean",
            level: "Exercise Increased Caution",
            details: "Hurricane season until November. Some areas have increased crime rates.",
            updated: "2024-03-10",
            countries: ["Jamaica", "Bahamas", "Dominican Republic"]
        },
        {
            region: "Europe",
            level: "Exercise Normal Precautions",
            details: "Generally safe for travel. Be aware of pickpocketing in tourist areas.",
            updated: "2024-03-12",
            countries: ["France", "Italy", "Spain", "Germany", "UK"]
        },
        {
            region: "South America",
            level: "Reconsider Travel",
            details: "Some areas have increased crime and political instability. Check specific country advisories.",
            updated: "2024-03-08",
            countries: ["Venezuela", "Colombia", "Brazil"]
        },
        {
            region: "Middle East",
            level: "Do Not Travel",
            details: "Active conflicts and political instability in several regions. Avoid non-essential travel.",
            updated: "2024-03-05",
            countries: ["Syria", "Yemen", "Iraq"]
        }
    ];

    const getAdvisoryColor = (level) => {
        switch (level) {
            case "Exercise Normal Precautions":
                return "bg-green-100 text-green-800";
            case "Exercise Increased Caution":
                return "bg-yellow-100 text-yellow-800";
            case "Reconsider Travel":
                return "bg-orange-100 text-orange-800";
            case "Do Not Travel":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-xl shadow-md p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Travel Advisories</h1>
                        <p className="text-xl text-gray-600">
                            Current travel safety information and recommendations
                        </p>
                        <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            Last updated: {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    {/* Advisory Levels Explanation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                        <div className="flex items-start">
                            <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-2">Understanding Advisory Levels</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">Level 1</span>
                                        <span>Exercise Normal Precautions</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs mr-2">Level 2</span>
                                        <span>Exercise Increased Caution</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs mr-2">Level 3</span>
                                        <span>Reconsider Travel</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs mr-2">Level 4</span>
                                        <span>Do Not Travel</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Advisories List */}
                    <div className="space-y-6">
                        {advisories.map((advisory, index) => (
                            <div key={index} className="border rounded-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{advisory.region}</h3>
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getAdvisoryColor(advisory.level)}`}>
                      {advisory.level}
                    </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Updated: {new Date(advisory.updated).toLocaleDateString()}
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4">{advisory.details}</p>

                                <div className="flex items-center mb-3">
                                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-sm font-medium">Affected Countries:</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {advisory.countries.map((country, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                        >
                      {country}
                    </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Resources */}
                    <div className="mt-8 pt-6 border-t">
                        <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <a href="#" className="text-purple-600 hover:text-purple-800">
                                • Travel Insurance Information
                            </a>
                            <a href="#" className="text-purple-600 hover:text-purple-800">
                                • Emergency Contact Numbers
                            </a>
                            <a href="#" className="text-purple-600 hover:text-purple-800">
                                • Embassy Locator
                            </a>
                            <a href="#" className="text-purple-600 hover:text-purple-800">
                                • Health and Vaccination Requirements
                            </a>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600">
                            <strong>Disclaimer:</strong> This information is provided for general guidance only.
                            Travel advisories can change rapidly. Always check official government sources and
                            consult with travel professionals before making travel decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelAdvisory;