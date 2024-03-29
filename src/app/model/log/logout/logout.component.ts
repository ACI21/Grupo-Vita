import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDatabase, push, ref, remove } from 'firebase/database';
import { AuthFirebaseServiceService } from 'src/app/service/firebase/auth-firebase-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private service : AuthFirebaseServiceService, private router : Router) { }

  ngOnInit(): void {
    this.service.logOut();
    this.router.navigate(['login']);
  }
}
