import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CommonModule } from "@angular/common";

@Injectable()
export class ClientsviewService {

  token="";
  headers:Headers;
  resultClients:Object[];
  url='http://192.168.0.20:3000/api/clients';

  constructor(private http:Http) { 
    this.resultClients=[];
  }

  getClients(): Promise<any>{
    
    return this.http.get(this.url).toPromise();        
  }

  addClient(name:string, email:string, seller: string): Promise<any>{
        
    return this.http.post(this.url,
      {
        
      "name" : name,
      "email": email,
      "seller": seller
      }
    ).toPromise();
        
  }
  addProjectToClient(idC:string, array){
    return this.http.put(this.url+'/'+idC,
      {
        "projects": array
      }).toPromise();
  }

  addSellerToClient(idC:string, seller){
    return this.http.put(this.url+'/'+idC,
      {
        "seller": seller
      }).toPromise();
  }
  

  removeClient(id:String): Promise<any>{
    return this.http.delete(this.url+'/'+id)
      
      .toPromise();
        
  }

  getClientById(id){
    return this.http.get(this.url+'/'+id).toPromise();      
  }

  getProjectsByClientId(id){
    return this.http.get(this.url+'/'+id).toPromise();      

  }

  saveChanges(id:string, name:string, email:string, seller:string){
    return this.http.put(this.url+'/'+id,
      {
        
        "name" : name,
        "email": email,
        "seller": seller

      })
      
      .toPromise();
  }
  // removeProjectFromClient(id:String): Promise<any>{
  //   return this.http.put(this.url+'/'+id,
  //      {
  //         "_id" : id()
  //      })
      
  //     .toPromise();
        
  // }
}
