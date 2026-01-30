import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const adminLogin = (user, token) => {
    localStorage.setItem('nexus_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    setUser(user);
};


    useEffect(() => {
        const token = localStorage.getItem('nexus_token');
        const userData = localStorage.getItem('user_data');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save to localStorage
            localStorage.setItem('nexus_token', data.token);

            // Normalize user data logic from legacy code
            const userInfo = {
                ...data.user,
                userId: data.user._id || data.user.id
            };
            localStorage.setItem('user_data', JSON.stringify(userInfo));
            localStorage.setItem('userId', userInfo.userId); // Legacy compatibility

            setUser(userInfo);
            return userInfo;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('userId');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register,adminLogin, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
