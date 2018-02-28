import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate} from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { FullLayoutDevComponent } from './layouts/full-layout-dev.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { UsersviewComponent } from './usersview/usersview.component';
import { LoginRedirect } from './services/login-redirect.service';
import { DevRedirectService } from './services/dev-redirect.service';

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
        path: 'charts',
        loadChildren: './chartjs/chartjs.module#ChartJSModule',
        canActivate:[LoginRedirect]
      },
      {
        path: 'usersview',
        loadChildren: './usersview/usersview.module#UsersviewModule',
        canActivate:[LoginRedirect]
      },
      {
        path: 'projectsview',
        loadChildren: './projectsview/projectsview.module#ProjectsviewModule',
        canActivate:[LoginRedirect]
      },
      {
        path: 'clientsview',
        loadChildren: './clientsview/clientsview.module#ClientsviewModule',
        canActivate:[LoginRedirect]
      },
      {
        path: '**',
        loadChildren: './usersview/usersview.module#UsersviewModule',
        canActivate:[LoginRedirect]
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
        loadChildren: './devtime/devtime.module#DevtimeModule',
        canActivate:[DevRedirectService]
      },
      {
        path: '**',
        loadChildren: './devtime/devtime.module#DevtimeModule',
        canActivate:[DevRedirectService]
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
  },
  {
    path: '**',
    redirectTo: 'pages/404',
    pathMatch: 'full',
    
  }


  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
