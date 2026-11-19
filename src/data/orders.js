// SuBakes - Wood Fired Pizzeria Sample Orders & Payments
// Pre-filled with realistic sample orders and payments for the demo owner dashboard.
// All entries are plainly labeled "Sample data" as requested.

export const sampleOrders = [
  {
    id: "SUB-801",
    customer: {
      name: "Pratiksha Kulkarni",
      phone: "+91 98221 44012",
      address: "Flat 402, Shanti Vihar, Sadashiv Peth, Pune",
      type: "Delivery"
    },
    items: [
      { id: "zesty-chicken-pizza", name: "Zesty Chicken Pizza", quantity: 2, price: 540 },
      { id: "cheese-garlic-bread", name: "Cheese Garlic Bread with Dip", quantity: 1, price: 240 }
    ],
    subtotal: 1320,
    deliveryFee: 40,
    tax: 66,
    total: 1426,
    status: "Delivered",
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    time: "Today, 12:45 PM",
    timestamp: "2026-11-19T12:45:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-802",
    customer: {
      name: "Aditya Joshi",
      phone: "+91 99230 11299",
      address: "Near Tilak Road, Sadashiv Peth",
      type: "Dine-in / Pickup"
    },
    items: [
      { id: "margherita-wood-fired", name: "Margherita Wood-Fired Pizza", quantity: 1, price: 390 },
      { id: "fresh-lime-soda", name: "Sparkling Fresh Lime Soda", quantity: 2, price: 130 }
    ],
    subtotal: 650,
    deliveryFee: 0,
    tax: 32,
    total: 682,
    status: "Completed",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    time: "Today, 01:10 PM",
    timestamp: "2026-11-19T13:10:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-803",
    customer: {
      name: "Meera Ranade",
      phone: "+91 94220 88712",
      address: "14B, Vijayanagar Colony, Sadashiv Peth, Pune",
      type: "Delivery"
    },
    items: [
      { id: "paneer-piccante-pizza", name: "Paneer Piccante Pizza", quantity: 1, price: 480 },
      { id: "cheese-garlic-bread", name: "Cheese Garlic Bread with Dip", quantity: 1, price: 240 },
      { id: "caramel-dream-cake", name: "Caramel Dream Cake", quantity: 2, price: 240 }
    ],
    subtotal: 1200,
    deliveryFee: 40,
    tax: 60,
    total: 1300,
    status: "Preparing",
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    time: "Today, 01:30 PM",
    timestamp: "2026-11-19T13:30:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-804",
    customer: {
      name: "Siddharth Deshmukh",
      phone: "+91 97654 33210",
      address: "Near S.P. College Gate 2, Pune",
      type: "Pickup"
    },
    items: [
      { id: "quattro-formaggi-pizza", name: "Quattro Formaggi", quantity: 1, price: 520 },
      { id: "artisan-cold-brew", name: "Artisan Cold Brew Coffee", quantity: 1, price: 180 }
    ],
    subtotal: 700,
    deliveryFee: 0,
    tax: 35,
    total: 735,
    status: "Pending",
    paymentMethod: "Cash on Delivery / Pickup",
    paymentStatus: "Pending",
    time: "Today, 01:45 PM",
    timestamp: "2026-11-19T13:45:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-805",
    customer: {
      name: "Pooja Patil",
      phone: "+91 91580 99421",
      address: "Bungalow 7, Lokmanya Nagar, Pune",
      type: "Delivery"
    },
    items: [
      { id: "bbq-chicken-pizza", name: "Smoky BBQ Chicken Pizza", quantity: 2, price: 560 },
      { id: "cilantro-chicken-crostini", name: "Cilantro Chicken & Hummus Crostini", quantity: 1, price: 290 },
      { id: "classic-tiramisu", name: "Classic Italian Tiramisu", quantity: 1, price: 260 }
    ],
    subtotal: 1670,
    deliveryFee: 40,
    tax: 83,
    total: 1793,
    status: "Out for Delivery",
    paymentMethod: "UPI (Paytm)",
    paymentStatus: "Paid",
    time: "Today, 02:00 PM",
    timestamp: "2026-11-19T14:00:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-806",
    customer: {
      name: "Varun Date",
      phone: "+91 98811 76230",
      address: "Prabhat Road, Lane 4, Erandwane, Pune",
      type: "Delivery"
    },
    items: [
      { id: "pesto-mushroom-pizza", name: "Pesto Mushroom Pizza", quantity: 1, price: 490 },
      { id: "spaghetti-carbonara", name: "Spaghetti Carbonara", quantity: 1, price: 420 }
    ],
    subtotal: 910,
    deliveryFee: 50,
    tax: 45,
    total: 1005,
    status: "Delivered",
    paymentMethod: "Debit Card",
    paymentStatus: "Paid",
    time: "Yesterday, 08:30 PM",
    timestamp: "2026-11-18T20:30:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-807",
    customer: {
      name: "Kavita Gokhale",
      phone: "+91 93710 44819",
      address: "Chaitanya Apt Neighbor, Sadashiv Peth",
      type: "Pickup"
    },
    items: [
      { id: "vegetariana-pizza", name: "Vegetariana Wood-Fired Pizza", quantity: 1, price: 460 },
      { id: "cheese-garlic-bread", name: "Cheese Garlic Bread with Dip", quantity: 1, price: 240 }
    ],
    subtotal: 700,
    deliveryFee: 0,
    tax: 35,
    total: 735,
    status: "Delivered",
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    time: "Yesterday, 07:15 PM",
    timestamp: "2026-11-18T19:15:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-808",
    customer: {
      name: "Nikhil Shinde",
      phone: "+91 98224 55901",
      address: "Near Alka Talkies, Navi Peth, Pune",
      type: "Delivery"
    },
    items: [
      { id: "zesty-chicken-pizza", name: "Zesty Chicken Pizza", quantity: 1, price: 540 },
      { id: "margherita-wood-fired", name: "Margherita Wood-Fired Pizza", quantity: 1, price: 390 },
      { id: "caramel-dream-cake", name: "Caramel Dream Cake", quantity: 1, price: 240 }
    ],
    subtotal: 1170,
    deliveryFee: 40,
    tax: 58,
    total: 1268,
    status: "Delivered",
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    time: "Yesterday, 06:40 PM",
    timestamp: "2026-11-18T18:40:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-809",
    customer: {
      name: "Shruti Pendse",
      phone: "+91 99214 77302",
      address: "Ganesh Krupa, Perugate, Sadashiv Peth",
      type: "Delivery"
    },
    items: [
      { id: "mediterranean-pizza", name: "Mediterranean Artisan Pizza", quantity: 2, price: 480 },
      { id: "fresh-lime-soda", name: "Sparkling Fresh Lime Soda", quantity: 2, price: 130 }
    ],
    subtotal: 1220,
    deliveryFee: 40,
    tax: 61,
    total: 1321,
    status: "Delivered",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    time: "Yesterday, 01:20 PM",
    timestamp: "2026-11-18T13:20:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-810",
    customer: {
      name: "Chinmay Bapat",
      phone: "+91 98600 12894",
      address: "Near S.P. College Hostel, Pune",
      type: "Pickup"
    },
    items: [
      { id: "cheese-garlic-bread", name: "Cheese Garlic Bread with Dip", quantity: 2, price: 240 },
      { id: "artisan-cold-brew", name: "Artisan Cold Brew Coffee", quantity: 2, price: 180 }
    ],
    subtotal: 840,
    deliveryFee: 0,
    tax: 42,
    total: 882,
    status: "Delivered",
    paymentMethod: "UPI (Paytm)",
    paymentStatus: "Paid",
    time: "Yesterday, 12:15 PM",
    timestamp: "2026-11-18T12:15:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-811",
    customer: {
      name: "Gaurav Kulkarni",
      phone: "+91 97631 88419",
      address: "Deccan Gymkhana, FC Road, Pune",
      type: "Delivery"
    },
    items: [
      { id: "zesty-chicken-pizza", name: "Zesty Chicken Pizza", quantity: 1, price: 540 },
      { id: "bbq-chicken-pizza", name: "Smoky BBQ Chicken Pizza", quantity: 1, price: 560 },
      { id: "cilantro-chicken-crostini", name: "Cilantro Chicken & Hummus Crostini", quantity: 2, price: 290 }
    ],
    subtotal: 1680,
    deliveryFee: 50,
    tax: 84,
    total: 1814,
    status: "Delivered",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    time: "Nov 17, 08:50 PM",
    timestamp: "2026-11-17T20:50:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-812",
    customer: {
      name: "Sayali Mahajan",
      phone: "+91 94223 11782",
      address: "Near Nagnath Par, Sadashiv Peth",
      type: "Pickup"
    },
    items: [
      { id: "paneer-piccante-pizza", name: "Paneer Piccante Pizza", quantity: 1, price: 480 },
      { id: "classic-tiramisu", name: "Classic Italian Tiramisu", quantity: 1, price: 260 }
    ],
    subtotal: 740,
    deliveryFee: 0,
    tax: 37,
    total: 777,
    status: "Delivered",
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    time: "Nov 17, 07:20 PM",
    timestamp: "2026-11-17T19:20:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-813",
    customer: {
      name: "Rohan Agashe",
      phone: "+91 98230 66504",
      address: "Senapati Bapat Road, Pune",
      type: "Delivery"
    },
    items: [
      { id: "quattro-formaggi-pizza", name: "Quattro Formaggi", quantity: 1, price: 520 },
      { id: "pesto-mushroom-pizza", name: "Pesto Mushroom Pizza", quantity: 1, price: 490 }
    ],
    subtotal: 1010,
    deliveryFee: 60,
    tax: 50,
    total: 1120,
    status: "Delivered",
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    time: "Nov 17, 02:30 PM",
    timestamp: "2026-11-17T14:30:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-814",
    customer: {
      name: "Tejaswini Kelkar",
      phone: "+91 98813 90212",
      address: "Kumthekar Road, Sadashiv Peth",
      type: "Delivery"
    },
    items: [
      { id: "margherita-wood-fired", name: "Margherita Wood-Fired Pizza", quantity: 2, price: 390 },
      { id: "cheese-garlic-bread", name: "Cheese Garlic Bread with Dip", quantity: 1, price: 240 }
    ],
    subtotal: 1020,
    deliveryFee: 30,
    tax: 51,
    total: 1101,
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid",
    time: "Nov 16, 09:10 PM",
    timestamp: "2026-11-16T21:10:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-815",
    customer: {
      name: "Aakash Chitnis",
      phone: "+91 99229 44109",
      address: "Near S.P. College Ground, Pune",
      type: "Pickup"
    },
    items: [
      { id: "spaghetti-carbonara", name: "Spaghetti Carbonara", quantity: 1, price: 420 },
      { id: "caramel-dream-cake", name: "Caramel Dream Cake", quantity: 1, price: 240 }
    ],
    subtotal: 660,
    deliveryFee: 0,
    tax: 33,
    total: 693,
    status: "Delivered",
    paymentMethod: "Debit Card",
    paymentStatus: "Paid",
    time: "Nov 16, 08:00 PM",
    timestamp: "2026-11-16T20:00:00Z",
    isSample: true,
    dataLabel: "Sample data"
  },
  {
    id: "SUB-816",
    customer: {
      name: "Dhanashree Sane",
      phone: "+91 97640 22391",
      address: "Apte Road, Shivajinagar, Pune",
      type: "Delivery"
    },
    items: [
      { id: "vegetariana-pizza", name: "Vegetariana Wood-Fired Pizza", quantity: 1, price: 460 },
      { id: "fresh-lime-soda", name: "Sparkling Fresh Lime Soda", quantity: 1, price: 130 }
    ],
    subtotal: 590,
    deliveryFee: 50,
    tax: 29,
    total: 669,
    status: "Delivered",
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    time: "Nov 16, 01:15 PM",
    timestamp: "2026-11-16T13:15:00Z",
    isSample: true,
    dataLabel: "Sample data"
  }
];

export const samplePayments = sampleOrders.map((ord, idx) => ({
  paymentId: `PAY-2026-${9100 + idx}`,
  orderId: ord.id,
  customerName: ord.customer.name,
  method: ord.paymentMethod,
  amount: ord.total,
  status: ord.paymentStatus,
  date: ord.time,
  isSample: true,
  dataLabel: "Sample data"
}));
