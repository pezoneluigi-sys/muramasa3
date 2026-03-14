const fs = require('fs');

let data = fs.readFileSync('data.ts', 'utf8');

// We need to carefully replace prices only in items that are NOT in 'section-bevande' or 'section-vino'.
// Let's split the file by "id: 'section-"
let parts = data.split(/(?=id:\s*'section-)/);

let newData = parts.map(part => {
  if (part.includes("id: 'section-bevande'") || part.includes("id: 'section-vino'")) {
    return part;
  }
  
  // Replace prices in this section
  return part.replace(/price:\s*'€\s*(\d+),(\d{2})'/g, (match, euros, cents) => {
    let price = parseFloat(`${euros}.${cents}`);
    let newPrice = Math.ceil(price * 0.9);
    return `price: '€ ${newPrice},00'`;
  });
}).join('');

fs.writeFileSync('data.ts', newData);
console.log("Prices updated");
