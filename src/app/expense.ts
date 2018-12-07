// ursprünglich ein Interface
export class IExpense {
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
  
  constructor (id: number,
              expenseYear: number,
              expenseMonth: string,
              expenseCategory: string,
              expensePlan: number,
              expenseActuals: number,
              expenseComment: string) {
  }

  constructor () {
    this.id = 999;
    this.expenseYear = 2018;
    this.expenseActuals = 0;
    //TODO: use a category instance instead of hard coding!!!
    this.expenseCategory = 'Zum regulären Ausgeben';
    this.expenseComment = '';
    //TODO: use months instance instead of hard coding!!
    this.expenseMonth = 'Januar';
    this.expensePlan = 0;
  }

  //TODO: add two further constructors: 
  //      - one with an Expense as argument

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