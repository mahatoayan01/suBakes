// SuBakes - Gallery Data
// Locally saved high-resolution images categorized by ambiance, oven craft, and food

export const galleryCategories = [
  { id: "all", name: "All Views" },
  { id: "pizzas", name: "Wood-Fired Pizzas" },
  { id: "oven", name: "Oven & Craft" },
  { id: "ambiance", name: "Cafe Ambiance" }
];

export const galleryItems = [
  {
    id: "gal-1",
    title: "Artisan Stone Oven at 450°C",
    category: "oven",
    image: "/images/interior/wood-fired-stone-oven.svg",
    imageSource: "web-sample",
    isSample: true,
    alt: "Artisan stone wood-fired pizza oven at SuBakes Sadashiv Peth",
    description: "Hardwood fire giving Neapolitan pizza its signature airy, charred crust."
  },
  {
    id: "gal-2",
    title: "Zesty Chicken Specialty Pizza",
    category: "pizzas",
    image: "/images/food/zesty-chicken-pizza.svg",
    imageSource: "web-sample",
    isSample: true,
    alt: "Zesty chicken wood-fired pizza with red paprika and fresh herbs",
    description: "Top-rated specialty pizza loved by Sadashiv Peth diners."
  },
  {
    id: "gal-3",
    title: "Cozy Dining Space",
    category: "ambiance",
    image: "/images/interior/cozy-dining-seating.svg",
    imageSource: "web-sample",
    isSample: true,
    alt: "Cozy interior dining seating with warm lighting at SuBakes",
    description: "Comfortable, relaxed seating ideal for friends, couples, and college groups."
  },
  {
    id: "gal-4",
    title: "Naturally Fermented Dough",
    category: "oven",
    image: "/images/gallery/chef-stretching-dough.svg",
    imageSource: "web-sample",
    isSample: true,
    alt: "Artisan pizza dough being hand-stretched on wooden board",
    description: "24-hour slow fermented dough for light, easily digestible crusts."
  },
  {
    id: "gal-5",
    title: "Golden Cheese Garlic Bread",
    category: "pizzas",
    image: "/images/food/cheese-garlic-bread.svg",
    imageSource: "web-sample",
    isSample: true,
    alt: "Cheese Garlic Bread with melted mozzarella and house cheese dip",
    description: "Baked baguette with roasted garlic butter and bubbling cheese."
  },
  {
    id: "gal-6",
    title: "SuBakes Cafe Entrance",
    category: "ambiance",
    image: "/images/exterior/pizzeria-storefront.svg",
    imageSource: "web-sample",
    isSample: true,
    alt: "SuBakes storefront at Chaitanya Apartment, Sadashiv Peth, Pune",
    description: "Welcoming neighborhood pizzeria located near SP College."
  }
];
