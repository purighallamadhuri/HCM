import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberClaims } from '../Models/claims';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  //baseUrl = 'https://hcmauthenticationapi.azure-api.net/claims';
  baseUrl = 'https://hcmclaimssubmission.azurewebsites.net';
  constructor(
    private http:HttpClient
  ) { }
  getAllClaimTypes():Observable<MemberClaims[]>{
    return this.http.get<MemberClaims[]>(this.baseUrl + '/api/Claims/GetAllClaimTypes');
  }
  AddMemberClaims(addMemberClaims: MemberClaims):Observable<MemberClaims[]>{
    return this.http.post<MemberClaims[]>(this.baseUrl + '/api/Claims/AddClaims',addMemberClaims);
  }
}
