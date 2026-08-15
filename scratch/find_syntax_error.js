const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('script.js', 'utf8');

try {
  new vm.Script(code);
  console.log('Script is valid!');
} catch (e) {
  console.error('Syntax Error:', e.message);
  console.error(e.stack);
}
