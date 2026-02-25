import React from 'react';
import { navigationItems } from '../data';

export const MenuGrid: React.FC = () => {
  // Funzione per gestire il click e lo scroll fluido
  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        // Calcoliamo l'altezza della navbar per non coprire il titolo
        const isMobile = window.innerWidth < 1024;
        const headerOffset = isMobile ? 120 : 90; 
        
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <section id="menu-nav" className="relative -mt-16 px-4 pb-16 z-20">
      <div className="max-w-5xl mx-auto bg-cream washi-overlay rounded-[2rem] shadow-2xl p-8 border-t-4 border-sage-500">
        <div className="text-center mb-10 relative z-10">
          <h3 className="font-serif text-3xl text-wood-900 mb-2">Il Nostro Menu</h3>
          <p className="text-wood-600">Scegli la tua esperienza</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {navigationItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleCategoryClick(e, item.id)}
              className="group relative bg-sage-500 hover:bg-sage-600 p-6 rounded-xl border border-sage-400 transition-all text-center flex flex-col items-center gap-3 h-full justify-center shadow-md hover:shadow-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl text-wood-900 group-hover:text-cream transition-colors">
                {item.icon}
              </span>
              <span className="text-sm font-bold text-wood-900 group-hover:text-cream tracking-wide">
                {item.label.toUpperCase()}
                {item.id === 'section-nigiri' && ' & HOSOMAKI'}
                {item.id === 'section-set' && ' SUSHI & SASHIMI'}
                {item.id === 'section-tartare' && ' & CARPACCI'}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};