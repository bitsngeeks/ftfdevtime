import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UsersService } from './../services/users.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
// import { EmailValidator } from 'ng-email-validation';


@Component({
  selector: 'app-usersview',
  templateUrl: './usersview.component.html',
  styleUrls: ['./usersview.component.scss']
})




export class UsersviewComponent implements OnInit {
  resultUsers:Object[];
  answer;
  idupdate:string;
  resultUserById:Object[];
  username:string;
  usernameupdate:string;
  password:string;
  confirmpassword:string;
  role:boolean;
  roleupdate:boolean;
  name:string;
  nameupdate:string;
  email:string;
  emailupdate:string;
  newrole:boolean;
  dominio;

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

    document.getElementById('updatecard').style.display = "none";
    this.username="";
    this.password="";
    this.confirmpassword="";
    this.role=null;
    this.name="";
    this.email="";
    this.roleupdate=null;
    this.nameupdate="";
    this.emailupdate="";
    this.usernameupdate="";
    

   }

  getUsers(){

     
      this.usersService.getUsers()
      .then((result) => {
        this.resultUsers = result.json();        
      })     
      
  }

  removeUser(id){

    this.answer= confirm("Estás seguro que quieres eliminar este usuario?")
    if(this.answer){
    this.usersService.removeUser(id)
    .then(()=>this.getUsers());
    alert("Usuario Eliminado");
    }
  }

  addUser(event){

  var email2 = this.email;
  function isValidEmailAddress(email2) {
   var pattern = /^([a-z\d!#$%&'*+\-\/=?^_{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
   return pattern.test(email2);
  }
  if(this.username=="" || this.username==null){
    alert("Escriba un username");
  }else if(this.password=="" || this.username==null){
    alert("Escriba una contraseña");    
  }else if(this.role==null){
    alert("Seleccione un rol");
  }else if(this.name=="" || this.name==null){
    alert("Escriba un nombre");
  }else if(this.confirmpassword!=this.password){
    alert("Las contraseñas ingresadas no coinciden")
  }else if(this.email=="" || this.email==null){
    alert("Escriba un email");
  }else if(!isValidEmailAddress(email2)){
    alert("Email invalido");
  }else{
    this.usersService.addUser(this.username,this.password,this.role,this.name,this.email)
    .then(()=>this.getUsers());
    alert("Usuario Agregado");
    this.closeBtn.nativeElement.click();

  }
    
    
  }
  updateUser(id){
    document.getElementById('updatecard').style.display = "block";
    this.usersService.getUserById(id)
    .then((result) => {
      
      
      this.idupdate= result.json()._id;
      this.nameupdate=result.json().name;      
      this.usernameupdate=result.json().username;
      this.emailupdate=result.json().email;
      this.roleupdate=result.json().role;

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

    }else if(this.usernameupdate==null || this.usernameupdate==""){
      alert("Ingrese un Username válido");

    }else if(this.emailupdate==null || this.emailupdate==""){
      alert("Ingrese un Email válido");
    }else if(!isValidEmailAddress(email2)){
      alert("Email invalido");
    }else{
      this.answer= confirm("Estás seguro que quieres actualizar este usuario?")
      if(this.answer){
      this.usersService.saveChanges(this.idupdate,this.nameupdate,this.usernameupdate,this.emailupdate,this.roleupdate)
      .then(()=>this.getUsers());      
      document.getElementById('updatecard').style.display = "none";
      alert("Usuario actualizado");
      }

    }
  }

  cancel(){
    document.getElementById('updatecard').style.display = "none";

    this.nameupdate="";
    this.usernameupdate="";
    this.emailupdate="";
  }

  show(){
    console.log("show")
  }
  
  ngOnInit() {

    this.getUsers();

    
  }

}
