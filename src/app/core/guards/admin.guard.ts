import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    // Guard to patrol the admin features
    // Psst only 'admin' can pass

    const role = this.authService.getRole();
    if (role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/forbidden']);
      return false;
    }
  }
}
