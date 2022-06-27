import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/model/user-role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public roles: UserRole[] | undefined;
  public username: string | undefined;
  public password: string | undefined;
  public email: string | undefined;
  public role: number | undefined;
  public selected: string | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.roles().subscribe((resp:any) => this.roles = resp)
  }

  register(registerForm:any) {
    console.log(registerForm.value.username, registerForm.value.password, registerForm.value.email, registerForm.value.role)
    this.userService.register(registerForm.value.username, registerForm.value.password, registerForm.value.email, registerForm.value.role
      ).subscribe(resp => {
        if(resp){
          alert("Uspesno ste se registrovali!")
          this.router.navigate(['/login'])
        }
        else{
          alert("Doslo je do greske, pokusajte ponovo!")
          this.router.navigate(['/register'])
        }
    })
  }

  onClick(){

  }
}
