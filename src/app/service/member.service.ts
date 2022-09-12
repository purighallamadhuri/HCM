import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Get_User, Login,User,SearchMembers } from '../Models/Users';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }
  public updateSite = new BehaviorSubject<any>(false);
  UserLogin(loginuser: Login):Observable<Login[]>{
    return this.http.post<Login[]>('https://localhost:7154/api/Authentication/Authenticate',loginuser);
}
AddUser(userDetails:User): Observable<Get_User[]>{
  return this.http.post<Get_User[]>('https://localhost:7247/api/User/AddUsers',userDetails);
}
CheckUserExists(userDetails:User): Observable<Get_User[]>{
  return this.http.post<Get_User[]>('https://localhost:7247/api/User/CheckUserExists',userDetails);
}
MemberSearch(searchmembers:SearchMembers): Observable<User[]>{
  return this.http.post<User[]>('https://localhost:7247/api/User/SearchMembers',searchmembers);
}
}
