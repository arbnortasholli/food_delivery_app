export const getFoodImage = (itemName) => {
  const name = itemName.toLowerCase();
  
  if (name.includes('burger')) return require('../assets/foods/burger.jpg');
  if (name.includes('pizza')) return require('../assets/foods/pizza.jpg');
  if (name.includes('sushi')) return require('../assets/foods/sushi.jpg');
  if (name.includes('fries')) return require('../assets/foods/fries.jpg');
  if (name.includes('hotdog') || name.includes('hot dog')) return require('../assets/foods/hotdog.jpg');
  if (name.includes('nuggets')) return require('../assets/foods/nuggets.jpg');
  if (name.includes('spaghetti')) return require('../assets/foods/carbonara.jpg');

  return require('../assets/foods/burger.jpg');
};