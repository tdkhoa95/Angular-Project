import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SystemConstants } from '../constants/system.constants';
import { UrlConstants } from '../constants/url.constants';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(activeRouter: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
        if (localStorage.getItem(SystemConstants.CURRENT_USER)) {
            return true;
        } else {
            this.router.navigate([UrlConstants.LOGIN], {
                queryParams: { returnUrl: routerState.url }
            });
            return false;
        }
    }

}