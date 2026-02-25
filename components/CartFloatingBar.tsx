
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckoutModal } from './CheckoutModal';

export const CartFloatingBar: React.FC = () => {
  const { totalItems, totalPrice } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      // Se il carrello si svuota mentre la modale è chiusa, assicuriamoci che resti logico, 
      // ma se è aperta la gestiamo dentro la modale stessa.
    }
  }, [totalItems]);

  if (!isVisible && !isModalOpen) return null;

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-0 left-0 w-full z-40 p-4 animate-slide-up">
          <div 
            className="max-w-xl mx-auto bg-wood-900 text-cream rounded-2xl shadow-2xl p-4 flex items-center justify-between border-t-2 border-sage-500 cursor-pointer hover:bg-wood-800 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center gap-3">
              <div className="bg-sage-500 text-wood-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-inner">
                {totalItems}
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-sage-300">Il tuo ordine</span>
                <span className="font-serif text-xl leading-none">€ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pr-2">
                <span className="font-bold tracking-wide">VEDI CARRELLO</span>
                <span className="material-symbols-outlined">shopping_bag</span>
            </div>
          </div>
          <style>{`
            @keyframes slide-up {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            .animate-slide-up {
              animation: slide-up 0.3s ease-out forwards;
            }
          `}</style>
        </div>
      )}

      <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
