import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    // On component mount, check for stored token
    useEffect(() => {
        const token = localStorage.getItem('token'); // Or use cookies
        if (token) {
            setAuthToken(token);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token); // Or use cookies
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Or use cookies
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);