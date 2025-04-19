import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";

const DashboardView = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<DocumentData[]>([]);
  const navigate = useNavigate();
  const { showLoading, hideLoading, loading } = useLoading();

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!user) return;
      const q = query(collection(db, "portfolios"), where("userId", "==", user.uid));
      showLoading();
      const snapshot = await getDocs(q);
      hideLoading();
      setPortfolios(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
                href={`/p/${portfolio.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                🔗 Public Link
              </a>
              <button
                onClick={() => navigate(`/editor?id=${portfolio.id}`)}
                className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
              >
                ✏️ Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardView;
