import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class UsersService {

  token="";
  headers:Headers;
  resultsUser:Object[];
  url='http://192.168.0.20:3000/api/users';
  
  constructor(private http:Http) {
    this.resultsUser=[];
    

   }

   getUser(): Promise<any>{
    this.token =localStorage.getItem("token");

    this.headers = new Headers({'Content-Type': 'application/json', Authorization: `Bearer ${this.token}`});
    return this.http.get(this.url+'/me',{headers: this.headers}).toPromise();        
  }


  

}
