import React, { useState } from 'react';
import { assets } from '../assets';
import { contactInfo } from '../data';
import { ReservationModal } from './ReservationModal';

export const Hero: React.FC = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <header className="relative pt-32 pb-32 px-4 text-center overflow-hidden bg-wood-900 bg-wood-texture text-cream mt-10">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="w-64 h-64 bg-sage-500 rounded-full absolute -top-10 left-1/2 -translate-x-1/2 -z-10 opacity-20 blur-3xl"></div>
        
        <div className="mb-8 flex justify-center">
          {/* Rimosso p-2 e aggiunto overflow-hidden stretto per adattare l'immagine */}
          <div className="w-32 h-32 rounded-full bg-wood-800 shadow-xl overflow-hidden border-4 border-sage-500">
            <img 
              src={assets.logoLarge}
              alt="Muramasa Logo" 
              /* object-cover riempie tutto, scale-105 rimuove eventuali bordini bianchi della foto */
              className="w-full h-full object-cover filter brightness-110 transform scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl text-sage-100 mb-4 leading-tight">
          Muramasa Sushi Lab
        </h1>
        <h2 className="text-xl md:text-2xl text-sage-300 font-light mb-6 tracking-wide">
          Il Sushi che Punge
        </h2>
        
        <div className="w-16 h-1 bg-sage-500 mx-auto mb-6 rounded-full opacity-60"></div>
        
        <p className="text-wood-200 font-light tracking-wide uppercase text-sm mb-12">
          taglio netto, pesce fresco, zero compromessi
        </p>

        <button 
          onClick={() => setIsReservationOpen(true)}
          className="inline-flex items-center gap-3 bg-wood-800 hover:bg-wood-700 text-cream text-lg px-8 py-4 rounded-full font-bold shadow-[0_4px_0_0_#2d241f] hover:shadow-[0_2px_0_0_#2d241f] hover:translate-y-[2px] transition-all border-2 border-wood-600 group"
        >
          PRENOTA SGABELLO
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chair_alt</span>
        </button>

      </div>
      
      <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
    </header>
  );
};