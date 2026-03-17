
import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { Footer } from './components/Footer';
import { menuData } from './data';
import { CartProvider } from './context/CartContext';
import { CartFloatingBar } from './components/CartFloatingBar';
import { SearchBar } from './components/SearchBar';
import { MenuSectionData } from './types';
import { AllergenLegend } from './components/AllergenLegend';
import { PrivacyModal } from './components/PrivacyModal';
import { CookieBanner } from './components/CookieBanner';
import { OmakaseView } from './components/OmakaseView';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'omakase' | 'alacarta'>('omakase');
  
  // State for Privacy Modal
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Logica di filtraggio avanzata
  const filteredMenu = useMemo(() => {
    // Se non ci sono filtri attivi, ritorna tutto
    if (!searchTerm && activeFilter === 'all') {
      return menuData;
    }

    const lowerSearch = searchTerm.toLowerCase();

    return menuData.reduce<MenuSectionData[]>((acc, section) => {
      // Filtra gli items dentro ogni sezione
      const filteredItems = section.items.filter((item) => {
        // 1. Check Filtro Testuale (Nome o Descrizione)
        const matchesSearch = 
          item.name.toLowerCase().includes(lowerSearch) || 
          (item.description && item.description.toLowerCase().includes(lowerSearch));

        // 2. Check Filtro Categoria (Veg, Spicy, GlutenFree)
        let matchesCategory = true;
        if (activeFilter === 'isVegetarian') matchesCategory = !!item.isVegetarian;
        if (activeFilter === 'isSpicy') matchesCategory = !!item.isSpicy;
        if (activeFilter === 'isGlutenFree') matchesCategory = !!item.isGlutenFree; // Aggiornato

        return matchesSearch && matchesCategory;
      });

      // Se la sezione ha ancora elementi dopo il filtro, la aggiungiamo al risultato
      if (filteredItems.length > 0) {
        acc.push({
          ...section,
          items: filteredItems
        });
      }

      return acc;
    }, []);
  }, [searchTerm, activeFilter]);

  return (
    <CartProvider>
      <div className="font-sans antialiased smooth-scroll bg-cream pb-20">
        <Navbar viewMode={viewMode} setViewMode={setViewMode} />
        <Hero viewMode={viewMode} setViewMode={setViewMode} />

        {viewMode === 'alacarta' ? (
          <>
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <main className="w-full relative z-10 min-h-[400px]">
              {filteredMenu.length > 0 ? (
                filteredMenu.map((section, index) => (
                  <MenuSection 
                    key={section.id} 
                    data={section} 
                    isLast={index === filteredMenu.length - 1} 
                  />
                ))
              ) : (
                <div className="text-center py-20 opacity-60">
                  <span className="material-symbols-outlined text-6xl text-wood-300 mb-4">search_off</span>
                  <p className="text-xl font-serif text-wood-600">Nessun piatto trovato</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                    className="mt-4 text-sage-600 underline hover:text-sage-800"
                  >
                    Resetta filtri
                  </button>
                </div>
              )}
            </main>
          </>
        ) : (
          <OmakaseView />
        )}

        <AllergenLegend />
        
        {/* Passata la funzione per aprire la modale privacy al footer */}
        <Footer onOpenLegal={() => setIsPrivacyOpen(true)} />
        
        <CartFloatingBar />
        
        {/* Modale e Banner Privacy */}
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        <CookieBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      </div>
    </CartProvider>
  );
};

export default App;
