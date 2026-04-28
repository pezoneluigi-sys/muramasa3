import fs from 'fs';

let code = fs.readFileSync('data.ts', 'utf8');

// 1. Update navigationItems
const navItemsRegex = /export const navigationItems: NavigationItem\[\] = \[[\s\S]*?\];/;
const newNavItems = `export const navigationItems: NavigationItem[] = [
  { id: 'section-antipasti', label: 'Antipasti', icon: 'tapas' },
  { id: 'section-uramaki', label: 'Uramaki', icon: 'donut_large' },
  { id: 'section-nigiri', label: 'Nigiri', icon: 'radio_button_checked' },
  { id: 'section-hosomaki', label: 'Hosomaki', icon: 'view_week' },
  { id: 'section-sashimi', label: 'Sashimi', icon: 'phishing' },
  { id: 'section-temaki', label: 'Temaki', icon: 'icecream' },
  { id: 'section-tartare', label: 'Tartare', icon: 'set_meal' },
  { id: 'section-bevande', label: 'Bevande', icon: 'local_bar' },
  { id: 'section-vino', label: 'Vino', icon: 'wine_bar' }
];`;
code = code.replace(navItemsRegex, newNavItems);

// 2. Extract Hosomaki items from Nigiri
const nigiriTitleRegex = /title: 'Nigiri & Hosomaki',/;
code = code.replace(nigiriTitleRegex, "title: 'Nigiri',");

const hosomakiItemsRegex = /[ \t]*\{\n[ \t]*name: 'Hosomaki Salmone \(6pz\)',[\s\S]*?name: 'Hosomaki Cetriolo \(6pz\)',[\s\S]*?\}\n/;
const hosomakiMatch = code.match(hosomakiItemsRegex);

if (hosomakiMatch) {
  let hosomakiContent = hosomakiMatch[0];
  // Remove hosomaki from Nigiri block
  // Take care of the comma before it if it exists.
  code = code.replace(new RegExp(",\\s*" + hosomakiContent.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')), "");
  code = code.replace(hosomakiContent, ""); // fallback if comma wasn't matched

  // Create Hosomaki block
  const hosomakiSection = `
  {
    id: 'section-hosomaki',
    title: 'Hosomaki',
    icon: 'view_week',
    bgClass: 'bg-white',
    items: [
${hosomakiContent.trim()}
    ]
  },`;

  // Insert after Nigiri block
  const endOfNigiriBlockRegex = /id: 'section-nigiri',[\s\S]*?\]\n[ \t]*\},/;
  const endOfNigiriMatch = code.match(endOfNigiriBlockRegex);
  if (endOfNigiriMatch) {
    code = code.replace(endOfNigiriMatch[0], endOfNigiriMatch[0] + hosomakiSection);
  }
}

// 3. Move Temaki before Tartare
const temakiRegex = /[ \t]*\{\n[ \t]*id: 'section-temaki',[\s\S]*?\]\n[ \t]*\},?\n?/;
const tartareRegex = /[ \t]*\{\n[ \t]*id: 'section-tartare',[\s\S]*?\]\n[ \t]*\},?\n?/;

const temakiMatch = code.match(temakiRegex);
if (temakiMatch) {
  code = code.replace(temakiMatch[0], ''); // Remove from original position
  
  const updatedTartareMatch = code.match(tartareRegex);
  if (updatedTartareMatch) {
    // Determine if temaki needs a trailing comma
    let temakiBlock = temakiMatch[0].trim();
    if (!temakiBlock.endsWith(',')) {
        temakiBlock += ',';
    }
    temakiBlock += '\n';

    code = code.replace(updatedTartareMatch[0], temakiBlock + updatedTartareMatch[0]);
  }
}

fs.writeFileSync('data.ts', code);
console.log('done');
