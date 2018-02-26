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
  username:string;
  password:string;
  role:boolean;
  name:string;
  email:string;
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

  constructor(public usersService: UsersService) { 
    this.resultUsers=[];
  }

  getUsers(){

     
      this.usersService.getUsers()
      .then((result) => {
        console.log(result.json());
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

  ngOnInit() {

    this.getUsers();
  }

}
