import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError, switchMap, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export function destinationAsyncValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    // Validating the destination... if Paris is available, you’re good to go!
    // But if it’s missing... tough luck, no Paris for you today!

    const destination = control.value?.toLowerCase();

    if (!destination) {
      return of(null);
    }

    return http.get<any[]>(`http://localhost:3000/destinations?name=${destination}`).pipe(
      debounceTime(300),
      switchMap((response) => {
        return response.length > 0 ? of(null) : of({ destinationInvalid: 'Destination not found' });
      }),
      catchError(() => of({ destinationInvalid: 'Server error during validation' })),
      first(),
    );
  };
}
