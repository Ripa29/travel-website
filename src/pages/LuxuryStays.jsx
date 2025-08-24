import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart } from 'lucide-react';

const LuxuryStays = () => {
    const stays = [
        {
            id: 1,
            name: "Oceanview Private Villa",
            location: "Bali, Indonesia",
            price: 450,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
            amenities: ["Infinity Pool", "Private Chef", "Ocean View", "Spa"]
        },
        {
            id: 2,
            name: "Alpine Luxury Chalet",
            location: "Swiss Alps, Switzerland",
            price: 620,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
            amenities: ["Ski-in/Ski-out", "Fireplace", "Hot Tub", "Mountain View"]
        },
        {
            id: 3,
            name: "Historic Palace Suite",
            location: "Paris, France",
            price: 780,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
            amenities: ["City Center", "Historic Building", "Butler Service", "Fine Dining"]
        }
    ];

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Luxury Stays</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover our curated collection of exceptional accommodations around the world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stays.map(stay => (
                        <div key={stay.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="relative">
                                <img src={stay.image} alt={stay.name} className="w-full h-48 object-cover" />
                                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
                                    <Heart className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold">{stay.name}</h3>
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="ml-1 font-semibold">{stay.rating}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-3 flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {stay.location}
                                </p>

                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {stay.amenities.slice(0, 3).map((amenity, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {amenity}
                      </span>
                                        ))}
                                        {stay.amenities.length > 3 && (
                                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        +{stay.amenities.length - 3} more
                      </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-purple-600">${stay.price}</span>
                                        <span className="text-gray-600">/night</span>
                                    </div>
                                    <Link
                                        to={`/booking/stay-${stay.id}`}
                                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LuxuryStays;