import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ActivityLogsComponent } from './pages/activity-logs/activity-logs.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutWrapperComponent } from './layout/layout-wrapper/layout-wrapper.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthGuard } from './core/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LayoutWrapperComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' }, canActivate: [AuthGuard]},
      { path: 'products', component: ProductsComponent, data: { breadcrumb: 'Products' }, canActivate: [AuthGuard]},
      { path: 'orders', component: OrdersComponent, data: { breadcrumb: 'Orders' }, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent},
      { path: 'logs', component: ActivityLogsComponent, data: { breadcrumb: 'Logs' }, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, data: { breadcrumb: 'Users' }, canActivate: [AuthGuard] },
      { path: 'settings', component: SettingsComponent, data: { breadcrumb: 'Settings' }, canActivate: [AuthGuard] },
    ],
  },
  { path: '**', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
