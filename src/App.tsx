import { Route, Routes } from "react-router-dom";
import EditorView from "./views/EditorView"; // vista normal con formulario
import PublicPortfolioView from "./views/PublicPortfolioView"; // nueva vista

function App() {
  return (
    <Routes>
      <Route path="/" element={<EditorView />} />
      <Route path="/p/:id" element={<PublicPortfolioView />} />
    </Routes>
  );
}

export default App;
