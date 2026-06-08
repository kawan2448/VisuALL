import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  Send, 
  ShoppingBag, 
  Instagram, 
  Monitor, 
  Camera, 
  Target, 
  Plus, 
  Check, 
  HelpCircle,
  Smartphone,
  Copy,
  X,
  MessageCircle,
  CheckCircle,
  Video
} from 'lucide-react';

interface PromoService {
  id: string;
  name: string;
  category: 'anuncios' | 'packs' | 'sites' | 'fotos' | 'estrategia';
  deliveryTime: string;
  impactLevel: string;
  desc: string;
  icon: any;
  recommendation: string;
}

// Pricing rules for custom photo restoration packs
const getPhotoBasePrice = (q: number): number => {
  if (q <= 1) return 15;
  if (q === 2) return 28;
  if (q === 3) return 40;
  if (q === 4) return 53;
  if (q === 5) return 65;
  if (q >= 6 && q <= 9) {
    return 65 + (q - 5) * 11;
  }
  if (q === 10) return 120;
  // Above 10 photos
  return 120 + (q - 10) * 11;
};

// Pricing rules for photo animations as progressive premium add-on
const getPhotoAnimationPrice = (q: number): number => {
  if (q <= 1) return 10;
  if (q === 2) return 19;
  if (q === 3) return 28;
  if (q === 4) return 37;
  if (q === 5) return 45;
  if (q >= 6 && q <= 9) {
    return 45 + (q - 5) * 7;
  }
  if (q === 10) return 80;
  // Above 10 photos
  return 80 + (q - 10) * 8;
};

// Pricing rules for custom ads packs (anuncios)
const getAnunciosCustomPrice = (q: number): number => {
  if (q <= 1) return 10;
  if (q === 2) return 19;
  if (q === 3) return 28;
  if (q === 4) return 37;
  if (q === 5) return 45;
  if (q >= 6 && q <= 9) {
    return 45 + (q - 5) * 7;
  }
  if (q === 10) return 80;
  return 80 + (q - 10) * 7;
};

// Pricing rules for custom creative packs (packs)
const getPacksCustomPrice = (q: number): number => {
  if (q <= 1) return 15;
  if (q === 2) return 28;
  if (q === 3) return 41;
  if (q === 4) return 54;
  if (q === 5) return 65;
  if (q >= 6 && q <= 9) {
    return 65 + (q - 5) * 11;
  }
  if (q === 10) return 120;
  if (q >= 11 && q <= 19) {
    return 120 + (q - 10) * 10;
  }
  if (q === 20) return 220;
  return 220 + (q - 20) * 9.5;
};

const getPhotoQtyFromOptionId = (id: string): number => {
  if (id === '1') return 1;
  if (id === '3') return 3;
  if (id === '5') return 5;
  if (id === '10') return 10;
  return 1;
};

// Global pricing definition for sub-options
const serviceSubOptions: Record<string, Array<{ id: string; name: string; price: number; isCustom?: boolean }>> = {
  anuncios: [
    { id: '1', name: '1 foto/produto (R$ 10)', price: 10 },
    { id: '5', name: '5 fotos/produtos (R$ 45)', price: 45 },
    { id: '10', name: '10 fotos/produtos (R$ 80)', price: 80 }
  ],
  packs: [
    { id: '1', name: '1 arte (R$ 15)', price: 15 },
    { id: '5', name: '5 artes (R$ 65)', price: 65 },
    { id: '10', name: '10 artes (R$ 120)', price: 120 },
    { id: '20', name: '20 artes (R$ 220)', price: 220 }
  ],
  sites: [
    { id: 'simples', name: 'Landing Page Simples (R$ 170)', price: 170 },
    { id: 'institucional', name: 'Site Institucional (R$ 250)', price: 250 },
    { id: 'profissional', name: 'Site Profissional (R$ 400)', price: 400 },
    { id: 'loja', name: 'Loja Virtual (Sob Orçamento)', price: 0, isCustom: true }
  ],
  fotos: [
    { id: '1', name: '1 foto (R$ 15)', price: 15 },
    { id: '3', name: '3 fotos (R$ 40)', price: 40 },
    { id: '5', name: '5 fotos (R$ 65)', price: 65 },
    { id: '10', name: '10 fotos (R$ 120)', price: 120 }
  ],
  estrategia: [
    { id: 'simples', name: 'Logo Simples (R$ 50)', price: 50 },
    { id: 'profissional', name: 'Logo Profissional (R$ 100)', price: 100 },
    { id: 'identidade', name: 'Identidade Completa (R$ 150)', price: 150 }
  ]
};

