import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [DashboardComponent, BookingComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
