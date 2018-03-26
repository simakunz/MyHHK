import { IInvest } from './invest';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

/* retrieve data for the Invest-Table */

@Injectable()
export class InvestTableService {
  private _ccBaseUrl = 'https://api.cryptonator.com/api/ticker/';
  private _ccFinalUrl: string;
  private temp: any;


  constructor(private _http: HttpClient) {

  }

  /* retrieves from the ccBaseUrl the values for
      - cName = name of the crypto currency (e.g. 'XRP' for Ripple)
      - destCurrency = value of cName in the destination currency (e.g. 'EUR')
    Definition can be found here: https://min-api.cryptocompare.com/
      */
  getInvests(cName: string, destCurrency: string): Observable<IInvest[]> {
    /* return this._http.get<IInvest[]>('../../api/products/invests.json')
               .do(data => console.log('All: ' + JSON.stringify(data)))
               .catch(this.handleError); */
    // für später mal:
    this._ccFinalUrl = this._ccBaseUrl +  cName + '-' + destCurrency;
    return this._http.get<IInvest[]>(this._ccFinalUrl)
               .do(data => console.log('JSON all: ' + JSON.stringify(data)))
               .catch(this.handleError);
    // console.log('JSON Antwort: ' + this.temp);
    // return this.temp;
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
