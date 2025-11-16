import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
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
import { auth } from '../../config/firebase';
import { addFavourite } from '../../services/favouriteService';
import { getRestaurants, getMenuItems } from '../../services/databaseService';
import { seedDatabase } from '../../utils/seedData';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders } from '../../services/databaseService';




export default function MainPage() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const { user } = useAuth();

  const categories = ['ALL', 'PIZZA', 'PASTA', 'SUSHI', 'FAST FOOD'];
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if(user){
      loadUserOrders();
    }
  },[user]);

  const loadData = async () => {
    try{
      setLoading(true);
      const [restaurantsData, menuData] = await Promise.all([
        getRestaurants(),
        getMenuItems()
      ]);

      if(menuData.length===0){
        console.log('No data found, seeding database automatically...');
        await seedDatabase();
        const [newRestaurants, newMenu] = await Promise.all([
          getRestaurants(),
          getMenuItems('all')
        ]);
      }

      setRestaurants(restaurantsData);
      setMenuItems(menuData);
    } catch(error){
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load data');
    } finally{
      setLoading(false);
    }
  };
  const filteredFoods = foods.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'ALL' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSeedData = async () => {
  const success = await seedDatabase();
  if (success) {
    Alert.alert('Success', 'Database seeded! Refreshing...');
    loadData(); // Rifresko të dhënat
  } else {
    Alert.alert('Error', 'Failed to seed database');
  }
};

const loadUserOrders = async () => {
  try {
    if (user) {
      const orders = await getUserOrders(user.uid);
      console.log('User orders:', orders);
      
    }
  } catch (error) {
    console.error('Error loading user orders:', error);
  }
};

  const handleAddToCart = (item) => {
    addToCart(item);
    Alert.alert('Added to Cart', `${item.name} added!`);
  };
 
  const userId = auth.currentUser?.uid;

const handleFavourite = async (item) => {
  if (!userId) {
    Alert.alert("Not logged in", "You must be logged in to add favourites.");
    return;
  }

  await addFavourite(userId, item);
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

    {/* <TouchableOpacity 
        style={{
          position: 'absolute',
          top: 50,
          right: 20,
          backgroundColor: '#FF7A00',
          padding: 10,
          borderRadius: 8,
          zIndex: 1000
        }}
        onPress={handleSeedData}
      >
        <Text style={{color: 'white', fontWeight: 'bold'}}>SEED DATA</Text>
      </TouchableOpacity> */}

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
           onFavourite={() => handleFavourite(item)}
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
