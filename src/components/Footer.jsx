import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Phone, Mail, MapPin, ArrowUp, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    const checkScrollTop = () => {
        if (!showBackToTop && window.pageYOffset > 400) {
            setShowBackToTop(true);
        } else if (showBackToTop && window.pageYOffset <= 400) {
            setShowBackToTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    React.useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, []);

    return (
        <footer className="bg-gray-800 text-white py-12 mt-auto relative">
            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center z-40"
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            )}

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-2xl font-bold mb-4 flex items-center">
                            <Plane className="inline mr-2" />
                            WanderlustTravel
                        </div>
                        <p className="text-gray-300 mb-4">Your gateway to amazing travel experiences around the world.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><Link to="/" className="hover:text-white">Home</Link></li>
                            <li><Link to="/packages" className="hover:text-white">Packages</Link></li>
                            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                            <li><Link to="/booking-support" className="hover:text-white">Booking Support</Link></li>
                            <li><Link to="/payment-issues" className="hover:text-white">Payment Issues</Link></li>
                            <li><Link to="/refunds" className="hover:text-white">Refunds</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-2 text-gray-300">
                            <p className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                +1 (555) 123-4567
                            </p>
                            <p className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                info@wanderlusttravel.com
                            </p>
                            <p className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                123 Travel Street, Adventure City
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; 2024 WanderlustTravel. All rights reserved. | <Link to="/privacy" className="hover:text-white">Privacy Policy</Link> | <Link to="/terms" className="hover:text-white">Terms of Service</Link></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;