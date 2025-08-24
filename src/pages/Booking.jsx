import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { MapPin, Clock, ArrowLeft, Calendar, Users, FileText, Download } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import WeatherWidget from '../components/WeatherWidget';
import AddOnsSelector from '../components/AddOnsSelector';
import CalendarIntegration from '../components/CalendarIntegration';
import { generateConfirmationNumber, generateInvoiceNumber } from '../utils/confirmationGenerator';

const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [bookingComplete, setBookingComplete] = useState(false);
    const [confirmationNumber, setConfirmationNumber] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [activeTab, setActiveTab] = useState('booking');
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const travelPackages = [
        {
            id: 1,
            name: "Bali Paradise",
            location: "Bali, Indonesia",
            price: 1299,
            duration: "7 days",
            image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
            rating: 4.8,
            description: "Experience the magic of Bali with pristine beaches and ancient temples",
            details: {
                includes: ["Luxury villa accommodation", "Daily breakfast", "Airport transfers", "Spa treatment", "Guided temple tour"],
                excludes: ["International flights", "Travel insurance", "Personal expenses"],
                requirements: ["Valid passport", "Travel visa if required", "Vaccination certificate"]
            }
        },
        {
            id: 2,
            name: "Swiss Alps Adventure",
            location: "Switzerland",
            price: 2199,
            duration: "10 days",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            rating: 4.9,
            description: "Breathtaking mountain views and luxury alpine experiences",
            details: {
                includes: ["5-star hotel accommodation", "All meals", "Ski passes", "Equipment rental", "Mountain guide"],
                excludes: ["International flights", "Travel insurance", "Alcoholic beverages"],
                requirements: ["Valid passport", "Travel insurance", "Winter sports experience recommended"]
            }
        },
        {
            id: 3,
            name: "Tokyo Explorer",
            location: "Tokyo, Japan",
            price: 1799,
            duration: "8 days",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
            rating: 4.7,
            description: "Modern city life meets ancient traditions",
            details: {
                includes: ["Luxury hotel accommodation", "Daily breakfast", "Bullet train tickets", "Cultural experiences", "Local guide"],
                excludes: ["International flights", "Travel insurance", "Personal shopping"],
                requirements: ["Valid passport", "Japan visa if required"]
            }
        },
        {
            id: 4,
            name: "Santorini Sunset",
            location: "Santorini, Greece",
            price: 1599,
            duration: "6 days",
            image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop",
            rating: 4.9,
            description: "Romantic getaway with stunning sunsets",
            details: {
                includes: ["Luxury cave hotel", "Daily breakfast", "Sunset cruise", "Wine tasting", "Photoshoot"],
                excludes: ["International flights", "Travel insurance", "Meals not specified"],
                requirements: ["Valid passport", "EU visa if required"]
            }
        }
    ];

    useEffect(() => {
        // Check if user is logged in
        if (!user) {
            alert('Please login first to book a package');
            navigate('/auth');
            return;
        }

        // Find the selected package
        const pkg = travelPackages.find(p => p.id === parseInt(id));
        if (pkg) {
            setSelectedPackage(pkg);
        } else {
            navigate('/packages');
        }
    }, [id, user, navigate]);

    const handleBookingComplete = (confirmation) => {
        setConfirmationNumber(confirmation);
        setInvoiceNumber(generateInvoiceNumber());
        setBookingComplete(true);
    };

    const handleAddOnsChange = (addOnId) => {
        setSelectedAddOns(prev =>
            prev.includes(addOnId)
                ? prev.filter(id => id !== addOnId)
                : [...prev, addOnId]
        );
    };

    const calculateTotal = () => {
        if (!selectedPackage) return 0;

        let total = selectedPackage.price;

        // Add addon costs (in a real app, you'd calculate based on selectedAddOns)
        // This is a simplified version
        if (selectedAddOns.length > 0) {
            total += selectedAddOns.length * 150; // Approximate average addon price
        }

        return total;
    };

    const downloadInvoice = () => {
        // In a real app, this would generate a PDF invoice
        const invoiceContent = `
      WANDERLUST TRAVEL - INVOICE
      Invoice Number: ${invoiceNumber}
      Confirmation: ${confirmationNumber}
      Package: ${selectedPackage.name}
      Destination: ${selectedPackage.location}
      Travel Date: ${selectedDate || 'To be determined'}
      Total: $${calculateTotal()}
      
      Thank you for your booking!
    `;

        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${invoiceNumber}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (bookingComplete) {
        return (
            <div className="py-8 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
                        <p className="text-gray-600 mb-6">Thank you for booking with WanderlustTravel. Your adventure awaits!</p>

                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                            <div className="space-y-2 text-left">
                                <p><span className="font-semibold">Confirmation Number:</span> <span className="font-mono">{confirmationNumber}</span></p>
                                <p><span className="font-semibold">Invoice Number:</span> <span className="font-mono">{invoiceNumber}</span></p>
                                <p><span className="font-semibold">Package:</span> {selectedPackage.name}</p>
                                <p><span className="font-semibold">Destination:</span> {selectedPackage.location}</p>
                                <p><span className="font-semibold">Total Amount:</span> ${calculateTotal()}</p>
                                {selectedDate && <p><span className="font-semibold">Travel Date:</span> {new Date(selectedDate).toLocaleDateString()}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                            <button
                                onClick={downloadInvoice}
                                className="flex items-center justify-center bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download Invoice
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50"
                            >
                                Back to Home
                            </button>
                        </div>

                        <p className="text-gray-500 text-sm">
                            We've sent a confirmation email with all the details. Our travel experts will contact you within 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!selectedPackage) {
        return (
            <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-purple-600 hover:text-purple-800 mb-6"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                <h1 className="text-3xl font-bold mb-8">Book Your Trip</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Package Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-6">
                            <h2 className="text-xl font-bold mb-4">Package Summary</h2>

                            <img
                                src={selectedPackage.image}
                                alt={selectedPackage.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />

                            <h3 className="text-lg font-semibold mb-2">{selectedPackage.name}</h3>
                            <p className="text-gray-600 mb-2 flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {selectedPackage.location}
                            </p>
                            <p className="text-gray-600 mb-4 flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {selectedPackage.duration}
                            </p>

                            <div className="text-2xl font-bold text-purple-600 mb-4">
                                ${selectedPackage.price}
                            </div>

                            <p className="text-gray-700 mb-4">{selectedPackage.description}</p>

                            {/* Package details */}
                            <div className="border-t pt-4">
                                <h4 className="font-semibold mb-2">What's Included:</h4>
                                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                    {selectedPackage.details.includes.map((item, index) => (
                                        <li key={index}>✓ {item}</li>
                                    ))}
                                </ul>

                                <h4 className="font-semibold mb-2">Not Included:</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {selectedPackage.details.excludes.map((item, index) => (
                                        <li key={index}>✗ {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Weather Widget */}
                        <WeatherWidget location={selectedPackage.location} />
                    </div>

                    {/* Booking Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white rounded-lg shadow-md mb-6">
                            <div className="flex border-b">
                                <button
                                    onClick={() => setActiveTab('booking')}
                                    className={`px-6 py-3 font-medium ${activeTab === 'booking' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
                                >
                                    Booking Details
                                </button>
                                <button
                                    onClick={() => setActiveTab('addons')}
                                    className={`px-6 py-3 font-medium ${activeTab === 'addons' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
                                >
                                    Add-Ons
                                </button>
                                <button
                                    onClick={() => setActiveTab('calendar')}
                                    className={`px-6 py-3 font-medium ${activeTab === 'calendar' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
                                >
                                    Select Dates
                                </button>
                            </div>

                            <div className="p-6">
                                {activeTab === 'booking' && (
                                    <BookingForm
                                        selectedPackage={selectedPackage}
                                        onBookingComplete={handleBookingComplete}
                                    />
                                )}

                                {activeTab === 'addons' && (
                                    <AddOnsSelector
                                        selectedAddOns={selectedAddOns}
                                        onAddOnsChange={handleAddOnsChange}
                                    />
                                )}

                                {activeTab === 'calendar' && (
                                    <CalendarIntegration
                                        package={selectedPackage}
                                        onDateSelect={setSelectedDate}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                                <h3 className="font-semibold">Terms & Conditions</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                By completing this booking, you agree to our Terms and Conditions, Privacy Policy,
                                and acknowledge that you have read our Travel Advisory notice.
                            </p>
                            <div className="flex space-x-4">
                                <a href="/terms" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                                    View Terms & Conditions
                                </a>
                                <a href="/travel-advisory" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                                    Travel Advisory
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;