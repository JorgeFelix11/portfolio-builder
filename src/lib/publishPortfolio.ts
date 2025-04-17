import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { Portfolio } from "../types/Portfolio";

/**
 * Publica un portafolio en Firestore y devuelve el ID
 */
export const publishPortfolio = async (portfolio: Portfolio) => {
  const docRef = await addDoc(collection(db, "portfolios"), portfolio);
  return docRef.id; // ← úsalo para crear el link público
};
