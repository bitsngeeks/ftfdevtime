import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DevtimeComponent } from './devtime.component';

const routes: Routes = [
  {
    path: '',
    component: DevtimeComponent,
    data: {
      title: 'Horas de desarrollo'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevtimeRoutingModule {}