export default function BudgetCalculator() {
  // Available strategic services list modeled from the user's details sheet
  const availableServices: PromoService[] = [
    {
      id: 'anuncios',
      name: 'Melhoria de Anúncios (iFood & Insta)',
      category: 'anuncios',
      deliveryTime: '2 a 4 dias úteis',
      impactLevel: 'Alto impacto em conversão rápida',
      desc: 'Edição profissional de fotos de produtos, criação de banners vibrantes e chamativos focados em converter cliques.',
      icon: ShoppingBag,
      recommendation: 'Ideal para restaurantes e comércios que buscam aumentar os pedidos no cardápio online imediato.'
    },
    {
      id: 'packs',
      name: 'Packs Criativos (Feed/Stories)',
      category: 'packs',
      deliveryTime: '3 a 7 dias úteis',
      impactLevel: 'Harmonia estética de alta conversão',
      desc: 'Artes estruturadas com identidade visual alinhada, pensadas estrategicamente para se destacar no feed.',
      icon: Instagram,
      recommendation: 'Excelente para quem deseja um feed impecável e atrativo de forma econômica.'
    },
    {
      id: 'sites',
      name: 'Criação de Sites e Landing Pages',
      category: 'sites',
      deliveryTime: '5 a 12 dias úteis',
      impactLevel: 'Estratégico (captura contínua e vendas)',
      desc: 'Landing pages e portfólios velozes otimizados para smartphones, sem taxas de domínio/hospedagem inclusas.',
      icon: Monitor,
      recommendation: 'Essencial para empresas que buscam estabelecer presença e fechar mais contatos no Google.'
    },
    {
      id: 'fotos',
      name: 'Revitalização & Colorização de Fotos',
      category: 'fotos',
      deliveryTime: '1 a 3 dias úteis',
      impactLevel: 'Alto valor e nitidez profissional + Opcional de Animação',
      desc: 'Melhoria estética, colorização, resgate de nitidez, remoção de imperfeições. Arraste para selecionar a quantidade exata!',
      icon: Camera,
      recommendation: 'Indicado para reviver registros de produtos manuais ou resgatar fotos antigas de família com requinte.'
    },
    {
      id: 'estrategia',
      name: 'Design de Marca & Posicionamento',
      category: 'estrategia',
      deliveryTime: '3 a 7 dias úteis',
      impactLevel: 'Visual de alto padrão e memorabilidade',
      desc: 'Processo completo de desenvolvimento de logomarcas impactantes e manuais de tom estético profissional.',
      icon: Target,
      recommendation: 'Para marcas que buscam ser lembradas com respeito e cobrar o preço premium que merecem.'
    }
  ];

  // Selected state arrays
  const [selectedServices, setSelectedServices] = useState<string[]>(['sites']);
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [whatsapp, setWhatsapp] = useState(''); // Serves as Instagram handle
  const [customGoal, setCustomGoal] = useState<string>('vendas');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Custom states for photo quantity and interactive toggle
  const [photoQuantity, setPhotoQuantity] = useState<number>(3);
  const [photoAnimationEnabled, setPhotoAnimationEnabled] = useState<boolean>(false);

  // Coupon and custom sliding states
  const [couponCode, setCouponCode] = useState('');
  const [useCustomSlider, setUseCustomSlider] = useState<Record<string, boolean>>({
    anuncios: false,
    packs: false,
    fotos: false
  });
  const [anunciosCustomQty, setAnunciosCustomQty] = useState<number>(5);
  const [packsCustomQty, setPacksCustomQty] = useState<number>(5);

  // Custom states for sub-option quantities of each service
  const [subOptions, setSubOptions] = useState<Record<string, string>>({
    anuncios: '1',
    packs: '1',
    sites: 'simples',
    fotos: '1',
    estrategia: 'simples'
  });

  // Custom states for the new Instagram copy workflow
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [compiledMessage, setCompiledMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(sid => sid !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Compute stats based on chosen items
  const selectedDetails = availableServices.filter(s => selectedServices.includes(s.id));
  
  // Calculate total estimated budget sum
  const calculateTotal = () => {
    let sum = 0;
    let hasCustomQuoteOf = false;
    
    selectedServices.forEach(serviceId => {
      if (serviceId === 'fotos') {
        if (useCustomSlider['fotos']) {
          const basePrice = getPhotoBasePrice(photoQuantity);
          const animPrice = photoAnimationEnabled ? getPhotoAnimationPrice(photoQuantity) : 0;
          sum += basePrice + animPrice;
        } else {
          const activeOptionId = subOptions['fotos'] || '1';
          const option = serviceSubOptions['fotos']?.find(o => o.id === activeOptionId);
          if (option) {
            const qty = getPhotoQtyFromOptionId(activeOptionId);
            const animPrice = photoAnimationEnabled ? getPhotoAnimationPrice(qty) : 0;
            sum += option.price + animPrice;
          }
        }
      } else if (serviceId === 'anuncios') {
        if (useCustomSlider['anuncios']) {
          sum += getAnunciosCustomPrice(anunciosCustomQty);
        } else {
          const activeOptionId = subOptions['anuncios'] || '1';
          const option = serviceSubOptions['anuncios']?.find(o => o.id === activeOptionId);
          if (option) sum += option.price;
        }
      } else if (serviceId === 'packs') {
        if (useCustomSlider['packs']) {
          sum += getPacksCustomPrice(packsCustomQty);
        } else {
          const activeOptionId = subOptions['packs'] || '1';
          const option = serviceSubOptions['packs']?.find(o => o.id === activeOptionId);
          if (option) sum += option.price;
        }
      } else {
        const activeOptionId = subOptions[serviceId] || '1';
        const options = serviceSubOptions[serviceId];
        if (options) {
          const option = options.find(o => o.id === activeOptionId);
          if (option) {
            if (option.isCustom) {
              hasCustomQuoteOf = true;
            } else {
              sum += option.price;
            }
          }
        }
      }
    });
    
    return { sum, hasCustomQuoteOf };
  };

  // Estimate max delivery time dynamic calculation
  const estimateDays = () => {
    let minDays = 0;
    let maxDays = 0;
    
    // Parse times approximately
    selectedDetails.forEach(s => {
      const match = s.deliveryTime.match(/(\d+)\s+a\s+(\d+)/);
      if (match) {
        minDays += parseInt(match[1]);
        maxDays += parseInt(match[2]);
      } else {
        minDays += 4;
        maxDays += 8;
      }
    });

    // If multiple items, reduce overlapping time by slightly compressing delivery time
    if (selectedDetails.length > 1) {
      minDays = Math.max(...selectedDetails.map(s => {
        const m = s.deliveryTime.match(/(\d+)\s+a\s+(\d+)/);
        return m ? parseInt(m[1]) : 4;
      })) + Math.floor(minDays * 0.2);
      
      maxDays = Math.max(...selectedDetails.map(s => {
        const m = s.deliveryTime.match(/(\d+)\s+a\s+(\d+)/);
        return m ? parseInt(m[2]) : 8;
      })) + Math.floor(maxDays * 0.2);
    }

    return `${minDays} a ${maxDays} dias úteis`;
  };

  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMsg('Por favor, informe seu nome.');
      return;
    }
    if (!whatsapp.trim()) {
      setErrorMsg('Por favor, informe seu Instagram (Ex: @seuusuario).');
      return;
    }
    setErrorMsg('');

    // Pre-build Instagram text template with custom package selections
    const serviceDetailsLines = selectedDetails.map(s => {
      if (s.id === 'fotos') {
        if (useCustomSlider['fotos']) {
          const basePrice = getPhotoBasePrice(photoQuantity);
          const animPrice = photoAnimationEnabled ? getPhotoAnimationPrice(photoQuantity) : 0;
          const totalPhotoPrice = basePrice + animPrice;
          const animText = photoAnimationEnabled ? ` (Com Efeito de Animação)` : ' (Apenas Restauração/Colorização)';
          return `• ${s.name}: Pack Personalizado de ${photoQuantity} foto(s)${animText} (R$ ${totalPhotoPrice})`;
        } else {
          const activeOptId = subOptions['fotos'] || '1';
          const opt = serviceSubOptions['fotos']?.find(o => o.id === activeOptId);
          const qty = getPhotoQtyFromOptionId(activeOptId);
          const animPrice = photoAnimationEnabled ? getPhotoAnimationPrice(qty) : 0;
          const basePrice = opt ? opt.price : 0;
          const totalPhotoPrice = basePrice + animPrice;
          const animText = photoAnimationEnabled ? ` (Com Efeito de Animação)` : ' (Apenas Restauração/Colorização)';
          return `• ${s.name}: Pack Pronto de ${qty} foto(s)${animText} (R$ ${totalPhotoPrice})`;
        }
      }
      if (s.id === 'anuncios') {
        if (useCustomSlider['anuncios']) {
          const price = getAnunciosCustomPrice(anunciosCustomQty);
          return `• ${s.name}: Pack Personalizado de ${anunciosCustomQty} produto(s) (R$ ${price})`;
        } else {
          const activeOptId = subOptions['anuncios'] || '1';
          const opt = serviceSubOptions['anuncios']?.find(o => o.id === activeOptId);
          return `• ${s.name}: ${opt ? opt.name : 'Padrão'}`;
        }
      }
      if (s.id === 'packs') {
        if (useCustomSlider['packs']) {
          const price = getPacksCustomPrice(packsCustomQty);
          return `• ${s.name}: Pack Personalizado de ${packsCustomQty} arte(s) (R$ ${price})`;
        } else {
          const activeOptId = subOptions['packs'] || '1';
          const opt = serviceSubOptions['packs']?.find(o => o.id === activeOptId);
          return `• ${s.name}: ${opt ? opt.name : 'Padrão'}`;
        }
      }
      const activeOptId = subOptions[s.id] || '1';
      const opt = serviceSubOptions[s.id]?.find(o => o.id === activeOptId);
      const optName = opt ? opt.name : 'Padrão';
      return `• ${s.name}: ${optName}`;
    }).join('\n');

    const goalLabel = customGoal === 'vendas' 
      ? 'Aumentar Vendas e Clientes 📈' 
      : customGoal === 'autoridade' 
        ? 'Elevar Autoridade da Marca ⭐' 
        : 'Modernizar Toda a Identidade 🎨';

    const { sum, hasCustomQuoteOf } = calculateTotal();
    const isCouponValid = couponCode.trim().toUpperCase() === 'PRIMEIRACOMPRA';
    const discountAmount = isCouponValid ? sum * 0.2 : 0;
    const finalSum = sum - discountAmount;

    let priceText = '';
    if (hasCustomQuoteOf) {
      if (isCouponValid) {
        priceText = `R$ ${Math.round(finalSum)} (Aplicado 20% OFF do cupom PRIMEIRACOMPRA de R$ ${sum}) + Sob Orçamento`;
      } else {
        priceText = `R$ ${sum} + Sob Orçamento (Avaliação Especial)`;
      }
    } else {
      if (isCouponValid) {
        priceText = `R$ ${Math.round(finalSum)} (Aplicado 20% OFF do cupom PRIMEIRACOMPRA de R$ ${sum})`;
      } else {
        priceText = `R$ ${sum}`;
      }
    }

    const text = `✨ NOVO PROJETO SIMULADO (VisuALL) ✨

🧑‍💼 Contato: ${clientName.trim()}
📸 Instagram: ${whatsapp.trim().startsWith('@') ? whatsapp.trim() : '@' + whatsapp.trim()}
🏢 Empresa: ${businessName.trim() || 'Não especificada'}

🎯 Objetivo Principal: ${goalLabel}
⏱️ Tempo Estimado: ${estimateDays()}

🛠️ Soluções Definidas:
${serviceDetailsLines}

💰 Valor do Orçamento: ${priceText}

Olá equipe VisuALL! Criei esse escopo personalizado no simulador do site de vocês e gostaria de dar início a esse projeto!`;

    setCompiledMessage(text);
    setShowCopyModal(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(compiledMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="calculadora" className="relative py-24 px-4 md:px-8 bg-slate-950 border-t border-slate-900 overflow-hidden">
      
      {/* Decorative lights */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-950/15 rounded-full blur-[130px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">
            <Calculator className="h-3 w-3" />
            Simulador VisuALL
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-amber-100 to-white font-sans tracking-tight">
            Monte Seu Escopo de Sucesso
          </h2>
          <p className="mt-3 text-slate-450 text-sm max-w-xl mx-auto">
            Selecione uma combinação dos nossos serviços estratégicos e simule em tempo real o preço real, tempo estimado e o impacto estético para a sua marca.
          </p>
        </div>

        {/* Double Column Core Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Checklist Selection */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-350 tracking-wider font-mono uppercase">
              1. Selecione as soluções desejadas:
            </h3>

            <div className="flex flex-col gap-3">
              {availableServices.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                const IconComp = service.icon;

                return (
                  <motion.div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-xl border cursor-pointer select-none transition-all duration-200 flex flex-col ${
                      isSelected 
                        ? 'bg-slate-900 border-amber-500/40 shadow-[0_4px_20px_rgba(245,158,11,0.05)]' 
                        : 'bg-slate-900/40 border-slate-850 hover:border-slate-800 hover:bg-slate-900/60'
                    }`}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox indicator */}
                      <div className={`mt-1 h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                        isSelected ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-700'
                      }`}>
                        {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <IconComp className={`h-4.5 w-4.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                          <h4 className={`font-semibold font-sans text-sm md:text-base leading-none ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                            {service.name}
                          </h4>
                        </div>
                        
                        <p className="text-xs text-slate-400 leading-relaxed font-sans mb-1.5">
                          {service.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 text-[9px] font-mono mt-2">
                          <span className="bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-850 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" /> Entrega: {service.deliveryTime}
                          </span>
                          <span className={`px-2 py-0.5 rounded border flex items-center gap-1 ${
                            isSelected ? 'bg-amber-950/40 border-amber-900/40 text-amber-400' : 'bg-slate-950 text-slate-500 border-slate-850'
                          }`}>
                            <TrendingUp className="w-2.5 h-2.5" /> {service.impactLevel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Highly Interactive Inside Sub-Options accordions */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 pt-4 border-t border-slate-800/80 overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Tabs for choosing Custom Slider or Ready-Made Packages if service is anuncios, packs, or fotos */}
                          {['anuncios', 'packs', 'fotos'].includes(service.id) && (
                            <div className="flex gap-2 p-1 bg-slate-950 border border-slate-900 rounded-lg mb-4">
                              <button
                                type="button"
                                onClick={() => setUseCustomSlider(prev => ({ ...prev, [service.id]: false }))}
                                className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-md transition-all cursor-pointer ${
                                  !useCustomSlider[service.id]
                                    ? 'bg-amber-500 text-slate-950'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                📦 Packs Prontos
                              </button>
                              <button
                                type="button"
                                onClick={() => setUseCustomSlider(prev => ({ ...prev, [service.id]: true }))}
                                className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-md transition-all cursor-pointer ${
                                  useCustomSlider[service.id]
                                    ? 'bg-amber-500 text-slate-950'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                🎚️ Pack Personalizado
                              </button>
                            </div>
                          )}

                          {/* CASE 1: FOTOS */}
                          {service.id === 'fotos' && (
                            <>
                              {useCustomSlider['fotos'] ? (
                                /* Photo Slider Content */
                                <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col gap-4">
                                  <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                      <span className="text-lg font-black text-white font-sans flex items-baseline gap-1">
                                        {photoQuantity} <span className="text-xs font-semibold text-slate-400">foto{photoQuantity > 1 ? 's' : ''}</span>
                                      </span>
                                      <span className="text-[9px] font-mono text-amber-400 uppercase font-bold tracking-widest leading-none mt-1">
                                        Restauração: R$ {getPhotoBasePrice(photoQuantity)}
                                      </span>
                                    </div>
                                    <div className="text-right flex flex-col">
                                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">VALOR DO PACK</span>
                                      <span className="text-sm font-black text-amber-500 font-mono">
                                        R$ {getPhotoBasePrice(photoQuantity) + (photoAnimationEnabled ? getPhotoAnimationPrice(photoQuantity) : 0)}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-semibold text-slate-500 font-mono">1</span>
                                    <input
                                      type="range"
                                      min="1"
                                      max="25"
                                      value={photoQuantity}
                                      onChange={(e) => setPhotoQuantity(Number(e.target.value))}
                                      className="flex-1 h-1.5 rounded-lg cursor-pointer appearance-none bg-slate-900 border border-slate-800 focus:outline-none accent-amber-500"
                                    />
                                    <span className="text-[10px] font-semibold text-slate-500 font-mono">25</span>
                                  </div>
                                </div>
                              ) : (
                                /* Photo Ready-Made Options content */
                                <div className="flex flex-col gap-3">
                                  <p className="text-[10px] font-mono font-bold text-slate-550 mb-1 uppercase tracking-wider">
                                    Selecione a quantidade de fotos desejada:
                                  </p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {serviceSubOptions['fotos'].map((opt) => {
                                      const isOptSelected = subOptions['fotos'] === opt.id;
                                      return (
                                        <button
                                          key={opt.id}
                                          type="button"
                                          onClick={() => setSubOptions({
                                            ...subOptions,
                                            fotos: opt.id
                                          })}
                                          className={`py-2 px-3 text-left text-xs rounded-lg border transition-all cursor-pointer font-sans font-medium flex justify-between items-center ${
                                            isOptSelected
                                              ? 'bg-amber-950/40 border-amber-500/60 text-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.08)]'
                                              : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                                          }`}
                                        >
                                          <span>{opt.name.split(' (')[0]}</span>
                                          <span className="text-[10px] font-bold text-amber-400 font-mono">
                                            R$ {opt.price}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Animation switch applicable to both modes of fotos */}
                              <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 mt-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <div className="flex items-start gap-2.5">
                                    <button
                                      type="button"
                                      onClick={() => setPhotoAnimationEnabled(!photoAnimationEnabled)}
                                      className={`mt-0.5 h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                        photoAnimationEnabled ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-700 bg-slate-900'
                                      }`}
                                    >
                                      {photoAnimationEnabled && <Check className="h-3 w-3 stroke-[3]" />}
                                    </button>
                                    <div className="flex flex-col text-left">
                                      <span className="text-xs font-bold text-slate-200 font-sans leading-tight">Adicionar Animação nas Fotos (+ R$)</span>
                                      <span className="text-[10px] text-slate-400 leading-normal">
                                        Dê vida e movimento realistas para as fotos selecionadas.
                                      </span>
                                    </div>
                                  </div>
                                  {photoAnimationEnabled && (
                                    <div className="text-right shrink-0">
                                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold block">ANIMAÇÃO</span>
                                      <span className="text-xs font-bold text-amber-400 font-mono">
                                        + R$ {useCustomSlider['fotos'] 
                                          ? getPhotoAnimationPrice(photoQuantity) 
                                          : getPhotoAnimationPrice(getPhotoQtyFromOptionId(subOptions['fotos'] || '1'))}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          )}

                          {/* CASE 2: ANUNCIOS */}
                          {service.id === 'anuncios' && (
                            <>
                              {useCustomSlider['anuncios'] ? (
                                <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col gap-4">
                                  <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                      <span className="text-lg font-black text-white font-sans flex items-baseline gap-1">
                                        {anunciosCustomQty} <span className="text-xs font-semibold text-slate-400">produto{anunciosCustomQty > 1 ? 's' : ''}/anúncio{anunciosCustomQty > 1 ? 's' : ''}</span>
                                      </span>
                                    </div>
                                    <div className="text-right flex flex-col">
                                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">VALOR DO PACK</span>
                                      <span className="text-sm font-black text-amber-500 font-mono">
                                        R$ {getAnunciosCustomPrice(anunciosCustomQty)}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-semibold text-slate-500 font-mono">1</span>
                                    <input
                                      type="range"
                                      min="1"
                                      max="30"
                                      value={anunciosCustomQty}
                                      onChange={(e) => setAnunciosCustomQty(Number(e.target.value))}
                                      className="flex-1 h-1.5 rounded-lg cursor-pointer appearance-none bg-slate-900 border border-slate-800 focus:outline-none accent-amber-500"
                                    />
                                    <span className="text-[10px] font-semibold text-slate-500 font-mono">30</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {serviceSubOptions['anuncios'].map((opt) => {
                                    const isOptSelected = subOptions['anuncios'] === opt.id;
                                    return (
                                      <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => setSubOptions({
                                          ...subOptions,
                                          anuncios: opt.id
                                        })}
                                        className={`py-2 px-3 text-left text-xs rounded-lg border transition-all cursor-pointer font-sans font-medium flex justify-between items-center ${
                                          isOptSelected
                                            ? 'bg-amber-955/40 border-amber-500/60 text-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.08)]'
                                            : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                                        }`}
                                      >
                                        <span>{opt.name.split(' (')[0]}</span>
                                        <span className="text-[10px] font-bold text-amber-400 font-mono">
                                          R$ {opt.price}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </>
                          )}

                          {/* CASE 3: PACKS */}
                          {service.id === 'packs' && (
                            <>
                              {useCustomSlider['packs'] ? (
                                <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col gap-4">
                                  <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                      <span className="text-lg font-black text-white font-sans flex items-baseline gap-1">
                                        {packsCustomQty} <span className="text-xs font-semibold text-slate-400">arte{packsCustomQty > 1 ? 's' : ''} (Feed/Stories)</span>
                                      </span>
                                    </div>
                                    <div className="text-right flex flex-col">
                                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">VALOR DO PACK</span>
                                      <span className="text-sm font-black text-amber-500 font-mono">
                                        R$ {getPacksCustomPrice(packsCustomQty)}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-semibold text-slate-500 font-mono">1</span>
                                    <input
                                      type="range"
                                      min="1"
                                      max="50"
                                      value={packsCustomQty}
                                      onChange={(e) => setPacksCustomQty(Number(e.target.value))}
                                      className="flex-1 h-1.5 rounded-lg cursor-pointer appearance-none bg-slate-900 border border-slate-800 focus:outline-none accent-amber-500"
                                    />
                                    <span className="text-[10px] font-semibold text-slate-500 font-mono">50</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {serviceSubOptions['packs'].map((opt) => {
                                    const isOptSelected = subOptions['packs'] === opt.id;
                                    return (
                                      <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => setSubOptions({
                                          ...subOptions,
                                          packs: opt.id
                                        })}
                                        className={`py-2 px-3 text-left text-xs rounded-lg border transition-all cursor-pointer font-sans font-medium flex justify-between items-center ${
                                          isOptSelected
                                            ? 'bg-amber-955/40 border-amber-500/60 text-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.08)]'
                                            : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                                        }`}
                                      >
                                        <span>{opt.name.split(' (')[0]}</span>
                                        <span className="text-[10px] font-bold text-amber-400 font-mono">
                                          R$ {opt.price}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </>
                          )}

                          {/* CASE 4: SITES & ESTRATEGIA (No Slider, only preset options) */}
                          {['sites', 'estrategia'].includes(service.id) && serviceSubOptions[service.id] && (
                            <div className="flex flex-col gap-2">
                              <p className="text-[10px] font-mono font-bold text-slate-550 mb-1 uppercase tracking-wider">
                                Escolha o Escopo / Nível Ideal:
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {serviceSubOptions[service.id].map((opt) => {
                                  const isOptSelected = subOptions[service.id] === opt.id;
                                  return (
                                    <button
                                      key={opt.id}
                                      type="button"
                                      onClick={() => setSubOptions({
                                        ...subOptions,
                                        [service.id]: opt.id
                                      })}
                                      className={`py-2 px-3 text-left text-xs rounded-lg border transition-all cursor-pointer font-sans font-medium flex justify-between items-center ${
                                        isOptSelected
                                          ? 'bg-amber-955/40 border-amber-500/60 text-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.08)]'
                                          : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                                      }`}
                                    >
                                      <span>{opt.name.split(' (')[0]}</span>
                                      <span className="text-[10px] font-bold text-amber-400 font-mono">
                                        {opt.isCustom ? 'Sob orçamento' : `R$ ${opt.price}`}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>


          {/* Right: Lead info and dynamic summary card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              {/* Glow accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-sm font-bold text-slate-350 tracking-wider font-mono uppercase mb-5">
                2. Detalhes &amp; Finalização:
              </h3>

              <form onSubmit={handleWhatsappSubmit} className="flex flex-col gap-4">
                
                {/* Contact Inputs */}
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[11px] font-bold text-slate-400 font-mono uppercase">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Ex: Yuri Ramos"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-650"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[11px] font-bold text-slate-400 font-mono uppercase">Seu Instagram *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: @seuusuario"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-650"
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[11px] font-bold text-slate-400 font-mono uppercase">Nome da Sua Empresa (se não tiver, não preencha)</label>
                    <input
                      type="text"
                      maxLength={60}
                      placeholder="Se não tiver, não preencha"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-650"
                    />
                  </div>
                </div>

                {/* Coupon Input */}
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[11px] font-bold text-slate-400 font-mono uppercase">Cupom de Desconto</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: PRIMEIRACOMPRA"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-650 uppercase font-mono"
                    />
                    {couponCode.trim().toUpperCase() === 'PRIMEIRACOMPRA' && (
                      <span className="bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-center font-mono">
                        20% OFF ATIVO
                      </span>
                    )}
                  </div>
                </div>

                {/* Strategic Business Goal */}
                <div className="flex flex-col gap-1.5 text-left mb-2">
                  <label className="text-[11px] font-bold text-slate-400 font-mono uppercase">Objetivo Preferido</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'vendas', label: 'Vendas 📈' },
                      { id: 'autoridade', label: 'Autoridade ⭐' },
                      { id: 'design', label: 'Modernidade 🎨' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setCustomGoal(g.id)}
                        className={`py-2 px-1 text-center font-bold text-[10px] rounded-lg border cursor-pointer transition-all ${
                          customGoal === g.id
                            ? 'bg-amber-955/45 border-amber-500 text-amber-300'
                            : 'bg-slate-950 border-slate-850 text-slate-450 hover:bg-slate-950/70 hover:text-white'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Dynamic Output Card inside details summary */}
                <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[9px] font-mono text-slate-500">
                    <span>RESUMO DO ESCOPO</span>
                    <span className="text-amber-400 font-extrabold bg-amber-950/40 px-1 py-0.2 border border-amber-900/30 rounded scale-90">LIVE SIMULATOR</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Total de Soluções:</span>
                      <span className="font-extrabold text-white">{selectedServices.length} serviço(s)</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Tempo de Entrega Estimado:</span>
                      <span className="font-extrabold text-amber-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> {estimateDays()}
                      </span>
                    </div>

                    {/* Preço Estimado do Orçamento com suporte a cupons */}
                    {couponCode.trim().toUpperCase() === 'PRIMEIRACOMPRA' ? (
                      <>
                        <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2 mt-1">
                          <span className="text-slate-400">Subtotal:</span>
                          <span className="font-bold text-slate-300 font-mono">
                            R$ {calculateTotal().sum}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-emerald-400">Desconto Cupom (20% OFF):</span>
                          <span className="font-bold text-emerald-400 font-mono">
                            - R$ {Math.round(calculateTotal().sum * 0.2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-y border-white/5 py-2 mt-1">
                          <span className="text-white font-bold">Total do Projeto:</span>
                          <span className="font-black text-amber-400 text-base font-mono">
                            {calculateTotal().hasCustomQuoteOf 
                              ? `R$ ${Math.round(calculateTotal().sum * 0.8)} + Sob Orçamento` 
                              : `R$ ${Math.round(calculateTotal().sum * 0.8)}`}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2 mt-1">
                        <span className="text-white font-bold">Valor Estimado:</span>
                        <span className="font-black text-amber-400 text-base font-mono">
                          {calculateTotal().hasCustomQuoteOf 
                            ? `R$ ${calculateTotal().sum} + Sob Orçamento` 
                            : `R$ ${calculateTotal().sum}`}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col gap-1 pt-2">
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">RECOMENDAÇÃO INTUITIVA</span>
                      <p className="text-[11px] text-slate-300 leading-relaxed italic">
                        "{selectedDetails[0]?.recommendation || ''}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <span className="text-xs text-red-400 bg-red-950/30 border border-red-900/40 px-3 py-1.5 rounded-lg text-center font-bold">
                    ⚠️ {errorMsg}
                  </span>
                )}

                {/* Main Action Trigger */}
                <motion.button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-sans font-black text-xs md:text-sm uppercase tracking-wider rounded-xl cursor-pointer shadow-lg flex items-center justify-center gap-2 transition-all mt-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Instagram className="h-4 w-4" />
                  Gerar Orçamento no Instagram
                </motion.button>

                <p className="text-[9px] text-slate-500 text-center leading-relaxed">
                  Gera uma mensagem estruturada perfeita para copiar e enviar via Direct para a VisuALL.
                </p>
              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Styled Interactive Premium Copy Modal */}
      <AnimatePresence>
        {showCopyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCopyModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-hidden text-left"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

              {/* Close Button Button */}
              <button
                onClick={() => setShowCopyModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white p-1 rounded-full hover:bg-slate-850 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-slate-950 shrink-0 shadow-lg shadow-amber-500/20">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white font-sans leading-none">Orçamento Pronto para Enviar!</h3>
                  <span className="text-[9px] text-amber-400 font-mono uppercase tracking-widest font-bold">COPIAR E ENVIAR NO DIRECT</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                Nós estruturamos um resumo impecável baseado no seu escopo simulado. Copie o texto abaixo e nos envie por Direct no Instagram. 😊
              </p>

              {/* Dynamic Compiled Text displaying formatted details */}
              <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 relative flex flex-col gap-2 mb-5">
                <span className="text-[8px] text-slate-500 font-mono uppercase font-bold tracking-wider">MENSAGEM DO SIMULADOR</span>
                <pre className="text-[11px] text-slate-200 leading-relaxed font-sans whitespace-pre-wrap font-medium">
                  {compiledMessage}
                </pre>

                {/* Copy button */}
                <button
                  onClick={handleCopyMessage}
                  className={`mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    copied 
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400' 
                      : 'bg-slate-900 border-slate-800 hover:border-slate-750 text-slate-300 hover:text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Copiado com Sucesso!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copiar Conteúdo
                    </>
                  )}
                </button>
              </div>

              {/* CTA button to visit profile */}
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
                className="w-full py-3 px-4 bg-gradient-to-tr from-pink-500 via-purple-600 to-orange-500 hover:opacity-95 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2 transition-all"
              >
                <Instagram className="w-4 h-4 text-white" />
                {copied ? 'Abrir Instagram e Enviar DM 📸' : 'Copiar e Abrir Instagram 📸'}
              </a>

              <p className="text-[9px] text-slate-500 text-center leading-relaxed mt-3">
                Ao clicar, você visitará o perfil <strong>@visuall.mediaa</strong>. Basta colar a mensagem copiada e daremos início imediato ao seu atendimento!
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
