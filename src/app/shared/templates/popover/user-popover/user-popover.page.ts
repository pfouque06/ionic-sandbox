import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthService, State } from 'koa-services';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.page.html',
  styleUrls: ['./user-popover.page.scss'],
})
export class UserPopoverPage implements OnDestroy {

  @Input() form: any;
  // @Input() modalCtrl: ModalController;
  public title: string;
  public userForm: FormGroup;
  public hidePassword = true;
  private subscriptions: Subscription[] = [];

  constructor(
    public navParams: NavParams,
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public popper: PopoverController,
  ) {
    if (!this.form) { this.form = this.navParams.get('form'); }
    switch (this.form.formType) {
      case 'register': {
        this.title = 'New user';
        break;
      }
      case 'login': {
        this.title = 'Login';
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

    this.userForm.setValue({
      email: this.form.email ? this.form.email : '',
      password: this.form.password ? this.form.password : '',
    });
  }

  public mailCheck() {
    if (this.form.formType === 'register' && this.userForm.get('email').valid) {
      this.subscriptions.push(
        this.authService.mailCheck$(this.userForm.get('email').value)
        .pipe(filter((result) => !result.body))
        .subscribe( () => this.userForm.get('email').setErrors({notUnique: true}))
        );
    }
  }

  public onSubmit() {
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
        this.popper.dismiss({ dismiss: false, form: this.form});
        break;
      }
    }
  }

  dismiss() {
    this.popper.dismiss({ dismiss: true });
  }
}
