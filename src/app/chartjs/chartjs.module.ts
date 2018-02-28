import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxSelectModule } from 'ngx-select-ex';

import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    FormsModule,
    MyDateRangePickerModule,
    NgxSelectModule,
    CommonModule
  ],
  declarations: [ ChartJSComponent ]
})
export class ChartJSModule { }
