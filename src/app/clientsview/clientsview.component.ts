import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ClientsviewService } from './../services/clientsview.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ProjectsService } from '../services/projects.service';


@Component({
  selector: 'app-clientsview',
  templateUrl: './clientsview.component.html',
  styleUrls: ['./clientsview.component.scss']
})
export class ClientsviewComponent implements OnInit {

  resultClients:Object[];
  resultProjects:Object[];
  resultProjectsNames:Object[];
  clientID:string;
  name:string;
  email:string;
  idupdate:string;
  nameupdate:string;
  emailupdate:string;
  pidupdate:string;  
  pnameupdate:string;
  pdescriptionupdate:string;

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('openBtn') openBtn: ElementRef;

  constructor(public clientsviewService: ClientsviewService, public projectsService: ProjectsService) {
    this.resultClients=[];
    this.resultProjects=[];
    this.resultProjectsNames=[];

   }

  
   getClients(){
    this.clientsviewService.getClients()
    .then((result) => {
      this.resultClients = result.json();   
    })   
   }

   cleanModal(){


    this.name="";
    this.email="";

   }

   addClient(event){
    if(this.name!=null && this.email!=null)
    {

    this.clientsviewService.addClient(this.name,this.email)
    .then(()=>this.getClients());
    alert("Cliente Agregado");
    this.closeBtn.nativeElement.click();

    }else{
      alert("Complete todos los campos");
      
    }
    
    
  }

  updateClient(id){
    document.getElementById('updatecard').style.display = "block";
    this.clientsviewService.getClientById(id)
    .then((result) => {
      
      this.idupdate= result.json()._id;
      this.nameupdate=result.json().name;      
      this.emailupdate=result.json().email;
    })  
  }
  updateProject(id){

    document.getElementById('updatecard2').style.display = "block";
    this.projectsService.getOneProject(id)
    .then((result) => {
      this.pidupdate= result.json()._id;
      this.pnameupdate= result.json().name;
      this.pdescriptionupdate= result.json().description;
    })  

    // this.projectsService.editProject(id,this.pnameupdate,this.pdescriptionupdate)
    // .then(()=>this.getProjectsByClientId(id));

    // document.getElementById('updatecard').style.display = "none";
    // alert("Proyecto actualizado");

  }
  saveChanges(){

    if(this.nameupdate==null || this.nameupdate==""){
      alert("Ingrese un Nombre válido");
    
    }else if(this.emailupdate==null || this.emailupdate==""){
      alert("Ingrese un Email válido");
    }else{


    this.clientsviewService.saveChanges(this.idupdate,this.nameupdate,this.emailupdate)
    .then(()=>this.getClients());
    // console.log(this.idupdate,this.nameupdate,this.usernameupdate,this.emailupdate,this.roleupdate)
    document.getElementById('updatecard').style.display = "none";
    alert("Cliente actualizado");

    }


  }

  psaveChanges(){

    if(this.pnameupdate==null || this.pnameupdate==""){
      alert("Ingrese un Nombre válido");
    
    }else if(this.pdescriptionupdate==null || this.pdescriptionupdate==""){
      alert("Ingrese una Descripcion válida");
    }else{


    this.projectsService.editProject(this.pidupdate,this.pnameupdate,this.pdescriptionupdate)
    .then(()=>this.getProjectsByClientId(this.clientID));
    
    
    // console.log(this.idupdate,this.nameupdate,this.usernameupdate,this.emailupdate,this.roleupdate)
    document.getElementById('updatecard2').style.display = "none";
    alert("Proyecto actualizado");

    }


  }
  getProjectsByClientId(id){

    this.clientID=id;
    document.getElementById('proyectscard').style.display = "block";
    this.clientsviewService.getProjectsByClientId(id)
    .then((result) => {
      
      this.resultProjects=result.json().projects; 


    })  
  }

  removeClient(id){
    this.clientsviewService.removeClient(id)
    .then(()=>this.getClients());
    alert("Cliente Eliminado");
  }
  
  



  ngOnInit() {
    

      this.getClients();
      
  
  }

}
