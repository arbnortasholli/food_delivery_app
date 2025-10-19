import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import FoodCard from '../components/FoodCard';

export default function OrderPage() {
  const { colors } = useTheme();
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handleCheckout = () => {
    Alert.alert('Order Successful', 'Your order has been placed!', [
      { text: 'OK', onPress: () => clearCart() },
    ]);
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
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
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
