import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { AuthService, selectUserState, State } from 'koa-services';
import { UIToolingService } from '../../shared/services/UITooling.service';
import { NavController, PopoverController } from '@ionic/angular';
import { UserPopoverPage } from '../../shared/components/popover/user-popover/user-popover.page';

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
    private UITooling: UIToolingService,
    public popper: PopoverController,
    public navCtrl: NavController,
    private router: Router,
  ) {
    console.log('tabs');
    // define observers
    this.fullName$ = this.authService.getCurrentUserFullName$();
  }

  public get ping() { return this.authService.pong; }
  public get isLogged() { return this.authService.isLogged; }

  public loginToggle() {

    if ( ! this.isLogged) {  // login
      this.openUserFormDialog('login');
    } else { // logout
      this.authService.logout();
      this.connecting = true;
      this.store.pipe( select(selectUserState), skip(1), take(1),
      ).subscribe(
        (state) => {
          this.connecting = false;
          if (!state.errors) {
            // reroute page if all is fine, this.router.url is route name
            if (this.router.url.match('^\/tabs\/dashboard*')) {
              this.navCtrl.navigateForward(['']);
            }
          } else {
            this.UITooling.fireAlert('Logout has failed! please check logs', 'failed' );
          }
        }
      );
    }
  }

  public profileToggle() {
    const message = `profileToggle().isLogged: ${this.isLogged}`;
    console.log(message);
    if (this.isLogged) {
      // view Profile
      const url = `tabs/dashboard/profile`;
      this.navCtrl.navigateForward([url]);
    } else {
      // register
      this.openUserFormDialog('register');
    }
  }

  async openUserFormDialog(formType: 'login' | 'register'): Promise<void> {

    let userForm: any = { formType };
    if (formType === 'login') { userForm = { ...userForm, email: 'sam.va@gmail.com', password: 'secret'}; }

    // const dialogFeedback= await this.UITooling.fireDialog(UserModalComponent, userForm);
    const popover = await this.popper.create({
      component: UserPopoverPage,
      backdropDismiss: true,
      showBackdrop: true,
      // cssClass: 'popover-class',
      componentProps: { form: userForm, }
    });
    await popover.present();
    const dialogFeedback =  await popover.onDidDismiss();
    if (!dialogFeedback || !dialogFeedback.data || dialogFeedback.data.dismiss ) {
      console.log('UserPopoverPage dismissed ...');
      return;
    }

    userForm = dialogFeedback.data.form;
    switch (userForm.formType) {
      case 'login': {
        this.connecting = true;
        this.authService.login( userForm.email, userForm.password);
        // delay navigation because of guard control may  be too quick !!
        // setTimeout(()=>{ this.router.navigate(['/dashboard']); }, 500)
        this.store.pipe( select(selectUserState), skip(1), take(1) )
        .subscribe(
          (state) => {
            this.connecting = false;
            if ( ! state.errors) {
              this.navCtrl.navigateForward(['/tabs/dashboard/home']); // dashboard
            } else {
              this.UITooling.fireAlert('Login has failed! Please check your credentials', 'failed' );
            }
          }
        );

        break;
      }
      case 'register': {
        if (userForm.email) {
          this.UITooling.fireAlert('Registering is successful, you can now login with your credentials', 'success');
        } else {
          this.UITooling.fireAlert('Register has failed! Please check credentials and retry', 'failed' );
        }
      }
    }
  }

  // reloadCurrentRoute() {
  //   let currentUrl = this.router.url;
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //     this.router.navigate([currentUrl]);
  //   });
  // }

  public codeBarScan() {
    const message = `codeBarScan().isLogged: ${this.isLogged}`;
    console.log(message);
    this.UITooling.fireAlert(message,'warning');
  }

  public QRCodeScan() {
    const message = `QRCodeScan().isLogged: ${this.isLogged}`;
    console.log(message);
    this.UITooling.fireAlert(message,'dark');
  }

  public Geolocation() {
    const message = `Geolocation().isLogged: ${this.isLogged}`;
    console.log(message);
    this.UITooling.fireAlert(message,'medium');
  }
}
