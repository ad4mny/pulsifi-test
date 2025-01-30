import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTransactions(bookingId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?bookingId=${bookingId}`);
  }
}
