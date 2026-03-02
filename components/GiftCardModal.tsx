import React, { useState } from 'react';
import { contactInfo } from '../data';

interface GiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftCardModal: React.FC<GiftCardModalProps> = ({ isOpen, onClose }) => {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateGiftCard = (): boolean => {
    if (!senderName.trim()) {
      setError('Inserisci il tuo nome.');
      return false;
    }
    if (!recipientName.trim()) {
      setError('Inserisci il nome del destinatario.');
      return false;
    }
    if (!amount || Number(amount) <= 0) {
      setError('Inserisci un importo valido.');
      return false;
    }
    return true;
  };

  const handleSendRequest = () => {
    if (!validateGiftCard()) return;

    // Emoji
    const gift = '\uD83C\uDF81'; // 🎁
    const star = '\u2B50'; // ⭐
    const money = '\uD83D\uDCB6'; // 💶
    const memo = '\uD83D\uDCDD'; // 📝

    let whatsappMsg = `*RICHIESTA GIFT CARD* ${gift}\n\n`;
    whatsappMsg += `${star} *Mittente:* ${senderName}\n`;
    whatsappMsg += `${star} *Destinatario:* ${recipientName}\n`;
    whatsappMsg += `${money} *Importo:* € ${amount}\n`;
    
    whatsappMsg += `\n----------------------------\n`;
    whatsappMsg += `Vorrei acquistare questa Gift Card. Attendo istruzioni per il pagamento.`;

    let phone = contactInfo.whatsapp.replace('https://wa.me/', '');
    phone = phone.replace(/\D/g, ''); 

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(whatsappMsg)}`;

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
            <span className="material-symbols-outlined">card_giftcard</span>
            Regala Muramasa
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-sage-600 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
            <p className="text-wood-500 text-sm italic">
                Regala un'esperienza di sushi artigianale. Riceverai la Gift Card digitale su WhatsApp dopo il pagamento.
            </p>

            {/* Mittente */}
            <div>
                <label className="block text-xs uppercase font-bold text-wood-500 mb-1">Il Tuo Nome *</label>
                <input 
                  type="text" 
                  value={senderName}
                  onChange={(e) => { setSenderName(e.target.value); setError(''); }}
                  placeholder="Chi fa il regalo?"
                  className="w-full bg-wood-50 border-wood-200 rounded-lg focus:ring-sage-500 focus:border-sage-500 text-wood-900"
                />
            </div>

            {/* Destinatario */}
            <div>
                <label className="block text-xs uppercase font-bold text-wood-500 mb-1">Nome Destinatario *</label>
                <input 
                  type="text" 
                  value={recipientName}
                  onChange={(e) => { setRecipientName(e.target.value); setError(''); }}
                  placeholder="Chi riceve il regalo?"
                  className="w-full bg-wood-50 border-wood-200 rounded-lg focus:ring-sage-500 focus:border-sage-500 text-wood-900"
                />
            </div>

            {/* Importo */}
            <div>
                <label className="block text-xs uppercase font-bold text-wood-500 mb-1">Importo (€) *</label>
                <div className="flex gap-2 mb-2">
                    {[20, 50, 100].map((val) => (
                        <button
                            key={val}
                            onClick={() => { setAmount(val); setError(''); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${
                                amount === val 
                                ? 'bg-sage-500 text-wood-900 border-sage-600 shadow-md' 
                                : 'bg-white text-wood-500 border-wood-200 hover:bg-wood-50'
                            }`}
                        >
                            € {val}
                        </button>
                    ))}
                </div>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => { setAmount(Number(e.target.value)); setError(''); }}
                  placeholder="O inserisci altro importo..."
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
                onClick={handleSendRequest}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm py-3 rounded-xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <span>RICHIEDI GIFT CARD</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};
