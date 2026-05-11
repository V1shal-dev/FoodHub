
import type { FoodCategory, FoodItem, Restaurant, Banner, SpinWheelReward, ScratchCard, TriviaQuestion, ComboDeal, Coupon, HappyHourDeal } from '../types';

export const foodCategories: FoodCategory[] = [
  { id: 'all', name: 'All', icon: '🍽️', color: 'from-indigo-400 to-purple-400' },
  { id: 'pizza', name: 'Pizza', icon: '🍕', color: 'from-red-400 to-orange-400' },
  { id: 'burger', name: 'Burgers', icon: '🍔', color: 'from-yellow-500 to-red-500' },
  { id: 'north', name: 'Curries', icon: '🍲', color: 'from-red-400 to-rose-400' },
  { id: 'biryani', name: 'Biryani', icon: '🍚', color: 'from-orange-400 to-red-400' },
  { id: 'chinese', name: 'Noodles', icon: '🍜', color: 'from-purple-400 to-pink-400' },
  { id: 'salads', name: 'Salads', icon: '🥗', color: 'from-green-400 to-lime-400' },
  { id: 'sides', name: 'Sides', icon: '🍟', color: 'from-yellow-400 to-amber-400' },
  { id: 'sweets', name: 'Desserts', icon: '🍰', color: 'from-pink-400 to-purple-400' },
  { id: 'beverages', name: 'Beverages', icon: '☕', color: 'from-teal-400 to-cyan-400' },
];

