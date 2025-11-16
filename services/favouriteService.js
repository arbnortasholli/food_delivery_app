import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const addFavourite = async (userId, item) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    const favItem = {
      id: item.id,
      name: item.name,
      price: item.price,
    };

    // Create user doc if missing
    if (!userSnap.exists()) {
      await setDoc(userRef, { favourites: [favItem] });
      return;
    }

    const currentFavs = userSnap.data().favourites || [];

    // Prevent duplicates
    if (currentFavs.some(f => f.id === favItem.id)) return;

    await updateDoc(userRef, {
      favourites: [...currentFavs, favItem],
    });

  } catch (error) {
    console.log("Add favourite error:", error);
    throw error;
  }
};

export const getUserFavourites = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);

    if (!snap.exists()) return [];

    return snap.data().favourites || [];

  } catch (err) {
    console.log("Get favourites error:", err);
    return [];
  }
};
