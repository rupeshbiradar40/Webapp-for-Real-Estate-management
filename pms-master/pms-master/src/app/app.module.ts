import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertiesComponent } from './components/properties/properties.component'
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/alert/alert.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { MyFavPropertiesComponent } from './components/my-fav-properties/my-fav-properties.component';
import { AdminPropertyManagementComponent } from './components/admin-property-management/admin-property-management.component';
import { AdminUpdatePropertyComponent } from './components/admin-update-property/admin-update-property.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    PropertiesComponent,
    RegisterComponent,
    AlertComponent,
    AddPropertyComponent,
    MyPropertiesComponent,
    MyFavPropertiesComponent,
    AdminPropertyManagementComponent,
    AdminUpdatePropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  exports:[
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
