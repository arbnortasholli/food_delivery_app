import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function OrderPage() {
  const { colors } = useTheme();
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (index) => {
    Alert.alert('Remove Item', 'Remove this item from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeFromCart(index) },
    ]);
  };

  const handleCheckout = () => {
    Alert.alert('Order Successful', 'Your order has been placed!', [
      {
        text: 'OK',
        onPress: () => clearCart(),
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {cartItems.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.text }]}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 140 }}
            renderItem={({ item }) => (
              <CartItem item={item} onRemove={handleRemove} />
            )}
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
  card: {
    flexDirection: 'row',
    padding: 14,
    marginVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 80, height: 80, borderRadius: 12 },
  itemInfo: { flex: 1, marginLeft: 10 },
  foodText: { fontSize: 16, fontWeight: '600' },
  removeButton: { marginLeft: 10, padding: 6 },
  removeText: { color: '#FF3B30', fontWeight: 'bold' },
  totalBox: { marginTop: 20, alignItems: 'center', gap: 10, paddingBottom: 10 },
  totalText: { fontSize: 20, fontWeight: 'bold' },
  checkoutButton: { paddingHorizontal: 24, paddingVertical: 14, borderRadius: 10, width: '60%', alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  clearButton: { paddingVertical: 8 },
  clearText: { color: '#FF3B30', fontWeight: '600' },
});
