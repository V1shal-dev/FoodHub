
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { myRestaurant, banners, spinWheelRewards, scratchCards as initialScratchCards, triviaQuestions, allFoodItems, coupons as allCoupons, happyHourDeals, comboDeals } from './constants/data';
import type { FoodItem, CartItem, Order, Address, FoodCategory, Notification, ScratchCard as ScratchCardType, LoyaltyPointEntry, User, Reservation, SpinWheelReward, Addon, Coupon, ComboDeal, HappyHourDeal } from './types';

import {
  SplashScreen,
  OnboardingScreen,
  AuthScreen,
  HomeScreen,
  SearchScreen,
  CartScreen,
  OrdersScreen,
  ProfileScreen,
  CategoryViewScreen,
  ItemDetailModal,
  CheckoutScreen,
  OrderTrackingScreen,
  NotificationsScreen,
  FiltersScreen,
  SpinWheelModal,
  ScratchCardModal,
  TriviaModal,
  BottomNav,
  QRCodeScanner,
  WalletScreen,
  LoyaltyPointsScreen,
  AddressesScreen,
  FavoriteDishesScreen,
  CouponsScreen,
  SettingsScreen,
  HelpScreen,
  AboutScreen,
  ReservationScreen,
  RateOrderModal,
  ReferScreen,
  BirthdayModal,
  MemoryGameModal,
  CancelOrderModal,
  DynamicAnimationOverlay,
  PreOrderScreen,
} from './components';


// ============================================
// 🎨 MAIN APP COMPONENT
// ============================================

