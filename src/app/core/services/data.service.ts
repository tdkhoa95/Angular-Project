import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenService } from './authen.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { SystemConstants } from '../constants/system.constants';
import { MessageContstants } from '../constants/message.constants';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService {
  private headers = new HttpHeaders();
  constructor(private _http: HttpClient, private _authService: AuthenService,
    private _notificationSerivce: NotificationService, private _utilityService: UtilityService) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Authorization', 'Bearer' + _authService.getLoginUser().access_token);
  }

  get(uri: string) {
    return this._http.get(environment.BASE_API + uri, { headers: this.headers }).pipe(catchError(this.handleError));
  }
  post(uri: string, data?: any) {
    return this._http.post(environment.BASE_API + uri, data, { headers: this.headers }).pipe(catchError(this.handleError));
  }
  put(uri: string, data?: any) {
    return this._http.put(environment.BASE_API + uri, data, { headers: this.headers }).pipe(catchError(this.handleError));
  }
  delete(uri: string, key: string, id: string) {
    return this._http.delete(environment.BASE_API + uri + "/?" + key + "=" + id, { headers: this.headers }).pipe(catchError(this.handleError));
  }
  deleteMultipleParams(uri: string, params) {
    var paramsStr: string = '';
    for (let param in params) {
      paramsStr += param + "=" + params[param] + '&';
    }
    return this._http.delete(environment.BASE_API + uri + "/?" + paramsStr, { headers: this.headers }).pipe(catchError(this.handleError));
  }
  postFile(uri: string, data: any) {
    let newHeader = new HttpHeaders();
    newHeader.set("Authorization", "Bearer" + this._authService.getLoginUser().access_token);
    return this._http.post(environment.BASE_API + uri, data, { headers: newHeader }).pipe(catchError(this.handleError));
  }
  public handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationSerivce.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
    }
    else if (error == 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationSerivce.printErrorMessage(MessageContstants.FORBIDDEN);
    }
    else {
      let message = JSON.parse(error._body).Message;
      this._notificationSerivce.printErrorMessage(message);
      return Observable.throw(message);
    }
  }
}
