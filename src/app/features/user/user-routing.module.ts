import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { UserGuard } from 'src/app/core/guards/user.guard';

const routes: Routes = [
  { path: 'booking/new', component: BookingComponent, canActivate: [UserGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
