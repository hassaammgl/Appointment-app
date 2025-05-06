
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Redirect based on user role
  if (user) {
    switch (user.role) {
      case "cto":
        return <Navigate to="/cto-dashboard" />;
      case "ceo":
        return <Navigate to="/ceo-dashboard" />;
      case "cfo":
        return <Navigate to="/cfo-dashboard" />;
      case "gm":
        return <Navigate to="/gm-dashboard" />;
      case "receptionist":
        return <Navigate to="/receptionist-dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }
  
  return <Navigate to="/login" />;
};

export default Index;
