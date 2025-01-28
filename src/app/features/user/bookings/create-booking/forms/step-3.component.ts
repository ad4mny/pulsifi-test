import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-3',
  template: `
    <div [formGroup]="formGroup" class="grid gap-4">
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Payment Method</span>
          </div>
          <select id="paymentMethod" formControlName="paymentMethod" class="select select-bordered w-full max-w-xs">
            <option value="">Select a payment method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <div
          *ngIf="formGroup.get('paymentMethod')?.invalid && formGroup.get('paymentMethod')?.touched"
          id="error-label">
          Payment method is required.
        </div>
      </div>
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Card Number</span>
          </div>
          <input
            type="text"
            id="cardNumber"
            formControlName="cardNumber"
            placeholder="Enter your 16-digit card number"
            class="input input-bordered w-full max-w-xs" />
        </label>
        <div *ngIf="formGroup.get('cardNumber')?.invalid && formGroup.get('cardNumber')?.touched">
          <div *ngIf="formGroup.get('cardNumber')?.errors?.['required']" id="error-label">Card number is required.</div>
          <div *ngIf="formGroup.get('cardNumber')?.errors?.['pattern']" id="error-label">
            Card number must be 16 digits.
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Step3Component {
  @Input() formGroup!: FormGroup;
}
