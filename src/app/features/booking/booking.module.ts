import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableSortComponent } from 'src/app/core/components/table-sort/table-sort.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { Step1Component } from './create-booking/forms/step-1.component';
import { Step2Component } from './create-booking/forms/step-2.component';
import { Step3Component } from './create-booking/forms/step-3.component';
import { ListBookingComponent } from './list-booking/list-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { DialogSingleActionComponent } from 'src/app/core/components/dialog/dialog-single-action/dialog-single-action.component';
import { AcIfDirective } from 'src/app/core/directives/ac-if.directive';

@NgModule({
  declarations: [
    CreateBookingComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    ListBookingComponent,
    ViewBookingComponent,
    AcIfDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableSortComponent,
    ReactiveFormsModule,
    BookingRoutingModule,
    DialogSingleActionComponent,
  ],
})
export class BookingModule {}
