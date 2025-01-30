import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, BrowserModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  canCreateBooking = this.authService.hasPermission('createBooking');
  canViewAdminDashboard = this.authService.hasPermission('adminDashboard');

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
