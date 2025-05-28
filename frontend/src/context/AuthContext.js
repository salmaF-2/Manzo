// frontend/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     const login = (userData) => {
//         setUser(userData);
//         // Vous pourriez aussi stocker dans localStorage/sessionStorage ici
//     };

//     const logout = () => {
//         setUser(null);
//         // Nettoyer le storage si nécessaire
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Optionnel: Récupérer l'utilisateur depuis localStorage au chargement
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);