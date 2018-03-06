import { ProjectsService } from './../services/projects.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-projectsview',
  templateUrl: './projectsview.component.html',
  styleUrls: ['./projectsview.component.scss']
})
export class ProjectsviewComponent implements OnInit {
  resultProjects:Object=[];
  name:string;
  description:string;
  rate:number;
  rateUpdate:number;
  nameUpdate:string;
  idUpdate:string;
  descriptionUpdate:string;
  answer;
  disabled=[];
  disabledvalue;
  

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(public projectsService: ProjectsService, public router: Router) { }

  ngOnInit() {
    this.getProject();
  }

  getProject(){
    this.projectsService.getProjects()
    .then((result) => {
      result.json().forEach((element,index,array) => {
        this.disabled[index]=element.disabled;
      });
      
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
      this.rateUpdate=result.json().rate;

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


    if((this.name!=null || this.name!="") && (this.description!=null || this.description!="") && (this.rate!=null))
    {
      
      if(isNaN(this.rate)){
        alert("Ingrese un rate válido");
      }
      else if (this.rate<0){
        alert("Ingrese un rate válido")
      }else{
      
        this.projectsService.createProject(this.name,this.description,this.rate)
    .then(()=>this.getProject());
    alert("Proyecto Agregado");
    this.closeBtn.nativeElement.click();
        
      }
    }
    else{
      alert("Complete todos los campos");
      
    }    
    
  }
  gotocharts(){
    this.router.navigateByUrl('admin/charts');
  }
  saveChanges(){

    if(this.nameUpdate==null || this.nameUpdate==""){
      alert("Ingrese un Nombre válido");

    }else if(this.descriptionUpdate==null || this.descriptionUpdate==""){
      alert("Ingrese una descripción válida");

    }else if(this.rateUpdate==null){
      alert("Escriba un rate")
      
    }else if(isNaN(this.rateUpdate)){
      alert("Ingrese un rate válido")
    }else if(this.rateUpdate<0){
      alert("Ingrese un rate válido")
      }else{
        this.answer= confirm("Estás seguro que quieres actualizar este proyecto?")
        if(this.answer){

    this.projectsService.editProject(this.idUpdate,this.nameUpdate,this.descriptionUpdate,this.rateUpdate)
    .then(()=>this.getProject());
    
    document.getElementById('updatecard').style.display = "none";
      alert("Datos actualizados")
        }
    }


  }
  changeAssigned(id){
    this.projectsService.changeAssigned(id,true)
  }
  changeDisabled(pid,id){

    this.disabled[id]=!this.disabled[id];
    
    this.projectsService.changeDisabled(pid,this.disabled[id]);
    if(this.disabled[id]){
    alert("Proyecto habilitado")
    }else{
      alert("Proyecto deshabilitado")
    }
    
  }
  cancel(){
    document.getElementById('updatecard').style.display = "none";

    this.nameUpdate="";
    this.descriptionUpdate="";
    this.rateUpdate=null;
  }

  clearVals(){
    this.name="";
    this.description="";
    this.rate=null;
  }

}
