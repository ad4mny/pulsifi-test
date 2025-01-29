import { Component, OnInit, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { BookingService } from '../booking.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { sortData } from 'src/app/utils/sort-utils';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
})
export class ListBookingComponent implements OnInit {
  bookings: any[] = [];
  filteredBookings: any[] = [];
  userId: number = 0;

  searchFilter = new Subject<string>();
  
  bookingStatusFilter = signal<string>('');
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

    this.searchFilter
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.bookingService.searchDestination(query)),
      )
      .subscribe((response: { id: number; name: string }[]) => {
        if (response.length > 0) {
          this.filteredBookings = this.bookings.filter((booking) => {
            return response.some((destination) => booking.destinationId === destination.id);
          });
        } else {
          this.filteredBookings = this.bookings; // Reset the data
        }
      });
  }

  loadBookings(): void {
    this.bookingService.getBookings(this.userId).subscribe((bookings) => {
      this.filteredBookings = this.bookings = bookings;
    });
  }

  sort(sortBy: string): void {
    this.sortOrders[sortBy] = this.sortOrders[sortBy] === 'asc' ? 'desc' : 'asc';
    this.filteredBookings = sortData(this.filteredBookings, sortBy, this.sortOrders[sortBy]);
  }

  onSearch(event: Event) {
    const element = event.target as HTMLInputElement;
    this.searchFilter.next(element.value);
  }
}
