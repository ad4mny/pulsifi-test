import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-2',

  template: `
    <div [formGroup]="formGroup" class="grid gap-4">
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Room Type</span>
          </div>
          <select id="roomType" formControlName="roomType" class="select select-bordered w-full max-w-xs">
            <option value="">Select a room type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>
        </label>
        <div *ngIf="formGroup.get('roomType')?.invalid && formGroup.get('roomType')?.touched" id="error-label">
          Room type is required.
        </div>
      </div>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Add-Ons</span>
        </div>
        <input
          id="addOns"
          formControlName="addOns"
          type="text"
          placeholder="Optional (e.g., Breakfast, Wi-Fi)"
          class="input input-bordered w-full max-w-xs"
          class="input input-bordered w-full max-w-xs" />
      </label>
    </div>
  `,
})
export class Step2Component {
  @Input() formGroup!: FormGroup;
}
