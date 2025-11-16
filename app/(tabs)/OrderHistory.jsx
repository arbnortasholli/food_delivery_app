import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders } from '../../services/databaseService';
import { Ionicons } from '@expo/vector-icons';

export default function OrderHistory() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const userOrders = await getUserOrders(user.uid);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#4CAF50';
      case 'preparing': return '#FF9800';
      case 'confirmed': return '#2196F3';
      case 'pending': return '#9E9E9E';
      case 'cancelled': return '#F44336';
      default: return colors.text;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return 'checkmark-circle';
      case 'preparing': return 'restaurant';
      case 'confirmed': return 'time';
      case 'pending': return 'hourglass';
      case 'cancelled': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading orders...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Order History</Text>
      
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={64} color={colors.text + '60'} />
          <Text style={[styles.emptyText, { color: colors.text }]}>No orders yet</Text>
          <Text style={[styles.emptySubtext, { color: colors.text + '80' }]}>
            Your order history will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.orderCard, { backgroundColor: colors.card }]}
              onPress={() => {/* Mund të shtosh order details */}}
            >
              <View style={styles.orderHeader}>
                <Text style={[styles.orderId, { color: colors.text }]}>
                  Order #{item.id.slice(-6).toUpperCase()}
                </Text>
                <View style={styles.statusContainer}>
                  <Ionicons 
                    name={getStatusIcon(item.status)} 
                    size={16} 
                    color={getStatusColor(item.status)} 
                  />
                  <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                    {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                  </Text>
                </View>
              </View>
              
              <Text style={[styles.orderDate, { color: colors.text + '80' }]}>
                {formatDate(item.createdAt)}
              </Text>
              
              <View style={styles.orderItems}>
                {item.items?.slice(0, 2).map((orderItem, index) => (
                  <Text key={index} style={[styles.itemText, { color: colors.text + '80' }]}>
                    {orderItem.quantity}x {orderItem.name}
                  </Text>
                ))}
                {item.items?.length > 2 && (
                  <Text style={[styles.moreItems, { color: colors.text + '60' }]}>
                    +{item.items.length - 2} more items
                  </Text>
                )}
              </View>
              
              <View style={styles.orderFooter}>
                <Text style={[styles.total, { color: colors.text }]}>
                  Total: ${item.total?.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  orderCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  orderDate: {
    fontSize: 12,
    marginBottom: 12,
  },
  orderItems: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 2,
  },
  moreItems: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 8,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
});