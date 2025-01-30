import { HttpClient } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateRangeValidator } from 'src/app/shared/validators/date-range.validators';
import { destinationAsyncValidator } from 'src/app/shared/validators/destination.validators';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
})
export class CreateBookingComponent {
  private stepIndex = signal(1);
  currentStep = computed(() => this.stepIndex());
  bookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.bookingForm = this.fb.group({
      step1: this.fb.group(
        {
          destination: ['', [Validators.required], [destinationAsyncValidator(this.http)]],
          checkInDate: ['', Validators.required],
          checkOutDate: ['', Validators.required],
        },
        { validators: dateRangeValidator() },
      ),
      step2: this.fb.group({
        roomType: ['', Validators.required],
        addOns: [''],
      }),
      step3: this.fb.group({
        paymentMethod: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      }),
    });
  }

  nextStep() {
    const currentFormGroup = this.getCurrentFormGroup();
    if (currentFormGroup.valid) {
      const next = this.stepIndex() + 1;
      if (next <= 3) this.stepIndex.set(next);
    } else {
      currentFormGroup.markAllAsTouched(); // Highlight invalid fields
    }
  }

  previousStep() {
    const prev = this.stepIndex() - 1;
    if (prev > 0) this.stepIndex.set(prev);
  }

  submitForm() {
    if (this.bookingForm.valid) {
      console.log('Form Submitted:', this.bookingForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  getCurrentFormGroup(): FormGroup {
    // Dynamically get the current step's FormGroup
    // Ensure it exists and is a FormGroup

    const stepKey = `step${this.stepIndex()}`;
    const formGroup = this.bookingForm.get(stepKey) as FormGroup;

    if (!formGroup) {
      throw new Error(`Form group for ${stepKey} does not exist.`);
    }

    return formGroup;
  }
}
