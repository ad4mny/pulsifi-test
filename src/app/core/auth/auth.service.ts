import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: any;

  constructor() {
    // Initialize the currentUserSubject from local storage or null
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Login function that sets the user data and role
  login(username: string, password: string) {
    // Simulate a real authentication (replace with API calls)
    const user = { username, role: username === 'admin' ? 'admin' : 'user' };

    // Store user in local storage and notify observers
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Logout function to clear the session
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Get current user role
  getRole() {
    return this.currentUserSubject.value ? this.currentUserSubject.value.role : null;
  }

  // Check if user is logged in
  isAuthenticated() {
    return this.currentUserSubject.value !== null;
  }
}
