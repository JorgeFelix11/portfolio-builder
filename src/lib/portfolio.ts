import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Portfolio } from "../types/Portfolio";
import { slugify } from "../utils/slugify";
import { User } from "firebase/auth";

export const savePortfolioWithSlug = async (
  portfolio: Portfolio,
  user: User
): Promise<string> => {
  const base = slugify(user.displayName || user.email?.split("@")[0] || "user");
  let candidate = base;
  let suffix = 1;

  // Asegura que el publicId sea único
  while (true) {
    const q = query(collection(db, "portfolios"), where("publicId", "==", candidate));
    const snapshot = await getDocs(q);
    if (snapshot.empty) break;
    candidate = `${base}-${suffix++}`;
  }

  // Guarda el documento sin campo id, pero con publicId
  await addDoc(collection(db, "portfolios"), {
    ...portfolio,
    userId: user.uid,
    publicId: candidate,
    createdAt: new Date(),
  });

  return candidate; // esto se puede usar para construir la URL
};

export const getPortfolioByPublicId = async (publicId: string): Promise<Portfolio | null> => {
  const q = query(collection(db, "portfolios"), where("publicId", "==", publicId));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docData = snapshot.docs[0].data();
  return { ...docData, id: snapshot.docs[0].id } as unknown as Portfolio;
};
