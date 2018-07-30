export interface IExpense {
  id: number;
  expenseYear: number;
  expenseMonth: string;
  expenseCategory:  string;
  expensePlan: number;
  expenseActuals: number;
  expenseComment: string;
}

/*
export class Expense implements IExpense {
  constructor (public expenseId: number,
              public expenseYear: number,
              public expenseMonth: string,
              public expenseCategory: string,
              private expensePlan?: number,
              private expenseActuals: number,
              public expenseComment?: string) {
  }

  getActuals(fxRate: number): number {
    return this.expenseActuals * fxRate;
  }

  setActuals(value: number){
    this.expenseActuals = value;
  }

  getPlan(fxRate: number): number {
      return this.expensePlan * fxRate;
  }

  setPlan(value: number){
    this.expensePlan = value;
  }
}
*/
