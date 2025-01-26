import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginAsAdmin() {
    this.authService.login('admin', 'password');
    this.router.navigate(['/admin']);
  }

  loginAsUser() {
    this.authService.login('user', 'password');
    this.router.navigate(['/user']);
  }
}
