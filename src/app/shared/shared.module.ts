import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MaterialModule } from '../material/material.module';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { DialogComponent } from './components/dialog/dialog.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    SnackBarComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
