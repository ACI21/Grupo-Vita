import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseServiceService } from '../../../service/firebase/auth-firebase-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("email") email! : ElementRef;
  @ViewChild("password") password! : ElementRef;

  constructor(private auth : AuthFirebaseServiceService, private router: Router) { }

  ngOnInit(): void {
    this.logOut();
    location.reload();
  }

  logOut(){
    this.auth.logOut();
    this.router.navigate(['login']);
    location.reload();
  }

  logIn(email: string, pass: string):void{
    email = email.trim();
    if(email.length > 10 && pass.length >= 6){
      this.auth.login(email, pass).then(res=> {
        console.log(res);
        this.router.navigate(['']);
      });
    }

  }

  logInGoogle():void{
    this.auth.loginGoogle().then(res=>{
      console.log(res);
      if(res != null){
        this.router.navigate(['']);
      }
    });
  }
}
