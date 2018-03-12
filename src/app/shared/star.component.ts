import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

/* ************************************************
 * this is a nested component of app.module to
 * deal with 5 star rating.
 * it transforms a number between 0 and 5 into
 * a 5-star-rating including partial stars.
 * therefore, the rating is defined as @Input
 * ***********************************************/

@Component ({
  selector: 'hhk-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {
  @Input() rating: number;
  starWidth: number;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  onClick() {
    this.ratingClicked.emit(`the rating ${this.rating} successfully clicked`);
    console.log(`The rating ${this.rating} was clicked.`);
  }
  ngOnChanges(): void {
    this.starWidth = this.rating * 86 / 5;
  }

}
