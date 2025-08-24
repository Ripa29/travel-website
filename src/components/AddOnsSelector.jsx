import React from 'react';
import { Check, Crown, Sparkles } from 'lucide-react';
import { addOns } from '../data/addOns';

const AddOnsSelector = ({ selectedAddOns, onAddOnsChange }) => {
    const categories = [
        { id: 'all', name: 'All Add-Ons' },
        { id: 'insurance', name: 'Insurance' },
        { id: 'transport', name: 'Transport' },
        { id: 'experiences', name: 'Experiences' },
        { id: 'activities', name: 'Activities' },
        { id: 'services', name: 'Services' }
    ];

    const [selectedCategory, setSelectedCategory] = React.useState('all');

    const filteredAddOns = selectedCategory === 'all'
        ? addOns
        : addOns.filter(addOn => addOn.category === selectedCategory);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
                <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-xl font-semibold">Premium Add-Ons</h3>
                <span className="ml-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full">
          Optional
        </span>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category.id
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Add-ons grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAddOns.map(addOn => (
                    <label
                        key={addOn.id}
                        className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                            selectedAddOns.includes(addOn.id)
                                ? 'border-purple-500 bg-purple-50 shadow-md'
                                : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                        }`}
                    >
                        <input
                            type="checkbox"
                            checked={selectedAddOns.includes(addOn.id)}
                            onChange={() => onAddOnsChange(addOn.id)}
                            className="absolute opacity-0"
                        />

                        <div className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                selectedAddOns.includes(addOn.id)
                                    ? 'bg-purple-600 border-purple-600'
                                    : 'border-gray-300'
                            }`}>
                                {selectedAddOns.includes(addOn.id) && (
                                    <Check className="w-3 h-3 text-white" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-gray-900">{addOn.title}</h4>
                                    {addOn.popular && (
                                        <span className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      <Crown className="w-3 h-3 mr-1" />
                      Popular
                    </span>
                                    )}
                                </div>

                                <p className="text-sm text-gray-600 mb-2">{addOn.description}</p>

                                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-purple-600">
                    ${addOn.price}
                  </span>
                                    <span className="text-xs text-gray-500 capitalize">
                    {addOn.category}
                  </span>
                                </div>
                            </div>
                        </div>
                    </label>
                ))}
            </div>

            {filteredAddOns.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No add-ons available in this category
                </div>
            )}
        </div>
    );
};

export default AddOnsSelector;