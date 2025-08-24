import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star } from 'lucide-react';

const PackageCard = ({ pkg }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all hover:scale-105">
            <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {pkg.location}
                </p>
                <p className="text-gray-600 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {pkg.duration}
                </p>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-bold text-purple-600">${pkg.price}</span>
                    <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">{pkg.rating}</span>
                    </div>
                </div>
                <p className="text-gray-700 mb-4">{pkg.description}</p>

                <Link
                    to={`/booking/${pkg.id}`}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all block text-center"
                >
                    Book This Package
                </Link>
            </div>
        </div>
    );
};

export default PackageCard;