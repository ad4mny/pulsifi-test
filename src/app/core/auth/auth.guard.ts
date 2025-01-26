import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Here lies the checking process of user role
    // Missing role? Show forbidden page
    // Not login? Show login page

    const requiredRole = next.data['role'] as string;

    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getRole();
      if (userRole === requiredRole) {
        return true;
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }

    this.router.navigate(['/user/login']);
    return false;
  }
}
