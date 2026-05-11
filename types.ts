
export interface FoodCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
}

export interface CustomizationOption {
    name: string;
    price: number;
}

export interface Addon {
    name:string;
    price: number;
}

export interface Alternative {
    name: string;
    price: number;
}

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  time: string;
  isVeg?: boolean;
  calories?: number;
  description: string;
  originalPrice?: number | null;
  tags?: string[];
  customizations?: {
    size?: CustomizationOption[];
    spice?: string[];
    addons?: Addon[];
    removableIngredients?: string[];
    crust?: string[];
    alternatives?: { [ingredient: string]: Alternative[] };
  };
  allergens?: string[];
  ingredients?: string[];
  serves?: number;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  distance: string;
  time: string;
  image: string;
  deliveryFee: number;
  address: string;
  about?: string;
  menu: FoodItem[];
}

export interface CartItem extends FoodItem {
  cartId: number;
  quantity: number;
  totalPrice: number;
  customizations: { [key: string]: any };
  specialInstructions: string;
  addons?: Addon[];
  restaurantId: number;
}

export interface OrderTotal {
  subtotal: string;
  tax: string;
  deliveryFee: string;
  tip: string;
  discount: string;
  total: string;
}

export interface StatusStep {
    label: string;
    time: string;
    completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: number;
  items: CartItem[];
  totals: OrderTotal;
  orderType: string;
  address: Address;
  paymentMethod: string;
  status: 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'ready_for_pickup' | 'served' | 'completed';
  statusSteps: StatusStep[];
  placedAt: string;
  estimatedTime: string;
  pointsEarned: number;
  deliveryPartner?: {
    name: string;
    phone: string;
    vehicle: string;
  };
  servingInstructions?: string;
  tableNumber?: string;
  couponApplied?: Coupon;
  happyHourDiscount?: number;
}

export interface Address {
  id: number;
  label: string;
  address: string;
  isDefault: boolean;
}

export interface Banner {
    id: number;
    title: string;
    subtitle: string;
    color: string;
    image: string;
}

export interface SpinWheelReward {
    id: number;
    label: string;
    value: number;
    color: string;
}

export interface ScratchCard {
    id: number;
    reward: string;
    revealed: boolean;
    rewardType: 'points' | 'coupon';
    rewardValue: number;
    couponCode?: string;
}

export interface TriviaQuestion {
    id: number;
    question: string;
    options: string[];
    correct: number;
    points: number;
}

export interface Notification {
    msg: string;
    type: 'success' | 'error';
}

export interface LoyaltyPointEntry {
    points: number;
    source: string;
    earnedAt: string;
    expiresAt: string;
}

export interface User {
    name: string;
    phone: string;
    dob: string;
}

export interface Reservation {
    id: string;
    date: string;
    time: string;
    guests: number;
    status: 'confirmed' | 'pending';
    preOrderedItems?: CartItem[];
    paymentStatus?: 'paid' | 'pending';
}

export interface ComboDeal {
    id: number;
    name: string;
    itemsDescription: string;
    itemIds: number[];
    price: number;
    originalPrice: number;
    image: string;
    color: string;
}

export interface HappyHourDeal {
    id: number;
    name: string;
    dayOfWeek: number; // 0 for Sunday, 1 for Monday, etc.
    startTime: string; // HH:MM
    endTime: string; // HH:MM
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    appliesTo: {
        type: 'category' | 'all';
        id?: string;
    };
    description: string;
}
