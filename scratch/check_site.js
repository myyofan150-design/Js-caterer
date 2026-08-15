const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== 🛡️ PRE-FLIGHT GUARDRAIL & INTEGRITY CHECK ===\n');

// 1. Verify JavaScript Syntax
try {
  execSync('node -c script.js', { stdio: 'pipe' });
  console.log('[PASS] JavaScript Syntax Check (script.js): OK');
} catch (err) {
  console.error('[FAIL] JavaScript Syntax Check Failed!');
  console.error(err.stderr ? err.stderr.toString() : err.message);
  process.exit(1);
}

// 2. Verify CSS Syntax (Brace Depth Check)
try {
  const css = fs.readFileSync('styles.css', 'utf8');
  let openBraces = 0;
  css.split('\n').forEach((line) => {
    for (let ch of line) {
      if (ch === '{') openBraces++;
      if (ch === '}') openBraces--;
    }
  });
  if (openBraces !== 0) {
    throw new Error(`CSS syntax error: Unclosed or extra braces in styles.css (Depth: ${openBraces})`);
  }
  console.log('[PASS] CSS Syntax Check (styles.css): OK');
} catch (err) {
  console.error('[FAIL] CSS Syntax Check Failed!', err.message);
  process.exit(1);
}

// 3. Verify HTML File & Asset Paths
const rootDir = path.join(__dirname, '..');
const htmlFiles = ['index.html', 'about.html', 'services.html', 'menu.html', 'gallery.html', 'contact.html'];

let missingAssets = 0;
htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  const html = fs.readFileSync(filePath, 'utf8');
  const assetRegex = /(?:src|href)=["'](assets\/[^"']+)["']/g;
  let match;

  while ((match = assetRegex.exec(html)) !== null) {
    const assetRel = match[1];
    const assetPath = path.join(rootDir, assetRel);
    if (!fs.existsSync(assetPath)) {
      console.log(`[MISSING] In ${file}: '${assetRel}' -> File not found on disk`);
      missingAssets++;
    }
  }
});

if (missingAssets === 0) {
  console.log('[PASS] Asset Integrity Check: All referenced images & videos exist!');
}

console.log('\n=== GUARDRAIL VERIFICATION COMPLETE ===');
