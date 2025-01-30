import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { AboutusPageComponent } from './components/aboutus-page/aboutus-page.component';
import { ContactusPageComponent } from './components/contactus-page/contactus-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    DashboardPageComponent,
    AboutusPageComponent,
    ContactusPageComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AuthModule { }
