import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { Portfolio } from "../types/Portfolio";

const DashboardView = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<(Portfolio & { id: string })[]>([]);
  const navigate = useNavigate();
  const { showLoading, hideLoading, loading } = useLoading();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this portfolio?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "portfolios", id));
      setPortfolios((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    }
  };

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!user) return;
      const q = query(collection(db, "portfolios"), where("userId", "==", user.uid));
      showLoading();
      const snapshot = await getDocs(q);
      hideLoading();
      setPortfolios(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as (Portfolio & { id: string })[]
      );
    };

    fetchPortfolios();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">📂 My Portfolios</h1>
      {portfolios.length === 0 && !loading && <p>No portfolios created yet.</p>}
      <ul className="space-y-4">
        {portfolios.map((portfolio) => (
          <li key={portfolio.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{portfolio.name || "Untitled Portfolio"}</h2>
            </div>
            <div className="flex gap-3 items-center">
              <a
                href={`/p/${portfolio.publicId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Public Link
              </a>
              <button
                onClick={() => navigate(`/editor?id=${portfolio.id}`)}
                className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(portfolio.id)}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardView;
