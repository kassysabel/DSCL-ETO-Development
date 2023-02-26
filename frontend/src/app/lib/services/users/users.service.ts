import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { IUser } from './users-interface';
import { CookieService } from '../storage/cookie.service';
import { BehaviorSubject } from 'rxjs';

const USERS_ENDPOINT = `${environment.API}/users`;
const AUTH_ENDPOINT = `${environment.API}/auth`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isUserLoggedIn: BehaviorSubject <boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private http:HttpClient,
    private cookieService: CookieService
  ) { }

  getUsers() {
    return this.http.get<IUser[]>(`${USERS_ENDPOINT}`);
  }

  getUser(userId : string) {
    return this.http.get<IUser>(`${USERS_ENDPOINT}/${userId}`);
  }

  login(params:{}) {
    return this.http.post(`${AUTH_ENDPOINT}/login`,{ ...params });
  }

  isLoggedIn() {
    return this.cookieService.get('userToken') ? true : false;
  }

  updateLogInState() {
    this.isUserLoggedIn.next(this.isLoggedIn());
  }

}
