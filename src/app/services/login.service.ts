import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class LoginService {
  resultsLogin:Object[];
  url='http://192.168.0.20:3000/auth/signin';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
 
  // first_name: string=localStorage.getItem("name");

  constructor(private http:Http) {
    this.resultsLogin=[];
   }

  postLogin(username:string, password: string): Promise<any>{
    return this.http.post(this.url,
      {
        "username" : username,
        "password" : password
        },{headers: this.headers}).toPromise();
        
  }
  

}
