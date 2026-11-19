import fs from 'fs';
import path from 'path';

const baseDir = './public/images';

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

['hero', 'food', 'interior', 'exterior', 'gallery', 'instagram'].forEach(d => {
  ensureDir(path.join(baseDir, d));
});

// Helper to create stylish, appetizing SVG illustrations with warm lighting, shadows and details
const createFoodSVG = ({ title, subtitle, colorScheme, elements, badge }) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" class="w-full h-full object-cover">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="${colorScheme.bgLight}" />
      <stop offset="60%" stop-color="${colorScheme.bgMid}" />
      <stop offset="100%" stop-color="${colorScheme.bgDark}" />
    </radialGradient>
    <linearGradient id="crustGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="40%" stop-color="#9A3412" />
      <stop offset="80%" stop-color="#7C2D12" />
      <stop offset="100%" stop-color="#431407" />
    </linearGradient>
    <radialGradient id="cheeseGrad" cx="45%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="35%" stop-color="#FDE047" />
      <stop offset="70%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </radialGradient>
    <radialGradient id="sauceGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#DC2626" />
      <stop offset="70%" stop-color="#B91C1C" />
      <stop offset="100%" stop-color="#7F1D1D" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000" flood-opacity="0.45" />
    </filter>
    <filter id="charDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Warm Slate / Wood Table Texture -->
  <rect width="800" height="600" fill="url(#bgGlow)" />

  <!-- Subtle rustic wooden table grain lines -->
  <g opacity="0.12" stroke="#fff" stroke-width="1.5">
    <line x1="0" y1="120" x2="800" y2="120" stroke-dasharray="120 40 80 60"/>
    <line x1="0" y1="280" x2="800" y2="280" stroke-dasharray="90 30 150 40"/>
    <line x1="0" y1="440" x2="800" y2="440" stroke-dasharray="200 50 100 80"/>
  </g>

  <!-- Serving Board / Plate -->
  <g filter="url(#shadow)">
    <circle cx="400" cy="290" r="230" fill="#292524" stroke="#44403c" stroke-width="6" />
    <circle cx="400" cy="290" r="222" fill="#1c1917" opacity="0.6"/>
  </g>

  <!-- Specific Food Art Elements -->
  ${elements}

  <!-- Lighting & Steam Highlights -->
  <ellipse cx="380" cy="220" rx="140" ry="80" fill="#fff" opacity="0.08" />

  <!-- Bottom Gradient Overlay for typography contrast -->
  <rect y="460" width="800" height="140" fill="url(#bgGlow)" opacity="0.92" />
  <line x1="0" y1="460" x2="800" y2="460" stroke="#f97316" stroke-width="2" opacity="0.4"/>

  <!-- Dish Title & Details -->
  <text x="40" y="520" font-family="'Playfair Display', Georgia, serif" font-size="34" font-weight="bold" fill="#FDFBF7" letter-spacing="0.5">${title}</text>
  <text x="40" y="560" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="500" fill="#D2B68D">${subtitle}</text>

  <!-- Badge in top right corner -->
  <g transform="translate(620, 36)">
    <rect width="144" height="34" rx="17" fill="#c2410c" opacity="0.9" />
    <text x="72" y="22" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="0.8">${badge || "WOOD-FIRED"}</text>
  </g>
