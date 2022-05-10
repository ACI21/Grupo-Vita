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
  }

  logIn():void{
    var email = this.email.nativeElement.value;
    var contra = this.password.nativeElement.value;
    this.auth.login(email, contra).then(res=> {
      console.log(res);
      this.router.navigate(['']);
    });
  }

  logInGoogle():void{
    this.auth.loginGoogle().then(res=>{
      console.log(res);
      this.router.navigate(['']);
    });
  }
}
