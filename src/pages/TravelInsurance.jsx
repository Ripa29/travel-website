import React, { useState } from 'react';
import { Shield, Check, AlertTriangle, Globe, Heart, Briefcase } from 'lucide-react';

const TravelInsurance = () => {
    const [selectedPlan, setSelectedPlan] = useState('standard');

    const plans = [
        {
            id: 'basic',
            name: 'Basic Coverage',
            price: 49,
            features: [
                'Emergency medical expenses',
                'Trip cancellation',
                'Lost luggage',
                '24/7 emergency assistance'
            ],
            recommended: false
        },
        {
            id: 'standard',
            name: 'Standard Protection',
            price: 89,
            features: [
                'All Basic features plus:',
                'Trip interruption',
                'Emergency evacuation',
                'Adventure sports coverage',
                'Cancel for any reason'
            ],
            recommended: true
        },
        {
            id: 'premium',
            name: 'Premium Security',
            price: 149,
            features: [
                'All Standard features plus:',
                'Pre-existing conditions',
                'Rental car coverage',
                'Identity theft protection',
                'Business equipment coverage',
                'Concierge services'
            ],
            recommended: false
        }
    ];

    const benefits = [
        {
            icon: Globe,
            title: 'Worldwide Coverage',
            description: 'Protection wherever your travels take you'
        },
        {
            icon: Heart,
            title: 'Medical Emergency',
            description: 'Comprehensive medical coverage abroad'
        },
        {
            icon: Briefcase,
            title: 'Trip Protection',
            description: 'Coverage for cancellations and interruptions'
        }
    ];

    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Travel Insurance</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Protect your journey with comprehensive travel insurance designed for peace of mind.
                    </p>
                </div>

                {/* Insurance Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {plans.map(plan => (
                        <div
                            key={plan.id}
                            className={`bg-white rounded-xl shadow-md p-6 relative ${
                                plan.recommended ? 'ring-2 ring-purple-600 transform scale-105' : ''
                            }`}
                        >
                            {plan.recommended && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-semibold mb-4 text-center">{plan.name}</h3>

                            <div className="text-center mb-6">
                                <span className="text-3xl font-bold text-purple-600">${plan.price}</span>
                                <span className="text-gray-600"> per trip</span>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-600">
                                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setSelectedPlan(plan.id)}
                                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                    selectedPlan === plan.id
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Benefits */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-8 text-center">Why You Need Travel Insurance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center">
                                <benefit.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Important Information */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-start">
                        <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold mb-2">Important Information</h3>
                            <p className="text-yellow-700">
                                Travel insurance must be purchased before departure. Coverage terms and conditions apply.
                                Please read the policy documents carefully for full details of coverage and exclusions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelInsurance;