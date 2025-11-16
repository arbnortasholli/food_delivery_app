import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../config/firebase";

export const getUserId = () => {
  const user = auth.currentUser;
  return user ? user.uid : null;
};


export const getFavorites = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log("❌ No user logged in");
      return [];
    }

    const userDoc = doc(db, "users", user.uid);
    const snapshot = await getDoc(userDoc);

    if (!snapshot.exists()) {
      console.log("❌ User document not found");
      return [];
    }

    const favourites = snapshot.data().favourites || [];
    console.log("📋 Favourites from users collection:", favourites);
    return favourites;
  } catch (error) {
    console.error('Error getting favourites:', error);
    return [];
  }
};

export const removeFavourite = async (itemId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error('❌ User not logged in');
      return { error: 'User not logged in' };
    }

    console.log("🔍 DEBUG removeFavourite:", { 
      userId: user.uid, 
      itemId: itemId,
      itemIdType: typeof itemId 
    });
    
    const userDoc = doc(db, "users", user.uid);
    const snapshot = await getDoc(userDoc);

    if (!snapshot.exists()) {
      console.error('❌ User document not found');
      return { error: 'User not found' };
    }

    const currentFavourites = snapshot.data().favourites || [];
    console.log("📋 Current favourites before remove:", currentFavourites);
    

    const updatedFavourites = currentFavourites.filter(fav => {
      console.log(`🔍 Comparing: ${fav.id} (${typeof fav.id}) vs ${itemId} (${typeof itemId})`);
      return fav.id !== itemId;
    });
    
    console.log("📋 Updated favourites after remove:", updatedFavourites);
    

    await updateDoc(userDoc, { favourites: updatedFavourites });
    
    console.log("✅ Favourite removed successfully");
    return { success: true };
  } catch (error) {
    console.error('❌ Error removing favourite:', error);
    return { error: error.message };
  }
};