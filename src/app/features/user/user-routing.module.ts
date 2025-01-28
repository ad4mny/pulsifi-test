import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBookingComponent } from './bookings/create-booking/create-booking.component';
import { UserGuard } from 'src/app/core/guards/user.guard';
import { ListBookingComponent } from './bookings/list-booking/list-booking.component';

const routes: Routes = [
  { path: 'booking', component: ListBookingComponent, canActivate: [UserGuard] },
  { path: 'booking/new', component: CreateBookingComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
