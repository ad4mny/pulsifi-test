import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Booking, BookingFilters } from './booking.model';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = environment.apiUrl;
  private totalItemsSubject = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getBookings(userId: number, filters: BookingFilters, page: number): Observable<Booking[]> {
    let params = `?_expand=destination`;

    if (this.authService.getRole() !== 'admin') {
      params += `&userId=${userId}`;
    }

    if (filters.checkInDate) {
      params += `&checkInDate=${filters.checkInDate}`;
    }

    if (filters.checkOutDate) {
      params += `&checkOutDate=${filters.checkOutDate}`;
    }

    if (filters.status !== 'all') {
      params += `&status=${filters.status}`;
    }

    if (page !== 0) {
      params += `&_page=${page}&_limit=${environment.itemPerPage}`;
    }

    return this.http.get<Booking[]>(`${this.apiUrl}/bookings${params}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<Booking[]>) => {
        // Get the total count from the response headers
        const totalItems = response.headers.get('X-Total-Count')
          ? parseInt(response.headers.get('X-Total-Count')!, 10)
          : 0;

        this.totalItemsSubject.next(totalItems);
        return response.body ?? [];
      }),
    );
  }

  getBookingById(bookingId: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/bookings/${bookingId}`);
  }

  createBooking(formData: Booking): Observable<Booking> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.post<Booking>(`${this.apiUrl}/bookings`, formData, { headers });
  }

  deleteBooking(bookingId: number): Observable<boolean> {
    console.log(bookingId);
    return this.http.delete<boolean>(`${this.apiUrl}/bookings/${bookingId}`);
  }

  updateBooking(formData: Booking): Observable<Booking> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.put<Booking>(`${this.apiUrl}/bookings/${formData.id}`, formData, { headers });
  }
}
