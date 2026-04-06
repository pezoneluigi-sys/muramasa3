import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { useCart } from '../context/CartContext';
import { menuData, contactInfo } from '../data';
import { CheckoutModal } from './CheckoutModal';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

interface ChatViewProps {
  onBackToMenu: () => void;
}

const addToCartFunctionDeclaration: FunctionDeclaration = {
  name: "addToCart",
  description: "Aggiunge un piatto specifico al carrello dell'utente. Usa il nome esatto del piatto come appare nel menu.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      itemName: {
        type: Type.STRING,
        description: "Il nome esatto del piatto da aggiungere al carrello (es. 'Sake Nikkei (8pz)')",
      },
      quantity: {
        type: Type.INTEGER,
        description: "La quantità da aggiungere",
      }
    },
    required: ["itemName", "quantity"],
  },
};

const removeFromCartFunctionDeclaration: FunctionDeclaration = {
  name: "removeFromCart",
  description: "Rimuove un piatto specifico dal carrello dell'utente. Usa il nome esatto del piatto come appare nel menu.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      itemName: {
        type: Type.STRING,
        description: "Il nome esatto del piatto da rimuovere dal carrello (es. 'Sake Nikkei (8pz)')",
      },
      quantity: {
        type: Type.INTEGER,
        description: "La quantità da rimuovere",
      }
    },
    required: ["itemName", "quantity"],
  },
};

const sendOrderFunctionDeclaration: FunctionDeclaration = {
  name: "sendOrderToWhatsApp",
  description: "Prepara l'ordine finale per l'invio su WhatsApp. Usa questa funzione SOLO dopo aver chiesto e ottenuto dal cliente il suo NOME e l'ORARIO DI RITIRO.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      customerName: {
        type: Type.STRING,
        description: "Il nome del cliente",
      },
      pickupTime: {
        type: Type.STRING,
        description: "L'orario di ritiro scelto dal cliente",
      },
      notes: {
        type: Type.STRING,
        description: "Eventuali note o richieste speciali (opzionale)",
      }
    },
    required: ["customerName", "pickupTime"],
  },
};

const systemInstruction = `Sei Muramasa, un saggio maestro di sushi giapponese intrappolato in un cactus messicano. 
Il tuo stile è Japandi: sei calmo, essenziale, accogliente ma non invadente. Parli in modo poetico ma dritto al punto. 
REGOLA FONDAMENTALE: Le tue risposte devono essere BREVI e CONCISE (massimo 1 o 2 frasi). Non essere prolisso.

REGOLE PER COMPORRE L'ORDINE PERFETTO:
1. Calcolo Porzioni: Fame leggera = ~10-12 pezzi a testa. Fame normale = ~16-20 pezzi a testa. Molta fame = 24+ pezzi a testa. Calcola bene i pezzi totali in base al numero di persone.
2. Equilibrio: Alterna crudo e cotto/fritto, sapori freschi e sapori ricchi (es. salse cremose vs ponzu/lime).
3. Progressione: Suggerisci sempre un antipasto (es. Edamame, Wakame, Tartare) per iniziare, prima dei roll più pesanti.
4. Restrizioni: Rispetta rigorosamente le intolleranze. Se una persona è incinta, proponi SOLO piatti cotti o vegetariani (niente pesce crudo). Se vegetariano, escludi carne e pesce.

Conosci a memoria il menu del ristorante. Puoi consigliare piatti e aggiungerli o rimuoverli dal carrello del cliente usando le funzioni addToCart e removeFromCart.
Se il cliente ti chiede di aggiungere qualcosa, usa la funzione addToCart.
Se il cliente ti chiede di togliere o rimuovere qualcosa, usa la funzione removeFromCart.
Quando proponi un menu, elenca i piatti e chiedi se vuole che li aggiunga al carrello.
Se il cliente ti dice che ha finito, vuole ordinare o vuole concludere, CHIEDIGLI IL NOME E L'ORARIO DI RITIRO. 
Una volta che il cliente ti ha fornito nome e orario confermando di voler ordinare, usa la funzione sendOrderToWhatsApp per completare l'ordine.
ATTENZIONE: Aggiungi le bevande (acqua, birra, vino, ecc.) al carrello SOLO ed ESCLUSIVAMENTE se il cliente le richiede in modo esplicito. Non aggiungerle mai di tua iniziativa.
Non inventare piatti che non sono nel menu.
Ecco il menu disponibile in formato JSON:
${JSON.stringify(menuData.map(section => ({
  categoria: section.title,
  piatti: section.items.map(item => ({
    nome: item.name,
    prezzo: item.price,
    descrizione: item.description || ''
  }))
})))}
`;

