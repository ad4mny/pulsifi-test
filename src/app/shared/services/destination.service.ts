import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Destination } from 'src/app/features/booking/booking.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchDestination(query: string): Observable<any[]> {
    if (!query.trim()) {
      return of([]);
    }

    return this.http.get<any[]>(`${this.apiUrl}/destinations?name_like=${query}`).pipe(catchError(() => of([])));
  }

  getDestinationByName(name: string): Observable<Destination> {
    return this.http.get<Destination[]>(`${this.apiUrl}/destinations?name=${name}`).pipe(
      map((destinations: Destination[]) => destinations[0] || { id: 0, name: '' }),
      catchError(() => of({ id: 0, name: '' })),
    );
  }
}
