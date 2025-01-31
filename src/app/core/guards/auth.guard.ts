import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Not logged in? Off to /login you go!
    // Already logged in but at /login? Let's book something!

    if (!this.authService.isAuthenticated())
      return state.url === '/login' ? true : (this.router.navigate(['/login']), false);

    if (state.url === '/login') return this.router.navigate(['/bookings']), false;

    return true;
  }
}
