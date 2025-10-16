import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { orderStyles } from '../styles/orderStyles';

export default function Order({ navigation }) {
  const { colors } = useTheme();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (index) => {
    Alert.alert('Remove Item', 'Remove this item from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeFromCart(index) },
    ]);
  };

  const handleCheckout = () => {
    Alert.alert(
      'Order Successful ✅',
      'Your order has been placed!',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Home'); // Go back to Home tab
          },
        },
      ]
    );
  };

  return (
    <View style={[orderStyles.container, { backgroundColor: colors.background }]}>
      {cart.length === 0 ? (
        <Text style={[orderStyles.emptyText, { color: colors.text }]}>Your cart is empty 😢</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item, index }) => (
              <View style={[orderStyles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
                <Image source={item.image} style={orderStyles.image} resizeMode="cover" />
                <View style={orderStyles.itemInfo}>
                  <Text style={[orderStyles.foodText, { color: colors.text }]}>{item.name}</Text>
                  <Text style={{ color: colors.accent, fontWeight: 'bold' }}>${item.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemove(index)} style={orderStyles.removeButton}>
                  <Text style={orderStyles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={orderStyles.totalBox}>
            <Text style={[orderStyles.totalText, { color: colors.text }]}>
              Total: ${total.toFixed(2)}
            </Text>

            <TouchableOpacity
              onPress={handleCheckout}
              style={[orderStyles.checkoutButton, { backgroundColor: colors.primary }]}
            >
              <Text style={orderStyles.checkoutText}>Checkout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={clearCart} style={orderStyles.clearButton}>
              <Text style={orderStyles.clearText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
