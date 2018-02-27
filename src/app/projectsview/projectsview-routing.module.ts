import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ProjectsviewComponent } from './projectsview.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsviewComponent,
    data: {
      title: 'Proyectos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsviewRoutingModule {}
