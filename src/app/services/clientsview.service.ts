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

}
