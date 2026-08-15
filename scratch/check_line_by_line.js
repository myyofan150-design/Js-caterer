const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('script.js', 'utf8');
const lines = code.split('\n');

for (let i = 1; i <= lines.length; i++) {
  const partialCode = lines.slice(0, i).join('\n');
  let openBraces = (partialCode.match(/\{/g) || []).length;
  let closeBraces = (partialCode.match(/\}/g) || []).length;
  let diff = openBraces - closeBraces;
  
  let dummyClose = '\n' + '}'.repeat(Math.max(0, diff)) + '\n});';
  try {
    new vm.Script(partialCode + dummyClose);
  } catch (e) {
    if (!e.message.includes('Unexpected end of input') && !e.message.includes('Unexpected token')) {
      console.log(`First potential syntax issue around line ${i}: ${e.message}`);
    }
  }
}
