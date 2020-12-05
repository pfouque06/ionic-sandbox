import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { AuthService, selectUserState, State } from 'koa-services';
import { UItoolingService } from '../shared/services/UITooling.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public connecting = false;
  public fullName$: Observable<string>;

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private UITooling: UItoolingService,
    private router: Router
  ) {
    // define observers
    this.fullName$ = this.authService.getCurrentUserFullName$();
  }

  public get ping() { return this.authService.pong; }
  public get isLogged() { return this.authService.isLogged; }

  public loginToggle() {
    console.log('loginToggle().isLogged: ', this.isLogged);
    return;
    
    // logout
    if (this.isLogged) {
      this.authService.logout();
      this.connecting = true;
      this.store.pipe( select(selectUserState), skip(1), take(1),
      ).subscribe(
        (state) => {
          this.connecting = false;
          if (!state.errors) {
            // reroute page if all is fine, this.router.url is route name
            if (this.router.url.match('^\/dashboard')) {
              this.router.navigate(['/home']);
              // delay navigation because of guard control too quick !!
              // setTimeout(()=>{ this.router.navigate(['/dashboard']); }, 500)
            }
          } else {
            this.UITooling.fireGlobalAlertSnackBar('Logout has failed! please check logs', 'snack-bar-error' );
          }
        }
      );
    } else { this.openUserFormDialog('login'); } // login
  }

  public profileToggle() {
    console.log('profileToggle().isLogged: ', this.isLogged);
    return;
    if (this.isLogged) { // view Profile
      const url = `dashboard/users/profile/`;
      this.router.navigate([url]);
    } else { // register
      this.openUserFormDialog('register');
    }
  }

  openUserFormDialog(formType: 'login' | 'register'): void {
    let userForm: any = { formType: formType, password: "secret"  };
    if (formType == "login")
    userForm = { ...userForm, email: "sam.va@gmail.com"};

    // const dialogRef = this.UITooling.fireDialog(UserModalComponent, {
    //   width: '300px',
    //   data: userForm //data: {}
    // });

    // dialogRef.afterClosed().subscribe( async result => {
    //   if (!result) return;
    //   userForm = result;
    //   switch (formType) {
    //     case 'register': {
    //       this.authService.register( userForm.email, userForm.password);
    //       // handle result
    //       this.store.pipe( select(selectUserState), skip(1), take(1))
    //       .subscribe( (state) => {
    //         if ( !!state.errors) {
    //             this.UITooling.fireGlobalAlertSnackBar('Register has failed! Please check credentials and retry', 'snack-bar-error' );
    //         } else {
    //           this.UITooling.fireGlobalAlertSnackBar('Registering is succefull, you can now login with your credentials', 'snack-bar-success');
    //         }
    //       });
    //       break;
    //     }
    //     case 'login': {
    //       this.connecting = true;
    //       this.authService.login( userForm.email, userForm.password);
    //       this.store.pipe( select(selectUserState), skip(1), take(1),
    //       ).subscribe(
    //         (state) => {
    //           this.connecting = false;
    //           if ( ! state.errors) {
    //             this.router.navigate(['/dashboard']);
    //             // delay navigation because of guard control too quick !!
    //             // setTimeout(()=>{ this.router.navigate(['/dashboard']); }, 500)
    //           } else {
    //             this.UITooling.fireGlobalAlertSnackBar('Login has failed! Please check your credentials', 'snack-bar-error' );
    //           }
    //         }
    //       );
    //       break;
    //     }
    //   }
    // });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  public codeBarScan() {
    console.log('codeBarScan(): ');
  }

  public QRCodeScan() {
    console.log('QRCodeScan(): ');
  }

  public Geolocation() {
    console.log('Geolocation(): ');
  }
}
