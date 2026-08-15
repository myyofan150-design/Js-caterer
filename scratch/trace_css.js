const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');

const lines = css.split('\n');
const stack = [];

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '{') stack.push({ line: lineNum, text: line.trim() });
    if (ch === '}') {
      if (stack.length > 0) stack.pop();
    }
  }
});

console.log('Unclosed CSS rules:');
stack.forEach(s => console.log(`  Opened at line ${s.line}: ${s.text}`));
