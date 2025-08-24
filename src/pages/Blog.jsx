import React, { useState } from 'react';
import { Search, Calendar, Tag, User } from 'lucide-react';
import BlogPostCard from '../components/BlogPostCard';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTag, setSelectedTag] = useState('');

    // Get all unique categories
    const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

    // Get all unique tags
    const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

    // Filter posts based on search term, category, and tag
    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);

        return matchesSearch && matchesCategory && matchesTag;
    });

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Travel Blog</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover travel tips, destination guides, photography advice, and inspiring stories from around the world.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Tag Filter */}
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <select
                                value={selectedTag}
                                onChange={(e) => setSelectedTag(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">All Tags</option>
                                {allTags.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {selectedCategory !== 'All' && (
                            <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full flex items-center">
                Category: {selectedCategory}
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className="ml-2 text-purple-600 hover:text-purple-800"
                                >
                  ×
                </button>
              </span>
                        )}
                        {selectedTag && (
                            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center">
                Tag: {selectedTag}
                                <button
                                    onClick={() => setSelectedTag('')}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                  ×
                </button>
              </span>
                        )}
                        {searchTerm && (
                            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
                Search: {searchTerm}
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="ml-2 text-green-600 hover:text-green-800"
                                >
                  ×
                </button>
              </span>
                        )}
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {filteredPosts.map(post => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
                        <p className="text-gray-600">Try adjusting your search filters or browse all categories.</p>
                    </div>
                )}

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Never Miss a Post</h3>
                    <p className="mb-6">Subscribe to our newsletter and get the latest travel tips, destination guides, and exclusive deals delivered to your inbox!</p>
                    <div className="flex flex-col sm:flex-row max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 sm:rounded-r-none rounded-r-lg sm:mb-0 mb-2"
                        />
                        <button className="bg-white text-purple-600 px-6 py-2 rounded-r-lg hover:bg-gray-100 font-semibold sm:rounded-l-none">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-sm text-purple-200 mt-3">No spam, unsubscribe anytime.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;