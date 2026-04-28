import fs from 'fs';

let code = fs.readFileSync('data.ts', 'utf8');

// The items we know are in there:
// Nigiri Set (6pz)
// Nigiri Set (12pz)
// Nigiri Salmone (2pz)
// Nigiri Tonno (2pz)
// Nigiri Ricciola (2pz)
// Nigiri Shiromi (2pz)
// Nigiri Mazzancolla (2pz)
// Nigiri Gambero Blu (2pz)
// Nigiri Gambero Rosso (2pz)
// Nigiri Ventresca di Salmone (2pz)
// Nigiri Ventresca di Tonno (2pz)
// 
// Hosomaki Salmone (6pz)
// Hosomaki Tonno (6pz)
// Hosomaki Mazzancolla (6pz)
// Hosomaki Ikura e Shiso (6pz)
// Hosomaki Avocado (6pz)
// Hosomaki Cetriolo (6pz)

const newNigiriSection = `  {
    id: 'section-nigiri',
    title: 'Nigiri',
    icon: 'radio_button_checked',
    bgClass: 'bg-sage-50',
    items: [
      {
        name: 'Nigiri Set (6pz)',
        price: '€ 12,00',
        description: 'Selezione mista dello chef.',
        isGlutenFree: true,
        allergens: ['fish', 'crustaceans']
      },
      {
        name: 'Nigiri Set (12pz)',
        price: '€ 24,00',
        description: 'Selezione mista dello chef.',
        isGlutenFree: true,
        allergens: ['fish', 'crustaceans']
      },
      {
        name: 'Nigiri Salmone (2pz)',
        price: '€ 4,00',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Nigiri Tonno (2pz)',
        price: '€ 5,00',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Nigiri Ricciola (2pz)',
        price: '€ 6,00',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Nigiri Shiromi (2pz)',
        price: '€ 6,00',
        description: 'Pescato locale bianco.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Nigiri Mazzancolla (2pz)',
        price: '€ 6,00',
        description: 'Mazzancolla locale bollita.',
        isGlutenFree: true,
        allergens: ['crustaceans']
      },
      {
        name: 'Nigiri Gambero Blu (2pz)',
        price: '€ 8,00',
        isGlutenFree: true,
        allergens: ['crustaceans']
      },
      {
        name: 'Nigiri Gambero Rosso (2pz)',
        price: '€ 11,00',
        isGlutenFree: true,
        allergens: ['crustaceans']
      },
      {
        name: 'Nigiri Ventresca di Salmone (2pz)',
        price: '€ 8,00',
        description: 'Su disponibilità.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Nigiri Ventresca di Tonno (2pz)',
        price: '€ 8,00',
        description: 'Su disponibilità.',
        isGlutenFree: true,
        allergens: ['fish']
      }
    ]
  },
  {
    id: 'section-hosomaki',
    title: 'Hosomaki',
    icon: 'view_week',
    bgClass: 'bg-white',
    items: [
      {
        name: 'Hosomaki Salmone (6pz)',
        price: '€ 5,00',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Hosomaki Tonno (6pz)',
        price: '€ 6,00',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Hosomaki Mazzancolla (6pz)',
        price: '€ 8,00',
        description: 'Mazzancolla locale bollita.',
        isGlutenFree: true,
        allergens: ['crustaceans']
      },
      {
        name: 'Hosomaki Ikura e Shiso (6pz)',
        price: '€ 9,00',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Hosomaki Avocado (6pz)',
        price: '€ 4,00',
        isVegetarian: true,
        isGlutenFree: true
      },
      {
        name: 'Hosomaki Cetriolo (6pz)',
        price: '€ 4,00',
        description: 'Cetriolo e sesamo.',
        isVegetarian: true,
        isGlutenFree: true,
        allergens: ['sesame']
      }
    ]
  },`;

// Replace lines 273 to 399 with newNigiriSection (need to be careful)
// Oh, the actual broken block starts around `id: 'section-nigiri'`
// Let's use regex to match from `[ \t]*\{\n[ \t]*id: 'section-nigiri',`
// down all the way to `[ \t]*name: 'Nigiri Ventresca di Tonno \(2pz\)'[\s\S]*?\]\n[ \t]*\},?`

const brokenNigiriHosomakiRegex = /[ \t]*\{\n[ \t]*id: 'section-nigiri',[\s\S]*?name: 'Nigiri Ventresca di Tonno \(2pz\)',[\s\S]*?\}\s*\]\n[ \t]*\},?/;
code = code.replace(brokenNigiriHosomakiRegex, newNigiriSection + '\n');

fs.writeFileSync('data.ts', code);
console.log('done');
