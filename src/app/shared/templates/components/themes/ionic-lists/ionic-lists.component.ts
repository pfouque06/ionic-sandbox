import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonList, IonVirtualScroll } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { UIToolingService } from './../../../../services/UITooling.service';

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

export const MAX_ITEMS_PER_PAGE = 10;
export const REFRESH_ITEMS_SIZE = 5;

@Component({
  selector: 'app-ionic-lists',
  templateUrl: './ionic-lists.component.html',
  styleUrls: ['./ionic-lists.component.scss'],
})
export class IonicListsComponent implements OnInit {

  public skeletons = new Array<number>(5);

  // list with refresher
  // public randomUsers$: Observable<randomUserType[]>;
  public randomUsers: randomUserType[] = [];
  @ViewChild('frameList', { read: IonList }) public frameList: IonList;

  // list with infinite scroll and virtual scroll
  public infiniteRandomUsers: randomUserType[] = [];
  public infiniteRandomUserIndex = 0;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

  constructor(private http: HttpClient, private UITooling: UIToolingService) {
    // this.randomUsers$ =
    this.fetchRandomUsers(REFRESH_ITEMS_SIZE).subscribe({
      next: (results) => this.randomUsers = results,
      error: _ => console.log('https://randomuser.me/api fetch error')
    });
    this.fetchRandomUsers(6).subscribe({
      next: (results) => this.infiniteRandomUsers = results,
      error: _ => console.log('https://randomuser.me/api fetch error')
    });
  }

  ngOnInit() { }

  private fetchRandomUsers(size: number) {
    return this.http.get<randomUserTypeResult>(
      `https://randomuser.me/api/?inc=gender,name,nat,email,picture&results=${size}`, { responseType: 'json'})
      .pipe(map((r) => r.results));
  }

  public doRefresh(event) {
    // console.log('--> Start refresh', event);
    // setTimeout(() => { event.target.complete(); }, 2000);
    this.fetchRandomUsers(REFRESH_ITEMS_SIZE).subscribe({
      next: (results) => {
        // this.randomUsers = [ ...results, ...this.randomUsers].slice(0, MAX_ITEMS_PER_PAGE);
        this.randomUsers = [ ...results, ...this.randomUsers].filter( (_, i) => i < MAX_ITEMS_PER_PAGE);
        event.target.complete();
      },
      error: _ => console.log('https://randomuser.me/api fetch error'),
    });
  }

  public async copy(index: number) {
    // console.log('copy()', index);
    if ( index > -1 && index < this.randomUsers.length && navigator.clipboard ) {
      // this.randomUsers.push(this.randomUsers.slice(index, 1)[0]);
      let clipboard = '';
      try {
        const user = this.randomUsers[index];
        // await navigator.clipboard.writeText(JSON.stringify(user));
        clipboard = `${user.name.title} ${user.name.first} ${user.name.last}\n${user.email}`;
        await navigator.clipboard.writeText(clipboard);
      } finally {
        this.UITooling.fireAlert(`Copying to clipboard:\n${clipboard}`);
      }
      this.frameList.closeSlidingItems();
    }
  }

  public trash(index: number) {
    // console.log('trash()', index);
    if (index > -1) {
      const user = this.randomUsers[index];
      // this.randomUsers.splice(index, 1);
      this.randomUsers = this.randomUsers.filter ((_, i) => i !== index);
      this.UITooling.fireAlert(`Removing user:\n${user.name.title} ${user.name.first} ${user.name.last}`);
    }
  }

  // public scrollUp(event) {
  //   console.log('--> scrollUp()', event);
  //   setTimeout(() => {
  //     this.fetchRandomUsers(2).subscribe({
  //       next: (results) => {
  //         results.forEach((data) => {
  //           this.infiniteRandomUsers.pop();
  //           this.infiniteRandomUsers = [ data, ...this.infiniteRandomUsers ];
  //         });
  //       },
  //       error: _ => console.log('https://randomuser.me/api fetch error')
  //     });
  //     event.target.complete();
  //     this.infiniteRandomUserIndex -= 2;
  //     if ( this.infiniteRandomUserIndex <= 0 ) {
  //       event.target.disabled = true;
  //       this.infiniteRandomUserIndex = 0;
  //     }
  //   }, 500);
  // }

  public scrollDown(event) {
    // console.log('--> scrollDown()', event);
    setTimeout(() => {
      this.fetchRandomUsers(2).subscribe({
        next: (results) => results.forEach((data) => this.infiniteRandomUsers.push(data)),
        error: _ => console.log('https://randomuser.me/api fetch error')
      });
      event.target.complete();

      // Refresh a,d render Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();

      this.infiniteRandomUserIndex += 2;
      if ( this.infiniteRandomUserIndex >= 14 ) {
        event.target.disabled = true;
        this.infiniteRandomUserIndex = 4;
      }
    }, 500);
  }
}
