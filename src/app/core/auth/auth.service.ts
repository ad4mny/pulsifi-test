import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Permission, Role } from 'src/app/core/auth/auth.types';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  // Signals to store current user and roles
  private currentUser = signal<User | null>(null);
  private userRoles = signal<Role[]>([]);

  private rolePermissions: Record<Role, Permission[]> = {
    admin: ['adminDashboard', 'viewBooking', 'viewAllBooking', 'cancelBooking'],
    user: ['viewBooking', 'viewOwnBooking', 'createBooking'],
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // First, get user from sessionStorage if any exists
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');

    if (storedUser) {
      this.currentUser.set(storedUser);
      this.userRoles.set([storedUser.role]);
    }
  }

  login(username: string, password: string) {
    this.http.get<any[]>(`${this.apiUrl}/users?username=${username}&password=${password}`).subscribe({
      next: (users) => {
        if (users.length > 0) {
          // User can login, store the user profile and role
          // Also, redirect user to booking page to make their booking!

          const user = users[0];
          sessionStorage.setItem('currentUser', JSON.stringify(user));

          this.currentUser.set(user);
          this.userRoles.set([user.role as Role]);

          this.router.navigate(['/bookings']);
        } else {
          alert('Invalid credentials');
        }
      },
      error: () => {
        alert('Endpoint error!');
      },
    });
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUser.set(null);
    this.userRoles.set([]);
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.currentUser() !== null;
  }

  getRole() {
    const user = this.currentUser();
    return user ? user.role : null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getRoles(): Role[] {
    return this.userRoles();
  }

  getPermissions(): Permission[] {
    const role = this.getRole();
    if (role && this.rolePermissions[role]) {
      return this.rolePermissions[role];
    }
    return [];
  }

  hasPermission(permission: Permission): boolean {
    const permissions = this.getPermissions();
    return permissions.includes(permission);
  }
}
