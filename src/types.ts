export interface Service {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  badges?: string[];
  icon: string;
}

export interface QuoteOption {
  id: string;
  name: string;
  category: 'anuncios' | 'packs' | 'sites' | 'fotos' | 'estrategia' | 'outros';
  basePriceEstimate?: string;
  deliveryTime: string;
  impactLevel: 'Alto' | 'Extremo' | 'Estratégico';
}

export interface ContactSubmission {
  name: string;
  email: string;
  whatsapp: string;
  businessName: string;
  servicesNeeded: string[];
  message: string;
}
