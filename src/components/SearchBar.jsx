import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign } from 'lucide-react';

const SearchBar = () => {
    const [filters, setFilters] = useState({ location: '', minPrice: '', maxPrice: '' });
    const navigate = useNavigate();

    const handleSearch = () => {
        // Convert to URL parameters
        const params = new URLSearchParams();
        if (filters.location) params.append('location', filters.location);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        navigate(`/packages?${params.toString()}`);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 -mt-16 mx-4 md:mx-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-semibold mb-2">Destination</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Where to?"
                            value={filters.location}
                            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Min Price</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Max Price</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <div className="flex items-end">
                    <button
                        onClick={handleSearch}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center"
                    >
                        <Search className="inline mr-2" />
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;