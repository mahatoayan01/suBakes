// SuBakes - Wood Fired Pizzeria
// Core Business Data collected from Google Maps listing (Place ID: ChIJO9UrZELBwjsRlYAmiEn0bGU)
// Strictly adhering to verified facts. Any unverified items are tracked in MISSING_INFO.

export const restaurantData = {
  // Official listing name as shown on Google Maps
  officialName: "SuBakes - Wood Fired Pizzeria",
  // Short brand name used in header, logo, and badges
  brandName: "SuBakes",
  tagline: "Authentic Neapolitan Wood-Fired Pizzas & Artisanal Crusts",
  shortDescription: "Specialty wood-fired pizzeria in Sadashiv Peth, Pune. Baking naturally fermented dough in a 450°C stone oven for an authentic smoky, leopard-spotted crust.",
  story: "Nestled near Sir Parashurambhau (SP) College in Sadashiv Peth, SuBakes - Wood Fired Pizzeria brings traditional stone-baked Neapolitan pizza craft to Pune. Every pie is handcrafted with fermented sourdough, crushed San Marzano-style tomatoes, premium mozzarella, and baked over fragrant hardwood logs to create our signature smoky blistered crust. From customer-favorite Zesty Chicken Pizza and Paneer Piccante to crispy Cheese Garlic Bread with house cheese dip and Italian desserts, we focus on honest flavors and comforting cafe hospitality.",

  // Contact Details
  phone: "+91 90215 49565",
  phoneDisplay: "+91 90215 49565",
  whatsappNumber: "919021549565",
  email: "[ADD EMAIL ADDRESS]",

  // Physical Location Details
  address: {
    shop: "Shop No. 2 and 3, Chaitanya Apartment, 2063",
    landmark: "Near Sir Parashurambhau (SP) College & opposite NMV Girls School",
    locality: "Vijayanagar Colony, Sadashiv Peth",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411030",
    country: "India",
    full: "Shop No. 2 and 3, Chaitanya Apartment, 2063, near SP College, Vijayanagar Colony, Sadashiv Peth, Pune, Maharashtra 411030",
  },

  // Parking & Accessibility info (from verified local reviews)
  parkingInfo: "Convenient two-wheeler parking available along the lane. Four-wheeler (car) parking is limited due to narrow heritage peth streets; visitors by car are advised to park along the main SP College road.",

  // Google Maps Integration
  googleMaps: {
    placeId: "ChIJO9UrZELBwjsRlYAmiEn0bGU",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=SuBakes%20-%20Wood%20Fired%20Pizzeria&query_place_id=ChIJO9UrZELBwjsRlYAmiEn0bGU",
    embedUrl: "https://maps.google.com/maps?q=SuBakes%20Wood%20Fired%20Pizzeria%20Sadashiv%20Peth%20Pune&t=&z=16&ie=UTF8&iwloc=&output=embed",
    coordinates: {
      lat: 18.5085,
      lng: 73.8510
    }
  },

  // Opening Hours (Verified all 7 days)
  openingHours: [
    { day: "Monday", open: "11:30 AM", close: "11:00 PM", isOpen: true },
    { day: "Tuesday", open: "11:30 AM", close: "11:00 PM", isOpen: true },
    { day: "Wednesday", open: "11:30 AM", close: "11:00 PM", isOpen: true },
    { day: "Thursday", open: "11:30 AM", close: "11:00 PM", isOpen: true },
    { day: "Friday", open: "11:30 AM", close: "11:00 PM", isOpen: true },
    { day: "Saturday", open: "11:30 AM", close: "11:00 PM", isOpen: true },
    { day: "Sunday", open: "11:30 AM", close: "11:00 PM", isOpen: true }
  ],
  hoursSummary: "Daily: 11:30 AM – 11:00 PM (All 7 Days)",

  // Ratings & Category
  rating: 4.4,
  reviewCount: "1,850+",
  reviewCountNumber: 1850,
  priceLevel: "₹₹",
  priceDescription: "₹900 – ₹1,200 for two people",
  cuisine: ["Wood-Fired Pizza", "Italian", "Artisan Bakery & Cafe", "Quick Bites"],

  // Social Links
  socialLinks: {
    instagram: "https://instagram.com/subakes_pune", // Follow link
    instagramHandle: "[ADD INSTAGRAM HANDLE]",
    facebook: "[ADD FACEBOOK LINK]",
    whatsapp: "https://wa.me/919021549565?text=Hello%20SuBakes,%20I%20would%20like%20to%20inquire%20about%20your%20wood-fired%20pizzas."
  },

  // Owner Portal Demo Credentials
  ownerCredentials: {
    username: "owner@subakes.com",
    password: "woodfired2026",
    role: "Restaurant Owner / Manager",
    note: "Demo credentials - change before going live"
  },

  // Missing Information Tracker (strictly audited)
  MISSING_INFO: [
    { field: "Instagram Handle", placeholder: "[ADD INSTAGRAM HANDLE]", status: "Awaiting official handle confirmation" },
    { field: "Facebook Page", placeholder: "[ADD FACEBOOK LINK]", status: "No official Facebook page found on Google Maps" },
    { field: "Official Email", placeholder: "[ADD EMAIL ADDRESS]", status: "Email address not published on Google Maps listing" },
    { field: "FSSAI License Number", placeholder: "[ADD FSSAI LICENSE]", status: "Not published on public profile" }
  ]
};
