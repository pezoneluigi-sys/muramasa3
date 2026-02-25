
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  activeFilter, 
  setActiveFilter 
}) => {
  const filters = [
    { id: 'all', label: 'Tutti', icon: 'restaurant' },
    { id: 'isGlutenFree', label: 'No Glutine', icon: 'eco' }, // Icona 'eco' (foglia)
    { id: 'isVegetarian', label: 'Veggy', icon: 'grass' },
    { id: 'isSpicy', label: 'Piccante', icon: 'local_fire_department' },
  ];

  return (
    <div className="sticky top-[70px] z-30 px-4 pb-6 pt-2 -mt-4 bg-gradient-to-b from-cream via-cream to-transparent pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto space-y-3">
        
        {/* Input Ricerca */}
        <div className="relative shadow-md rounded-full group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-sage-500 group-focus-within:text-sage-700 transition-colors">search</span>
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 bg-white border-2 border-wood-100 rounded-full leading-5 placeholder-wood-300 focus:outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-200 transition-all text-wood-900"
            placeholder="Cerca sushi, roll, ingredienti..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-wood-400 hover:text-wood-600"
            >
              <span className="material-symbols-outlined font-bold text-sm">close</span>
            </button>
          )}
        </div>

        {/* Filtri Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 justify-start md:justify-center">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border
                  ${isActive 
                    ? 'bg-wood-800 text-cream border-wood-900 shadow-md transform scale-105' 
                    : 'bg-white text-wood-600 border-wood-200 hover:bg-sage-50 hover:border-sage-300'
                  }`}
              >
                {f.icon && <span className="material-symbols-outlined text-[16px]">{f.icon}</span>}
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
