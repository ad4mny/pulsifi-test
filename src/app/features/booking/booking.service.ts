import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Booking, BookingFilters, Destination } from './booking.model';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getBookings(userId: number, filters: BookingFilters): Observable<Booking[]> {
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

    return this.http.get<Booking[]>(`${this.apiUrl}/bookings${params}`);
  }

  createBooking(formData: Booking): Observable<Booking> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.post<Booking>(`${this.apiUrl}/bookings`, formData, { headers });
  }
}
