import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { child, get, getDatabase, push, ref } from 'firebase/database';

@Component({
  selector: 'app-add-patients',
  templateUrl: './add-patients.component.html',
  styleUrls: ['./add-patients.component.scss']
})
export class AddPatientsComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  surname = new FormControl('', [Validators.required, Validators.minLength(3)]);
  gender = new FormControl('', [Validators.required]);
  blood = new FormControl('', [Validators.required]);
  symptoms = new FormControl('', [Validators.required]);
  mobile = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
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

  pushPatient() {
    if (this.name.hasError('required') || this.surname.hasError('required')
      || this.gender.hasError('required') || this.blood.hasError('required')
      || this.symptoms.hasError('required') || this.mobile.hasError('required')
      || this.email.hasError('required')) {
      return 'You must enter a value';
    } else {
      return this.addFirebasePatient();
    }
  }

  checkID() {
    const dbRef = ref(getDatabase());
    var result: any;
    get(child(dbRef, `count/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log('firebase: ' )
        console.log(snapshot.val())
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
    push(ref(dbRef, `count/`), {
      idCount: this.id,
    });
  }

  checkSize() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `patients/`)).then((snapshot) => {
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

  addFirebasePatient() {
    const db = getDatabase();
    push(ref(db, `patients/${this.id}/`), {
      id: this.id,
      name: this.name.value,
      surname: this.surname.value,
      gender: this.gender.value,
      blood: this.blood.value,
      symptoms: this.symptoms.value,
      mobile: this.mobile.value,
      email: this.email.value,
      dni: this.dni.value
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
