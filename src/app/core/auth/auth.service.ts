import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Permission, Role } from 'src/app/models/permissions.types';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private currentUser = signal<any | null>(null); // Store user data signal
  private userRoles = signal<Role[]>([]);

  private rolePermissions: Record<Role, Permission[]> = {
    admin: ['viewBooking', 'viewAllBooking', 'cancelBooking'],
    user: ['viewBooking', 'viewOwnBooking'],
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // First, get user from localStorage if any exist
    // Else proceed to whatever they want to do below

    const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (storedUser) {
      this.currentUser.set(storedUser);
      this.userRoles.set([storedUser.role]);
    }
  }

  login(username: string, password: string) {
    this.http.get<any[]>(`${this.apiUrl}/users?username=${username}&password=${password}`).subscribe({
      next: (users) => {
        console.log(users);
        if (users.length > 0) {
          // User can login, store the user profile and role
          // Also, redirect user to booking page to make their booking!

          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.currentUser.set(user);
          this.userRoles.set([user.role as Role]);

          this.router.navigate([user.role === 'admin' ? '/admin/booking' : '/user/booking']);
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
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
    this.userRoles.set([]);
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.currentUser() !== null; // Signal not set
  }

  getRole() {
    return this.currentUser() ? this.currentUser().role : null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getPermissions() {
    const role = this.getRole();

    if (role && this.rolePermissions[role as Role]) {
      return this.rolePermissions[role as Role];
    }
    return []; // No role found :(
  }

  hasPermission(permission: Permission): boolean {
    const permissions = this.getPermissions();
    return permissions.includes(permission);
  }
}