</svg>`;
};

// Generic Pizza Generator with custom toppings
const createPizzaSVG = ({ title, subtitle, toppings, badge }) => {
  const elements = `
    <!-- Pizza Crust -->
    <g filter="url(#shadow)">
      <circle cx="400" cy="290" r="195" fill="url(#crustGrad)" />
      <!-- Charred Leopard Spots on rim -->
      <ellipse cx="230" cy="230" rx="14" ry="7" fill="#1c1917" transform="rotate(-30 230 230)" opacity="0.85"/>
      <ellipse cx="320" cy="115" rx="18" ry="8" fill="#1c1917" opacity="0.9"/>
      <ellipse cx="480" cy="112" rx="16" ry="9" fill="#1c1917" transform="rotate(15 480 112)" opacity="0.85"/>
      <ellipse cx="570" cy="220" rx="13" ry="8" fill="#1c1917" transform="rotate(40 570 220)" opacity="0.9"/>
      <ellipse cx="560" cy="380" rx="17" ry="7" fill="#1c1917" transform="rotate(-35 560 380)" opacity="0.85"/>
      <ellipse cx="430" cy="470" rx="19" ry="8" fill="#1c1917" opacity="0.9"/>
      <ellipse cx="260" cy="410" rx="15" ry="9" fill="#1c1917" transform="rotate(25 260 410)" opacity="0.85"/>
      
      <!-- Rich San Marzano Tomato Base -->
      <circle cx="400" cy="290" r="162" fill="url(#sauceGrad)" />
      
      <!-- Melted Golden Mozzarella Layer -->
      <circle cx="400" cy="290" r="150" fill="url(#cheeseGrad)" opacity="0.95" />
      
      <!-- Bubbling Cheese & Char Patches -->
      <circle cx="360" cy="260" r="28" fill="#FEF08A" opacity="0.6"/>
      <circle cx="450" cy="310" r="32" fill="#FEF08A" opacity="0.5"/>
      <ellipse cx="380" cy="340" rx="16" ry="8" fill="#9A3412" opacity="0.7"/>
      <ellipse cx="430" cy="220" rx="14" ry="7" fill="#9A3412" opacity="0.65"/>
    </g>

    <!-- Specific Toppings -->
    ${toppings}
  `;

  return createFoodSVG({
    title,
    subtitle,
    colorScheme: { bgLight: '#2c1810', bgMid: '#1a0e0a', bgDark: '#0d0705' },
    elements,
    badge
  });
};

// 1. Zesty Chicken Pizza
const zestyChickenSVG = createPizzaSVG({
  title: "Zesty Chicken Pizza",
  subtitle: "Smoky spiced chicken chunks, paprika, fresh herbs & fior di latte",
  badge: "SIGNATURE NON-VEG",
  toppings: `
    <!-- Spiced Chicken Chunks -->
    <g fill="#B45309" stroke="#78350F" stroke-width="2">
      <path d="M340 220 Q355 210 365 225 Q360 245 340 240 Z" />
      <path d="M430 240 Q450 230 460 250 Q445 265 425 255 Z" />
      <path d="M360 320 Q380 310 390 330 Q375 350 355 340 Z" />
      <path d="M440 330 Q460 320 470 340 Q455 360 435 350 Z" />
      <path d="M300 280 Q320 270 330 290 Q315 310 295 300 Z" />
      <path d="M470 280 Q490 270 500 290 Q485 310 465 300 Z" />
    </g>
    <!-- Paprika & Red Peppers -->
    <g fill="#DC2626" opacity="0.9">
      <ellipse cx="320" cy="250" rx="8" ry="4" transform="rotate(30 320 250)"/>
      <ellipse cx="410" cy="200" rx="9" ry="4" transform="rotate(-20 410 200)"/>
      <ellipse cx="480" cy="250" rx="8" ry="4" transform="rotate(45 480 250)"/>
      <ellipse cx="340" cy="360" rx="9" ry="4" transform="rotate(60 340 360)"/>
      <ellipse cx="430" cy="380" rx="8" ry="4" transform="rotate(-30 430 380)"/>
      <ellipse cx="390" cy="280" rx="7" ry="4"/>
    </g>
    <!-- Fresh Basil Leaves -->
    <g fill="#15803D" stroke="#166534" stroke-width="1.5">
      <path d="M380 230 Q400 215 410 235 Q395 245 380 230 Z"/>
      <path d="M420 300 Q440 285 450 305 Q435 315 420 300 Z"/>
      <path d="M330 300 Q350 285 360 305 Q345 315 330 300 Z"/>
    </g>
  `
});

// 2. Margherita Wood-Fired Pizza
const margheritaSVG = createPizzaSVG({
  title: "Margherita Wood-Fired",
  subtitle: "San Marzano tomatoes, fresh mozzarella balls & fragrant basil",
  badge: "CLASSIC VEG",
  toppings: `
    <!-- Fresh Mozzarella Discs -->
    <g fill="#FFFBEB" stroke="#FEF3C7" stroke-width="2" filter="url(#charDrop)">
      <circle cx="340" cy="240" r="26"/>
      <circle cx="450" cy="240" r="28"/>
      <circle cx="400" cy="320" r="30"/>
      <circle cx="330" cy="330" r="24"/>
      <circle cx="470" cy="320" r="24"/>
    </g>
    <!-- Basil Leaves with stem -->
    <g fill="#16A34A" stroke="#15803D" stroke-width="1.5">
      <path d="M380 260 Q405 240 420 265 Q395 280 380 260 Z" />
      <path d="M340 290 Q360 270 375 295 Q355 310 340 290 Z" />
      <path d="M430 270 Q455 250 470 275 Q445 290 430 270 Z" />
      <path d="M380 360 Q400 340 415 365 Q395 380 380 360 Z" />
    </g>
    <!-- Extra Virgin Olive Oil Drizzle -->
    <path d="M330 250 Q400 220 460 290 Q400 360 340 320" fill="none" stroke="#EAB308" stroke-width="3" opacity="0.6"/>
  `
});

// 3. Paneer Piccante Pizza
const paneerPiccanteSVG = createPizzaSVG({
  title: "Paneer Piccante",
  subtitle: "Spiced marinated paneer, crunchy bell peppers & pickled jalapeños",
  badge: "SPICY VEG",
  toppings: `
    <!-- Marinated Paneer Cubes -->
    <g fill="#FEF9C3" stroke="#CA8A04" stroke-width="2">
      <rect x="330" y="220" width="28" height="26" rx="4" transform="rotate(15 344 233)"/>
      <rect x="425" y="215" width="28" height="26" rx="4" transform="rotate(-20 439 228)"/>
      <rect x="360" y="310" width="28" height="26" rx="4" transform="rotate(35 374 323)"/>
      <rect x="440" y="310" width="28" height="26" rx="4" transform="rotate(-15 454 323)"/>
      <rect x="300" y="290" width="26" height="24" rx="4"/>
      <rect x="475" y="260" width="26" height="24" rx="4" transform="rotate(45 488 272)"/>
    </g>
    <!-- Jalapeno slices (rings) -->
    <g fill="none" stroke="#15803D" stroke-width="4">
      <circle cx="390" cy="250" r="10"/>
      <circle cx="430" cy="270" r="10"/>
      <circle cx="340" cy="270" r="9"/>
      <circle cx="410" cy="360" r="9"/>
      <circle cx="340" cy="350" r="9"/>
    </g>
    <!-- Red bell peppers -->
    <g fill="#DC2626">
      <ellipse cx="370" cy="210" rx="14" ry="4" transform="rotate(-40 370 210)"/>
      <ellipse cx="460" cy="360" rx="14" ry="4" transform="rotate(20 460 360)"/>
      <ellipse cx="310" cy="330" rx="14" ry="4" transform="rotate(70 310 330)"/>
    </g>
  `
});

// 4. Pesto Mushroom Pizza
const pestoMushroomSVG = createPizzaSVG({
  title: "Pesto Mushroom Pizza",
  subtitle: "Creamy basil pesto base, sautéed wild mushrooms & roasted garlic",
  badge: "CHEF SPECIAL VEG",
  toppings: `
    <!-- Sautéed Wild Mushroom Slices -->
    <g fill="#78350F" stroke="#451A03" stroke-width="1.5">
      <path d="M330 230 C330 215 365 215 365 230 L355 242 L340 242 Z"/>
      <path d="M430 220 C430 205 465 205 465 220 L455 232 L440 232 Z"/>
      <path d="M370 310 C370 295 405 295 405 310 L395 322 L380 322 Z"/>
      <path d="M440 320 C440 305 475 305 475 320 L465 332 L450 332 Z"/>
      <path d="M310 290 C310 275 345 275 345 290 L335 302 L320 302 Z"/>
    </g>
    <!-- Basil Pesto Swirls -->
    <path d="M320 260 Q400 240 440 280 T380 360" fill="none" stroke="#15803D" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
    <!-- Roasted Garlic Cloves -->
    <g fill="#FEF08A" opacity="0.9">
      <ellipse cx="390" cy="270" rx="6" ry="10" transform="rotate(30 390 270)"/>
      <ellipse cx="420" cy="290" rx="6" ry="9" transform="rotate(-40 420 290)"/>
      <ellipse cx="350" cy="330" rx="6" ry="10"/>
    </g>
  `
});

// 5. Vegetariana Pizza
const vegetarianaSVG = createPizzaSVG({
  title: "Vegetariana Wood-Fired",
  subtitle: "Zucchini ribbons, cherry tomatoes, kalamata olives & sweet corn",
  badge: "MEDITERRANEAN VEG",
  toppings: `
    <!-- Black Olives -->
    <g fill="#09090B" stroke="#27272A" stroke-width="2">
      <circle cx="340" cy="240" r="10"/>
      <circle cx="440" cy="240" r="10"/>
      <circle cx="390" cy="330" r="10"/>
      <circle cx="470" cy="310" r="9"/>
      <circle cx="320" cy="320" r="9"/>
    </g>
    <!-- Cherry Tomato Halves -->
    <g fill="#EF4444" stroke="#B91C1C" stroke-width="2">
      <circle cx="400" cy="230" r="12"/>
      <circle cx="360" cy="280" r="12"/>
      <circle cx="440" cy="290" r="12"/>
      <circle cx="350" cy="360" r="11"/>
    </g>
    <!-- Zucchini Ribbon Strips -->
    <path d="M320 280 Q360 250 420 270" fill="none" stroke="#16A34A" stroke-width="5" stroke-linecap="round"/>
    <path d="M380 300 Q430 330 460 360" fill="none" stroke="#16A34A" stroke-width="5" stroke-linecap="round"/>
  `
});

// 6. Quattro Formaggi Pizza
const quattroFormaggiSVG = createPizzaSVG({
  title: "Quattro Formaggi",
  subtitle: "Mozzarella, Gorgonzola, aged Parmesan & creamy Ricotta",
  badge: "FOUR CHEESE SPECIAL",
  toppings: `
    <!-- Gorgonzola blue veins -->
    <g fill="#0284C7" opacity="0.45">
      <circle cx="370" cy="250" r="6"/>
      <circle cx="430" cy="260" r="7"/>
      <circle cx="400" cy="310" r="8"/>
      <circle cx="340" cy="310" r="5"/>
      <circle cx="450" cy="320" r="6"/>
    </g>
    <!-- Dollops of Ricotta -->
    <g fill="#FFFFFF" filter="url(#shadow)">
      <circle cx="350" cy="260" r="18" fill="#FFFBEB"/>
      <circle cx="450" cy="250" r="20" fill="#FFFBEB"/>
      <circle cx="390" cy="330" r="22" fill="#FFFBEB"/>
      <circle cx="440" cy="330" r="17" fill="#FFFBEB"/>
    </g>
    <!-- Fresh cracked black pepper specs -->
    <g fill="#18181B">
      <circle cx="380" cy="230" r="2"/><circle cx="420" cy="240" r="2"/>
      <circle cx="360" cy="320" r="2"/><circle cx="460" cy="300" r="2"/>
      <circle cx="400" cy="280" r="2.5"/><circle cx="340" cy="280" r="2"/>
    </g>
  `
});

// 7. BBQ Chicken Pizza
const bbqChickenSVG = createPizzaSVG({
  title: "Smoky BBQ Chicken Pizza",
  subtitle: "Tender BBQ glazed chicken, red onions, smoked scamorza & parsley",
  badge: "POPULAR NON-VEG",
  toppings: `
    <!-- BBQ Glaze Swirls -->
    <path d="M300 250 Q400 180 480 270 T350 360" fill="none" stroke="#451A03" stroke-width="6" stroke-linecap="round" opacity="0.75"/>
    <!-- BBQ Shredded Chicken Pieces -->
    <g fill="#78350F" stroke="#451A03" stroke-width="1.5">
      <rect x="330" y="230" width="24" height="14" rx="3" transform="rotate(25 342 237)"/>
      <rect x="420" y="220" width="26" height="15" rx="3" transform="rotate(-30 433 227)"/>
      <rect x="360" y="300" width="25" height="16" rx="3" transform="rotate(40 372 308)"/>
      <rect x="440" y="310" width="24" height="14" rx="3" transform="rotate(-15 452 317)"/>
      <rect x="390" y="250" width="22" height="15" rx="3"/>
    </g>
    <!-- Crisp Red Onion Rings -->
    <g fill="none" stroke="#BE185D" stroke-width="3">
      <ellipse cx="370" cy="280" rx="18" ry="12" transform="rotate(20 370 280)"/>
      <ellipse cx="430" cy="270" rx="16" ry="10" transform="rotate(-35 430 270)"/>
      <ellipse cx="340" cy="330" rx="15" ry="9" transform="rotate(45 340 330)"/>
    </g>
  `
});

// 8. Mediterranean Pizza
const mediterraneanSVG = createPizzaSVG({
  title: "Mediterranean Artisan Pizza",
  subtitle: "Sun-dried tomatoes, roasted garlic, black kalamata olives & feta cheese",
  badge: "MEDITERRANEAN VEG",
  toppings: `
    <!-- Sun dried tomatoes -->
    <g fill="#991B1B">
      <path d="M330 240 Q350 230 360 250 Q345 260 330 240 Z"/>
      <path d="M430 230 Q450 220 460 240 Q445 250 430 230 Z"/>
      <path d="M370 320 Q390 310 400 330 Q385 340 370 320 Z"/>
      <path d="M440 330 Q460 320 470 340 Q455 350 440 330 Z"/>
    </g>
    <!-- Olives -->
    <g fill="#18181B" stroke="#27272A" stroke-width="2">
      <circle cx="390" cy="250" r="9"/>
      <circle cx="330" cy="300" r="9"/>
      <circle cx="460" cy="280" r="9"/>
      <circle cx="350" cy="350" r="9"/>
    </g>
    <!-- Crumbled Feta Chunks -->
    <g fill="#FEFCE8">
      <rect x="360" y="270" width="12" height="10" rx="2"/>
      <rect x="420" y="290" width="14" height="11" rx="2"/>
      <rect x="380" y="340" width="13" height="10" rx="2"/>
      <rect x="430" y="250" width="12" height="10" rx="2"/>
    </g>
  `
});

// 9. Cheese Garlic Bread
const cheeseGarlicBreadSVG = createFoodSVG({
  title: "Cheese Garlic Bread",
  subtitle: "Fresh wood-fired baguette with roasted garlic butter & molten cheese",
  badge: "TOP STARTER",
  colorScheme: { bgLight: '#2c1810', bgMid: '#1a0e0a', bgDark: '#0d0705' },
  elements: `
    <!-- Artisan Bread Slices -->
    <g filter="url(#shadow)">
      <ellipse cx="400" cy="280" rx="180" ry="110" fill="#78350F" stroke="#451A03" stroke-width="4"/>
      <ellipse cx="400" cy="275" rx="165" ry="98" fill="#FDE047"/>
      <!-- Slices separations -->
      <line x1="280" y1="210" x2="310" y2="350" stroke="#78350F" stroke-width="6"/>
      <line x1="360" y1="180" x2="380" y2="370" stroke="#78350F" stroke-width="6"/>
      <line x1="440" y1="180" x2="450" y2="370" stroke="#78350F" stroke-width="6"/>
      <line x1="510" y1="210" x2="520" y2="350" stroke="#78350F" stroke-width="6"/>
      <!-- Melted cheese blisters & parsley flakes -->
      <circle cx="330" cy="270" r="6" fill="#B45309"/>
      <circle cx="410" cy="260" r="7" fill="#B45309"/>
      <circle cx="480" cy="280" r="6" fill="#B45309"/>
      <g fill="#15803D">
        <circle cx="320" cy="250" r="3"/><circle cx="350" cy="280" r="3"/><circle cx="430" cy="250" r="3"/>
        <circle cx="460" cy="270" r="3"/><circle cx="390" cy="290" r="3"/><circle cx="490" cy="260" r="3"/>
      </g>
    </g>
    <!-- House Cheese Dip Bowl -->
    <g transform="translate(520, 160)" filter="url(#shadow)">
      <circle cx="40" cy="40" r="40" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3"/>
      <circle cx="40" cy="40" r="34" fill="#FEF08A"/>
      <circle cx="36" cy="36" r="8" fill="#F59E0B" opacity="0.6"/>
    </g>
  `
});

// 10. Cilantro Chicken & Hummus Crostini
const crostiniSVG = createFoodSVG({
  title: "Cilantro Chicken Crostini",
  subtitle: "Toasted sourdough crostini, silky hummus & herb-marinated chicken",
  badge: "SIGNATURE APPETIZER",
  colorScheme: { bgLight: '#2c1810', bgMid: '#1a0e0a', bgDark: '#0d0705' },
  elements: `
    <!-- Crostini toasts arranged -->
    <g filter="url(#shadow)">
      <!-- Toast 1 -->
      <path d="M250 250 Q280 210 330 230 Q370 260 340 310 Q290 330 250 280 Z" fill="#9A3412" stroke="#451A03" stroke-width="3"/>
      <path d="M260 255 Q285 220 325 235 Q360 265 335 305 Q295 320 260 285 Z" fill="#FDE047" opacity="0.8"/>
      <!-- Hummus swirl -->
      <ellipse cx="300" cy="270" rx="35" ry="25" fill="#E2D4A8"/>
      <!-- Chicken chunks -->
      <rect x="290" y="260" width="18" height="14" rx="3" fill="#B45309"/>
      <rect x="305" y="270" width="16" height="12" rx="3" fill="#92400E"/>
      
      <!-- Toast 2 (Center) -->
      <path d="M370 240 Q410 190 470 210 Q510 250 480 310 Q420 340 370 280 Z" fill="#9A3412" stroke="#451A03" stroke-width="3"/>
      <path d="M380 245 Q415 200 465 215 Q500 255 475 305 Q425 330 380 285 Z" fill="#FDE047" opacity="0.8"/>
      <!-- Hummus swirl -->
      <ellipse cx="440" cy="260" rx="45" ry="30" fill="#E2D4A8"/>
      <!-- Chicken & Cilantro garnish -->
      <rect x="420" y="250" width="24" height="16" rx="4" fill="#B45309"/>
      <rect x="445" y="260" width="22" height="15" rx="4" fill="#92400E"/>
      <g fill="#15803D">
        <circle cx="430" cy="245" r="3"/><circle cx="450" cy="248" r="3"/><circle cx="460" cy="270" r="3"/>
      </g>
    </g>
  `
});

// 11. Spaghetti Carbonara
const carbonaraSVG = createFoodSVG({
  title: "Spaghetti Carbonara",
  subtitle: "Silky egg and aged pecorino sauce with crispy pancetta & cracked pepper",
  badge: "HANDMADE PASTA",
  colorScheme: { bgLight: '#2c1810', bgMid: '#1a0e0a', bgDark: '#0d0705' },
  elements: `
    <!-- Pasta Bowl -->
    <g filter="url(#shadow)">
      <circle cx="400" cy="280" r="170" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="4"/>
      <circle cx="400" cy="280" r="130" fill="#FEF08A"/>
      <!-- Swirled Spaghetti Strands -->
      <path d="M330 260 Q380 210 430 250 T460 310 T390 330 T340 280" fill="none" stroke="#FBBF24" stroke-width="8" stroke-linecap="round"/>
      <path d="M350 280 Q400 230 450 270 T420 320 T360 310" fill="none" stroke="#F59E0B" stroke-width="7" stroke-linecap="round"/>
      <path d="M370 250 Q410 280 440 250 T410 320" fill="none" stroke="#FDE047" stroke-width="6" stroke-linecap="round"/>
      <!-- Crispy Bacon/Pancetta bits -->
      <g fill="#991B1B">
        <rect x="360" y="260" width="12" height="8" rx="2"/>
        <rect x="410" y="240" width="14" height="9" rx="2"/>
        <rect x="430" y="280" width="12" height="8" rx="2"/>
        <rect x="380" y="300" width="15" height="9" rx="2"/>
      </g>
      <!-- Cracked black pepper -->
      <g fill="#0F172A">
        <circle cx="370" cy="245" r="2"/><circle cx="420" cy="265" r="2.5"/><circle cx="395" cy="285" r="2"/>
        <circle cx="440" cy="250" r="2"/><circle cx="360" cy="295" r="2.5"/>
      </g>
    </g>
  `
});

// 12. Tiramisu
const tiramisuSVG = createFoodSVG({
  title: "Classic Italian Tiramisu",
  subtitle: "Espresso soaked savoiardi, silky mascarpone cream & dark cocoa dusting",
  badge: "ARTISANAL DESSERT",
  colorScheme: { bgLight: '#2c1810', bgMid: '#1a0e0a', bgDark: '#0d0705' },
  elements: `
    <!-- Dessert Glass / Layered Slice -->
    <g filter="url(#shadow)">
      <rect x="290" y="190" width="220" height="170" rx="16" fill="#FFFBEB" stroke="#D1D5DB" stroke-width="3"/>
      <!-- Savoiardi Espresso Layers -->
      <rect x="300" y="240" width="200" height="24" rx="6" fill="#78350F"/>
      <rect x="300" y="300" width="200" height="24" rx="6" fill="#78350F"/>
      <!-- Mascarpone Layers -->
      <rect x="300" y="205" width="200" height="30" rx="6" fill="#FEFCE8"/>
      <rect x="300" y="268" width="200" height="28" rx="6" fill="#FEFCE8"/>
      <!-- Cocoa Powder Top Dusting -->
      <rect x="290" y="190" width="220" height="16" rx="8" fill="#451A03"/>
      <circle cx="340" cy="198" r="3" fill="#292524"/>
      <circle cx="380" cy="196" r="3" fill="#292524"/>
      <circle cx="420" cy="197" r="3" fill="#292524"/>
      <circle cx="460" cy="198" r="3" fill="#292524"/>
    </g>
  `
});

// 13. Caramel Dream Cake
const caramelCakeSVG = createFoodSVG({
  title: "Caramel Dream Cake",
  subtitle: "Moist golden sponge cake topped with warm salted butterscotch caramel",
  badge: "POPULAR DESSERT",
  colorScheme: { bgLight: '#2c1810', bgMid: '#1a0e0a', bgDark: '#0d0705' },
  elements: `
    <!-- Cake Slice -->
    <g filter="url(#shadow)">
      <path d="M280 320 L400 180 L520 320 Z" fill="#FEF08A" stroke="#CA8A04" stroke-width="2"/>
      <path d="M280 320 L520 320 L500 350 L260 350 Z" fill="#FDE047"/>
      <!-- Caramel Drip Coating -->
      <path d="M390 180 Q400 230 420 250 Q430 270 410 320" fill="none" stroke="#B45309" stroke-width="12" stroke-linecap="round"/>
      <path d="M370 210 Q360 250 380 280" fill="none" stroke="#D97706" stroke-width="8" stroke-linecap="round"/>
      <!-- Caramel Glaze Layer -->
      <path d="M395 175 L525 320 L495 325 Z" fill="#B45309" opacity="0.85"/>
    </g>
  `
});

// 14. Fresh Lime Soda
const freshLimeSodaSVG = createFoodSVG({
  title: "Sparkling Fresh Lime Soda",
  subtitle: "Crisp soda infused with freshly squeezed lime, mint leaves & rock salt",
  badge: "CHILLED BEVERAGE",
  colorScheme: { bgLight: '#1e293b', bgMid: '#0f172a', bgDark: '#020617' },
  elements: `
    <!-- Highball Glass -->
    <g filter="url(#shadow)">
      <path d="M340 180 L360 360 Q360 380 400 380 Q440 380 440 360 L460 180 Z" fill="#E0F2FE" stroke="#BAE6FD" stroke-width="4" opacity="0.7"/>
      <!-- Liquid contents -->
      <path d="M345 220 L362 360 Q362 376 400 376 Q438 376 438 360 L455 220 Z" fill="#F0FDF4" opacity="0.8"/>
      <!-- Lime Slices & Mint -->
      <circle cx="400" cy="260" r="26" fill="#84CC16" stroke="#4D7C0F" stroke-width="3"/>
      <circle cx="400" cy="260" r="20" fill="#BEF264"/>
      <path d="M380 200 Q400 180 415 205 Q395 215 380 200 Z" fill="#15803D"/>
      <!-- Bubbles -->
      <circle cx="390" cy="300" r="4" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="410" cy="320" r="5" fill="#FFFFFF" opacity="0.7"/>
      <circle cx="380" cy="340" r="3" fill="#FFFFFF" opacity="0.8"/>
    </g>
  `
});

// 15. Artisan Cold Brew Coffee
const coldBrewSVG = createFoodSVG({
  title: "Artisan Cold Brew Coffee",
  subtitle: "18-hour slow steeped specialty coffee poured over clear ice blocks",
  badge: "SPECIALTY COFFEE",
  colorScheme: { bgLight: '#1e293b', bgMid: '#0f172a', bgDark: '#020617' },
  elements: `
    <!-- Coffee Glass -->
    <g filter="url(#shadow)">
      <path d="M340 180 L360 360 Q360 380 400 380 Q440 380 440 360 L460 180 Z" fill="#451A03" stroke="#78350F" stroke-width="4"/>
      <!-- Ice Cubes inside -->
      <rect x="375" y="240" width="35" height="35" rx="6" fill="#E2E8F0" opacity="0.5" transform="rotate(15 392 257)"/>
      <rect x="385" y="290" width="32" height="32" rx="6" fill="#E2E8F0" opacity="0.4" transform="rotate(-10 401 306)"/>
      <!-- Foamy Crema Top -->
      <ellipse cx="400" cy="188" rx="55" ry="14" fill="#D97706" opacity="0.8"/>
    </g>
  `
});

// HERO IMAGE
const heroSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" class="w-full h-full object-cover">
  <defs>
    <radialGradient id="ovenGlow" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#EA580C" stop-opacity="0.9" />
      <stop offset="35%" stop-color="#C2410C" stop-opacity="0.7" />
      <stop offset="70%" stop-color="#7C2D12" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#0F0804" />
    </radialGradient>
    <radialGradient id="flameLight" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="40%" stop-color="#F97316" />
      <stop offset="80%" stop-color="#DC2626" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
    <linearGradient id="crustG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="50%" stop-color="#9A3412" />
      <stop offset="100%" stop-color="#431407" />
    </linearGradient>
  </defs>

  <!-- Deep Stone Pizzeria Background -->
  <rect width="1600" height="900" fill="#0A0604" />

  <!-- Wood-Fired Stone Oven Mouth (Arch) -->
  <path d="M 300 900 L 300 450 C 300 150 1300 150 1300 450 L 1300 900 Z" fill="url(#ovenGlow)" stroke="#27140B" stroke-width="28" />

  <!-- Inner Fire Glow & Embers -->
  <ellipse cx="800" cy="650" rx="420" ry="220" fill="url(#flameLight)" opacity="0.75" />

  <!-- Oven Stone Hearth Base -->
  <rect x="240" y="620" width="1120" height="280" fill="#1C100B" stroke="#3D2012" stroke-width="8" />

  <!-- Fresh Artisan Pizza on Wooden Peel in Oven Hearth -->
  <g transform="translate(800, 640)">
    <!-- Wooden Peel Handle & Paddle -->
    <ellipse cx="0" cy="10" rx="340" ry="180" fill="#451A03" stroke="#270E02" stroke-width="4" />
    <rect x="-40" y="140" width="80" height="300" fill="#78350F" />
    
    <!-- Authentic Wood-Fired Pizza -->
    <ellipse cx="0" cy="0" rx="300" ry="150" fill="url(#crustG)" />
    <!-- Charred Spots on Edge -->
    <ellipse cx="-240" cy="-30" rx="22" ry="11" fill="#180A04"/>
    <ellipse cx="-120" cy="-120" rx="28" ry="12" fill="#180A04"/>
    <ellipse cx="140" cy="-125" rx="30" ry="13" fill="#180A04"/>
    <ellipse cx="250" cy="-20" rx="24" ry="12" fill="#180A04"/>
    <ellipse cx="180" cy="90" rx="28" ry="14" fill="#180A04"/>
    <ellipse cx="-160" cy="85" rx="26" ry="13" fill="#180A04"/>
    
    <!-- Rich Tomato & Bubbling Cheese Surface -->
    <ellipse cx="0" cy="0" rx="250" ry="120" fill="#B91C1C" />
    <ellipse cx="0" cy="0" rx="230" ry="110" fill="#FEF08A" opacity="0.9" />
    <ellipse cx="-70" cy="-30" rx="40" ry="20" fill="#F59E0B" opacity="0.7"/>
    <ellipse cx="80" cy="20" rx="45" ry="22" fill="#F59E0B" opacity="0.7"/>
    
    <!-- Basil Leaves -->
    <g fill="#16A34A">
      <ellipse cx="-50" cy="-20" rx="24" ry="12" transform="rotate(-25 -50 -20)"/>
      <ellipse cx="60" cy="-40" rx="28" ry="14" transform="rotate(20 60 -40)"/>
      <ellipse cx="40" cy="40" rx="26" ry="13" transform="rotate(-15 40 40)"/>
      <ellipse cx="-80" cy="30" rx="22" ry="11" transform="rotate(30 -80 30)"/>
    </g>
  </g>

  <!-- Atmospheric Ember Sparks Floating Upward -->
  <g fill="#FDE047" opacity="0.8">
    <circle cx="680" cy="360" r="3"/><circle cx="750" cy="310" r="4"/><circle cx="860" cy="280" r="3"/>
    <circle cx="920" cy="350" r="4"/><circle cx="810" cy="220" r="2.5"/><circle cx="730" cy="240" r="3"/>
  </g>

  <!-- Subtle Vignette Frame -->
  <rect width="1600" height="900" fill="none" stroke="#000" stroke-width="40" opacity="0.6"/>
</svg>`;

