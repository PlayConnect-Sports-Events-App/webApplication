import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    // Function to decode token and extract user email
    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            setUserEmail(decoded.sub); // Assuming the email is stored in the 'email' field
        } catch (error) {
            console.error("Failed to decode token or extract email:", error);
            setUserEmail(null); // Reset userEmail on error
        }
    };

    // On component mount, check for stored token
    useEffect(() => {
        const token = localStorage.getItem('token'); // Or use cookies
        if (token) {
            setAuthToken(token);
            decodeToken(token);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token); // Or use cookies
        setAuthToken(token);
        decodeToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Or use cookies
        setAuthToken(null);
        setUserEmail(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);