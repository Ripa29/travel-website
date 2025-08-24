import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
            title: "Discover Paradise",
            subtitle: "Explore the world's most beautiful destinations"
        },
        {
            image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop",
            title: "Adventure Awaits",
            subtitle: "Create unforgettable memories"
        },
        {
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop",
            title: "Luxury Escapes",
            subtitle: "Indulge in premium experiences"
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-96 md:h-[500px] overflow-hidden">
            {heroSlides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                            <p className="text-xl md:text-2xl">{slide.subtitle}</p>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-40"
            >
                <ChevronLeft />
            </button>

            <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-40"
            >
                <ChevronRight />
            </button>
        </div>
    );
};

export default Hero;