// INTERIOR & EXTERIOR & GALLERY IMAGES
const createAmbianceSVG = (title, subtitle, type) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" class="w-full h-full object-cover">
  <defs>
    <linearGradient id="warmInterior" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D150B"/>
      <stop offset="60%" stop-color="#190B05"/>
      <stop offset="100%" stop-color="#0B0502"/>
    </linearGradient>
    <radialGradient id="lampGlow" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#FDE047" stop-opacity="0.4"/>
      <stop offset="60%" stop-color="#EA580C" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  
  <rect width="800" height="600" fill="url(#warmInterior)"/>
  <rect width="800" height="600" fill="url(#lampGlow)"/>
  
  <!-- Architectural brick / wood accents -->
  <g stroke="#3E2012" stroke-width="2" opacity="0.4">
    <line x1="0" y1="180" x2="800" y2="180"/>
    <line x1="0" y1="320" x2="800" y2="320"/>
    <line x1="0" y1="460" x2="800" y2="460"/>
    <!-- vertical lines -->
    <line x1="200" y1="0" x2="200" y2="600"/>
    <line x1="400" y1="0" x2="400" y2="600"/>
    <line x1="600" y1="0" x2="600" y2="600"/>
  </g>
  
  <!-- Warm hanging pendant lamps -->
  <g>
    <line x1="240" y1="0" x2="240" y2="160" stroke="#78350F" stroke-width="3"/>
    <path d="M210 160 Q240 130 270 160 Z" fill="#9A3412"/>
    <circle cx="240" cy="175" r="14" fill="#FEF08A"/>
    
    <line x1="560" y1="0" x2="560" y2="160" stroke="#78350F" stroke-width="3"/>
    <path d="M530 160 Q560 130 590 160 Z" fill="#9A3412"/>
    <circle cx="560" cy="175" r="14" fill="#FEF08A"/>
  </g>

  <!-- Rustic dining tables & cozy seating -->
  <g opacity="0.85">
    <rect x="140" y="360" width="200" height="120" rx="10" fill="#451A03" stroke="#270E02" stroke-width="4"/>
    <rect x="460" y="360" width="200" height="120" rx="10" fill="#451A03" stroke="#270E02" stroke-width="4"/>
    <circle cx="240" cy="420" r="24" fill="#FEF08A" opacity="0.7"/>
    <circle cx="560" cy="420" r="24" fill="#FEF08A" opacity="0.7"/>
  </g>
  
  <!-- Text Label Overlay -->
  <rect y="480" width="800" height="120" fill="#0B0502" opacity="0.9"/>
  <text x="40" y="535" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="bold" fill="#FDFBF7">${title}</text>
  <text x="40" y="570" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" fill="#D2B68D">${subtitle}</text>
