import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div [formGroup]="formGroup">
      <label for="roomType">Room Type:</label>
      <select id="roomType" formControlName="roomType">
        <option value="">Select a room type</option>
        <option value="single">Single</option>
        <option value="double">Double</option>
        <option value="suite">Suite</option>
      </select>
      <div *ngIf="formGroup.get('roomType')?.invalid && formGroup.get('roomType')?.touched">Room type is required.</div>

      <label for="addOns">Add-Ons:</label>
      <input id="addOns" formControlName="addOns" type="text" placeholder="Optional (e.g., Breakfast, Wi-Fi)" />
    </div>
  `,
})
export class Step2Component {
  @Input() formGroup!: FormGroup;
}
