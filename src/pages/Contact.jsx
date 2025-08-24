import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Star, Send } from 'lucide-react';
import { saveReview } from '../utils/storage';
import { Link } from 'react-router-dom';
const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
    });

    const [reviewData, setReviewData] = useState({
        rating: 0,
        comment: '',
        author: '',
        location: ''
    });

    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleReviewChange = (e) => {
        setReviewData({
            ...reviewData,
            [e.target.name]: e.target.value
        });
    };

    const handleRatingChange = (rating) => {
        setReviewData({
            ...reviewData,
            rating
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your backend
        console.log('Contact form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: 'General Inquiry',
            message: ''
        });
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        if (!reviewData.rating || !reviewData.comment || !reviewData.author) {
            alert('Please fill in all required review fields');
            return;
        }

        const newReview = {
            id: Date.now(),
            author: reviewData.author,
            rating: reviewData.rating,
            date: new Date().toISOString().split('T')[0],
            content: reviewData.comment,
            location: reviewData.location || 'Unknown Location',
            verified: false
        };

        // Save review to local storage
        saveReview(newReview);

        setReviewSubmitted(true);
        setReviewData({
            rating: 0,
            comment: '',
            author: '',
            location: ''
        });

        alert('Thank you for your review! It will be published after moderation.');
    };

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Subject *</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Booking Support">Booking Support</option>
                                    <option value="Payment Issues">Payment Issues</option>
                                    <option value="Cancellation">Cancellation</option>
                                    <option value="Feedback">Feedback</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message *</label>
                                <div className="relative">
                                    <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                        placeholder="Tell us how we can help you..."
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information & Reviews */}
                    <div className="space-y-6">
                        {/* Contact Info */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-purple-600 mr-3" />
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-purple-600 mr-3" />
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="text-gray-600">info@wanderlusttravel.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-purple-600 mr-3" />
                                    <div>
                                        <p className="font-medium">Address</p>
                                        <p className="text-gray-600">123 Travel Street, Adventure City, AC 12345</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Reviews */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

                            {reviewSubmitted ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                    <p className="text-green-700 text-center">Thank you for your review! It will be published after moderation.</p>
                                </div>
                            ) : (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-3">Leave a Review</h4>

                                    <form onSubmit={handleReviewSubmit}>
                                        <div className="mb-3">
                                            <label className="block text-sm font-medium mb-2">Your Name *</label>
                                            <input
                                                type="text"
                                                name="author"
                                                value={reviewData.author}
                                                onChange={handleReviewChange}
                                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-sm font-medium mb-2">Your Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={reviewData.location}
                                                onChange={handleReviewChange}
                                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                                placeholder="City, Country"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-sm font-medium mb-2">Rating *</label>
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => handleRatingChange(star)}
                                                        className="focus:outline-none"
                                                    >
                                                        <Star
                                                            className={`w-6 h-6 ${
                                                                star <= reviewData.rating
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-gray-300'
                                                            }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-sm font-medium mb-2">Your Review *</label>
                                            <textarea
                                                name="comment"
                                                value={reviewData.comment}
                                                onChange={handleReviewChange}
                                                placeholder="Share your experience..."
                                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                                rows="3"
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 flex items-center"
                                        >
                                            <Send className="w-4 h-4 mr-1" />
                                            Submit Review
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mt-12 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">Terms and Conditions</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                        <p><strong>Booking Policy:</strong> All bookings are subject to availability and confirmation.</p>
                        <p><strong>Payment:</strong> Full payment or deposit required at time of booking. Installment plans available for select packages.</p>
                        <p><strong>Cancellation:</strong> Cancellation fees apply based on timing. See full terms for details.</p>
                        <p><strong>Travel Insurance:</strong> Highly recommended for all international travel.</p>
                        <p><strong>Passport & Visa:</strong> Travelers are responsible for ensuring valid travel documents.</p>
                    </div>
                    <Link
                        to="/terms" className="text-purple-600 cursor-pointer mt-5 hover:underline">
                        View Full Terms and Conditions →</Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;