import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBookings(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bookings?userId=${userId}&_embed=destination`);
  }

  getTransactions(bookingId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?bookingId=${bookingId}`);
  }
}
