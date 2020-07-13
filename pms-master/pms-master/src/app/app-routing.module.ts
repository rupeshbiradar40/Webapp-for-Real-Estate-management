import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { RegisterComponent } from './components/register/register.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { AuthGuard } from './auth.guard';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { MyFavPropertiesComponent } from './components/my-fav-properties/my-fav-properties.component';
import { AdminPropertyManagementComponent } from './components/admin-property-management/admin-property-management.component';
import { AdminUpdatePropertyComponent } from './components/admin-update-property/admin-update-property.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'properties',
    component: PropertiesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] },
  },
  {
    path: 'add-property',
    component: AddPropertyComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] },
  },
  {
    path: 'my-properties',
    component: MyPropertiesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
  },
  {
    path: 'my-fav-properties',
    component: MyFavPropertiesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
  },
  {
    path: 'admin-property-management',
    component: AdminPropertyManagementComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'admin-update-property/:id',
    component: AdminUpdatePropertyComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
