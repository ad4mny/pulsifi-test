import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from '../booking.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { sortData } from 'src/app/utils/sort-utils';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
})
export class ListBookingComponent implements OnInit {
  bookings: any[] = [];
  destinations: any[] = [];
  userId: number = 0;

  searchText = signal<string>('');
  statusFilter = signal<string>('');
  checkInFilter = signal<string>('');
  checkOutFilter = signal<string>('');

  sortBy = signal<string>('checkInDate');
  sortOrders: { [key: string]: 'asc' | 'desc' } = {
    destinationId: 'asc',
    status: 'asc',
    stays: 'asc',
    roomType: 'asc',
  };

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser()) {
      this.userId = currentUser().id;
    }

    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings(this.userId).subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  sort(sortBy: string): void {
    this.sortOrders[sortBy] = this.sortOrders[sortBy] === 'asc' ? 'desc' : 'asc';
    this.bookings = sortData(this.bookings, sortBy, this.sortOrders[sortBy]);
  }
}
