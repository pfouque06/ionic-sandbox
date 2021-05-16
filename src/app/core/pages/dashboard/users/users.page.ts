import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService, selectAllUsers, selectUserSetState, State, User, UserService } from 'koa-services';
import { filter, map, skip, take } from 'rxjs/operators';
import { UIToolingService } from 'src/app/shared/services/UITooling.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  // loading
  public loading = true;
  public skeletons = new Array<number>(5);

  // loaded
  public user: Partial<User>;
  public dataSource: User[];

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private userService: UserService,
    private UITooling: UIToolingService,
    private router: Router ) { console.log('dashboard/users'); }

    ngOnInit() {
      this.initDataSource();
    }

    async initDataSource() {
      console.log('--> initDataSource()');
      // retrieve user from currentUser
      this.user = await this.authService.getCurrentUser();
      // console.log(this.user);

      // retrieve users list
      this.fetchUsers();
    }

    public doRefresh(event) {
      console.log('--> Start refresh', event);
      this.fetchUsers();
      event.target.complete();
    }

    private fetchUsers() {
      console.log('--> fetchUsers()');
      // retrieve user lists
      this.userService.getAllUser();
      console.log('--> userService.getAllUser()');
      // handle error
      this.store.pipe(select(selectUserSetState), skip(1), take(1), filter( (s) => !!s.errors && s.errors.error), map( (s) => s.errors.error))
      .subscribe( (errors) => {
        this.UITooling.fireAlert('[getAllUsers] Operation has failed! Please check logs and retry', 'failed' );
      });
      // get list
      this.store.pipe( select(selectAllUsers), skip(1), take(1) )
      .subscribe((users) => {
        console.log(users);
        this.loading = false;
        this.dataSource = [...users];
      });
      // handle result
      // this.store.pipe( select(selectUserSetState), skip(1), take(1) )
      // .subscribe((state) => {
      //   console.log(state);
      //   if (!!state.errors && state.errors.error) {
      //     // for( const key in errors ) { console.log(`errors[${key}] `, errors[key]); };
      //     this.UITooling.fireGlobalAlertSnackBar('[getAllUsers] Operation has failed! Please check logs and retry', 'snack-bar-error' );
      //   } else {
      //     this.UITooling.fireGlobalAlertSnackBar('Get All user is successful', 'snack-bar-success');
      //     const users: User[] = [];
      //     state.entities.map((entity: User) => new User(entity));
      //     this.dataSource = new MatTableDataSource(users);
      //     this.loading = false;
      //   }
      // })
    }
  }
