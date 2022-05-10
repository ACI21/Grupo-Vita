import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './model/log/login/login.component';
import { LogoutComponent } from './model/log/logout/logout.component';
import { AddDoctorsComponent } from './model/popup/add-doctors/add-doctors.component';
import { AddPatientsComponent } from './model/popup/add-patients/add-patients.component';
import { EditDoctorsComponent } from './model/popup/edit-doctors/edit-doctors.component';
import { EditPatientsComponent } from './model/popup/edit-patients/edit-patients.component';
import { DashboardComponent } from './model/primary/dashboard/dashboard.component';
import { DoctorsComponent } from './model/primary/doctors/doctors.component';
import { PatientsComponent } from './model/primary/patients/patients.component';
import { ScheduleComponent } from './model/primary/schedule/schedule.component';
import { AuthFirebaseServiceService } from './service/firebase/auth-firebase-service.service';

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
    LogoutComponent
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
  ],
  providers: [AuthFirebaseServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }


