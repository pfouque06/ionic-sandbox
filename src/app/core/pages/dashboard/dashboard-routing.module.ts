import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  { path: '', component: DashboardPage,children: [
    { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
    { path: 'newsfeed', loadChildren: () => import('./newsfeed/newsfeed.module').then( m => m.NewsfeedPageModule) },
    { path: 'profile', loadChildren: () => import('./user-profile/user-profile.module').then( m => m.ProfilePageModule) },
    { path: 'profile/:id', loadChildren: () => import('./user-profile/user-profile.module').then( m => m.ProfilePageModule) },
    { path: 'form', loadChildren: () => import('./user-form/user-form.module').then( m => m.UserFormPageModule) },
    { path: 'form/:id', loadChildren: () => import('./user-form/user-form.module').then( m => m.UserFormPageModule) },
    { path: 'users', loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule) },
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
