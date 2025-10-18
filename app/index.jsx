import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import FoodCard from '../components/FoodCard';
import { foods } from '../constants/data';

export default function MainPage() {
  const navigation = useNavigation();
  const { colors } = useTheme(); 
  const { addToCart } = useCart(); 
  const [searchQuery, setSearchQuery] = useState('');


  const filteredFoods = foods.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      <TextInput
        placeholder="Search food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[styles.searchInput, {
          borderColor: colors.border,
          color: colors.text,
          backgroundColor: colors.card
        }]}
        placeholderTextColor={colors.text}
      />

      <Text style={[styles.titleText, { color: colors.text }]}>
        Choose your favorite meal:
      </Text>

     
      <FlatList
        data={filteredFoods}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={() => handleAddToCart(item)}
            showRemove={false}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
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
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  titleText: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 20,
  },
});