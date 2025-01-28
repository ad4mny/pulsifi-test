import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div [formGroup]="formGroup">
      <label for="paymentMethod">Payment Method:</label>
      <select id="paymentMethod" formControlName="paymentMethod">
        <option value="">Select a payment method</option>
        <option value="creditCard">Credit Card</option>
        <option value="paypal">PayPal</option>
      </select>
      <div *ngIf="formGroup.get('paymentMethod')?.invalid && formGroup.get('paymentMethod')?.touched">
        Payment method is required.
      </div>

      <label for="cardNumber">Card Number:</label>
      <input id="cardNumber" formControlName="cardNumber" type="text" placeholder="Enter your 16-digit card number" />
      <div *ngIf="formGroup.get('cardNumber')?.invalid && formGroup.get('cardNumber')?.touched">
        <div *ngIf="formGroup.get('cardNumber')?.errors?.['required']">Card number is required.</div>
        <div *ngIf="formGroup.get('cardNumber')?.errors?.['pattern']">Card number must be 16 digits.</div>
      </div>
    </div>
  `,
})
export class Step3Component {
  @Input() formGroup!: FormGroup;
}
