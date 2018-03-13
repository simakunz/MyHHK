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
    // private _hhkTableService; <= wird nur in der Langform des Constructors gebraucht

    /* ******************************************************
    * to filter properly, the get and set methods are used  *
    ******************************************************* */
    _commentFilter: string;
    get commentFilter(): string {
      return this._commentFilter;
    }
    set commentFilter(value: string){
      this._commentFilter = value;
      this.filteredExpenses = this.commentFilter ? this.performFilter(this.commentFilter) : this.expenses;
    }

    _plansFilter: string;
    get plansFilter(): string {
        return this._plansFilter;
      }
    set plansFilter(value: string){
        this._plansFilter = value;
        this.filteredExpenses = this.plansFilter ? this.performFilter(this.plansFilter) : this.expenses;
    }

    _actualsFilter: string;
    get actualsFilter(): string {
        return this._actualsFilter;
      }
    set actualsFilter(value: string){
        this._actualsFilter = value;
        this.filteredExpenses = this.actualsFilter ? this.performFilter(this.actualsFilter) : this.expenses;
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
   }

  /* method to deal with 5-Star-Rating Output messages */
  onRatingClicked(message: string): void {
    this.pageTitle = this.pageTitle + ': '  + message;
  }
    /* an initialisations which are to be performed, will be done here */
    ngOnInit(): void {
      console.log('now we are in OnInit');
      this.expenses = this._hhkTableService.getExpenses();
      this.filteredExpenses = this.expenses;
    }


    performFilter(filterBy: string): IExpense[] {
      filterBy = filterBy.toLocaleLowerCase();
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      return this.expenses.filter((expense: IExpense) =>
        expense.expenseComment.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }


    toggleImage(): void {
      this.showImage = !this.showImage;
    }
}

/*

import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private _productService: ProductService) {

    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
              product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this._productService.getProducts()
                .subscribe(products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                    error => this.errorMessage = <any>error);
    }
}
*/
