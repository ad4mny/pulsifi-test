import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { BookingFilters } from './booking.model';
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

  getBookings(userId: number, filters: BookingFilters): Observable<any[]> {
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

    return this.http.get<any[]>(`${this.apiUrl}/bookings${params}`);
  }

  getTransactions(bookingId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?bookingId=${bookingId}`);
  }

  searchDestination(query: string): Observable<any[]> {
    if (!query.trim()) {
      return of([]);
    }

    return this.http.get<any[]>(`${this.apiUrl}/destinations?name_like=${query}`).pipe(catchError(() => of([])));
  }
}
