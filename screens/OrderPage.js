import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useTheme } from '../theme/ThemeContext';


export default function OrderPage({ navigation }) {
  const { colors } = useTheme();
  const [orders] = useState([
    { id: '1', name: 'Pizza Margherita 🍕', status: 'Delivered' },
    { id: '2', name: 'Cheeseburger 🍔', status: 'Preparing' },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', paddingTop: 30 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>Your Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: colors.card,
              padding: 14,
              marginVertical: 6,
              borderRadius: 12,
              width: 240,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, color: colors.text }}>{item.name}</Text>
            <Text style={{ color: colors.text, opacity: 0.7 }}>Status: {item.status}</Text>
          </View>
        )}
      />

      <View style={{ marginTop: 20 }}>
        <Button color={colors.primary} title="Back to Menu 🍽️" onPress={() => navigation.navigate('Main')} />
      </View>
    </View>
  );
}
