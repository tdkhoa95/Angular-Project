import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRouters } from './main.router';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MainRouters)
  ]
})
export class MainModule { }
