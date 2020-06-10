import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Home/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Exercises/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'profilepage',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'setting',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../setting/setting.module').then(m => m.SettingPageModule)
          }
        ]
      },
      {
        path: 'exercises',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../exercises-detail-page/exercises.module').then(m => m.ExercisesPageModule)
          }
        ]
      },
      {
        path: 'garphpage',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../exercises-detail-page-garph/garph.module').then(m => m.GarphPageModule)
          }
        ]
      },
      {
        path: 'bluetooth',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../bluetooth/bluetooth.module').then(m => m.BluetoothPageModule)
          }
        ]
      },
      {
        path: 'preferences',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../preferences/preferences.module').then(m => m.PreferencesPageModule)
          }
        ]
      },
      {
        path: 'challenges',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../challenges/challenges.module').then(m => m.ChallengesPageModule)
          }
        ]
      },
        {
        path: 'leaderboard',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../leaderboard/leaderboard.module').then(m => m.LeaderboardPageModule)
          }
        ]
      },
      {
        path: 'weeklyworkout',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../weekly-workout/weekly-workout.module').then(m => m.WeeklyWorkoutModule)
          }
        ]
      },
      {
        path: 'weeklyworkoutdetail',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../weekly-workout-detail/weekly-workout-detail.module').then(m => m.WeeklyWorkoutDetailPageModule)
          }
        ]
      },
      {
        path: 'community',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../community/Community.module').then(m => m.CommunityPageModule)
          }
        ]
      },
      {
        path: 'startworkout',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../start-workout/start-workout.module').then(m => m.StartWorkoutPageModule
                )
          }
        ]
      },
      {
        path: 'running',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../running/running.module').then(m => m.RunningPageModule
                )
          }
        ]
      },
      {
        path: 'summarypage',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../summary/summary.module').then(m => m.SummaryPageModule
                )
          }
        ]
      },
      {
        path: 'statspage',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../stats/stats.module').then(m => m.StatsPageModule
                )
          }
        ]
      },
      {
        path: 'weektab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../week-tab/week-tab.module').then(m => m.WeekTabPageModule
                )
          }
        ]
      },
      {
        path: 'monthtab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../month-tab/month.module').then(m => m.MonthTabPageModule
                )
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
