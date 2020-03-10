import { Component, OnInit } from '@angular/core';
import { SystemConstants } from '../core/constants/system.constants';
import { UtilityService } from '../core/services/utility.service';
import { UrlConstants } from '../core/constants/url.constants';
import { LoginUser } from '../core/domain/login.user';
import { AuthenService } from '../core/services/authen.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: LoginUser;
  constructor(private _utilityService: UtilityService, authenService: AuthenService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this._utilityService.nagative(UrlConstants.LOGIN);
  }
}
