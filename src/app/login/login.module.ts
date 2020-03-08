import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthenService } from '../core/services/authen.service';
import { Routes, RouterModule } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
export const routes: Routes = [
  //localhost:4200/login
  { path: '', component: LoginComponent }
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthenService, NotificationService]
})
export class LoginModule { }
