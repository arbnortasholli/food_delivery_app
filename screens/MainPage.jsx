import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function Main({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { addToCart } = useCart();

  
  const foods = [
    { id: '1', name: 'Cheeseburger', price: 5.99, image: require('../assets/foods/burger.jpg') },
    { id: '2', name: 'Pizza Margherita', price: 7.99, image: require('../assets/foods/pizza.jpg') },
    { id: '3', name: 'Sushi Combo', price: 12.99, image: require('../assets/foods/sushi.jpg') },
    { id: '4', name: 'French Fries', price: 2.99, image: require('../assets/foods/fries.jpg') },
    { id: '5', name: 'Hot Dog', price: 4.5, image: require('../assets/foods/hotdog.jpg') },
    { id: '6', name: 'Chicken Nuggets', price: 6.99, image: require('../assets/foods/nuggets].jpg') },
  ];

 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'FoodExpress 🚴‍♂️',
      headerStyle: { backgroundColor: colors.card },
      headerTitleStyle: { color: colors.text },
      headerRight: () => (
        <View style={{ marginRight: 15, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.text, marginRight: 5 }}>{isDark ? 'Dark' : 'Light'}</Text>
          <Switch value={isDark} onValueChange={toggleTheme} thumbColor={colors.primary} />
        </View>
      ),
    });
  }, [navigation, colors, isDark]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.subtitle, { color: colors.text }]}>Choose your favorite meal:</Text>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}
            onPress={() => addToCart(item)}
          >
            <Image
              source={item.image}
              style={{ width: 100, height: 100, borderRadius: 12, marginBottom: 10 }}
              resizeMode="cover"
            />
            <Text style={[styles.foodText, { color: colors.text }]}>{item.name}</Text>
            <Text style={{ color: colors.accent, fontWeight: 'bold' }}>${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 20,
  },
  card: {
    padding: 14,
    marginVertical: 8,
    borderRadius: 12,
    width: 240,
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});
