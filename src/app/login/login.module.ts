import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthenService } from '../core/services/authen.service';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { LoginRouters } from './login.router';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LoginRouters)
  ],
  providers: [AuthenService, NotificationService]
})
export class LoginModule { }
