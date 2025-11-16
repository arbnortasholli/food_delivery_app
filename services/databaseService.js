import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// === RESTAURANT SERVICES ===
export const getRestaurants = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'restaurants'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting restaurants:', error);
    return [];
  }
};

export const getRestaurantById = async (restaurantId) => {
  try {
    const docRef = doc(db, 'restaurants', restaurantId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting restaurant:', error);
    return null;
  }
};

export const getMenuItems = async () => {
  try {
    // ✅ Merr të gjitha menu items direkt nga 'menu' collection
    const q = query(collection(db, 'menu'), orderBy('name'));
    const querySnapshot = await getDocs(q);
    
    const menuItems = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('Loaded menu items from DB:', menuItems.length);
    return menuItems;
  } catch (error) {
    console.error('Error getting menu items:', error);
    return [];
  }
};

// === ORDER SERVICES ===
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'pending', // pending, confirmed, preparing, delivered, cancelled
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('Order created with ID:', docRef.id);
    return { orderId: docRef.id, error: null };
  } catch (error) {
    console.error('Error creating order:', error);
    return { orderId: null, error: error.message };
  }
};

export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Loaded user orders:', orders.length);
    return orders;
  } catch (error) {
    console.error('Error getting user orders:', error);
    return [];
  }
};

// === USER PROFILE SERVICES ===
export const createUserProfile = async (userId, userData) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...userData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    // Nëse dokumenti nuk ekziston, krijoje
    try {
      await setDoc(doc(db, 'users', userId), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (createError) {
      console.error('Error creating user profile:', createError);
      return false;
    }
  }
};

export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const updateMenuItem = async (itemId, updates) => {
  await updateDoc(doc(db, 'menu', itemId), updates);
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};
export const updateUserProfile = async (userId, updates) => {
  await updateDoc(doc(db, 'users', userId), updates);
};

export const deleteMenuItem = async (itemId) => {
  await deleteDoc(doc(db, 'menu', itemId));
};

export const cancelOrder = async (orderId) => {
  await deleteDoc(doc(db, 'orders', orderId));
};

export const removeFromCart = async (userId, itemId) => {
  // Implement logic për të fshirë nga cart
};
export const updateUserAddress = async (userId, address) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      deliveryAddress: address,
      addressUpdatedAt: new Date()
    });
  } catch (error) {
    console.error('Error saving address:', error);
    throw error;
  }
};

export const getUserAddress = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().deliveryAddress || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting address:', error);
    return null;
  }
};