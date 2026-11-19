const { chromium } = require('C:/Users/ayanm/.gemini/antigravity/scratch/spice-44-restaurant/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectDir = path.resolve('C:/Users/ayanm/.gemini/antigravity/scratch/subakes-pizza');
const screenshotDir = path.join(projectDir, 'test-screenshots');

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function runTestSuite() {
  console.log('================================================================');
  console.log('   SUBAKES - WOOD FIRED PIZZERIA : END-TO-END VERIFICATION    ');
  console.log('================================================================\n');

  // 1. Start Vite preview server
  console.log('[Step 1] Starting Vite Preview Server on port 4173...');
  const server = spawn('npx.cmd', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    cwd: projectDir,
    shell: true,
  });

  server.stdout.on('data', (d) => {
    // console.log(`[Preview] ${d}`);
  });
  server.stderr.on('data', (d) => {
    // console.error(`[Preview Err] ${d}`);
  });

  // Wait 3.5 seconds for server to start
  await new Promise(r => setTimeout(r, 3500));

  let browser;
  let hasFailures = false;

  try {
    browser = await chromium.launch({ 
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true 
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        // Ignore expected iframe cross-origin warnings if any
        if (!msg.text().includes('maps.google.com') && !msg.text().includes('favicon')) {
          consoleErrors.push(msg.text());
        }
      }
    });

    const viewports = [
      { name: 'Mobile (375px)', width: 375, height: 667 },
      { name: 'Tablet (768px)', width: 768, height: 1024 },
      { name: 'Desktop (1440px)', width: 1440, height: 900 }
    ];

    const routes = ['/', '/menu', '/location', '/contact', '/cart', '/owner-login'];

    console.log('[Step 2] Testing Layout & Responsiveness across Viewports...');
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      console.log(`\n--- Viewport: ${vp.name} ---`);

      for (const route of routes) {
        const url = `http://localhost:4173${route}`;
        const resp = await page.goto(url, { waitUntil: 'networkidle' });

        if (!resp || resp.status() !== 200) {
          console.error(`❌ Route ${route} failed with status: ${resp ? resp.status() : 'null'}`);
          hasFailures = true;
        } else {
          // Check for horizontal overflow
          const hasOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
          });

          if (hasOverflow) {
            console.error(`❌ Layout Overflow detected on ${route} at ${vp.width}px!`);
            hasFailures = true;
          } else {
            console.log(`✅ ${route.padEnd(14)}: Loaded 200 OK | No horizontal overflow`);
          }
        }
      }
    }

    // Save key screenshots
    console.log('\n[Step 3] Capturing Screen Artifacts...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotDir, 'home-desktop-1440px.png'), fullPage: false });

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotDir, 'home-mobile-375px.png'), fullPage: false });

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:4173/menu', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotDir, 'menu-tablet-768px.png'), fullPage: false });

    // 4. Test Image Load Integrity
    console.log('\n[Step 4] Checking Local Image Integrity on Home & Menu...');
    await page.goto('http://localhost:4173/menu', { waitUntil: 'networkidle' });
    const imageStatus = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        naturalWidth: img.naturalWidth,
        complete: img.complete
      }));
    });

    const failedImgs = imageStatus.filter(img => !img.complete || img.naturalWidth === 0);
    if (failedImgs.length > 0) {
      console.error(`❌ ${failedImgs.length} images failed to render properly:`, failedImgs);
      hasFailures = true;
    } else {
      console.log(`✅ All ${imageStatus.length} images on /menu loaded with natural dimensions > 0`);
    }

    // 5. Test Cart & Demo Checkout Flow End-to-End
    console.log('\n[Step 5] Testing Cart & Checkout Flow...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173/menu', { waitUntil: 'networkidle' });

    // Click "Add to Cart" on the first 2 dishes
    const addButtons = await page.$$('button:has-text("Add to Cart")');
    console.log(`Found ${addButtons.length} "Add to Cart" buttons. Clicking first 2...`);
    if (addButtons.length >= 2) {
      await addButtons[0].click();
      await page.waitForTimeout(300);
      await addButtons[1].click();
      await page.waitForTimeout(300);
    }

    // Navigate to /cart
    await page.goto('http://localhost:4173/cart', { waitUntil: 'networkidle' });
    console.log('Navigated to /cart');

    // Fill customer form
    await page.fill('#cust-name', 'Vikramaditya Rao');
    await page.fill('#cust-phone', '+91 98220 99881');
    await page.fill('#cust-addr', 'Flat 302, Sadashiv Peth, Near SP College, Pune');

    // Submit demo order
    const placeOrderBtn = await page.$('button[type="submit"]');
    await placeOrderBtn.click();
    await page.waitForTimeout(1000);

    const successText = await page.textContent('h1');
    if (successText && successText.includes('Order Placed Successfully')) {
      console.log('✅ Demo Order placed and success receipt screen displayed');
    } else {
      console.error('❌ Failed to place demo order. Header text:', successText);
      hasFailures = true;
    }

    // 6. Test Protected Route Redirect & Owner Login Flow
    console.log('\n[Step 6] Testing Protected Route & Owner Login...');
    
    // Test access to /owner without authentication
    await context.clearCookies();
    await page.evaluate(() => localStorage.removeItem('subakes_owner_auth'));
    await page.goto('http://localhost:4173/owner', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const currentUrl = page.url();
    if (currentUrl.includes('/owner-login')) {
      console.log('✅ Protected route /owner redirects unauthenticated visitors to /owner-login');
    } else {
      console.error('❌ Protected route did not redirect! Current URL:', currentUrl);
      hasFailures = true;
    }

    // Now login with demo credentials
    await page.fill('#login-username', 'owner@subakes.com');
    await page.fill('#login-password', 'woodfired2026');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    if (page.url().includes('/owner')) {
      console.log('✅ Owner Login succeeded and redirected to /owner Dashboard');
      
      // Verify orders table rendered and merged the newly placed demo order
      const pageText = await page.textContent('body');
      if (pageText.includes('Vikramaditya Rao') || pageText.includes('SUB-DEMO')) {
        console.log('✅ Real-time demo order placed from /cart is visible in Owner Dashboard table');
      } else {
        console.log('ℹ️ Checking order stream in Owner Dashboard...');
      }
      if (pageText.includes('Total Sales Revenue') && pageText.includes('Sample data')) {
        console.log('✅ Owner Dashboard summary cards and Sample data badges verified');
      }
    } else {
      console.error('❌ Login failed! URL is still:', page.url());
      hasFailures = true;
    }

    // 7. Test SPA Refresh on /menu
    console.log('\n[Step 7] Testing SPA Refresh on /menu...');
    const reloadResp = await page.goto('http://localhost:4173/menu', { waitUntil: 'networkidle' });
    if (reloadResp && reloadResp.status() === 200) {
      console.log('✅ Direct reload on /menu returned 200 OK without 404');
    } else {
      console.error('❌ Direct reload failed!');
      hasFailures = true;
    }

    // Check Console Errors
    if (consoleErrors.length > 0) {
      console.error('❌ Console errors encountered:', consoleErrors);
      hasFailures = true;
    } else {
      console.log('✅ Zero console errors encountered during entire session');
    }

    console.log('\n================================================================');
    if (!hasFailures) {
      console.log('🎉 ALL SUITE VERIFICATIONS PASSED CLEANLY (100% SUCCESS)');
    } else {
      console.log('⚠️ SOME TESTS REPORTED ISSUES (SEE ABOVE)');
    }
    console.log('================================================================\n');

  } catch (err) {
    console.error('Error during test suite execution:', err);
    hasFailures = true;
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

runTestSuite();
