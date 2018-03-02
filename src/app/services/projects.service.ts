import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class ProjectsService {

  url='http://192.168.0.20:3000/api/projects';
  token="";
  headers:Headers;
  constructor(private http:Http) {
    

   }

/*    getUser(): Promise<any>{
    this.token =localStorage.getItem("token");

    this.headers = new Headers({'Content-Type': 'application/json', Authorization: `Bearer ${this.token}`});
    return this.http.get(this.url+'/me',{headers: this.headers}).toPromise();        
  } */

   getProjects(): Promise<any>{
    return this.http.get(this.url).toPromise();        
  }
   getOneProject(id): Promise<any>{
    return this.http.get(this.url+'/'+id).toPromise();        
  }
   createProject(name,description,rate): Promise<any>{
    return this.http.post(this.url,{
      "name": name,
      "description": description,
      "rate": rate,
      "assigned" : false
    }).toPromise();       
  }
   editProject(id,name,description,rate): Promise<any>{
    return this.http.put(this.url+'/'+id,{
      "name": name,
      "description": description,
      "rate" : rate
    }).toPromise();       
  }
   deleteProject(id): Promise<any>{
    return this.http.delete(this.url+'/'+id).toPromise();       
  }

  logHours(id,date,time): Promise<any>{
    this.token =localStorage.getItem("token");
    this.headers = new Headers({'Content-Type': 'application/json', Authorization: `Bearer ${this.token}`});
    return this.http.post(this.url+"/log/"+id,{
      "date": date,
      "time": time
    },{headers: this.headers}).toPromise();        
  }

  getHours(id,dateStart,dateEnd,period): Promise<any>{
    this.token =localStorage.getItem("token");
    this.headers = new Headers({'Content-Type': 'application/json', Authorization: `Bearer ${this.token}`});
    return this.http.post(this.url+"/logs/"+id,{
      "date_start": dateStart,
      "date_end": dateEnd,
      "period": period
    },{headers: this.headers}).toPromise();        
  }
  adminGetHours(id,userId,dateStart,dateEnd,period): Promise<any>{
    this.token =localStorage.getItem("token");
    this.headers = new Headers({'Content-Type': 'application/json', Authorization: `Bearer ${this.token}`});
    return this.http.post(this.url+"/adminlogs/"+id,{
      "date_start": dateStart,
      "date_end": dateEnd,
      "period": period,
      "user_id": userId
    },{headers: this.headers}).toPromise();        
  }

  changeAssigned(idP:string, boolean){
    return this.http.put(this.url+'/'+idP,
      {
        "assigned": boolean
      }).toPromise();
  }


  

}
