import React from 'react';
import { Plane, Clock, Users, MapPin } from 'lucide-react';

const PrivateJets = () => {
    const jets = [
        {
            id: 1,
            name: "Citation XLS",
            capacity: "8 passengers",
            range: "2000 miles",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
            price: 4500
        },
        {
            id: 2,
            name: "Gulfstream G650",
            capacity: "12 passengers",
            range: "7000 miles",
            image: "https://images.unsplash.com/photo-1663180396749-94b7f1d58802?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3VsZnN0cmVhbXxlbnwwfHwwfHx8MA%3D%3D",
            price: 12000
        },
        {
            id: 3,
            name: "Bombardier Global 7500",
            capacity: "16 passengers",
            range: "7700 miles",
            image: "https://images.unsplash.com/photo-1665501153980-47094cee3b1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Qm9tYmFyZGllciUyMEdsb2JhbCUyMDc1MDB8ZW58MHx8MHx8fDA%3D",
            price: 18000
        }
    ];

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Private Jet Charters</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experience the ultimate in luxury air travel with our exclusive private jet services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {jets.map(jet => (
                        <div key={jet.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            <img src={jet.image} alt={jet.name} className="w-full h-48 object-cover" />

                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{jet.name}</h3>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span>{jet.capacity}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{jet.range}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-purple-600">${jet.price}</span>
                                        <span className="text-gray-600">/hour</span>
                                    </div>
                                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                        Inquire
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Why Choose Private Jet Travel?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Time Efficiency</h3>
                            <p className="text-gray-600">Avoid commercial airport delays and travel on your schedule</p>
                        </div>
                        <div className="text-center">
                            <Plane className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Privacy & Comfort</h3>
                            <p className="text-gray-600">Enjoy complete privacy and luxurious comfort</p>
                        </div>
                        <div className="text-center">
                            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Flexible Destinations</h3>
                            <p className="text-gray-600">Access thousands of airports worldwide</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivateJets;