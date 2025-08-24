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

// Blog post storage functions
export const saveBlogPost = (postData, isEditing = false) => {
    try {
        const existingPosts = JSON.parse(localStorage.getItem('userBlogPosts') || '[]');

        if (isEditing) {
            // Update existing post
            const updatedPosts = existingPosts.map(post =>
                post.id === postData.id ? postData : post
            );
            localStorage.setItem('userBlogPosts', JSON.stringify(updatedPosts));
        } else {
            // Add new post
            const newPosts = [...existingPosts, postData];
            localStorage.setItem('userBlogPosts', JSON.stringify(newPosts));
        }
        return true;
    } catch (error) {
        console.error('Error saving blog post:', error);
        return false;
    }
};

export const deleteBlogPost = (postId) => {
    try {
        const existingPosts = JSON.parse(localStorage.getItem('userBlogPosts') || '[]');
        const filteredPosts = existingPosts.filter(post => post.id !== postId);
        localStorage.setItem('userBlogPosts', JSON.stringify(filteredPosts));
        return true;
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return false;
    }
};

export const getUserBlogPosts = () => {
    try {
        return JSON.parse(localStorage.getItem('userBlogPosts') || '[]');
    } catch (error) {
        console.error('Error getting user blog posts:', error);
        return [];
    }
};