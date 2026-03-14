const fs = require('fs');

let data = fs.readFileSync('data.ts', 'utf8');

// Split by sections to isolate 'section-bevande' and 'section-vino'
const sections = data.split(/(?=\s*id: 'section-)/);

let newData = sections.map(section => {
  if (section.includes("id: 'section-bevande'") || section.includes("id: 'section-vino'")) {
    return section;
  }
  
  // Replace prices in this section
  return section.replace(/price:\s*'€\s*(\d+),(\d{2})'/g, (match, euros, cents) => {
    let price = parseFloat(`${euros}.${cents}`);
    let newPrice = Math.ceil(price * 0.9);
    return `price: '€ ${newPrice},00'`;
  });
}).join('');

fs.writeFileSync('data.ts', newData);
console.log("Prices updated");
