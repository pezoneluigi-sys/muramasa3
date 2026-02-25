
import React, { useState } from 'react';
import { companyInfo } from '../data';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'cookies'>('privacy');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
       {/* Backdrop */}
       <div 
        className="absolute inset-0 bg-wood-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[85vh] animate-slide-up overflow-hidden">
        
        {/* Header */}
        <div className="bg-wood-800 p-4 text-cream flex justify-between items-center flex-shrink-0">
          <div className="flex gap-4">
             <button 
                onClick={() => setActiveTab('privacy')}
                className={`text-sm font-bold uppercase tracking-wider pb-1 border-b-2 transition-colors ${activeTab === 'privacy' ? 'border-sage-500 text-white' : 'border-transparent text-wood-300 hover:text-white'}`}
             >
                Privacy Policy
             </button>
             <button 
                onClick={() => setActiveTab('cookies')}
                className={`text-sm font-bold uppercase tracking-wider pb-1 border-b-2 transition-colors ${activeTab === 'cookies' ? 'border-sage-500 text-white' : 'border-transparent text-wood-300 hover:text-white'}`}
             >
                Cookie Policy
             </button>
          </div>
          <button onClick={onClose} className="hover:bg-wood-700 p-1 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-wood-900 text-sm leading-relaxed">
          
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl mb-2">Informativa Privacy</h3>
              <p className="italic text-xs">Ai sensi del Regolamento UE 2016/679 (GDPR)</p>
              
              <h4 className="font-bold text-lg mt-4 text-sage-700">1. Titolare del Trattamento</h4>
              <p>
                Il Titolare del trattamento dei dati è <strong>{companyInfo.name}</strong>,<br/>
                con sede legale in {companyInfo.address}.<br/>
                P.IVA: {companyInfo.piva}<br/>
                Email: {companyInfo.email}
              </p>

              <h4 className="font-bold text-lg mt-4 text-sage-700">2. Tipologia di Dati Trattati</h4>
              <p>
                Questo sito web funge da catalogo digitale e strumento di composizione dell'ordine.
                Non richiediamo la registrazione di un account.
                I dati personali inseriti dall'utente nel modulo di "Checkout" (Nome, Indirizzo, Telefono, Note) 
                <strong>non vengono salvati su database persistenti di questo sito web</strong>, 
                ma vengono utilizzati esclusivamente per generare un messaggio di testo precompilato che l'utente invia volontariamente tramite WhatsApp.
              </p>

              <h4 className="font-bold text-lg mt-4 text-sage-700">3. Finalità del Trattamento</h4>
              <p>
                I dati sono trattati esclusivamente per:
                <ul className="list-disc pl-5 mt-1">
                    <li>Permettere la gestione e l'evasione dell'ordine (ritiro o consegna).</li>
                    <li>Adempiere agli obblighi di legge (es. fatturazione).</li>
                </ul>
              </p>

              <h4 className="font-bold text-lg mt-4 text-sage-700">4. Modalità del Trattamento</h4>
              <p>
                Una volta inviato l'ordine su WhatsApp, il trattamento prosegue sulla piattaforma di messaggistica secondo le policy di Meta Inc. e sui sistemi gestionali interni del ristorante per il tempo strettamente necessario all'evasione dell'ordine e agli obblighi fiscali.
              </p>

              <h4 className="font-bold text-lg mt-4 text-sage-700">5. Diritti dell'Interessato</h4>
              <p>
                In ogni momento, l'utente può esercitare i diritti previsti dagli art. 15-22 del GDPR (accesso, rettifica, cancellazione, limitazione) contattando il Titolare all'indirizzo email sopra indicato.
              </p>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl mb-2">Cookie Policy</h3>
              <p>
                Questo sito utilizza cookie e tecnologie simili per garantire il corretto funzionamento delle procedure e migliorare l'esperienza di uso delle applicazioni online.
              </p>

              <h4 className="font-bold text-lg mt-4 text-sage-700">1. Cookie Tecnici (Necessari)</h4>
              <p>
                Il sito utilizza <strong>Local Storage</strong> (una tecnologia analoga ai cookie tecnici) strettamente necessaria per:
                <ul className="list-disc pl-5 mt-1">
                    <li>Memorizzare temporaneamente i prodotti inseriti nel carrello durante la navigazione.</li>
                    <li>Ricordare la presa visione del banner dei cookie.</li>
                </ul>
                Senza questi strumenti, alcune parti del sito (come il carrello) non funzionerebbero correttamente. Per questi cookie non è richiesto il preventivo consenso dell'utente.
              </p>

              <h4 className="font-bold text-lg mt-4 text-sage-700">2. Cookie di Terze Parti</h4>
              <p>
                Visitando il sito, si possono ricevere cookie da siti gestiti da altre organizzazioni ("terze parti").
                <ul className="list-disc pl-5 mt-1">
                    <li><strong>Google Fonts:</strong> Utilizzato per i caratteri tipografici. Google potrebbe raccogliere dati di utilizzo anonimi.</li>
                </ul>
              </p>

              <h4 className="font-bold text-lg mt-4 text-sage-700">3. Gestione dei Cookie</h4>
              <p>
                L'utente può decidere se accettare o meno i cookie utilizzando le impostazioni del proprio browser. La disabilitazione totale o parziale dei cookie tecnici può compromettere l'utilizzo delle funzionalità del sito.
              </p>
            </div>
          )}

        </div>
        
        <div className="p-4 border-t border-wood-200 text-center bg-wood-50">
            <button 
                onClick={onClose}
                className="bg-wood-800 text-cream px-6 py-2 rounded-lg font-bold hover:bg-wood-700 transition-colors"
            >
                Chiudi
            </button>
        </div>
      </div>
    </div>
  );
};
