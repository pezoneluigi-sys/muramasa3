import React from 'react';
import { assets } from '../assets';

export const Story: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-sage-500 text-cream relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ backgroundImage: `url('${assets.storyBackground}')` }}
      ></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h3 className="font-serif text-4xl mb-6">Il Viaggio di Muramasa</h3>
            <p className="text-lg mb-6 leading-relaxed opacity-90">
              La leggenda narra di un cactus samurai solitario, Muramasa, che depose la sua katana per impugnare il coltello da sushi. Dalle aride terre deserte ai mari profondi del Giappone, il suo viaggio è la ricerca della perfezione.
            </p>
            <p className="text-lg mb-8 leading-relaxed opacity-90">
              Ogni piatto nel nostro laboratorio è un tributo a quella disciplina: taglio netto, sapore puro, cuore caldo.
            </p>
            <div className="inline-block border border-cream/30 px-6 py-3 rounded-lg bg-wood-900/10">
              <p className="font-serif italic">"Il vero guerriero non combatte, cucina."</p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 bg-wood-900 rounded-full flex items-center justify-center border-4 border-wood-800 shadow-2xl">
              <div className="absolute inset-2 border border-cream/20 rounded-full"></div>
              <img 
                src={assets.storyImage}
                alt="Muramasa Story" 
                className="w-64 h-auto transform hover:scale-105 transition-transform duration-500 drop-shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};