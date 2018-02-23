import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login.service';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './../services/users.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  public username="";
  public pass="";
  

  constructor(public loginService:LoginService, private router: Router, public usersService: UsersService) { }

  validateLogin(){

    this.loginService.postLogin(this.username,this.pass)
    .then((result) => {
      
      localStorage.setItem("token",result.json().token);
      this.usersService.getUser()
      .then((result) => {
        console.log(result.json())
        if(result.json().role){
          this.router.navigateByUrl('/admin/dashboard'); 
        } else{
          this.router.navigateByUrl('/dev/dashboard'); 
        }
        
      })
      
      console.log(localStorage.getItem("token"));
    })
  }

  ngOnInit() {
  }

}
