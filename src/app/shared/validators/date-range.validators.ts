import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const checkInDate = control.get('checkInDate')?.value;
    const checkOutDate = control.get('checkOutDate')?.value;

    if (!checkInDate || !checkOutDate) {
      return null; // Skip validation if either date is missing
    }

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);

    if (end < start) {
      return { invalidDateRange: 'Check-out date must be after check-in date' };
    }

    return null; // Valid case
  };
}
