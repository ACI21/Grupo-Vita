import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ref, getDatabase, get, child, orderByKey, remove } from 'firebase/database';
import { AuthFirebaseServiceService } from 'src/app/service/firebase/auth-firebase-service.service';
import { AddDateComponent } from '../../popup/add-date/add-date.component';
import { DeleteDateComponent } from '../../popup/delete-date/delete-date.component';
import { ShowDoctorsComponent } from '../../popup/show-doctors/show-doctors.component';
import { ShowPatientsComponent } from '../../popup/show-patients/show-patients.component';

export interface PeriodicElement {
  name: string;
  time: number;
  doctorName: string;
  symptoms: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit {
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
        if (snapshot.exists()) {
          array = this.json2array(snapshot.val());

          let cid: string = array[index].cid;
          let dni: string = array[index].dniCita;
          let fecha: string = array[index].fechaBarras;
          let horaCita: string = array[index].horaCita;
          let servicioCita: string = array[index].servicioCita;

          array2[index] = {cid: cid, dni: dni, date: fecha, dateTime: horaCita, service: servicioCita};

          if(this.dateMonth < 10){
            this.fullDate = this.dateDay+'/0'+this.dateMonth+'/'+this.dateYear;

            if(this.fullDate === fecha){
              this.appointmentsToday++;
              array2.sort()
              this.dataSource = new MatTableDataSource(array2);
            }else{
              this.dataSource = new MatTableDataSource(array2);
            }

          }else{
            this.fullDate = this.dateDay+'/0'+this.dateMonth+'/'+this.dateYear;
            if(this.fullDate === fecha){
              this.dataSource = new MatTableDataSource(array2);
            }else{
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

  addAppointment(){
    this.dialog.open(AddDateComponent)
  }

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

  showPatient(dni: string) {
    this.dialog.open(ShowPatientsComponent);
  }

  showDoctor() {
    this.dialog.open(ShowDoctorsComponent);
  }

  deleteAppointment(cid: string){
    const dialogRef = this.dialog.open(DeleteDateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const db = getDatabase();
        remove(ref(db, `citas/${cid}`));
        this.checkSize();
      }
    });
  }
}
