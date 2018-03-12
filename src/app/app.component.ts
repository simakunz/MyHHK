//list of all modulars of Angular: https://www.npm.js.com/~angular

import { Component } from '@angular/core';
import { HHKTableComponent } from './tableview/hhk-table.component';

// {} alles in diesen Klammern ist ein Objekt

// hhk-root ==> directive name used in HTML
@Component({
  selector: 'hhk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyHHK';
}
