import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})

export class Years {
    years: number[] = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];

    getYears(): number[]{
       return this.years;
   }
}