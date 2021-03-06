import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Http, Response, Headers } from '@angular/http';
import { ClientsviewService } from './../services/clientsview.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ProjectsService } from '../services/projects.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-clientsview',
  templateUrl: './clientsview.component.html',
  styleUrls: ['./clientsview.component.scss']
})
export class ClientsviewComponent implements OnInit {

  resultClients:Object[];
  resultProjects:Object[];
  resultProjectsid:Object[];
  resultProjectsids:Object[];
  resultProjectname:string;
  resultProjectsNames:Object[];
  resultnewProjects:Object[];
  resulttocomparewith:Object[];
  answer;
  flag:boolean;
  clientID:string;
  name:string;
  email:string;
  idupdate:string;
  nameupdate:string;
  emailupdate:string;
  pidupdate:string;  
  pnameupdate:string;
  pdescriptionupdate:string;
  prate:number;
  Projects=[];
  Sellers=[];
  resultProject;
  resultSellers;
  newproject;
  seller="";
  sellerupdate;
  sellername:string;
  url='http://192.168.0.20:3000/api/clients';

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('openBtn') openBtn: ElementRef;

  
  constructor(public clientsviewService: ClientsviewService, public projectsService: ProjectsService, public usersService: UsersService, private http:Http, ) {
    this.resultClients=[];
    this.resultProjects=[];
    this.resultProjectsNames=[];
    this.resultProjectsid=[];
    this.resultProjectsids=[];
    this.resultnewProjects=[];
    this.resultSellers=[];
   }

   getClients(){
    this.clientsviewService.getClients()
    .then((result) => {
      this.resultClients = result.json();   
    })   
   }

   cleanModal(){

    document.getElementById('updatecard').style.display = "none";
    this.name="";
    this.email="";
    this.seller="";
    this.sellerupdate="";
    this.emailupdate="";
    this.nameupdate="";

   }

   addClient(event){
   var email2 = this.email;
   function isValidEmailAddress(email2) {
   var pattern = /^([a-z\d!#$%&'*+\-\/=?^_{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
   return pattern.test(email2);
   }
   if(this.name==""){
     alert("Escriba un nombre")
   }else if(this.email=="") {
    alert("Escriba un email")
   }
   else if (!isValidEmailAddress(email2)) {
    alert("Email invalido");
   } else {     
     console.log(this.seller)
     this.clientsviewService.addClient(this.name,this.email,this.seller)
     .then(()=>{
       this.getClients()
       alert("Cliente Agregado");
      });
     
     this.closeBtn.nativeElement.click();
   }    
 }

  updateClient(id){

    this.sellername="";
    document.getElementById('updatecard').style.display = "block";
    this.clientsviewService.getClientById(id)
    .then((result) => {
      
      this.idupdate= result.json()._id;
      this.nameupdate=result.json().name;      
      this.emailupdate=result.json().email;      
      this.sellerupdate=result.json().seller; 
      
      if(this.sellerupdate!="" && this.sellerupdate!=null)
      this.usersService.getUserById(this.sellerupdate)
      .then((result2) => {
        
        this.sellername=result2.json().name;
        console.log(this.sellername);
      })
      
      
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
  }
  saveChanges(){
    var email2 = this.emailupdate;
    function isValidEmailAddress(email2) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(email2);
    }
    if(this.nameupdate==null || this.nameupdate==""){
      alert("Ingrese un Nombre válido");    
    }else if(this.emailupdate==null || this.emailupdate==""){
      alert("Escriba un Email");
    }else if(!isValidEmailAddress(email2)){
      alert("Ingrese un Email válido");
    }else
    {
      this.answer= confirm("Estás seguro que quieres actualizar este usuario?")
      if(this.answer){
    this.clientsviewService.saveChanges(this.idupdate,this.nameupdate,this.emailupdate,this.sellerupdate)
    .then(()=>this.getClients());
    
    document.getElementById('updatecard').style.display = "none";
    alert("Cliente actualizado");
      }
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

    this.answer= confirm("Estás seguro que quieres eliminar este cliente?")
    if(this.answer){
      this.clientsviewService.removeClient(id)
      .then(()=>this.getClients());
      alert("Cliente Eliminado");
    }

    
  }

  removeProjectFromClient(id){

    this.answer= confirm("Estás seguro que quieres quitarle este proyecto?")
    if(this.answer){
    this.resultProjectsids=[];
    
      this.clientsviewService.getClientById(this.clientID)
      .then((result) => {
        
       result.json().projects.forEach(element => {
        this.resultProjectsids.push(element._id);
       }); 
       for(let i = 0; i<this.resultProjectsids.length; i++){
       
         if(id==this.resultProjectsids[i]){
          this.resultProjectsids.splice(i,1); 
         }
      }
       this.clientsviewService.addProjectToClient(this.clientID,this.resultProjectsids)
       .then(()=>
          { 
            this.projectsService.changeAssigned(id,false)
            .then(()=>
                   {
                    this.showAllProjects();
                   } );
            alert("Proyecto eliminado");
            this.getProjectsByClientId(this.clientID);
            
          }
      )    
    })
  }
  }

  showAddProyect(){

    document.getElementById('addproject').style.display = "block";
    
  }

  saveProjectAdded()
  {
    this.resultnewProjects=[];
    this.resulttocomparewith=[];
    this.clientsviewService.getClientById(this.clientID)
      .then((result) => {    
        result.json().projects.forEach(element => {
          this.resultnewProjects.push(element._id);
         }); 
        for(let i = 0; i<this.resultnewProjects.length; i++){
          
          if(this.newproject==this.resultnewProjects[i]){
              this.flag=true;
              break;
            }
          else{
              this.flag=false;
           }
          }
          
          if(this.flag)
          {
             alert("Erro: No se puede agregar el mismo proyecto")

          }else{
            this.resultnewProjects.push(this.newproject);
              this.clientsviewService.addProjectToClient(this.clientID,this.resultnewProjects)
              .then(()=>
             {
               this.projectsService.changeAssigned(this.newproject,true);
              alert("Proyecto agregado");
              this.newproject="";
              document.getElementById('addproject').style.display = "none";
              this.getProjectsByClientId(this.clientID);
              })
          }
    
  })

  }
  cancel(){
    document.getElementById('updatecard').style.display = "none";

    this.nameupdate="";    
    this.emailupdate="";
    this.sellerupdate="";
  }

  

  cancelProjects(){
    document.getElementById('proyectscard').style.display = "none";
      
  }

  cancelAddProject(){
    this.Projects=[];
    this.Sellers=[];
    document.getElementById('addproject').style.display = "none";
  }

  showAllProjects(){
    this.projectsService.getProjects()
   .then((result) => {
     this.Projects=[];
     result.json().forEach((project:
       {
           _id:string,
           name:string,
           description:string,
           rate:number,
           assigned:boolean,
           disabled:boolean
       }) => {
         if(!project.assigned && project.disabled){
       this.Projects.push({
         id: project._id,
         text: project.name +" - "+ project.description
       });
      }
     });
     this.resultProject=result.json();
   })
  }

  showAllSellers(){
    this.usersService.getUsers()
    .then((result) => {
      this.Sellers=[];
      result.json().forEach((user:
        {
            _id:string,
            username:string,
            role:boolean,
            name:string,
            email:string,
            seller:boolean
        }) => {
          if(user.seller){
        this.Sellers.push({
          id: user._id,
          text: user.name
        });
       }
      });
      this.resultSellers=result.json();
    })
   }
  

  ngOnInit() {
    
      this.getClients();
  }

}
