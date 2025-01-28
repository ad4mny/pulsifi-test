import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { BookingComponent } from './booking/booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookingComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {}
