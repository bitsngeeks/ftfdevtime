import { ProjectsService } from './services/projects.service';
import { FullLayoutDevComponent } from './layouts/full-layout-dev.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { LoginRedirect } from './services/login-redirect.service';
import { UsersService } from './services/users.service';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { ClientsviewComponent } from './clientsview/clientsview.component';
import { ClientsviewService } from './services/clientsview.service';
import { DevRedirectService } from './services/dev-redirect.service';




@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    HttpClientModule
    
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    FullLayoutDevComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,

  },

  LoginService,
  LoginRedirect,
  UsersService,
  ProjectsService,
  ClientsviewService,
  DevRedirectService
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
