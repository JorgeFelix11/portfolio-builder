import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useNotification } from "./NotificationContext";
import { useLoading } from "./LoadingContext";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // 👈 solo aquí decimos "ya sabemos si hay usuario o no"
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      showLoading();
      await signInWithPopup(auth, googleProvider);
      hideLoading();
      notify({ message: "Welcome back!", type: "success" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Mostrar error al usuario
      let message = "Something went wrong during login.";
  
      switch (error.code) {
        case "auth/popup-closed-by-user":
          message = "Login cancelled by user.";
          break;
        case "auth/unauthorized-domain":
          message = "This domain is not authorized to use Google Login. Check Firebase settings.";
          break;
        case "auth/network-request-failed":
          message = "Network error. Please check your internet connection.";
          break;
        default:
          message = error.message || message;
          break;
      }
      hideLoading();
      notify({ message: "Login failed: " + message, type: "error" });
      console.error("Login error:", error);
    }
  };
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
