//list of all modulars of Angular: https://www.npm.js.com/~angular

import { Component } from '@angular/core';

//{} alles in diesen Klammern ist ein Objekt

@Component({        //here component is the decorator
  selector: 'hhk-root',   //directive name used in HTML
  templateUrl: './app.component.html',  //View Layout
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyHHK';
}
