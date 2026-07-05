import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles, Instagram, Plus, Copy, Check, MessageCircle, X } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // Serves as Instagram handle
  const [subject, setSubject] = useState('Geral');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [compiledMessage, setCompiledMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setErrorMsg('Por favor, informe seu nome.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Por favor, informe seu usuário do Instagram (Ex: @seuusuario).');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Por favor, escreva a sua mensagem.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const text = `✨ NOVO CONTATO COMERCIAL (VisuALL) ✨

🧑‍💼 Nome: ${name.trim()}
📸 Instagram: ${phone.trim().startsWith('@') ? phone.trim() : '@' + phone.trim()}
📋 Assunto: ${subject}

💬 Detalhes da Mensagem:
"${message.trim()}"

Olá equipe VisuALL! Enviei esse contato através do formulário do site e gostaria de conversar sobre meu projeto!`;

    setCompiledMessage(text);

    // Simulate sending details
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Clear states
      setName('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  return (
    <section id="contato" className="relative py-24 px-4 md:px-8 bg-slate-950 border-t border-slate-900 overflow-hidden">
      
      {/* Glow highlight */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[600px] h-[300px] bg-cyan-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column Left: Visual Pitch & Info Indicators */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
                <Sparkles className="h-3 w-3 animate-pulse" />
                Vamos Conversar?
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 font-sans tracking-tight leading-tight">
                Leve Sua Marca <br />Para o Próximo Nível!
              </h2>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed font-sans max-w-sm">
                Ideias criativas sem ação não geram impacto. Entre em contato conosco hoje mesmo e tenha soluções personalizadas criadas sob medida.
              </p>
            </div>

            {/* Quick Contact Details Indicators */}
            <div className="flex flex-col gap-5 my-10 lg:my-0">
              
              <div className="flex items-center gap-4 bg-slate-900/40 p-4 border border-slate-900 rounded-xl hover:border-cyan-500/25 transition-all">
                <div className="h-10 w-10 bg-emerald-950/45 border border-emerald-800/45 text-emerald-450 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5 fill-emerald-450 stroke-none" />
                </div>
                <div className="text-left font-sans">
                  <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">WhatsApp Comercial</span>
                  <a href="https://wa.me/5514981976861" target="_blank" rel="noopener noreferrer" className="block text-sm font-bold text-slate-100 hover:text-emerald-400 transition-colors">
                    (14) 98197-6861
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-900/40 p-4 border border-slate-900 rounded-xl hover:border-cyan-500/25 transition-all">
                <div className="h-10 w-10 bg-cyan-950/40 border border-cyan-800/45 text-cyan-400 rounded-xl flex items-center justify-center shrink-0">
                  <Instagram className="h-5 w-5" />
                </div>
                <div className="text-left font-sans">
                  <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">Direct no Instagram</span>
                  <a href="https://instagram.com/visuall.mediaa" target="_blank" rel="noopener noreferrer" className="block text-sm font-bold text-slate-100 hover:text-cyan-400 transition-colors">
                    @visuall.mediaa
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-900/40 p-4 border border-slate-900 rounded-xl hover:border-cyan-500/25 transition-all">
                <div className="h-10 w-10 bg-cyan-950/40 border border-cyan-800/45 text-cyan-400 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-left font-sans">
                  <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">Nosso Canal de Email</span>
                  <a href="mailto:contato@visuallmedia.com.br" className="block text-sm font-bold text-slate-100 hover:text-cyan-400 transition-colors">
                    contato@visuallmedia.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-900/40 p-4 border border-slate-900 rounded-xl hover:border-cyan-500/25 transition-all">
                <div className="h-10 w-10 bg-cyan-950/40 border border-cyan-800/45 text-cyan-400 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-left font-sans">
                  <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">Localização</span>
                  <p className="text-sm font-bold text-slate-100">
                    São Paulo - SP (Brasil)
                  </p>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="flex items-center gap-3 flex-wrap mt-6">
                <a 
                  href="https://wa.me/5514981976861" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/70 text-slate-350 hover:text-white rounded-lg text-xs font-bold font-sans flex items-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500 fill-emerald-550 stroke-none" />
                  Chamar no WhatsApp
                </a>
                <a 
                  href="https://instagram.com/visuall.mediaa" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-pink-500/50 hover:bg-slate-900/70 text-slate-350 hover:text-white rounded-lg text-xs font-bold font-sans flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-pink-500" />
                  @visuall.mediaa
                </a>
              </div>

            </div>

            {/* Bottom visual indicator stamp */}
            <div className="hidden lg:block text-slate-600 text-[10px] font-mono select-none">
              VISUALL CREATIVE MEDIA STUDIO LTD. © {new Date().getFullYear()}
            </div>
          </div>


          {/* Column Right: Message Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
              
              <h3 className="text-lg font-bold text-slate-100 font-sans tracking-tight mb-6">
                Envie uma Mensagem Direta
              </h3>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[11px] font-bold text-slate-400 font-mono uppercase">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nome completo ou empresa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[11px] font-bold text-slate-400 font-mono uppercase">Seu Instagram *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: @seuusuario"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[11px] font-bold text-slate-400 font-mono uppercase">Assunto</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
                  >
                    <option value="Geral">Assunto Geral</option>
                    <option value="Sites">Criação de Sites</option>
                    <option value="Anuncios">Otimização de Anúncios</option>
                    <option value="Artes">Packs de Criativos</option>
                    <option value="Restauração">Restauração de Fotos</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[11px] font-bold text-slate-400 font-mono uppercase">Sua Mensagem *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Descreva brevemente sua ideia ou as soluções que seu negócio precisa..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-650 resize-y"
                  />
                </div>

                {errorMsg && (
                  <span className="text-xs text-red-400 bg-red-950/40 border border-red-900/40 px-3 py-2 rounded-lg font-bold text-center">
                    ⚠️ {errorMsg}
                  </span>
                )}

                {/* Submit button indicator */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-xl font-bold font-sans text-xs md:text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 transition-all ${
                    isSubmitting 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-cyan-500 hover:bg-cyan-600 text-slate-950 hover:shadow-[0_4px_20px_rgba(6,182,212,0.4)]'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-650 border-t-white rounded-full animate-spin" />
                      Enviando Mensagem...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar Mensagem
                    </>
                  )}
                </motion.button>

              </form>

              {/* Success Overlay Dialog */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/98 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-4 text-center z-25"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 15 }}
                      animate={{ scale: 1, y: 0 }}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-md flex flex-col items-stretch gap-4 shadow-2xl relative overflow-y-auto max-h-[95%]"
                    >
                      <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
                        <div className="h-8 w-8 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
                          <MessageCircle className="h-4.5 w-4.5 fill-white stroke-none" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-black text-white leading-none">Mensagem Pronta para Enviar!</h4>
                          <span className="text-[9px] text-cyan-450 font-mono uppercase tracking-widest font-bold">FALE DIRETAMENTE COM A EQUIPE</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 text-left leading-relaxed">
                        Nós estruturamos a sua mensagem de contato perfeitamente. Copie e escolha o canal que prefere para iniciar o atendimento comercial com a VisuALL.
                      </p>

                      {/* Display the compiled message */}
                      <div className="bg-slate-950 border border-slate-850 rounded-lg p-3 relative flex flex-col text-left gap-1.5">
                        <span className="text-[8px] text-slate-500 font-mono uppercase font-bold tracking-wider">TEXTO DA MENSAGEM</span>
                        <pre className="text-[10px] text-slate-200 leading-relaxed font-sans whitespace-pre-wrap font-medium">
                          {compiledMessage}
                        </pre>

                        {/* Copy button */}
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(compiledMessage);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2500);
                          }}
                          className={`mt-2 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md border text-[11px] font-bold transition-all cursor-pointer ${
                            copied 
                              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400' 
                              : 'bg-slate-900 border-slate-800 hover:border-slate-750 text-slate-300 hover:text-white'
                          }`}
                        >
                          {copied ? (
                            <>
                              <Check className="w-3 h-3 stroke-[3]" />
                              Copiado com Sucesso!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copiar Mensagem
                            </>
                          )}
                        </button>
                      </div>

                      {/* Direct channels */}
                      <div className="flex flex-col gap-2">
                        {/* WhatsApp button */}
                        <a
                          href={`https://wa.me/5514981976861?text=${encodeURIComponent(compiledMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer shadow-md flex items-center justify-center gap-2 transition-all hover:opacity-95 transform hover:scale-[1.01]"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
                          Falar no WhatsApp Comercial 🟢
                        </a>

                        {/* Instagram button */}
                        <a
                          href="https://instagram.com/visuall.mediaa"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            if (!copied) {
                              navigator.clipboard.writeText(compiledMessage);
                              setCopied(true);
                            }
                          }}
                          className="w-full py-2.5 px-4 bg-gradient-to-tr from-pink-500 via-purple-600 to-orange-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer shadow-md flex items-center justify-center gap-2 transition-all hover:opacity-95 transform hover:scale-[1.01]"
                        >
                          <Instagram className="w-3.5 h-3.5 text-white" />
                          {copied ? 'Abrir Instagram e Enviar DM 📸' : 'Copiar e Abrir Instagram 📸'}
                        </a>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-2 mt-1">
                        <span className="text-[9px] text-slate-500 font-mono">Chame no canal que preferir!</span>
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="text-[10px] font-bold text-slate-400 hover:text-white underline cursor-pointer"
                        >
                          Voltar / Enviar Outra
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
