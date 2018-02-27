import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UsersService } from './../services/users.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';


@Component({
  selector: 'app-usersview',
  templateUrl: './usersview.component.html',
  styleUrls: ['./usersview.component.scss']
})
export class UsersviewComponent implements OnInit {
  resultUsers:Object[];
  idupdate:string;
  resultUserById:Object[];
  username:string;
  usernameupdate:string;
  password:string;
  role:boolean;
  roleupdate:boolean;
  name:string;
  nameupdate:string;
  email:string;
  emailupdate:string;
  newrole:boolean;

  @ViewChild('closeBtn') closeBtn: ElementRef;
  

  public myModal;
    public infoModal;
    
    Roles=[{
      id:true,
      text:"Admin"
    },
    {
      id:false,
      text:"Developer"
    }]
    RolesUpdate=[{
      id:true,
      text:"Admin"
    },
    {
      id:false,
      text:"Developer"
    }]

  constructor(public usersService: UsersService) { 
    this.resultUsers=[];
    this.resultUserById=[];
  }

  cleanModal(){

    this.username="";
    this.password="";
    this.role=null;
    this.name="";
    this.email="";

   }

  getUsers(){

     
      this.usersService.getUsers()
      .then((result) => {
        this.resultUsers = result.json();        
      })     
      
  }

  removeUser(id){
    this.usersService.removeUser(id)
    .then(()=>this.getUsers());
    alert("Usuario Eliminado");
  }

  addUser(event){


    if(this.username!=null && this.password!=null && this.role!=null && this.name!=null && this.email!=null)
    {

    this.usersService.addUser(this.username,this.password,this.role,this.name,this.email)
    .then(()=>this.getUsers());
    alert("Usuario Agregado");
    this.closeBtn.nativeElement.click();

    }else{
      alert("Complete todos los campos");
      
    }
    
    
  }
  updateUser(id){
    document.getElementById('updatecard').style.display = "block";
    this.usersService.getUserById(id)
    .then((result) => {
      console.log(result.json());
      
      this.idupdate= result.json()._id;
      this.nameupdate=result.json().name;      
      this.usernameupdate=result.json().username;
      this.emailupdate=result.json().email;
      this.roleupdate=result.json().role;

    })  
  }

  saveChanges(){

    if(this.nameupdate==null || this.nameupdate==""){
      alert("Ingrese un Nombre válido");

    }else if(this.usernameupdate==null || this.usernameupdate==""){
      alert("Ingrese un Username válido");

    }else if(this.emailupdate==null || this.emailupdate==""){
      alert("Ingrese un Email válido");
    }else{


    this.usersService.saveChanges(this.idupdate,this.nameupdate,this.usernameupdate,this.emailupdate,this.roleupdate)
    .then(()=>this.getUsers());
    // console.log(this.idupdate,this.nameupdate,this.usernameupdate,this.emailupdate,this.roleupdate)
    document.getElementById('updatecard').style.display = "none";
    alert("Usuario actualizado");

    }


  }

  ngOnInit() {

    this.getUsers();
  }

}
