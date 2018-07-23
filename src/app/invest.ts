export interface IInvestTicker {
  base: string;
  target: string;
  price: string;
  volume: string;
  change: string;
}

export interface IInvest {
  investId: number;
  EUR: number;
   /*
   ticker: IInvestTicker;
   timestamp: number;
   success: boolean;
   error: string;
   */
  // rest to be defined to match the respective web service data

}
