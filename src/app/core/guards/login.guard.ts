import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Do you already logged in?
    // Yes: I moved you to booking
    // Not login? No worries, I show you login page

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user/booking']);
      return false;
    }

    return true;
  }
}
