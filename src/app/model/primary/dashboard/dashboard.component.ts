import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseServiceService } from 'src/app/service/firebase/auth-firebase-service.service';
import { getDatabase, ref, child, get } from "firebase/database";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ShowPatientsComponent } from '../../popup/show-patients/show-patients.component';
import { ShowDoctorsComponent } from '../../popup/show-doctors/show-doctors.component';
import { AppComponent } from '../../../app.component';

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
  ELEMENT_DATA: PeriodicElement[] = [
    {time: 1, name: 'Hydrogen', doctorName: 'Alvaro', symptoms: 'Hydrogen'},
    {time: 2, name: 'Helium', doctorName: 'Juan', symptoms: 'Helium'},
    {time: 3, name: 'Lithium', doctorName: 'Lucia', symptoms: 'Lithium'},
    {time: 4, name: 'Beryllium', doctorName: 'Alvaro', symptoms: 'Beryllium'},
    {time: 5, name: 'Boron', doctorName: 'Juan', symptoms: 'Much work'},
    {time: 6, name: 'Carbon', doctorName: 'Lucia', symptoms: 'something'},
    {time: 7, name: 'Nitrogen', doctorName: 'Alvaro', symptoms: 'something'},
    {time: 8, name: 'Oxygen', doctorName: 'Juan', symptoms: 'something'},
    {time: 9, name: 'Fluorine', doctorName: 'Lucia', symptoms: 'something'},
    {time: 10, name: 'Neon', doctorName: 'Alvaro', symptoms: 'something'},
  ];

  public user: any;
  public uid: string = "guess";
  public profession: string = "Doctor employee";
  public displayedColumns: string[] = ['time', 'name', 'doctorName', 'symptoms', 'action'];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  public clickedRows = new Set<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AuthFirebaseServiceService, private route: Router, private dialog: MatDialog,
    private sidebar: AppComponent)
  {  }

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

