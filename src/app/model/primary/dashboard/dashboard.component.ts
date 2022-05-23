import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseServiceService } from 'src/app/service/firebase/auth-firebase-service.service';
import { getDatabase, ref, child, get, query, orderByChild, orderByKey } from "firebase/database";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ShowPatientsComponent } from '../../popup/show-patients/show-patients.component';
import { ShowDoctorsComponent } from '../../popup/show-doctors/show-doctors.component';

export interface PeriodicElement {
  name: string;
  time: number;
  doctorName: string;
  symptoms: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public user: any;
  public uid: string = "guess";
  public profession: string = "Doctor employee";
  public displayedColumns: string[] = ['date','dateTime', 'dni', 'service', 'action'];
  public dataSource: any;
  private size: number = 0;
  public clickedRows = new Set<PeriodicElement>();

  public appointmentsToday: number = 0;
  public appointmentsTotal: number = 0;

  private dateDay = new Date().getDate();
  private dateMonth = new Date().getMonth()+1;
  private dateYear = new Date().getFullYear();
  private fullDate = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AuthFirebaseServiceService, private route: Router, private dialog: MatDialog)
  {  }

  ngOnInit(): void {
    this.userLog();
    var dateDay = new Date().getDay();
    console.log(dateDay)
  }

  refreshPaginator() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    get(child(dbRef, `citas/`)).then((snapshot) => {
      if (snapshot.exists()) {
        //this.ELEMENT_DATA.pop();
        this.size = snapshot.size
        this.appointmentsTotal = this.size;
        this.getAppointments();
      }
      if (this.size === 0) {
        //this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }
    }).catch((error: any) => {
      console.error(error);
    });
  };

  getAppointments() {
    const dbRef = ref(getDatabase());
    var array2: Array<any> = [];
    for (let index = 0; index < this.size; index++) {
      get(child(dbRef, `citas/`)).then((snapshot) => {
        var array: Array<any> = [];
        var q;
        if (snapshot.exists()) {
          console.log(q = query(dbRef, orderByKey()))
          array = this.json2array(snapshot.val());

          let dni: string = array[index].dniCita;
          let fecha: string = array[index].fechaBarras;
          let horaCita: string = array[index].horaCita;
          let servicioCita: string = array[index].servicioCita;

          array2[index] = {dni: dni, date: fecha, dateTime: horaCita, service: servicioCita};

          if(this.dateMonth < 10){
            this.fullDate = this.dateDay+'/0'+this.dateMonth+'/'+this.dateYear;

            if(this.fullDate === fecha){
              this.appointmentsToday++;
              array2.sort()
              this.dataSource = new MatTableDataSource(array2);
            }

          }else{
            this.fullDate = this.dateDay+'/0'+this.dateMonth+'/'+this.dateYear;
            if(this.fullDate === fecha){
              this.dataSource = new MatTableDataSource(array2);
            }
          }
          this.refreshPaginator();
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

  showPatient() {
    this.dialog.open(ShowPatientsComponent);
  }
  showDoctor() {
    this.dialog.open(ShowDoctorsComponent);
  }
}

