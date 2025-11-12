import React, { useState, useLayoutEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import FoodCard from '../../components/FoodCard';
import InputField from '../../components/InputField';
import { foods } from '../../constants/data';

export default function MainPage() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'PIZZA', 'PASTA', 'SUSHI', 'FAST FOOD'];

  const filteredFoods = foods.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'ALL' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    Alert.alert('Added to Cart', `${item.name} added!`);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'FoodExpress',
      headerStyle: { backgroundColor: colors.card },
      headerTitleStyle: { color: colors.text },
    });
  }, [navigation, colors]);

  const renderCategories = useCallback(() => (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item: cat }) => (
        <TouchableOpacity
          onPress={() => setActiveCategory(cat)}
          style={styles.categoryButton}
        >
          <Text
            style={[
              styles.categoryText,
              {
                color: activeCategory === cat ? '#FF7A00' : colors.text,
                opacity: activeCategory === cat ? 1 : 0.6,
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {cat}
          </Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryContainer}
      style={styles.categoriesList}
    />
  ), [activeCategory, colors]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <InputField
        placeholder="Search food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        type="text"
        icon="search"
        style={styles.searchInput}
      />

      {renderCategories()}

      <FlatList

        data={filteredFoods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={() => handleAddToCart(item)}
            showRemove={false}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No food found for "{searchQuery}" in {activeCategory}
            </Text>
          </View>
        }
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
  },
  searchInput: {
    marginBottom: 15,
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoryContainer: {
    paddingHorizontal: 5,
  },
  categoryButton: {
    marginRight: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    flexShrink: 0,
  },
  listContent: {
    height: "150%",
    paddingBottom: 120
  },
  emptyState: {

    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});
