import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.auth.appUser;
    if (currentUser) {
      if (next.data.roles && next.data.roles.indexOf(currentUser.role) > -1) {
        return true;
      } else {
        console.log('Unauthorized');
        //this.auth.doRedirect(["/home"])
        return false;
      }
    }
    console.log("User not logged in")
    return false;
  }
}
