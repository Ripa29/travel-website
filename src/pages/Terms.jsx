import React from 'react';
import { Shield, FileText, Clock, CreditCard, Phone } from 'lucide-react';

const Terms = () => {
    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-purple-600" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
                        <p className="text-gray-600">Last updated: March 15, 2024</p>
                    </div>

                    {/* Content */}
                    <div className="prose max-w-none">
                        <div className="bg-gray-50 p-6 rounded-xl mb-8">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-purple-600" />
                                Important Information
                            </h2>
                            <p className="text-gray-700">
                                Please read these terms carefully before making a booking. By using our services,
                                you agree to be bound by these terms and conditions.
                            </p>
                        </div>

                        {/* Booking Policy */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">1. Booking & Payments</h2>

                            <h3 className="text-lg font-semibold mb-2">1.1 Reservation Process</h3>
                            <p>All bookings are subject to availability and confirmation. A deposit of 30% is required to secure your reservation.</p>

                            <h3 className="text-lg font-semibold mb-2 mt-4">1.2 Payment Methods</h3>
                            <p>We accept credit cards, bank transfers, and PayPal. All payments are processed securely.</p>

                            <h3 className="text-lg font-semibold mb-2 mt-4">1.3 Price Guarantee</h3>
                            <p>Prices are guaranteed at the time of booking confirmation. All prices are in USD.</p>
                        </section>

                        {/* Cancellation Policy */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">2. Cancellations & Changes</h2>

                            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
                                <div className="flex items-center mb-2">
                                    <Clock className="w-5 h-5 text-orange-500 mr-2" />
                                    <strong>Cancellation Timeframe</strong>
                                </div>
                                <ul className="list-disc list-inside text-sm text-orange-700">
                                    <li>60+ days before departure: Full refund minus administrative fee</li>
                                    <li>30-59 days before departure: 50% refund</li>
                                    <li>15-29 days before departure: 25% refund</li>
                                    <li>0-14 days before departure: No refund</li>
                                </ul>
                            </div>

                            <h3 className="text-lg font-semibold mb-2">2.1 Modification Policy</h3>
                            <p>Changes to bookings are subject to availability and may incur additional fees.</p>
                        </section>

                        {/* Travel Documents */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">3. Travel Requirements</h2>

                            <h3 className="text-lg font-semibold mb-2">3.1 Passport & Visas</h3>
                            <p>Travelers are responsible for ensuring they have valid travel documents.</p>

                            <h3 className="text-lg font-semibold mb-2">3.2 Travel Insurance</h3>
                            <p>Comprehensive travel insurance is mandatory for all bookings.</p>
                        </section>

                        {/* Liability */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">4. Liability & Responsibility</h2>

                            <p>WanderlustTravel acts as an intermediary between travelers and service providers.
                                We are not liable for events beyond our control.</p>
                        </section>

                        {/* Privacy */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">5. Privacy & Data Protection</h2>

                            <p>We are committed to protecting your personal information.
                                Please refer to our Privacy Policy for details.</p>
                        </section>

                        {/* Contact */}
                        <section className="bg-purple-50 p-6 rounded-xl">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <Phone className="w-5 h-5 mr-2 text-purple-600" />
                                Need Help?
                            </h2>
                            <p className="mb-4">Our travel consultants are available to answer any questions:</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="tel:+15551234567" className="flex items-center text-purple-600 font-semibold">
                                    <Phone className="w-5 h-5 mr-2" />
                                    +1 (555) 123-4567
                                </a>
                                <a href="mailto:info@wanderlusttravel.com" className="flex items-center text-purple-600 font-semibold">
                                    <CreditCard className="w-5 h-5 mr-2" />
                                    info@wanderlusttravel.com
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;