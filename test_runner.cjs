const fs = require('fs');
const path = require('path');

const code = `console.log("Literal here-strings work with backticks ${1 + 1} perfectly!");`;
fs.writeFileSync('test_literal.cjs', code, 'utf8');
console.log('Saved test_literal.cjs');
