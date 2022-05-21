import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ref, getDatabase, get, child, push, update } from 'firebase/database';

@Component({
  selector: 'app-add-doctors',
  templateUrl: './add-doctors.component.html',
  styleUrls: ['./add-doctors.component.scss']
})
export class AddDoctorsComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    surname = new FormControl('', [Validators.required, Validators.minLength(3)]);
    gender = new FormControl('', [Validators.required]);
    department = new FormControl('', [Validators.required]);
    education = new FormControl('', [Validators.required]);
    mobile = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
    experience = new FormControl('', [Validators.required, Validators.minLength(1)]);
    designation= new FormControl('', [Validators.required, Validators.minLength(1)]);
    dni = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
    id: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.checkID();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('value') ? 'Not a valid value' : '';
  }

  pushDoctor() {
    if (this.name.hasError('required') || this.surname.hasError('required')
      || this.gender.hasError('required') || this.department.hasError('required')
      || this.education.hasError('required') || this.mobile.hasError('required')
      || this.email.hasError('required') || this.experience.hasError('required')
      || this.designation.hasError('required')) {

      return 'You must enter a value';
    } else {
      return this.addFirebaseDoctor();
    }
  }

  checkID() {
    const dbRef = ref(getDatabase());
    var result: any;
    get(child(dbRef, `countDoctor/`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.checkSize();
        result = this.json2array(snapshot.val());
        this.id = result[0].idCount;
      }else{
        this.checkSize();
      }
      console.log();
    }).catch((error: any) => {
      console.error(error);
    });
  };

  createID(){
    const dbRef = getDatabase();
    update(ref(dbRef, `countDoctor/`), {
      idCount: this.id,
    });
  }

  checkSize() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `doctors/`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.id = snapshot.size
        this.createID();
      }else{
        this.createID();
      }
    }).catch((error: any) => {
      console.error(error);
    });
  };

  addFirebaseDoctor() {
    const db = getDatabase();
    push(ref(db, `doctors/`), {
      id: this.id,
      name: this.name.value,
      surname: this.surname.value,
      gender: this.gender.value,
      department: this.department.value,
      designation: this.designation.value,
      mobile: this.mobile.value,
      email: this.email.value,
      dni: this.dni.value,
      experience: this.experience.value,
      education: this.education.value,
    });
    location.reload();
  }

  json2array(json: any){
    var result: any[] = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
    result.push(json[key]);
    });
    return result;
  }
}
