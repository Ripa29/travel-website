import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-2xl font-bold mb-4 flex items-center">
                            <Plane className="inline mr-2" />
                            WanderlustTravel
                        </div>
                        <p className="text-gray-300 mb-4">Your gateway to amazing travel experiences around the world.</p>
                        <div className="flex space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">f</div>
                            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500">t</div>
                            <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-700">i</div>
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
                            <li><a href="#" className="hover:text-white">Help Center</a></li>
                            <li><a href="#" className="hover:text-white">Booking Support</a></li>
                            <li><a href="#" className="hover:text-white">Payment Issues</a></li>
                            <li><a href="#" className="hover:text-white">Refunds</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-2 text-gray-300">
                            <p className="flex items-center"><Phone className="w-4 h-4 mr-2" />+1 (555) 123-4567</p>
                            <p className="flex items-center"><Mail className="w-4 h-4 mr-2" />info@wanderlusttravel.com</p>
                            <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" />123 Travel Street, Adventure City</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; 2024 WanderlustTravel. All rights reserved. | Privacy Policy | Terms of Service</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;