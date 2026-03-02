
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { contactInfo } from '../data';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DELIVERY_FEE = 5.00;

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, totalPrice, addToCart, removeFromCart } = useCart();
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  
  // Nuovi stati per consegna
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');
  
  const [error, setError] = useState('');

  // Calcolo totale dinamico
  const finalTotal = deliveryMethod === 'delivery' ? totalPrice + DELIVERY_FEE : totalPrice;

  if (!isOpen) return null;

  // Validazione comune
  const validateOrder = (): boolean => {
    if (!name.trim()) {
      setError('Inserisci il tuo nome per ordinare.');
      return false;
    }
    if (deliveryMethod === 'delivery' && !address.trim()) {
      setError('Inserisci l\'indirizzo per la consegna.');
      return false;
    }
    if (!time.trim()) {
      setError(`Inserisci un orario per ${deliveryMethod === 'delivery' ? 'la consegna' : 'il ritiro'}.`);
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
    const home = '\uD83C\uDFE0'; // 🏠
    const scooter = '\uD83D\uDEF5'; // 🛵
    const bag = '\uD83D\uDECD'; // 🛍️
    const memo = '\uD83D\uDCDD'; // 📝
    const money = '\uD83D\uDCB0'; // 💰
    const dot = '\u25AA'; // ▪️

    // 1. Costruisci il messaggio
    let message = `*NUOVO ORDINE MURAMASA* ${sushi}\n\n`;
    message += `${user} *Cliente:* ${name}\n`;
    
    if (deliveryMethod === 'delivery') {
        message += `${scooter} *MODALITÀ:* Consegna a Domicilio\n`;
        message += `${home} *Indirizzo:* ${address}\n`;
    } else {
        message += `${bag} *MODALITÀ:* Ritiro al Locale\n`;
    }

    message += `${clock} *Orario:* ${time}\n`;
    
    if (notes.trim()) {
      message += `${memo} *Note:* ${notes}\n`;
    }
    message += `\n----------------------------\n`;

    cart.forEach(item => {
      message += `${dot} ${item.quantity}x ${item.name} (${item.price})\n`;
    });

    if (deliveryMethod === 'delivery') {
        message += `${dot} Spese di consegna (€ ${DELIVERY_FEE.toFixed(2).replace('.', ',')})\n`;
    }

    message += `----------------------------\n`;
    message += `${money} *TOTALE: € ${finalTotal.toFixed(2).replace('.', ',')}*\n`;

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
              
              {/* Toggle Ritiro/Consegna */}
              <div className="flex bg-wood-100 p-1 rounded-lg mb-4">
                <button 
                    className={`flex-1 py-2 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all ${deliveryMethod === 'pickup' ? 'bg-wood-800 text-cream shadow-md' : 'text-wood-500 hover:bg-wood-200'}`}
                    onClick={() => { setDeliveryMethod('pickup'); setError(''); }}
                >
                    <span className="material-symbols-outlined text-lg">shopping_bag</span>
                    Ritiro al Locale
                </button>
                <button 
                    className={`flex-1 py-2 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all ${deliveryMethod === 'delivery' ? 'bg-sage-500 text-wood-900 shadow-md' : 'text-wood-500 hover:bg-wood-200'}`}
                    onClick={() => { setDeliveryMethod('delivery'); setError(''); }}
                >
                    <span className="material-symbols-outlined text-lg">moped</span>
                    Consegna (+€5)
                </button>
              </div>

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

              {/* Indirizzo (Solo per Consegna) */}
              {deliveryMethod === 'delivery' && (
                  <div className="animate-slide-up">
                    <label className="block text-xs uppercase font-bold text-wood-500 mb-1">Indirizzo Consegna *</label>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => { setAddress(e.target.value); setError(''); }}
                      placeholder="Via, civico, città..."
                      className="w-full bg-wood-50 border-wood-200 rounded-lg focus:ring-sage-500 focus:border-sage-500 text-wood-900"
                    />
                  </div>
              )}

              <div>
                <label className="block text-xs uppercase font-bold text-wood-500 mb-1">
                    {deliveryMethod === 'delivery' ? 'Orario Consegna Desiderato *' : 'Orario Ritiro *'}
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
               {deliveryMethod === 'delivery' && (
                 <div className="flex justify-between items-center text-sm text-wood-500 mb-1 px-1">
                    <span>Subtotale</span>
                    <span>€ {totalPrice.toFixed(2).replace('.', ',')}</span>
                 </div>
               )}
               {deliveryMethod === 'delivery' && (
                 <div className="flex justify-between items-center text-sm text-wood-500 mb-2 border-b border-dotted border-wood-200 pb-2 px-1">
                    <span>Consegna</span>
                    <span>€ {DELIVERY_FEE.toFixed(2).replace('.', ',')}</span>
                 </div>
               )}
               <div className="flex justify-between items-end px-1">
                  <span className="text-sm text-wood-500 uppercase tracking-wide font-bold">Totale Finale</span>
                  <span className="font-serif text-3xl text-wood-900 font-bold">€ {finalTotal.toFixed(2).replace('.', ',')}</span>
               </div>
            </div>
            
            {/* Pulsanti Azione */}
            <div className="flex gap-2">
                {/* Button removed as requested */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
