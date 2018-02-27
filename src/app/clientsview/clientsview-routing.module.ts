import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ClientsviewComponent } from './clientsview.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsviewComponent,
    data: {
      title: 'Clientes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsviewRoutingModule {}
