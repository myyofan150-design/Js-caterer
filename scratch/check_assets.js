const fs = require('fs');
const path = require('path');

function checkFileAssets(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const srcRegex = /src=["']([^"']+)["']/g;
  let match;
  console.log(`\n--- Checking ${filename} ---`);
  while ((match = srcRegex.exec(content)) !== null) {
    const assetPath = match[1];
    const exists = fs.existsSync(assetPath);
    console.log(`  [${exists ? 'OK' : 'MISSING'}] ${assetPath}`);
  }
}

checkFileAssets('index.html');
checkFileAssets('services.html');
