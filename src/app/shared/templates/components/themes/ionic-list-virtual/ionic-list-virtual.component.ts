import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonVirtualScroll } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { UIToolingService } from 'src/app/shared/services/UITooling.service';

export type randomUserType = {
  gender: string,
  name: {
    first: string,
    last: string,
    title: string
  }
  nat: string,
  email: string,
  picture: {
    large: string,
    media: string,
    thumbnail: string,
  }
};
export type randomUserTypeResult = {
  results: randomUserType[],
  info: any
};

export const MAX_ITEMS_PER_PAGE = 100;
export const REFRESH_ITEMS_SIZE = 2;

@Component({
  selector: 'app-ionic-list-virtual',
  templateUrl: './ionic-list-virtual.component.html',
  styleUrls: ['./ionic-list-virtual.component.scss'],
})
export class IonicListVirtualComponent implements OnInit {

  public skeletons = new Array<number>(5);

  public virtualRandomUserList: randomUserType[] = [];
  // public virtualRandomUserIndex = 0;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

  constructor(private http: HttpClient, private UITooling: UIToolingService) {
    // console.log('--> constructor()');
    this.fetchRandomUsers(MAX_ITEMS_PER_PAGE).subscribe({
      next: (results) => {
        this.virtualRandomUserList = [...results];
        console.log('--> size: ', this.virtualRandomUserList.length);
        // console.log('--> index: ', this.virtualRandomUserIndex);
      },
      error: _ => console.log('https://randomuser.me/api fetch error')
    });
  }

  ngOnInit() { }

  private fetchRandomUsers(size: number) {
    return this.http.get<randomUserTypeResult>(
      `https://randomuser.me/api/?inc=gender,name,nat,email,picture&results=${size}`, { responseType: 'json'})
      .pipe( map((r) => r.results) );
  }

  // public scrollDown(event) {
  //   console.log('--> scrollDown()');
  //   // console.log('--> size: ', this.infiniteRandomUsers.length);
  //   // console.log('--> index: ', this.infiniteRandomUserIndex);
  //   // if ( this.virtualRandomUserIndex >= this.infiniteRandomUsers.length - MAX_ITEMS_PER_PAGE ) {
  //   setTimeout(() => {
  //     this.fetchRandomUsers(REFRESH_ITEMS_SIZE).subscribe({
  //       next: (results) => {
  //         this.virtualRandomUserList = [ ...this.virtualRandomUserList, ...results];
  //         // this.virtualRandomUserIndex += REFRESH_ITEMS_SIZE;
  //         // this.virtualRandomUserList = this.infiniteRandomUsers.slice(this.virtualRandomUserIndex);
  //         console.log('--> new size: ', this.virtualRandomUserList.length);
  //         // console.log('--> new index: ', this.virtualRandomUserIndex);
  //         event.target.complete();

  //         // Refresh a,d render Virtual Scroll List After Adding New Data
  //         this.virtualScroll.checkEnd();

  //         // if ( this.infiniteRandomUserIndex >= 14 ) {
  //         //   event.target.disabled = true;
  //         //   this.infiniteRandomUserIndex = 4;
  //         // }
  //       },
  //       error: _ => console.log('https://randomuser.me/api fetch error')
  //     });
  //   }, 500);
  // // }
  // }
}

