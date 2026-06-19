import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  Rocket, 
  Phone, 
  Instagram, 
  MessageSquare,
  TrendingUp,
  Target,
  Layers,
  Heart,
  Briefcase
} from 'lucide-react';

import Logo from './components/Logo';
import ServicesShowcase from './components/ServicesShowcase';
import BudgetCalculator from './components/BudgetCalculator';
import FAQSection from './components/FAQSection';
import ContactForm from './components/ContactForm';
import QuickContact from './components/QuickContact';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic values based on visual layout
  const stats = [
    { value: "+320%", label: "Visibilidade Média" },
    { value: "+400%", label: "Aumento de Vendas" },
    { value: "100%", label: "Design Exclusivo" },
    { value: "24/7", label: "Vitrine Ativa" }
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Dynamic Ambient Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top ambient orb */}
        <div className="absolute -top-[10%] left-[10%] w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[130px]" />
        {/* Right mid orb */}
        <div className="absolute top-[40%] -right-[10%] w-[450px] h-[450px] bg-indigo-950/15 rounded-full blur-[120px]" />
        {/* Bottom left orb */}
        <div className="absolute -bottom-[10%] left-[5%] w-[500px] h-[500px] bg-blue-950/20 rounded-full blur-[140px]" />
      </div>

      {/* STICKY HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button 
            onClick={() => handleScrollTo('hero')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="h-10 w-10">
              <Logo className="h-full w-full" showText={false} />
            </div>
            <span className="font-display font-extrabold text-xl tracking-[0.15em] text-white group-hover:text-cyan-400 transition-colors uppercase">
              Visu<span className="text-cyan-400 font-mono">ALL</span>
            </span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-400">
            <button 
              onClick={() => handleScrollTo('servicos')} 
              className="hover:text-white hover:shadow-[0_4px_10px_rgba(34,211,238,0.15)] px-2 py-1 rounded transition-all cursor-pointer"
            >
              Serviços
            </button>
            <button 
              onClick={() => handleScrollTo('calculadora')} 
              className="hover:text-white px-2 py-1 rounded transition-all cursor-pointer"
            >
              Simulador
            </button>
            <button 
              onClick={() => handleScrollTo('faq')} 
              className="hover:text-white px-2 py-1 rounded transition-all cursor-pointer"
            >
              FAQ
            </button>
            <button 
              onClick={() => handleScrollTo('contato')} 
              className="hover:text-white px-2 py-1 rounded transition-all cursor-pointer"
            >
              Contato
            </button>
            
            <span className="h-4 w-[1px] bg-slate-800" />
            
            {/* Call to action button */}
            <button
              onClick={() => handleScrollTo('calculadora')}
              className="py-2 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-505 text-slate-950 font-bold font-sans text-xs uppercase tracking-wider rounded-lg cursor-pointer transform hover:scale-[1.03] active:scale-[0.98] transition-all shadow-md shadow-cyan-950/40"
            >
              Fazer Orçamento
            </button>
          </nav>

          {/* Mobile hamburger burger button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu panel tray */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-900 bg-slate-950"
            >
              <div className="px-5 py-6 flex flex-col gap-4 text-sm font-medium font-sans">
                <button 
                  onClick={() => handleScrollTo('servicos')} 
                  className="text-left py-2 hover:text-cyan-400 border-b border-slate-900/40"
                >
                  Serviços
                </button>
                <button 
                  onClick={() => handleScrollTo('calculadora')} 
                  className="text-left py-2 hover:text-cyan-400 border-b border-slate-900/40"
                >
                  Simulador de Orçamento
                </button>
                <button 
                  onClick={() => handleScrollTo('faq')} 
                  className="text-left py-2 hover:text-cyan-400 border-b border-slate-900/40"
                >
                  Perguntas Frequentes (FAQ)
                </button>
                <button 
                  onClick={() => handleScrollTo('contato')} 
                  className="text-left py-2 hover:text-cyan-400 pb-2"
                >
                  Contato Direct
                </button>
                
                <button
                  onClick={() => handleScrollTo('calculadora')}
                  className="w-full text-center py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold uppercase text-xs tracking-wider rounded-lg mt-2"
                >
                  Fazer Orçamento
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN HERO LANDING SCENE */}
      <section id="hero" className="relative pt-12 pb-24 px-4 md:px-8 border-b border-slate-900 overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background futuristic tech coordinate lines */}
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 mix-blend-color-dodge [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* Animated badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/90 border border-slate-800 rounded-full text-[10px] md:text-xs font-bold text-cyan-400 uppercase tracking-widest mb-8 shadow-inner select-none"
          >
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
            Criatividade que gera resultados
          </motion.div>

          {/* Interactive SVG Logo */}
          <div className="w-44 h-44 md:w-56 md:h-56 mb-2">
            <Logo className="w-full h-full" showText={false} pulse={true} />
          </div>

          {/* Brand Name Text with intense visual focus styling */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-sans tracking-[0.25em] font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-sky-50 via-cyan-100 to-blue-200">
              VisuALL
            </h1>
            <p className="text-xs md:text-sm font-sans tracking-[0.4em] font-semibold text-cyan-400 uppercase mt-2 select-none">
              Criatividade que gera resultados
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-2 text-sm md:text-lg text-slate-350 leading-relaxed max-w-2xl font-sans"
          >
            Nós conectamos marcas a clientes através de designs memoráveis, estratégias com foco real em conversão e layouts ultra profissionais. Se destaque no mercado e venda muito mais!
          </motion.p>

          {/* Core CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('servicos')}
              className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-700 text-slate-950 font-sans font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Falar com Especialista
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleScrollTo('calculadora')}
              className="w-full sm:w-auto py-3.5 px-8 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-white font-sans font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Simular Meu Projeto
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </button>
          </motion.div>

          {/* Showcase Brand Dynamic Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 w-full max-w-3xl border-t border-slate-900 pt-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-display font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-blue-500">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-bold tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* LIVE SERVICES GRID */}
      <ServicesShowcase />

      {/* INTERACTIVE BUDGET CALCULATOR */}
      <BudgetCalculator />

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FAQSection />

      {/* CORE IDENTITY PILLARS (Infographic Bottom Element) */}
      <section className="py-20 px-4 md:px-8 bg-slate-950 border-t border-slate-900 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-sky-950/10 rounded-full blur-[110px]" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          
          <h2 className="text-2xl md:text-3xl font-bold font-sans text-slate-100 tracking-tight mb-3">
            Nossos Valores Fundamentais
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto mb-12">
            Cada linha de código escrito, cada pixels desenhado e cada campanha criada seguem estritamente a metodologia de crescimento estratégico da VisuALL.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* PILLAR 1: CRIATIVIDADE */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900/80 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all flex flex-col gap-4">
              <div className="h-10 w-10 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded-xl flex items-center justify-center">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold font-sans text-white uppercase tracking-wider">CRIATIVIDADE</h3>
                <span className="text-[11px] text-cyan-400 font-mono">Ideias que conectam.</span>
                <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                  Criamos identidades autênticas e arranjos visuais premium de alta categoria, fazendo o seu negócio se desconectar dos concorrentes genéricos de imediato.
                </p>
              </div>
            </div>

            {/* PILLAR 2: ESTRATÉGIA */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900/80 hover:border-indigo-500/30 hover:bg-slate-900/60 transition-all flex flex-col gap-4">
              <div className="h-10 w-10 bg-indigo-950/40 border border-indigo-800/40 text-indigo-400 rounded-xl flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold font-sans text-white uppercase tracking-wider">ESTRATÉGIA</h3>
                <span className="text-[11px] text-indigo-400 font-mono">Planejamento que gera impacto.</span>
                <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                  Bons designs sem fundamentação de negócios são apenas ilustrações. Mapeamos jornadas de compras para convencer do valor real do seu produto.
                </p>
              </div>
            </div>

            {/* PILLAR 3: RESULTADOS */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900/80 hover:border-amber-500/30 hover:bg-slate-900/60 transition-all flex flex-col gap-4">
              <div className="h-10 w-10 bg-amber-950/40 border border-amber-800/40 text-amber-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold font-sans text-white uppercase tracking-wider">RESULTADOS</h3>
                <span className="text-[11px] text-amber-505 font-mono">Foco no que realmente importa.</span>
                <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                  Nosso compromisso definitivo é com a melhoria da sua conversão, visibilidade comercial e engajamento qualificado de leads prontos para pagar.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* LEAD CONTACT FORM */}
      <ContactForm />

      {/* FLOATING ACTION TRIGGERS */}
      <QuickContact />

      {/* FOOTER SECTION */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          
          <div className="flex flex-col items-start gap-2">
            <button 
              onClick={() => handleScrollTo('hero')}
              className="flex items-center gap-2 font-display font-extrabold text-lg tracking-[0.15em] text-white uppercase cursor-pointer"
            >
              <div className="h-7 w-7">
                <Logo className="h-full w-full" showText={false} />
              </div>
              <span>Visu<span className="text-cyan-400 font-mono">ALL</span></span>
            </button>
            <p className="text-[11px] text-slate-500 font-sans mt-1">
              Agência Criativa Digital - Soluções focadas em conversões, anúncios, redes e posicionamento premium.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex gap-4 text-xs font-semibold text-slate-500 font-sans">
              <button onClick={() => handleScrollTo('servicos')} className="hover:text-slate-350 cursor-pointer">Serviços</button>
              <button onClick={() => handleScrollTo('calculadora')} className="hover:text-slate-350 cursor-pointer">Orçamento</button>
              <button onClick={() => handleScrollTo('faq')} className="hover:text-slate-350 cursor-pointer">FAQ</button>
              <button onClick={() => handleScrollTo('contato')} className="hover:text-slate-350 cursor-pointer">Fale Conosco</button>
            </div>

            <span className="hidden md:inline h-4 w-[1px] bg-slate-800" />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 text-xs text-slate-450 font-sans">
              <p className="text-slate-500 text-[11px]">
                Website criado e desenvolvido pela própria <span className="text-cyan-400 font-semibold">VisuALL</span>
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[10px] text-slate-600 font-mono">
          <span>
            © {currentYear} VisuALL Studio. Todos os direitos reservados.
          </span>
          <div className="flex gap-4">
            <a href="https://instagram.com/visuall.mediaa" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors cursor-pointer">Instagram Oficial</a>
            <span>•</span>
            <a href="https://instagram.com/visuall.mediaa" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors cursor-pointer">Direct (@visuall.mediaa)</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
