import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPortfolioByPublicId } from "../lib/portfolio";
import { Portfolio } from "../types/Portfolio";
import FullPreview from "../components/FullPreview";

const PublicPortfolioView = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      if (!id) return;
      const data = await getPortfolioByPublicId(id);
      setPortfolio(data);
      setLoading(false);
    };

    loadPortfolio();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading portfolio...</p>;
  if (!portfolio) return <p className="text-center text-red-500 mt-10">Portfolio not found.</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <FullPreview data={portfolio} />
    </div>
  );
};

export default PublicPortfolioView;
