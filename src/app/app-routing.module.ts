import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './core/components/forbidden/forbidden.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', loadChildren: () => import('./features/user/user.module').then((m) => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule) },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
