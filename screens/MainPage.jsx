import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, Image, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { mainStyles } from '../styles/mainStyles';
import { AppStyles } from '../styles/AppStyles';

export default function MainPage({ navigation }) {
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

  const [searchQuery, setSearchQuery] = React.useState('');
  const filteredFoods = foods.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'FoodExpress 🚴‍♂️',
      headerStyle: { backgroundColor: colors.card },
      headerTitleStyle: { color: colors.text },
      headerRight: () => (
        <View style={[AppStyles.row, mainStyles.headerRight]}>
          <Text style={[mainStyles.headerText, { color: colors.text, marginRight: 8 }]}>
            {isDark ? 'Dark' : 'Light'}
          </Text>
          <Switch value={isDark} onValueChange={toggleTheme} thumbColor={colors.primary} />
        </View>
      ),
    });
  }, [navigation, colors, isDark, toggleTheme]);

  return (
    <View style={[AppStyles.container, { backgroundColor: colors.background }]}>
      {/* 🔍 Search Bar */}
      <TextInput
        placeholder="Search food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[mainStyles.searchBar, { borderColor: colors.text, color: colors.text }]}
        placeholderTextColor={colors.text}
      />

      <Text style={[mainStyles.subtitle, { color: colors.text }]}>Choose your favorite meal:</Text>

      {/* ✅ FULL WIDTH LIST */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={mainStyles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[mainStyles.cardFull, { backgroundColor: colors.card, shadowColor: colors.text }]}
            onPress={() => addToCart(item)}
          >
            <Image source={item.image} style={mainStyles.foodImageFull} resizeMode="cover" />
            <View style={mainStyles.foodInfo}>
              <Text style={[mainStyles.foodTitle, { color: colors.text }]}>{item.name}</Text>
              <Text style={[mainStyles.foodPrice, { color: colors.accent }]}>
                ${item.price.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
