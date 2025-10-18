import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, Switch, TextInput, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import FoodCard from '../components/FoodCard'; // ✅ përdorim i njëjtë si më parë
import { foods } from '../constants/data';

export default function MainPage() {
  const navigation = useNavigation();
  const { colors, isDark, toggleTheme } = useTheme();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (item) => {
    Alert.alert(
      "Add to Cart",
      `Do you want to add "${item.name}" to your cart?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Add", onPress: () => addToCart(item) }
      ]
    );
  };

  const filteredFoods = foods.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'FoodExpress',
      headerStyle: { backgroundColor: colors.card },
      headerTitleStyle: { color: colors.text },
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <Text style={[styles.headerRightText, { color: colors.text }]}>
            {isDark ? 'Dark' : 'Light'}
          </Text>
          <Switch value={isDark} onValueChange={toggleTheme} thumbColor={colors.primary} />
        </View>
      ),
    });
  }, [navigation, colors, isDark, toggleTheme]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        placeholder="Search food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[styles.searchInput, { borderColor: colors.text, color: colors.text }]}
        placeholderTextColor={colors.text}
      />

      <Text style={[styles.titleText, { color: colors.text }]}>
        Choose your favorite meal:
      </Text>

      <FlatList
        data={filteredFoods}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={handleAddToCart}
            showRemove={false} // nuk shfaqet Remove në menynë kryesore
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80
  },
  searchInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 20,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  headerRightText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
});
