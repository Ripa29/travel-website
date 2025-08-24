import React from 'react';
import { Anchor, Users, MapPin, Calendar } from 'lucide-react';

const YachtCharters = () => {
    const yachts = [
        {
            id: 1,
            name: "Ocean Majesty",
            length: "120ft",
            capacity: "10 guests",
            location: "Mediterranean",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
            price: 25000
        },
        {
            id: 2,
            name: "Azure Dream",
            length: "85ft",
            capacity: "8 guests",
            location: "Caribbean",
            image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop",
            price: 18000
        },
        {
            id: 3,
            name: "Royal Escape",
            length: "150ft",
            capacity: "12 guests",
            location: "Greek Islands",
            image: "https://images.unsplash.com/photo-1509978778156-518eea30166b?w=400&h=300&fit=crop",
            price: 35000
        }
    ];

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Yacht Charters</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experience the ultimate luxury on the open seas with our exclusive yacht charters.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {yachts.map(yacht => (
                        <div key={yacht.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            <img src={yacht.image} alt={yacht.name} className="w-full h-48 object-cover" />

                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{yacht.name}</h3>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <Anchor className="w-4 h-4 mr-2" />
                                        <span>{yacht.length}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span>{yacht.capacity}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{yacht.location}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-purple-600">${yacht.price}</span>
                                        <span className="text-gray-600">/week</span>
                                    </div>
                                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                        Charter
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Yacht Charter Experience</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold mb-4">What's Included:</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Professional captain and crew</li>
                                <li>• Gourmet chef and meals</li>
                                <li>• Water sports equipment</li>
                                <li>• Fuel and marina fees</li>
                                <li>• Luxury accommodations</li>
                                <li>• Itinerary planning</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Popular Destinations:</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Mediterranean Coast</li>
                                <li>• Caribbean Islands</li>
                                <li>• Greek Islands</li>
                                <li>• French Riviera</li>
                                <li>• Thai Islands</li>
                                <li>• Bahamas</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YachtCharters;