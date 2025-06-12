import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ActivityLogsComponent } from './pages/activity-logs/activity-logs.component';
import { LayoutWrapperComponent } from './layout/layout-wrapper/layout-wrapper.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { UsersComponent } from './pages/users/users.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SignupComponent } from './pages/signup/signup.component';
import { ModalComponent } from './shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductsComponent,
    OrdersComponent,
    ActivityLogsComponent,
    LayoutWrapperComponent,
    SidebarComponent,
    SettingsComponent,
    UsersComponent,
    BreadcrumbComponent,
    SignupComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxApexchartsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
