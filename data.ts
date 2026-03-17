

import { MenuSectionData, NavigationItem } from './types';

// ----------------------------------------------------------------------
// DATI AZIENDALI (OBBLIGATORI PER LEGGE ITALIANA)
// ----------------------------------------------------------------------
export const companyInfo = {
  name: "Muramasa di Luigi Pezone",
  address: "Via Salvo D'Acquisto 21, 81030 Parete (CE)",
  piva: "04926180615",
  email: "info@muramasasushi.it", // Inserisci qui la tua email reale se diversa
  pec: "muramasa@pec.it" // Inserisci qui la tua PEC reale se diversa
};

// ----------------------------------------------------------------------
// CONFIGURAZIONE CONTATTI
// ----------------------------------------------------------------------
export const contactInfo = {
  whatsapp: "https://wa.me/393520098737", 
  instagram: "https://www.instagram.com/muramasasushi1?igsh=MWZtMXIwankwOXIzbg=="
};

// ----------------------------------------------------------------------
// MAPPATURA ALLERGENI (Icone e Etichette)
// ----------------------------------------------------------------------
export const ALLERGEN_MAP: Record<string, { icon: string; label: string }> = {
  gluten: { icon: 'grain', label: 'Glutine' },
  crustaceans: { icon: 'waves', label: 'Crostacei' },
  eggs: { icon: 'egg', label: 'Uova' },
  fish: { icon: 'set_meal', label: 'Pesce' },
  peanuts: { icon: 'cookie', label: 'Arachidi' },
  soy: { icon: 'spa', label: 'Soia' },
  milk: { icon: 'water_drop', label: 'Latte' },
  nuts: { icon: 'forest', label: 'Frutta a guscio' },
  celery: { icon: 'grass', label: 'Sedano' },
  mustard: { icon: 'liquor', label: 'Senape' },
  sesame: { icon: 'scatter_plot', label: 'Sesamo' },
  sulfites: { icon: 'science', label: 'Solfiti' },
  lupins: { icon: 'local_florist', label: 'Lupini' },
  molluscs: { icon: 'sailing', label: 'Molluschi' },
};

// ----------------------------------------------------------------------
// 📝 GUIDA PARAMETRI PIATTO
// ----------------------------------------------------------------------

export const navigationItems: NavigationItem[] = [
  { id: 'section-signature', label: 'Signature', icon: 'diamond' },
  { id: 'section-antipasti', label: 'Antipasti', icon: 'tapas' },
  { id: 'section-tartare', label: 'Tartare', icon: 'set_meal' },
  { id: 'section-sashimi', label: 'Sashimi', icon: 'phishing' },
  { id: 'section-nigiri', label: 'Nigiri', icon: 'radio_button_checked' },
  { id: 'section-temaki', label: 'Temaki', icon: 'icecream' },
  { id: 'section-uramaki', label: 'Uramaki', icon: 'donut_large' },
  { id: 'section-bevande', label: 'Bevande', icon: 'local_bar' },
  { id: 'section-vino', label: 'Vino', icon: 'wine_bar' },
];

