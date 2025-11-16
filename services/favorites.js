// /services/favorites.js
import { db } from "../../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth } from "../../config/firebase";

export const getUserId = () => {
  const user = auth.currentUser;
  return user ? user.uid : null;
};

// ALWAYS use "favourites"
export const getFavorites = async () => {
  const uid = getUserId();
  if (!uid) return [];

  const userDoc = doc(db, "users", uid);
  const snapshot = await getDoc(userDoc);

  if (!snapshot.exists()) return [];

  return snapshot.data().favourites || [];
};

export const toggleFavourite = async (foodId) => {
  const uid = getUserId();
  if (!uid) return;

  const userDoc = doc(db, "users", uid);
  const snapshot = await getDoc(userDoc);

  let favourites = [];

  if (snapshot.exists()) {
    favourites = snapshot.data().favourites || [];
  }

  let updatedFavourites;

  if (favourites.includes(foodId)) {
    updatedFavourites = favourites.filter((id) => id !== foodId);
  } else {
    updatedFavourites = [...favourites, foodId];
  }

  await updateDoc(userDoc, { favourites: updatedFavourites });

  return updatedFavourites;
};
