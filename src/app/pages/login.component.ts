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
    if(this.username!=""){

      if(this.pass!=""){
        
        this.loginService.postLogin(this.username,this.pass)
       .then((result) => {
        
        localStorage.setItem("token",result.json().token);
        this.usersService.getUser()
       .then((result) => {
        localStorage.setItem("userId",result.json()._id);
        localStorage.setItem("role",result.json().role);
        localStorage.setItem("name",result.json().name);
        if(result.json().role){
          this.router.navigateByUrl('/admin/charts'); 
        } else{
          this.router.navigateByUrl('/dev/development'); 
        }
        
      })   
   
 
      },(error)=>{
        alert(error._body)
      })

      }else{
        alert("Ingrese una contraseña válida")
      }      

    }else{
      alert("Ingrese un usuario válido");
    }
  
    
  }

  enterKey(e){
    
  if (e.keyCode == 13) {
    
      this.validateLogin();
  }
}

  ngOnInit() {
    
  }

}
