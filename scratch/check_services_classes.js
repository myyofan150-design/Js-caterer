const fs = require('fs');
const html = fs.readFileSync('services.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

const classRegex = /class=["']([^"']+)["']/g;
let match;
const missing = new Set();
const found = new Set();

while ((match = classRegex.exec(html)) !== null) {
  const classes = match[1].split(/\s+/);
  classes.forEach(c => {
    if (c) {
      if (css.includes(c)) {
        found.add(c);
      } else {
        missing.add(c);
      }
    }
  });
}

console.log('Classes found in styles.css:', Array.from(found).length);
console.log('Classes MISSING in styles.css:', Array.from(missing));
