import React, { useState } from 'react';
import { User, Calendar, MapPin, CreditCard, Settings, LogOut, Plus, Edit, Trash2, Download, ArrowLeft, Save } from 'lucide-react';
import { useAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { generateInvoiceNumber, formatCurrency } from '../utils/confirmationGenerator';

const Account = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/24', default: true },
        { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/25', default: false }
    ]);
    const [profileData, setProfileData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        phone: '+1 (555) 123-4567'
    });
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: true,
        promotionalOffers: true,
        shareData: true,
        publicProfile: false
    });
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [newPaymentMethod, setNewPaymentMethod] = useState({
        type: 'Visa',
        number: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const bookings = [
        {
            id: 'TRV123456',
            destination: 'Bali, Indonesia',
            date: '2024-04-15',
            endDate: '2024-04-22',
            status: 'Confirmed',
            amount: 1299,
            package: 'Bali Paradise',
            travelers: 2,
            packageDetails: {
                includes: ["Luxury villa accommodation", "Daily breakfast", "Airport transfers", "Spa treatment", "Guided temple tour"],
                duration: "7 days",
                image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop"
            }
        },
        {
            id: 'TRV123457',
            destination: 'Tokyo, Japan',
            date: '2024-05-20',
            endDate: '2024-05-28',
            status: 'Pending',
            amount: 1799,
            package: 'Tokyo Explorer',
            travelers: 1,
            packageDetails: {
                includes: ["Luxury hotel accommodation", "Daily breakfast", "Bullet train tickets", "Cultural experiences", "Local guide"],
                duration: "8 days",
                image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop"
            }
        }
    ];

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
        // In a real app, this would send data to the server
        alert('Profile information saved successfully!');
    };

    const handleSettingsChange = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const handleSaveSettings = () => {
        // In a real app, this would send data to the server
        alert('Settings saved successfully!');
    };

    const handleAddPaymentMethod = () => {
        setShowPaymentForm(true);
    };

    const handlePaymentInputChange = (e) => {
        const { name, value } = e.target;
        setNewPaymentMethod(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitPaymentMethod = (e) => {
        e.preventDefault();

        // Basic validation
        if (!newPaymentMethod.number || !newPaymentMethod.expiry || !newPaymentMethod.cvv || !newPaymentMethod.name) {
            alert('Please fill in all payment method details');
            return;
        }

        // Create a new payment method
        const newMethod = {
            id: Date.now(),
            type: newPaymentMethod.type,
            last4: newPaymentMethod.number.slice(-4),
            expiry: newPaymentMethod.expiry,
            default: paymentMethods.length === 0, // Set as default if no other methods
            name: newPaymentMethod.name
        };

        setPaymentMethods(prev => [...prev, newMethod]);
        setShowPaymentForm(false);
        setNewPaymentMethod({
            type: 'Visa',
            number: '',
            expiry: '',
            cvv: '',
            name: ''
        });

        alert('Payment method added successfully!');
    };

    const handleSetDefaultPayment = (id) => {
        setPaymentMethods(methods =>
            methods.map(method => ({
                ...method,
                default: method.id === id
            }))
        );
        alert('Default payment method updated!');
    };

    const handleDeletePaymentMethod = (id) => {
        if (window.confirm('Are you sure you want to delete this payment method?')) {
            setPaymentMethods(methods => methods.filter(method => method.id !== id));
            alert('Payment method deleted successfully!');
        }
    };

    const handleViewBookingDetails = (booking) => {
        setSelectedBooking(booking);
    };

    const handleDownloadInvoice = (booking) => {
        const invoiceNumber = generateInvoiceNumber();
        const invoiceContent = `
      WANDERLUST TRAVEL - INVOICE
      ============================
      
      Invoice Number: ${invoiceNumber}
      Booking Reference: ${booking.id}
      Issue Date: ${new Date().toLocaleDateString()}
      
      Customer Information:
      --------------------
      Name: ${user?.name || 'Customer'}
      Email: ${user?.email || 'N/A'}
      
      Booking Details:
      ----------------
      Package: ${booking.package}
      Destination: ${booking.destination}
      Travel Dates: ${new Date(booking.date).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}
      Travelers: ${booking.travelers}
      Duration: ${booking.packageDetails.duration}
      
      Payment Details:
      ----------------
      Package Price: ${formatCurrency(booking.amount)}
      Total Amount: ${formatCurrency(booking.amount)}
      
      Status: ${booking.status}
      
      Thank you for choosing WanderlustTravel!
      
      Contact Information:
      --------------------
      Phone: +1 (555) 123-4567
      Email: info@wanderlusttravel.com
      Website: www.wanderlusttravel.com
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

        alert(`Invoice ${invoiceNumber} downloaded successfully!`);
    };

    const renderProfileTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <button
                onClick={handleSaveProfile}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center"
            >
                <Save className="w-5 h-5 mr-2" />
                Save Changes
            </button>
        </div>
    );

    const renderBookingsTab = () => (
        <div className="space-y-4">
            {bookings.length > 0 ? (
                bookings.map(booking => (
                    <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-semibold">{booking.destination}</h3>
                                <p className="text-sm text-gray-600">{booking.package}</p>
                                <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === 'Confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                {booking.status}
              </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                            <div className="text-lg font-semibold">${booking.amount}</div>
                        </div>

                        <div className="flex space-x-2 mt-3">
                            <button
                                onClick={() => handleViewBookingDetails(booking)}
                                className="text-purple-600 hover:text-purple-800 text-sm"
                            >
                                View Details
                            </button>
                            <button
                                onClick={() => handleDownloadInvoice(booking)}
                                className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
                            >
                                <Download className="w-4 h-4 mr-1" />
                                Download Invoice
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No upcoming trips</p>
                    <button
                        onClick={() => navigate('/packages')}
                        className="text-purple-600 hover:text-purple-800 mt-2"
                    >
                        Browse Packages
                    </button>
                </div>
            )}
        </div>
    );

    const renderPaymentMethodsTab = () => (
        <div className="space-y-4">
            {showPaymentForm ? (
                <div className="border rounded-lg p-4 mb-4">
                    <h3 className="font-semibold mb-4">Add Payment Method</h3>
                    <form onSubmit={handleSubmitPaymentMethod}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Card Type</label>
                                <select
                                    name="type"
                                    value={newPaymentMethod.type}
                                    onChange={handlePaymentInputChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="Visa">Visa</option>
                                    <option value="Mastercard">Mastercard</option>
                                    <option value="American Express">American Express</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Name on Card</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newPaymentMethod.name}
                                    onChange={handlePaymentInputChange}
                                    placeholder="John Doe"
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Card Number</label>
                                <input
                                    type="text"
                                    name="number"
                                    value={newPaymentMethod.number}
                                    onChange={handlePaymentInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={newPaymentMethod.expiry}
                                        onChange={handlePaymentInputChange}
                                        placeholder="MM/YY"
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={newPaymentMethod.cvv}
                                        onChange={handlePaymentInputChange}
                                        placeholder="123"
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                type="submit"
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                            >
                                Add Card
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowPaymentForm(false)}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <button
                    onClick={handleAddPaymentMethod}
                    className="flex items-center text-purple-600 hover:text-purple-800 mb-4"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Payment Method
                </button>
            )}

            {paymentMethods.map(method => (
                <div key={method.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <div className={`w-12 h-8 rounded border flex items-center justify-center mr-3 ${
                                method.type === 'Visa' ? 'bg-blue-500 text-white' :
                                    method.type === 'Mastercard' ? 'bg-orange-500 text-white' :
                                        'bg-blue-300 text-white'
                            }`}>
                                {method.type.slice(0, 1)}
                            </div>
                            <div>
                                <span className="font-semibold">{method.type} •••• {method.last4}</span>
                                <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                                {method.name && <p className="text-sm text-gray-600">{method.name}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {method.default ? (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Default
                </span>
                            ) : (
                                <button
                                    onClick={() => handleSetDefaultPayment(method.id)}
                                    className="text-gray-600 hover:text-gray-800 text-sm"
                                >
                                    Set Default
                                </button>
                            )}
                            <button
                                onClick={() => handleDeletePaymentMethod(method.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderSettingsTab = () => (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-3">Notification Preferences</h3>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={() => handleSettingsChange('emailNotifications')}
                            className="mr-2"
                        />
                        <span>Email notifications</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.smsNotifications}
                            onChange={() => handleSettingsChange('smsNotifications')}
                            className="mr-2"
                        />
                        <span>SMS notifications</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.promotionalOffers}
                            onChange={() => handleSettingsChange('promotionalOffers')}
                            className="mr-2"
                        />
                        <span>Promotional offers</span>
                    </label>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3">Privacy Settings</h3>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.shareData}
                            onChange={() => handleSettingsChange('shareData')}
                            className="mr-2"
                        />
                        <span>Share data for personalized recommendations</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.publicProfile}
                            onChange={() => handleSettingsChange('publicProfile')}
                            className="mr-2"
                        />
                        <span>Make profile public</span>
                    </label>
                </div>
            </div>

            <button
                onClick={handleSaveSettings}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center"
            >
                <Save className="w-5 h-5 mr-2" />
                Save Preferences
            </button>
        </div>
    );

    const renderBookingDetails = () => (
        <div className="bg-white rounded-xl shadow-md p-6">
            <button
                onClick={() => setSelectedBooking(null)}
                className="flex items-center text-purple-600 hover:text-purple-800 mb-6"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Bookings
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <img
                        src={selectedBooking.packageDetails.image}
                        alt={selectedBooking.package}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />

                    <h2 className="text-2xl font-bold mb-2">{selectedBooking.package}</h2>
                    <p className="text-gray-600 mb-4">{selectedBooking.destination}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-sm text-gray-500">Booking Reference</p>
                            <p className="font-semibold">{selectedBooking.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                selectedBooking.status === 'Confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                {selectedBooking.status}
              </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Travel Dates</p>
                            <p className="font-semibold">
                                {new Date(selectedBooking.date).toLocaleDateString()} - {new Date(selectedBooking.endDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Travelers</p>
                            <p className="font-semibold">{selectedBooking.travelers}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Package Includes</h3>
                    <ul className="space-y-2 mb-6">
                        {selectedBooking.packageDetails.includes.map((item, index) => (
                            <li key={index} className="flex items-center">
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold">Total Amount</span>
                            <span className="text-2xl font-bold text-purple-600">${selectedBooking.amount}</span>
                        </div>

                        <button
                            onClick={() => handleDownloadInvoice(selectedBooking)}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center mt-4"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Download Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'bookings', name: 'Bookings', icon: Calendar },
        { id: 'payments', name: 'Payment Methods', icon: CreditCard },
        { id: 'settings', name: 'Settings', icon: Settings }
    ];

    if (selectedBooking) {
        return renderBookingDetails();
    }

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user?.name || 'User'}</h1>
                            <p className="text-gray-600">{user?.email}</p>
                            <p className="text-sm text-gray-500">Member since 2024</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                            <h2 className="text-lg font-semibold mb-4">Account</h2>
                            <nav className="space-y-2">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-purple-50 text-purple-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <tab.icon className="w-5 h-5 mr-3" />
                                        {tab.name}
                                    </button>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="w-5 h-5 mr-3" />
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-6">
                                {tabs.find(tab => tab.id === activeTab)?.name}
                            </h2>

                            {activeTab === 'profile' && renderProfileTab()}
                            {activeTab === 'bookings' && renderBookingsTab()}
                            {activeTab === 'payments' && renderPaymentMethodsTab()}
                            {activeTab === 'settings' && renderSettingsTab()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;