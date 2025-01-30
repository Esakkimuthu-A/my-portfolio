import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './auth/components/dashboard-page/dashboard-page.component';
import { AboutusPageComponent } from './auth/components/aboutus-page/aboutus-page.component';
import { ContactusPageComponent } from './auth/components/contactus-page/contactus-page.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NavbarComponent } from './auth/components/navbar/navbar.component';

const routes: Routes = [
  {path:' ',redirectTo:'/app/dashboard',pathMatch:'full'},
  {path:'app',component:NavbarComponent,children:[
    {path:'dashboard',component:DashboardPageComponent},
    {path:'aboutus',component:AboutusPageComponent},
    {path:'contactus',component:ContactusPageComponent}
  ]},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