export const allFoodItems: FoodItem[] = [
  // Pizzas
  { id: 10001, name: 'Margherita Pizza', price: 12.99, category: 'pizza', image: '🍕', rating: 4.7, reviews: 450, time: '18-22 min', isVeg: true, calories: 620, description: 'Classic tomato, mozzarella, basil', serves: 2, ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil', 'Olive Oil'], allergens: ['Gluten', 'Dairy'], customizations: { size: [{ name: 'Medium (12")', price: 0 }, { name: 'Large (15")', price: 7 }], crust: ['Thin Crust', 'Cheese Burst'], addons: [{ name: 'Extra Cheese', price: 2 }, { name: 'Olives', price: 1.5 }] } },
  { id: 10002, name: 'Pepperoni Pizza', price: 14.99, category: 'pizza', image: '🍕', rating: 4.8, reviews: 600, time: '20-25 min', isVeg: false, calories: 750, description: 'Spicy pepperoni with rich tomato sauce', serves: 2, ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Pepperoni'], allergens: ['Gluten', 'Dairy'], customizations: { size: [{ name: 'Medium (12")', price: 0 }, { name: 'Large (15")', price: 7 }], crust: ['Thin Crust', 'Cheese Burst'], addons: [{ name: 'Extra Cheese', price: 2 }, { name: 'Jalapenos', price: 1 }] } },

  // Burgers
  { id: 11001, name: 'Classic Beef Burger', price: 9.99, category: 'burger', image: '🍔', rating: 4.6, reviews: 890, time: '12-15 min', isVeg: false, calories: 580, description: 'Juicy beef patty with classic fixings', serves: 1, ingredients: ['Bun', 'Beef Patty', 'Lettuce', 'Tomato', 'Onion', 'Secret Sauce', 'Pickles'], allergens: ['Gluten', 'Sesame'], customizations: { addons: [{ name: 'Add Bacon', price: 2 }, { name: 'Extra Patty', price: 4 }, { name: 'Cheese Sauce', price: 1.5 }, { name: 'Avocado', price: 2.5 }, { name: 'Grilled Mushrooms', price: 1.5 }, { name: 'Fried Egg', price: 2 }, { name: 'Jalapenos', price: 1 }], removableIngredients: ['Lettuce', 'Tomato', 'Onion', 'Pickles'], alternatives: { 'Onion': [{name: 'Caramelized Onion', price: 1}, {name: 'Pickled Onion', price: 0}], 'Lettuce': [{name: 'Spinach', price: 0}, {name: 'Arugula', price: 0}, {name: 'Avocado', price: 2.5}] } } },
  { id: 11002, name: 'Veggie Burger', price: 8.99, category: 'burger', image: '🍔', rating: 4.5, reviews: 550, time: '12-15 min', isVeg: true, calories: 450, description: 'A delicious vegetable and potato patty', serves: 1, ingredients: ['Bun', 'Veggie Patty', 'Lettuce', 'Tomato', 'Mayo'], allergens: ['Gluten', 'Dairy', 'Soy'], customizations: { addons: [{ name: 'Add Cheese', price: 1 }], removableIngredients: ['Lettuce', 'Tomato', 'Mayo'] } },

  // North Indian
  { id: 3001, name: 'Butter Chicken', price: 18.99, category: 'north', image: '🍗', rating: 4.9, reviews: 580, time: '20-25 min', isVeg: false, calories: 520, description: 'Tender chicken in rich tomato-based curry', serves: 2, ingredients: ['Chicken', 'Tomato', 'Butter', 'Cream', 'Cashews', 'Spices'], allergens: ['Dairy', 'Nuts'], customizations: { spice: ['Mild', 'Medium', 'Hot', 'Extra Hot'] } },
  { id: 3002, name: 'Paneer Tikka Masala', price: 15.99, category: 'north', image: '🧈', rating: 4.7, reviews: 420, time: '18-22 min', isVeg: true, calories: 420, description: 'Grilled cottage cheese in spicy gravy', serves: 2, ingredients: ['Paneer', 'Yogurt', 'Tomato', 'Onion', 'Spices'], allergens: ['Dairy'], customizations: { spice: ['Mild', 'Medium', 'Hot', 'Extra Hot'] } },

  // Biryani
  { id: 7001, name: 'Hyderabadi Chicken Biryani', price: 16.99, category: 'biryani', image: '🍚', rating: 4.9, reviews: 890, time: '30-35 min', isVeg: false, calories: 680, description: 'Aromatic rice with marinated chicken', serves: 1, ingredients: ['Basmati Rice', 'Chicken', 'Yogurt', 'Spices', 'Saffron'], allergens: ['Dairy'], customizations: { spice: ['Mild', 'Medium', 'Hot', 'Extra Hot'], addons: [{ name: 'Extra Raita', price: 1.5 }] } },

  // Chinese
  { id: 5001, name: 'Hakka Noodles', price: 11.99, category: 'chinese', image: '🍜', rating: 4.6, reviews: 456, time: '15-20 min', isVeg: true, calories: 420, description: 'Stir-fried noodles with vegetables', serves: 1, ingredients: ['Noodles', 'Cabbage', 'Carrots', 'Bell Peppers', 'Soy Sauce', 'Garlic'], allergens: ['Gluten', 'Soy'], customizations: { spice: ['Mild', 'Medium', 'Hot', 'Extra Hot'], addons: [{ name: 'Add Tofu', price: 3 }] } },
  
  // Salads
  { id: 13003, name: 'Grilled Chicken Salad', price: 13.99, category: 'salads', image: '🥗', rating: 4.7, reviews: 456, time: '15-18 min', isVeg: false, calories: 420, description: 'Protein-packed healthy salad', serves: 1, ingredients: ['Lettuce', 'Grilled Chicken', 'Cherry Tomatoes', 'Cucumber', 'Vinaigrette'], allergens: [], customizations: { removableIngredients: ['Cucumber', 'Cherry Tomatoes'] } },
  
  // Sides
  { id: 14001, name: 'French Fries', price: 3.50, category: 'sides', image: '🍟', rating: 4.7, reviews: 1500, time: '5-8 min', isVeg: true, calories: 320, description: 'Crispy golden french fries, lightly salted.', serves: 1, ingredients: ['Potatoes', 'Vegetable Oil', 'Salt'], allergens: [] },
  { id: 14002, name: 'Garlic Bread', price: 4.50, category: 'sides', image: '🥖', rating: 4.6, reviews: 300, time: '10-12 min', isVeg: true, calories: 280, description: 'Toasted bread with garlic butter and herbs.', serves: 2, ingredients: ['Bread', 'Garlic', 'Butter', 'Parsley'], allergens: ['Gluten', 'Dairy'] },
  { id: 14004, name: 'Spring Rolls', price: 6.99, category: 'sides', image: '🥟', rating: 4.6, reviews: 350, time: '12-15 min', isVeg: true, calories: 250, description: 'Crispy fried vegetable spring rolls, served with a sweet chili dip.', serves: 2, ingredients: ['Wrapper', 'Cabbage', 'Carrots', 'Noodles', 'Bell Peppers'], allergens: ['Gluten', 'Soy'] },
  { id: 14005, name: 'Plain Naan', price: 3.00, category: 'sides', image: '🍞', rating: 4.8, reviews: 700, time: '5 min', isVeg: true, calories: 260, description: 'Soft and fluffy Indian bread baked in a tandoor.', serves: 1, ingredients: ['Flour', 'Yogurt', 'Yeast', 'Butter'], allergens: ['Gluten', 'Dairy'] },

  // Desserts
  { id: 8004, name: 'Chocolate Brownie', price: 8.99, category: 'sweets', image: '🍫', rating: 4.9, reviews: 623, time: '8 min', isVeg: true, calories: 480, description: 'Warm brownie with vanilla ice cream', serves: 1, ingredients: ['Flour', 'Cocoa', 'Sugar', 'Butter', 'Eggs', 'Vanilla Ice Cream'], allergens: ['Gluten', 'Dairy', 'Eggs'], customizations: { addons: [{ name: 'Extra Ice Cream', price: 2 }] } },
  
  // Beverages
  { id: 9001, name: 'Mango Lassi', price: 4.99, category: 'beverages', image: '🥤', rating: 4.7, reviews: 456, time: '5 min', isVeg: true, calories: 180, description: 'Refreshing mango yogurt drink', serves: 1, ingredients: ['Yogurt', 'Mango Pulp', 'Sugar', 'Cardamom'], allergens: ['Dairy'], customizations: {} },
  { id: 9002, name: 'Coca-Cola', price: 2.50, category: 'beverages', image: '🥤', rating: 4.9, reviews: 2500, time: '1 min', isVeg: true, calories: 140, description: 'A classic, refreshing can of Coca-Cola.', serves: 1, ingredients: ['Carbonated Water', 'Sugar', 'Caffeine', 'Natural Flavors'], allergens: [] },
];

export const myRestaurant: Restaurant = {
    id: 1, name: 'FoodHub Kitchen', cuisine: 'Multi-cuisine', rating: 4.8, reviews: 2500, distance: '1.2 km', time: '25-30 min', image: '🍽️', deliveryFee: 2.99,
    address: '123 Culinary Lane, Foodie City, Mumbai - 400050',
    about: 'Welcome to FoodHub Kitchen, where every dish is a culinary masterpiece crafted with passion. We bring you the best from around the world, right to your doorstep.',
    menu: allFoodItems
};

export const banners: Banner[] = [
  { id: 1, title: '50% OFF', subtitle: 'On your first order', color: 'from-orange-500 to-red-500', image: '🎉' },
  { id: 2, title: 'FREE DELIVERY', subtitle: 'Orders above $25', color: 'from-blue-500 to-purple-500', image: '🚚' },
  { id: 3, title: 'COMBO DEALS', subtitle: 'Save up to $10', color: 'from-green-500 to-teal-500', image: '🍱' },
  { id: 4, title: 'CASHBACK', subtitle: 'Earn rewards points', color: 'from-pink-500 to-rose-500', image: '💰' }
];

export const spinWheelRewards: SpinWheelReward[] = [
  { id: 1, label: '+5', value: 5, color: '#ef4444' }, // red-500
  { id: 2, label: '+10', value: 10, color: '#f97316' }, // orange-500
  { id: 3, label: '+25', value: 25, color: '#eab308' }, // yellow-500
  { id: 4, label: 'Miss Turn', value: 0, color: '#a8a29e' }, // stone-400
  { id: 5, label: '+100', value: 100, color: '#84cc16' }, // lime-500
  { id: 6, label: '+25', value: 25, color: '#22c55e' }, // green-500
  { id: 7, label: '+10', value: 10, color: '#14b8a6' }, // teal-500
  { id: 8, label: '+5', value: 5, color: '#06b6d4' }, // cyan-500
  { id: 9, label: 'Miss Turn', value: 0, color: '#a8a29e' }, // stone-400
  { id: 10, label: '+100', value: 100, color: '#3b82f6' }, // blue-500
  { id: 11, label: '+25', value: 25, color: '#8b5cf6' }, // violet-500
  { id: 12, label: '+10', value: 10, color: '#d946ef' }, // fuchsia-500
];

export const scratchCards: ScratchCard[] = [
  { id: 1, reward: '50 Points', revealed: false, rewardType: 'points', rewardValue: 50 },
  { id: 2, reward: '$5 OFF', revealed: false, rewardType: 'coupon', rewardValue: 5, couponCode: '5OFF' },
  { id: 3, reward: '25 Points', revealed: false, rewardType: 'points', rewardValue: 25 }
];

export const triviaQuestions: TriviaQuestion[] = [
  { id: 1, question: 'Which country is the origin of Pizza?', options: ['USA', 'Italy', 'France', 'Greece'], correct: 1, points: 10 },
  { id: 2, question: 'What is the main ingredient in Hummus?', options: ['Lentils', 'Chickpeas', 'Beans', 'Peas'], correct: 1, points: 10 },
  { id: 3, question: 'Sushi originated from which country?', options: ['China', 'Korea', 'Japan', 'Thailand'], correct: 2, points: 10 }
];

export const comboDeals: ComboDeal[] = [
  { id: 1, name: 'Burger Bonanza', itemsDescription: 'Beef Burger + Fries + Coke', itemIds: [11001, 14001, 9002], price: 14.99, originalPrice: 15.99, image: '🍔🥤', color: 'from-yellow-400 to-red-400' },
  { id: 2, name: 'Pizza Party', itemsDescription: 'Margherita Pizza + Garlic Bread', itemIds: [10001, 14002], price: 16.99, originalPrice: 17.49, image: '🍕🥖', color: 'from-red-400 to-orange-400' },
  { id: 3, name: 'Curry Combo', itemsDescription: 'Butter Chicken + Naan', itemIds: [3001, 14005], price: 20.99, originalPrice: 21.99, image: '🍗🍞', color: 'from-orange-400 to-rose-400' },
  { id: 4, name: 'Noodle Night', itemsDescription: 'Hakka Noodles + Spring Rolls', itemIds: [5001, 14004], price: 15.99, originalPrice: 18.98, image: '🍜🥟', color: 'from-purple-400 to-pink-400' },
];

export const coupons: Coupon[] = [
    { code: '5OFF', description: '$5 off on orders over $20', discountType: 'fixed', discountValue: 5, minOrderValue: 20 },
    { code: 'WELCOME10', description: '10% off your first order', discountType: 'percentage', discountValue: 10 },
    { code: 'TREAT20', description: '20% off on Desserts', discountType: 'percentage', discountValue: 20 },
];

export const happyHourDeals: HappyHourDeal[] = [
    { id: 1, name: "Pizza Friday!", dayOfWeek: 5, startTime: '17:00', endTime: '19:00', discountType: 'fixed', discountValue: 5, appliesTo: { type: 'category', id: 'pizza'}, description: "FLAT $5 OFF PIZZAS 🍕" },
    { id: 2, name: "Wok Wednesday!", dayOfWeek: 3, startTime: '12:00', endTime: '15:00', discountType: 'percentage', discountValue: 25, appliesTo: { type: 'category', id: 'chinese' }, description: "25% OFF NOODLES 🍜" },
    { id: 3, name: "Thirsty Thursday!", dayOfWeek: 4, startTime: '16:00', endTime: '18:00', discountType: 'percentage', discountValue: 50, appliesTo: { type: 'category', id: 'beverages' }, description: "50% OFF BEVERAGES 🍹" }
];
