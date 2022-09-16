import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Get_User, Login,User,SearchMembers } from '../Models/Users';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  //baseUrl = 'https://hcmauthenticationapi.azure-api.net/auth';
  baseUrl = 'https://hcmauthentication.azurewebsites.net';
  constructor(private http:HttpClient) { }
  public updateSite = new BehaviorSubject<any>(false);
  UserLogin(loginuser: Login):Observable<Login[]>{
    return this.http.post<Login[]>(this.baseUrl + '/api/Authentication/Authenticate',loginuser);
}
AddUser(userDetails:User): Observable<Get_User[]>{
  return this.http.post<Get_User[]>(this.baseUrl + '/api/User/AddUsers',userDetails);
}
CheckUserExists(userDetails:User): Observable<Get_User[]>{
  return this.http.post<Get_User[]>(this.baseUrl + '/api/User/CheckUserExists',userDetails);
}
MemberSearch(searchmembers:SearchMembers): Observable<User[]>{
  return this.http.post<User[]>(this.baseUrl + '/api/User/SearchMembers',searchmembers);
}
}
