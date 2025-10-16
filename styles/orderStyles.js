import { StyleSheet } from 'react-native';

export const orderStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
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
  totalBox: {
    marginTop: 20,
    alignItems: 'center',
    gap: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    paddingVertical: 8,
  },
  clearText: {
    color: '#FF3B30',
    fontWeight: '600',
  },


});
