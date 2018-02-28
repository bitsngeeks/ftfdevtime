import { FormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    FormsModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [ ChartJSComponent ]
})
export class ChartJSModule { }
