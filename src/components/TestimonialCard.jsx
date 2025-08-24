import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            {/* Rating */}
            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${
                            i < testimonial.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                        }`}
                    />
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-700">{testimonial.rating}.0</span>
            </div>

            {/* Testimonial text */}
            <p className="text-gray-700 italic mb-4 leading-relaxed">
                "{testimonial.testimonial}"
            </p>

            {/* User info */}
            <div className="flex items-center space-x-3">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{testimonial.name}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{testimonial.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
              {testimonial.package}
            </span>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-4xl text-purple-100 opacity-50">"</div>
        </div>
    );
};

export default TestimonialCard;