import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Plane,
    Menu,
    X,
    User,
    Phone,
    MessageCircle,
    Search,
    ChevronDown,
    Shield,
    FileText,
    Calendar,
    XCircle
} from 'lucide-react';
import { useAuth } from '../utils/auth';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSearchOpen]);

    const navItems = [
        { name: 'Home', path: '/' },
        {
            name: 'Services',
            path: '#',
            children: [
                { name: 'Destinations', path: '/packages' },
                { name: 'Luxury Stays', path: '/stays' },
                { name: 'Private Jets', path: '/private-jets' },
                { name: 'Yacht Charters', path: '/yachts' }
            ]
        },
        { name: 'Blog', path: '/blog' },
        { name: 'Weather', path: '/weather' },
        { name: 'Contact', path: '/contact' }
    ];

    const handleServicesClick = (e) => {
        if (window.innerWidth < 1024) {
            e.preventDefault();
            setIsServicesOpen(!isServicesOpen);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const quickLinks = [
        { name: 'My Bookings', path: '/bookings', icon: Calendar },
        { name: 'Travel Insurance', path: '/travel-insurance', icon: Shield },
        { name: 'Terms & Conditions', path: '/terms', icon: FileText }
    ];

    return (
        <>
            {/* Top announcement bar */}
            <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-2 text-center text-sm">
                <div className="container mx-auto px-4">
                    <span className="animate-pulse">✨ Exclusive Offer: Complimentary Airport Transfer with Premium Package</span>
                </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-start justify-center pt-20 px-4">
                    <div className="pt-20 bg-white rounded-lg shadow-xl w-full max-w-2xl">
                        <div className="relative">
                            <form onSubmit={handleSearchSubmit} className="flex items-center p-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search destinations, packages, experiences..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
                                        autoFocus
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                        >
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSearchClose}
                                    className="ml-4 text-gray-500 hover:text-gray-700 font-medium"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Main navigation */}
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl' : 'bg-white'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
                                <Plane className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    WanderlustTravel
                                </div>
                                <div className="text-xs text-gray-500 -mt-1">Luxury Experiences</div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navItems.map(item => (
                                <div key={item.name} className="relative group">
                                    {item.children ? (
                                        <>
                                            <button
                                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                                className={`flex items-center py-2 font-medium transition-colors ${
                                                    location.pathname.startsWith('/packages') ||
                                                    location.pathname.startsWith('/stays') ||
                                                    location.pathname.startsWith('/private-jets') ||
                                                    location.pathname.startsWith('/yachts')
                                                        ? 'text-purple-600'
                                                        : 'text-gray-700 hover:text-purple-600'
                                                }`}
                                            >
                                                {item.name}
                                                <ChevronDown className="w-4 h-4 ml-1" />
                                            </button>

                                            {/* Services dropdown */}
                                            <div className="absolute top-full left-0 w-48 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                                {item.children.map(child => (
                                                    <Link
                                                        key={child.name}
                                                        to={child.path}
                                                        className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className={`relative py-2 font-medium transition-colors ${
                                                location.pathname === item.path
                                                    ? 'text-purple-600'
                                                    : 'text-gray-700 hover:text-purple-600'
                                            }`}
                                        >
                                            {item.name}
                                            {location.pathname === item.path && (
                                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"></span>
                                            )}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right side actions */}
                        <div className="flex items-center space-x-4">
                            {/* Search icon */}
                            <button
                                onClick={handleSearchClick}
                                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <Search className="w-5 h-5 text-gray-600" />
                            </button>

                            {/* Contact buttons */}
                            <div className="hidden md:flex items-center space-x-2">
                                <a href="tel:+15551234567" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-purple-600 transition-colors">
                                    <Phone className="w-4 h-4 mr-1" />
                                    <span className="hidden lg:inline">+1 (555) 123-4567</span>
                                </a>
                                <Link to="/contact" className="flex items-center px-3 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    <span className="hidden lg:inline">Contact</span>
                                </Link>
                            </div>

                            {/* User account */}
                            {user ? (
                                <div className="flex items-center space-x-3">
                                    <Link to="/account" className="flex items-center space-x-2 text-sm text-gray-700 hover:text-purple-600">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            {user.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <span className="hidden lg:inline">My Account</span>
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/auth"
                                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                                >
                                    <User className="w-4 h-4" />
                                    <span className="hidden sm:inline">Sign In</span>
                                </Link>
                            )}

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Quick Links Bar - Desktop */}
                    <div className="hidden lg:flex justify-center space-x-6 py-3 border-t border-gray-100">
                        {quickLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="flex items-center text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
                            >
                                <link.icon className="w-4 h-4 mr-2" />
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white border-t shadow-xl">
                        <div className="container mx-auto px-4 py-4">
                            {/* Search in mobile menu */}
                            <div className="mb-6">
                                <form onSubmit={handleSearchSubmit} className="flex items-center">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="ml-2 p-2 bg-purple-600 text-white rounded-lg"
                                    >
                                        <Search className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>

                            {/* Navigation links */}
                            <div className="space-y-1 mb-6">
                                {navItems.map(item => (
                                    <div key={item.name}>
                                        {item.children ? (
                                            <>
                                                <button
                                                    onClick={handleServicesClick}
                                                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-left font-medium text-gray-700 hover:bg-gray-50"
                                                >
                                                    <span>{item.name}</span>
                                                    <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                {isServicesOpen && (
                                                    <div className="pl-6 mt-1 space-y-1">
                                                        {item.children.map(child => (
                                                            <Link
                                                                key={child.name}
                                                                to={child.path}
                                                                onClick={() => setIsMenuOpen(false)}
                                                                className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-purple-600"
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Quick links */}
                            <div className="border-t pt-4 space-y-2">
                                {quickLinks.map(link => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center px-4 py-2 text-gray-700 hover:text-purple-600"
                                    >
                                        <link.icon className="w-4 h-4 mr-3" />
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Contact info */}
                            <div className="border-t pt-4 mt-4">
                                <a href="tel:+15551234567" className="flex items-center px-4 py-2 text-gray-700">
                                    <Phone className="w-4 h-4 mr-3" />
                                    <span>+1 (555) 123-4567</span>
                                </a>
                                <Link
                                    to="/contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center px-4 py-2 text-gray-700"
                                >
                                    <MessageCircle className="w-4 h-4 mr-3" />
                                    <span>Contact Us</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navigation;