import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import all data files
import { restaurantData } from './src/data/restaurant.js';
import { menuItems, menuCategories } from './src/data/menu.js';
import { reviewsData } from './src/data/reviews.js';
import { sampleOrders, samplePayments } from './src/data/orders.js';
import { instagramData } from './src/data/instagram.js';
import { faqsData } from './src/data/faqs.js';
import { offersData } from './src/data/offers.js';
import { galleryItems, galleryCategories } from './src/data/gallery.js';

console.log('================================================================');
console.log('       SUBAKES WOOD FIRED PIZZERIA - CONTRACT & LOGIC AUDIT    ');
console.log('================================================================\n');

let failedCount = 0;
function test(desc, fn) {
  try {
    fn();
    console.log(`✅ PASS: ${desc}`);
  } catch (err) {
    console.error(`❌ FAIL: ${desc}`);
    console.error(`   Reason: ${err.message}`);
    failedCount++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// 1. Core Facts & Google Maps Data
console.log('--- 1. Restaurant Core Facts & Google Maps ---');
test('Official Name matches Google Maps listing', () => {
  assert(restaurantData.officialName === "SuBakes - Wood Fired Pizzeria", "Expected official name");
  assert(restaurantData.brandName === "SuBakes", "Expected short brand name");
});

test('Phone number verified from real listing', () => {
  assert(restaurantData.phone === "+91 90215 49565", "Phone mismatch");
  assert(restaurantData.phoneDisplay === "+91 90215 49565", "Phone display mismatch");
  assert(restaurantData.whatsappNumber === "919021549565", "WhatsApp mismatch");
});

test('Location & Place ID verified', () => {
  assert(restaurantData.address.locality.includes("Sadashiv Peth"), "Locality must include Sadashiv Peth");
  assert(restaurantData.address.city === "Pune", "City must be Pune");
  assert(restaurantData.address.pincode === "411030", "Pincode must be 411030");
  assert(restaurantData.googleMaps.placeId === "ChIJO9UrZELBwjsRlYAmiEn0bGU", "Google Place ID mismatch");
  assert(restaurantData.googleMaps.mapsUrl.includes("ChIJO9UrZELBwjsRlYAmiEn0bGU"), "Directions URL must contain Place ID");
});

test('Operating Hours covers all 7 days (11:30 AM - 11:00 PM)', () => {
  assert(restaurantData.openingHours.length === 7, "Expected 7 days of hours");
  restaurantData.openingHours.forEach(h => {
    assert(h.open === "11:30 AM" && h.close === "11:00 PM", `Invalid hours for ${h.day}`);
  });
});

test('Ratings & Reviews count accurate to Google Maps', () => {
  assert(restaurantData.rating === 4.4, "Rating must be 4.4");
  assert(restaurantData.reviewCountNumber >= 1800, "Review count must reflect 1,850+ reviews");
});

test('MISSING_INFO list properly tracks unverified fields', () => {
  assert(Array.isArray(restaurantData.MISSING_INFO), "MISSING_INFO must be an array");
  assert(restaurantData.MISSING_INFO.length >= 3, "Expected at least 3 missing info fields");
  const fields = restaurantData.MISSING_INFO.map(m => m.field);
  assert(fields.includes("Instagram Handle"), "Instagram Handle must be tracked");
  assert(fields.includes("Official Email"), "Official Email must be tracked");
});

test('Owner credentials properly configured', () => {
  assert(restaurantData.ownerCredentials.username === "owner@subakes.com", "Owner username mismatch");
  assert(restaurantData.ownerCredentials.password === "woodfired2026", "Owner password mismatch");
});

// 2. Menu Items & Quality Rules
console.log('\n--- 2. Menu Categories & Items ---');
test('Categories and item counts', () => {
  assert(menuCategories.length >= 5, "Expected at least 5 menu categories");
  assert(menuItems.length >= 12, "Expected at least 12 menu items");
});

test('Every dish has required attributes and valid local image', () => {
  menuItems.forEach(item => {
    assert(typeof item.price === 'number' && item.price > 0, `Dish ${item.name} has invalid price`);
    assert(typeof item.isVeg === 'boolean', `Dish ${item.name} must have isVeg boolean`);
    assert(typeof item.image === 'string' && item.image.startsWith('/images/'), `Dish ${item.name} image must start with /images/`);
    assert(typeof item.alt === 'string' && item.alt.length > 5, `Dish ${item.name} has missing or weak alt text`);
    assert(item.imageSource === 'google-maps' || item.imageSource === 'web-sample' || item.imageSource === 'ai-sample', `Dish ${item.name} has invalid imageSource: ${item.imageSource}`);
    if (item.imageSource === 'web-sample' || item.imageSource === 'ai-sample') {
      assert(item.isSample === true, `Dish ${item.name} sample image must have isSample: true`);
    }

    // Verify local image file exists on disk
    const diskPath = path.join(__dirname, 'public', item.image);
    assert(fs.existsSync(diskPath), `Local image file missing on disk: ${diskPath}`);
    const stats = fs.statSync(diskPath);
    assert(stats.size > 200, `Image file too small or empty: ${diskPath}`);
  });
});

// 3. Customer Reviews Adherence
console.log('\n--- 3. Reviews Adherence ---');
test('Verified authentic patron reviews', () => {
  assert(reviewsData.reviews.length >= 5, "Expected at least 5 reviews");
  reviewsData.reviews.forEach(r => {
    assert(typeof r.name === 'string' && !r.name.includes(" "), `Reviewer name must be first name only: ${r.name}`);
    assert(r.rating >= 4 && r.rating <= 5, `Rating must be 4 or 5: ${r.rating}`);
    assert(typeof r.text === 'string' && r.text.length > 20, `Review text must be substantial: ${r.name}`);
    assert(r.isVerifiedReview === true, `Must be verified real review: ${r.name}`);
  });
});

// 4. Sample Orders & Payments
console.log('\n--- 4. Orders & Payment Ledger Data ---');
test('Sample orders count between 15-20 and strictly labeled', () => {
  assert(sampleOrders.length >= 15 && sampleOrders.length <= 20, `Expected 15-20 orders, got ${sampleOrders.length}`);
  sampleOrders.forEach(ord => {
    assert(ord.isSample === true, `Order ${ord.id} must have isSample: true`);
    assert(ord.dataLabel.includes("Sample data"), `Order ${ord.id} must be labeled "Sample data"`);
    assert(ord.items.length > 0, `Order ${ord.id} must have items`);
    assert(ord.total > 0, `Order ${ord.id} must have total > 0`);
  });
});

test('Sample payments count matches orders and labeled', () => {
  assert(samplePayments.length === sampleOrders.length, "Payment count must match order count");
  samplePayments.forEach(p => {
    assert(p.isSample === true, `Payment ${p.paymentId} must have isSample: true`);
    assert(p.dataLabel.includes("Sample data"), `Payment ${p.paymentId} must be labeled "Sample data"`);
  });
});

// 5. Build Output & Netlify Configuration
console.log('\n--- 5. Build Distribution & Netlify Config ---');
test('dist/ folder exists with production bundle', () => {
  assert(fs.existsSync(path.join(__dirname, 'dist', 'index.html')), "dist/index.html missing");
  const html = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');
  assert(html.includes('<div id="root">'), "dist/index.html missing root container");
});

test('netlify.toml configured with build command, publish dir, NODE_VERSION 20, and SPA redirect', () => {
  assert(fs.existsSync(path.join(__dirname, 'netlify.toml')), "netlify.toml missing");
  const toml = fs.readFileSync(path.join(__dirname, 'netlify.toml'), 'utf8');
  assert(toml.includes('npm run build'), "netlify.toml missing build command");
  assert(toml.includes('publish = "dist"'), "netlify.toml missing publish dir");
  assert(toml.includes('NODE_VERSION = "20"'), "netlify.toml missing NODE_VERSION 20");
  assert(toml.includes('from = "/*"'), "netlify.toml missing SPA redirect rule");
  assert(toml.includes('to = "/index.html"'), "netlify.toml missing redirect target");
  assert(toml.includes('status = 200'), "netlify.toml missing status 200");
});

test('public/_redirects configured with SPA redirect', () => {
  assert(fs.existsSync(path.join(__dirname, 'public', '_redirects')), "public/_redirects missing");
  const redirects = fs.readFileSync(path.join(__dirname, 'public', '_redirects'), 'utf8');
  assert(redirects.includes('/*') && redirects.includes('/index.html') && redirects.includes('200'), "public/_redirects invalid");
});

// 6. Zero External Image URLs
console.log('\n--- 6. Image Sourcing & External URL Audit ---');
test('All images are local, zero external http(s) URLs in images', () => {
  const checkFolder = (dir) => {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) {
        checkFolder(p);
      } else if (f.endsWith('.js') || f.endsWith('.jsx')) {
        const text = fs.readFileSync(p, 'utf8');
        const extImgs = text.match(/src=["']https?:\/\/[^"']+\.(jpg|jpeg|png|webp|svg)/gi);
        assert(!extImgs || extImgs.length === 0, `External image src found in ${p}`);
      }
    }
  };
  checkFolder(path.join(__dirname, 'src'));
});

console.log('\n================================================================');
if (failedCount === 0) {
  console.log('🎉 ALL CONTRACT & LOGIC AUDITS PASSED WITH ZERO ERRORS! (100%)');
} else {
  console.error(`⚠️ FAILED AUDITS: ${failedCount}`);
  process.exit(1);
}
console.log('================================================================\n');