export const omakaseData: any[] = [
  {
    id: 'elogio-del-salmone',
    name: 'L\'Elogio del Salmone',
    price: '€ 25,00',
    description: 'Un percorso studiato per gli amanti del salmone. Include: Tartare di salmone, 4pz nigiri salmone, 2pz sashimi salmone, 4pz uramaki philadelphia, 4pz uramaki salmone e avocado.',
    tags: ['Salmone', 'Selezione'],
    allergens: ['gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts', 'celery', 'mustard', 'sesame', 'sulfites', 'lupins', 'molluscs']
  },
  {
    id: 'rispetto-per-il-tonno',
    name: 'Il Rispetto per il Tonno',
    price: '€ 28,00',
    description: 'Un percorso studiato per chi apprezza la complessità del tonno. Include: Carpaccio di tonno 6pz, 4pz nigiri tonno, 2pz sashimi tonno, 4pz uramaki tonno e avocado, 6pz hosomaki tonno.',
    tags: ['Tonno', 'Selezione'],
    allergens: ['gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts', 'celery', 'mustard', 'sesame', 'sulfites', 'lupins', 'molluscs']
  },
  {
    id: 'l-intreccio',
    name: 'L\'Intreccio',
    price: '€ 25,00',
    description: 'Un percorso studiato per gli amanti degli uramaki. Include: 1 porzione di takoyaki o yakitori, 4pz uramaki salmone crudo, 4pz uramaki salmone cotto, 4pz uramaki gambero in tempura, 4pz uramaki tonno, 4pz uramaki pesce bianco.',
    tags: ['Uramaki', 'Selezione'],
    allergens: ['gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts', 'celery', 'mustard', 'sesame', 'sulfites', 'lupins', 'molluscs']
  },
  {
    id: 'la-fiamma',
    name: 'La Fiamma',
    price: '€ 22,00',
    description: 'Un percorso studiato per chi preferisce il cotto. Include: Una porzione di edamame, 4 nigiri salmone scottati, 4pz sake nikkei, 4pz kingroll, un hosomaki avocado e sesamo.',
    tags: ['Cotto', 'Selezione'],
    allergens: ['gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts', 'celery', 'mustard', 'sesame', 'sulfites', 'lupins', 'molluscs']
  },
  {
    id: 'la-radice',
    name: 'La Radice',
    price: '€ 16,00',
    description: 'Un percorso per i nostri amici vegetariani. Include: Una porzione goma wakame, 8pz uramaki vegetariano, 6pz hosomaki cetriolo e shiso, 6pz hosomaki avocado e sesamo.',
    tags: ['Vegetariano', 'Selezione'],
    allergens: ['gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts', 'celery', 'mustard', 'sesame', 'sulfites', 'lupins', 'molluscs']
  },
  {
    id: 'l-origine',
    name: 'L\'Origine',
    price: '€ 30,00',
    description: 'Un percorso per i puristi, solo riso e pesce. Include: Una porzione di edamame, 6pz nigiri misti, 6pz sashimi misto, 12pz hosomaki misto.',
    tags: ['Puristi', 'Selezione'],
    allergens: ['gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts', 'celery', 'mustard', 'sesame', 'sulfites', 'lupins', 'molluscs']
  },
  {
    id: 'la-sottrazione',
    name: 'La Sottrazione',
    price: '€ 32,00',
    description: 'Un percorso studiato per chi è alla ricerca di proteine nobili pure. Include: 1 carpaccio di pesce bianco, 12 fette di sashimi misto, 1 tartare di salmone o tonno.',
    tags: ['Proteine', 'Selezione'],
    allergens: ['gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts', 'celery', 'mustard', 'sesame', 'sulfites', 'lupins', 'molluscs']
  },
  {
    id: 'l-istinto',
    name: 'L\'Istinto',
    price: '€ 30,00',
    description: 'L\'intuizione del giorno. Aggiungi solo il numero di persone, al resto ci pensa Muramasa.',
    tags: ['Sorpresa', 'Chef'],
    featured: true,
    allergens: ['gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts', 'celery', 'mustard', 'sesame', 'sulfites', 'lupins', 'molluscs']
  }
];

