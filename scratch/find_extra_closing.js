const fs = require('fs');
const code = fs.readFileSync('script.js', 'utf8');
const lines = code.split('\n');

let braceStack = [];
let parenStack = [];

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '{') braceStack.push({ line: lineNum, col: i + 1, char: '{' });
    if (ch === '(') parenStack.push({ line: lineNum, col: i + 1, char: '(' });
    if (ch === '}') {
      if (braceStack.length === 0) console.log(`Unmatched } at line ${lineNum}:${i+1}`);
      else braceStack.pop();
    }
    if (ch === ')') {
      if (parenStack.length === 0) console.log(`Unmatched ) at line ${lineNum}:${i+1}`);
      else parenStack.pop();
    }
  }
});

console.log(`Unclosed { remaining: ${braceStack.length}`);
braceStack.forEach(b => console.log(`  { opened at line ${b.line}`));
console.log(`Unclosed ( remaining: ${parenStack.length}`);
parenStack.forEach(p => console.log(`  ( opened at line ${p.line}`));
