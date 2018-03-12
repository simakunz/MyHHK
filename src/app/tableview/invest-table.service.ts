import { IInvest } from './invest';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


/* retrieve data for the Invest-Table */

@Injectable()
export class InvestTableService {
  private _ccBaseUrl = 'https://min-api.cryptocompare.com/data/'
  private _ccFinalUrl: string;
  constructor(private _http: HttpClient){ }

  /* retrieves from the ccBaseUrl the values for
      - cName = name of the crypto currency (e.g. 'XRP' for Ripple)
      - destCurrency = value of cName in the destination currency (e.g. 'EUR')
    Definition can be found here: https://min-api.cryptocompare.com/
      */
  getInvests(cName: string, destCurrency: string): Observable<IInvest[]> {
    return this._http.get<IInvest[]>('./api/products/invests.json');
    // für später mal:
    // this._ccFinalUrl = this._ccBaseUrl + 'price?fsym=' + cName + '&tsyms=' + destCurrency;
    // return this._http.get(this._ccFinalUrl);
  }
}
