import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PickerController } from '@ionic/angular';

// picker
const defaultColumnOptions = [
  [
    'Dog',
    'Cat',
    'Bird',
    'Lizard',
    'Chinchilla'
  ]
];

export const multiColumnOptions = [
  [
    'Minified',
    'Responsive',
    'Full Stack',
    'Mobile First',
    'Serverless'
  ],
  [
    'Tomato',
    'Avocado',
    'Onion',
    'Potato',
    'Artichoke'
  ]
];

@Component({
  selector: 'app-ionic-inputs',
  templateUrl: './ionic-inputs.component.html',
  styleUrls: ['./ionic-inputs.component.scss'],
})
export class IonicInputsComponent implements OnInit, AfterViewInit {

  // searchbar
  public searchInput: string;
// picker
  public multiColumnOptions = multiColumnOptions;
  // toggle
  public toggleState = true;
  // checkbox
  public checkboxState = true;
  // radio group
  public radioGroupState: string;
  @ViewChild('radioGroupID', { read: ElementRef }) radioGroupDom: ElementRef;

  constructor(private pickerController: PickerController) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.radioGroupState = this.radioGroupDom.nativeElement.value;
    console.log(this.toggleState, this.checkboxState, this.radioGroupState);
  }


  // searchbar
  public onSearchBarChange(event) {
    console.log(`onSearchBarChange(${event.detail.value})`);
    this.searchInput = event.detail.value;
  }

  // picker
  public async openPicker(numColumns = 1, numOptions = 5, columnOptions = defaultColumnOptions){
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`Got Value: `, value);
          }
        }
      ]
    });

    await picker.present();
  }

  private getColumns(numColumns, numOptions, columnOptions) {
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

  private getColumnOptions(columnIndex, numOptions, columnOptions) {
    const options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      });
    }
    return options;
  }

  // toggle
  public onToggleChange(event) {
    console.log(`onCheckboxChange(${event.detail.checked})`);
  }

  // checkbox
  public onCheckboxChange(event) {
    console.log(`onCheckboxChange(${event.detail.checked})`);
  }

  // radio group
  public onRadioGroupChange(event) {
    console.log(`onRadioGroupChange(${event.detail.value})`);
    this.radioGroupState = event.detail.value;
  }
}
