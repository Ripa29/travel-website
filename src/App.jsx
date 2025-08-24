import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Booking from './pages/Booking';
import Auth from './pages/Auth';
import Weather from './pages/Weather';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import LuxuryStays from './pages/LuxuryStays';
import PrivateJets from './pages/PrivateJets';
import YachtCharters from './pages/YachtCharters';
import TravelInsurance from './pages/TravelInsurance';
import Account from './pages/Account';
import { AuthProvider } from './utils/auth';
import TravelAdvisory from "./pages/TravelAdvisory.jsx";


function App() {
    const [specialBanner, setSpecialBanner] = useState(true);

    return (
        <AuthProvider>
            <Router>
                <div className="App min-h-screen flex flex-col">
                    {specialBanner && (
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 text-center relative">
                            <span className="font-bold animate-pulse">🎉 SPECIAL OFFER: 30% OFF on all packages! Book now!</span>
                            <button
                                onClick={() => setSpecialBanner(false)}
                                className="absolute right-4 top-2 text-white"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                    <Navigation />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/packages" element={<Packages />} />
                            <Route path="/booking/:id" element={<Booking />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/weather" element={<Weather />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:id" element={<BlogPost />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/terms" element={<Terms />} />

                            {/* New routes */}
                            <Route path="/stays" element={<LuxuryStays />} />
                            <Route path="/private-jets" element={<PrivateJets />} />
                            <Route path="/yachts" element={<YachtCharters />} />
                            <Route path="/travel-insurance" element={<TravelInsurance />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/bookings" element={<Account />} />
                            <Route path="/travel-advisory" element={<TravelAdvisory />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;