export const menuData: MenuSectionData[] = [
  {
    id: 'section-signature',
    title: 'Uramaki Signature',
    icon: 'diamond',
    bgClass: 'bg-cream washi-overlay',
    items: [
      {
        name: 'Ichigo Okoku',
        price: '€ 20,00',
        description: 'Ricciola, shiso e cetrioli, esterno carpaccio gambero rosso, tartare di fragole con pepe e gocce di aceto balsamico tradizionale di modena dop.',
        isGlutenFree: true,
        allergens: ['fish', 'crustaceans']
      },
      {
        name: 'Shio Sake',
        price: '€ 16,00',
        description: 'Salmone marinato, avocado e ikura, sopra carpaccio di salmone marinato, mayo all\'aneto e chips di topinambur.',
        isGlutenFree: true,
        allergens: ['fish', 'eggs', 'mustard']
      },
      {
        name: 'Maguro Tate',
        price: '€ 22,00',
        description: 'Akami di tonno, erba cipollina, sopra carpaccio scottato di capasanta, ponzu e tartufo nero pregiato(selezione lady truffle).',
        allergens: ['fish', 'molluscs', 'soy', 'gluten']
      }
    ]
  },
  {
    id: 'section-antipasti',
    title: 'Antipasti',
    icon: 'tapas',
    bgClass: 'bg-cream washi-overlay',
    items: [
      {
        name: 'Guacamole con chips di platano',
        price: '€ 8,00',
        description: 'Guacamole preparata al momento servita con chips di platano.',
        isVegetarian: true,
        isGlutenFree: true,
      },
      {
        name: 'Edamame',
        price: '€ 4,00',
        description: 'Fagioli di soia al vapore con sale Maldon.',
        isVegetarian: true,
        isGlutenFree: true,
        allergens: ['soy']
      },
      {
        name: 'Edamame Spicy',
        price: '€ 4,00',
        description: 'Fagioli di soia saltati con salsa piccante.',
        isVegetarian: true,
        isSpicy: true,
        isGlutenFree: true,
        allergens: ['soy', 'sesame']
      },
      {
        name: 'Goma Wakame',
        price: '€ 4,00',
        description: 'Insalata di alghe marinate con sesamo.',
        isVegetarian: true,
        allergens: ['sesame', 'soy', 'gluten']
      },
      {
        name: 'Gyoza Pollo',
        price: '€ 4,00',
        description: 'Ravioli ripieni di pollo.',
        allergens: ['gluten', 'soy', 'sesame']
      },
      {
        name: 'Gyoza Veg',
        price: '€ 4,00',
        description: 'Ravioli ripieni di verdure.',
        isVegetarian: true,
        allergens: ['gluten', 'soy', 'sesame']
      },
      {
        name: 'Yakitori Pollo',
        price: '€ 5,00',
        description: 'Spiedini di pollo glassati in teriyaki con erba cipollina.',
        allergens: ['soy', 'gluten']
      },
      {
        name: 'Takoyaki',
        price: '€ 5,00',
        description: 'Polpettine di polpo fritte con salsa BBQ e katsuobushi.',
        allergens: ['molluscs', 'fish', 'gluten', 'eggs', 'soy']
      },
      {
        name: 'Tempura di Gamberi (4pz)',
        price: '€ 9,00',
        description: 'Gamberi fritti in pastella con salsa tentsuyu.',
        allergens: ['crustaceans', 'gluten', 'soy', 'fish']
      }
    ]
  },
  {
    id: 'section-tartare',
    title: 'Tartare & Carpacci',
    icon: 'set_meal',
    bgClass: 'bg-sage-50',
    items: [
      {
        name: 'Tartare di Salmone',
        price: '€ 9,00',
        description: 'Avocado, salmone, salsa ponzu, olio E.V.O., furikake vegetale.',
        allergens: ['fish', 'soy', 'sesame', 'gluten']
      },
      {
        name: 'Tartare di Tonno',
        price: '€ 10,00',
        description: 'Avocado, salsa ponzu, olio di sesamo e sesamo.',
        allergens: ['fish', 'soy', 'sesame', 'gluten']
      },
      {
        name: 'Tartare di Ricciola',
        price: '€ 13,00',
        description: 'Avocado, salsa ponzu, olio E.V.O., zest di lime.',
        allergens: ['fish', 'soy', 'gluten']
      },
      {
        name: 'Carpaccio di Salmone (9pz)',
        price: '€ 9,00',
        description: 'Salsa ponzu, olio E.V.O., sale Maldon.',
        allergens: ['fish', 'soy', 'gluten']
      },
      {
        name: 'Carpaccio di Orata o Spigola',
        price: '€ 9,00',
        description: 'Salsa ponzu, olio E.V.O., sale Maldon.',
        allergens: ['fish', 'soy', 'gluten']
      },
      {
        name: 'Carpaccio Misto (9pz)',
        price: '€ 10,00',
        description: 'Salsa ponzu, olio E.V.O., sale Maldon.',
        allergens: ['fish', 'soy', 'gluten']
      }
    ]
  },
  {
    id: 'section-sashimi',
    title: 'Sashimi',
    icon: 'phishing',
    bgClass: 'bg-cream washi-overlay',
    items: [
      {
        name: 'Sashimi Misto (6pz)',
        price: '€ 9,00',
        description: 'Selezione mista dello chef.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Sashimi Misto (12pz)',
        price: '€ 17,00',
        description: 'Selezione mista dello chef.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Sashimi Misto (24pz)',
        price: '€ 33,00',
        description: 'Selezione mista dello chef.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Sashimi Salmone (4pz)',
        price: '€ 5,50',
        description: 'Taglio pregiato di salmone.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Sashimi Tonno (4pz)',
        price: '€ 6,00',
        description: 'Taglio pregiato di tonno.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Sashimi Ricciola (4pz)',
        price: '€ 7,00',
        description: 'Taglio pregiato di ricciola.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Shiromi (4pz)',
        price: '€ 7,00',
        description: 'Pescato locale bianco del giorno.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Gambero Blu (1pz)',
        price: '€ 4,00',
        description: 'Gambero blu della Nuova Caledonia.',
        isGlutenFree: true,
        allergens: ['crustaceans']
      },
      {
        name: 'Gambero Rosso (1pz)',
        price: '€ 6,00',
        description: 'Gambero rosso di Mazara.',
        isGlutenFree: true,
        allergens: ['crustaceans']
      },
      {
        name: 'Tataki Salmone (4pz)',
        price: '€ 7,00',
        description: 'Salmone scottato.',
        allergens: ['fish', 'soy', 'sesame']
      },
      {
        name: 'Tataki Tonno (4pz)',
        price: '€ 7,00',
        description: 'Tonno scottato.',
        allergens: ['fish', 'soy', 'sesame']
      },
      {
        name: 'Tataki Ricciola (4pz)',
        price: '€ 9,00',
        description: 'Ricciola scottata.',
        allergens: ['fish', 'soy', 'sesame']
      }
    ]
  },
  {
    id: 'section-nigiri',
    title: 'Nigiri & Hosomaki',
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
      },
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
        description: 'Cetriolo, shiso e sesamo.',
        isVegetarian: true,
        isGlutenFree: true,
        allergens: ['sesame']
      }
    ]
  },
  {
    id: 'section-temaki',
    title: 'Temaki',
    icon: 'icecream',
    bgClass: 'bg-cream washi-overlay',
    items: [
      {
        name: 'Temaki Salmone',
        price: '€ 5,00',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Temaki Salmone Spicy',
        price: '€ 6,00',
        isSpicy: true,
        allergens: ['fish', 'eggs', 'sesame', 'gluten']
      },
      {
        name: 'Temaki Tonno',
        price: '€ 5,00',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Temaki Tonno Spicy',
        price: '€ 6,00',
        isSpicy: true,
        allergens: ['fish', 'eggs', 'sesame', 'gluten']
      },
      {
        name: 'Temaki Ebi Tempura',
        price: '€ 5,00',
        description: 'Gambero in tempura e salsa teriyaki.',
        allergens: ['crustaceans', 'gluten', 'soy']
      },
      {
        name: 'Temaki Ebi Tempura Spicy',
        price: '€ 6,00',
        description: 'Gambero in tempura e salsa piccante.',
        isSpicy: true,
        allergens: ['crustaceans', 'gluten', 'eggs', 'sesame']
      }
    ]
  },
  {
    id: 'section-uramaki',
    title: 'Uramaki',
    icon: 'donut_large',
    bgClass: 'bg-sage-50',
    items: [
      {
        name: 'Philadelphia',
        price: '€ 9,00',
        description: 'Salmone, philadelphia, esterno sesamo.',
        isGlutenFree: true,
        allergens: ['fish', 'milk', 'sesame']
      },
      {
        name: 'California Ebi',
        price: '€ 12,00',
        description: 'Mazzancolla bollita, avocado, cetriolo, maionese giapponese, esterno sesamo.',
        isGlutenFree: true,
        allergens: ['crustaceans', 'eggs', 'sesame', 'mustard']
      },
      {
        name: 'California',
        price: '€ 8,00',
        description: 'Surimi, avocado, maionese giapponese, esterno sesamo.',
        allergens: ['crustaceans', 'fish', 'eggs', 'sesame', 'mustard', 'gluten']
      },
      {
        name: 'Sake Avocado',
        price: '€ 10,00',
        description: 'Salmone, avocado, esterno carpaccio di salmone.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Tonno e Avocado',
        price: '€ 12,00',
        description: 'Tonno, avocado, esterno carpaccio di tonno.',
        isGlutenFree: true,
        allergens: ['fish']
      },
      {
        name: 'Ricciola, Kappa e Shiso',
        price: '€ 12,00',
        description: 'Ricciola, cetriolo e shiso, esterno furikake vegetale.',
        allergens: ['fish', 'sesame', 'gluten']
      },
      {
        name: 'Sake Spicy',
        price: '€ 9,00',
        description: 'Interno avocado, sopra tartare di salmone piccante e jalapeño, sesamo bianco.',
        isSpicy: true,
        allergens: ['fish', 'eggs', 'sesame', 'gluten']
      },
      {
        name: 'Tonno Spicy',
        price: '€ 10,00',
        description: 'Interno avocado, sopra tartare di tonno piccante e jalapeño.',
        isSpicy: true,
        allergens: ['fish', 'eggs', 'sesame', 'gluten']
      },
      {
        name: 'Sake Nikkei',
        price: '€ 12,00',
        description: 'Salmone cotto e philadelphia, coperto di salmone scottato, salsa agrodolce e teriyaki.',
        allergens: ['fish', 'milk', 'soy', 'gluten']
      },
      {
        name: 'King Roll',
        price: '€ 10,00',
        description: 'Gambero in tempura, avocado, iceberg, esterno sesamo e tobiko.',
        allergens: ['crustaceans', 'gluten', 'sesame', 'fish']
      }
    ]
  },

  {
    id: 'section-bevande',
    title: 'Bevande',
    icon: 'local_bar',
    bgClass: 'bg-sage-50',
    items: [
      {
        name: 'Sake Shika 200ml',
        price: '€ 4,00',
      },
      {
        name: 'Sake Junmai 300ml',
        price: '€ 8,00',
      },
      {
        name: 'Sake Frizzante 250ml',
        price: '€ 8,00',
      },
      {
        name: 'Birra Asahi 330ml',
        price: '€ 4,00',
        allergens: ['gluten']
      },
      {
        name: 'Birra Kirin 330ml',
        price: '€ 4,00',
        allergens: ['gluten']
      },
      {
        name: 'Ramune Yuzu 200ml',
        price: '€ 4,00',
        description: 'Soda giapponese gusto yuzu.'
      },
      {
        name: 'Ramune Classica',
        price: '€ 4,00',
        description: 'Soda giapponese.'
      },
      {
        name: 'Acqua Liscia 500ml',
        price: '€ 1,50',
      },
      {
        name: 'Acqua Frizzante 500ml',
        price: '€ 1,50',
      }
    ]
  },
  {
    id: 'section-vino',
    title: 'Vino',
    icon: 'wine_bar',
    bgClass: 'bg-cream washi-overlay',
    items: [
      {
        name: 'Intruso Brillo con il naso all\'insù 750ml',
        price: '€ 22,00',
        description: 'Asprinio rifermentato.',
        allergens: ['sulfites']
      },
      {
        name: 'Giusto un litro bianco 1L',
        price: '€ 18,00',
        description: 'Pallagrello bianco e asprinio.',
        allergens: ['sulfites']
      },
      {
        name: 'Giusto un litro rosso 1L',
        price: '€ 20,00',
        description: 'Pallagrello e casavecchia.',
        allergens: ['sulfites']
      }
    ]
  }
];
