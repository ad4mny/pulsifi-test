import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from '../booking.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
})
export class ListBookingComponent implements OnInit {
  bookings: any[] = [];
  destinations: any[] = [];
  userId: number = 0;

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
    this.loadDestinations();
  }

  loadBookings(): void {
    this.bookingService.getBookings(this.userId).subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  loadDestinations(): void {
    this.bookingService.getDestinations().subscribe((destinations) => {
      this.destinations = destinations;
    });
  }

  getDestinationName(destinationId: number): string {
    const destination = this.destinations.find((dest) => Number(dest.id) === destinationId);
    return destination ? destination.name : 'Unknown';
  }
}
