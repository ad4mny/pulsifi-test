import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { BookingComponent } from './booking/booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Step1Component } from './booking/forms/step-1/step-1.component';
import { Step2Component } from './booking/forms/step-2/step-2.component';
import { Step3Component } from './booking/forms/step-3/step-3.component';

@NgModule({
  declarations: [BookingComponent, Step1Component, Step2Component, Step3Component],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {}
