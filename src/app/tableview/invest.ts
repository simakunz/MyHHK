export interface IInvestTicker {
  base: string;
  target: string;
  price: string;
  volume: string;
  change: string;
}

export interface IInvest {
  investId: number;
  ticker: IInvestTicker;
  timestamp: string;
  success: string;
  error: string;
  // rest to be defined to match the respective web service data

}
