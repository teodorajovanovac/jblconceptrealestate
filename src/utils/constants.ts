export const PRICE_RANGES = {
  buy: { min: 0, max: 1000000 },
  rent: { min: 0, max: 3000 }
} as const;

export const AREA_RANGE = { min: 0, max: 500 } as const;

export type TransactionType = 'buy' | 'rent'; 