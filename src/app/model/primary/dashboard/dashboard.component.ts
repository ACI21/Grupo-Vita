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

export interface PeriodicElement {
  name: string;
  time: number;
  doctorName: number;
  symptoms: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [
    {time: 1, name: 'Hydrogen', doctorName: 1.0079, symptoms: 'H'},
    {time: 2, name: 'Helium', doctorName: 4.0026, symptoms: 'He'},
    {time: 3, name: 'Lithium', doctorName: 6.941, symptoms: 'Li'},
  {time: 4, name: 'Beryllium', doctorName: 9.0122, symptoms: 'Be'},
  {time: 5, name: 'Boron', doctorName: 10.811, symptoms: 'B'},
  {time: 6, name: 'Carbon', doctorName: 12.0107, symptoms: 'C'},
  {time: 7, name: 'Nitrogen', doctorName: 14.0067, symptoms: 'N'},
  {time: 8, name: 'Oxygen', doctorName: 15.9994, symptoms: 'O'},
  {time: 9, name: 'Fluorine', doctorName: 18.9984, symptoms: 'F'},
  {time: 10, name: 'Neon', doctorName: 20.1797, symptoms: 'Ne'},
  ];

  public user: any;
  public uid: string = "guess";
  public profession: string = "Doctor employee";
  public displayedColumns: string[] = ['time', 'name', 'doctorName', 'symptoms', 'action'];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  public clickedRows = new Set<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AuthFirebaseServiceService, private route: Router, private dialog: MatDialog)
  {  }

  ngOnInit(): void {
    this.userLog()
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

