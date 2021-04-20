import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonList } from '@ionic/angular';
import { Observable } from 'rxjs';
import { flatMap, map, switchMap } from 'rxjs/operators';
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

@Component({
  selector: 'app-ionic-lists',
  templateUrl: './ionic-lists.component.html',
  styleUrls: ['./ionic-lists.component.scss'],
})
export class IonicListsComponent implements OnInit {

  // public randomUsers$: Observable<randomUserType[]>;
  public randomUsers: randomUserType[];
  @ViewChild('frameList', { read: IonList }) public frameList: IonList;

  constructor(public http: HttpClient, private UITooling: UIToolingService) {
    // this.randomUsers$ =
    this.http.get<randomUserTypeResult>('https://randomuser.me/api/?inc=gender,name,nat,email,picture&results=5', { responseType: 'json'})
      .pipe(map((r) => r.results))
      .subscribe((results) => this.randomUsers = results);
  }

  ngOnInit() { }

  public async copy(index: number) {
    console.log('copy()', index);
    if ( index > -1 && index < this.randomUsers.length && navigator.clipboard ) {
      // this.randomUsers.push(this.randomUsers.slice(index, 1)[0]);
      let clipboard = '';
      try {
        const user = this.randomUsers[index];
        clipboard = `${user.name.title} ${user.name.first} ${user.name.last}\n${user.email}`;
        await navigator.clipboard.writeText(clipboard);
        // await navigator.clipboard.writeText(JSON.stringify(this.randomUsers[index]));
      } finally {
        this.UITooling.fireAlert(`Copying to clipboard:\n${clipboard}`);
      }
      this.frameList.closeSlidingItems();
    }
  }

  public trash(index: number) {
    console.log('trash()', index);
    if (index > -1) { this.randomUsers.splice(index, 1); }
  }
}
