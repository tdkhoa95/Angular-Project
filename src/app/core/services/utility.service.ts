import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private _router: Router;
  constructor(router: Router, private http: HttpClient, private authenService: AuthenService) {
    this._router = router;
  }
  convertDateTime(date: Date) {
    var formartDate = new Date(date.toString());
    return formartDate.toDateString();
  }
  nagative(path: string) {
    this._router.navigate([path]);
  }
}
