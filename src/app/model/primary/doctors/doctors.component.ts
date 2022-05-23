import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { ref, getDatabase, get, child, remove } from 'firebase/database';
import { AuthFirebaseServiceService } from 'src/app/service/firebase/auth-firebase-service.service';
import { AddDoctorsComponent } from '../../popup/add-doctors/add-doctors.component';
import { DeleteDateComponent } from '../../popup/delete-date/delete-date.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion = new MatAccordion;
  public user: any;
  public uid: string = 'guess';
  public profession: string = 'Doctor employee';
  public dataSource1: Array<any> = [];
  public dataSource2: Array<any> = [];
  public dataSource3: Array<any> = [];
  public dataSource4: Array<any> = [];
  public dataSource5: Array<any> = [];
  public size: number = 0;
  constructor(private service: AuthFirebaseServiceService, private route: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userLog();
  }

  userLog() {
    this.service.getInfoUsuarioLoggeado().subscribe((res) => {
      if (res != null) {
        this.user = res;
        this.uid = res.uid;
        //this.trustRol();
        this.checkSize();
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
        let value = snapshot.val()
        if (value == this.uid) {
          this.profession = 'Administrative'
        }
      } else {
        this.profession = 'Doctor employee'
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  checkSize() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `doctors/`)).then((snapshot) => {
      if (snapshot.exists()) {
        //this.ELEMENT_DATA.pop();
        //console.log(snapshot.val())
        this.size = snapshot.size
        this.getDoctors();
      }
      if (this.size === 0) {
        //this.dataSource = new MatCardModule(this.ELEMENT_DATA);
      }
    }).catch((error: any) => {
      console.error(error);
    });
  };

  getDoctors() {
    const dbRef = ref(getDatabase());
    var array2: Array<any> = [];
    let count1: number = this.dataSource1.length;
    let count2: number = this.dataSource2.length;
    let count3: number = this.dataSource3.length;
    let count4: number = this.dataSource4.length;
    let count5: number = this.dataSource5.length;
    for (let index = 0; index < this.size; index++) {
      get(child(dbRef, `doctors/`)).then((snapshot) => {
        var array: Array<any> = [];

        if (snapshot.exists()) {
          array = this.json2array(snapshot.val());

          let id: number = array[index].id;
          let name: string = array[index].name;
          let surname: string = array[index].surname;
          let gender: string = array[index].gender;
          let department: string = array[index].department;
          let education: string = array[index].education;
          let mobile: string = array[index].mobile;
          let email: string = array[index].email;
          let dni: string = array[index].dni;
          let experience: string = array[index].experience;
          let designation: string = array[index].designation;

          array2[index] = {
            id: id, name: name, surname: surname, gender: gender, department: department,
            education: education, mobile: mobile, email: email, dni: dni, experience: experience, designation: designation
          };

          switch (department) {
            case 'Physiotherapy':
              this.dataSource1[count1] = array2[index];
              count1++;
              break;

            case 'Chiropody':
              this.dataSource2[count2] = array2[index];
              count2++;
              break;

            case 'Psicology':
              this.dataSource3[count3] = array2[index];
              count3++;
              break;

            case 'Chiropractor':
              this.dataSource4[count4] = array2[index];
              count4++;
              break;

            case 'General Practitioner':
              this.dataSource5[count5] = array2[index];
              count5++;
              break;
          }
        }
      }).catch((error: any) => {
        console.error(error);
      });
    }
  };

  json2array(json: any) {
    var result: any[] = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
      result.push(json[key]);
    });
    return result;
  }

  addDoctor() {
    this.dialog.open(AddDoctorsComponent);
  }

  deleteDoctor(id: string){
    const dialogRef = this.dialog.open(DeleteDateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const db = getDatabase();
        remove(ref(db, `doctors/${id}`));
        this.checkSize();
      }
    });
  }

}
