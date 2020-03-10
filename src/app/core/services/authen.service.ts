import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstants } from '../constants/system.constants';
import { LoginUser } from '../domain/login.user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  // Constructor
  constructor(private _http: HttpClient) { }

  // Login method
  login(userName: string, password: string) {
    let header = new HttpHeaders()
    header.set('Content-Type', 'application/x-www-form-urlencoded');
    let body = 'username=' + encodeURIComponent(userName) + '&password=' + encodeURIComponent(password) + '&grant_type=password';
    let promise = new Promise((resolve, reject) => {
      this._http.post(environment.BASE_API + '/api/oauth/token', body, { headers: header })
        .subscribe((response: any) => {
          const user: LoginUser = response;
          if (user && user.access_token) {
            // Set local storage
            localStorage.removeItem(SystemConstants.CURRENT_USER);
            localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
            resolve(true);
          }
          else {
            reject(false);
          }
        }, error => {
          reject(error);
        });
    });
    return promise;
  }
  // Logout
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  // Check authentication
  isAuthentication(): boolean {
    if (localStorage.getItem(SystemConstants.CURRENT_USER) != null) {
      return true;
    } else {
      return false;
    }
  }
  // Get user loggin
  getLoginUser(): any {
    let user: LoginUser;
    if (this.isAuthentication()) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoginUser(userData.access_token, userData.userName, userData.password, userData.fullname, userData.email, userData.avatar);
    } else {
      user = null;
    }
    return user;
  }
  // Check roles access system
  checkAssess(functionId: string) {
    var user = this.getLoginUser();
    var result: boolean = false;
    var permission: any[] = JSON.parse(user.permission);
    var roles: any[] = JSON.parse(user.roles);
    var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanRead == true);
    if (hasPermission != -1 || roles.findIndex(x => x == 'Admin') != -1) {
      return true;
    } else {
      return false;
    }
  }
  // Get permission for Function and action
  hasPermission(functionId: string, action: string): boolean {
    var user = this.getLoginUser();
    var result: boolean = false;
    var permission: any[] = JSON.parse(user.permission);
    var roles: any[] = JSON.parse(user.roles);
    switch (action) {
      case 'Create':
        var hasPermission: number = permission.findIndex(x => x.functionId == functionId && x.CanCreate == true);
        if (hasPermission != -1 || roles.findIndex(x => x == 'Admin') != -1) {
          result = true;
        }
        break;
      case 'Update':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanUpdate == true);
        if (hasPermission != -1 || roles.findIndex(x => x == 'Admin') != -1) {
          result = true;
        }
        break;
      case 'Delete':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanDelete == true);
        if (hasPermission != -1 || roles.findIndex(x => x == 'Admin') != -1) {
          result = true;
        }
        break;
    }
    return result;
  }
}
