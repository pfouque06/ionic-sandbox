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

  // public randomUsers$: Observable<randomUserType[]>;
  public randomUsers: randomUserType[] = [];
  @ViewChild('frameList', { read: IonList }) public frameList: IonList;

  constructor(private http: HttpClient, private UITooling: UIToolingService) {
    // this.randomUsers$ =
    this.fetchRandomUsers(REFRESH_ITEMS_SIZE).subscribe({
      next: (results) => this.randomUsers = results,
      error: _ => console.log('https://randomuser.me/api fetch error')
    });
  }

  ngOnInit() { }

  private fetchRandomUsers(size: number) {
    return this.http.get<randomUserTypeResult>(
      `https://randomuser.me/api/?inc=gender,name,nat,email,picture&results=${size}`, { responseType: 'json'})
      .pipe( map((r) => r.results) );
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
}
