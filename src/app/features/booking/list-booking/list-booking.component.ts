import { Component, OnInit, signal } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { BookingService } from '../booking.service';
import { Booking, BookingFilters } from '../booking.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { sortData } from 'src/app/utils/sort-utils';
import { DestinationService } from 'src/app/shared/services/destination.service';
import { environment } from 'src/environments/environment';

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
  bookingId = signal<number>(0);

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

  itemPerPage = environment.itemPerPage;
  totalItems = 0;
  currentPage = 1;

  errorDialog: boolean = false;
  errorMessage: string = '';

  cancelBookingConfirmation: boolean = false;
  deleteBookingConfirmation: boolean = false;

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

    this.loadFilter(); // Load saved filters and sorting from sessionStorage
    this.loadBookings();
    this.queryDestination();

    this.bookingService.totalItems$.subscribe((totalItems) => {
      this.totalItems = totalItems;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings(this.userId, this.filters, this.currentPage).subscribe({
      next: (bookings) => {
        this.bookings = bookings.map((item) => ({
          ...item,
          checkInDate: new Date(item.checkInDate),
          checkOutDate: new Date(item.checkOutDate),
          destination: item.destination ?? undefined,
        }));
        this.filteredBookings.set(this.bookings); // Renew filteredBookings set
      },
      complete: () => {
        this.saveFilter();
      },
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

  cancelBooking() {
    this.bookingService
      .getBookingById(this.bookingId())
      .pipe(
        switchMap((booking: Booking) => {
          if (!booking) {
            throw new Error('Booking not found');
          }
          const user = this.authService.getCurrentUser();

          booking.status = 'cancelled';
          booking.cancelReason = 'cancelled by admin';
          booking.cancelBy = user()!.id;

          return this.bookingService.updateBooking(booking);
        }),
        catchError((error) => {
          this.errorDialog = true;
          this.errorMessage = error;
          return of(null);
        }),
      )
      .subscribe({
        next: () => this.loadBookings(),
        error: (error) => {
          this.errorDialog = true;
          this.errorMessage = error;
        },
        complete: () => (this.cancelBookingConfirmation = false),
      });
  }

  deleteBooking() {
    this.bookingService.deleteBooking(this.bookingId()).subscribe({
      next: (response) => {},
      complete: () => {
        this.currentPage = 1;
        this.deleteBookingConfirmation = false;
        this.loadBookings();
      },
    });
  }

  saveFilter(): void {
    const state = {
      currentPage: this.currentPage,
      filters: this.filters,
      sortBy: this.sortBy(),
      sortOrders: this.sortOrders,
    };
    sessionStorage.setItem('bookingFilter', JSON.stringify(state));
  }

  loadFilter(): void {
    const storedState = sessionStorage.getItem('bookingFilter');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      this.currentPage = parsedState.currentPage || this.currentPage;
      this.filters = parsedState.filters || this.filters;
      this.sortBy.set(parsedState.sortBy || 'checkInDate');
      this.sortOrders = parsedState.sortOrders || this.sortOrders;
    }
  }

  clearFilter() {
    sessionStorage.removeItem('bookingFilter');
    location.reload();
  }
}
