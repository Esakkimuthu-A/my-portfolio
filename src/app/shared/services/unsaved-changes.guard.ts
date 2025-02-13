import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { filter, Observable, Observer } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { SnackType } from './snack-bar.service';
import { DialogService } from './dialog.service';
export abstract class FormCanDeactivate {
  abstract canDeactivate(): boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private dialogService : DialogService){}

  canDeactivate(component: FormCanDeactivate): Observable<boolean> | boolean {
    if(!component.canDeactivate()){
      return new Observable((observer: Observer<boolean>) => {
        const dialogRef=this.dialogService.openConfirmationDialog("You have unsaved changes. Are you sure you want to leave this page?");
        dialogRef.afterClosed().pipe(filter((result: boolean) => {
          return result;
        })).subscribe((res: boolean) => {
          observer.next(true);
          observer.complete();
        })
      })
    }
    else{
      return true;       
    }
  }


}
