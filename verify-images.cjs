const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  let bad = 0;
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      bad += checkDir(p);
    } else if (f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.html')) {
      const content = fs.readFileSync(p, 'utf8');
      const matches = content.match(/src=["']https?:\/\/[^"']+\.(jpg|jpeg|png|webp|gif|svg)/gi) || [];
      const imgMatches = content.match(/image:\s*["']https?:\/\/[^"']+/gi) || [];
      if (matches.length > 0 || imgMatches.length > 0) {
        console.error('Found external image in:', p, matches, imgMatches);
        bad += matches.length + imgMatches.length;
      }
    }
  }
  return bad;
}

const badCount = checkDir(path.join(__dirname, 'src'));
console.log('External image check count:', badCount);
if (badCount === 0) {
  console.log('SUCCESS: All images point to local files! Zero external image URLs found.');
}
