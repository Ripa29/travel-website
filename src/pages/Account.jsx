import React, { useState } from 'react';
import { User, Calendar, MapPin, CreditCard, Settings, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/24', default: true },
        { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/25', default: false }
    ]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const bookings = [
        {
            id: 'TRV123456',
            destination: 'Bali, Indonesia',
            date: '2024-04-15',
            status: 'Confirmed',
            amount: 1299,
            package: 'Bali Paradise'
        },
        {
            id: 'TRV123457',
            destination: 'Tokyo, Japan',
            date: '2024-05-20',
            status: 'Pending',
            amount: 1799,
            package: 'Tokyo Explorer'
        }
    ];

    const handleAddPaymentMethod = () => {
        // In a real app, this would open a payment method form
        alert('Add payment method functionality would open a secure form here');
    };

    const handleSetDefaultPayment = (id) => {
        setPaymentMethods(methods =>
            methods.map(method => ({
                ...method,
                default: method.id === id
            }))
        );
    };

    const handleDeletePaymentMethod = (id) => {
        setPaymentMethods(methods => methods.filter(method => method.id !== id));
    };

    const renderProfileTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                        type="text"
                        defaultValue={user?.name?.split(' ')[0] || ''}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                        type="text"
                        defaultValue={user?.name?.split(' ')[1] || ''}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                    type="email"
                    defaultValue={user?.email || ''}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
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
                            <button className="text-purple-600 hover:text-purple-800 text-sm">
                                View Details
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm">
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
            <button
                onClick={handleAddPaymentMethod}
                className="flex items-center text-purple-600 hover:text-purple-800 mb-4"
            >
                <Plus className="w-5 h-5 mr-2" />
                Add Payment Method
            </button>

            {paymentMethods.map(method => (
                <div key={method.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <div className={`w-12 h-8 rounded border flex items-center justify-center mr-3 ${
                                method.type === 'Visa' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                            }`}>
                                {method.type.slice(0, 1)}
                            </div>
                            <div>
                                <span className="font-semibold">{method.type} •••• {method.last4}</span>
                                <p className="text-sm text-gray-600">Expires {method.expiry}</p>
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
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span>Email notifications</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span>SMS notifications</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span>Promotional offers</span>
                    </label>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3">Privacy Settings</h3>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span>Share data for personalized recommendations</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Make profile public</span>
                    </label>
                </div>
            </div>

            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                Save Preferences
            </button>
        </div>
    );

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'bookings', name: 'Bookings', icon: Calendar },
        { id: 'payments', name: 'Payment Methods', icon: CreditCard },
        { id: 'settings', name: 'Settings', icon: Settings }
    ];

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