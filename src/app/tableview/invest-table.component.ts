import { InvestTableService } from './invest-table.service';
// import { Expense, IExpense } from './expense';
import { IInvest } from './invest';
import { Component, OnInit } from '@angular/core';


/* *****************************************************************
 * Open ToDo's:
 *  - alles ;-)
 * **************************************************************** */

// styleUrls is an array that is why in []
@Component({
  // the selector is no longer required with routing
  // selector: 'invest-table',
  templateUrl: './invest-table.component.html',
  styleUrls: ['./invest-table.component.css']
})

export class InvestTableComponent implements OnInit {
    pageTitle: string = 'MyHHK Invests';
    // private _InvestTableService; <= wird nur in der Langform des Constructors gebraucht

    /* ******************************************************
    * to filter properly, the get and set methods are used  *
    ******************************************************* */
    _investFilter: string;
    get investFilter(): string {
      return this._investFilter;
    }
    set investFilter(value: string){
      this._investFilter = value;
      this.filteredInvests = this.investFilter ? this.performFilter(this.investFilter) : this.invests;
    }


    currency: string = 'EUR'; // muss noch ausgelagert werden
    fxRate: number = 1; // muss noch ausgelagert werden
    filteredInvests: IInvest[];
    invests: IInvest[];
    errorMessage: string;


    /* der nachfolgende Code ist die Kurzform von:
    constructor(hhkTableService: HHKTableService) {
      this._hhkTableService = hhkTableService;
      this.filteredExpenses = this.expenses;
      this.commentFilter = '';
    }
    */
    constructor(private _investTableService: InvestTableService) {

      this.investFilter = '';
    }


    /* an initialisations which are to be performed, will be done here */
    ngOnInit(): void {
      console.log('now we are in OnInit of InvestTableComponent');

      this._investTableService.getInvests('XRP', 'EUR')
          .subscribe(invests => {
            this.invests = invests;
            this.filteredInvests = this.invests;
          },
          error => this.errorMessage = <any>error);
    }


    performFilter(filterBy: string): IInvest[] {
      filterBy = filterBy.toLocaleLowerCase();
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      return this.invests.filter((invest: IInvest) =>
        invest.ticker.base.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}
