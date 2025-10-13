import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { useTheme } from '../theme/ThemeContext';



export default function MainPage({ navigation }) {
  const { colors } = useTheme();

  const foods = [
    { id: '1', name: 'Cheeseburger 🍔' },
    { id: '2', name: 'Pizza Margherita 🍕' },
    { id: '3', name: 'Sushi Combo 🍣' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
        Welcome to FoodExpress 🚴‍♂️
      </Text>
      <Text style={{ fontSize: 16, color: colors.text, opacity: 0.7, marginBottom: 20 }}>
        Choose your favorite meal:
      </Text>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => alert(`Added ${item.name} to cart!`)}
            style={{
              backgroundColor: colors.card,
              padding: 14,
              marginVertical: 6,
              borderRadius: 12,
              width: 240,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 16, color: colors.text }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ marginTop: 30, width: '60%' }}>
        <Button color={colors.primary} title="Go to Orders 🛒" onPress={() => navigation.navigate('Order')} />
        <View style={{ marginTop: 10 }} />
        <Button color={colors.accent} title="Go to Profile 👤" onPress={() => navigation.navigate('Profile')} />
      </View>
    </View>
  );
}
