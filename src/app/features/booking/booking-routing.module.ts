import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserGuard } from 'src/app/core/guards/user.guard';
import { ListBookingComponent } from './list-booking/list-booking.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
  { path: '', component: ListBookingComponent, canActivate: [UserGuard, AdminGuard] },
  { path: 'new', component: CreateBookingComponent, canActivate: [UserGuard] },
  { path: 'view', component: ViewBookingComponent, canActivate: [UserGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
