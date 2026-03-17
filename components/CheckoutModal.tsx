
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { contactInfo } from '../data';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, totalPrice, addToCart, removeFromCart } = useCart();
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Validazione comune
  const validateOrder = (): boolean => {
    if (!name.trim()) {
      setError('Inserisci il tuo nome per ordinare.');
      return false;
    }
    if (!time.trim()) {
      setError('Inserisci un orario per il ritiro.');
      return false;
    }
    return true;
  };

  const handleSendOrder = () => {
    if (!validateOrder()) return;

    // Emoji Unicode
    const sushi = '\uD83C\uDF63'; // 🍣
    const user = '\uD83D\uDC64'; // 👤
    const clock = '\uD83D\uDD52'; // 🕒
    const bag = '\uD83D\uDECD'; // 🛍️
    const memo = '\uD83D\uDCDD'; // 📝
    const money = '\uD83D\uDCB0'; // 💰
    const dot = '\u25AA'; // ▪️

    // 1. Costruisci il messaggio
    let message = `*NUOVO ORDINE MURAMASA* ${sushi}\n\n`;
    message += `${user} *Cliente:* ${name}\n`;
    message += `${bag} *MODALITÀ:* Ritiro al Locale\n`;
    message += `${clock} *Orario:* ${time}\n`;
    
    if (notes.trim()) {
      message += `${memo} *Note:* ${notes}\n`;
    }
    message += `\n----------------------------\n`;

    cart.forEach(item => {
      message += `${dot} ${item.quantity}x ${item.name} (${item.price})\n`;
    });

    message += `----------------------------\n`;
    message += `${money} *TOTALE: € ${totalPrice.toFixed(2).replace('.', ',')}*\n`;

    // 2. Crea il link WhatsApp
    let phone = contactInfo.whatsapp.replace('https://wa.me/', '');
    phone = phone.replace(/\D/g, ''); 

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    // 3. Apri WhatsApp
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-wood-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-cream w-full md:max-w-lg md:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh] animate-slide-up">
        
        {/* Header */}
        <div className="bg-sage-500 p-4 flex items-center justify-between text-wood-900 shadow-md flex-shrink-0">
          <h3 className="font-serif text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">receipt_long</span>
            Il tuo Ordine
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-sage-600 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="text-center py-10 opacity-50">
              <span className="material-symbols-outlined text-4xl mb-2">remove_shopping_cart</span>
              <p>Il carrello è vuoto</p>
            </div>
          ) : (
            <div className="space-y-4">
               {cart.map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center border-b border-wood-200 pb-3 last:border-0">
                    <div className="flex-1">
                      <p className="font-bold text-wood-900 leading-tight">{item.name}</p>
                      <p className="text-sm text-wood-500">{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-wood-100 rounded-full px-2 py-1">
                       <button onClick={() => removeFromCart(item.name)} className="w-6 h-6 flex items-center justify-center bg-white rounded-full text-wood-800 shadow-sm">
                          <span className="material-symbols-outlined text-xs">remove</span>
                       </button>
                       <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                       <button onClick={() => addToCart(item)} className="w-6 h-6 flex items-center justify-center bg-sage-500 rounded-full text-wood-900 shadow-sm">
                          <span className="material-symbols-outlined text-xs">add</span>
                       </button>
                    </div>
                 </div>
               ))}
            </div>
          )}

          {/* Form Inputs */}
          {cart.length > 0 && (
            <div className="mt-8 bg-white p-4 rounded-xl border border-wood-200 space-y-4 shadow-sm">
              <h4 className="font-serif text-lg text-sage-600 border-b border-wood-100 pb-2 mb-2">Dati Ordine</h4>
              
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

              <div>
                <label className="block text-xs uppercase font-bold text-wood-500 mb-1">
                    Orario Ritiro *
                </label>
                <input 
                  type="text" 
                  value={time}
                  onChange={(e) => { setTime(e.target.value); setError(''); }}
                  placeholder="Es. 20:30"
                  className="w-full bg-wood-50 border-wood-200 rounded-lg focus:ring-sage-500 focus:border-sage-500 text-wood-900"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-wood-500 mb-1">Note (Intolleranze, bacchette...)</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Scrivi qui eventuali richieste..."
                  rows={2}
                  className="w-full bg-wood-50 border-wood-200 rounded-lg focus:ring-sage-500 focus:border-sage-500 text-wood-900"
                />
              </div>

              {/* Upselling Section */}
              {(() => {
                const upsellItems = [
                  { name: 'Kizami Wasabi', price: '€ 2,00', description: 'Foglie di vero wasabi' },
                  { name: 'Sake 200ml', price: '€ 4,00', category: 'Bevande' },
                  { name: 'Asahi 33cl', price: '€ 4,00', category: 'Bevande' },
                  { name: 'Kirin 33cl', price: '€ 4,00', category: 'Bevande' }
                ];
                
                const availableUpsells = upsellItems.filter(item => !cart.some(c => c.name === item.name));

                if (availableUpsells.length === 0) return null;

                return (
                  <div className="mt-6 border-t border-wood-100 pt-4">
                    <h4 className="font-serif text-md text-wood-900 mb-3 flex items-center gap-2 px-1">
                      <span className="material-symbols-outlined text-sage-600">restaurant</span>
                      Completa il tuo ordine
                    </h4>
                    <div className="flex gap-3 overflow-x-auto pb-4 px-1 scrollbar-hide">
                      {availableUpsells.map((item) => (
                        <div key={item.name} className="min-w-[130px] bg-white border border-wood-200 rounded-xl p-3 shadow-sm flex flex-col items-center text-center justify-between">
                          <div>
                            <p className="font-bold text-wood-900 text-sm mb-1 leading-tight">{item.name}</p>
                            {item.description && <p className="text-[10px] text-wood-500 mb-2 leading-tight">{item.description}</p>}
                          </div>
                          <div className="mt-2 w-full">
                            <p className="text-sage-600 font-bold text-sm mb-2">{item.price}</p>
                            <button
                              onClick={() => addToCart(item as any)}
                              className="w-full py-1.5 rounded-lg bg-wood-100 hover:bg-sage-500 hover:text-wood-900 text-wood-600 flex items-center justify-center transition-colors text-xs font-bold gap-1"
                            >
                              <span className="material-symbols-outlined text-sm">add</span>
                              AGGIUNGI
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {error && (
                <p className="text-red-500 text-sm font-bold bg-red-50 p-2 rounded flex items-center gap-1">
                   <span className="material-symbols-outlined text-sm">error</span>
                   {error}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-wood-200 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] flex-shrink-0">
            <div className="flex flex-col mb-4">
               <div className="flex justify-between items-end px-1">
                  <span className="text-sm text-wood-500 uppercase tracking-wide font-bold">Totale Finale</span>
                  <span className="font-serif text-3xl text-wood-900 font-bold">€ {totalPrice.toFixed(2).replace('.', ',')}</span>
               </div>
            </div>
            
            {/* Pulsanti Azione */}
            <div className="flex gap-2">
                <button 
                  onClick={handleSendOrder}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm py-3 rounded-xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>INVIA ORDINE SU WHATSAPP</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
