const fs = require("fs");
console.log('1');

// Sync
const result = fs.readFileSync('./test.txt', 'utf-8');
console.log(result);

// Async
fs.readFile('.test.txt', 'utf-8', (err, result) => {
    console.log(result);
});
console.log('2');