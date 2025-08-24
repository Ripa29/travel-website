import React from 'react';
import { X, Download, Eye, FileText } from 'lucide-react';

const BrochureModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const brochures = [
        {
            id: 1,
            title: "Luxury Destinations 2024",
            description: "Our premium collection of exclusive destinations and experiences",
            pages: 24,
            size: "8.2 MB",
            category: "Destination Guides"
        },
        {
            id: 2,
            title: "Private Jet Charter Guide",
            description: "Complete guide to our private aviation services",
            pages: 16,
            size: "5.7 MB",
            category: "Transport"
        },
        {
            id: 3,
            title: "5-Star Accommodations",
            description: "Portfolio of our luxury hotel and villa partners",
            pages: 32,
            size: "12.4 MB",
            category: "Accommodation"
        },
        {
            id: 4,
            title: "Culinary Experiences",
            description: "Signature dining experiences and private chef services",
            pages: 20,
            size: "7.8 MB",
            category: "Experiences"
        },
        {
            id: 5,
            title: "Adventure & Wellness",
            description: "Curated adventure activities and wellness retreats",
            pages: 28,
            size: "10.1 MB",
            category: "Activities"
        },
        {
            id: 6,
            title: "Wedding & Honeymoon",
            description: "Romantic getaways and destination wedding planning",
            pages: 36,
            size: "14.3 MB",
            category: "Special Occasions"
        }
    ];

    const categories = [...new Set(brochures.map(b => b.category))];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Digital Brochures</h2>
                        <p className="text-gray-600">Download our exclusive travel guides</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium">
                            All Brochures
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200"
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Brochures grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {brochures.map(brochure => (
                            <div key={brochure.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <FileText className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 mb-1">{brochure.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{brochure.description}</p>
                                        <div className="flex items-center text-xs text-gray-500 space-x-3">
                                            <span>{brochure.pages} pages</span>
                                            <span>•</span>
                                            <span>{brochure.size}</span>
                                            <span>•</span>
                                            <span className="bg-gray-100 px-2 py-1 rounded-full">{brochure.category}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2 mt-4">
                                    <button className="flex-1 flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download PDF
                                    </button>
                                    <button className="px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t p-4 bg-gray-50">
                    <p className="text-sm text-gray-600 text-center">
                        Can't find what you're looking for? <a href="#" className="text-purple-600 hover:underline">Contact our travel consultants</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BrochureModal;