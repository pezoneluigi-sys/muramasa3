
import React, { useEffect, useState } from 'react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const consent = localStorage.getItem('muramasa_cookie_consent');
    if (!consent) {
      // Delay slightly for animation effect
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('muramasa_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-wood-900 text-cream z-[80] border-t-4 border-sage-500 shadow-[0_-5px_20px_rgba(0,0,0,0.3)] p-4 md:p-6 animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm leading-relaxed text-wood-100">
            <span className="font-bold text-sage-300 block mb-1">🍪 Rispetto della tua Privacy</span>
            Utilizziamo cookie tecnici e tecnologie simili (LocalStorage) strettamente necessari per il funzionamento del carrello e del sito. 
            Per maggiori dettagli, consulta la nostra{' '}
            <button onClick={onOpenPrivacy} className="underline text-white hover:text-sage-300 font-bold">
              Cookie Policy
            </button>.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button 
            onClick={handleAccept}
            className="bg-sage-500 hover:bg-sage-400 text-wood-900 font-bold px-6 py-2 rounded-full transition-colors shadow-lg"
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
};
