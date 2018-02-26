import { Component, OnInit, ViewChild  } from '@angular/core';
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
  public myModal;
    public infoModal;

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
    this.usersService.removeUser(id);
  }

  ngOnInit() {

    this.getUsers();
  }

}
