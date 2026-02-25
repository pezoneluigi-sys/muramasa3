

import React from 'react';
import { MenuSectionData } from '../types';
import { useCart } from '../context/CartContext';
import { ALLERGEN_MAP } from '../data';

interface MenuSectionProps {
  data: MenuSectionData;
  isLast?: boolean;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ data, isLast }) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  return (
    <section 
      id={data.id} 
      className={`py-24 px-4 scroll-mt-28 ${data.bgClass || ''} border-b-4 border-sage-500 ${isLast ? 'border-b-0' : ''}`}
    >
      <div className="max-w-4xl mx-auto pt-8 relative z-10">
        <h4 className="font-serif text-3xl text-wood-900 mb-10 flex items-center justify-center gap-3 border-b-2 border-sage-500 pb-4 w-fit mx-auto">
          <span className="material-symbols-outlined text-sage-600">{data.icon}</span>
          {data.title.toUpperCase()}
        </h4>

        <div className="space-y-8">
          {data.items.map((item, index) => {
            const quantity = getItemQuantity(item.name);
            
            // Logica Icone Stato (Veg, Glutine, Piccante)
            // Creiamo un array per contenerle tutte se presenti contemporaneamente
            const statusIcons = [];
            if (item.isVegetarian) statusIcons.push({ icon: 'grass', title: 'Vegetariano' });
            if (item.isGlutenFree) statusIcons.push({ icon: 'eco', title: 'Senza Glutine' });
            if (item.isSpicy) statusIcons.push({ icon: 'local_fire_department', title: 'Piccante' });
            
            return (
              <div key={index}>
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-3">
                  {/* Left Side: Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        {/* Renderizza tutte le icone di stato applicabili */}
                        {statusIcons.map((status, idx) => (
                          <span 
                            key={idx}
                            className="material-symbols-outlined text-sm text-sage-600"
                            title={status.title}
                          >
                            {status.icon}
                          </span>
                        ))}
                        
                        <h5 className="text-lg font-bold text-wood-900 mr-2">
                          {item.name}
                        </h5>

                        {/* Allergen Icons List */}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="flex items-center gap-1 border-l border-wood-300 pl-2">
                            {item.allergens.map((allergen) => {
                              const info = ALLERGEN_MAP[allergen.toLowerCase()];
                              if (!info) return null;
                              return (
                                <span 
                                  key={allergen}
                                  className="material-symbols-outlined text-[16px] text-wood-400 cursor-help hover:text-wood-800 transition-colors"
                                  title={`Allergene: ${info.label}`}
                                >
                                  {info.icon}
                                </span>
                              );
                            })}
                          </div>
                        )}
                    </div>
                    {item.description && (
                      <p className="text-sm leading-snug max-w-lg text-wood-500 italic">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Right Side: Price & Controls */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 md:gap-2 mt-2 md:mt-0">
                    <span className="font-medium text-wood-900 text-lg whitespace-nowrap">{item.price}</span>
                    
                    {quantity === 0 ? (
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-wood-100 hover:bg-sage-200 text-wood-800 px-4 py-1.5 rounded-full text-sm font-bold transition-colors border border-wood-200 shadow-sm flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                        AGGIUNGI
                      </button>
                    ) : (
                      <div className="flex items-center bg-wood-900 rounded-full p-1 shadow-md">
                        <button 
                          onClick={() => removeFromCart(item.name)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-wood-800 text-cream hover:bg-wood-700 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-8 text-center font-bold text-cream text-sm">{quantity}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-sage-500 text-wood-900 hover:bg-sage-400 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Separator */}
                <div className="border-b border-dotted border-wood-200 mt-6 w-full opacity-50"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
