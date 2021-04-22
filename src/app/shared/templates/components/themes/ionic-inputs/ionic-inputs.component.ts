import { Component, OnInit } from '@angular/core';
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
export class IonicInputsComponent implements OnInit {

  // searchbar
  public searchInput: string;
// picker
  public multiColumnOptions = multiColumnOptions;
  // checkbox
  public checkboxState: any;
  // toggle
  public toggleState: any;

  constructor(private pickerController: PickerController) { }

  ngOnInit() {}

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

  // checkbox
  public onCheckboxChange(event) {
    console.log(`onCheckboxChange(${event.detail.checked})`);
    this.checkboxState = event.detail.checked;
  }

  // toggle
  public onToggleChange(event) {
    console.log(`onCheckboxChange(${event.detail.checked})`);
    this.toggleState = event.detail.checked;
  }
}
