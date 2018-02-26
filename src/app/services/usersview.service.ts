import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class UsersviewService {

  token="";
  headers:Headers;
  resultsUsers:Object[];
  url='http://192.168.0.20:3000/api/users';
  
  constructor(private http:Http) {
    this.resultsUsers=[];
    

  }
}