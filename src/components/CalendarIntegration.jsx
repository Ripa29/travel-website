import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Download } from 'lucide-react';

const CalendarIntegration = ({ package: travelPackage, onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [numberOfTravelers, setNumberOfTravelers] = useState(2);
    const [duration, setDuration] = useState(travelPackage.duration);

    // Generate sample available dates (in a real app, this would come from an API)
    const availableDates = [
        '2024-04-15', '2024-04-18', '2024-04-22', '2024-04-25',
        '2024-05-02', '2024-05-06', '2024-05-10', '2024-05-15'
    ];

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    const addToCalendar = (format) => {
        // In a real app, this would generate actual calendar files
        alert(`Downloading ${format} calendar file for ${selectedDate}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
                <Calendar className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-xl font-semibold">Select Your Travel Dates</h3>
            </div>

            {/* Traveler information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <select
                            value={numberOfTravelers}
                            onChange={(e) => setNumberOfTravelers(parseInt(e.target.value))}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Trip Duration</label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="5 days">5 Days</option>
                            <option value="7 days">7 Days</option>
                            <option value="10 days">10 Days</option>
                            <option value="14 days">14 Days</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Available dates */}
            <div className="mb-6">
                <h4 className="font-semibold mb-3">Available Departure Dates</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableDates.map(date => (
                        <button
                            key={date}
                            onClick={() => handleDateSelect(date)}
                            className={`p-3 rounded-lg border text-center transition-all ${
                                selectedDate === date
                                    ? 'bg-purple-600 text-white border-purple-600'
                                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                        >
                            <div className="text-sm font-medium">
                                {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                            <div className="text-lg font-bold">
                                {new Date(date).getDate()}
                            </div>
                            <div className="text-xs opacity-75">
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected date info */}
            {selectedDate && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-purple-900">Selected Date</h4>
                            <p className="text-purple-700">
                                {new Date(selectedDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => addToCalendar('Google')}
                                className="px-3 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg text-sm hover:bg-purple-50 flex items-center"
                            >
                                <Download className="w-4 h-4 mr-1" />
                                Google
                            </button>
                            <button
                                onClick={() => addToCalendar('iCal')}
                                className="px-3 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg text-sm hover:bg-purple-50 flex items-center"
                            >
                                <Download className="w-4 h-4 mr-1" />
                                iCal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Price summary */}
            <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Package Price</span>
                    <span className="font-semibold">${travelPackage.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Travelers ({numberOfTravelers})</span>
                    <span className="font-semibold">x{numberOfTravelers}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2 mt-2">
                    <span>Total Estimate</span>
                    <span className="text-purple-600">
            ${travelPackage.price * numberOfTravelers}
          </span>
                </div>
            </div>
        </div>
    );
};

export default CalendarIntegration;