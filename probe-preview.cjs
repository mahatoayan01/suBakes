const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const projectDir = path.resolve('C:/Users/ayanm/.gemini/antigravity/scratch/subakes-pizza');

async function testServer() {
  console.log('Starting Vite preview server on port 4173...');
  const server = spawn('cmd.exe', ['/c', 'npx', 'vite', 'preview', '--port', '4173', '--strictPort'], {
    cwd: projectDir,
    stdio: 'ignore'
  });

  // Give server 3 seconds to spin up
  await new Promise(r => setTimeout(r, 3000));

  const routes = ['/', '/menu', '/location', '/contact', '/cart', '/owner-login', '/owner'];
  let allPassed = true;

  function probe(route) {
    return new Promise((resolve) => {
      http.get(`http://127.0.0.1:4173${route}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`✅ Route ${route.padEnd(14)}: Status ${res.statusCode} | Length ${data.length} bytes`);
          resolve(res.statusCode === 200 && data.includes('<div id="root">'));
        });
      }).on('error', (err) => {
        console.error(`❌ Route ${route} failed:`, err.message);
        resolve(false);
      });
    });
  }

  for (const r of routes) {
    const ok = await probe(r);
    if (!ok) allPassed = false;
  }

  // Also probe an image asset
  const imageOk = await new Promise((resolve) => {
    http.get('http://127.0.0.1:4173/images/food/zesty-chicken-pizza.svg', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✅ Image Asset /images/food/zesty-chicken-pizza.svg: Status ${res.statusCode} | Length ${data.length} bytes`);
        resolve(res.statusCode === 200 && data.includes('<svg'));
      });
    }).on('error', (err) => {
      console.error('❌ Image fetch failed:', err.message);
      resolve(false);
    });
  });

  if (!imageOk) allPassed = false;

  console.log('\nKilling server process...');
  server.kill('SIGTERM');

  if (allPassed) {
    console.log('\n🎉 ALL ROUTES RETURNED HTTP 200 OK WITH SPA SHELL & ASSETS!');
  } else {
    console.error('\n⚠️ SOME PROBES FAILED.');
    process.exit(1);
  }
}

testServer();
