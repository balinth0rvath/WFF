import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {  Router, CanActivate, 
          RouterStateSnapshot, 
          ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthorizationGuardService implements CanActivate {

  constructor(private authService:AuthorizationService,
            private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isAuthenticated()) {
        return true;
      } else
      {
        this.router.navigate(['/signin']);
        return false;
      }
      
  }

}
