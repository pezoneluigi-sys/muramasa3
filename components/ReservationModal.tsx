import React, { useState } from 'react';
import { contactInfo } from '../data';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateReservation = (): boolean => {
    if (!name.trim()) {
      setError('Inserisci il tuo nome.');
      return false;
    }
    if (!date) {
      setError('Seleziona una data.');
      return false;
    }
    if (!time.trim()) {
      setError('Inserisci un orario.');
      return false;
    }
    return true;
  };

  const handleSendReservation = () => {
    if (!validateReservation()) return;

    // Emoji
    const chair = '\uD83E\uDE91'; // 🪑
    const user = '\uD83D\uDC64'; // 👤
    const clock = '\uD83D\uDD52'; // 🕒
    const calendar = '\uD83D\uDCC5'; // 📅

    let message = `*NUOVA PRENOTAZIONE SGABELLO* ${chair}\n\n`;
    message += `${user} *Nome:* ${name}\n`;
    message += `${chair} *Posti:* ${seats}\n`;
    message += `${calendar} *Data:* ${date}\n`;
    message += `${clock} *Orario:* ${time}\n`;
    message += `\n----------------------------\n`;
    message += `Richiesta prenotazione per consumazione sul posto.`;

    let phone = contactInfo.whatsapp.replace('https://wa.me/', '');
    phone = phone.replace(/\D/g, ''); 

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-wood-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-cream w-full md:max-w-md md:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col animate-slide-up">
        
        {/* Header */}
        <div className="bg-sage-500 p-4 flex items-center justify-between text-wood-900 shadow-md">
          <h3 className="font-serif text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">chair_alt</span>
            Prenota Sgabello
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-sage-600 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
            <p className="text-wood-500 text-sm">
                Prenota uno degli 8 sgabelli disponibili per consumare direttamente al bancone.
            </p>

            {/* Posti */}
            <div>
                <label className="block text-xs uppercase font-bold text-wood-500 mb-2">Numero di Posti (Max 8)</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <button
                            key={num}
                            onClick={() => setSeats(num)}
                            className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                                seats === num 
                                ? 'bg-wood-900 text-cream shadow-lg scale-110' 
                                : 'bg-wood-100 text-wood-900 hover:bg-wood-200'
                            }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            {/* Nome */}
            <div>
                <label className="block text-xs uppercase font-bold text-wood-500 mb-1">Nome *</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  placeholder="Il tuo nome"
                  className="w-full bg-wood-50 border-wood-200 rounded-lg focus:ring-sage-500 focus:border-sage-500 text-wood-900"
                />
            </div>

            {/* Data */}
            <div>
                <label className="block text-xs uppercase font-bold text-wood-500 mb-1">Data *</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => { setDate(e.target.value); setError(''); }}
                  className="w-full bg-wood-50 border-wood-200 rounded-lg focus:ring-sage-500 focus:border-sage-500 text-wood-900"
                />
            </div>

            {/* Orario */}
            <div>
                <label className="block text-xs uppercase font-bold text-wood-500 mb-1">Orario Arrivo *</label>
                <input 
                  type="text" 
                  value={time}
                  onChange={(e) => { setTime(e.target.value); setError(''); }}
                  placeholder="Es. 20:30"
                  className="w-full bg-wood-50 border-wood-200 rounded-lg focus:ring-sage-500 focus:border-sage-500 text-wood-900"
                />
            </div>

            {error && (
                <p className="text-red-500 text-sm font-bold bg-red-50 p-2 rounded flex items-center gap-1">
                   <span className="material-symbols-outlined text-sm">error</span>
                   {error}
                </p>
            )}

            <button 
                onClick={handleSendReservation}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm py-3 rounded-xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <span>INVIA PRENOTAZIONE</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};
