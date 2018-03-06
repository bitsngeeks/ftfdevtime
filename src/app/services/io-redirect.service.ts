
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class IoRedirectService implements CanActivate {

  constructor(private router: Router, private route: ActivatedRoute) {}
 canActivate(): boolean {

    
    console.log(this.router.url);


   if (localStorage.getItem('token')) {
    if(localStorage.getItem('role')=="true"){
      this.router.navigateByUrl('/admin/charts');
      return false;
      
     }else{
      this.router.navigateByUrl('/dev/development');
       return false;
     }  
   }
   else {
     
     return true;
   }
 }

}
