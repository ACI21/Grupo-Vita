import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ref, getDatabase, get, child } from "firebase/database";
import { PatientRecord } from "src/app/interface/PatientRecord";
import { AuthFirebaseServiceService } from "src/app/service/firebase/auth-firebase-service.service";
import { AddPatientsComponent } from "../../popup/add-patients/add-patients.component";

export interface ShowUID {
  uid: string;
  animal: string;
}


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  public ELEMENT_DATA: PatientRecord[] = [{ uid: 'null', name: 'null', surname: 'null', gender: 'null', bloodGroup: 'null',
  symptoms: 'null', mobile: 'null', email: 'null', dni: 'null', medicine: 'null', address: 'null' }];
  public user: any;
  public show: boolean = false;
  public uid: string = "guess";
  public uid2: string = "patient";
  public animal: string = "patient";
  public profession: string = "Doctor employee";
  public displayedColumns: string[] = ['name', 'surname', 'gender', 'bloodGroup', 'symptoms', 'mobile', 'email', 'dni'];
  public dataSource: any;
  public clickedRows = new Set<PatientRecord>();
  private size: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AuthFirebaseServiceService, private route: Router, private dialog: MatDialog) { }

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
    get(child(dbRef, `Users/`)).then((snapshot) => {
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
    var array2: Array<any> = [];
    for (let index = 0; index < this.size; index++) {
      get(child(dbRef, `Users/`)).then((snapshot) => {
        var array: Array<any> = [];

        if (snapshot.exists()) {
          array = this.json2array(snapshot.val());

          let uid: string = array[index].uid;
          let name: string = array[index].name;
          let surname: string = array[index].surname;
          let gender: string = array[index].gender;
          let blood: string = array[index].blood;
          let symptoms: string = array[index].symptoms;
          let mobile: string = array[index].mobile;
          let email: string = array[index].email;
          let dni: string = array[index].dni;
          let medicine: string = array[index].medicine;
          let address: string = array[index].address;

          array2[index] = {uid: uid, name: name, surname: surname,  gender: gender, bloodGroup: blood,
            symptoms: symptoms, mobile: mobile, email: email, dni: dni, medicine: medicine, address: address};
            console.log(array2);
          this.dataSource = new MatTableDataSource(array2);
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

  addPatient() {
    this.dialog.open(AddPatientsComponent);
  }

  showPatient(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.uid2, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'show-patients',
  templateUrl: 'show-patients.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ShowUID,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
