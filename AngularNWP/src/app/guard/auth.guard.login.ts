import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuardLogin implements CanActivate{

    constructor(private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        var role = localStorage.getItem("role")
        
        if(role != null){
            if(localStorage.getItem("token") && (role == 'admin' || role == 'user')){
                return true;
            }
        }
        alert("Morate biti ulogovani za dalji pristup!")
        this.router.navigate(['login'])
        return false;
    }

}