import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignPhysician, Physicians } from '../Models/physician';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {
  //baseUrl = 'https://hcmauthenticationapi.azure-api.net/user';
  baseUrl = 'https://hcmuser.azurewebsites.net';
  constructor(private http:HttpClient) { }
  getAllPhysicians():Observable<Physicians[]>{
    return this.http.get<Physicians[]>(this.baseUrl + '/api/Physician');
  }

  AssignPhysician(assignPhysician:AssignPhysician):Observable<AssignPhysician[]>{
    return this.http.put<AssignPhysician[]>(this.baseUrl + '/api/Physician',assignPhysician);
  }
}
