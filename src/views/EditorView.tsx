import { useEffect, useState } from "react";
import Form from "../components/Form";
import FullPreview from "../components/FullPreview";
import { publishPortfolio } from "../lib/publishPortfolio";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Portfolio } from "../types/Portfolio";


const STORAGE_KEY = "portfolio-data";

function EditorView() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [portfolio, setPortfolio] = useState<Portfolio>({
    name: "",
    title: "",
    about: "",
    technologies: [],
    projects: [],
    template: "clean",
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loadPortfolio = async () => {
      if (!id) return;
      setLoading(true);
      const ref = doc(db, "portfolios", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setPortfolio(snap.data() as Portfolio);
      }
      setLoading(false);
    };
  
    loadPortfolio();
  }, [id]);

  const [publicLink, setPublicLink] = useState<string | null>(null);
  const { user } = useAuth();

  const handlePublish = async () => {
    if (!user) return;
  
    const newId = await publishPortfolio(portfolio, user, id ?? undefined);
    setPublicLink(`${window.location.origin}/p/${newId}`);
    alert(id ? "Portfolio updated!" : "Portfolio published!");
  };

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPortfolio(JSON.parse(saved));
    }
  }, []);

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
  }, [portfolio]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Loading your portfolio...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-8">📋 Portfolio Builder</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Edit</h2>
          <Form data={portfolio} onChange={setPortfolio} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <FullPreview data={portfolio} />
        </div>
        <button
          onClick={handlePublish}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
        >
          🔗 Publish Portfolio
        </button>

        {publicLink && (
          <p className="mt-4 text-blue-600">
            Public link: <a href={publicLink}>{publicLink}</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default EditorView;
