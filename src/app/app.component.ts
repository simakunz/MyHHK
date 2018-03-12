// list of all modulars of Angular: https://www.npm.js.com/~angular
import { Component } from '@angular/core';
import { HHKTableComponent } from './tableview/hhk-table.component';
import { HHKTableService } from './tableview/hhk-table.service';
import { InvestTableService } from './tableview/invest-table.service';
import { InvestTableComponent } from './tableview/invest-table.component';

// {} alles in diesen Klammern ist ein Objekt

// selector: 'hhk-root' = directive name used in HTML
@Component({
  selector: 'hhk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HHKTableService, InvestTableService],
 })

export class AppComponent {
  title = 'MyHHK';
}
