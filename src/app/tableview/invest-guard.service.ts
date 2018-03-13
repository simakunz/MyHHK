
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class InvestGuardService implements CanActivate {
  
  constructor(private _router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
        alert("Invalid invest id: " + id);
        this._router.navigate(['/invest-table']);
        return false;
    }
    
    return true;
  }
}