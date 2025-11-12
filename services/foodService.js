import { 
  collection, 
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const getFoods = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'foods'));
    const foods = [];
    querySnapshot.forEach((doc) => {
      foods.push({ id: doc.id, ...doc.data() });
    });
    return foods;
  } catch (error) {
    console.error('Error getting foods:', error);
    return [];
  }
};

export const addFood = async (foodData) => {
  try {
    const docRef = await addDoc(collection(db, 'foods'), {
      ...foodData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding food:', error);
    throw error;
  }
};