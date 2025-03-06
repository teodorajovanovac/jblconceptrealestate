export interface ServicePricingRow {
  range: {
    sr: string;
    en: string;
  };
  fee: {
    sr: string;
    en: string;
  };
}

export interface ServicePricingTable {
  title: {
    sr: string;
    en: string;
  };
  rows: ServicePricingRow[];
}

export interface Service {
  name: {
    sr: string;
    en: string;
  };
  icon: any;
  description: {
    sr: string;
    en: string;
  };
  pricing: ServicePricingTable[] | string[];
  note?: {
    sr: string;
    en: string;
  };
} 