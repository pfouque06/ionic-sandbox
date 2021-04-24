import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-ionic-animations',
  templateUrl: './ionic-animations.component.html',
  styleUrls: ['./ionic-animations.component.scss'],
})
export class IonicAnimationsComponent implements OnInit, AfterViewInit {

  // Ionic Logo animation
  @ViewChild('ionicLogo', { read: ElementRef }) private ionicLogo: ElementRef;
  private ionicLogoAnimation: Animation;
  public ionicLogoToggle = false;

  // Parallelized cart animation
  @ViewChild('addToCartButton', { read: ElementRef }) private addToCartButton: ElementRef;
  @ViewChild('cartFab', { read: ElementRef }) private cartFab: ElementRef;
  private addToCartButtonAnimation: Animation;
  private cartFabAnimation: Animation;
  private parallelCartAnimation: Animation;
  public addCartStatus = false;

  // Chained cart animation
  @ViewChild('addToCartButtonAlt', { read: ElementRef }) private addToCartButtonAlt: ElementRef;
  @ViewChild('cartFabAlt', { read: ElementRef }) private cartFabAlt: ElementRef;
  private addToCartButtonAnimationAlt: Animation;
  private cartFabAnimationAlt: Animation;
  public addCartStatusAlt = false;

  constructor(private animationCtrl: AnimationController, private ref: ChangeDetectorRef, private zoneCtrl: NgZone) { }
  ngOnInit() {}
  ngAfterViewInit() {
    // Ionic Logo animation
    this.ionicLogoAnimation = this.animationCtrl.create('ionicLogo')
    .addElement(this.ionicLogo.nativeElement)
    .duration(1000)
    .direction('alternate')
    .iterations(Infinity)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 1, transform: 'scale(1.5)', opacity: '0.5'}
    ]);

    // Parallelized cart animation
    this.addToCartButtonAnimation = this.animationCtrl.create('parallel-animation')
    .addElement(this.addToCartButton.nativeElement)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(1.2)', opacity: '0.8' },
      { offset: 1, transform: 'scale(1)', opacity: '1' }
    ]);

    this.cartFabAnimation = this.animationCtrl.create('parallel-animation')
    .addElement(this.cartFab.nativeElement)
    .fromTo('transform', 'rotate(0deg)', 'rotate(45deg)');

    this.parallelCartAnimation = this.animationCtrl.create('parallel')
    .duration(300)
    .easing('ease-out')
    .iterations(2)
    .direction('alternate')
    .addAnimation([this.addToCartButtonAnimation, this.cartFabAnimation])
    .onFinish(() => this.zoneCtrl.run(() => this.addCartStatus = false ));

    // Chained cart animation
    this.addToCartButtonAnimationAlt = this.animationCtrl.create('chained-animation')
    .addElement(this.addToCartButtonAlt.nativeElement)
    .duration(300)
    .iterations(2)
    .direction('alternate')
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(1.2)', opacity: '0.8' },
      { offset: 1, transform: 'scale(1)', opacity: '1' }
    ]);

    this.cartFabAnimationAlt = this.animationCtrl.create('chained-animation')
    .addElement(this.cartFabAlt.nativeElement)
    .duration(300)
    .iterations(2)
    .direction('alternate')
    .fromTo('transform', 'rotate(0deg)', 'rotate(45deg)');
  }

  // Ionic Logo animation
  public onIonicLogoToggle() {
    this.ionicLogoToggle = !this.ionicLogoToggle;
    if (this.ionicLogoToggle) { this.ionicLogoAnimation.play(); }
    else { this.ionicLogoAnimation.pause(); }
  }

  // Parallelized cart animation
  public addToCart() {
    this.addCartStatus = true;
    this.parallelCartAnimation.play();
  }

  // Chained cart animation
  public async addToCartAlt() {
    this.addCartStatusAlt = true;
    await this.addToCartButtonAnimationAlt.play();
    await this.cartFabAnimationAlt.play();
    this.addCartStatusAlt = false;
  }
}
