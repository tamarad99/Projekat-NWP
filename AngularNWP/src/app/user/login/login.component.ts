import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string = ""
  public password: string = ""

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm:any) {
   this.userService.login(loginForm.value.username, loginForm.value.password)
   .subscribe((resp:any) => {
    if(resp.role != undefined){
      localStorage.setItem('token', resp.token);
      localStorage.setItem('role', resp.role.name);

      if(localStorage.getItem('role') == "user"){
        this.router.navigate(['/song/list'])
        alert("Uspesno ste ulogovani kao korisnik")
      }
      else{
        this.router.navigate(['/song/list'])
        alert("Uspesno ste ulogovani kao admin")
      }
    }
    else{
      alert("Pogresni kredencijali, probajte ponovo.")
    }
   })
  }
}
