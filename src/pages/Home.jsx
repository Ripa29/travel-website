import React, { useState } from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import PackageCard from '../components/PackageCard';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import BrochureModal from '../components/BrochureModal';
import { features } from '../data/features';
import { testimonials } from '../data/testimonials';
import {
    Shield,
    Award,
    Globe,
    Sparkles,
    Download,
    Clock,
    Users,
    Star,
    Calendar,
    Phone,
    MessageCircle
} from 'lucide-react';

const Home = () => {
    const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

    const travelPackages = [
        {
            id: 1,
            name: "Bali Paradise",
            location: "Bali, Indonesia",
            price: 1299,
            duration: "7 days",
            image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
            rating: 4.8,
            description: "Experience the magic of Bali with pristine beaches and ancient temples"
        },
        {
            id: 2,
            name: "Swiss Alps Adventure",
            location: "Switzerland",
            price: 2199,
            duration: "10 days",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            rating: 4.9,
            description: "Breathtaking mountain views and luxury alpine experiences"
        },
        {
            id: 3,
            name: "Tokyo Explorer",
            location: "Tokyo, Japan",
            price: 1799,
            duration: "8 days",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
            rating: 4.7,
            description: "Modern city life meets ancient traditions"
        },
        {
            id: 4,
            name: "Santorini Sunset",
            location: "Santorini, Greece",
            price: 1599,
            duration: "6 days",
            image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop",
            rating: 4.9,
            description: "Romantic getaway with stunning sunsets"
        }
    ];

    const stats = [
        { number: '50K+', label: 'Happy Travelers' },
        { number: '100+', label: 'Destinations' },
        { number: '24/7', label: 'Support' },
        { number: '98%', label: 'Satisfaction Rate' }
    ];

    return (
        <div>
            <Hero />
            <SearchBar />

            {/* Premium Features Section */}
            <section className="py-20 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-purple-600/5 to-blue-600/5 transform -skew-y-3 -translate-y-16"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Premium Experience
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Why Choose WanderlustTravel?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Experience travel redefined with our exclusive services, personalized touch, and unwavering commitment to excellence.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {features.map(feature => (
                            <FeatureCard key={feature.id} feature={feature} />
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
                        <h3 className="text-2xl font-bold mb-4">Ready to Experience Luxury Travel?</h3>
                        <p className="mb-6 text-purple-100 max-w-2xl mx-auto">
                            Download our exclusive brochure to discover our premium packages and services.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setIsBrochureModalOpen(true)}
                                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                View Brochures
                            </button>
                            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                                Speak to Consultant
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Traveler Stories</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover why luxury travelers choose WanderlustTravel for their most memorable journeys.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map(testimonial => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Packages */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Signature Collections</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Curated experiences designed for the discerning traveler seeking extraordinary adventures.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {travelPackages.map(pkg => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Brochure Modal */}
            <BrochureModal
                isOpen={isBrochureModalOpen}
                onClose={() => setIsBrochureModalOpen(false)}
            />
        </div>
    );
};

export default Home;