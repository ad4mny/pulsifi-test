import { HttpClient } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateRangeValidator } from 'src/app/shared/validators/date-range.validators';
import { destinationAsyncValidator } from 'src/app/shared/validators/destination.validators';
import { BookingService } from '../booking.service';
import { Booking, Destination } from '../booking.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DestinationService } from 'src/app/shared/services/destination.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
})
export class CreateBookingComponent {
  private stepIndex = signal(1);
  currentStep = computed(() => this.stepIndex());
  bookingForm: FormGroup;

  createBookingSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private destinationService: DestinationService,
    private authService: AuthService,
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
        cardNumber: [''],
        // cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
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

  async submitForm() {
    // Check if form is valid
    // Search for destination based on given name
    // Generate random id and create the booking!

    if (this.bookingForm.valid) {
      const user = this.authService.getCurrentUser();
      const formData = this.bookingForm.value;
      const destination = await this.destinationService.getDestinationByName(formData.step1.destination).toPromise();

      if (destination) {
        const booking: Booking = {
          id: Math.floor(Math.random() * 1000),
          checkInDate: formData.step1.checkInDate,
          checkOutDate: formData.step1.checkOutDate,
          userId: user()!.id,
          status: 'confirmed',
          cancelBy: '',
          cancelReason: '',
          roomType: formData.step2.roomType,
          addOns: formData.step2.addOns,
          destinationId: destination.id,
        };

        this.bookingService.createBooking(booking).subscribe({
          next: () => {
            this.createBookingSuccess = true;
          },
          error: () => {
            this.createBookingSuccess = true;
          },
        });
      }
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
