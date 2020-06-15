import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  { 
    path: 'apple-connect',
    loadChildren: () => import('./apple-connect/apple-connect.module').then( m => m.AppleConnectPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'reg',
    loadChildren: () => import('./reg/reg.module').then( m => m.RegPageModule)
  },
  {
    path: 'enter-code',
    loadChildren: () => import('./enter-code/enter-code.module').then( m => m.EnterCodePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'invite-people',
    loadChildren: () => import('./invite-people/invite-people.module').then( m => m.InvitePeoplePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'bg-img',
    loadChildren: () => import('./bg-img/bg-img.module').then( m => m.BgImgPageModule)
  },
  {
    path: 'class-name',
    loadChildren: () => import('./class-name/class-name.module').then( m => m.ClassNamePageModule)
  },
  {
    path: 'class-listing',
    loadChildren: () => import('./class-listing/class-listing.module').then( m => m.ClassListingPageModule)
  },
  // {
  //   path: 'exercises-detail',
  //   loadChildren: () => import('./exercises-detail/exercises-detail.module').then( m => m.ExercisesDetailPageModule)
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
