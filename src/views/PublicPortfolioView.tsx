import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Portfolio } from "../types/Portfolio";
import FullPreview from "../components/FullPreview";

const PublicPortfolioView = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      if (!id) return;
      const ref = doc(db, "portfolios", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setPortfolio(snap.data() as Portfolio);
      }
      setLoading(false);
    };

    loadPortfolio();
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;

  if (!portfolio) return <p className="p-8 text-red-600">Portfolio not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <FullPreview data={portfolio} />
    </div>
  );
};

export default PublicPortfolioView;
