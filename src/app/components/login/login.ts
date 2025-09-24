import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  router:Router=inject(Router)

  navigateToSignUp()
  {
    console.log("Sign-Up")
    this.router.navigate(['sign-up']);
  }
  navigateToForgetPassword()
  {
    console.log("forget-password")
    this.router.navigate(["forget-password"])
  }
  
  handleLoginWithGoogle = () => {
    window.location.href = 'https://localhost:7041/api/Authentication/signin-google'
  }
}
