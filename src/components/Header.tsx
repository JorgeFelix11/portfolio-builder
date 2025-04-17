import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow mb-4">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Portfolio Builder
      </h1>

      {user ? (
        <div className="flex items-center gap-4">
          <Link to="/editor" className="text-sm text-blue-600 hover:underline">
            + New
          </Link>
          <Link to="/dashboard" className="text-sm text-blue-600 hover:underline">
            Dashboard
          </Link>
          <span className="text-sm text-gray-600">{user.displayName}</span>
          <button onClick={logout} className="text-sm text-red-600 hover:underline">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={login} className="text-sm text-blue-600 hover:underline">
          Login with Google
        </button>
      )}
    </header>
  );
};

export default Header;
