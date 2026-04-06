import React from 'react';
import { assets } from '../assets';

interface LandingViewProps {
  onStartChat: () => void;
  onShowMenu: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStartChat, onShowMenu }) => {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Sfondo decorativo molto leggero */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sage-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-wood-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-md w-full flex flex-col items-center">
        {/* Logo / Cactus */}
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-wood-800 shadow-2xl overflow-hidden border-4 border-sage-500 mb-8 animate-float">
          <img 
            src={assets.logoLarge}
            alt="Muramasa Cactus" 
            className="w-full h-full object-cover filter brightness-110 transform scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-wood-900 mb-4 tracking-tight">
          Benvenuto da Muramasa
        </h1>
        
        <p className="text-lg text-wood-600 mb-12 font-light">
          Il sushi che punge. Lasciati guidare in un'esperienza su misura.
        </p>

        <div className="flex flex-col w-full gap-4">
          <button 
            onClick={onStartChat}
            className="w-full bg-sage-600 hover:bg-sage-700 text-cream text-xl px-8 py-5 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
          >
            <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
              psychiatry
            </span>
            Inizia l'esperienza con Muramasa
          </button>

          <button 
            onClick={onShowMenu}
            className="w-full bg-transparent hover:bg-wood-100 text-wood-500 text-sm px-8 py-4 rounded-2xl font-medium transition-all"
          >
            Fammi vedere il menu classico
          </button>
        </div>
      </div>
    </div>
  );
};
