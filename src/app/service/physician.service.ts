import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignPhysician, Physicians } from '../Models/physician';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {

  constructor(private http:HttpClient) { }
  getAllPhysicians():Observable<Physicians[]>{
    return this.http.get<Physicians[]>('https://localhost:7247/api/Physician');
  }

  AssignPhysician(assignPhysician:AssignPhysician):Observable<AssignPhysician[]>{
    return this.http.put<AssignPhysician[]>('https://localhost:7247/api/Physician',assignPhysician);
  }
}
