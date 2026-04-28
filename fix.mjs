import fs from 'fs';

let code = fs.readFileSync('data.ts', 'utf8');

// The block to extract
const sashimiRegex = /[ \t]*\{\n[ \t]*id: 'section-sashimi',[\s\S]*?\n[ \t]*\]\n[ \t]*\},?\n?/;
const sashimiMatch = code.match(sashimiRegex);

if (sashimiMatch) {
  let sashimiBlock = sashimiMatch[0];
  
  // Remove the block
  code = code.replace(sashimiBlock, '');
  
  // Now find Nigiri
  const nigiriRegex = /[ \t]*\{\n[ \t]*id: 'section-nigiri',[\s\S]*?\n[ \t]*\]\n[ \t]*\},?\n?/;
  const nigiriMatch = code.match(nigiriRegex);
  if (nigiriMatch) {
    const nigiriBlock = nigiriMatch[0];
    // insert sashimiBlock after nigiriBlock
    code = code.replace(nigiriBlock, nigiriBlock + sashimiBlock);
  }
}

fs.writeFileSync('data.ts', code);
console.log('done');
