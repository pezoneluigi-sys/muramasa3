
import React from 'react';
import { assets } from '../assets';
import { contactInfo, companyInfo } from '../data';

interface FooterProps {
  onOpenLegal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer id="footer" className="bg-wood-900 text-wood-100 py-16 border-t-8 border-sage-500 relative z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            
            <div className="flex flex-col items-center md:items-start">
              <span className="font-serif text-2xl tracking-wider mb-4 text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-sage-500">
                    <path d="M12 2C10.9 2 10 2.9 10 4V18H8.5C7.12 18 6 16.88 6 15.5V10C6 9.45 5.55 9 5 9C4.45 9 4 9.45 4 10V15.5C4 17.98 6.02 20 8.5 20H10V22H14V20H15.5C17.98 20 20 17.98 20 15.5V11C20 10.45 19.55 10 19 10C18.45 10 18 10.45 18 11V15.5C18 16.88 16.88 18 15.5 18H14V4C14 2.9 13.1 2 12 2Z" />
                </svg>
                MURAMASA
              </span>
              <p className="text-sm opacity-60 leading-relaxed">
                Laboratorio di Sushi Artigianale.<br/>
                Dove la tradizione incontra l'anima zen.
              </p>
              <div className="mt-4 text-xs text-wood-400">
                <p><strong>{companyInfo.name}</strong></p>
                <p>P.IVA: {companyInfo.piva}</p>
                <p>{companyInfo.address}</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h5 className="font-bold text-sage-500 mb-4 uppercase tracking-widest text-xs">Orari & Contatti</h5>
              <p className="mb-2 text-sm opacity-80">Dal Mercoledì alla Domenica</p>
              <p className="text-lg font-serif text-white mb-4 leading-tight">18:00 - 24:00</p>
              <p className="text-sm opacity-60">Via Salvo D'Acquisto 21, Parete (CE)</p>
            </div>

            <div className="flex flex-col items-center md:items-end justify-center">
              <div className="flex gap-4 mb-6">
                <a 
                  href={contactInfo.instagram}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-wood-800 border border-wood-700 flex items-center justify-center hover:bg-sage-600 hover:border-sage-500 transition-colors text-white shadow-lg"
                >
                  <span className="material-symbols-outlined text-xl">photo_camera</span>
                </a>
              </div>
              
              <div className="flex flex-col gap-2 text-xs opacity-50 text-right">
                <button onClick={onOpenLegal} className="hover:text-white underline transition-colors">Privacy Policy</button>
                <button onClick={onOpenLegal} className="hover:text-white underline transition-colors">Cookie Policy</button>
                <p className="mt-2">© 2026 Muramasa Sushi Lab</p>
              </div>
            </div>

          </div>
        </div>
      </footer>

      <a 
        href="#" 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 transition-all hover:-translate-y-2 active:scale-95 group" 
        title="Torna su"
      >
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl filter group-hover:brightness-110 transition-all">
            <defs>
                <pattern id="cactusSkin" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                    <rect width="14" height="14" fill="#6b8a6e" />
                    <circle cx="7" cy="7" r="1.5" fill="#d3e1d5" />
                    <path d="M7 4V10 M4 7H10" stroke="#3d5240" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
            </defs>
            <path 
                d="M50 10L15 50H35V90H65V50H85L50 10Z" 
                fill="url(#cactusSkin)" 
                stroke="#3d5240" 
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
      </a>
    </>
  );
};
