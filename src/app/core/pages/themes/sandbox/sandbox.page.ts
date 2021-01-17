import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.page.html',
  styleUrls: ['./sandbox.page.scss'],
})
export class SandboxPage implements OnInit {

  // Material Stepper
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // Material Tabs
  tabs = ['First', 'Second'];
  selected = new FormControl(0);
  isAnimated = true;

  // Material Tabs & Nav
  links = ['First', 'Second'];
  activeLink = this.links[0];

  // Material Ripple Effect
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;

  constructor(private _formBuilder: FormBuilder) { console.log('themes/sandbox'); }

  ngOnInit() {
    // Material Stepper
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  // Material Tabs
  public addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }
  public removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  public resetTabs() {
    this.tabs = ['First', 'Second'];
  }

  // Material Tabs & Nav actions
  public addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  public resetLinks() {
    this.links = this.links.slice(0, 2);
  }
}
