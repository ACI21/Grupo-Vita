// @Angular
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Firebase
import { provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { AuthFirebaseServiceService } from './service/firebase/auth-firebase-service.service';
// Angular
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Package Log
import { LoginComponent } from './model/log/login/login.component';
import { LogoutComponent } from './model/log/logout/logout.component';
// Package PopUp
import { AddDoctorsComponent } from './model/popup/add-doctors/add-doctors.component';
import { AddPatientsComponent } from './model/popup/add-patients/add-patients.component';
import { EditDoctorsComponent } from './model/popup/edit-doctors/edit-doctors.component';
import { EditPatientsComponent } from './model/popup/edit-patients/edit-patients.component';
// Package Primary
import { DashboardComponent } from './model/primary/dashboard/dashboard.component';
import { DoctorsComponent } from './model/primary/doctors/doctors.component';
import { PatientsComponent } from './model/primary/patients/patients.component';
import { ScheduleComponent } from './model/primary/schedule/schedule.component';
import { DoctorsDetailsComponent } from './model/primary/doctors-details/doctors-details.component';
// Materialge
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DoctorsComponent,
    PatientsComponent,
    ScheduleComponent,
    AddPatientsComponent,
    EditPatientsComponent,
    EditDoctorsComponent,
    AddDoctorsComponent,
    LoginComponent,
    LogoutComponent,
    DoctorsDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [AuthFirebaseServiceService],
  bootstrap: [AppComponent],
})
export class AppModule { }


