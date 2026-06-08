import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Instagram, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Sparkles, 
  Target, 
  TrendingUp, 
  ChevronRight, 
  Layers, 
  Maximize2,
  Heart,
  MessageCircle,
  Send,
  Eye,
  Check,
  Zap,
  MousePointer,
  RotateCcw
} from 'lucide-react';

export default function ServicesShowcase() {
  const [activeTab, setActiveTab] = useState<'all' | 'digital' | 'creative' | 'premium'>('all');
  
  // State for Service 1: Ads Optimizer (Standard vs VisuALL)
  const [adType, setAdType] = useState<'standard' | 'visuall'>('visuall');
  
  // State for Service 2: Instagram Pack (Selected Post Category)
  const [selectedInstaPost, setSelectedInstaPost] = useState<number>(0);
  
  // State for Service 3: Responsive Sites (Device Frame Width)
  const [siteDevice, setSiteDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  // State for Service 4: Before/After Photo Restoration Slider
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState<number>(300);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (!sliderRef.current) return;
    const updateWidth = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(sliderRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // State for Service 5: Strategy Target Click Section
  const [strategyDetail, setStrategyDetail] = useState<number>(0);

  // State for Service 6: ROI Growth Chart Metric Selection
  const [chartMetric, setChartMetric] = useState<'sales' | 'engagement' | 'ctr'>('sales');

  // Handle Photo comparison slider interaction
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSliding) return;
    handleSliderMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSliding) return;
    handleSliderMove(e.clientX);
  };

  useEffect(() => {
    const stopSliding = () => setIsSliding(false);
    
    if (isSliding) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', stopSliding);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', stopSliding);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopSliding);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopSliding);
    };
  }, [isSliding]);

  // Instagram Mock Data
  const instaPosts = [
    {
      title: "PROMOÇÃO ESPECIAL",
      tag: "50% OFF",
      bgClass: "from-rose-600 to-indigo-600",
      content: "Queima de estoque de meio do ano. Últimos dias para garantir com valor promocional!",
      likes: "1,248",
      comments: "142",
      badge: "Feed Promo"
    },
    {
      title: "NOVA COLEÇÃO",
      tag: "LANÇAMENTO",
      bgClass: "from-cyan-500 via-blue-600 to-indigo-900",
      content: "Conheça o futuro do design corporativo. Peças exclusivas pensadas para gerar resultados.",
      likes: "982",
      comments: "49",
      badge: "Lançamento"
    },
    {
      title: "SUA MARCA NO TOPO",
      tag: "O SEGREDO",
      bgClass: "from-emerald-500 to-teal-800",
      content: "Como o posicionamento visual atrai clientes qualificados sem gastar fortunas em anúncios.",
      likes: "1,539",
      comments: "284",
      badge: "Feed Conteúdo"
    },
    {
      title: "CONFIANÇA E SUCESSO",
      tag: "DEPOIMENTO",
      bgClass: "from-amber-500 to-red-600",
      content: "'Depois que fechamos com a VisuALL, o faturamento da nossa hambúrgueria subiu 45%.'",
      likes: "870",
      comments: "39",
      badge: "Social Proof"
    }
  ];

  // Strategy Details array
  const strategyItems = [
    {
      label: "Identidade Forte",
      text: "Criação de marcas marcantes e com alta presença digital. Cores, fontes e formas intencionais que conversam diretamente com a necessidade do seu setor.",
      color: "border-cyan-500 text-cyan-400 bg-cyan-950/20"
    },
    {
      label: "Posicionamento Premium",
      text: "Transformamos a percepção de valor do seu negócio. Saia da guerra por preço e seja escolhido pela qualidade e sofisticação estratégica da sua comunicação.",
      color: "border-indigo-500 text-indigo-400 bg-indigo-950/20"
    },
    {
      label: "Gatilhos de Conversão",
      text: "Copys estratégicas aliadas a designs que guiam o olhar e o desejo de compra do cliente. CTAs claras que eliminam a fricção e aumentam conversão.",
      color: "border-amber-500 text-amber-400 bg-amber-950/20"
    }
  ];

  // Object representing charts data
  const chartMetrics = {
    sales: {
      title: "Aumento de Vendas",
      valBefore: 30,
      valAfter: 95,
      percentStr: "+400%",
      label: "Conversões de Clientes / Mês",
      color: "from-emerald-500 to-cyan-400",
      desc: "Nossos parceiros relatam que a qualificação dos leads que chegam do site otimizado multiplica a taxa de fechamento de novos negócios."
    },
    engagement: {
      title: "Engajamento Social",
      valBefore: 45,
      valAfter: 88,
      percentStr: "+180%",
      label: "Cliques e Compartilhamentos / Dia",
      color: "from-cyan-500 to-blue-500",
      desc: "Anúncios estáticos e posts genéricos são ignorados. Com criativos dinâmicos da VisuALL, a sua retenção segura o olhar do usuário no feed."
    },
    ctr: {
      title: "CTR de Anúncios",
      valBefore: 25,
      valAfter: 85,
      percentStr: "+250%",
      label: "Cliques no Link / 1000 Impressões",
      color: "from-purple-500 to-cyan-400",
      desc: "Campanhas publicitárias configuradas com artes magnéticas geram um custo por clique (CPC) muito menor, otimizando todo o seu investimento."
    }
  };

  return (
    <section id="servicos" className="relative py-24 px-4 md:px-8 bg-slate-950 text-white overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-950/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-950/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* Section Title Header aligned with Slogan and Infographic */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4"
          >
            <Sparkles className="h-3 w-3 animate-pulse" />
            Nossos Serviços
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-sans tracking-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-50 via-cyan-100 to-blue-200"
          >
            Transformamos Ideias em Resultados
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-slate-400 leading-relaxed font-sans"
          >
            Soluções criativas e estratégicas para destacar sua marca, conectar com seu público e aumentar suas vendas de maneira extraordinária.
          </motion.p>
        </div>

        {/* Dynamic Bento Box Services Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* GRID CARD 1: MELHORAMOS SEUS ANÚNCIOS (iFOOD, INSTAGRAM...) */}
          <motion.div 
            id="servico-anuncios"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-slate-900/65 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between overflow-hidden relative group hover:border-cyan-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-cyan-950/40 border border-cyan-800/50 rounded-xl text-cyan-400">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-red-950/40 border border-red-900/50 text-red-400 rounded-full px-2 py-0.5 font-semibold font-mono tracking-wider">iFood</span>
                  <span className="text-[10px] bg-pink-950/40 border border-pink-900/50 text-pink-400 rounded-full px-2 py-0.5 font-semibold font-mono tracking-wider">Instagram</span>
                </div>
              </div>
              <h3 className="text-xl font-bold font-sans text-slate-100 mb-2">
                Melhoramos Seus Anúncios
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                Anúncios que realmente chamam atenção e geram mais cliques, pedidos e conversões nas suas plataformas de vendas preferidas.
              </p>
            </div>

            {/* Interactive Widget 1: Interactive Ad Optimizer */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 relative overflow-hidden flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider">SIMULADOR DE ANÚNCIO</span>
                <div className="flex gap-1.5 p-0.5 bg-slate-900 border border-slate-800 rounded-lg">
                  <button
                    onClick={() => setAdType('standard')}
                    className={`text-[9px] font-extrabold px-2 py-1 rounded transition-all ${adType === 'standard' ? 'bg-red-950 text-red-400 border border-red-800/40' : 'text-slate-500 hover:text-slate-200'}`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setAdType('visuall')}
                    className={`text-[9px] font-extrabold px-2 py-1 rounded transition-all flex items-center gap-1 ${adType === 'visuall' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-slate-500 hover:text-slate-200'}`}
                  >
                    + VisuALL
                  </button>
                </div>
              </div>

              {/* Ad comparison viewer */}
              <div className="relative h-44 rounded-lg overflow-hidden border border-slate-850 flex items-center justify-center bg-slate-900">
                <AnimatePresence mode="wait">
                  {adType === 'standard' ? (
                    <motion.div 
                      key="standardAd"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full p-3 flex flex-row items-center gap-4 bg-slate-900 relative"
                    >
                      <div className="w-20 h-20 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center relative shrink-0">
                        <img 
                          src="/cookie_normal.jpg" 
                          alt="Anúncio normal de cookie"
                          className="w-full h-full object-cover filter brightness-90 saturate-75"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-1 right-1 text-[7px] bg-red-950/90 text-red-400 border border-red-800/40 rounded px-1 font-mono font-bold">NORMAL</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex gap-1 items-center mb-1">
                          <span className="bg-slate-800 text-slate-400 text-[8px] px-1 py-0.2 rounded font-bold font-mono">ANÚNCIO COMUM</span>
                        </div>
                        <h4 className="text-[12px] font-bold text-slate-300 leading-tight font-sans">Arte Amadora & Sem Destaque</h4>
                        <p className="text-[8px] text-slate-500 mt-1 leading-snug">Imagens sem brilho e texto genérico passam despercebidos pelo feed de vendas.</p>
                        <div className="flex items-center gap-1.5 mt-2 text-[8px] font-mono text-red-500 font-bold uppercase tracking-wider">
                          <span>Média Conversão (1.2% CTR)</span>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 text-[8px] font-mono text-rose-500 border border-rose-900/60 bg-rose-950/20 px-1.5 py-0.5 rounded uppercase font-bold">Normal</div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="visuallAd"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full p-3 flex flex-row items-center gap-4 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-900 relative border-l-4 border-cyan-500"
                    >
                      {/* Glow effect */}
                      <div className="absolute top-1/2 left-4 -translate-y-1/2 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
                      
                      <div className="w-20 h-20 bg-slate-950 border border-cyan-500/50 rounded-lg overflow-hidden flex items-center justify-center relative shrink-0 shadow-lg shadow-cyan-500/10">
                        <img 
                          src="/cookie_melhorado.jpg" 
                          alt="Anúncio otimizado pela VisuALL"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-1 right-1 text-[7px] bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 rounded px-1 font-mono font-bold">+ VISUALL</span>
                      </div>

                      {/* Details of the ad */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex gap-1.5 mb-1 items-center">
                          <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[8px] px-1 py-0.2 rounded font-bold font-mono">DESIGN PREMIUM</span>
                          <span className="bg-emerald-400 text-slate-950 text-[7px] font-extrabold px-1 rounded">ALTO CTR</span>
                        </div>
                        <h4 className="text-[12px] font-extrabold text-white leading-tight font-sans tracking-tight">Anúncio de Cookie Profissional!</h4>
                        <p className="text-[8px] text-slate-300 mt-1 leading-snug">Cores vibrantes, contraste focado no produto e design persuasivo para engajamento imediato.</p>
                        
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="flex -space-x-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-slate-950" />
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 border border-slate-950" />
                          </div>
                          <span className="text-[7px] text-cyan-400 font-bold font-mono uppercase tracking-wider animate-pulse">Cliques +320%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>


          {/* GRID CARD 2: PACKS CRIATIVOS PARA INSTAGRAM */}
          <motion.div 
            id="servico-packs"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/65 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between overflow-hidden relative group hover:border-indigo-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-950/40 border border-indigo-800/50 rounded-xl text-indigo-400">
                  <Instagram className="h-6 w-6" />
                </div>
                <span className="text-[10px] bg-indigo-950/40 border border-indigo-900/50 text-indigo-400 rounded-full px-2.5 py-0.5 font-semibold font-mono tracking-wider">ARTES PREMIUM</span>
              </div>
              <h3 className="text-xl font-bold font-sans text-slate-100 mb-2">
                Packs Criativos
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                Kits estruturados e prontos com postagens harmônicas de feed e stories. Garanta padronização de identidade visual premium.
              </p>
            </div>

            {/* Interactive Widget 2: Custom Instagram feed grid preview */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-3 h-52 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 border-b border-slate-850">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <span className="text-[9px] font-semibold text-slate-400 font-mono">ESTILO DE POST</span>
                </div>
                <div className="flex items-center gap-1">
                  <CameraIcon className="w-3 h-3 text-slate-500" />
                  <span className="text-[8px] text-slate-500 font-mono">@visuall.mediaa</span>
                </div>
              </div>

              {/* Selected post preview display */}
              <div className="flex-1 my-2 grid grid-cols-5 gap-2 items-center">
                
                {/* 4 grid buttons representing feed items */}
                <div className="col-span-2 grid grid-cols-2 gap-1.5 max-h-32">
                  {instaPosts.map((post, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedInstaPost(i)}
                      className={`aspect-square rounded border cursor-pointer overflow-hidden p-1 flex flex-col items-center justify-center text-center relative transition-all ${
                        selectedInstaPost === i 
                          ? 'border-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.35)] scale-102 bg-slate-900' 
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950'
                      }`}
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className={`w-full h-full rounded bg-gradient-to-br ${post.bgClass} opacity-85 hover:opacity-100 p-0.5 flex flex-col items-center justify-center relative`}>
                        <span className="text-[7px] text-white leading-none font-bold scale-85 uppercase">{post.badge.split(' ')[0]}</span>
                        {selectedInstaPost === i && (
                          <div className="absolute inset-0 border-2 border-white rounded opacity-40" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* iPhone Frame Simulator displaying selected post larger */}
                <div className="col-span-3 h-full rounded-lg border border-slate-800 bg-slate-900 p-2 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800 flex items-center justify-center text-white text-[5px] font-bold">V</div>
                    <span className="text-[7px] text-slate-300 font-semibold font-mono truncate">visuall_feed</span>
                  </div>

                  <div className={`flex-1 my-1 rounded bg-gradient-to-br ${instaPosts[selectedInstaPost].bgClass} p-2 flex flex-col justify-between relative`}>
                    <div className="flex justify-between items-start">
                      <span className="text-[6px] font-extrabold bg-black/40 px-1 py-0.2 rounded text-indigo-200">
                        {instaPosts[selectedInstaPost].badge}
                      </span>
                      <span className="text-[7px] font-black text-amber-300 underline tracking-tighter decoration-1 uppercase">
                        {instaPosts[selectedInstaPost].tag}
                      </span>
                    </div>

                    <div className="text-center">
                      <h5 className="text-[11px] font-extrabold text-white leading-none drop-shadow-md tracking-tight uppercase">
                        {instaPosts[selectedInstaPost].title}
                      </h5>
                    </div>

                    <p className="text-[6.5px] scale-95 text-slate-100/90 leading-tight text-center truncate drop-shadow-sm">
                      {instaPosts[selectedInstaPost].content}
                    </p>
                  </div>

                  {/* Likes / Interactive Footer of simulator */}
                  <div className="flex items-center justify-between text-slate-500 text-[6.5px] border-t border-slate-850 pt-1">
                    <div className="flex gap-2">
                      <span className="flex items-center gap-0.5 text-rose-500"><Heart className="w-2 h-2 fill-rose-500" /> {instaPosts[selectedInstaPost].likes}</span>
                      <span className="flex items-center gap-0.5"><MessageCircle className="w-2 h-2" /> {instaPosts[selectedInstaPost].comments}</span>
                    </div>
                    <Send className="w-2.5 h-2.5 text-slate-500 hover:text-white cursor-pointer" />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>


          {/* GRID CARD 3: CRIAÇÃO DE SITES */}
          <motion.div 
            id="servico-sites"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/65 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between overflow-hidden relative group hover:border-violet-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-violet-950/40 border border-violet-800/50 rounded-xl text-violet-400">
                  <Monitor className="h-6 w-6" />
                </div>
                <span className="text-[10px] bg-violet-950/40 border border-violet-900/50 text-violet-400 rounded-full px-2.5 py-0.5 font-semibold font-mono tracking-wider">HTML5 / RESPONSIVO</span>
              </div>
              <h3 className="text-xl font-bold font-sans text-slate-100 mb-2">
                Criação de Sites
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                Sites modernos, responsivos e otimizados para mecanismos de buscas (SEO), prontos para transformar cliques em clientes.
              </p>
            </div>

            {/* Interactive Widget 3: Live responsive layout resize simulator */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-3 h-52 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between pb-1 border-b border-slate-850">
                <span className="text-[9px] font-bold text-slate-500 tracking-wider font-mono">SIMULADOR RESPONSIVIDADE</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setSiteDevice('desktop')}
                    className={`p-1 rounded cursor-pointer ${siteDevice === 'desktop' ? 'text-violet-400 bg-violet-950/50 border border-violet-800/40' : 'text-slate-500 hover:text-slate-200'}`}
                    title="Desktop"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setSiteDevice('tablet')}
                    className={`p-1 rounded cursor-pointer ${siteDevice === 'tablet' ? 'text-violet-400 bg-violet-950/50 border border-violet-800/40' : 'text-slate-500 hover:text-slate-200'}`}
                    title="Tablet"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setSiteDevice('mobile')}
                    className={`p-1 rounded cursor-pointer ${siteDevice === 'mobile' ? 'text-violet-400 bg-violet-950/50 border border-violet-800/40' : 'text-slate-550 hover:text-slate-200'}`}
                    title="Mobile"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mock desktop/tablet/mobile device frame */}
              <div className="flex-1 my-2 flex items-center justify-center bg-slate-900 border border-slate-850 rounded-lg overflow-hidden relative">
                
                {/* Dynamically sizing box with layout */}
                <motion.div
                  className="bg-slate-950 border border-slate-850 rounded shadow-md overflow-hidden flex flex-col p-2"
                  animate={{ 
                    width: siteDevice === 'desktop' ? '90%' : siteDevice === 'tablet' ? '60%' : '35%',
                    height: '85%'
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                >
                  {/* Browser bar */}
                  <div className="flex items-center justify-between border-b border-slate-850 pb-1 mb-1.5 text-[6px]">
                    <div className="flex gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      <span className="w-1 h-1 rounded-full bg-amber-500" />
                      <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-slate-600 font-mono bg-slate-900 px-2 py-0.1 outline-none rounded truncate max-w-[60px]">loja.com</span>
                    <span className="w-1 h-1" />
                  </div>

                  {/* Floating landing page content structure changes based on width */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-[7px] border-b border-slate-900 pb-1">
                      <span className="font-extrabold text-violet-400 uppercase tracking-wide">Logo</span>
                      {siteDevice === 'desktop' ? (
                        <div className="flex gap-2 text-slate-500 text-[6px] font-mono scale-90">
                          <span>Home</span><span>Sobre</span><span>Contato</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-bold scale-[0.7]">☰</span>
                      )}
                    </div>

                    {/* Section body */}
                    <div className="grid grid-cols-12 gap-1.5 my-1 flex-1 items-center">
                      <div className={`${siteDevice === 'mobile' ? 'col-span-12' : 'col-span-7'} flex flex-col gap-1 text-left`}>
                        <h4 className="text-[9px] font-bold text-slate-200 leading-none">Venda mais com Design</h4>
                        <p className="text-[5.5px] text-slate-500 leading-tight">O seu site é a sua vitrine 24 horas.</p>
                        <span className="text-[5px] bg-violet-600 text-white rounded w-max px-1.5 py-0.2 pointer-events-none mt-1">Contato</span>
                      </div>
                      
                      {siteDevice !== 'mobile' && (
                        <div className="col-span-5 h-full rounded bg-slate-900 border border-slate-800 flex items-center justify-center">
                          <span className="text-[6px] font-extrabold text-violet-400 italic">3D Canvas</span>
                        </div>
                      )}
                    </div>

                    {/* Footer text */}
                    <div className="text-[5px] text-center text-slate-700 border-t border-slate-900 pt-0.5 mt-0.5">
                      © 100% Responsivo e Veloz
                    </div>
                  </div>

                </motion.div>
                
              </div>
            </div>
          </motion.div>


          {/* GRID CARD 4: REVITALIZAMOS E ANIMAMOS FOTOS ANTIGAS */}
          <motion.div 
            id="servico-fotos"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-slate-900/65 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between overflow-hidden relative group hover:border-amber-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-xl text-amber-400">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="text-[10px] bg-amber-950/40 border border-amber-900/50 text-amber-400 rounded-full px-2.5 py-0.5 font-semibold font-mono tracking-wider">RESTAURAÇÃO</span>
              </div>
              <h3 className="text-xl font-bold font-sans text-slate-100 mb-2">
                Revitalização de Fotos
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                Damos vida nova e cor às suas lembranças antigas com restauração de riscos, coloração realista e animações tridimensionais.
              </p>
            </div>

            {/* Interactive Widget 4: Horizontal Before/After image comparison slider */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-3 h-52 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 border-b border-slate-850 text-[9px] font-mono">
                <span className="font-bold text-slate-500 tracking-wider">RESTAURAÇÃO EM TEMPO REAL</span>
                <span className="text-amber-400 font-extrabold flex items-center gap-1">
                  Arraste o Slider <MousePointer className="w-2.5 h-2.5" />
                </span>
              </div>

              {/* Main Comparison Area */}
              <div 
                ref={sliderRef}
                className="flex-1 my-2 rounded-lg overflow-hidden relative bg-slate-900 border border-slate-850 select-none cursor-ew-resize min-h-[160px]"
                onMouseDown={() => setIsSliding(true)}
                onTouchStart={() => setIsSliding(true)}
              >
                {/* 1. Behind Screen (Full colored fully restored version) */}
                <div className="absolute inset-0 w-full h-full bg-slate-900">
                  <img 
                    src="/restauracao_color.jpg" 
                    alt="Foto restaurada e colorida"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Badge */}
                  <span className="absolute top-2 right-2 text-[8px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 rounded px-1.5 font-mono py-0.5 backdrop-blur-sm z-10 font-bold">
                    DEPOIS
                  </span>
                </div>

                {/* 2. Sliding Screen (Overlaid, black-and-white, scratched version) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden border-r border-white/40 pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="absolute inset-y-0 left-0 h-full" style={{ width: sliderWidth }}>
                    <img 
                      src="/restauracao_bw.jpg" 
                      alt="Foto antiga em preto e branco"
                      className="absolute inset-0 h-full object-cover select-none pointer-events-none max-w-none"
                      style={{ width: sliderWidth }}
                      referrerPolicy="no-referrer"
                    />
                    {/* Badge */}
                    <span className="absolute top-2 left-2 text-[8px] bg-slate-950/80 text-slate-300 border border-slate-800/40 rounded px-1.5 font-mono py-0.5 backdrop-blur-sm z-10 whitespace-nowrap font-bold">
                      ANTES
                    </span>
                  </div>
                </div>

                {/* 3. Slider Line and Handle Control */}
                <div 
                  className="absolute inset-y-0 w-[2px] bg-white pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,1)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-950 border border-white flex items-center justify-center text-white text-[10px] select-none shadow-lg">
                    ↔
                  </div>
                </div>
              </div>

              {/* Details of comparison */}
              <div className="flex justify-between items-center text-[7px] text-slate-500 font-mono">
                <span>← ARRASTE PARA VER (DEPOIS)</span>
                <span>(ANTES) ARRASTE PARA VER →</span>
              </div>
            </div>
          </motion.div>


          {/* GRID CARD 5: DESIGN QUE CONECTA. ESTRATÉGIA QUE VENDE. */}
          <motion.div 
            id="servico-estrategia"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/65 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between overflow-hidden relative group hover:border-sky-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-sky-950/40 border border-sky-800/50 rounded-xl text-sky-450">
                  <Target className="h-6 w-6" />
                </div>
                <span className="text-[10px] bg-sky-950/40 border border-sky-900/50 text-sky-450 rounded-full px-2.5 py-0.5 font-semibold font-mono tracking-wider">MÉTODOS COM COMPROVAÇÃO</span>
              </div>
              <h3 className="text-xl font-bold font-sans text-slate-100 mb-2">
                Design com Estratégia
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                Criamos marcas, campanhas e criativos com base em funis de comportamento, comunicando o diferencial certo para atrair cliques.
              </p>
            </div>

            {/* Interactive Widget 5: Interactive strategic target mapping */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-3 h-52 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between pb-1 border-b border-slate-850">
                <span className="text-[9px] font-bold text-slate-500 tracking-wider font-mono">PILARES DA NOSSA ESTRATÉGIA</span>
                <span className="text-[8px] bg-slate-900 px-1 py-0.2 text-sky-450 rounded font-bold uppercase">ALVO CRITÍCO DE VENDAS</span>
              </div>

              {/* Target clicking structure */}
              <div className="flex-1 my-2 grid grid-cols-12 gap-2 items-center">
                {/* Visual mini target board */}
                <div className="col-span-5 flex items-center justify-center relative">
                  <div className="w-24 h-24 rounded-full border border-slate-850 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-dotted border-slate-700 flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }} />
                    <div className="absolute w-12 h-12 rounded-full border border-sky-500/30 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-sky-950/40 border border-sky-500 flex items-center justify-center animate-ping" />
                      <div className="absolute w-4 h-4 rounded-full bg-sky-500 border border-white flex items-center justify-center text-slate-950 text-[6px] font-black">
                        🎯
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clickable tabs that open strategic text answers */}
                <div className="col-span-7 flex flex-col gap-1.5 h-full justify-center">
                  {strategyItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setStrategyDetail(idx)}
                      className={`text-left p-1.5 rounded border text-[9px] cursor-pointer transition-all ${
                        strategyDetail === idx 
                          ? 'bg-sky-950/40 border-sky-500 text-white font-extrabold' 
                          : 'bg-slate-950/55 border-slate-850 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{idx + 1}. {item.label}</span>
                        {strategyDetail === idx && <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Strategic text block displaying selected strategy detail */}
              <div className="bg-slate-900 border border-slate-850 p-2 rounded text-[7.5px] text-slate-350 min-h-[46px] flex items-center leading-relaxed">
                {strategyItems[strategyDetail].text}
              </div>
            </div>
          </motion.div>


          {/* GRID CARD 6: PARA MARCAS QUE QUEREM MAIS */}
          <motion.div 
            id="servico-mais"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/65 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between overflow-hidden relative group hover:border-emerald-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-emerald-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="text-[10px] bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 rounded-full px-2.5 py-0.5 font-semibold font-mono tracking-wider">CRESCIMENTO REAL</span>
              </div>
              <h3 className="text-xl font-bold font-sans text-slate-100 mb-2">
                Para Marcas Que Querem Mais
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                Impulsionamos autoridade, visibilidade e engajamento. Criamos layouts eficientes para que sua empresa mude de patamar de vendas.
              </p>
            </div>

            {/* Interactive Widget 6: Animated interactive conversion / growth metrics vertical bar chart */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-3 h-52 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 border-b border-white/5">
                <span className="text-[9px] font-bold text-slate-500 tracking-wider font-mono">MÉTRICAS ESTIMATIVAS DE IMPACTO</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setChartMetric('sales')}
                    className={`text-[8px] font-bold px-1.5 py-0.5 rounded cursor-pointer ${chartMetric === 'sales' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' : 'text-slate-550'} hover:text-slate-200`}
                  >
                    Vendas
                  </button>
                  <button 
                    onClick={() => setChartMetric('engagement')}
                    className={`text-[8px] font-bold px-1.5 py-0.5 rounded cursor-pointer ${chartMetric === 'engagement' ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/50' : 'text-slate-550'} hover:text-slate-200`}
                  >
                    Engajamento
                  </button>
                  <button 
                    onClick={() => setChartMetric('ctr')}
                    className={`text-[8px] font-bold px-1.5 py-0.5 rounded cursor-pointer ${chartMetric === 'ctr' ? 'bg-purple-950/60 text-purple-400 border border-purple-800/50' : 'text-slate-550'} hover:text-slate-200`}
                  >
                    Cliques
                  </button>
                </div>
              </div>

              {/* Graphic bar chart comparison with live animations */}
              <div className="flex-1 my-2 flex flex-row items-end gap-6 justify-center h-28 relative">
                
                {/* Background dashed goal lines */}
                <div className="absolute inset-x-0 bottom-4 border-b border-dashed border-slate-800/60" />
                <div className="absolute inset-x-0 bottom-16 border-b border-dashed border-slate-800/60" />
                <div className="absolute inset-x-0 bottom-24 border-b border-dashed border-slate-800/60" />

                {/* Left Bar: "Antes" */}
                <div className="flex flex-col items-center gap-1.5 relative z-10">
                  <span className="text-[9px] text-slate-400 font-bold font-mono">Normal</span>
                  <div className="w-10 bg-slate-800 border border-slate-700 rounded-t-md p-1 flex items-end justify-center transition-all duration-700" style={{ height: `${chartMetrics[chartMetric].valBefore}px` }}>
                    <span className="text-[6.5px] font-bold font-mono text-slate-400 text-center select-none uppercase">Min</span>
                  </div>
                  <span className="text-[7.5px] text-slate-500 font-mono tracking-wider">Sem VisuALL</span>
                </div>

                {/* Right Bar: "Com VisuALL" (Animated) */}
                <div className="flex flex-col items-center gap-1.5 relative z-10">
                  <motion.span 
                    key={chartMetric + "-label"}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[10px] text-emerald-400 font-extrabold font-mono"
                  >
                    {chartMetrics[chartMetric].percentStr}
                  </motion.span>
                  
                  {/* Dynamic Height Bar with gradient fill matching metric */}
                  <motion.div 
                    key={chartMetric + "-bar"}
                    className={`w-10 bg-gradient-to-t ${chartMetrics[chartMetric].color} border border-white/20 rounded-t-md relative shadow-[0_0_15px_rgba(16,185,129,0.2)]`}
                    initial={{ height: 10 }}
                    animate={{ height: chartMetrics[chartMetric].valAfter }}
                    transition={{ type: 'spring', stiffness: 85, damping: 10 }}
                  >
                    {/* Glowing pulse indicator dot on top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full' border-2 border-emerald-400 animate-ping" />
                  </motion.div>
                  <span className="text-[8px] text-emerald-400 font-extrabold font-mono tracking-wide uppercase">Crescimento</span>
                </div>
              </div>

              {/* Informative text below details */}
              <div className="text-[7.5px] leading-relaxed text-slate-400">
                {chartMetrics[chartMetric].desc}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

// Camera icon fallback
function CameraIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
}
