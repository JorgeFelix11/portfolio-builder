import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Portfolio } from "../types/Portfolio";
import { slugify } from "../utils/slugify";
import { User } from "firebase/auth";

export const savePortfolioWithSlug = async (portfolio: Portfolio, user: User) => {
  const base = slugify(user.displayName || user.email?.split("@")[0] || "user");
  let candidate = base;
  let suffix = 1;

  while (true) {
    const q = query(collection(db, "portfolios"), where("publicId", "==", candidate));
    const snapshot = await getDocs(q);
    if (snapshot.empty) break;
    candidate = `${base}-${suffix++}`;
  }

  await addDoc(collection(db, "portfolios"), {
    ...portfolio,
    createdAt: new Date(),
    publicId: candidate,
    userId: portfolio.userId,
  });

  return candidate; // para redirigir a /p/{publicId}
};

// Obtener portfolio por publicId en vista pública
export const getPortfolioByPublicId = async (publicId: string): Promise<Portfolio | null> => {
  const q = query(collection(db, "portfolios"), where("publicId", "==", publicId));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docData = snapshot.docs[0].data();
  return { ...docData, id: snapshot.docs[0].id } as unknown as Portfolio;
};
