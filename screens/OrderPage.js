import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function Order() {
  const { colors } = useTheme();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (index) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeFromCart(index) },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {cart.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.text }]}>Your cart is empty 😢</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item, index }) => (
              <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={[styles.foodText, { color: colors.text }]}>{item.name}</Text>
                  <Text style={{ color: colors.accent, fontWeight: 'bold' }}>${item.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemove(index)} style={styles.removeButton}>
                  <Text style={{ color: '#FF3B30', fontWeight: 'bold' }}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={[styles.totalText, { color: colors.text }]}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity onPress={clearCart} style={[styles.clearButton, { backgroundColor: colors.primary }]}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  foodText: {
    fontSize: 16,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 10,
    padding: 6,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clearButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
