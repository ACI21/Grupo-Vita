import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthFirebaseServiceService } from './service/firebase/auth-firebase-service.service';
import { Router } from '@angular/router';
import { ref, getDatabase, get, child, push } from 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Grupo-Vita';
  public user: any;
  public uid: string = "guess";
  public profession: string = "Doctor employee";
  public userName: any;
  public userName3: any[] | any;
  public userName2: any;
  public userPhoto: any;
  public loginPageCheck: boolean = true;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private service: AuthFirebaseServiceService,
    private route: Router) { }

  ngOnInit(): void {
    this.userLog()
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  userLog() {
    this.service.getInfoUsuarioLoggeado().subscribe((res) => {
      if (res != null) {
        this.user = res;
        this.uid = res.uid;
        this.userName = res.displayName;
        this.userPhoto = res.photoURL
        if (!res.displayName) {
          this.userName3 = res.email?.split('@');
          this.userName2 = this.userName3[0];
        }
        this.trustRol()
      } else {
        this.uid = "guess";
      }
      if (this.uid === "guess") {
        this.route.navigate(['login']);
      }
      console.log('uid: ' + this.uid)
    });
  }

  trustRol() {
    const dbRef = ref(getDatabase());
      get(child(dbRef, `Rol/Administrative`)).then((snapshot) => {
        if (snapshot.exists()) {
          let value = snapshot.val()
          if(value == this.uid){
            this.profession = 'Administrative'
          }
        } else {
          this.profession = 'Doctor employee'
        }
      }).catch((error) => {
        console.error(error);
      });
  }
}
