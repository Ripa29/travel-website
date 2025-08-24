import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';

const BlogPostCard = ({ post }) => {
    return (
        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {post.category}
          </span>
                </div>

                <h2 className="text-2xl font-bold mb-2 hover:text-purple-600">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>

                <p className="text-gray-700 mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded">
                #{tag}
              </span>
                        ))}
                    </div>
                </div>

                <Link
                    to={`/blog/${post.id}`}
                    className="mt-4 inline-block text-purple-600 hover:text-purple-800 font-semibold"
                >
                    Read More →
                </Link>
            </div>
        </article>
    );
};

export default BlogPostCard;