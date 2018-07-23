import { InvestTableService } from './invest-table.service';
// import { Expense, IExpense } from './expense';
import { IInvest } from '../invest';
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
    
    _investFilters: string[] = [''];
    //currency: string = 'EUR'; // muss noch ausgelagert werden
    //fxRate: number = 1; // muss noch ausgelagert werden
    filteredInvests: IInvest[];
    invests: IInvest[];
    //errorMessage: string;

    get idFilter(): string {
      return this._investFilters[0];
    }

    set idFilter(value: string){
      this._investFilters[0] = value;
      console.log('this._investFilter in Methode -set IDFilter- wurde gesetzt auf : "' + this._investFilters +'"');
      
      this.filteredInvests = this.idFilter ? this.performFilter(this._investFilters) : this.invests;
      console.log('this.invests in Methode -set IDFilter- wurde gesetzt auf :' + this.invests);
    }
    

    


    /* der nachfolgende Code ist die Kurzform von:
    constructor(hhkTableService: HHKTableService) {
      this._hhkTableService = hhkTableService;
      this.filteredExpenses = this.expenses;
      this.commentFilter = '';
    }
    */
    constructor(private _investTableService: InvestTableService) {
      this.idFilter = '';
    }


    /* an initialisations which are to be performed, will be done here */
    ngOnInit(): void {
      //console.log('now we are in OnInit of InvestTableComponent');
      this.invests = this._investTableService.getInvests();
      this.filteredInvests = this.invests;

      
      /********************************************
        as long as invest-table.service is not an observable, keep this outlined
    
        ****************************

      this._investTableService.getInvests('XRP', 'EUR')
          .subscribe(invests => {
            this.invests = invests;
            this.filteredInvests = this.invests; 
          },
          error => this.errorMessage = <any>error);
      */
    }

    
    //filtert aktuell nur nach investID
    performFilter(filterBy: string[]): IInvest[] {
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      //return this.invests.filter((invest: IInvest) =>
      //    invest.ticker.base.toLocaleLowerCase().indexOf(filterBy) !== -1);
      console.log('Invest-FilterBy[0] = "' + filterBy[0] +'"');
      console.log('invests[0].investID = "' + this.invests[0].investId + '"');
      console.log('invests[0].EUR = "' + this.invests[0].EUR + '"');
      return this.invests.filter((invest: IInvest) => 
            invest.investId.toString().toLocaleLowerCase().indexOf(filterBy[0]) !== -1);

      /*
        
      this.temp = this.expenses.filter((expense: IExpense) =>
        expense.expenseComment.toLocaleLowerCase().indexOf(filterBy[0]) !== -1 &&
        expense.expenseActuals.toString().toLocaleLowerCase().indexOf(filterBy[1]) !== -1 &&
        expense.expensePlan.toString().toLocaleLowerCase().indexOf(filterBy[2]) !== -1 &&
        expense.expenseYear.toString().toLocaleLowerCase().indexOf(filterBy[3]) !== -1 &&
        expense.expenseMonth.toString().toLocaleLowerCase().indexOf(filterBy[4]) !== -1 &&
        expense.expenseCategory.toString().toLocaleLowerCase().indexOf(filterBy[5]) !== -1
        );
      // console.log('filterBy: ' + filterBy.toString());
      // console.log('Filterwerte: [0]: ' + this.temp[0].expenseId + ', [1]: ' +
      //           this.temp[1].expenseId + ', [2]: ' + this.temp[2].expenseId);
      return this.temp;
      */

      // aus hhk-table.component:
      /*
        return this.expenses.filter((expense: IExpense) => 
            expense.expenseActuals.toString().toLocaleLowerCase().indexOf(filterBy[1]) !== -1
      */
    }    
}