</svg>`;
};

// INSTAGRAM TILES (6 posts)
const createInstaTileSVG = (dishName, caption, date) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" class="w-full h-full object-cover">
  <defs>
    <radialGradient id="instaGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#3A170A"/>
      <stop offset="100%" stop-color="#120603"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#instaGlow)"/>
  
  <!-- Subtle circular plate / pizza motif -->
  <circle cx="300" cy="260" r="160" fill="#29140A" stroke="#7C2D12" stroke-width="4"/>
  <circle cx="300" cy="260" r="140" fill="#B91C1C" opacity="0.9"/>
  <circle cx="300" cy="260" r="125" fill="#FBBF24" opacity="0.95"/>
  <ellipse cx="260" cy="230" rx="20" ry="10" fill="#15803D"/>
  <ellipse cx="340" cy="270" rx="22" ry="11" fill="#15803D"/>
  <circle cx="300" cy="260" r="16" fill="#B45309"/>

  <!-- Instagram brand gradient bar on top -->
  <rect x="0" y="0" width="600" height="6" fill="#E1306C"/>

  <!-- Caption overlay -->
  <rect y="430" width="600" height="170" fill="#0A0402" opacity="0.95"/>
  <text x="30" y="475" font-family="'Playfair Display', Georgia, serif" font-size="24" font-weight="bold" fill="#FFF7ED">${dishName}</text>
  <text x="30" y="515" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#FED7AA">${caption}</text>
  <text x="30" y="555" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#EA580C">${date} • @subakes</text>
  <g transform="translate(530, 460)">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E1306C"/>
  </g>
</svg>`;
};

