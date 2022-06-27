import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { UserRole } from '../model/user-role';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router:Router) { }

  BASE = "http://localhost:8080";

  login(username:string, password:string):Observable<any>{
    let params = new HttpParams().set('username', username).set('password', password)

    return this.httpClient.post(this.BASE + "/login/login", params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        skip: 'true',
      })
    })
  }

  register(username:string, password:string, email:string, role:number):Observable<any>{
    let params = new HttpParams().set('username', username).set('password', password).set('email', email).set('roleId', role.toString())
    return this.httpClient.post(this.BASE + "/song/register", params)
  }

  roles():Observable<UserRole[]>{
    return this.httpClient.get<UserRole[]>(this.BASE + "/song/roles")
  }

  logout(){
    localStorage.removeItem("token")
    this.router.navigate(['/login'])
  }
}
