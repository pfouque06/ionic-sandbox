import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, PopoverController, ToastController } from '@ionic/angular';


@Injectable({ providedIn: 'root' })
export class UItoolingService {

  constructor(
    private toaster: ToastController, 
    private popper: PopoverController,
    private navCtrl: NavController,
    private router: Router) {}

  public async fireAlert(message: string, style?: 'success'|'failed'|'warning'|'dark'|'medium') {
    const cssStyle = `UITooling-toaster-${style ? style:'default'}`
    const toast = await this.toaster.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: cssStyle,
    });
    toast.present();
  }

  // public fireDialog<T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
  //   return this.dialog.open(component, config);
  // }
  public async fireDialog(component: any, data: any) {
    const message = `UItoolingService.fireDialog()`;
    console.log(message, component, data);
    // this.fireAlert(message);
    // return;

    const popover = await this.popper.create({
      component: component,
      backdropDismiss: true,
      showBackdrop: true,
      // cssClass: 'popover-class',
      componentProps: {
        data: data,
        modalCtrl: this.navCtrl
      }
    });
    console.log('popover created');
    await popover.present();
    console.log('popover fired');
    return await popover.onDidDismiss();
  }
}
