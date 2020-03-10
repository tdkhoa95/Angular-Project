import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRouters } from './main.router';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MainRouters)
  ], providers: [AuthenService, UtilityService]
})
export class MainModule { }
