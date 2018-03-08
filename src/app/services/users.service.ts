import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CommonModule } from "@angular/common";

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

  getUsers(): Promise<any>{
    
    return this.http.get(this.url).toPromise();        
  }

  getUserById(id){
    return this.http.get(this.url+'/'+id).toPromise();      

  }

  removeUser(id:String): Promise<any>{
    return this.http.delete(this.url+'/'+id)
      
      .toPromise();
        
  }

  addUser(username:string, password: string, role:boolean, name:string, email:string): Promise<any>{
    return this.http.post(this.url,
      {
      "username" : username,
      "password" : password,
      "role" : role,
      "name" : name,
      "email": email,
      "seller" : false
      }
    ).toPromise();
        
  }

  saveChanges(id:string, name:string, username:string, email:string, role:boolean){
    return this.http.put(this.url+'/'+id,
      {
        "username": username,
        "role" : role,
        "name" : name,
        "email": email

      })
      
      .toPromise();
  }
  changeSeller(idU:string, boolean){
    return this.http.put(this.url+'/'+idU,
      {
        "seller": boolean
      }).toPromise();
  }

  

}
