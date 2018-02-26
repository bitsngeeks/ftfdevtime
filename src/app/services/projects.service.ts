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


  

}
