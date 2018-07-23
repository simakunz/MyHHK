import { HHKTableService } from './hhk-table.service';
// import { Expense, IExpense } from './expense';
import { IExpense } from '../expense';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages/message.service';


/* *****************************************************************
 * Open ToDo's:
 *  - Filter für DropDowns (Month, Category) <=> nur Year funktioniert
 *  - add a "clear Filters" button
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
    selectedYear: number;
    selectedMonth: string;
    selectedCategory: string;
    currency: string = 'EUR';
    fxRate: number = 1;
    _expenseFilters: string[] = ['', '', '', '', '', ''];
    filteredExpenses: IExpense[];
    expenses: IExpense[];
    temp: IExpense[];

    // private _hhkTableService; <= wird nur in der Langform des Constructors gebraucht

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
      console.log('es wurde folgendes Jahr gewählt: ' + $event.target.value);
      this.selectedYear = +$event.target.value;
      this._expenseFilters[3] = $event.target.value;
      this.filteredExpenses = $event.target.value ? this.performFilter(this._expenseFilters) : this.expenses;
    }

    onMonthInput($event): void {
      console.log('es wurde folgender Monat gewählt: ' + $event.target.value);
      this.selectedMonth = $event.target.value;
      this._expenseFilters[4] = $event.target.value;
      this.filteredExpenses = $event.target.value ? this.performFilter(this._expenseFilters) : this.expenses;
    }

    onCategoryInput($event): void {
      console.log('es wurde folgende Kategorie gewählt: "' + $event.target.value + '".');
      this.selectedCategory = $event.target;
      this._expenseFilters[5] = $event.target.value;
      if ($event.target.value) {
        console.log('onCategoryInput: $event.target.value is true: ' + $event.target.value);
        this.performFilter(this._expenseFilters);
      } else {
        console.log('onCategoryInput: $event.target.value is false: ' + $event.target.value);
        this.expenses;
      }
      // this.filteredExpenses = $event.target.value ? this.performFilter(this._filters) : this.expenses;
    }

    /* der nachfolgende Code ist die Kurzform von:
    constructor(hhkTableService: HHKTableService) {
      this._hhkTableService = hhkTableService;
      this.filteredExpenses = this.expenses;
      this.commentFilter = '';
    }
    */
   constructor(private _hhkTableService: HHKTableService, private messageService: MessageService) {

    this.commentFilter = '';
    this.actualsFilter = '';
    this.plansFilter = '';

   }

    /* method to deal with 5-Star-Rating Output messages */
    onRatingClicked(message: string): void {
      this.pageTitle = this.pageTitle + ': '  + message;
    }


    ngOnInit(): void {
      this._hhkTableService.getExpenses().subscribe(expenses => {this.expenses = expenses;
        console.log(expenses);
        this.filteredExpenses = this.expenses});
    
      this.years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
      this.months = ['Januar', 'Februar', 'März',
                      'April', 'Mai', 'Juni', 'Juli',
                      'August', 'September', 'Oktober',
                      'November', 'Dezember'];
      this.categories = ['mtl. Fixausgaben', 'jhrl. Ausgaben',
                          'Kantine', 'Sonderposten', 'Spritgeld',
                          'Hobbies', 'Kredite', 'Zum regulären Ausgeben'];
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
      // filterBy = filterBy.toLocaleLowerCase();
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

      // console.log('Category: ' + this.expenses.expenseCategory + '<- aktueller Expense');
      let t2 = false;

      this.log(`FilterBy[4]: "` + filterBy[4] + `"`);
      this.log(`expenses[0].month: "${this.expenses[0].expenseMonth}"`);
      let t1 = filterBy[4] == this.expenses[0].expenseMonth;
      this.log(`beides gleich?: ${t1}`);
      this.log(`Februar = "${filterBy[4].toString()}"`);
      this.log(`Februar = "${this.expenses[0].expenseMonth.toString()}"`);
      
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

    /** Log a HHK-Table-Service message with the MessageService - once copied from Tour of Heroes ;-) */
    private log(message: string) {
      this.messageService.add('HHK-Table-Component: ' + message);
    }


    toggleImage(): void {
      this.showImage = !this.showImage;
    }
}
