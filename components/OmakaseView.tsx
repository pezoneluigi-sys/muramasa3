import React from 'react';
import { useCart } from '../context/CartContext';
import { omakaseData, ALLERGEN_MAP } from '../data';

export const OmakaseView: React.FC = () => {
  const { addToCart, getItemQuantity, removeFromCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif text-wood-800 mb-4">I Percorsi Omakase</h2>
        <p className="text-wood-600 max-w-2xl mx-auto">
          Lasciati guidare dall'ispirazione del nostro chef. Scegli il percorso più adatto 
          alla tua fame e ai tuoi gusti, e preparati a un'esperienza culinaria unica.
        </p>
      </div>

      <div className="space-y-8">
        {omakaseData.map((omakase) => {
          const quantity = getItemQuantity(omakase.name);

          return (
            <div 
              key={omakase.id} 
              className={`rounded-2xl shadow-sm border overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-md ${
                omakase.featured 
                  ? 'bg-wood-900 border-wood-800 text-white' 
                  : 'bg-white border-wood-100'
              }`}
            >
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative">
                {omakase.featured && (
                  <div className="absolute top-0 right-0 bg-sage-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider shadow-sm">
                    Special
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {omakase.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-3 py-1 text-xs font-medium rounded-full uppercase tracking-wider ${
                        omakase.featured 
                          ? 'bg-wood-800 text-sage-200' 
                          : 'bg-sage-50 text-sage-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className={`text-2xl font-serif ${omakase.featured ? 'text-white' : 'text-wood-900'}`}>
                    {omakase.name}
                  </h3>
                  
                  {omakase.allergens && omakase.allergens.length > 0 && (
                    <div className={`flex flex-wrap items-center gap-1 border-l pl-2 ${omakase.featured ? 'border-wood-700' : 'border-wood-300'}`}>
                      {omakase.allergens.map((allergen: string) => {
                        const info = ALLERGEN_MAP[allergen.toLowerCase()];
                        if (!info) return null;
                        return (
                          <span 
                            key={allergen}
                            className={`material-symbols-outlined text-[18px] cursor-help transition-colors ${
                              omakase.featured 
                                ? 'text-wood-400 hover:text-white' 
                                : 'text-wood-400 hover:text-wood-800'
                            }`}
                            title={`Allergene: ${info.label}`}
                          >
                            {info.icon}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <p className={`mb-6 leading-relaxed ${omakase.featured ? 'text-wood-300' : 'text-wood-600'}`}>
                  {omakase.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className={`text-xl font-medium ${omakase.featured ? 'text-white' : 'text-wood-900'}`}>
                    {omakase.price}
                  </span>
                  
                  {quantity > 0 ? (
                    <div className={`flex items-center space-x-3 rounded-full p-1 ${omakase.featured ? 'bg-wood-800' : 'bg-sage-50'}`}>
                      <button 
                        onClick={() => removeFromCart(omakase.name)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full shadow-sm transition-colors ${
                          omakase.featured 
                            ? 'bg-wood-700 text-sage-200 hover:bg-wood-600' 
                            : 'bg-white text-sage-600 hover:bg-sage-100'
                        }`}
                        aria-label="Rimuovi"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className={`font-medium w-4 text-center ${omakase.featured ? 'text-white' : 'text-sage-800'}`}>
                        {quantity}
                      </span>
                      <button 
                        onClick={() => addToCart(omakase)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full shadow-sm transition-colors ${
                          omakase.featured 
                            ? 'bg-sage-500 text-white hover:bg-sage-600' 
                            : 'bg-sage-600 text-white hover:bg-sage-700'
                        }`}
                        aria-label="Aggiungi"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(omakase)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                        omakase.featured 
                          ? 'bg-sage-600 text-white hover:bg-sage-700' 
                          : 'bg-wood-900 text-white hover:bg-wood-800'
                      }`}
                    >
                      Aggiungi all'ordine
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
