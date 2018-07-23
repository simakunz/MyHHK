import { IExpense } from '../expense';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../messages/message.service';

//brauch ich das? ist aus der Tour of Heroes
//import { MessageService } from './messages/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })


/******************************
 * 
 * TODO's
 * 
 * - update, delete und add Expense noch implementieren (kopieren von ToH)
 * - alles überprüfen ;-)
 * 
 **********************************/

export class HHKTableService {

  /* ******************************
    - URL to web api
    - must be the same as in in-memory-hhk.service the return value
  ******************************** */
  private hhkUrl = 'api/hhk_entries';  

  constructor(
      private http: HttpClient, 
      private messageService: MessageService) { }
  //constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET Expenses data from the server */
  getExpenses (): Observable<IExpense[]> {
    this.log(`hhkUrl = "${this.hhkUrl}"`);
    return this.http.get<IExpense[]>(this.hhkUrl)
      .pipe(
        tap(expenses => this.log(`fetched expenses`)),
        catchError(this.handleError('getExpenses', []))
      );
  }

  /** GET expense by id. Return `undefined` when id not found */
  getExpenseNo404<Data>(id: number): Observable<IExpense> {
    const url = `${this.hhkUrl}/?id=${id}`;
    return this.http.get<IExpense[]>(url)
      .pipe(
        map(expenses => expenses[0]), // returns a {0|1} element array
        tap(e => {
          const outcome = e ? `fetched` : `did not find`;
          this.log(`${outcome} expense id=${id}`);
        }),
        catchError(this.handleError<IExpense>(`getExpense id=${id}`))
      );
  }

  /** GET expenese by id. Will 404 if id not found */
  getExpense(id: number): Observable<IExpense> {
    const url = `${this.hhkUrl}/${id}`;
    return this.http.get<IExpense>(url).pipe(
      tap(_ => this.log(`fetched expense id=${id}`)),
      catchError(this.handleError<IExpense>(`getExpense id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HHK-Table-Service message with the MessageService - once copied from Tour of Heroes ;-) */
  private log(message: string) {
    this.messageService.add('HHK-Table-Service: ' + message);
  }
  



  /*******************************************
   * old way of just returning the array... 
   * now replaced with the fake web-api and 
   * later on with a real connection to a server / DB
   * *****************************************
  getExpenses(): IExpense[] {
    return [
      {
        expenseId: 1,
        expenseYear: 2018,
        expenseMonth: 'Februar',
        expenseCategory: 'Zum regulären Ausgeben',
        expenseComment: 'Testeintrag einfach so',
        expenseActuals: 118.28,
        expensePlan: 200
      },
      {
        expenseId: 2,
        expenseYear: 2017,
        expenseMonth: 'Februar',
        expenseCategory: 'Zum regulären Ausgeben',
        expenseActuals: 10.50,
        expensePlan: 200,
        expenseComment: 'Döner mit Anke'
      },
      {
        expenseId: 3,
        expenseYear: 2018,
        expenseMonth: 'März',
        expenseCategory: 'Zum regulären Ausgeben',
        expenseActuals: 103.5,
        expensePlan: 200,
        expenseComment: 'Aigle Parcours Vario 2 Stiefel Ebay Kleinanzeigen'
      }
    ];
  }
  */
}
