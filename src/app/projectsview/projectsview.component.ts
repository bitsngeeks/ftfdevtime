import { ProjectsService } from './../services/projects.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projectsview',
  templateUrl: './projectsview.component.html',
  styleUrls: ['./projectsview.component.scss']
})
export class ProjectsviewComponent implements OnInit {
  resultProjects:Object=[];
  name:string;
  description:string;
  nameUpdate:string;
  idUpdate:string;
  descriptionUpdate:string;
  answer;

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(public projectsService: ProjectsService) { }

  ngOnInit() {
    this.getProject();
  }

  getProject(){
    this.projectsService.getProjects()
    .then((result) => {
      this.resultProjects = result.json();
    })  
  }
  updateProject(id){
    document.getElementById('updatecard').style.display = "block";
    this.projectsService.getOneProject(id)
    .then((result) => {
      
      this.idUpdate= result.json()._id;
      this.nameUpdate=result.json().name;      
      this.descriptionUpdate=result.json().description;

    }) 
  }
  deleteProject(id){

    this.answer= confirm("Estás seguro que quieres eliminar este proyecto?")
    if(this.answer){
      this.projectsService.deleteProject(id)
    .then(()=>this.getProject());
    alert("Proyecto Eliminado");
    }
    
  }

  addProject(event){


    if((this.name!=null || this.name!="") && (this.description!=null || this.description!="") )
    {

    this.projectsService.createProject(this.name,this.description)
    .then(()=>this.getProject());
    alert("Proyecto Agregado");
    this.closeBtn.nativeElement.click();

    }else{
      alert("Complete todos los campos");
      
    }
    
    
  }
  saveChanges(){

    if(this.nameUpdate==null || this.nameUpdate==""){
      alert("Ingrese un Nombre válido");

    }else if(this.descriptionUpdate==null || this.descriptionUpdate==""){
      alert("Ingrese una descripción válida");

    }else{


    this.projectsService.editProject(this.idUpdate,this.nameUpdate,this.descriptionUpdate)
    .then(()=>this.getProject());
    // console.log(this.idupdate,this.nameupdate,this.usernameupdate,this.emailupdate,this.roleupdate)
    document.getElementById('updatecard').style.display = "none";
      alert("Datos actualizados")
    }


  }
  cancel(){
    document.getElementById('updatecard').style.display = "none";

    this.nameUpdate="";
    this.descriptionUpdate="";
  }

  clearVals(){
    this.name="";
    this.description="";
  }

}
