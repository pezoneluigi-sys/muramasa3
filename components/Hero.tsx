import React, { useState } from 'react';
import { assets } from '../assets';
import { contactInfo } from '../data';
import { ReservationModal } from './ReservationModal';
import { GiftCardModal } from './GiftCardModal';

export const Hero: React.FC = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);

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

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setIsReservationOpen(true)}
              className="inline-flex items-center gap-3 bg-sage-500 hover:bg-sage-400 text-wood-900 text-lg px-8 py-4 rounded-full font-bold shadow-[0_4px_0_0_#3d5240] hover:shadow-[0_2px_0_0_#3d5240] hover:translate-y-[2px] transition-all border-2 border-sage-600 group w-full md:w-auto justify-center"
            >
              PRENOTA SGABELLO
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chair_alt</span>
            </button>

            <button 
              onClick={() => setIsGiftCardOpen(true)}
              className="inline-flex items-center gap-3 bg-sage-500 hover:bg-sage-400 text-wood-900 text-lg px-8 py-4 rounded-full font-bold shadow-[0_4px_0_0_#3d5240] hover:shadow-[0_2px_0_0_#3d5240] hover:translate-y-[2px] transition-all border-2 border-sage-600 group w-full md:w-auto justify-center"
            >
              REGALA GIFT CARD
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">card_giftcard</span>
            </button>
        </div>

      </div>
      
      <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
      <GiftCardModal isOpen={isGiftCardOpen} onClose={() => setIsGiftCardOpen(false)} />
    </header>
  );
};