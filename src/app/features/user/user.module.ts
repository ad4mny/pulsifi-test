import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateBookingComponent } from './bookings/create-booking/create-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Step1Component } from './bookings/create-booking/forms/step-1.component';
import { Step2Component } from './bookings/create-booking/forms/step-2.component';
import { Step3Component } from './bookings/create-booking/forms/step-3.component';
import { ListBookingComponent } from './bookings/list-booking/list-booking.component';
import { ViewBookingComponent } from './bookings/view-booking/view-booking.component';

@NgModule({
  declarations: [
    CreateBookingComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    ListBookingComponent,
    ViewBookingComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {}
