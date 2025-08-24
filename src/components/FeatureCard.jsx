import React from 'react';

const FeatureCard = ({ feature }) => {
    return (
        <div className={`relative group p-6 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 ${
            feature.highlight
                ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-100 shadow-lg'
                : 'bg-white border border-gray-100 shadow-md hover:shadow-xl'
        }`}>
            {/* Icon */}
            <div className={`text-3xl mb-4 ${feature.highlight ? 'text-purple-600' : 'text-blue-600'}`}>
                {feature.icon}
            </div>

            {/* Title */}
            <h3 className={`text-xl font-semibold mb-2 ${
                feature.highlight ? 'text-purple-900' : 'text-gray-900'
            }`}>
                {feature.title}
            </h3>

            {/* Description */}
            <p className={`text-sm leading-relaxed ${
                feature.highlight ? 'text-purple-700' : 'text-gray-600'
            }`}>
                {feature.description}
            </p>

            {/* Highlight badge */}
            {feature.highlight && (
                <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full">
            Premium
          </span>
                </div>
            )}

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
        </div>
    );
};

export default FeatureCard;