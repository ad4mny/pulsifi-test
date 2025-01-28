import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './core/components/forbidden/forbidden.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { hideNavbar: true } },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then((m) => m.LoginComponent),
    canActivate: [LoginGuard],
    data: { hideNavbar: true },
  },
  { path: 'user', loadChildren: () => import('./features/user/user.module').then((m) => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule) },
  { path: 'forbidden', component: ForbiddenComponent, data: { hideNavbar: true } },
  { path: '**', component: NotFoundComponent, data: { hideNavbar: true } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
