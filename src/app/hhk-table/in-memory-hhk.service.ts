import { InMemoryDbService } from 'angular-in-memory-web-api';

/*************************************************************************
 *
 * this service can be detached as soon as a real HTTP server / request is used
 *
 **************************************************************************/

export class InMemoryHHKService implements InMemoryDbService {
  createDb() {
    let hhk_entries = [
        {
            id: 1,
            expenseYear: 2018,
            expenseMonth: 'Februar',
            expenseCategory: 'Zum regulären Ausgeben',
            expenseComment: 'Testeintrag einfach so',
            expenseActuals: 118.28,
            expensePlan: 200
          },
          {
            id: 2,
            expenseYear: 2017,
            expenseMonth: 'Februar',
            expenseCategory: 'Zum regulären Ausgeben',
            expenseActuals: 10.50,
            expensePlan: 200,
            expenseComment: 'Döner mit Anke'
          },
          {
            id: 3,
            expenseYear: 2018,
            expenseMonth: 'März',
            expenseCategory: 'Zum regulären Ausgeben',
            expenseActuals: 103.5,
            expensePlan: 200,
            expenseComment: 'Aigle Parcours Vario 2 Stiefel Ebay Kleinanzeigen'
          },
          {
            id: 4,
            expenseYear: 2018,
            expenseMonth: 'März',
            expenseCategory: 'Zum regulären Ausgeben',
            expenseActuals: 4.49,
            expensePlan: 200,
            expenseComment: 'Star Trek Timelines'
          },
          {
            id: 5,
            expenseYear: 2018,
            expenseMonth: 'April',
            expenseCategory: 'Zum regulären Ausgeben',
            expenseActuals: 4.49,
            expensePlan: 200,
            expenseComment: 'Star Trek Timelines'
          },
          {
            id: 6,
            expenseYear: 2018,
            expenseMonth: 'März',
            expenseCategory: 'Zum regulären Ausgeben',
            expenseActuals: 27.99,
            expensePlan: 200,
            expenseComment: 'Star Trek Timelines'
          }
        ];
    return {hhk_entries};
  }
}
