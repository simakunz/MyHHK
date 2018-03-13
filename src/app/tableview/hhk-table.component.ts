import { HHKTableService } from './hhk-table.service';
// import { Expense, IExpense } from './expense';
import { IExpense } from './expense';
import { Component, OnInit } from '@angular/core';


/* *****************************************************************
 * Open ToDo's:
 *  - filters für Zahlen (Plan und Actuals)
 *  - Filter für DropDowns (Year, Month, Category)
 * **************************************************************** */

// styleUrls is an array that is why in []
@Component({
  // the selector is no longer required with routing
  // selector: 'hhk-table',
  templateUrl: './hhk-table.component.html',
  styleUrls: ['./hhk-table.component.css']
})

export class HHKTableComponent implements OnInit {
    pageTitle: string = 'MyHHK Details';
    imageWidth: number = 50;
    imageMargin: number = 2;
    imageUrl: string = '../../assets/images/share_price_graph.jpg';
    showImage: boolean = false;
    years: number[];
    selectedYear: number;

    // private _hhkTableService; <= wird nur in der Langform des Constructors gebraucht

    /* ******************************************************
    * to filter properly, the get and set methods are used  *
    ******************************************************* */
    _filters: string[] = ['', '', ''];
    get commentFilter(): string {
      return this._filters[0];
    }
    set commentFilter(value: string){
      this._filters[0] = value;
      this.filteredExpenses = this.commentFilter ? this.performFilter(this._filters) : this.expenses;
    }

    get plansFilter(): string {
        return this._filters[2];
      }
    set plansFilter(value: string){
        this._filters[2] = value;
        this.filteredExpenses = this.plansFilter ? this.performFilter(this._filters) : this.expenses;
    }

    get actualsFilter(): string {
        return this._filters[1];
      }
    set actualsFilter(value: string){
        this._filters[1] = value;
        this.filteredExpenses = this.actualsFilter ? this.performFilter(this._filters) : this.expenses;
    }




    currency: string = 'EUR';
    fxRate: number = 1;
    filteredExpenses: IExpense[];
    expenses: IExpense[];


    /* der nachfolgende Code ist die Kurzform von:
    constructor(hhkTableService: HHKTableService) {
      this._hhkTableService = hhkTableService;
      this.filteredExpenses = this.expenses;
      this.commentFilter = '';
    }
    */
   constructor(private _hhkTableService: HHKTableService) {

    this.commentFilter = '';
    this.actualsFilter = '';
    this.plansFilter = '';

   }

    /* method to deal with 5-Star-Rating Output messages */
    onRatingClicked(message: string): void {
      this.pageTitle = this.pageTitle + ': '  + message;
    }


    onInput(message: string): void {
      console.log('es wurde folgendes Jahr gewählt: ' + message);
    }

    // tslint:disable-next-line:no-trailing-whitespace

    /* an initialisations which are to be performed, will be done here */
    ngOnInit(): void {
      console.log('now we are in OnInit');
      this.expenses = this._hhkTableService.getExpenses();
      this.filteredExpenses = this.expenses;
      this.years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
    }

    /* ****************************
     * expects an array of filters
     * [0] = comment Filter
     * [1] = actuals Filter
     * [2] = plans Filter
     * ************************** */
    performFilter(filterBy: string[]): IExpense[] {
      // filterBy = filterBy.toLocaleLowerCase();
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

      return this.expenses.filter((expense: IExpense) =>
        expense.expenseComment.toLocaleLowerCase().indexOf(filterBy[0]) !== -1 &&
        expense.expenseActuals.toString().toLocaleLowerCase().indexOf(filterBy[1]) !== -1 &&
        expense.expensePlan.toString().toLocaleLowerCase().indexOf(filterBy[2]) !== -1
        );
/*
      if (filterType = 'comments') {
        return this.expenses.filter((expense: IExpense) =>
          expense.expenseComment.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }

      if (filterType = 'actuals') {
        return this.expenses.filter((expense: IExpense) =>
          expense.expenseActuals.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
      }

      if (filterType = 'plans') {
        return this.expenses.filter((expense: IExpense) =>
          expense.expensePlan.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
      }
*/
    }


    toggleImage(): void {
      this.showImage = !this.showImage;
    }
}
