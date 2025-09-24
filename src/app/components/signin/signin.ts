import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {

  router:Router= inject(Router);
  navigateToLogin()
  {
    console.log("login");
    this.router.navigate(['login'])
    
  }
   handleLoginWithGoogle = () => {
    window.location.href = 'https://localhost:7041/api/Authentication/signin-google'
  }


}
