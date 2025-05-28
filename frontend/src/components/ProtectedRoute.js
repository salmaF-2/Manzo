// frontend/components/ProtectedRoute.js
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/Seconnecter" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;