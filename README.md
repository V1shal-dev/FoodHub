<div align="center">

# 🍔 FoodHub

### Order. Reserve. Enjoy.

**A modern, mobile-first food experience — delivery, takeaway, dine-in reservations, loyalty rewards and gamified offers, all in one app.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF?logo=capacitor&logoColor=white)](https://capacitorjs.com)

</div>

---

## ✨ Overview

**FoodHub** is a feature-rich, mobile-first food ordering app. It's a **React + Vite + TypeScript** web application styled with **Tailwind CSS**, wrapped with **Capacitor** so the exact same codebase ships as a native **Android** and **iOS** app.

It's designed to feel like a real product — not a demo — with a complete user journey from splash → onboarding → auth → home → cart → checkout → live order tracking, plus reservations, loyalty, coupons, and four mini-games for engagement.

---

## 🚀 Live Demo

> _Add your deployed link here once published (e.g. Vercel / Netlify / GitHub Pages):_
> 🔗 **Live:** ➜ http://10.220.228.141:3000/

---

## 🌟 Features

### 🛒 Ordering & Fulfilment
- **Three order modes** — Delivery, Takeaway, and Dine-in (with QR table scanning)
- **Live order tracking** with status timeline (Confirmed → Preparing → Out for delivery → Delivered)
- **Order history** and **one-tap reorder**
- **Cancel order** flow with confirmation modal
- **Rate orders** with star ratings after completion

### 🍕 Discovery
- Browse **10+ food categories** (Pizza, Burgers, Curries, Biryani, Noodles, Salads, Sides, Desserts, Beverages…)
- **Smart filters** (veg / non-veg, sort by rating, price, relevance)
- **Search** with voice icon and instant results
- **Item detail modal** with size, crust, spice level, add-ons, allergens, ingredients
- **Combo deals** and **Happy Hour** auto-discounts based on day/time

### 🎯 Reservations & Pre-orders
- Reserve a table for any date / time / guest count
- **Pre-order** dishes for your reservation
- Pay now (online) or pay later (at restaurant)
- See active Happy Hour deal on the reservation screen

### 🎁 Loyalty & Gamification
- **Tiered loyalty** program (e.g. Gold tier)
- Points with **90-day expiry** tracking
- **Spin Wheel** — daily spin for bonus points
- **Scratch Cards** — reveal points or coupons
- **Trivia** — answer food trivia for points
- **Memory Game** — match-pairs game with rewards
- **Birthday reward** — auto-detects user DOB and gifts a free dish
- **Refer & Earn** screen

### 💳 Checkout & Payments
- Multiple **saved addresses** (Home / Work / Other)
- Tip selection
- **Coupons** with min order value and percentage/fixed discount
- Auto-applied **Happy Hour** discount when no coupon is used
- Order summary with subtotal, tax, delivery fee, discount, total

### 👤 Profile
- Wallet, Loyalty Points history, Saved Addresses
- Favourite Dishes, Coupons, Refer & Earn
- Settings, Help, About

### 📱 Mobile-first UX
- True phone-frame layout on desktop, edge-to-edge on real devices
- Smooth animations (slide / bounce / float / scratch reveal)
- **Capacitor**-powered native Android & iOS builds from the same code
- Camera + microphone permissions wired for QR scan and voice search

---

## 🧱 Tech Stack

| Layer | Technology |
| --- | --- |
| Language | **TypeScript 5.8** |
| UI Framework | **React 19** |
| Build Tool | **Vite 6** |
| Styling | **Tailwind CSS** (CDN) |
| Icons | **lucide-react** |
| Mobile Wrapper | **Capacitor 8** (Android + iOS) |
| Module Resolution | ESM with `@/*` path alias |

> ℹ️ **This is not React Native.** It is a React web app rendered into a native WebView via Capacitor — one codebase, three platforms (Web, Android, iOS).

---

## 📂 Project Structure

```
foodhub/
├── App.tsx                  # Root component — state, routing, business logic
├── index.tsx                # React entry point
├── index.html               # HTML shell (Tailwind CDN + meta tags)
├── index.css                # Global styles + .phone-frame containing-block trick
├── types.ts                 # All TypeScript domain types (Order, FoodItem, etc.)
├── vite.config.ts           # Vite config (port 3000, env vars, @ alias)
├── tsconfig.json            # TypeScript config (ES2022, react-jsx)
├── capacitor.config.ts      # Capacitor app id, name, web dir
├── metadata.json            # App metadata + frame permissions
│
├── components/              # All UI components
│   ├── index.ts             # Barrel export
│   ├── SplashScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── AuthScreen.tsx
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── CartScreen.tsx
│   ├── CheckoutScreen.tsx
│   ├── OrderTrackingScreen.tsx
│   ├── OrdersScreen.tsx
│   ├── ReservationScreen.tsx
│   ├── PreOrderScreen.tsx
│   ├── CategoryViewScreen.tsx
│   ├── RestaurantDetailScreen.tsx
│   ├── ItemDetailModal.tsx
│   ├── FiltersScreen.tsx
│   ├── NotificationsScreen.tsx
│   ├── QRCodeScanner.tsx
│   ├── BottomNav.tsx
│   ├── ProfileScreen.tsx
│   ├── SpinWheelModal.tsx     # ┐
│   ├── ScratchCardModal.tsx   # │  Gamification
│   ├── TriviaModal.tsx        # │
│   ├── MemoryGameModal.tsx    # ┘
│   ├── BirthdayModal.tsx
│   ├── RateOrderModal.tsx
│   ├── CancelOrderModal.tsx
│   ├── DynamicAnimationOverlay.tsx
│   └── profile/             # Profile sub-screens
│       ├── WalletScreen.tsx
│       ├── LoyaltyPointsScreen.tsx
│       ├── AddressesScreen.tsx
│       ├── FavoriteDishesScreen.tsx
│       ├── CouponsScreen.tsx
│       ├── ReferScreen.tsx
│       ├── SettingsScreen.tsx
│       ├── HelpScreen.tsx
│       └── AboutScreen.tsx
│
├── constants/
│   └── data.ts              # Seed data: menu, banners, coupons, combos,
│                            #            happy hours, scratch cards, trivia
│
├── android/                 # Capacitor-generated Android Studio project
├── ios/                     # Capacitor-generated Xcode project
├── dist/                    # Production build (gitignored)
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js 18+** (or 20+) and **npm**
- For Android builds: **Android Studio** with SDK
- For iOS builds: **macOS + Xcode + CocoaPods**

### 1️⃣ Clone & install

```bash
git clone https://github.com/<your-username>/foodhub.git
cd foodhub
npm install
```

### 2️⃣ Configure environment

Copy the example env and fill in any keys (Gemini AI is optional):

```bash
cp .env.local.example .env.local   # if you add an example file
# or just edit .env.local directly:
# GEMINI_API_KEY=your_key_here
```

### 3️⃣ Run the web app

```bash
npm run dev
```

Open **http://localhost:3000** in your browser. The app renders inside a true mobile phone frame on desktop and goes edge-to-edge on real devices.

### 4️⃣ Test on a real phone (Wi-Fi)

```bash
npm run dev:mobile      # binds to 0.0.0.0:5173
```

Then open the printed network URL (e.g. `http://10.0.0.5:5173`) on your phone — laptop and phone must be on the same Wi-Fi.

---

## 📱 Build as a Native App (Android / iOS)

This is where **Capacitor** shines — one codebase, two stores.

### Android

```bash
npm run mobile:android         # build + sync + open Android Studio
# or run directly on a connected device / emulator:
npm run mobile:run:android
```

### iOS

```bash
npm run mobile:ios             # build + sync + open Xcode
# or run directly on simulator / device:
npm run mobile:run:ios
```

> 💡 After changing any web code, run `npm run mobile:sync` to push the new web assets into the native projects.

---

## 🛠️ Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server on **http://localhost:3000** |
| `npm run dev:mobile` | Dev server on **0.0.0.0:5173** for LAN/device testing |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run mobile:sync` | Build web + `npx cap sync` (Android & iOS) |
| `npm run mobile:android` | Sync + open Android Studio |
| `npm run mobile:ios` | Sync + open Xcode |
| `npm run mobile:run:android` | Sync + run on connected Android device |
| `npm run mobile:run:ios` | Sync + run on iOS simulator / device |

---

## 🧭 App Flow

```
 ┌──────────┐    ┌──────────────┐    ┌─────────┐    ┌──────────┐
 │  Splash  │ ─▶ │  Onboarding  │ ─▶ │  Auth   │ ─▶ │   Home   │
 └──────────┘    └──────────────┘    └─────────┘    └────┬─────┘
                                                         │
            ┌────────────┬───────────────┬───────────────┼───────────────┐
            ▼            ▼               ▼               ▼               ▼
        Reserve        Cart          Orders          Profile         Search
            │            │               │               │
            ▼            ▼               ▼               ▼
       Pre-order    Checkout       Track Order      Wallet / Loyalty /
                                                    Addresses / Coupons /
                                                    Refer / Settings ...
```

Floating overlays at any time: **Spin Wheel · Scratch Card · Trivia · Memory Game · QR Scanner · Birthday Reward · Item Detail Modal**.

---

## 🎨 Design Notes

- **Mobile-frame on desktop** — the root container uses `max-w-md mx-auto` with `transform: translateZ(0)` (`.phone-frame` class in `index.css`) so all `position: fixed` modals stay inside the phone column instead of escaping to the viewport.
- **Color system** — orange/red brand gradient (`from-orange-500 via-red-500 to-pink-500`), green for success, red for errors, slate-gray neutrals.
- **Typography** — Tailwind defaults with `font-black` for headlines, `font-bold` for labels.

---

## 🗂️ Domain Model (excerpt)

Defined in [`types.ts`](./types.ts):

```ts
interface FoodItem { id, name, price, category, image, rating, reviews,
                     time, isVeg?, calories?, description, originalPrice?,
                     tags?, customizations?, allergens?, ingredients?, serves? }

interface Order { id, orderNumber, items: CartItem[], totals, orderType,
                  address, paymentMethod, status, statusSteps, placedAt,
                  estimatedTime, pointsEarned, deliveryPartner?, ... }

interface Reservation { id, date, time, guests, status,
                        preOrderedItems?, paymentStatus? }

interface Coupon       { code, description, discountType, discountValue,
                         minOrderValue? }
interface HappyHourDeal{ id, name, dayOfWeek, startTime, endTime,
                         discountType, discountValue, appliesTo, description }
```

---

## 📸 Screenshots

| Home | Reserve a Table | Cart | Order Tracking |
| :---: | :---: | :---: | :---: |
| _add_ | _add_ | _add_ | _add_ |

> Drop your screenshots in a `docs/screenshots/` folder and link them here.

---

## 🗺️ Roadmap

- [ ] Real backend integration (Node / Firebase / Appwrite)
- [ ] Payment gateway (Stripe / Razorpay)
- [ ] Push notifications (Capacitor plugin)
- [ ] Multi-restaurant support
- [ ] Admin / restaurant owner panel
- [ ] i18n (English / Hindi / Marathi)
- [ ] Dark mode
- [ ] Unit + E2E tests (Vitest + Playwright)

---

## 🤝 Contributing

Contributions are very welcome!

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit: `git commit -m "feat: add amazing feature"`
4. Push: `git push origin feat/amazing-feature`
5. Open a Pull Request 🎉

Please follow the existing TypeScript + Tailwind style and keep components small and focused.

---

## 🙋 Author

Built with care by **[Vishal Patil](https://github.com/V1shal-dev)**.

If FoodHub helps you or inspires you, please ⭐ the repo — it really helps!

</div>
# FoodHub
