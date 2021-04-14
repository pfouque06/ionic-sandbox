import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { AuthService, selectAllUsers, selectCurrentUser, selectUser, selectUserSetState, selectUserState, State, User, UserService } from 'koa-services';
import { filter, map, skip, take } from 'rxjs/operators';
import { UIToolingService } from 'src/app/shared/services/UITooling.service';
import { PasswordChangePopoverPage } from '../../popover/password-change-popover/password-change-popover.page';

@Component({
  selector: 'profile-user-details',
  templateUrl: './profile-user-details.component.html',
  styleUrls: ['./profile-user-details.component.scss'],
})
export class ProfileUserDetailsComponent implements OnInit {

  public isLoading: boolean = true;

  @Input() readOnly: boolean = true;
  @Input() userId: number = null;

  public user: Partial<User>;

  public userForm: User;
  public userFormGroup: FormGroup;
  public profileTypes = [{value:'user', label:'User'},{value:'admin', label: 'Admin'}];
  public hidePassword: boolean = true;
  
  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private userService: UserService,
    private UITooling: UIToolingService,
    private popper: PopoverController,
    private nav: NavController,
    private router: Router
    ) {}

  async ngOnInit(){
    console.log(`ProfileUserDetailsComponent.ngOninit(readOnly: ${this.readOnly}, userId: ${this.userId})`);
    // retrieve user from currentUser
    this.user = await this.authService.getCurrentUser();
    // console.log('ngOnInit().user: ', this.user);
    // retrieve user if id is provided within directive [userId] and differs from currentUser
    if ( this.userId && this.userId != this.user.id ) { 
      // debugger;
      this.userService.getById(this.userId);
      // handle error
      this.store.pipe( select(selectUserSetState), skip(1), take(1), filter( (s) => !!s.errors && s.errors.error), map( (s) => s.errors.error))
      .subscribe( (errors) => {
        this.UITooling.fireAlert('[GetById] Operation has failed! Please check logs and retry', 'failed' );
      });
      // get user
      this.store.pipe( select(selectUser), skip(1), take(1) )
      .subscribe( (user) => {
        // console.log('selectUser().user: ', user);
        this.user  = user;
        this.initForm();
      });
    } else { // no Id provided
      // if not read only mode (form), create New User
      if ( ! this.readOnly && ! this.userId ) { this.user = new User({}); }
      this.initForm();
    }
  }

  public initForm() {
    console.log(`ProfileUserDetailsComponent.initForm(readOnly: ${this.readOnly}, userId: ${this.userId})`, this.user);
    // generating form group if needed
    if (!this.readOnly) {
      this.userForm = new User({});
      this.userFormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.minLength(2), Validators.maxLength(25)]),
        lastName: new FormControl('', [Validators.minLength(2), Validators.maxLength(25)]),
        // birthDate: new FormControl(moment(), Validators.required),
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(128)]),
        mobile: new FormControl('', [Validators.minLength(10), Validators.maxLength(20)]), // add numeric pattern
        profile: new FormControl('', [Validators.required, Validators.minLength(3)]), /// attention , c'est un select !!!
        password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      });
      this.userFormGroup.valueChanges.subscribe(data => {
        this.userForm.lastName = data.lastName.toLowerCase();
        this.userForm.firstName = data.firstName.toLowerCase();
        // this.userForm.birthDate = data.birthDate;
        this.userForm.email = data.email;
        this.userForm.mobile = data.mobile;
        this.userForm.profile = data.profile;
        this.userForm.password = data.password;
      });

      let onChangeFunction = data => {
        this.userForm.lastName = data.lastName.toLowerCase();
        this.userForm.firstName = data.firstName.toLowerCase();
        // this.userForm.birthDate = data.birthDate;
        this.userForm.email = data.email;
        this.userForm.mobile = data.mobile;
        this.userForm.profile = data.profile;
        this.userForm.password = data.password;
      }

      // initialize formGroup
      // if (this.userId) {
        this.userFormGroup.setValue({
          lastName: this.user.lastName || '',
          firstName: this.user.firstName || '',
          // birthDate: this.user.birthDate? this.user.birthDate:"",
          email: this.user.email || '',
          mobile: this.user.mobile? this.user.mobile:"" || '',
          profile: this.user.profile || 'user',
          password: ""
        });
      // }
    }

    // inform view that data is ready
    this.isLoading = false;
  }

  public editProfile() {
    // [routerLink]="['/users/form/${userPick.id}']" [queryParams]="{user: user}"
    const url = `tabs/dashboard/form/${this.user.id}`;
    this.nav.navigateForward([url]);
    // this.router.navigate([url]);
  }

  public submit() {
    if (this.userChanged()) { // any change done ?

      if (this.userId) { /// userForm for an existing User
        if (this.isMyself() && this.userForm.profile != this.user.profile) {
          const error: string = "Error: can't change own profile type";
          console.log(error);
          throw Error(error)
          }

          // remove password from data ( handled separately)
          let { password, ...newUserData} = this.userForm;
          let newUser = new User(newUserData);

          // remove email if not changed because of uniqueness validator of api.koa
          if (this.userForm.email == this.user.email) {
            let { email, ...newUserData} = newUser;
            newUser = new User(newUserData);
          }

          // update user
          this.userService.updateById(this.userId, newUser);
          // handle result
          this.store.pipe( select(selectUserState), skip(1), take(1))
          .subscribe( (state) => {
            if (!!state.errors && state.errors.error) {
              this.UITooling.fireAlert('[UpdateById] Operation has failed! Please check logs and retry', 'failed' );
            } else {
              // const updatedUser = users[0];
              // update myself if needed
              if (this.isMyself()) { this.authService.myself(); }
              // finally route to user profile
              this.routeToUserForm(this.userId);
            }
          });

      }
      else { /// userForm for a new User
        console.log('###### create new user !!###');

        this.userService.create(this.userForm);
        // handle error
        this.store.pipe( select(selectUserSetState), skip(1), take(1), filter( (s) => !!s.errors && s.errors.error), map( (s) => s.errors.error))
        .subscribe( (errors) => {
          // for( const key in errors ) { console.log(`errors[${key}] `, errors[key]); };
          this.UITooling.fireAlert('[Create] Operation has failed! Please check logs and retry', 'failed' );
        });
        // get new user
        this.store.pipe( select(selectAllUsers), skip(1), take(1) )
        .subscribe( (users) => {
          this.userId = users[0].id;
          this.UITooling.fireAlert('New user creation is successful', 'failed');
          // finally route to user profile
          this.routeToUserForm(this.userId);
        });

      }
    }
  }

  public userChanged(): boolean {
    return this.user && this.userForm && (
      this.user.lastName != this.userForm.lastName ||
      this.user.firstName != this.userForm.firstName ||
      this.user.email != this.userForm.email ||
      // this.user.birthDate !== this.userForm.birthDate ||
      this.user.mobile != this.userForm.mobile ||
      this.user.profile!= this.userForm.profile
    );
  }

  public async isMyself() {
    // console.log(`profile-user-details.isMyself(${this.userId}, ${this.user.id}): ${!this.userId || this.userId == this.user.id}`);
    return ( !this.userId || this.userId == this.user.id);
  }

  public async isAdmin() {
    return ( this.user.profile === "admin" );
  }

  public isNew() {
    return (!this.userId);
  }

  public async changePassword() {
    // console.log(`ProfileUserDetailsComponent.changePassword()`);
    // this.UITooling.fireAlert('ProfileUserDetailsComponent.changePassword()', 'info' );
    // // get modal with previous password and new password in 2 steps !!
    // const dialogRef = this.UITooling.fireDialog(PasswordChangeModalComponent, {
    //   width: '400px',
    //   data: {}
    // });
    // const dialogFeedback= await this.UITooling.fireDialog(UserModalComponent, userForm);
    // const passwordFormGroup: FormGroup;
    const popover = await this.popper.create({
      component: PasswordChangePopoverPage,
      backdropDismiss: true,
      showBackdrop: true,
      // cssClass: 'popover-class',
      // componentProps: { passwordFormGroup }
    });
    await popover.present();
    // wait dialog close event
    // dialogRef.afterClosed().subscribe(async data => { .... });
    const dialogFeedback =  await popover.onDidDismiss();
    if (!dialogFeedback || !dialogFeedback.data || dialogFeedback.data.dismiss ) {
      // console.log('PasswordChangePopoverPage dismissed ...');
      return;
    }
    // console.log(`ProfileUserDetailsComponent.popover.onDidDismiss(password: ${dialogFeedback.data.password}, newPassword: ${dialogFeedback.data.newPassword})`);
    this.authService.changePassword(dialogFeedback.data.password, dialogFeedback.data.newPassword);
    this.store.pipe( select(selectUserState), skip(1), take(1))
    .subscribe( (state) => {
      if ( !!state.errors) {
        this.UITooling.fireAlert('Password change has failed! Please check api.koa logs', 'failed' );
      } else {
        this.UITooling.fireAlert('Password change is successful, you can now login with your new credential', 'success');
      }
    })
  }

  private reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  private routeToUserForm(id: number) {
    const url = `tabs/dashboard/profile/${id}`;
    this.nav.navigateForward([url]);
    // this.router.navigate([url]);
  }
}
