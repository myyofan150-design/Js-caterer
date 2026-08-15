const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');

let openBraces = 0;
const lines = css.split('\n');

lines.forEach((line, idx) => {
  for (let ch of line) {
    if (ch === '{') openBraces++;
    if (ch === '}') openBraces--;
  }
  if (openBraces < 0) {
    console.log(`Extra closing brace in styles.css at line ${idx + 1}: ${line}`);
  }
});

console.log(`Final open braces depth in styles.css: ${openBraces}`);
