import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './../services/login.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout-dev.component.html'
})
export class FullLayoutDevComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
    
  }
  
  constructor(public router: Router, public loginService:LoginService) { }
  
  logout(){
    
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    this.router.navigateByUrl('/pages/login');

  }

  ngOnInit(): void {
    this.loginService.changeName();
  }
}
