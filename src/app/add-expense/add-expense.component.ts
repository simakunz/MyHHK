import { Component, OnInit } from '@angular/core';
// hier werden aktuell keine Reactive Forms genutzt (wäre dann import { ReactiveFormsModule } from '@angular';)
// sondern nur Template-Driven Forms
import { FormControl, Validators, Form, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from '../messages/message.service';
import { Categories } from '../categories';
import { Months } from '../months';
import { Years } from '../years';
import { IExpense } from '../expense';
import { HHKTableService } from '../hhk-table/hhk-table.service';
import { IPerfLoggingPrefs } from 'selenium-webdriver/chrome';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  //selector: 'hhk-add-expense', the selector is no longer required with routing
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})


/*************************************
 * 
 * TODO's
 * 
 * - hhkTableService einbinden und analog hhk-table.component
 *   die expenses holen, eine neue Expense erzeugen und diese
 *   mittels "add" zu den Expenses hinzufügen
 * - im html entsprechend die [ngModel] Direktiven anwenden
 *   und somit die Eingabefelder den Variablen zuordnen
 * 
 *************************************/

export class AddExpenseComponent implements OnInit {

  pageTitle: string = 'MyHHK Add Expense';
  expenseGroup: FormGroup;
  expenses: IExpense[];
  expense: IExpense;
  years: number[];
  months: string[];
  categories: string[];
  submitted: boolean;
 /*  
  icYear: FormControl;
  icMonth: FormControl;
  icComment: FormControl;
  icCategory: FormControl;
  icPlan: FormControl;
  icExpense: FormControl; 
  */
  //location: Location;
  
  //private route: ActivatedRoute,
  //private heroService: HeroService,
  //private location: Location
  constructor(private hhkTableService: HHKTableService, private messageService: MessageService, private y: Years, private m: Months, 
              private c: Categories, private route: ActivatedRoute, private location: Location, private formBuilder: FormBuilder) 
      {
          this.expense = new IExpense();
          console.log(this.expense);
          this.expenseGroup = formBuilder.group({
            expenseYear : [{value: this.expense.expenseYear ? this.expense.expenseYear : 2018}, Validators.required],
            expenseMonth : [{value: this.expense.expenseMonth ? this.expense.expenseMonth : "Juli"}, Validators.required],
            expenseComment : [{value: this.expense.expenseComment ? this.expense.expenseComment : ""}],
            expenseCategory : [{value: this.expense.expenseCategory}, Validators.required],
            expensePlan : [{value:this.expense.expensePlan ? this.expense.expensePlan : 0}],
            expenseActuals : [{value: this.expense.expenseActuals}, Validators.required]
          });
          

               }

  ngOnInit() {
    

    //TODO: kann sein dass wir hier auch filteredExpenses brauchen?
    this.hhkTableService.getExpenses().subscribe(expenses => {this.expenses = expenses;
                                                              /*this.log(`all expenses received in ngOnInit of add-expense-component:`);
                                                              for (let exp of this.expenses){
                                                                this.log(`expense: ${this.hhkTableService.stringifyExpense(exp)}`);
                                                              }
                                                              console.log(this.expenses);
                                                              */
                                                            });
    //this.log(`Years is initated with: "${y}"`);
    this.years = this.y.getYears();
    this.months = this.m.get();
    //this.log(`alle Monate: ${this.months}`);
    this.categories = this.c.get();
    this.submitted = false;

    
  }

  /* *******************************************
   * the following get methods are required in the html
   * to perform validations on the input fields
   * ONLY in REACTIVE FORMs, not TEMPLATE FORMs
   **********************************************/
  /*
  get icYear() { return this.expenseGroup.get('icYear'); }
  get icMonth() { return this.expenseGroup.get('icMonth'); }
  get icCategory() { return this.expenseGroup.get('icCategory'); }
  get icExpense() { return this.expenseGroup.get('icExpense'); }
  */

  onSubmit(isGoBack? : boolean): void {
    this.log(`**************`);
    this.log(`* new submit *`);
    this.log(`**************`);

    //this.log(`expenseYear: ${expenseYear} && this.icYear = ${this.icYear.value}`);
    //this.log(`submitting ${this.hhkTableService.stringifyExpense(this.expenseGroup.value as IExpense)}`);
    //console.log(this.expenseGroup);

    this.hhkTableService.addExpense(this.expenseGroup.value as IExpense)
        .subscribe(expense => {
          this.expenses.push(expense);
          console.log(expense);
          if (isGoBack) 
             this.goBack();
          else {
            //TODO: Erfolgsmeldung anzeigen
            this.log(`successfully added expense ${this.hhkTableService.stringifyExpense(this.expense)}`);
            this.expenseGroup.reset();
          }
        });


    /*working
    if (this.expense) {
      //this.expense.id = 99;
      this.log(`submitting ${this.hhkTableService.stringifyExpense(this.expense)}`);
      //console.log(`submitting the following expense: ${this.hhkTableService.stringifyExpense(this.expense)}`);
      
      this.hhkTableService.addExpense(this.expense).subscribe(expense => this.expenses.push(expense));

      //this.log(`onSubmit executed: "TODO"`);
      this.submitted = true;
    }
    else { 
      this.log(`this.expense is null / not set and therefore cannot be submitted`);
    }  
    */
  }
  

  //goes back to HHK Table
  goBack(): void {
    this.location.back();
  }

  /** Log a App-Expense-Service message with the MessageService */
  private log(message: string) {
    this.messageService.add('Add-Expense-Component: ' + message);
  }
}