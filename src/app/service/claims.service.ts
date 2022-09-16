import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberClaims } from '../Models/claims';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  constructor(
    private http:HttpClient
  ) { }
  getAllClaimTypes():Observable<MemberClaims[]>{
    return this.http.get<MemberClaims[]>('https://localhost:7139/api/Claims/GetAllClaimTypes');
  }
  AddMemberClaims(addMemberClaims: MemberClaims):Observable<MemberClaims[]>{
    return this.http.post<MemberClaims[]>('https://localhost:7139/api/Claims/AddClaims',addMemberClaims);
  }
}
