// API functions
export const fetchPackages = async (filters = {}) => {
    //  API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const packages = [
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
                },
                {
                    id: 5,
                    name: "Parisian Dream",
                    location: "Paris, France",
                    price: 1899,
                    duration: "5 days",
                    image: "https://plus.unsplash.com/premium_photo-1661914178431-fc899737a386?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFBhcmlzaWFuJTIwRHJlYW18ZW58MHx8MHx8fDA%3D",
                    rating: 4.6,
                    description: "Experience the romance and culture of the City of Light"
                },
                {
                    id: 6,
                    name: "Egyptian Odyssey",
                    location: "Cairo, Egypt",
                    price: 2399,
                    duration: "9 days",
                    image: "https://media.istockphoto.com/id/1565092901/photo/the-river-nile-in-aswan-egypt.webp?a=1&b=1&s=612x612&w=0&k=20&c=2pR879PJxeh03o0XVGcP8uQs0x0Ny7_rNun5cpwZ9hs=",
                    rating: 4.7,
                    description: "Discover ancient pyramids and rich historical treasures"
                }
            ];

            // Apply filters
            let filtered = packages;
            if (filters.location) {
                filtered = filtered.filter(pkg =>
                    pkg.location.toLowerCase().includes(filters.location.toLowerCase())
                );
            }
            if (filters.minPrice) {
                filtered = filtered.filter(pkg => pkg.price >= parseInt(filters.minPrice));
            }
            if (filters.maxPrice) {
                filtered = filtered.filter(pkg => pkg.price <= parseInt(filters.maxPrice));
            }

            resolve(filtered);
        }, 300);
    });
};

export const processPayment = async (paymentData) => {
    //  payment processing
    return new Promise((resolve) => {
        setTimeout(() => {
            const confirmationNumber = `TRV${Date.now()}${Math.floor(Math.random() * 1000)}`;
            resolve({
                success: true,
                confirmationNumber,
                message: "Payment processed successfully"
            });
        }, 2000);
    });
};

export const submitContactForm = async (formData) => {
    //  form submission
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: "Thank you for your message! We will get back to you soon."
            });
        }, 1000);
    });
};