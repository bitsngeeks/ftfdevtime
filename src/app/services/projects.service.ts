import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class ProjectsService {

  url='http://192.168.0.20:3000/api/projects';
  
  constructor(private http:Http) {
    

   }

   getProjects(): Promise<any>{
    return this.http.get(this.url).toPromise();        
  }

  logHours(id,date,time): Promise<any>{
    return this.http.post(this.url+"/log/"+id,{
      "date": date,
      "time": time
    }).toPromise();        
  }

  getHours(id,date): Promise<any>{
    return this.http.post(this.url+"/logs/"+id,{
      "date": date
    }).toPromise();        
  }


  

}
