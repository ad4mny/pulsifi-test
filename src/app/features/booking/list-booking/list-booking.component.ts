import { Component, OnInit, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { BookingService } from '../booking.service';
import { BookingFilters } from '../booking.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { sortData } from 'src/app/utils/sort-utils';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
})
export class ListBookingComponent implements OnInit {
  bookings: any[] = [];
  filteredBookings = signal(this.bookings);

  userId: number = 0;

  searchFilter = new Subject<string>();

  filters: BookingFilters = {
    checkInDate: '',
    checkOutDate: '',
    status: 'all',
  };

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
    this.searchDestination();
  }

  loadBookings(): void {
    this.bookingService.getBookings(this.userId, this.filters).subscribe((bookings) => {
      this.filteredBookings.set((this.bookings = bookings));
    });
  }

  sort(sortBy: string): void {
    this.sortOrders[sortBy] = this.sortOrders[sortBy] === 'asc' ? 'desc' : 'asc';
    this.filteredBookings.set(sortData(this.filteredBookings(), sortBy, this.sortOrders[sortBy]));
  }

  onSearch(event: Event) {
    const element = event.target as HTMLInputElement;
    this.searchFilter.next(element.value);
  }

  searchDestination() {
    this.searchFilter
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query) {
            return of(this.bookings);
          } else {
            return this.bookingService.searchDestination(query);
          }
        }),
      )
      .subscribe((response: { id: number; name: string }[]) => {
        if (response.length > 0) {
          this.filteredBookings.set(
            this.bookings.filter((booking) => {
              return response.some((destination) => booking.destinationId === destination.id);
            }),
          );
        } else {
          this.filteredBookings.set([]);
        }
      });
  }
}
