import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './core/components/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
