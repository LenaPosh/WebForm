// ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Проверяем, есть ли токен
    console.log('Is Authenticated:', isAuthenticated); // Для отладки
    return isAuthenticated ? children : <Navigate to="/" replace />;
};


export default ProtectedRoute;
