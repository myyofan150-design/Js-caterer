const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== PACKAGING HOSTINGER PRODUCTION RELEASE ===');

const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const hostingerZip = path.join(projectRoot, 'js-caterer-hostinger-deploy.zip');
const prodZip = path.join(projectRoot, 'js-caterer-production.zip');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
[hostingerZip, prodZip].forEach(z => {
  if (fs.existsSync(z)) fs.unlinkSync(z);
});

fs.mkdirSync(distDir, { recursive: true });

const filesToCopy = [
  'index.html',
  'about.html',
  'services.html',
  'contact.html',
  'marriage-event-catering.html',
  'industrial-workforce-catering.html',
  'corporate-packed-food-catering.html',
  'temple-annathanam-catering.html',
  'styles.css',
  'script.js',
  'favicon.ico',
  'favicon.png',
  '.htaccess',
  'robots.txt',
  'sitemap.xml'
];

filesToCopy.forEach(file => {
  const src = path.join(projectRoot, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
});

function copyDirRecursive(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const assetsSrc = path.join(projectRoot, 'assets');
const assetsDest = path.join(distDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  copyDirRecursive(assetsSrc, assetsDest);
}

// Create Hostinger deployable zip
execSync(`tar -a -c -f "../js-caterer-hostinger-deploy.zip" * .htaccess`, { cwd: distDir, stdio: 'inherit' });
// Also keep js-caterer-production.zip updated
fs.copyFileSync(hostingerZip, prodZip);

const stats = fs.statSync(hostingerZip);
console.log(`✅ SUCCESS! Hostinger Deployable Zip created at:`);
console.log(`   ${hostingerZip} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);

