import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import FoodCard from '../../components/FoodCard';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../services/databaseService';
import { updateUserAddress, getUserAddress } from '../../services/databaseService';
import AddressModal from '../../components/AddressModal';

export default function OrderPage() {
  const { colors } = useTheme();
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  
  useEffect(() => {
    loadSavedAddress();
  }, [user]);
   const loadSavedAddress = async () => {
    if (!user?.uid) return;
    
    try {
      const savedAddress = await getUserAddress(user.uid);
      if (savedAddress) {
        setAddress(savedAddress);
      }
    } catch (error) {
      console.error('Error loading address:', error);
    }
  };

  const saveAddress = async (newAddress) => {
    if (!user?.uid) return;
    
    try {
      await updateUserAddress(user.uid, newAddress);
      setAddress(newAddress);
      console.log("✅ Address saved:", newAddress);
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

 const handleCheckout = async () => {
  console.log("🔄 1. handleCheckout called");
  
  if (!user) {
    console.log("❌ 2. User not logged in");
    Alert.alert('Login Required', 'Please log in to place an order');
    return;
  }

  if (cartItems.length === 0) {
    console.log("❌ 3. Cart is empty");
    Alert.alert('Cart Empty', 'Add some items to your cart first');
    return;
  }
  if (!address) {
      Alert.alert(
        'Delivery Address Required 🏠',
        'Please enter your delivery address',
        [
          { 
            text: 'Enter Address', 
            onPress: () => setShowAddressModal(true) 
          },
          { 
            text: 'Cancel', 
            style: 'cancel' 
          }
        ]
      );
      return;
    }
   console.log("📍 Delivery address:", address);

  console.log("✅ 4. Starting checkout process...");
  console.log("📦 Cart items:", cartItems);
  console.log("👤 User:", user.uid);
  
  setLoading(true);
  
  try {
    console.log("🔄 5. Creating order data...");
    
    const orderData = {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName || 'Customer',
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category
      })),
      total: total,
      status: 'pending',
      deliveryAddress: address,
      paymentMethod: 'card',
      restaurantId: cartItems[0]?.restaurantId || 'restaurant1'
    };

    console.log("📋 6. Order data prepared:", orderData);
    console.log("🚀 7. Calling createOrder...");

    const { orderId, error } = await createOrder(orderData);
    
    console.log("📨 8. createOrder response:", { orderId, error });
    
    if (error) {
      console.log("❌ 9. Order failed with error:", error);
      Alert.alert('Order Failed', error);
    } else {
      console.log("🎉 10. Order successful! Order ID:", orderId);
      Alert.alert(
        'Order Successful! 🎉', 
        `Your order #${orderId.slice(-6).toUpperCase()} has been placed!\nTotal: $${total.toFixed(2)}`,
        [
          { 
            text: 'Continue Shopping', 
            onPress: () => {
              console.log("🛒 11. Clearing cart...");
              clearCart();
            }
          }
        ]
      );
    }
  } catch (error) {
    console.log("💥 12. Catch block error:", error);
    console.error('Checkout error:', error);
    Alert.alert('Error', 'Failed to place order. Please try again.');
  } finally {
    console.log("🏁 13. Finally block - setting loading false");
    setLoading(false);
  }
};

  const handleIncrease = (id) => addToCart(cartItems.find(i => i.id === id));
  const handleDecrease = (id) => removeFromCart(id);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {cartItems.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.text }]}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 140 }}
            renderItem={({ item }) => (
              <FoodCard
                item={item}
                showRemove={true}
                onIncrease={() => handleIncrease(item.id)}
                onDecrease={() => handleDecrease(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}

          />

          <View style={styles.totalBox}>
            <Text style={[styles.totalText, { color: colors.text }]}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity
              onPress={handleCheckout}
              style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
              <Text style={styles.clearText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <AddressModal
        visible={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSave={saveAddress}
        existingAddress={address}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingBottom: 50 },
  emptyText: { fontSize: 18, textAlign: 'center', marginTop: 50 },
  totalBox: { marginTop: 20, alignItems: 'center', gap: 10, paddingBottom: 10 },
  totalText: { fontSize: 20, fontWeight: 'bold' },
  checkoutButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  clearButton: { paddingVertical: 8 },
  clearText: { color: '#FF3B30', fontWeight: '600' },
});
