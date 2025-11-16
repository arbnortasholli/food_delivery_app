import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getFoodImage } from "../utils/imageUtils";

export default function FoodCard({
  item,
  onPress,
  showRemove = false,
  onIncrease,
  onDecrease,
  onFavourite, 
}) {
  const { colors } = useTheme();
  const imageSource = getFoodImage(item.name);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.card, shadowColor: colors.text },
      ]}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.9}
    >
      <Image source={imageSource} style={styles.image} resizeMode="cover" />

      <View style={styles.itemInfo}>
        <Text style={[styles.foodText, { color: colors.text }]}>
          {item.name} {item.quantity ? `x${item.quantity}` : ""}
        </Text>
         <Text style={[styles.description, { color: colors.text + '80' }]}>
          {item.description}
        </Text>
        <Text style={{ color: colors.accent, fontWeight: "bold" }}>
          ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
        </Text>
      </View>

      {showRemove && (
        <View style={styles.quantityBox}>
          <TouchableOpacity
            onPress={() => onDecrease && onDecrease(item.id)}
            style={[styles.qtyButton, { backgroundColor: colors.border }]}
          >
            <Text style={[styles.qtyText, { color: colors.text }]}>-</Text>
          </TouchableOpacity>

          <Text style={[styles.qtyCount, { color: colors.text }]}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            onPress={() => onIncrease && onIncrease(item.id)}
            style={[styles.qtyButton, { backgroundColor: colors.border }]}
          >
            <Text style={[styles.qtyText, { color: colors.text }]}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Favourite Button */}
      <TouchableOpacity
        style={{
          padding: 6,
          backgroundColor: colors.accent,
          borderRadius: 8,
          marginLeft: 10,
        }}
        onPress={() => onFavourite && onFavourite(item)}
      >
        <Text style={{ color: "white", fontSize: 12 }}>⭐</Text>
      </TouchableOpacity>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    borderRadius: 12,
    padding: 10,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  foodText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    marginBottom: 4,
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    padding: 6,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  qtyCount: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
});
