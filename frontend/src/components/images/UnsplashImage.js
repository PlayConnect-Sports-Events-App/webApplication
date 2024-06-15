import React, { useEffect, useState } from 'react';
import axios from 'axios';

const imageCache = {};

const UnsplashImage = ({ query, onLoad }) => {
    useEffect(() => {
        const fetchImage = async () => {
            if (imageCache[query]) {
                onLoad(imageCache[query]);
                return;
            }

            try {
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: { query },
                    headers: {
                        Authorization: 'Client-ID 2KuJK31RFzSvgcConYSk3f2JPKOOYz6h1w0Ty3Yji0Y', // Replace with your actual Unsplash API key
                    },
                });
                const imageUrl = response.data.urls.regular;
                imageCache[query] = imageUrl; // Cache the image URL
                onLoad(imageUrl);
            } catch (error) {
                console.error('Error fetching image from Unsplash', error);
                if (error.response) {
                    console.error('Response status:', error.response.status);
                    console.error('Response data:', error.response.data);
                    if (error.response.status === 403) {
                        console.error('Rate limit reached. Using fallback image.');
                        // Use a fallback image URL
                        const fallbackImageUrl = 'https://via.placeholder.com/500'; // Placeholder image
                        onLoad(fallbackImageUrl);
                    }
                }
            }
        };

        if (query) {
            fetchImage();
        }
    }, [query, onLoad]);

    return null; // This component does not render anything itself
};

export default UnsplashImage;