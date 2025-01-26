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
    const requiredRole = next.data['role'] as string;

    // Check if the user is authenticated and has the required role
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getRole();
      if (userRole === requiredRole) {
        return true;
      } else {
        this.router.navigate(['/forbidden']); // Navigate to a forbidden page
        return false;
      }
    }

    // Redirect to login if not authenticated
    this.router.navigate(['/login']);
    return false;
  }
}
