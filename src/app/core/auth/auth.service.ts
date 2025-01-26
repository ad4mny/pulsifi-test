import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: any;

  private apiUrl = 'http://localhost:3000/users'; // Pointing to json-server API

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // Initialize the currentUserSubject from localStorage or null
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`).subscribe({
      next: (users) => {
        if (users.length > 0) {
          // Successful login: store user data
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.router.navigate([user.role === 'admin' ? '/admin/dashboard' : '/user/booking']);
        } else {
          alert('Invalid credentials');
        }
      },
      error: (error) => {
        alert('Error occurred while logging in');
      },
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.currentUserSubject.value !== null;
  }

  getRole() {
    return this.currentUserSubject.value ? this.currentUserSubject.value.role : null;
  }
}
