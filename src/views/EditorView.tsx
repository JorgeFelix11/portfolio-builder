import { useEffect, useState } from "react";
import Form from "../components/Form";
import FullPreview from "../components/FullPreview";
import { savePortfolioWithSlug } from "../lib/portfolio";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Portfolio } from "../types/Portfolio";
import { useNotification } from "../context/NotificationContext";
import { useLoading } from "../context/LoadingContext";

function EditorView() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [portfolio, setPortfolio] = useState<Portfolio>({
    userId: "",
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
    
      let snapshot = null;
    
      // intentar como doc ID
      const ref = doc(db, "portfolios", "OysOPHuK2JCVymGQf5yz");
      const snap = await getDoc(ref);
      console.log(id, snap)
      if (snap.exists()) {
        snapshot = snap;
      } else {
        // fallback: intentar como publicId
        const q = query(collection(db, "portfolios"), where("publicId", "==", id));
        const result = await getDocs(q);
        if (!result.empty) {
          snapshot = result.docs[0];
        }
      }
    
      if (snapshot) {
        setPortfolio({ ...snapshot.data(), id: snapshot.id } as Portfolio);
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
    try {
      if (id) {
        const ref = doc(db, "portfolios", id);
        await setDoc(ref, { ...portfolio, updatedAt: new Date() });
        setPublicLink(`${window.location.origin}/p/${portfolio.publicId || id}`);
        notify({ message: "✅ Portfolio updated!", type: "success" });
      } else {
        const newId = await savePortfolioWithSlug(portfolio, user);
        setPortfolio((prev) => ({ ...prev, publicId: newId }));
        setPublicLink(`${window.location.origin}/p/${newId}`);
        notify({ message: "✅ Portfolio published!", type: "success" });
      }
    } catch (error) {
      console.error("Error saving portfolio:", error);
      notify({ message: "❌ Failed to save portfolio.", type: "error" });
    } finally {
      hideLoading();
    }
  };
  
  useEffect(() => {
    if (id) return;
    const saved = localStorage.getItem("portfolio-data");
    if (saved) {
      setPortfolio(JSON.parse(saved));
    }
  }, [id]);
  
  useEffect(() => {
    localStorage.setItem("portfolio-data", JSON.stringify(portfolio));
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
