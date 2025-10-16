import { StyleSheet } from 'react-native';

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 20,
  },
  card: {
    width: 240,
    alignItems: 'center',
    padding: 16,
    marginVertical: 10,
    borderRadius: 14,
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  foodImage: {
    width: 110,
    height: 110,
    borderRadius: 14,
    marginBottom: 10,
  },
  foodTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  listContent: {
  paddingBottom: 20,
  paddingHorizontal: 8,
},
cardWrapper: {
  flex: 1,
  margin: 8,
  maxWidth: '48%',
},
headerRight: {
  marginRight: 12,
  alignItems: 'center',
},
headerText: {
  fontSize: 14,
  fontWeight: '600',
},
searchBar: {
  width: '100%',
  padding: 10,
  borderWidth: 1,
  borderRadius: 10,
  marginBottom: 10,
},

cardFull: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  borderRadius: 10,
  padding: 10,
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 3,
},

foodImageFull: {
  width: 80,
  height: 80,
  borderRadius: 10,
  marginRight: 10,
},

foodInfo: {
  flex: 1,
  justifyContent: 'center',
},

});
