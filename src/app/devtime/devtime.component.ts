import { CommonModule } from '@angular/common/src/common_module';
import { ProjectsService } from './../services/projects.service';
import { Component, OnInit } from '@angular/core';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';


@Component({
  selector: 'app-devtime',
  templateUrl: './devtime.component.html',
  styleUrls: ['./devtime.component.scss']
})
export class DevtimeComponent implements OnInit {
  public date = new Date();

  myOptions: INgxMyDpOptions = {
    disableSince: {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()+1},
    dateFormat: 'dd.mm.yyyy',
};
  public resultProject=[];
  public Projects = [];
  public ProjectId;
  public hours=0;
  public minutes=0;
  public model: any = { jsdate: new Date() };
  
  constructor(public projectsService: ProjectsService) { }


  ngOnInit() {
    this.projectsService.getProjects()
    .then((result) => {
      result.json().forEach((project:
        {
            _id:string, 
            name:string,
            description:string,
            
            disabled:boolean
        }) => {
          if(project.disabled){
        this.Projects.push({
          id: project._id, 
          text: project.name +" - "+ project.description
        });
      }
      });
      console.log(result.json())
      this.resultProject=result.json();
    })
  }

  projectSelect(event){
    this.projectsService.getHours(this.ProjectId,this.date,this.date,'day')
    .then((result) => {
      console.log(result.json())
      this.minutes = result.json().log[0].time % 60;
      this.hours = Math.floor(result.json().log[0].time / 60);
    })
  }

  onDateChanged(event: IMyDateModel): void {
    this.date = new Date(event.jsdate)
    this.projectsService.getHours(this.ProjectId,this.date,this.date,'day')
    .then((result) => {
      console.log(result.json())
      this.minutes = result.json().log[0].time % 60;
      this.hours = Math.floor(result.json().log[0].time / 60);
    })
}

logHours(){

    this.projectsService.getOneProject(this.ProjectId)
    .then((result)=>
  {
    if(result.json().disabled)
    {
      if(!this.ProjectId){
        alert("Seleccione un proyecto")
      }else if((this.hours==0 || this.hours===null) && (this.minutes==0 || this.minutes===null) && (this.hours)){
        alert("Escriba una medida de tiempo no nula (Minutos,horas o una combinacion de ambas)")
      } else if(!this.model){
        alert("Seleccione una fecha")
      } else{
        var time = this.hours*60 + this.minutes;
        this.projectsService.logHours(this.ProjectId,this.model.jsdate,time);
        alert("Tiempo registrado exitosamente")
      }
    }
    else{
      alert("El proyecto está deshabilitado")
    }
  })

  
  
}

}
