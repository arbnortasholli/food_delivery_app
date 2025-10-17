import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const FoodCard = ({ item, onPress, colors }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
                borderRadius: 10,
                padding: 10,
                backgroundColor: colors.card,
                shadowColor: colors.text,
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 3,
            }}
            onPress={() => onPress(item)}  // Pass the whole item when pressed
        >
            <Image
                source={item.image}
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    marginRight: 10,
                }}
                resizeMode="cover"
            />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, fontWeight: '600', marginBottom: 4, color: colors.text }}>
                    {item.name}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.accent }}>
                    ${item.price.toFixed(2)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default FoodCard;
