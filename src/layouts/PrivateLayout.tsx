import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const PrivateLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
