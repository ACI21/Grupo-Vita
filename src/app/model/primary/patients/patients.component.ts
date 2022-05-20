import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseServiceService } from 'src/app/service/firebase/auth-firebase-service.service';
import { getDatabase, ref, child, get } from "firebase/database";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ShowPatientsComponent } from '../../popup/show-patients/show-patients.component';
import { AddPatientsComponent } from '../../popup/add-patients/add-patients.component';

export interface PatientHistory {
  id: number;
  name: string;
  surname: string;
  gender: string;
  bloodGroup: string;
  symptoms: string;
  mobile: string;
  email: string;
  dni: string;
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  ELEMENT_DATA: PatientHistory[] = [{ id: 0, name: 'null', surname: 'null', gender: 'null', bloodGroup: 'null', symptoms: 'null', mobile: 'null', email: 'null', dni: 'null' }];
  public user: any;
  public uid: string = "guess";
  public profession: string = "Doctor employee";
  public displayedColumns: string[] = ['id', 'name', 'surname', 'gender', 'bloodGroup', 'symptoms', 'mobile', 'email', 'dni'];
  public dataSource: any;
  public clickedRows = new Set<PatientHistory>();
  private size: number = 0;
  private arraySize: Array<number>[] = []
  //this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AuthFirebaseServiceService, private route: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userLog();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  userLog() {
    this.service.getInfoUsuarioLoggeado().subscribe((res) => {
      if (res != null) {
        this.user = res;
        this.uid = res.uid;
        this.trustRol();
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
    get(child(dbRef, `patients/`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.ELEMENT_DATA.pop();
        this.size = snapshot.size
        this.getPatients();
      }
      if (this.size === 0) {
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }
    }).catch((error: any) => {
      console.error(error);
    });
  };

  getPatients() {
    const dbRef = ref(getDatabase());
    console.log(this.size);var array2: Array<any> = [];
    for (let index = 0; index < this.size; index++) {
      get(child(dbRef, `patients/${index}/`)).then((snapshot) => {
        var array: Array<any> = [];

        if (snapshot.exists()) {
          array = this.json2array(snapshot.val());

          let name: string = array[0].name;
          let surname: string = array[0].surname;
          let gender: string = array[0].gender;
          let blood: string = array[0].blood;
          let symptoms: string = array[0].symptoms;
          let mobile: string = array[0].mobile;
          let email: string = array[0].email;
          let dni: string = array[0].dni;
          array2[index] = {id: index, name: name, surname: surname,  gender: gender, bloodGroup: blood,
            symptoms: symptoms, mobile: mobile, email: email, dni: dni};
          //console.log(array2);
          this.dataSource = new MatTableDataSource(array2);
        }
      }).catch((error: any) => {
        console.error(error);
      });
    }
  };

  json2array(json: any){
    var result: any[] = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
    result.push(json[key]);
    });
    return result;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addPatient() {
    this.dialog.open(AddPatientsComponent);
  }

  showPatient() {
    this.dialog.open(ShowPatientsComponent);
  }
}
