import { db } from "./firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Portfolio } from "../types/Portfolio";
import { User } from "firebase/auth";

/**
 * Publica o actualiza un portafolio
 * @param portfolio Datos del portafolio
 * @param user Usuario actual
 * @param id (opcional) ID del portafolio (para actualizar)
 */
export const publishPortfolio = async (
  portfolio: Portfolio,
  user: User,
  id?: string
): Promise<string> => {
  if (id) {
    const ref = doc(db, "portfolios", id);
    await updateDoc(ref, { ...portfolio, updatedAt: new Date() });
    return id;
  } else {
    const ref = await addDoc(collection(db, "portfolios"), {
      ...portfolio,
      userId: user.uid,
      createdAt: new Date(),
    });
    return ref.id;
  }
};
