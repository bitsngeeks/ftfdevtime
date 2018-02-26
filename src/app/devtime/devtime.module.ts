import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DevtimeComponent } from './devtime.component';
import { DevtimeRoutingModule } from './devtime-routing.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    DevtimeRoutingModule,
    ChartsModule,
    BsDropdownModule,
    NgxMyDatePickerModule.forRoot(),
    FormsModule,
    CommonModule
  ],
  declarations: [ DevtimeComponent ]
})
export class DevtimeModule { }
