import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    // Guard to patrol the user features
    // Not login? Show login page!

    const role = this.authService.getRole();
    if (role === 'user') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
