import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from 'koa-services';
import { UItoolingService } from '../services/UITooling.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private UITooling: UItoolingService,
    private router: Router ) {}

  canActivateChild() {
    if ( !this.authService.isLogged) {
      console.log('IsLoggedGuard: UNAUTHORIZED ACCESS');
      this.UITooling.fireAlert('UNAUTHORIZED ACCESS! Sign-in is required there!', 'failed');
      setTimeout(()=>{ this.router.navigate(['']); }, 1000)
      return false;
    }
    return true;
  }
}
