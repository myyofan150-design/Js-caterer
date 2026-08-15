const fs = require('fs');
const code = fs.readFileSync('script.js', 'utf8');

const lines = code.split('\n');
const stack = [];

lines.forEach((line, idx) => {
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '{') {
      stack.push({ line: idx + 1, col: i + 1, text: line.trim() });
    } else if (char === '}') {
      if (stack.length === 0) {
        console.log(`EXTRA CLOSING BRACE at Line ${idx + 1}: ${line}`);
      } else {
        stack.pop();
      }
    }
  }
});

console.log('Unclosed braces remaining:');
stack.forEach(b => console.log(`  Opened at Line ${b.line}: ${b.text}`));
