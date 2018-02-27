import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { FullLayoutDevComponent } from './layouts/full-layout-dev.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { UsersviewComponent } from './usersview/usersview.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'usersview',
        loadChildren: './usersview/usersview.module#UsersviewModule'
      },
      {
        path: 'projectsview',
        loadChildren: './projectsview/projectsview.module#ProjectsviewModule'
      },
      {
        path: 'clientsview',
        loadChildren: './clientsview/clientsview.module#ClientsviewModule'
      }
    ]
  },
  {
    path: 'dev',
    component: FullLayoutDevComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'development',
        loadChildren: './devtime/devtime.module#DevtimeModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
