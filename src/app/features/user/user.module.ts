import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, BookingComponent],
  imports: [CommonModule, FormsModule, UserRoutingModule],
})
export class UserModule {}
