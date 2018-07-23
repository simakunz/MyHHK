import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IInvest } from '../invest';


@Component({
  selector: 'hhk-invest-table-detail',
  templateUrl: './invest-table-detail.component.html',
  styleUrls: ['./invest-table-detail.component.css']
})

export class InvestTableDetailComponent implements OnInit {
  title: string = 'Invest Detail';
  invest: IInvest;

  constructor(private _route: ActivatedRoute, private _router: Router) {

   }

  ngOnInit() {
    // +this dient nur dazu, um den String "id" in eine Zahl umzuwandeln
    let id = +this._route.snapshot.paramMap.get('id');
    this.title += `: ${id}`;
    /* this.invest = {
      "investId": id,
      "investName": "test name of an Id"
    } */
  }

  onBack(): void {
    this._router.navigate(['/invest-table']);
  }

}
