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
   getOneProject(id): Promise<any>{
    return this.http.get(this.url+'/'+id).toPromise();        
  }
   createProject(name,description): Promise<any>{
    return this.http.post(this.url,{
      "name": name,
      "description": description
    }).toPromise();       
  }
   editProject(id,name,description): Promise<any>{
    return this.http.put(this.url+'/'+id,{
      "name": name,
      "description": description
    }).toPromise();       
  }
   deleteProject(id): Promise<any>{
    return this.http.delete(this.url+'/'+id).toPromise();       
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
