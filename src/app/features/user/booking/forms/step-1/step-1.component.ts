import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div [formGroup]="formGroup">
      <label>Check-in Date:</label>
      <input formControlName="checkInDate" type="date" />
      <div *ngIf="formGroup.get('checkInDate')?.invalid && formGroup.get('checkInDate')?.touched">
        Check-in Date is required.
      </div>

      <label>Check-out Date:</label>
      <input formControlName="checkOutDate" type="date" />
      <div *ngIf="formGroup.get('checkOutDate')?.invalid && formGroup.get('checkOutDate')?.touched">
        Check-out Date is required.
      </div>

      <div *ngIf="formGroup.errors?.['invalidDateRange'] as dateRangeError">
        {{ dateRangeError }}
      </div>
    </div>
  `,
})
export class Step1Component {
  @Input() formGroup!: FormGroup;
}
