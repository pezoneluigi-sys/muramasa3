import fs from 'fs';

let code = fs.readFileSync('data.ts', 'utf8');

// The Hosomaki section inserted mistakenly
const wrongHosomakiRegex = /[ \t]*\{\n[ \t]*id: 'section-hosomaki',[\s\S]*?name: 'Hosomaki Cetriolo \(6pz\)',[\s\S]*?\}\n[ \t]*\]\n[ \t]*\},?/;
const wrongHosomakiMatch = code.match(wrongHosomakiRegex);
let hosomakiContent = '';
if (wrongHosomakiMatch) {
  hosomakiContent = wrongHosomakiMatch[0];
  code = code.replace(wrongHosomakiMatch[0], ''); // remove from wrong place
}

// Ensure the hosomaki section is correctly formatted to place in menuData
// It currently looks like it has a trailing comma or doesn't.
let cleanHosomakiContent = hosomakiContent.trim();
if (!cleanHosomakiContent.endsWith(',')) {
    cleanHosomakiContent += ',';
}

// Find Nigiri section inside menuData
// Wait, we know `menuData` contains `id: 'section-nigiri',`.
// Let's find it safely.
const nigiriInMenuDataRegex = /[ \t]*\{\n[ \t]*id: 'section-nigiri',[\s\S]*?\]\n[ \t]*\},?\n?/;
const nigiriMenuMatch = code.match(nigiriInMenuDataRegex);
if (nigiriMenuMatch) {
  let nigiriBlock = nigiriMenuMatch[0];
  code = code.replace(nigiriBlock, nigiriBlock + '\n  ' + cleanHosomakiContent + '\n');
}

fs.writeFileSync('data.ts', code);
console.log('done');
