

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.items.map((item, index) => {
            const quantity = getItemQuantity(item.name);
            
            // Logica Icone Stato (Veg, Glutine, Piccante)
            // Creiamo un array per contenerle tutte se presenti contemporaneamente
            const statusIcons = [];
            if (item.isVegetarian) statusIcons.push({ icon: 'grass', title: 'Vegetariano' });
            if (item.isGlutenFree) statusIcons.push({ icon: 'eco', title: 'Senza Glutine' });
            if (item.isSpicy) statusIcons.push({ icon: 'local_fire_department', title: 'Piccante' });
            
            return (
              <div 
                key={index} 
                className="bg-cream/80 border border-wood-200/50 hover:border-sage-400 p-5 pl-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full relative"
              >
                {/* Accent bar sulla sinistra della card */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-sage-500 rounded-l-2xl opacity-60"></div>
                
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                      {/* Renderizza tutte le icone di stato applicabili */}
                      {statusIcons.map((status, idx) => (
                        <span 
                          key={idx}
                          className="material-symbols-outlined text-[18px] bg-wood-100 p-1 rounded-full text-sage-700 shadow-sm"
                          title={status.title}
                        >
                          {status.icon}
                        </span>
                      ))}
                      
                      <h5 className="text-xl font-bold text-wood-900 mr-2 leading-tight">
                        {item.name}
                      </h5>

                      {/* Allergen Icons List */}
                      {item.allergens && item.allergens.length > 0 && (
                        <div className="flex items-center gap-1 border-l-2 border-sage-200 pl-3 ml-1">
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
                     <p className="text-sm leading-relaxed max-w-full text-wood-600 mb-4 opacity-90 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Right Side: Price & Controls */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-wood-200/40">
                  <span className="font-bold text-wood-900 text-xl whitespace-nowrap bg-white/50 px-3 py-1 rounded-lg">
                    {item.price}
                  </span>
                  
                  {quantity === 0 ? (
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-wood-900 hover:bg-sage-600 text-cream px-5 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm hover:shadow active:scale-95 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      AGGIUNGI
                    </button>
                  ) : (
                    <div className="flex items-center bg-wood-900 rounded-xl p-1.5 shadow-md">
                      <button 
                        onClick={() => removeFromCart(item.name)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-wood-800 text-cream hover:bg-wood-700 transition-colors active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="w-10 text-center font-bold text-cream text-lg">{quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-sage-500 text-wood-900 hover:bg-sage-400 transition-colors active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
