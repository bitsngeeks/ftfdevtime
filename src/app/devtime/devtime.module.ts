import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DevtimeComponent } from './devtime.component';
import { DevtimeRoutingModule } from './devtime-routing.module';

@NgModule({
  imports: [
    DevtimeRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ DevtimeComponent ]
})
export class DevtimeModule { }
