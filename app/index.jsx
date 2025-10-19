import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import FoodCard from "../components/FoodCard";
import { foods } from "../constants/data";

export default function MainPage() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("TË GJITHA");

  const categories = ["TË GJITHA", "PIZZA", "PASTA", "SUSHI", "FAST FOOD"];

  // ✅ Filtrim sipas kërkimit dhe kategorisë
  const filteredFoods = foods.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "TË GJITHA" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    Alert.alert("Added to Cart", `${item.name} added!`);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "FoodExpress",
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
        style={[
          styles.searchInput,
          {
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: colors.card,
          },
        ]}
        placeholderTextColor={colors.text}
      />

      {/* ✅ Rreshti i kategorive */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        style={styles.categoryRow}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} onPress={() => setActiveCategory(cat)}>
            <Text
              style={[
                styles.categoryText,
                {
                  color: activeCategory === cat ? "#FF7A00" : colors.text,
                  opacity: activeCategory === cat ? 1 : 0.6,
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="clip"
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ✅ Lista e ushqimeve */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={() => handleAddToCart(item)}
            showRemove={false}
          />
        )}
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1,
          justifyContent: "flex-start", // kjo e bën itemin të shfaqet në fillim
        }}
        showsVerticalScrollIndicator={false}
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
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  categoryRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginRight: 20,
    flexShrink: 0,
  },
});
