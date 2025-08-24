import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Users, CreditCard,  Landmark, DollarSign } from 'lucide-react';
import { useAuth } from '../utils/auth';
import { processPayment } from '../utils/api';
import { saveBooking } from '../utils/storage';

const BookingForm = ({ selectedPackage, onBookingComplete }) => {
    const { user } = useAuth();
    const [bookingData, setBookingData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        phone: user?.phone || '',
        checkInDate: '',
        guests: 1,
        paymentMethod: 'credit-card',
        installments: false,
        addons: {
            insurance: false,
            airportTransfer: false,
            guidedTours: false
        }
    });
    const [processing, setProcessing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddonChange = (addon) => {
        setBookingData(prev => ({
            ...prev,
            addons: {
                ...prev.addons,
                [addon]: !prev.addons[addon]
            }
        }));
    };

    const calculateTotal = () => {
        if (!selectedPackage) return 0;

        let total = selectedPackage.price;

        // Add addon costs
        if (bookingData.addons.insurance) total += 99;
        if (bookingData.addons.airportTransfer) total += 49;
        if (bookingData.addons.guidedTours) total += 199;

        return total;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            // Process payment
            const paymentResult = await processPayment({
                amount: calculateTotal(),
                method: bookingData.paymentMethod,
                installments: bookingData.installments
            });

            if (paymentResult.success) {
                // Save booking
                const booking = {
                    id: paymentResult.confirmationNumber,
                    package: selectedPackage,
                    user: bookingData,
                    total: calculateTotal(),
                    date: new Date().toISOString(),
                    status: 'confirmed'
                };

                saveBooking(booking);

                // Callback to parent
                onBookingComplete(paymentResult.confirmationNumber);
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('An error occurred during booking. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Personal Information</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">First Name *</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={bookingData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={bookingData.lastName}
                                onChange={handleInputChange}
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
                                value={bookingData.email}
                                onChange={handleInputChange}
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
                                value={bookingData.phone}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Trip Details</h3>

                    <div>
                        <label className="block text-sm font-medium mb-2">Check-in Date *</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                name="checkInDate"
                                value={bookingData.checkInDate}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Guests *</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <select
                                name="guests"
                                value={bookingData.guests}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            >
                                <option value={1}>1 Guest</option>
                                <option value={2}>2 Guests</option>
                                <option value={3}>3 Guests</option>
                                <option value={4}>4 Guests</option>
                                <option value={5}>5+ Guests</option>
                            </select>
                        </div>
                    </div>

                    {/* Add-ons */}
                    <div className="pt-4">
                        <h4 className="font-semibold mb-3">Add-ons:</h4>
                        <div className="space-y-2">
                            <label className="flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={bookingData.addons.insurance}
                                    onChange={() => handleAddonChange('insurance')}
                                    className="mr-3"
                                />
                                Travel Insurance (+$99)
                            </label>
                            <label className="flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={bookingData.addons.airportTransfer}
                                    onChange={() => handleAddonChange('airportTransfer')}
                                    className="mr-3"
                                />
                                Airport Transfer (+$49)
                            </label>
                            <label className="flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={bookingData.addons.guidedTours}
                                    onChange={() => handleAddonChange('guidedTours')}
                                    className="mr-3"
                                />
                                Guided Tours (+$199)
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Section */}
            <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Payment Method</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="credit-card"
                            checked={bookingData.paymentMethod === 'credit-card'}
                            onChange={handleInputChange}
                            className="mr-3"
                        />
                        <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                        Credit Card
                    </label>

                    <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={bookingData.paymentMethod === 'paypal'}
                            onChange={handleInputChange}
                            className="mr-3"
                        />
                        <div className="w-5 h-5 mr-2 bg-blue-600 rounded flex items-center justify-center text-white text-xs">P</div>
                        PayPal
                    </label>

                    <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="bank-transfer"
                            checked={bookingData.paymentMethod === 'bank-transfer'}
                            onChange={handleInputChange}
                            className="mr-3"
                        />
                        < Landmark className="w-5 h-5 mr-2 text-green-600" />
                        Bank Transfer
                    </label>
                </div>

                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="installments"
                            checked={bookingData.installments}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <span className="text-sm">Pay in installments (3 months)</span>
                    </label>
                </div>

                <div className="border-t pt-4 mb-6">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Package:</span>
                            <span>${selectedPackage.price}</span>
                        </div>
                        {bookingData.addons.insurance && (
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Travel Insurance:</span>
                                <span>+$99</span>
                            </div>
                        )}
                        {bookingData.addons.airportTransfer && (
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Airport Transfer:</span>
                                <span>+$49</span>
                            </div>
                        )}
                        {bookingData.addons.guidedTours && (
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Guided Tours:</span>
                                <span>+$199</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-lg font-semibold pt-2 border-t mt-2">
                            <span>Total:</span>
                            <span className="text-purple-600">${calculateTotal()}</span>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {processing ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing...
                        </>
                    ) : (
                        <>
                            <DollarSign className="w-5 h-5 mr-2" />
                            Complete Booking
                        </>
                    )}
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    By booking, you agree to our Terms and Conditions
                </p>
            </div>
        </form>
    );
};

export default BookingForm;