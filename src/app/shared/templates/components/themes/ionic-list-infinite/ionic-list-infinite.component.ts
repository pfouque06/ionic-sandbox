import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

export const MAX_ITEMS_PER_PAGE = 8;
export const REFRESH_ITEMS_SIZE = 2;

@Component({
  selector: 'app-ionic-list-infinite',
  templateUrl: './ionic-list-infinite.component.html',
  styleUrls: ['./ionic-list-infinite.component.scss'],
})
export class IonicListInfiniteComponent implements OnInit {

  public skeletons = new Array<number>(5);
  private initialScrollUp = true;
  public infiniteRandomUsers: randomUserType[] = [];

  constructor(private http: HttpClient, private UITooling: UIToolingService) {
    this.fetchRandomUsers(MAX_ITEMS_PER_PAGE).subscribe({
      next: (results) => {
        this.infiniteRandomUsers = [...results];
        // console.log('--> size: ', this.infiniteRandomUsers.length);
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

  public scrollUp(event) {
    // cancel initial scrollUp auto generated at startup
    if (this.initialScrollUp) { event.target.complete(); this.initialScrollUp = false; return; }

    // console.log('--> scrollUp()');
    setTimeout(() => {
      this.fetchRandomUsers(REFRESH_ITEMS_SIZE).subscribe({
        next: (results) => {
          this.infiniteRandomUsers = [ ...results, ...this.infiniteRandomUsers, ].slice(0, MAX_ITEMS_PER_PAGE);
          // console.log('--> # fetched user: ', results.length);
          // console.log('--> new size: ', this.infiniteRandomUsers.length);
          event.target.complete();
        },
        error: _ => console.log('https://randomuser.me/api fetch error')
      });
    }, 200);
  }

  public scrollDown(event) {
    // console.log('--> scrollDown()');
    setTimeout(() => {
      this.fetchRandomUsers(REFRESH_ITEMS_SIZE).subscribe({
        next: (results) => {
          this.infiniteRandomUsers = [ ...this.infiniteRandomUsers, ...results].slice(REFRESH_ITEMS_SIZE);
          // console.log('--> # fetched user: ', results.length);
          // console.log('--> new size: ', this.infiniteRandomUsers.length);
          event.target.complete();
        },
        error: _ => console.log('https://randomuser.me/api fetch error')
      });
    }, 200);
  }
}

