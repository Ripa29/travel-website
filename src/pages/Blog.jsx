import React, { useState } from 'react';
import { Search, Calendar, Tag, User, Plus, Edit, Trash } from 'lucide-react';
import BlogPostCard from '../components/BlogPostCard';
import { blogPosts } from '../data/blogPosts';
import { useAuth } from '../utils/auth';
import { saveBlogPost, deleteBlogPost } from '../utils/storage';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTag, setSelectedTag] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const { user } = useAuth();

    const [newPost, setNewPost] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Destinations',
        tags: []
    });

    const [currentTag, setCurrentTag] = useState('');

    // Get all unique categories
    const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

    // Get all unique tags
    const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

    // Get posts from localStorage (user-created) and combine with default posts
    const userPosts = JSON.parse(localStorage.getItem('userBlogPosts') || '[]');
    const allPosts = [...blogPosts, ...userPosts].sort((a, b) =>
        new Date(b.date) - new Date(a.date)
    );

    // Filter posts based on search term, category, and tag
    const filteredPosts = allPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);

        return matchesSearch && matchesCategory && matchesTag;
    });

    const handleCreatePost = () => {
        if (!user) {
            alert('Please login to create a blog post');
            return;
        }
        setIsCreateModalOpen(true);
        setEditingPost(null);
        setNewPost({
            title: '',
            excerpt: '',
            content: '',
            category: 'Destinations',
            tags: []
        });
    };

    const handleEditPost = (post) => {
        if (!user) {
            alert('Please login to edit blog posts');
            return;
        }
        setIsCreateModalOpen(true);
        setEditingPost(post);
        setNewPost({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            tags: [...post.tags]
        });
    };

    const handleDeletePost = (postId) => {
        if (!user) {
            alert('Please login to delete blog posts');
            return;
        }

        if (window.confirm('Are you sure you want to delete this post?')) {
            deleteBlogPost(postId);
            alert('Post deleted successfully!');
            window.location.reload(); // Refresh to show updated list
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !newPost.tags.includes(currentTag.trim())) {
            setNewPost(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }));
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setNewPost(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleSubmitPost = (e) => {
        e.preventDefault();

        if (!newPost.title || !newPost.excerpt || !newPost.content) {
            alert('Please fill in all required fields');
            return;
        }

        const postData = {
            id: editingPost ? editingPost.id : Date.now(),
            title: newPost.title,
            excerpt: newPost.excerpt,
            content: newPost.content,
            category: newPost.category,
            tags: newPost.tags,
            image: editingPost?.image || "https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&h=400&fit=crop",
            author: user.name,
            authorAvatar: user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            date: new Date().toISOString().split('T')[0],
            readTime: `${Math.ceil(newPost.content.split(' ').length / 200)} min read`
        };

        saveBlogPost(postData, editingPost);
        setIsCreateModalOpen(false);
        alert(editingPost ? 'Post updated successfully!' : 'Post created successfully!');
        window.location.reload(); // Refresh to show updated list
    };

    const isUserPost = (post) => {
        return userPosts.some(userPost => userPost.id === post.id);
    };

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Travel Blog</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover travel tips, destination guides, photography advice, and inspiring stories from around the world.
                    </p>
                </div>

                {/* Create Post Button */}
                {user && (
                    <div className="text-center mb-8">
                        <button
                            onClick={handleCreatePost}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center mx-auto"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Post
                        </button>
                    </div>
                )}

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
                        <div key={post.id} className="relative">
                            <BlogPostCard post={post} />
                            {isUserPost(post) && user && (
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button
                                        onClick={() => handleEditPost(post)}
                                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                                        title="Edit Post"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeletePost(post.id)}
                                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                                        title="Delete Post"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
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

                {/* Create Post Modal */}
                {isCreateModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-6 border-b">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingPost ? 'Edit Post' : 'Create New Post'}
                                    </h2>
                                    <p className="text-gray-600">Share your travel experiences with our community</p>
                                </div>
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmitPost} className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={newPost.title}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Excerpt *</label>
                                        <textarea
                                            name="excerpt"
                                            value={newPost.excerpt}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Content *</label>
                                        <textarea
                                            name="content"
                                            value={newPost.content}
                                            onChange={handleInputChange}
                                            rows="10"
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Category</label>
                                            <select
                                                name="category"
                                                value={newPost.category}
                                                onChange={handleInputChange}
                                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                            >
                                                <option value="Destinations">Destinations</option>
                                                <option value="Travel Tips">Travel Tips</option>
                                                <option value="Photography">Photography</option>
                                                <option value="Adventure">Adventure</option>
                                                <option value="Luxury">Luxury</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Tags</label>
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    value={currentTag}
                                                    onChange={(e) => setCurrentTag(e.target.value)}
                                                    onKeyPress={handleTagKeyPress}
                                                    placeholder="Add tags..."
                                                    className="flex-1 border rounded-l-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddTag}
                                                    className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {newPost.tags.length > 0 && (
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Current Tags</label>
                                            <div className="flex flex-wrap gap-2">
                                                {newPost.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                                                    >
                            {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveTag(tag)}
                                                            className="ml-2 text-purple-600 hover:text-purple-800"
                                                        >
                              ×
                            </button>
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                                    >
                                        {editingPost ? 'Update Post' : 'Create Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;