export default function App() {
  // Navigation & View States
  const [currentScreen, setCurrentScreen] = useState('splash'); // splash, onboarding, auth, main
  const [activeTab, setActiveTab] = useState('home');
  const [activeProfileScreen, setActiveProfileScreen] = useState<string | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(0);
  
  // User & App States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userLocation, setUserLocation] = useState('Mumbai, Maharashtra');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dietary: 'all', // 'all', 'veg', 'non-veg'
    sortBy: 'relevance', // 'relevance', 'rating', 'price-asc', 'price-desc'
  });
  const [showCategoryView, setShowCategoryView] = useState(false);
  const [viewAllCategory, setViewAllCategory] = useState<FoodCategory | null>(null);
  
  // Cart & Order States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<number[]>([1001, 3001]);
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, label: 'Home', address: '123 Main Street, Apartment 4B, Mumbai - 400001', isDefault: true },
    { id: 2, label: 'Work', address: '456 Business Park, Floor 5, Mumbai - 400002', isDefault: false }
  ]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(addresses.find(a => a.isDefault) || null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Gamification States
  const [loyaltyPoints, setLoyaltyPoints] = useState<LoyaltyPointEntry[]>([
    { points: 500, source: 'Signup Bonus', earnedAt: new Date(Date.now() - 20 * 86400000).toISOString(), expiresAt: new Date(Date.now() + 70 * 86400000).toISOString() },
    { points: 350, source: 'Order #FH20230812345', earnedAt: new Date(Date.now() - 10 * 86400000).toISOString(), expiresAt: new Date(Date.now() + 80 * 86400000).toISOString() },
  ]);
  const [lastGameTime, setLastGameTime] = useState<number>(0);
  const [userTier, setUserTier] = useState('Gold');
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [showTrivia, setShowTrivia] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [scratchCardsState, setScratchCardsState] = useState<ScratchCardType[]>(initialScratchCards);
  const [spinning, setSpinning] = useState(false);
  const [userCoupons, setUserCoupons] = useState<Coupon[]>([]);

  // UI States
  const [notification, setNotification] = useState<Notification | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderType, setOrderType] = useState('delivery');
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [orderToRate, setOrderToRate] = useState<Order | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [tableInfo, setTableInfo] = useState<{table: string, restaurant: string} | null>(null);
  const [showBirthdayModal, setShowBirthdayModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Form States
  const [selectedCustomizations, setSelectedCustomizations] = useState<{ [key: string]: string | string[] }>({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [servingInstructions, setServingInstructions] = useState('');
  const [dineInTable, setDineInTable] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('online');

  const totalPoints = useMemo(() => loyaltyPoints.filter(p => new Date(p.expiresAt) > new Date()).reduce((sum, p) => sum + p.points, 0), [loyaltyPoints]);

  useEffect(() => {
    const splashTimer = setTimeout(() => setCurrentScreen('onboarding'), 2000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const bannerTimer = setInterval(() => setBannerIndex(prev => (prev + 1) % banners.length), 3000);
    return () => clearInterval(bannerTimer);
  }, []);

  useEffect(() => {
    if (user && user.dob) { // user.dob is 'YYYY-MM-DD'
        const today = new Date();
        // Parse date string manually to avoid timezone issues
        const [_, month, day] = user.dob.split('-').map(Number);
        
        const userMonth = month;
        const userDate = day;
        
        const currentMonth = today.getMonth() + 1; // getMonth() is 0-indexed
        const currentDate = today.getDate();

        if (userMonth === currentMonth && userDate === currentDate) {
            setShowBirthdayModal(true);
        }
    }
  }, [user]);
  
  const showNotif = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const addPoints = useCallback((points: number, source: string) => {
    const newPointEntry: LoyaltyPointEntry = { points, source, earnedAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 90 * 86400000).toISOString() };
    setLoyaltyPoints(prev => [newPointEntry, ...prev]);
  }, []);

  const addCoupon = useCallback((couponCode: string) => {
    const couponToAdd = allCoupons.find(c => c.code === couponCode);
    if (couponToAdd && !userCoupons.find(uc => uc.code === couponCode)) {
        setUserCoupons(prev => [...prev, couponToAdd]);
        showNotif(`Coupon "${couponToAdd.description}" added!`, 'success');
    } else if (couponToAdd) {
        showNotif('You already have this coupon.', 'error');
    }
  }, [userCoupons, showNotif]);

  const handleScratchReveal = useCallback((revealedCard: ScratchCardType) => {
    setScratchCardsState(prev => prev.map(c => c.id === revealedCard.id ? { ...c, revealed: true } : c));
    if (revealedCard.rewardType === 'points') {
        addPoints(revealedCard.rewardValue, 'Scratch Card');
        showNotif(`You won ${revealedCard.rewardValue} points! 🎉`);
    } else if (revealedCard.rewardType === 'coupon' && revealedCard.couponCode) {
        addCoupon(revealedCard.couponCode);
    }
    setLastGameTime(Date.now());
  }, [addPoints, addCoupon, showNotif]);

  const handleAddToCart = useCallback((item: FoodItem, quantity: number, customizations: { [key:string]: any }, finalPrice: number, instructions: string, addons: Addon[]) => {
    setCart(prevCart => {
        const customizationsKey = JSON.stringify(customizations);
        const addonsKey = JSON.stringify(addons || []);

        const itemIndex = prevCart.findIndex(cartItem => 
            cartItem.id === item.id &&
            JSON.stringify(cartItem.customizations) === customizationsKey &&
            JSON.stringify(cartItem.addons || []) === addonsKey &&
            cartItem.specialInstructions === instructions
        );

        if (itemIndex > -1) {
            const newCart = [...prevCart];
            const existingItem = newCart[itemIndex];
            
            const newQuantity = existingItem.quantity + quantity;
            const singleItemPrice = (existingItem.quantity > 0) ? existingItem.totalPrice / existingItem.quantity : (finalPrice / quantity);

            newCart[itemIndex] = {
                ...existingItem,
                quantity: newQuantity,
                totalPrice: singleItemPrice * newQuantity,
            };
            
            showNotif(`${item.name} quantity updated in cart!`);
            return newCart;

        } else {
            const newCartItem: CartItem = { 
                ...item, 
                cartId: Date.now(), 
                quantity: quantity, 
                totalPrice: finalPrice, 
                customizations, 
                specialInstructions: instructions, 
                addons, 
                restaurantId: myRestaurant.id 
            };
            showNotif(`${item.name} added to cart! 🎉`);
            return [...prevCart, newCartItem];
        }
    });
  }, [showNotif]);
  
  const handleAddComboToCart = useCallback((combo: ComboDeal) => {
    const itemsFromCombo = combo.itemIds.map(id => allFoodItems.find(item => item.id === id)).filter(Boolean) as FoodItem[];
    if (itemsFromCombo.length === 0) {
        showNotif('Could not add combo.', 'error');
        return;
    }

    const priceRatio = combo.price / combo.originalPrice;

    const comboCartItems: CartItem[] = itemsFromCombo.map(item => {
        const discountedPrice = item.price * priceRatio;
        return {
            ...item,
            cartId: Date.now() + item.id,
            quantity: 1,
            price: discountedPrice,
            totalPrice: discountedPrice,
            customizations: { comboName: combo.name },
            specialInstructions: '',
            addons: [],
            restaurantId: myRestaurant.id,
        };
    });

    setCart(prevCart => [...prevCart, ...comboCartItems]);
    showNotif(`${combo.name} added to cart! 🎉`);
  }, [showNotif]);

  const updateCartQuantity = useCallback((cartId: number, change: number) => {
    setCart(prevCart => prevCart.map(item => {
        if (item.cartId === cartId) {
            const singleItemPrice = (item.quantity > 0) ? (item.totalPrice / item.quantity) : item.price;
            const newQuantity = Math.max(1, item.quantity + change);
            const newTotalPrice = singleItemPrice * newQuantity;
            return { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
        }
        return item;
    }));
  }, []);

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
    showNotif('Item removed from cart');
  };

  const toggleFavoriteItem = (itemId: number) => {
    setFavoriteItems(prev => prev.includes(itemId) ? (showNotif('Removed from favorites'), prev.filter(id => id !== itemId)) : (showNotif('Added to favorites! ❤️'), [...prev, itemId]));
  };

  const getActiveHappyHourDeal = useCallback((): HappyHourDeal | null => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    for (const deal of happyHourDeals) {
        if (deal.dayOfWeek === currentDay && currentTime >= deal.startTime && currentTime <= deal.endTime) {
            return deal;
        }
    }
    return null;
  }, []);

  const calculateCartTotal = useCallback(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    let discount = 0;
    
    const activeHappyHour = getActiveHappyHourDeal();
    if (appliedCoupon) {
        if (subtotal >= (appliedCoupon.minOrderValue || 0)) {
            discount = appliedCoupon.discountType === 'percentage' ? subtotal * (appliedCoupon.discountValue / 100) : appliedCoupon.discountValue;
        }
    } else if (activeHappyHour) {
        let applicableTotal = 0;
        if(activeHappyHour.appliesTo.type === 'all'){
            applicableTotal = subtotal;
        } else { // category
            applicableTotal = cart.filter(i => i.category === activeHappyHour.appliesTo.id).reduce((sum, i) => sum + i.totalPrice, 0);
        }
        discount = activeHappyHour.discountType === 'percentage' ? applicableTotal * (activeHappyHour.discountValue / 100) : Math.min(applicableTotal, activeHappyHour.discountValue);
    }

    discount = Math.min(subtotal, discount);
    const subtotalAfterDiscount = subtotal - discount;
    const tax = subtotalAfterDiscount * 0.1;
    const deliveryFee = orderType === 'delivery' ? myRestaurant.deliveryFee : 0;
    const total = subtotalAfterDiscount + tax + deliveryFee + tipAmount;
    
    return { subtotal: subtotal.toFixed(2), tax: tax.toFixed(2), deliveryFee: deliveryFee.toFixed(2), tip: tipAmount.toFixed(2), discount: discount.toFixed(2), total: Math.max(0, total).toFixed(2) };
  }, [cart, orderType, tipAmount, appliedCoupon, getActiveHappyHourDeal]);

  const placeOrder = useCallback(() => {
    const restaurantAddress: Address = { id: 99, label: 'Restaurant', address: myRestaurant.address, isDefault: false };
    const addressToUse = orderType === 'delivery' ? selectedAddress : restaurantAddress;

    if (!cart.length || (orderType === 'delivery' && !addressToUse) || (orderType === 'dine-in' && !dineInTable)) {
      if (orderType === 'delivery' && !selectedAddress) showNotif('Please select a delivery address.', 'error');
      if (orderType === 'dine-in' && !dineInTable) showNotif('Please enter your table number.', 'error');
      return;
    }

    const totals = calculateCartTotal();
    const pointsEarned = Math.floor(parseFloat(totals.total));
    const orderDate = new Date();
    const orderNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `FH${orderDate.getFullYear()}${String(orderDate.getMonth() + 1).padStart(2, '0')}${orderNum}`;
    
    let statusSteps: Order['statusSteps'];
    let deliveryPartner: Order['deliveryPartner'] | undefined = undefined;
    const activeHappyHour = getActiveHappyHourDeal();

    const confirmedStep = { label: 'Order Confirmed', time: orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true };
    const preparingStep = { label: 'Preparing Food', time: '', completed: false };

    switch (orderType) {
        case 'delivery':
            statusSteps = [ confirmedStep, preparingStep, { label: 'Out for Delivery', time: '', completed: false }, { label: 'Delivered', time: '', completed: false }];
            deliveryPartner = { name: 'Rahul Kumar', phone: '+91 98765 43210', vehicle: '🏍️ MH-01-AB-1234' };
            break;
        case 'takeaway':
            statusSteps = [ confirmedStep, preparingStep, { label: 'Ready for Pickup', time: '', completed: false }, { label: 'Completed', time: '', completed: false }];
            break;
        case 'dine-in':
            statusSteps = [ confirmedStep, preparingStep, { label: 'Served at Table', time: '', completed: false }, { label: 'Completed', time: '', completed: false }];
            break;
        default: statusSteps = [];
    }

    const newOrder: Order = { 
        id: orderId, orderNumber: orderNum, items: [...cart], totals, orderType, address: addressToUse, paymentMethod, status: 'confirmed', statusSteps,
        placedAt: orderDate.toISOString(), estimatedTime: orderType === 'delivery' ? '25-30 min' : '15-20 min',
        pointsEarned, ...(deliveryPartner && { deliveryPartner }), ...(orderType === 'dine-in' && { servingInstructions, tableNumber: dineInTable }),
        ...(appliedCoupon && { couponApplied: appliedCoupon }),
        ...(!appliedCoupon && activeHappyHour && { happyHourDiscount: parseFloat(totals.discount) })
    };
    setOrders(prev => [newOrder, ...prev]);
    addPoints(pointsEarned, `Order #${orderNum}`);
    if (appliedCoupon) { setUserCoupons(prev => prev.filter(c => c.code !== appliedCoupon.code)); setAppliedCoupon(null); }
    setLastGameTime(0);
    setCart([]);
    setShowCheckout(false);
    setTrackingOrder(newOrder);
    setShowOrderTracking(true);
    setActiveTab('home');
    setServingInstructions('');
    setDineInTable('');
    showNotif(`Order #${orderNum} placed! +${pointsEarned} pts & a free game!`, 'success');
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 5000);
    
    const updateOrderStatus = (id: string, newStatus: Order['status'], stepIndex: number, final?: boolean) => {
      setTimeout(() => {
        const updateFn = (prev: Order): Order => ({
          ...prev,
          status: newStatus,
          statusSteps: prev.statusSteps.map((s, i) =>
            i === stepIndex
              ? { ...s, completed: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
              : s
          ),
        });
    
        setOrders(prevOrders =>
          prevOrders.map(o => {
            if (o.id === id && o.status !== 'cancelled') {
              const updatedOrder = updateFn(o);
              if (final) {
                setOrderToRate(updatedOrder);
              }
              return updatedOrder;
            }
            return o;
          })
        );
    
        setTrackingOrder(prev => (prev && prev.id === id && prev.status !== 'cancelled' ? updateFn(prev) : prev));
      }, (stepIndex * 7000) + 5000);
    };
    
    if (orderType === 'delivery') {
        updateOrderStatus(newOrder.id, 'preparing', 1);
        updateOrderStatus(newOrder.id, 'out_for_delivery', 2);
        updateOrderStatus(newOrder.id, 'delivered', 3, true);
    } else { // takeaway or dine-in
        updateOrderStatus(newOrder.id, 'preparing', 1);
        const secondStatus = orderType === 'takeaway' ? 'ready_for_pickup' : 'served';
        updateOrderStatus(newOrder.id, secondStatus, 2);
        updateOrderStatus(newOrder.id, 'completed', 3, true);
    }
  }, [cart, calculateCartTotal, paymentMethod, orderType, selectedAddress, addPoints, servingInstructions, dineInTable, showNotif, appliedCoupon, getActiveHappyHourDeal]);

  const confirmCancelOrder = useCallback(() => {
    if (!orderToCancel) return;
    const updateFn = (prev: Order) => (prev.id === orderToCancel.id ? { ...prev, status: 'cancelled' as const } : prev);
    setOrders(prevOrders => prevOrders.map(updateFn));
    setTrackingOrder(prev => (prev && prev.id === orderToCancel.id) ? updateFn(prev) : prev);
    showNotif(`Order #${orderToCancel.orderNumber} has been cancelled.`);
    setOrderToCancel(null);
  }, [orderToCancel, showNotif]);

  const handleSpinResult = (reward: SpinWheelReward) => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      if (reward.value > 0) {
        addPoints(reward.value, 'Spin Wheel');
        showNotif(`🎉 You won ${reward.label}!`);
      } else {
        showNotif('🔄 Better luck next time!');
      }
      setSpinning(false);
      setLastGameTime(Date.now());
      setTimeout(() => setShowSpinWheel(false), 2000); 
    }, 4000); 
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentScreen('main');
    addPoints(500, 'Signup Bonus');
    showNotif(`Welcome, ${userData.name}! 🎉 +500 bonus points!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setUser(null); setCart([]); setOrders([]); setFavoriteItems([]); setCurrentScreen('auth'); showNotif('Logged out successfully');
  };

  const handleOpenGame = (setter: (show: boolean) => void) => {
    const now = Date.now();
    if (now - lastGameTime > 24 * 60 * 60 * 1000) {
      setter(true);
    } else {
      showNotif('You can play again in 24 hours or after placing an order.');
    }
  };
  
  const handleMakeReservation = (reservation: Omit<Reservation, 'id' | 'status'>, preOrderedItems: CartItem[], paymentStatus: 'paid' | 'pending') => {
    const newReservation: Reservation = { ...reservation, id: `RES-${Date.now()}`, status: 'confirmed', preOrderedItems, paymentStatus };
    setReservations(prev => [newReservation, ...prev]);
    setActiveTab('home');
    showNotif(`Table for ${reservation.guests} on ${reservation.date} confirmed!`);
  };

  const handleBirthdayRewardClaim = useCallback(() => {
    const freebie = allFoodItems.find(item => item.id === 9001); // Mango Lassi
    if (freebie) {
        const freeCartItem: CartItem = { ...freebie, cartId: Date.now(), quantity: 1, price: 0, totalPrice: 0, customizations: {}, specialInstructions: 'Birthday Reward 🎉', addons: [], restaurantId: myRestaurant.id };
        setCart(prevCart => [...prevCart, freeCartItem]);
        showNotif('Free Mango Lassi added to your cart! 🎁');
        setActiveTab('cart');
    }
    setShowBirthdayModal(false);
  }, [showNotif]);

  const openCategoryView = (category: FoodCategory) => {
    setViewAllCategory(category);
    setShowCategoryView(true);
  };

  const handleCloseItemDetail = useCallback(() => {
    setShowItemDetails(false);
  }, []);

  const renderMainContent = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen openCategoryView={openCategoryView} setShowFilters={setShowFilters} onSelectItem={(item) => { setSelectedItem(item); setShowItemDetails(true); }} favoriteItems={favoriteItems} toggleFavoriteItem={toggleFavoriteItem} loyaltyPoints={totalPoints} onShowGame={(type) => handleOpenGame(type === 'spin' ? setShowSpinWheel : type === 'scratch' ? setShowScratchCard : type === 'memory' ? setShowMemoryGame : setShowTrivia)} setShowNotifications={setShowNotifications} setShowQRScanner={setShowQRScanner} bannerIndex={bannerIndex} userLocation={userLocation} searchQuery={searchQuery} setSearchQuery={setSearchQuery} showNotif={showNotif} handleAddComboToCart={handleAddComboToCart} activeDeal={getActiveHappyHourDeal()} filters={filters} />;
      case 'reserve': return <ReservationScreen onClose={() => setActiveTab('home')} onConfirm={handleMakeReservation} restaurantMenu={myRestaurant.menu} />;
      case 'cart': return <CartScreen cart={cart} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} orderType={orderType} setOrderType={setOrderType} totals={calculateCartTotal()} tipAmount={tipAmount} setTipAmount={setTipAmount} setShowCheckout={setShowCheckout} setActiveTab={setActiveTab} />;
      case 'orders': return <OrdersScreen orders={orders} setTrackingOrder={setTrackingOrder} setShowOrderTracking={setShowOrderTracking} setActiveTab={setActiveTab} />;
      case 'profile': return <ProfileScreen user={user} orders={orders} favoriteItemsCount={favoriteItems.length} loyaltyPoints={totalPoints} userTier={userTier} addresses={addresses} onLogout={handleLogout} onNavigate={setActiveProfileScreen} />;
      default: return null;
    }
  };
  
  const renderProfileScreen = () => {
    if (!activeProfileScreen) return null;
    const commonProps = { onClose: () => setActiveProfileScreen(null) };
    const favoriteFoodItems = myRestaurant.menu.filter(item => favoriteItems.includes(item.id));

    switch(activeProfileScreen) {
        case 'wallet': return <WalletScreen {...commonProps} loyaltyPoints={totalPoints} />;
        case 'loyalty': return <LoyaltyPointsScreen {...commonProps} pointsHistory={loyaltyPoints} totalPoints={totalPoints} />;
        case 'addresses': return <AddressesScreen {...commonProps} addresses={addresses} />;
        case 'favorites': return <FavoriteDishesScreen {...commonProps} favoriteItems={favoriteFoodItems} onSelectItem={(item) => { setSelectedItem(item); setShowItemDetails(true); setActiveProfileScreen(null); }} />;
        case 'coupons': return <CouponsScreen {...commonProps} userCoupons={userCoupons} />;
        case 'settings': return <SettingsScreen {...commonProps} />;
        case 'help': return <HelpScreen {...commonProps} />;
        case 'about': return <AboutScreen {...commonProps} />;
        case 'refer': return <ReferScreen {...commonProps} user={user} showNotif={showNotif}/>
        default: return null;
    }
  }

  const renderContent = () => {
    switch (currentScreen) {
      case 'splash': return <SplashScreen />;
      case 'onboarding': return <OnboardingScreen setOnboardingStep={setOnboardingStep} onboardingStep={onboardingStep} setCurrentScreen={setCurrentScreen} />;
      case 'auth': return <AuthScreen onLogin={handleLogin} />;
      case 'main': return <><div className="pb-20">{renderMainContent()}</div><BottomNav activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cart.length} /></>;
      default: return null;
    }
  };

  return (
    <div className="bg-gray-800 font-sans min-h-screen flex justify-center">
      <div className="phone-frame w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden">
        {notification && <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-xl shadow-2xl max-w-sm w-11/12 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white font-bold text-center animate-slide-down-fade`}>{notification.msg}</div>}
        <style>{`@keyframes slide-down-fade { 0% { opacity: 0; transform: translate(-50%, -100%); } 10% { opacity: 1; transform: translate(-50%, 0); } 90% { opacity: 1; transform: translate(-50%, 0); } 100% { opacity: 0; transform: translate(-50%, -100%); } } .animate-slide-down-fade { animation: slide-down-fade 3s ease-out forwards; }`}</style>

        {renderContent()}

        {showCategoryView && viewAllCategory && <CategoryViewScreen category={viewAllCategory} items={myRestaurant.menu.filter(i => viewAllCategory.id === 'all' || i.category === viewAllCategory.id)} onClose={() => setShowCategoryView(false)} onSelect={(item) => { setSelectedItem(item); setShowItemDetails(true); setShowCategoryView(false); }} />}
        {showItemDetails && selectedItem && <ItemDetailModal item={selectedItem} onClose={handleCloseItemDetail} onAddToCart={handleAddToCart} />}
        {showCheckout && <CheckoutScreen totals={calculateCartTotal()} addresses={addresses} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} loyaltyPoints={totalPoints} onPlaceOrder={placeOrder} onClose={() => setShowCheckout(false)} orderType={orderType} tableInfo={tableInfo} servingInstructions={servingInstructions} setServingInstructions={setServingInstructions} dineInTable={dineInTable} setDineInTable={setDineInTable} userCoupons={userCoupons} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} />}
        {showOrderTracking && trackingOrder && <OrderTrackingScreen order={trackingOrder} onClose={() => { setShowOrderTracking(false); setActiveTab('home'); }} onReorder={(items) => { if (window.confirm("This will clear your current cart.")) { setCart(items); setActiveTab('cart'); } }} onCancelRequest={() => setOrderToCancel(trackingOrder)} />}
        {showNotifications && <NotificationsScreen onClose={() => setShowNotifications(false)} />}
        {showFilters && <FiltersScreen onClose={() => setShowFilters(false)} filters={filters} setFilters={setFilters} />}
        {orderToRate && <RateOrderModal order={orderToRate} onClose={() => setOrderToRate(null)} onSubmit={(feedback) => { showNotif(`Thank you for your ${feedback.rating}-star feedback!`); setOrderToRate(null); }} />}
        {showSpinWheel && <SpinWheelModal spinning={spinning} onSpin={handleSpinResult} onClose={() => setShowSpinWheel(false)} />}
        {showScratchCard && <ScratchCardModal scratchCardsState={scratchCardsState} onReveal={handleScratchReveal} onClose={() => { setShowScratchCard(false); setScratchCardsState(initialScratchCards.map(c => ({...c, revealed: false}))); }} />}
        {showTrivia && <TriviaModal question={triviaQuestions[0]} onAnswer={() => { showNotif('Correct!'); setLastGameTime(Date.now()); }} onClose={() => setShowTrivia(false)} currentQuestionIndex={0} totalQuestions={triviaQuestions.length} />}
        {showMemoryGame && <MemoryGameModal onClose={() => setShowMemoryGame(false)} onWin={(points) => { addPoints(points, "Memory Game"); showNotif(`You won ${points} points! 🎉`); setLastGameTime(Date.now()); }} />}
        {showQRScanner && <QRCodeScanner onClose={() => setShowQRScanner(false)} onScan={(data) => { setTableInfo(data); setDineInTable(data.table); setOrderType('dine-in'); setShowQRScanner(false); showNotif(`Scanned! Welcome to ${data.restaurant}, Table ${data.table}.`); }} />}
        {showBirthdayModal && user && <BirthdayModal onClose={() => setShowBirthdayModal(false)} onClaim={handleBirthdayRewardClaim} userName={user.name} />}
        {orderToCancel && <CancelOrderModal order={orderToCancel} onConfirm={confirmCancelOrder} onDismiss={() => setOrderToCancel(null)} />}
        {showCelebration && <DynamicAnimationOverlay onComplete={() => setShowCelebration(false)} />}

        {renderProfileScreen()}
      </div>
    </div>
  );
}
