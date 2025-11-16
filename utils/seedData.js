// utils/seedData.js
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { foodImages } from './imageUtils';

export const seedDatabase = async () => {
  try {
    console.log('Starting to seed database...');

    // Fshi të dhënat ekzistuese (opsionale)
    await clearCollection('menu');
    await clearCollection('restaurants');

    // Shto Restorante
    const restaurants = [
      {
        name: "Pizza Palace",
        category: "Italian",
        rating: 4.5,
        deliveryTime: "30-40 min",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400"
      },
      {
        name: "Sushi Garden", 
        category: "Japanese",
        rating: 4.7,
        deliveryTime: "40-50 min",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400"
      },
      {
        name: "Burger Kingdom",
        category: "American", 
        rating: 4.3,
        deliveryTime: "25-35 min",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400"
      }
    ];

    const restaurantIds = [];
    for (const restaurant of restaurants) {
      const docRef = await addDoc(collection(db, 'restaurants'), restaurant);
      restaurantIds.push(docRef.id);
      console.log('Added restaurant:', restaurant.name);
    }

    // Shto Menu Items
     const menuItems = [
      {
        name: "Cheeseburger",
        price: 12.99,
        category: "FAST FOOD",
        description: "Juicy beef patty with cheese",
        restaurantId: restaurantIds[0]
      },
      {
        name: "Pizza Margherita",
        price: 14.99,
        category: "PIZZA", 
        description: "Fresh tomatoes, mozzarella, basil",
        restaurantId: restaurantIds[0]
      },
      {
        name: "Sushi Combo",
        price: 18.99,
        category: "SUSHI",
        description: "Fresh salmon, avocado, rice", 
        restaurantId: restaurantIds[1]
      },
      {
        name: "French Fries",
        price: 16.99,
        category: "SIDES",
        description: "Crispy golden fries",
        restaurantId: restaurantIds[0]
      },
      {
        name: "Hot Dog",
        price: 10.99,
        category: "FAST FOOD",
        description: "Classic beef hot dog",
        restaurantId: restaurantIds[2]
      },
      {
        name: "Chicken Nuggets",
        price: 13.99, 
        category: "FAST FOOD",
        description: "Crispy chicken nuggets",
        restaurantId: restaurantIds[2]
      },
      {
        name: "Spaghetti Carbonara",
        id: "7",
        price: 9.99,
        description: "Delicious Sphagetti",
        category: "PASTA",
},
    ];

    for (const item of menuItems) {
      // Konverto image object në string për Firebase
      const itemForFirebase = {
        ...item,
        image: `local://${item.name.toLowerCase().replace(' ', '_')}` // Ose ndonjë identifier
      };
      await addDoc(collection(db, 'menu'), itemForFirebase);
      console.log('Added menu item:', item.name);
    }

    console.log('✅ Database seeded successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return false;
  }
};

// Funksion ndihmës për të fshirë të dhënat ekzistuese
const clearCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const deletePromises = querySnapshot.docs.map(docSnapshot => 
      deleteDoc(doc(db, collectionName, docSnapshot.id))
    );
    await Promise.all(deletePromises);
    console.log(`Cleared ${collectionName} collection`);
  } catch (error) {
    console.error(`Error clearing ${collectionName}:`, error);
  }
};