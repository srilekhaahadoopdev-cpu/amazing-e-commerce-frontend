export interface ProductVariant {
  colorName: string;
  colorHex: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  title: string;
  discountBadge: string;
  rating: number;
  ratingCount: number;
  socialProof: string;
  price: number;
  mrp: number;
  cardOffer: string;
  deliveryDate: string;
  fastestDelivery: string;
  seasonalBadge?: string;
  variants: ProductVariant[];
}

export const CATEGORIES = [
  "Deals in focus",
  "Mobiles",
  "Electronics",
  "Mobile Accessories",
  "Headphones, Smartwatch & Accessories",
  "Large Appliances",
  "Smart TVs",
  "Kitchen",
  "Home",
  "Furniture",
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "nothing-phone-4b-5g",
    category: "Mobiles",
    title: "Nothing Phone (4b) 5G (White, 8GB RAM, 128GB Storage) | Snapdragon 6 Gen 4 Octa-Core Processor | 50MP + 8MP Dual Camera",
    discountBadge: "44% off",
    rating: 3.9,
    ratingCount: 65,
    socialProof: "1K+ bought in past month",
    price: 30550,
    mrp: 54999,
    cardOffer: "Up to 5% back with SriVisionary ICICI Card",
    deliveryDate: "Wed, 28 Oct",
    fastestDelivery: "Tomorrow 6 am - 10 am",
    seasonalBadge: "Arrives before Festival",
    variants: [
      {
        colorName: "White",
        colorHex: "#F1F5F9",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Black",
        colorHex: "#0F172A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Blue",
        colorHex: "#2563EB",
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-2",
    slug: "apple-iphone-15-pro-max",
    category: "Mobiles",
    title: "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium | A17 Pro Chip | 48MP Main Camera with 5x Telephoto",
    discountBadge: "14% off",
    rating: 4.6,
    ratingCount: 4210,
    socialProof: "5K+ bought in past month",
    price: 137900,
    mrp: 159900,
    cardOffer: "Flat ₹5,000 Instant Discount on ICICI Cards",
    deliveryDate: "Tomorrow",
    fastestDelivery: "Today by 9 pm",
    seasonalBadge: "Arrives before Festival",
    variants: [
      {
        colorName: "Natural Titanium",
        colorHex: "#A8A29E",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Blue Titanium",
        colorHex: "#334155",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Black Titanium",
        colorHex: "#1E293B",
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-3",
    slug: "sony-wh-1000xm5-wireless-noise-cancelling",
    category: "Headphones, Smartwatch & Accessories",
    title: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones with Auto NC Optimizer & 30-Hr Battery",
    discountBadge: "28% off",
    rating: 4.5,
    ratingCount: 3120,
    socialProof: "2K+ bought in past month",
    price: 24990,
    mrp: 34990,
    cardOffer: "Extra ₹2,000 off on Axis Bank Cards",
    deliveryDate: "Thu, 29 Oct",
    fastestDelivery: "Tomorrow 7 am - 11 am",
    seasonalBadge: "Arrives before Festival",
    variants: [
      {
        colorName: "Silver",
        colorHex: "#E2E8F0",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Black",
        colorHex: "#111827",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Midnight Blue",
        colorHex: "#1E3A8A",
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-4",
    slug: "macbook-air-m3-13-inch",
    category: "Electronics",
    title: "Apple 2024 MacBook Air 13-inch Laptop with M3 chip: Liquid Retina Display, 16GB Unified Memory, 512GB SSD",
    discountBadge: "18% off",
    rating: 4.8,
    ratingCount: 890,
    socialProof: "800+ bought in past month",
    price: 114900,
    mrp: 139900,
    cardOffer: "No Cost EMI up to 12 months",
    deliveryDate: "Wed, 28 Oct",
    fastestDelivery: "Tomorrow 6 am - 10 am",
    seasonalBadge: "Mega Deal Offer",
    variants: [
      {
        colorName: "Midnight",
        colorHex: "#0F172A",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Starlight",
        colorHex: "#FEF3C7",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Space Grey",
        colorHex: "#64748B",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-5",
    slug: "samsung-65-inch-qled-4k-tv",
    category: "Smart TVs",
    title: "Samsung 163 cm (65 inches) 4K Ultra HD Smart QLED TV QA65Q60DAULXL | Quantum HDR & Dual LED Backlight",
    discountBadge: "39% off",
    rating: 4.4,
    ratingCount: 1540,
    socialProof: "600+ bought in past month",
    price: 84990,
    mrp: 139900,
    cardOffer: "Up to ₹6,000 Exchange Bonus",
    deliveryDate: "Fri, 30 Oct",
    fastestDelivery: "Scheduled Installation Available",
    seasonalBadge: "Free Wall Mount Included",
    variants: [
      {
        colorName: "Titan Gray",
        colorHex: "#334155",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-6",
    slug: "samsung-galaxy-watch-6-bluetooth",
    category: "Headphones, Smartwatch & Accessories",
    title: "Samsung Galaxy Watch6 Bluetooth (44mm, Graphite) | Advanced Sleep Coaching, ECG & Body Composition Analysis",
    discountBadge: "48% off",
    rating: 4.3,
    ratingCount: 1845,
    socialProof: "1.5K+ bought in past month",
    price: 18999,
    mrp: 36999,
    cardOffer: "10% Cashback with SriVisionary Card",
    deliveryDate: "Wed, 28 Oct",
    fastestDelivery: "Tomorrow 6 am - 10 am",
    seasonalBadge: "Arrives before Festival",
    variants: [
      {
        colorName: "Graphite",
        colorHex: "#1E293B",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Silver",
        colorHex: "#CBD5E1",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-7",
    slug: "lg-7kg-front-load-washing-machine",
    category: "Large Appliances",
    title: "LG 7 Kg 5 Star Inverter Touch Panel Fully-Automatic Front Load Washing Machine with Steam & 6 Motion DD",
    discountBadge: "31% off",
    rating: 4.5,
    ratingCount: 3870,
    socialProof: "1K+ bought in past month",
    price: 29990,
    mrp: 43490,
    cardOffer: "10% Instant Bank Discount",
    deliveryDate: "Thu, 29 Oct",
    fastestDelivery: "Free Express Installation",
    seasonalBadge: "10-Year Motor Warranty",
    variants: [
      {
        colorName: "Middle Black",
        colorHex: "#111827",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Luxury Silver",
        colorHex: "#94A3B8",
        image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-8",
    slug: "philips-digital-air-fryer",
    category: "Kitchen",
    title: "Philips Digital Air Fryer HD9252/90 with Rapid Air Technology, 4.1L Capacity & 7 Preset Cooking Menus",
    discountBadge: "42% off",
    rating: 4.4,
    ratingCount: 8200,
    socialProof: "4K+ bought in past month",
    price: 6999,
    mrp: 11995,
    cardOffer: "Flat ₹500 off with Coupon",
    deliveryDate: "Wed, 28 Oct",
    fastestDelivery: "Tomorrow 6 am - 10 am",
    seasonalBadge: "Top Kitchen Bestseller",
    variants: [
      {
        colorName: "Black Gloss",
        colorHex: "#0F172A",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-9",
    slug: "ergonomic-mesh-office-chair",
    category: "Furniture",
    title: "Green Soul Monster Ultimate Ergonomic High-Back Breathable Mesh Chair with 4D Armrests & Lumbar Support",
    discountBadge: "46% off",
    rating: 4.3,
    ratingCount: 1940,
    socialProof: "900+ bought in past month",
    price: 13490,
    mrp: 24990,
    cardOffer: "Free Assembly at Delivery",
    deliveryDate: "Sat, 31 Oct",
    fastestDelivery: "Standard Courier",
    seasonalBadge: "3-Year Warranty",
    variants: [
      {
        colorName: "Slate Grey",
        colorHex: "#475569",
        image: "https://images.unsplash.com/photo-1580481077195-c2901b52a420?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "All Black",
        colorHex: "#020617",
        image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-10",
    slug: "anker-maggo-magnetic-power-bank",
    category: "Mobile Accessories",
    title: "Anker MagGo 10,000mAh Foldable Wireless Magnetic Power Bank with Smart Digital Display & 15W Qi2 Fast Charge",
    discountBadge: "35% off",
    rating: 4.6,
    ratingCount: 740,
    socialProof: "1K+ bought in past month",
    price: 4999,
    mrp: 7699,
    cardOffer: "Extra 5% off at Checkout",
    deliveryDate: "Tomorrow",
    fastestDelivery: "Today by 9 pm",
    seasonalBadge: "Prime Fast Delivery",
    variants: [
      {
        colorName: "Black",
        colorHex: "#1E293B",
        image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&auto=format&fit=crop&q=80",
      },
      {
        colorName: "Shell White",
        colorHex: "#F8FAFC",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-11",
    slug: "dyson-v12-detect-slim-cordless-vacuum",
    category: "Home",
    title: "Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner with Laser Dust Fluffy Cleaner Head & Piezo Sensor",
    discountBadge: "22% off",
    rating: 4.7,
    ratingCount: 620,
    socialProof: "300+ bought in past month",
    price: 45900,
    mrp: 58900,
    cardOffer: "₹4,000 Instant HDFC Discount",
    deliveryDate: "Thu, 29 Oct",
    fastestDelivery: "Tomorrow 7 am - 11 am",
    seasonalBadge: "Gold Standard Home Hygiene",
    variants: [
      {
        colorName: "Yellow / Iron",
        colorHex: "#EAB308",
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "prod-12",
    slug: "sony-playstation-5-slim-console",
    category: "Electronics",
    title: "Sony PlayStation®5 Slim Console (Disc Edition) with DualSense Wireless Controller & 1TB Ultra-High Speed SSD",
    discountBadge: "12% off",
    rating: 4.9,
    ratingCount: 5410,
    socialProof: "3K+ bought in past month",
    price: 49990,
    mrp: 54990,
    cardOffer: "Free Game Voucher Inside",
    deliveryDate: "Wed, 28 Oct",
    fastestDelivery: "Tomorrow 6 am - 10 am",
    seasonalBadge: "Limited Festival Stock",
    variants: [
      {
        colorName: "Classic White",
        colorHex: "#F8FAFC",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
];
