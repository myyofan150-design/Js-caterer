const fs = require('fs');
const code = fs.readFileSync('script.js', 'utf8');

const lines = code.split('\n');
let depth = 0;

lines.forEach((line, idx) => {
  for (const char of line) {
    if (char === '{') depth++;
    if (char === '}') depth--;
  }
  if (depth < 0) {
    console.log(`Unmatched closing brace at line ${idx + 1}: ${line}`);
  }
});

console.log(`Final brace depth at end of file: ${depth}`);
