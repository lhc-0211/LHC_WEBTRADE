export interface Stock {
  code: string;
  name: string;
  price: number;
  change: number;
}

export interface Snapshot {
  sym: string;
  lastPrice: number;
  volume: number;
  change: number;
}

export interface InfoIndex {
  insertedAt: string;
  marketId: string;
  tradingSessionId: string;
  marketIndexClass: string;
  indexsTypeCode: string;
  currency: string;
  transactTime: string;

  openIndexes: number;
  valueIndexes: number;
  totalVolumeTraded: number;
  grossTradeAmt: number;
  contauctAccTrdvol: number;
  contauctAccTrdval: number;
  blktrdAccTrdvol: number;
  blktrdAccTrdval: number;

  fluctuationUpperLimitIssueCount: number;
  fluctuationUpIssueCount: number;
  fluctuationSteadinessIssueCount: number;
  fluctuationDownIssueCount: number;
  fluctuationLowerLimitIssueCount: number;

  fluctuationUpIssueVolume: number;
  fluctuationDownIssueVolume: number;
  fluctuationSteadinessIssueVolume: number;

  status: string;
  openIndex: number;
  change: number;
  percentChange: number;
}

export interface ChartIndex {
  time: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  value: number;
  openPrice: number;
}

export interface ChartDataIndex {
  id: string;
  data: ChartIndex[];
}

export interface PriceVolumeChart {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
}
