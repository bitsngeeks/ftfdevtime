import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';

import { UsersviewComponent } from './usersview.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UsersviewRoutingModule } from './usersview-routing.module';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    UsersviewRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ModalModule.forRoot(),
    NgxSelectModule,
    FormsModule
  ],
  declarations: [ UsersviewComponent ]
})
export class UsersviewModule { }
