import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, PopoverController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { AuthService, selectUserState, State } from 'koa-services';
import { Subscription } from 'rxjs';
import { filter, map, skip, take } from 'rxjs/operators';
import { UItoolingService } from 'src/app/shared/services/UITooling.service';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.page.html',
  styleUrls: ['./user-popover.page.scss'],
})
export class UserPopoverPage implements OnDestroy {

  @Input("form") form: any;
  // @Input() modalCtrl: ModalController;
  public title: string;
  public userForm: FormGroup;
  public hidePassword: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(
    public navParams : NavParams,
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private UITooling: UItoolingService,
    public popper: PopoverController,
    // public modalCtrl: ModalController
  ) {
    const message = `UserModalComponent()`;
    console.log(message, this.form);
    
    if (!this.form) this.form = this.navParams.get('form');
    console.log(this.form);
    switch (this.form.formType) {
      case 'register': {
        this.title = "Register a new account";
        break;
      }
      case 'login': {
        this.title = "Login";
        break;
      }
    }

    this.initForm();
  }


  public ngOnDestroy() {
    this.subscriptions.forEach( (s) => s.unsubscribe() );
  }
  
  public initForm() {
    this.userForm = this.formBuilder.group({
      email: ['email', [Validators.required, Validators.email, Validators.maxLength(128)]],
      password: ['password', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    });
    console.log(this.form.email, this.form.password);
    
    this.userForm.setValue({
      email: this.form.email? this.form.email:'',
      password: this.form.password? this.form.password:'',
    });

    // Handle errors received by the backend if registering user
    // if (this.form.formType === 'register') {
    //   this.subscriptions.push( this.store.pipe(
    //     select(selectUserState),
    //     filter( (s) => !!s.errors && s.errors.error.error),
    //     map( (s) => s.errors.error.error))
    //   .subscribe( (errors) => {
    //     errors.forEach( (error) => {
    //       console.log(`--> error.path: ${error.path}, error.type ${error.type}`);
    //       // todo : validate eror type from api .... 
    //       if (error.path === 'email' && error.type === 'unique violation') {
    //         this.userForm.get('email').setErrors({notUnique: true});
    //       }
    //       // this.cdr.markForCheck();
    //     });
    //   }));
    // }
  }

  onSubmit() {
    // check userForm is valid before proceeding to update
    if ( this.userForm.invalid ) { return; }

    this.form.email =  this.userForm.get('email').value;
    this.form.password =  this.userForm.get('password').value;
    switch (this.form.formType) {
      case 'login': {
        this.popper.dismiss({ dismiss: false, form: this.form});
        break;
      }
      case 'register': {
        this.authService.register( this.form.email, this.form.password);
        // handle result
        this.store.pipe( select(selectUserState), skip(1), take(1))
        .subscribe( (state) => {
          if ( !!state.errors) {
            // console.log(state.errors);
            let dismiss = true;
            state.errors.error.forEach( (error) => {
              console.log(`--> error: `, error);
              // todo : validate eror type from api .... 
              if (error.property === 'email' && error.constraints.IsUniqueCustom) {
                console.log(`--> constraints.IsUniqueCustom: `, error.constraints.IsUniqueCustom);
                this.userForm.get('email').setErrors({notUnique: true});
                dismiss = false;
              }
              // this.cdr.markForCheck();
            });
            if (dismiss) {
              console.log(`--> Register failed`);
              delete this.form.email;
              delete this.form.password;
              this.popper.dismiss({ dismiss: false, form: this.form});
            }
          } else {
            console.log(`--> Register success`);
            this.popper.dismiss({ dismiss: false, form: this.form});
          }
        });
        break;
      }
    }
  }

  dismiss() {
    this.popper.dismiss({ dismiss: true });
  }
}
