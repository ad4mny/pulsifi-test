import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserGuard } from 'src/app/core/guards/user.guard';
import { ListBookingComponent } from './list-booking/list-booking.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
  { path: '', component: ListBookingComponent, canActivate: [AuthGuard] },
  { path: 'new', component: CreateBookingComponent, canActivate: [UserGuard] },
  { path: 'view', component: ViewBookingComponent, canActivate: [AuthGuard] },
  { path: 'update', component: ViewBookingComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
