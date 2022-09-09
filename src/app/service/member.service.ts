import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Login,User } from '../Models/Users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }
  UserLogin(loginuser: Login):Observable<Login[]>{
    return this.http.post<Login[]>('https://localhost:7154/api/Authentication/Authenticate',loginuser);
}
AddUser(userDetails:User): Observable<User[]>{
  return this.http.post<User[]>('https://localhost:7247/api/User/AddUsers',userDetails);
}
}
