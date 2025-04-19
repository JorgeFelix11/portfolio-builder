import { useEffect, useState } from "react";
import Form from "../components/Form";
import FullPreview from "../components/FullPreview";
import { publishPortfolio } from "../lib/publishPortfolio";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Portfolio } from "../types/Portfolio";
import { useNotification } from "../context/NotificationContext";
import { useLoading } from "../context/LoadingContext";


const STORAGE_KEY = "portfolio-data";

function EditorView() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [portfolio, setPortfolio] = useState<Portfolio>({
    name: "",
    title: "",
    template: "clean",
    sections: [{
      blocks: [], anchor: '', label: '',
      textAlign: "left",
      textColor: "",
      bgColor: ""
    }]
  });

  const { notify } = useNotification();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const loadPortfolio = async () => {
      if (!id) return;
      showLoading();
      const ref = doc(db, "portfolios", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setPortfolio(snap.data() as Portfolio);
      }
      hideLoading();
    };
  
    loadPortfolio();
  }, [id]);

  const [publicLink, setPublicLink] = useState<string | null>(null);
  const { user } = useAuth();

  const handlePublish = async () => {
    if (!user) return;
    showLoading();
    const newId = await publishPortfolio(portfolio, user, id ?? undefined);
    setPublicLink(`${window.location.origin}/p/${newId}`);
    hideLoading();
    notify({
      message: id ? "✅ Portfolio updated!" : "✅ Portfolio published!",
      type: "success",
    });
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
  
  return (
    <div className="min-h-screen p-8 bg-gray-100">
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
