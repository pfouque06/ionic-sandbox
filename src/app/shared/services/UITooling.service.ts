import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class UItoolingService {

  // public authSnackBar: MatSnackBarRef<any>;

  // constructor(private snackBarService: MatSnackBar, public dialog: MatDialog, private router: Router) {
  constructor(private router: Router) {}

  public fireGlobalAlertSnackBar(message: string, style: string) {
    // this.authSnackBar = this.snackBarService.openFromComponent(GlobalAlertComponent, {
    //   duration: 2000,
    //   horizontalPosition: 'center',
    //   verticalPosition: 'top',
    //   panelClass: [style],
    //   data: message // provided message
    // });
  }

  public fireLoggedGuardAlertSnackBar() {
    // this.authSnackBar =  this.snackBarService.openFromComponent(IsLoggedGuardAlertComponent, {
    //   duration: 2000, // 2 seconds
    //   horizontalPosition: 'center',
    //   verticalPosition: 'bottom',
    //   panelClass: ['snack-bar-error'], // style
    // });
  }

  // public fireDialog<T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
  //   return this.dialog.open(component, config);
  // }
  public fireDialog() {
  }
}
