import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';

import { ClientsviewComponent } from './clientsview.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClientsviewRoutingModule } from './clientsview-routing.module';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ClientsviewRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ModalModule.forRoot(),
    NgxSelectModule,
    FormsModule
  ],
  declarations: [ ClientsviewComponent ]
})
export class ClientsviewModule { }
