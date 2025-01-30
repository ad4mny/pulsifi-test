import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  canCreateBooking = this.authService.hasPermission('createBooking');

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
