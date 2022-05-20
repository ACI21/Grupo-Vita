// @Angular
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ShowPatientsComponent } from './model/popup/show-patients/show-patients.component';
import { ShowDoctorsComponent } from './model/popup/show-doctors/show-doctors.component';
// Package Primary
import { DashboardComponent } from './model/primary/dashboard/dashboard.component';
import { DoctorsComponent } from './model/primary/doctors/doctors.component';
import { PatientsComponent } from './model/primary/patients/patients.component';
import { ScheduleComponent } from './model/primary/schedule/schedule.component';
import { DoctorsDetailsComponent } from './model/primary/doctors-details/doctors-details.component';
// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


//Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


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
    ShowPatientsComponent,
    ShowDoctorsComponent,
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
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [AuthFirebaseServiceService],
  bootstrap: [AppComponent],
})
export class AppModule { }


