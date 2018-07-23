// list of all modulars of Angular: https://www.npm.js.com/~angular
import { Component } from '@angular/core';
import { HHKTableComponent } from './hhk-table/hhk-table.component';
import { HHKTableService } from './hhk-table/hhk-table.service';
import { InvestTableService } from './invest-table/invest-table.service';
import { InvestTableComponent } from './invest-table/invest-table.component';
import { MessageService } from './messages/message.service';
import { MessagesComponent } from './messages/message.component';

// {} alles in diesen Klammern ist ein Objekt

// selector: 'hhk-root' = directive name used in HTML
@Component({
  selector: 'hhk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HHKTableService, InvestTableService, MessageService],
 })

export class AppComponent {
  title = 'MyHHK';
}
