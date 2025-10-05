// src/types/stock.ts
export interface Stock {
  code: string;
  name: string;
  price: number;
  change: number;
}

// src/types/snapshot.ts
export interface Snapshot {
  sym: string;
  lastPrice: number;
  volume: number;
  change: number;
}
