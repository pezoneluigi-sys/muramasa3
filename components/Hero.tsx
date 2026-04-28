import React, { useState } from 'react';
import { assets } from '../assets';
import { contactInfo } from '../data';
import { ReservationModal } from './ReservationModal';
import { GiftCardModal } from './GiftCardModal';

export const Hero: React.FC = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);

  return (
    <header className="relative pt-24 pb-8 px-4 text-center overflow-hidden bg-wood-900 bg-wood-texture text-cream mt-10">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="w-64 h-64 bg-sage-500 rounded-full absolute -top-10 left-1/2 -translate-x-1/2 -z-10 opacity-20 blur-3xl"></div>

        {/* Secondary Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setIsReservationOpen(true)}
              className="inline-flex items-center gap-3 bg-sage-500 hover:bg-sage-400 text-wood-900 text-lg px-8 py-4 rounded-full font-bold shadow-[0_4px_0_0_#3d5240] hover:shadow-[0_2px_0_0_#3d5240] hover:translate-y-[2px] transition-all border-2 border-sage-600 group w-full md:w-auto justify-center uppercase"
            >
              PRENOTA SGABELLO
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chair_alt</span>
            </button>

            <button 
              onClick={() => setIsGiftCardOpen(true)}
              className="inline-flex items-center gap-3 bg-sage-500 hover:bg-sage-400 text-wood-900 text-lg px-8 py-4 rounded-full font-bold shadow-[0_4px_0_0_#3d5240] hover:shadow-[0_2px_0_0_#3d5240] hover:translate-y-[2px] transition-all border-2 border-sage-600 group w-full md:w-auto justify-center uppercase"
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