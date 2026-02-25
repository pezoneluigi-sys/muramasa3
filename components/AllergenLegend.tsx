
import React from 'react';
import { ALLERGEN_MAP } from '../data';

export const AllergenLegend: React.FC = () => {
  return (
    <section className="bg-wood-100 py-12 px-4 border-t border-wood-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <h4 className="font-serif text-2xl text-wood-900 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sage-600">info</span>
                Guida agli Allergeni
            </h4>
            <p className="text-sm text-wood-600 mt-2 max-w-2xl mx-auto leading-relaxed italic">
                La sicurezza dei nostri clienti è fondamentale. Ecco la legenda delle icone che troverai accanto ai piatti.
                In caso di allergie o intolleranze gravi, si prega di avvisare sempre lo staff prima di ordinare.
            </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.values(ALLERGEN_MAP).map((allergen, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-wood-200">
                    <span className="material-symbols-outlined text-wood-500 text-xl">{allergen.icon}</span>
                    <span className="text-sm font-bold text-wood-800">{allergen.label}</span>
                </div>
            ))}
        </div>
        
        <div className="mt-8 text-center border-t border-wood-200 pt-6">
             <p className="text-xs text-wood-500">
                * Le preparazioni avvengono in un unico ambiente, pertanto non si può escludere completamente il rischio di contaminazione crociata.
            </p>
        </div>
      </div>
    </section>
  );
};
