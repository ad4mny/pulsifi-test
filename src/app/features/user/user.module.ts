import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [LoginComponent, BookingComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
