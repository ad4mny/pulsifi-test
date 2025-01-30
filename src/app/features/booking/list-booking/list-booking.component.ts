import { Component, OnInit, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { BookingService } from '../booking.service';
import { Booking, BookingFilters } from '../booking.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { sortData } from 'src/app/utils/sort-utils';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
})
export class ListBookingComponent implements OnInit {
  canCancelBooking = this.authService.hasPermission('cancelBooking');
  canViewBooking = this.authService.hasPermission('viewBooking');

  bookings: Booking[] = [];
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
    private destinationService: DestinationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser()) {
      this.userId = currentUser()!.id;
    }

    this.loadBookings();
    this.queryDestination();
  }

  loadBookings(): void {
    this.bookingService.getBookings(this.userId, this.filters).subscribe((bookings) => {
      this.bookings = bookings.map((item) => ({
        ...item,
        checkInDate: new Date(item.checkInDate),
        checkOutDate: new Date(item.checkOutDate),
        destination: item.destination ?? undefined,
      }));
      this.filteredBookings.set(this.bookings); // Renew filteredBookings set
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

  queryDestination() {
    this.searchFilter
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query) {
            return of(this.bookings);
          } else {
            return this.destinationService.searchDestination(query);
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

  cancelBooking(bookingId: number) {}
}
