import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PackageCard from '../components/PackageCard';
import { fetchPackages } from '../utils/api';

const Packages = () => {
    const [searchParams] = useSearchParams();
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPackages = async () => {
            setLoading(true);
            const filters = {
                location: searchParams.get('location') || '',
                minPrice: searchParams.get('minPrice') || '',
                maxPrice: searchParams.get('maxPrice') || ''
            };

            const packages = await fetchPackages(filters);
            setFilteredPackages(packages);
            setLoading(false);
        };

        loadPackages();
    }, [searchParams]);

    return (
        <div className="py-8 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Travel Packages</h1>

                {/* Search Results */}
                <div className="mb-6">
                    <p className="text-gray-600">Found {filteredPackages.length} packages</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPackages.map(pkg => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                )}

                {!loading && filteredPackages.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No packages found matching your criteria.</p>
                        <p className="text-gray-500">Try adjusting your search filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Packages;