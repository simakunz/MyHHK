import { HHKTableService } from './hhk-table.service';
// import { Expense, IExpense } from './expense';
import { IExpense } from '../expense';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from '../messages/message.service';
import { Categories } from '../categories';
import { Months } from '../months';
import { Years } from '../years';


/* *****************************************************************
 * Open ToDo's:
 *  - add functionality for Delete
 *  - add functionality for Update
 *  - add functionality for Add -> see add-expense folder
 *  - empty the input-search fields in the "clearFilter" method
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
    months: string[];
    categories: string[];
    currency: string = 'EUR';
    fxRate: number = 1;
    _expenseFilters: string[] = ['', '', '', '', '', ''];
    filteredExpenses: IExpense[];
    expenses: IExpense[];
    //temp: IExpense[];
    //tempExp: IExpense;
    /*
    icYear = new FormControl(''); //input control Year
    icMonth = new FormControl(''); // input control Month
    icCategory = new FormControl(''); //input control Category
  */


    // private _hhkTableService; <= wird nur in der Langform des Constructors gebraucht

    /* der nachfolgende Code ist die Kurzform von:
    constructor(hhkTableService: HHKTableService) {
      this._hhkTableService = hhkTableService;
      this.filteredExpenses = this.expenses;
      this.commentFilter = '';
    }
    */
   constructor(private _hhkTableService: HHKTableService, private messageService: MessageService, private y: Years, private m: Months, private c: Categories) {
    this.commentFilter = '';
    this.actualsFilter = '';
    this.plansFilter = '';
   }

   ngOnInit(): void {
    this._hhkTableService.getExpenses().subscribe(expenses => {this.expenses = expenses;
      console.log(expenses);
      this.filteredExpenses = this.expenses});
  
    this.years = this.y.getYears();
    this.months = this.m.get();
    this.categories = this.c.get();
  }


    /* ******************************************************
    * to filter properly, the get and set methods are used
    * filters[0] = comments
    * filters[1] = plans
    * filters[2] = actuals
    * filters[3] = year
    * filters[4] = month
    * filters[5] = category
    ******************************************************* */
    
    get commentFilter(): string {
      return this._expenseFilters[0];
    }

    set commentFilter(value: string){
      this._expenseFilters[0] = value;
      this.filteredExpenses = this.commentFilter ? this.performFilter(this._expenseFilters) : this.expenses;
    }

    get plansFilter(): string {
        return this._expenseFilters[2];
      }
    set plansFilter(value: string){
        this._expenseFilters[2] = value;
        this.filteredExpenses = this.plansFilter ? this.performFilter(this._expenseFilters) : this.expenses;
    }

    get actualsFilter(): string {
        return this._expenseFilters[1];
      }
    set actualsFilter(value: string){
        this._expenseFilters[1] = value;
        this.filteredExpenses = this.actualsFilter ? this.performFilter(this._expenseFilters) : this.expenses;
    }

    onYearInput($event): void {
      this._expenseFilters[3] = $event.target.value;
      this.filteredExpenses = $event.target.value ? this.performFilter(this._expenseFilters) : this.expenses;
    }

    onMonthInput($event): void {
      this._expenseFilters[4] = $event.target.value;
      this.filteredExpenses = $event.target.value ? this.performFilter(this._expenseFilters) : this.expenses;
    }

    onCategoryInput($event): void {
      this._expenseFilters[5] = $event.target.value;
      this.filteredExpenses = $event.target.value ? this.performFilter(this._expenseFilters) : this.expenses;
    }

    clearFilters(): void {
      this._expenseFilters = ['', '', '', '', '', ''];
      this.filteredExpenses = this.expenses;
      // TODO: alle Input-Fields löschen
    }
  
    /* ****************************
     * expects an array of filters
     * [0] = comment Filter
     * [1] = actuals Filter
     * [2] = plans Filter
     * [3] = Year
     * [4] = Month
     * [5] = Category
     * ************************** */
    performFilter(filterBy: string[]): IExpense[] {     
      return this.expenses.filter((expense: IExpense) =>
        expense.expenseComment.toLowerCase().indexOf(filterBy[0].toLowerCase()) !== -1 &&
        expense.expenseActuals.toString().toLowerCase().indexOf(filterBy[1].toLowerCase()) !== -1 &&
        expense.expensePlan.toString().toLowerCase().indexOf(filterBy[2].toLowerCase()) !== -1 &&
        expense.expenseYear.toString().toLowerCase().indexOf(filterBy[3].toLowerCase()) !== -1 &&
        expense.expenseMonth.toString().toLowerCase().indexOf(filterBy[4].toLowerCase()) !== -1 &&
        expense.expenseCategory.toLowerCase().match(filterBy[5].toLowerCase())
        );
      //return this.temp;
    }

    /* /********************************
     * 
     * this section is for 'adding a new expense' via the 'add' button
     * 
     *******************************/
/*    set addCategory(c: string){
      this.tempExp.expenseCategory = c;
    }

    set addActual(a: number){
      this.tempExp.expenseActuals = a;
    }

    set addComment(c: string){
      this.tempExp.expenseComment = c;
    }

    set addMonth(m: string){
      this.tempExp.expenseMonth = m;
    }

    set addPlan(a: number){
      this.tempExp.expensePlan = a;
    }

    set addYear(a: number){
      this.tempExp.expenseYear = a;
    }

    add(): void {
      this._hhkTableService.addExpense( this.tempExp )
        .subscribe(expense => {
          this.expenses.push(expense);
        });
      // this.tempExp = null;
    }
 */

  delete(expense: IExpense): void {
    this.expenses = this.expenses.filter(e => e !== expense);
    this.filteredExpenses = this.filteredExpenses.filter(e => e !== expense);
    this._hhkTableService.deleteExpense(expense).subscribe();
  }

    

    /** Log a HHK-Table-Service message with the MessageService - once copied from Tour of Heroes ;-) */
    private log(message: string) {
      this.messageService.add('HHK-Table-Component: ' + message);
    }


    /* method to deal with 5-Star-Rating Output messages */
    onRatingClicked(message: string): void {
      this.pageTitle = this.pageTitle + ': '  + message;
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }
}
