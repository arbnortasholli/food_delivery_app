export const CartProviderWithDB = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (item) => {

    await addDoc(collection(db, 'users', userId, 'cart'), {
      ...item,
      addedAt: serverTimestamp()
    });
  };

  const updateCartItem = async (itemId, quantity) => {

    await updateDoc(doc(db, 'users', userId, 'cart', itemId), {
      quantity
    });
  };

  const removeFromCart = async (itemId) => {

    await deleteDoc(doc(db, 'users', userId, 'cart', itemId));
  };

  const getCartItems = async () => {

    const snapshot = await getDocs(collection(db, 'users', userId, 'cart'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
};