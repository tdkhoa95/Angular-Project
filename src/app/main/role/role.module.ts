import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

export const RoleRouters: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: RoleComponent }
]

@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(RoleRouters),
    PaginationModule
  ], providers: [DataService, NotificationService]
})
export class RoleModule { }
