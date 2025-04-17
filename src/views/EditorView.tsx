import { useEffect, useState } from "react";
import { Portfolio } from "../types/Portfolio";
import Form from "../components/Form";
import FullPreview from "../components/FullPreview";
import { publishPortfolio } from "../lib/publishPortfolio";

const STORAGE_KEY = "portfolio-data";

function EditorView() {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    name: "",
    title: "",
    about: "",
    technologies: [],
    projects: [],
  });
// Dentro del componente
const [publicLink, setPublicLink] = useState<string | null>(null);

const handlePublish = async () => {
  const id = await publishPortfolio(portfolio);
  setPublicLink(`${window.location.origin}/p/${id}`);
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
