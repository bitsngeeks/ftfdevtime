import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class DevRedirectService implements CanActivate {

  constructor(private router: Router, private route: ActivatedRoute) {}
  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      if(localStorage.getItem('role')=="false"){
       return true;
       
      }else{
        alert("No tienes eres un developer")
        return false;
      }    
    }
    else {
     this.router.navigateByUrl('/pages/login');
      return false;
    }
  }
 }