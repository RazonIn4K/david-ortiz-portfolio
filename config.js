// Configuration for API keys and other settings
// Note: This file should not contain sensitive keys in production
// For production, use environment variables or a secure key management system

const CONFIG = {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '' // Use environment variable
};

// Initialize Google Maps (only if not already set)
document.addEventListener('DOMContentLoaded', function() {
    const mapImg = document.getElementById('location-map');
    if (mapImg && !mapImg.src && CONFIG.GOOGLE_MAPS_API_KEY) {
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=Chicago,IL&zoom=11&size=300x200&maptype=roadmap&markers=color:green%7Clabel:D%7CChicago,IL&key=${CONFIG.GOOGLE_MAPS_API_KEY}`;
        mapImg.src = mapUrl;
    }
});