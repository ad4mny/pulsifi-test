import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { UserGuard } from 'src/app/core/guards/user.guard';

const routes: Routes = [
  { path: 'booking/new', component: CreateBookingComponent, canActivate: [UserGuard] },
  { path: 'booking', component: CreateBookingComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
