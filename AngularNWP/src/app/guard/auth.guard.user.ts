import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuardUser implements CanActivate{

    constructor(private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        var role = localStorage.getItem("role")
        
        if(role != null){
            if(localStorage.getItem("token") && role == 'user'){
                return true;
            }
        }
        alert("Morate biti ulogovani!")
        this.router.navigate(['login'])
        return false;
    }

}