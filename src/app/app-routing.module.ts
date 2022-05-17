import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './model/log/login/login.component';
import { LogoutComponent } from './model/log/logout/logout.component';
import { DashboardComponent } from './model/primary/dashboard/dashboard.component';
import { DoctorsDetailsComponent } from './model/primary/doctors-details/doctors-details.component';
import { DoctorsComponent } from './model/primary/doctors/doctors.component';
import { PatientsComponent } from './model/primary/patients/patients.component';
import { ScheduleComponent } from './model/primary/schedule/schedule.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'doctors',
    component: DoctorsComponent
  },
  {
    path: 'patients',
    component: PatientsComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'doctors/:id',
    component: DoctorsDetailsComponent
  },
  {
    //login
    path: 'login',
    component: LoginComponent
  },
  {
    //logOut
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'sidebar',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
