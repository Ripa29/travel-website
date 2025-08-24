import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import { blogPosts } from '../data/blogPosts';
import { reviews } from '../data/reviews';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === parseInt(id));

    if (!post) {
        return (
            <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
                    <Link to="/blog" className="text-purple-600 hover:text-purple-800 font-semibold">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    // Get related posts (excluding current post)
    const relatedPosts = blogPosts
        .filter(p => p.id !== post.id)
        .slice(0, 2);

    // Filter reviews that might be related to this post's content
    const postReviews = reviews.slice(0, 3);

    const sharePost = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back Button */}
                <Link
                    to="/blog"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Blog
                </Link>

                {/* Article Header */}
                <article className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />

                    <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{new Date(post.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>

                            <button
                                onClick={sharePost}
                                className="p-2 text-gray-500 hover:text-purple-600 rounded-lg hover:bg-purple-50"
                                title="Share this post"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                        <div className="flex items-center mb-6">
                            <img
                                src={post.authorAvatar}
                                alt={post.author}
                                className="w-12 h-12 rounded-full object-cover mr-3"
                            />
                            <div>
                                <p className="font-semibold">{post.author}</p>
                                <p className="text-sm text-gray-500">Travel Writer</p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="mb-8">
                            <div className="flex items-center mb-2">
                                <Tag className="w-4 h-4 text-gray-500 mr-2" />
                                <span className="text-sm font-medium text-gray-700">Tags:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                                    >
                    #{tag}
                  </span>
                                ))}
                            </div>
                        </div>

                        {/* Article Content */}
                        <div
                            className="prose max-w-none mb-8"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Share Section */}
                        <div className="border-t pt-6 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Share this post</h3>
                            <div className="flex space-x-4">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Twitter
                                </button>
                                <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900">
                                    Facebook
                                </button>
                                <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                                    LinkedIn
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Reviews Section */}
                <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">What Readers Are Saying</h2>
                    <div className="space-y-4">
                        {postReviews.map(review => (
                            <ReviewCard key={review.id} review={review} showFull={true} />
                        ))}
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedPosts.map(relatedPost => (
                                <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src={relatedPost.image}
                                        alt={relatedPost.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded mb-2 inline-block">
                      {relatedPost.category}
                    </span>
                                        <h3 className="font-semibold mb-2 line-clamp-2">
                                            <Link
                                                to={`/blog/${relatedPost.id}`}
                                                className="hover:text-purple-600"
                                            >
                                                {relatedPost.title}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                        <Link
                                            to={`/blog/${relatedPost.id}`}
                                            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Newsletter Signup */}
                <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                    <p className="mb-6">Subscribe to our newsletter for more travel tips, destination guides, and exclusive content!</p>
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
                </div>
            </div>
        </div>
    );
};

export default BlogPost;