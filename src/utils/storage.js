// Local storage
export const storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error getting data from localStorage', error);
            return null;
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error setting data to localStorage', error);
            return false;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing data from localStorage', error);
            return false;
        }
    },

    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage', error);
            return false;
        }
    }
};

//  storage functions
export const getBookings = () => {
    return storage.get('bookings') || [];
};

export const saveBooking = (booking) => {
    const bookings = getBookings();
    bookings.push(booking);
    return storage.set('bookings', bookings);
};

export const getReviews = () => {
    return storage.get('reviews') || [];
};

export const saveReview = (review) => {
    const reviews = getReviews();
    reviews.push(review);
    return storage.set('reviews', reviews);
};