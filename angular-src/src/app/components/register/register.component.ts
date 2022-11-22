import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService:ValidateService,
    private authService:AuthService,
    private router: Router,
    ) {}
  ngOnInit(){

  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    //Required Fields
    if(!this.validateService.validateRegister(user)){
      console.log('Please fill in all fields');
      return false;
    }
    //Validate Email
    if(!this.validateService.validateEmail(user.email)){
      console.log('Please use a valid email');
      return false;
    }
    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data["success"]) {
        // console.log("Registered");
        this.router.navigate(['/login']);
      } else {
        // console.log("Not Registered");
        this.router.navigate(['/register']);
      }
      // console.log("data",data);

    });
  }


}
