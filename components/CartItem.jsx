import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CartItem({ item, onRemove }) {
    const { colors } = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={styles.itemInfo}>
                <Text style={[styles.foodText, { color: colors.text }]}>{item.name}</Text>
                <Text style={{ color: colors.accent, fontWeight: 'bold' }}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
                <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 14,
        marginVertical: 6,
        borderRadius: 12,
        alignItems: 'center',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 10,
    },
    foodText: {
        fontSize: 16,
        fontWeight: '600',
    },
    removeButton: {
        marginLeft: 10,
        padding: 6,
    },
    removeText: {
        color: '#FF3B30',
        fontWeight: 'bold',
    },
});
