import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseServiceService } from 'src/app/service/firebase/auth-firebase-service.service';
import { getDatabase, ref, child, get } from "firebase/database";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public user: any;
  public uid: string = "guess";

  constructor(private service: AuthFirebaseServiceService, private route: Router) { }

  ngOnInit(): void {
    this.userLog()
  }

  userLog() {
    this.service.getInfoUsuarioLoggeado().subscribe((res) => {
      if (res != null) {
        this.user = res;
        this.uid = res.uid;
        console.log(this.user)
        console.log(this.uid)
        this.trustRol();
      } else {
        this.uid = "guess";
      }
      if (this.uid === "guess") {
        this.route.navigate(['login']);
      }
    });
  }

  trustRol() {
    const dbRef = ref(getDatabase());
      get(child(dbRef, `Rol/Administrative`)).then((snapshot) => {
        if (snapshot.exists()) {

        } else {

        }
      }).catch((error) => {
        console.error(error);
      });
  }
}

