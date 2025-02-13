import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog:MatDialog) { }
  openConfirmationDialog(message:string ,className?: string){
    const dialog = this.dialog.open(DialogComponent,{
      data:{
        header:"Confirmation",
        content:message,
        actionType:"Confirmation",
      },
      autoFocus: false
    });
    return dialog;
  }
}
