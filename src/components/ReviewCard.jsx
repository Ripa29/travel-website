import React, { useState } from 'react';
import { Star, User, Calendar, CheckCircle } from 'lucide-react';

const ReviewCard = ({ review, showFull = false }) => {
    const [expanded, setExpanded] = useState(false);

    const displayContent = showFull || expanded ? review.content :
        review.content.length > 150 ? review.content.substring(0, 150) + '...' : review.content;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <div className="flex items-center">
                            <h4 className="font-semibold">{review.author}</h4>
                            {review.verified && (
                                <CheckCircle className="w-4 h-4 text-blue-500 ml-1" />
                            )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${
                                i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>

            <p className="text-gray-700 mb-4">
                {displayContent}
                {!showFull && review.content.length > 150 && !expanded && (
                    <button
                        onClick={() => setExpanded(true)}
                        className="text-purple-600 hover:text-purple-800 ml-1 font-medium"
                    >
                        Read more
                    </button>
                )}
            </p>

            {!showFull && expanded && (
                <button
                    onClick={() => setExpanded(false)}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                >
                    Show less
                </button>
            )}
        </div>
    );
};

export default ReviewCard;