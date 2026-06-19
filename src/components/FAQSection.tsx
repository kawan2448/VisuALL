import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "Quanto tempo leva para criar um site profissional?",
      answer: "O prazo de entrega varia de acordo com a complexidade. Uma Landing Page de alta conversão costuma estar pronta em 5 a 10 dias úteis. Já um site institucional completo com várias páginas pode levar de 15 a 25 dias úteis. Estruturamos todo o cronograma com você no início do projeto."
    },
    {
      question: "O que preciso fornecer para iniciar o desenvolvimento do projeto?",
      answer: "Precisamos basicamente das informações sobre o seu negócio (textos de apresentação, lista de serviços/produtos e contatos) e do seu logotipo em alta qualidade. Caso ainda não tenha identidade visual, textos formados ou fotos profissionais, nós também oferecemos serviços adicionais de redação publicitária (copywriting) e branding premium."
    },
    {
      question: "Meu site funcionará bem em celulares e tablets?",
      answer: "Sim, absolutamente. Todos os projetos criados pela VisuALL são desenvolvidos sob a metodologia 'mobile-first' e 100% responsivos. Isso garante que a experiência de leitura, velocidade e navegação do seu cliente seja perfeita e ultra-rápida em qualquer smartphone, tablet ou computador."
    },
    {
      question: "O site já vem otimizado para aparecer no Google (SEO)?",
      answer: "Sim! Desenvolvemos o seu site aplicando as melhores práticas técnicas de SEO (Search Engine Optimization) on-page. Otimizamos a velocidade de carregamento, comprimimos as imagens sem perder qualidade, estruturamos os títulos (H1, H2, H3) e implementamos meta tags fundamentais para que indexadores como o Google encontrem e posicionem seu site de forma orgânica."
    },
    {
      question: "Como funciona a contratação do domínio e da hospedagem?",
      answer: "O domínio (ex: www.suaempresa.com.br) e a hospedagem (onde os arquivos do site ficam online) são contratados à parte. Nós assessoramos você em todo o processo de escolha do melhor e mais rápido provedor do mercado e realizamos o registro 100% sob o seu nome/CNPJ. Assim, você mantém controle e propriedade total sobre as suas credenciais."
    },
    {
      question: "Vocês oferecem suporte pós-entrega?",
      answer: "Sim! Fornecemos um suporte dedicado de 30 dias sem custos adicionais após a publicação do site para garantir total estabilidade, tirar dúvidas de uso e efetuar eventuais ajustes iniciais. Também disponibilizamos planos acessíveis de manutenção contínua caso você precise de atualizações futuras constantes."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 md:px-8 border-t border-slate-900 bg-slate-950 object-cover relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-950/10 rounded-full blur-[130px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header decoration */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full text-[10px] md:text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 shadow-inner">
            <HelpCircle className="h-3 w-3" />
            Tire suas dúvidas
          </div>
          
          <h2 className="text-3xl md:text-5xl font-sans tracking-tight font-black text-white uppercase">
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Frequentes</span>
          </h2>
          <p className="text-slate-450 text-xs md:text-sm max-w-lg mx-auto mt-3 font-sans">
            Entenda como funciona cada detalhe do nosso processo avançado de criação, prazos, domínio e suporte pós-venda.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-cyan-500/30 bg-slate-900/45 shadow-[0_0_20px_rgba(6,182,212,0.04)]' 
                    : 'border-slate-900 bg-slate-900/20 hover:border-slate-800 hover:bg-slate-900/30'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-sans font-bold text-sm md:text-base text-slate-100 hover:text-white transition-colors cursor-pointer select-none"
                >
                  <span className={isOpen ? 'text-cyan-400 transition-colors' : 'text-slate-200'}>
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-lg border transition-all duration-300 shrink-0 ${
                    isOpen 
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-400 rotate-180' 
                      : 'bg-slate-950 border-slate-850 text-slate-400'
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Open/Close Animation Wrapper */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-7 text-xs md:text-sm text-slate-400 leading-relaxed font-sans border-t border-slate-900/60 pt-4 bg-slate-950/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
