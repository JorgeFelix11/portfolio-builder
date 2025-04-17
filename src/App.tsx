import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LandingPage from "./views/LandingPage";
import EditorView from "./views/EditorView";
import DashboardView from "./views/DashboardView";
import PublicPortfolioView from "./views/PublicPortfolioView";
import PrivateLayout from "./layouts/PrivateLayout";

function App() {
  const { user } = useAuth();
  const location = useLocation();

  const atLandingPage = location.pathname === "/";

  return (
    <Routes>
      {/* Página pública */}
      <Route
        path="/"
        element={user && atLandingPage ? <Navigate to="/editor" /> : <LandingPage />}
      />

      {/* Vista pública de portafolios */}
      <Route path="/p/:id" element={<PublicPortfolioView />} />

      {/* Rutas protegidas con layout y redirección */}
      <Route path="/" element={<PrivateLayout />}>
        <Route path="editor" element={<EditorView />} />
        <Route path="dashboard" element={<DashboardView />} />
      </Route>
    </Routes>
  );
}

export default App