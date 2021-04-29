import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-password-change-popover',
  templateUrl: './password-change-popover.page.html',
  styleUrls: ['./password-change-popover.page.scss'],
})
export class PasswordChangePopoverPage implements OnInit {

  // @Input("passwordFormGroup") passwordFormGroup: FormGroup;
  public passwordFG: FormGroup;
  public hidePassword = true;
  public hideNewPassword = true;
  public hideConfirmPassword = true;

  constructor(private fb: FormBuilder, public popper: PopoverController, ) { }

  ngOnInit(): void {
    this.passwordFG = this.fb.group({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validator: this.checkPasswords });
    this.passwordFG.setValue({
      password: null,
      newPassword: '',
      confirmPassword: '',
    });
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const newPass = group.get('newPassword').value;
    const confirmPass = group.get('confirmPassword').value;
    if (confirmPass === '') {
      return null;
    }
    const result = newPass === confirmPass ? null : { notSame: true };
    group.get('confirmPassword').setErrors(result);
    return null;
  }

  onSubmit(): void {
    this.popper.dismiss({ dismiss: false,
      password: this.passwordFG.get('password').value,
      newPassword: this.passwordFG.get('newPassword').value
    });
  }

  dismiss() {
    this.popper.dismiss({ dismiss: true });
  }
}
