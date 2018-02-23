import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { UsersviewComponent } from './usersview.component';
import { UsersviewRoutingModule } from './usersview-routing.module';

@NgModule({
  imports: [
    UsersviewRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ UsersviewComponent ]
})
export class UsersviewModule { }
