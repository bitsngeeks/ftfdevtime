import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { UsersviewComponent } from './usersview.component';

const routes: Routes = [
  {
    path: '',
    component: UsersviewComponent,
    data: {
      title: 'Usuarios'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersviewRoutingModule {}
