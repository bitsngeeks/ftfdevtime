import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';

import { ProjectsviewComponent } from './projectsview.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProjectsviewRoutingModule } from './projectsview-routing.module';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ProjectsviewRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ModalModule.forRoot(),
    NgxSelectModule,
    FormsModule
  ],
  declarations: [ ProjectsviewComponent ]
})
export class ProjectsviewModule { }
