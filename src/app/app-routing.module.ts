import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './model/log/login/login.component';
import { LogoutComponent } from './model/log/logout/logout.component';
import { DashboardComponent } from './model/primary/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    //login
    path:'login',
    component: LoginComponent
  },
  {
    //logOut
    path: 'logout',
    component: LogoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
