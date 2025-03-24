import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService.js';

function ProtectedRoute({ children }) {
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute; 