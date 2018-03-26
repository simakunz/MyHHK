import { IExpense } from './expense';
import { Injectable } from '@angular/core';


/* retrieve data for the HHK-Table */

@Injectable()
export class HHKTableService {
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
        // setPlan(200.00),
        // setActuals(10.50),
        expenseComment: 'Döner mit Anke'
      },
      {
        expenseId: 3,
        expenseYear: 2018,
        expenseMonth: 'März',
        expenseCategory: 'Zum regulären Ausgeben',
        expenseActuals: 103.5,
        expensePlan: 200,
        // setPlan(200.00),
        // setActuals(103.5),
        expenseComment: 'Aigle Parcours Vario 2 Stiefel Ebay Kleinanzeigen'
      }
    ];
  }
}
