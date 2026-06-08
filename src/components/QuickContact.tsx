import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Copy, Check, MessageCircle, X } from 'lucide-react';

export default function QuickContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const messageTemplate = "Olá VisuALL! Acessei o site de vocês e gostaria de entender como funcionam as soluções e fechar um pacote criativo de design com a agência.";

  const handleCopy = () => {
    navigator.clipboard.writeText(messageTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* Main Floating Action Button: Glowing Instagram Gradient */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 bg-gradient-to-tr from-pink-500 via-purple-600 to-orange-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-purple-950/40 cursor-pointer group hover:scale-110 transition-all border border-pink-400/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Pulsing ring indicator */}
          <span className="absolute inset-0 rounded-full bg-pink-400 opacity-25 animate-ping" />

          {/* Icon */}
          <Instagram className="w-6.5 h-6.5 text-white" />

          <span className="absolute right-16 bg-slate-900 border border-slate-800 text-white text-[10px] font-bold font-sans px-3 py-1.5 rounded-lg shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap select-none">
            Fale Conosco no Instagram 💬
          </span>
        </motion.button>
      </div>

      {/* Styled Interactive Premium Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-hidden text-left"
            >
              {/* Top gradient blur light */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />

              {/* Close Button Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white p-1 rounded-full hover:bg-slate-850 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-gradient-to-tr from-pink-500 via-purple-600 to-orange-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-500/20">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white font-sans leading-none">Contate via Instagram</h3>
                  <span className="text-[9px] text-pink-400 font-mono uppercase tracking-widest font-bold">@visuall.mediaa</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                Nossos canais de atendimento estão no Instagram! Nós preparamos uma mensagem perfeita para facilitar o seu contato. É só copiar abaixo e nos enviar no Instagram. 😊
              </p>

              {/* Message Display Area */}
              <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 relative flex flex-col gap-2 mb-5">
                <span className="text-[8px] text-slate-500 font-mono uppercase font-bold tracking-wider">MENSAGEM DE CONTATO</span>
                <p className="text-[12px] text-slate-200 leading-relaxed font-sans italic">
                  "{messageTemplate}"
                </p>

                {/* Micro Clipboard copy button inside bubble */}
                <button
                  onClick={handleCopy}
                  className={`mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    copied 
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400' 
                      : 'bg-slate-900 border-slate-800 hover:border-slate-750 text-slate-300 hover:text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Mensagem Copiada!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copiar Mensagem
                    </>
                  )}
                </button>
              </div>

              {/* CTA Navigation button */}
              <a
                href="https://instagram.com/visuall.mediaa"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (!copied) {
                    // Automatically copy if they forgot
                    navigator.clipboard.writeText(messageTemplate);
                    setCopied(true);
                  }
                }}
                className="w-full py-3 px-4 bg-gradient-to-tr from-pink-500 via-purple-600 to-orange-500 hover:opacity-95 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                {copied ? 'Abrir Instagram e Colar 📸' : 'Copiar e Abrir Instagram 📸'}
              </a>

              <p className="text-[9px] text-slate-500 text-center leading-relaxed mt-3">
                Ao clicar, você será direcionado para o Direct da <strong>@visuall.mediaa</strong>. Basta colar a mensagem enviada à área de transferência!
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