// WRITE ALL FILES
const files = [
  // Hero
  { p: 'hero/subakes-wood-fired-hero.svg', c: heroSVG },
  
  // Food items
  { p: 'food/zesty-chicken-pizza.svg', c: zestyChickenSVG },
  { p: 'food/margherita-wood-fired-pizza.svg', c: margheritaSVG },
  { p: 'food/paneer-piccante-pizza.svg', c: paneerPiccanteSVG },
  { p: 'food/pesto-mushroom-pizza.svg', c: pestoMushroomSVG },
  { p: 'food/vegetariana-pizza.svg', c: vegetarianaSVG },
  { p: 'food/quattro-formaggi-pizza.svg', c: quattroFormaggiSVG },
  { p: 'food/bbq-chicken-pizza.svg', c: bbqChickenSVG },
  { p: 'food/mediterranean-pizza.svg', c: mediterraneanSVG },
  { p: 'food/cheese-garlic-bread.svg', c: cheeseGarlicBreadSVG },
  { p: 'food/cilantro-chicken-crostini.svg', c: crostiniSVG },
  { p: 'food/spaghetti-carbonara.svg', c: carbonaraSVG },
  { p: 'food/tiramisu.svg', c: tiramisuSVG },
  { p: 'food/caramel-dream-cake.svg', c: caramelCakeSVG },
  { p: 'food/fresh-lime-soda.svg', c: freshLimeSodaSVG },
  { p: 'food/artisan-cold-brew.svg', c: coldBrewSVG },

  // Interior / Exterior / Gallery
  { p: 'interior/cozy-dining-seating.svg', c: createAmbianceSVG('Cozy Cafe Seating', 'Warm, welcoming wood-toned seating in Sadashiv Peth', 'interior') },
  { p: 'interior/wood-fired-stone-oven.svg', c: createAmbianceSVG('Artisan Stone Oven', 'Baking Neapolitan pizzas at 450°C over hardwood logs', 'interior') },
  { p: 'exterior/pizzeria-storefront.svg', c: createAmbianceSVG('SuBakes Storefront', 'Chaitanya Apartment, near SP College, Sadashiv Peth', 'exterior') },
  { p: 'gallery/chef-stretching-dough.svg', c: createAmbianceSVG('Handcrafted Dough', 'Naturally fermented sourdough hand-stretched to perfection', 'gallery') },
  { p: 'gallery/pizza-oven-embers.svg', c: createAmbianceSVG('Glowing Hardwood Embers', 'Imparting that signature smoky leopard-spotted crust', 'gallery') },
  { p: 'gallery/fresh-dough-and-basil.svg', c: createAmbianceSVG('Fresh Mediterranean Herbs', 'Farm-fresh basil, extra virgin olive oil & San Marzano sauce', 'gallery') },

  // Instagram grid (6 posts)
  { p: 'instagram/insta-post-1.svg', c: createInstaTileSVG('Zesty Chicken Perfection', 'Fresh out of the wood-fired stone oven. Golden crust, bubbling cheese!', 'YESTERDAY') },
  { p: 'instagram/insta-post-2.svg', c: createInstaTileSVG('Cheese Garlic Bread Vibes', 'Served piping hot with our signature house cheese dip!', '2 DAYS AGO') },
  { p: 'instagram/insta-post-3.svg', c: createInstaTileSVG('450°C Hardwood Fire', 'Where the magic happens every single day at Sadashiv Peth.', '4 DAYS AGO') },
  { p: 'instagram/insta-post-4.svg', c: createInstaTileSVG('Quattro Formaggi Feast', 'Four artisan cheeses blended on a charred sourdough crust.', '5 DAYS AGO') },
  { p: 'instagram/insta-post-5.svg', c: createInstaTileSVG('Sweet Caramel Ending', 'Save room for our signature Caramel Dream Cake!', '1 WEEK AGO') },
  { p: 'instagram/insta-post-6.svg', c: createInstaTileSVG('Cilantro Chicken Crostini', 'Crispy toasted baguette with fresh hummus & herb chicken.', '1 WEEK AGO') },
];

files.forEach(({ p, c }) => {
  const fullPath = path.join(baseDir, p);
  fs.writeFileSync(fullPath, c, 'utf8');
  console.log('Saved:', p);
});

console.log('Successfully generated all ' + files.length + ' localized high-fidelity images!');
