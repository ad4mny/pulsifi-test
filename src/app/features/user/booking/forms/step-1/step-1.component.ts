import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-1',
  template: `
    <div [formGroup]="formGroup" class="grid gap-4">
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Check-in Date</span>
            <span class="label-text-alt">Check-in after 3:00 PM</span>
          </div>
          <input
            id="checkInDate"
            formControlName="checkInDate"
            type="date"
            class="input input-bordered w-full max-w-xs" />
        </label>
        <div *ngIf="formGroup.get('checkInDate')?.invalid && formGroup.get('checkInDate')?.touched" id="error-label">
          Check-in Date is required.
        </div>
      </div>
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Check-out Date</span>
            <span class="label-text-alt">Check-out before 12:00 PM</span>
          </div>
          <input
            id="checkOutDate"
            formControlName="checkOutDate"
            type="date"
            class="input input-bordered w-full max-w-xs" />
        </label>
        <div *ngIf="formGroup.get('checkInDate')?.invalid && formGroup.get('checkInDate')?.touched" id="error-label">
          Check-out Date is required.
        </div>
        <div *ngIf="formGroup.errors?.['invalidDateRange'] as dateRangeError" id="error-label">
          {{ dateRangeError }}
        </div>
      </div>
    </div>
  `,
})
export class Step1Component {
  @Input() formGroup!: FormGroup;
}
