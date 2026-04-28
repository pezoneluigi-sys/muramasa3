import fs from 'fs';
let code = fs.readFileSync('data.ts', 'utf8');

const regexToRemove = /[ \t]*\{\n[ \t]*name: 'Temaki Salmone Spicy',[\s\S]*?name: 'Temaki Ebi Tempura Spicy',[\s\S]*?\}\n/;

const match = code.match(regexToRemove);
if (match) {
    let stranded = match[0];
    code = code.replace(match[0], ''); // Remove from file
    
    // Now insert them inside the Temaki section
    const temakiTarget = /[ \t]*\{\n[ \t]*name: 'Temaki Salmone',[\s\S]*?\}\n[ \t]*\]/
    let temakiMatch = code.match(temakiTarget);
    if(temakiMatch) {
       let block = temakiMatch[0];
       // Replace the `]\n` with ",\n" + stranded + "\n]"
       let newBlock = block.replace(/\}\n[ \t]*\]/, '},\n' + stranded + '    ]');
       code = code.replace(block, newBlock);
    }
}

// Check for stray brackets/braces that the build failed on
// We had an extra `    ]\n  },` around lines 561-562 right before `section-bevande`
const strayRegex = /[ \t]*\]\n[ \t]*\},\n[ \t]*\{\n[ \t]*id: 'section-bevande',/;
code = code.replace(strayRegex, `  {\n    id: 'section-bevande',`);

fs.writeFileSync('data.ts', code);
console.log('done');
