import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class LoginRedirect implements CanActivate {
 constructor(private router: Router, private route: ActivatedRoute) {}
 canActivate(): boolean {
   if (localStorage.getItem('token')) {
     if(localStorage.getItem('role')=="true"){
      return true;
      
     }else{
       alert("No tienes privilegios de administrador")
       return false;
     }    
   }
   else {
    this.router.navigateByUrl('/pages/login');
     return false;
   }
 }
}