export const ChatView: React.FC<ChatViewProps> = ({ onBackToMenu }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Benvenuto. Sono Muramasa. Affidatevi a me: rivelatemi in quanti siete, quanto è profonda la vostra fame e quali gusti vi rendono felici. Al resto penserò io.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<any[]>([]);
  const { cart, addToCart, removeFromCart, totalItems, totalPrice } = useCart();

  const quickReplies = [
    "Siamo in 2, molta fame, amiamo il salmone!",
    "Da solo, fame leggera, qualcosa di cotto.",
    "Siamo in 3, fate voi, basta che ci sia piccante.",
    "In 2, vegetariani, fame normale."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const newUserMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log("API KEY IS:", process.env.GEMINI_API_KEY ? "DEFINED" : "UNDEFINED");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const currentContents = [...historyRef.current, { role: 'user', parts: [{ text }] }];

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: currentContents,
        config: {
          systemInstruction,
          tools: [{ functionDeclarations: [addToCartFunctionDeclaration, removeFromCartFunctionDeclaration, sendOrderFunctionDeclaration] }],
          temperature: 0.7,
        }
      });
      
      let botText = response.text || '';
      
      // Check for function calls
      if (response.functionCalls && response.functionCalls.length > 0) {
        let addedItemsList: string[] = [];
        let removedItemsList: string[] = [];
        let notFoundItemsList: string[] = [];
        let orderSummary = "";
        
        // Create a local copy of the cart to handle parallel function calls (add + send in same turn)
        let currentCart = cart.map(item => ({ ...item }));

        for (const call of response.functionCalls) {
          if (call.name === 'addToCart') {
            const args = call.args as any;
            const itemName = args.itemName;
            const quantity = args.quantity || 1;
            
            // Trova l'item nel menu
            let foundItem = null;
            for (const section of menuData) {
              const item = section.items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
              if (item) {
                foundItem = item;
                break;
              }
            }

            if (foundItem) {
              for(let i=0; i<quantity; i++) {
                addToCart(foundItem);
                const existing = currentCart.find(c => c.name === foundItem.name);
                if (existing) {
                  existing.quantity += 1;
                } else {
                  currentCart.push({ ...foundItem, quantity: 1 });
                }
              }
              addedItemsList.push(`${quantity}x ${foundItem.name}`);
            } else {
              notFoundItemsList.push(`"${itemName}"`);
            }
          } else if (call.name === 'removeFromCart') {
            const args = call.args as any;
            const itemName = args.itemName;
            const quantity = args.quantity || 1;
            
            // Trova l'item nel menu (per avere il nome corretto)
            let foundItem = null;
            for (const section of menuData) {
              const item = section.items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
              if (item) {
                foundItem = item;
                break;
              }
            }

            if (foundItem) {
              for(let i=0; i<quantity; i++) {
                removeFromCart(foundItem.name);
                const existing = currentCart.find(c => c.name === foundItem.name);
                if (existing) {
                  existing.quantity -= 1;
                  if (existing.quantity <= 0) {
                    currentCart = currentCart.filter(c => c.name !== foundItem.name);
                  }
                }
              }
              removedItemsList.push(`${quantity}x ${foundItem.name}`);
            } else {
              // Fallback se il nome non matcha esattamente ma proviamo a rimuoverlo
              for(let i=0; i<quantity; i++) {
                removeFromCart(itemName);
                const existing = currentCart.find(c => c.name.toLowerCase() === itemName.toLowerCase());
                if (existing) {
                  existing.quantity -= 1;
                  if (existing.quantity <= 0) {
                    currentCart = currentCart.filter(c => c.name.toLowerCase() !== itemName.toLowerCase());
                  }
                }
              }
              removedItemsList.push(`${quantity}x ${itemName}`);
            }
          } else if (call.name === 'sendOrderToWhatsApp') {
            const args = call.args as any;
            const name = args.customerName;
            const time = args.pickupTime;
            const notes = args.notes || '';

            if (currentCart.length === 0) {
              orderSummary += `\n❌ Il carrello è vuoto. Aggiungi qualcosa prima di ordinare.`;
            } else {
              const sushi = '\uD83C\uDF63';
              const userIcon = '\uD83D\uDC64';
              const clock = '\uD83D\uDD52';
              const bag = '\uD83D\uDECD';
              const memo = '\uD83D\uDCDD';
              const money = '\uD83D\uDCB0';
              const dot = '\u25AA';

              let message = `*NUOVO ORDINE MURAMASA* ${sushi}\n\n`;
              message += `${userIcon} *Cliente:* ${name}\n`;
              message += `${bag} *MODALITÀ:* Ritiro al Locale\n`;
              message += `${clock} *Orario:* ${time}\n`;
              
              if (notes.trim()) {
                message += `${memo} *Note:* ${notes}\n`;
              }
              message += `\n----------------------------\n`;

              const parsePrice = (priceStr: string): number => {
                try {
                  const cleanStr = priceStr.replace('€', '').trim().replace(',', '.');
                  const val = parseFloat(cleanStr);
                  return isNaN(val) ? 0 : val;
                } catch (e) {
                  return 0;
                }
              };

              let currentTotal = 0;
              currentCart.forEach(item => {
                message += `${dot} ${item.quantity}x ${item.name} (${item.price})\n`;
                currentTotal += parsePrice(item.price) * item.quantity;
              });

              message += `----------------------------\n`;
              message += `${money} *TOTALE: € ${currentTotal.toFixed(2).replace('.', ',')}*\n`;

              let phone = contactInfo.whatsapp.replace('https://wa.me/', '');
              phone = phone.replace(/\D/g, ''); 

              const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
              window.open(url, '_blank');

              orderSummary += `\n✅ Ho preparato il tuo ordine per le ${time}. Si aprirà WhatsApp per confermarlo!`;
            }
          }
        }

        let summary = "";
        const hasModifications = addedItemsList.length > 0 || removedItemsList.length > 0;

        if (addedItemsList.length > 0) {
          summary += `🛒 Ho aggiunto: ${addedItemsList.join(', ')}.`;
        }
        if (removedItemsList.length > 0) {
          summary += ` 🗑️ Ho rimosso: ${removedItemsList.join(', ')}.`;
        }
        if (notFoundItemsList.length > 0) {
          summary += ` ❌ Non ho trovato: ${notFoundItemsList.join(', ')}.`;
        }
        
        summary += orderSummary;

        if (summary.trim()) {
          if (hasModifications && !orderSummary) {
             summary += `\n\nVuoi modificare qualcosa o posso preparare l'ordine? (In tal caso, dimmi il tuo nome e l'orario di ritiro)`;
          }

          if (!botText) {
            botText = summary.trim();
          } else {
            botText = `${botText}\n\n${summary.trim()}`;
          }
        }
      }

      if (botText) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'bot',
          text: botText
        }]);
        
        // Update history manually
        historyRef.current.push({ role: 'user', parts: [{ text }] });
        historyRef.current.push({ role: 'model', parts: [{ text: botText }] });
      }

    } catch (error: any) {
      console.error("Errore chat:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Scusa, i miei aculei si sono incrociati. Errore: ${error?.message || String(error)}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#e8dcc4] font-serif relative">
      
      {/* Left Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col justify-between w-28 bg-[#d4b895] border-r-4 border-[#b59573] py-8 z-30 shadow-[5px_0_15px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col items-center gap-8">
          <button onClick={onBackToMenu} className="flex flex-col items-center gap-2 text-wood-900 hover:text-wood-700 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#f4ead5] border-2 border-[#b59573] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl">menu_book</span>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">Menu</span>
          </button>
        </div>
        <div className="flex flex-col items-center gap-8">
          <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-2 text-wood-900 hover:text-wood-700 transition-colors relative">
            <div className="w-12 h-12 rounded-full bg-[#f4ead5] border-2 border-[#b59573] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#d4b895]">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">Carrello</span>
          </button>
        </div>
      </aside>

      {/* Main Stage */}
      <main className="flex-1 relative flex flex-col h-full bg-sage-500">
        
        {/* Mobile Top Bar */}
        <header className="md:hidden absolute top-0 left-0 w-full p-4 flex justify-between items-center z-40 bg-gradient-to-b from-black/60 to-transparent">
          <button onClick={onBackToMenu} className="text-[#f4ead5] flex items-center gap-1 drop-shadow-md">
            <span className="material-symbols-outlined">arrow_back</span> Menu
          </button>
          <button onClick={() => setIsCartOpen(true)} className="text-[#f4ead5] flex items-center gap-1 drop-shadow-md relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </header>

        {/* Chat Area (Floating above counter) */}
        <div className="flex-1 overflow-y-auto z-20 p-4 md:p-12 pb-[20vh] flex flex-col gap-6 scrollbar-hide relative">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] md:max-w-[60%] px-6 py-4 shadow-xl relative ${
                    msg.sender === 'user' 
                      ? 'bg-[#d1cec5] text-wood-900 border-2 border-[#a8a59c] rounded-2xl rounded-tr-sm' 
                      : 'bg-[#f4ead5] text-wood-900 border-2 border-[#d3c5a3] rounded-2xl rounded-tl-sm'
                  }`}
                  style={{
                    backgroundImage: msg.sender === 'bot' ? 'url("https://www.transparenttextures.com/patterns/rice-paper.png")' : 'url("https://www.transparenttextures.com/patterns/concrete-wall.png")',
                    backgroundBlendMode: 'overlay'
                  }}
                >
                  <p className="text-[16px] md:text-[18px] leading-relaxed font-medium whitespace-pre-wrap">{msg.text}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-start"
              >
                <div className="bg-[#f4ead5] text-wood-900 border-2 border-[#d3c5a3] rounded-2xl rounded-tl-sm px-6 py-4 shadow-xl flex gap-1 items-center">
                  <span className="w-2 h-2 bg-wood-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-wood-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-wood-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area (Floating at the bottom) */}
        <div className="absolute bottom-0 left-0 w-full z-30 flex flex-col items-center justify-end pb-8 px-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          
          <div className="w-full max-w-2xl relative z-40 pointer-events-auto">
            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="flex overflow-x-auto gap-2 mb-4 pb-2 scrollbar-hide">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(reply)}
                    disabled={isLoading}
                    className="whitespace-nowrap bg-[#f4ead5] border-2 border-[#d3c5a3] text-wood-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors shadow-md disabled:opacity-50"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input Box */}
            <div className="bg-[#f4ead5]/90 backdrop-blur-sm rounded-lg shadow-2xl border-2 border-[#a38257] flex items-center p-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                disabled={isLoading}
                placeholder="Scrivi a Muramasa..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-wood-900 placeholder-wood-600 disabled:opacity-50 font-medium text-lg"
              />
              <button 
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="w-12 h-12 rounded-md bg-[#8c6b4a] text-[#f4ead5] flex items-center justify-center disabled:opacity-50 hover:bg-[#73553a] transition-colors border border-[#5c422b] shadow-sm"
              >
                <span className="material-symbols-outlined text-2xl">send</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col justify-between w-28 bg-[#d4b895] border-l-4 border-[#b59573] py-8 z-30 shadow-[-5px_0_15px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col items-center gap-8">
          <button className="flex flex-col items-center gap-2 text-wood-900 hover:text-wood-700 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#f4ead5] border-2 border-[#b59573] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl">event_seat</span>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-center">Prenota<br/>Sgabello</span>
          </button>
        </div>
        <div className="flex flex-col items-center gap-8">
          <button onClick={onBackToMenu} className="flex flex-col items-center gap-2 text-wood-900 hover:text-wood-700 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#f4ead5] border-2 border-[#b59573] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl">logout</span>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">Exit</span>
          </button>
        </div>
      </aside>

      <CheckoutModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
