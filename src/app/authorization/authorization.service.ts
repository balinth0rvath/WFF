import { Config } from './../config/config';
import { Account } from './../model/account.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthorizationService {

  access_token: string;
  refresh_token: string;

  authenticated: Subject<boolean>=new Subject<boolean>();

  a: Account;

  constructor(private http: Http) { }

  isAuthenticated() {
    return this.refresh_token != null;
  }

  getRefreshToken(username: string, password: string) {
    let param = new URLSearchParams();
    param.append('username', username);
    param.append('password', password);
    param.append('grant_type', 'password');


    let headers = new Headers(
      {
        'credentials': 'true',
        'Content-type': Config.contentType,
        'Authorization': Config.authType + Config.clientCreds
      });
    let options = new RequestOptions({ headers: headers });
    
    this.http.post(Config.tokenUrl, param.toString(), options)
      .map(res => res.json())
      .subscribe(
      data => this.save(data),
      err =>  this.authenticated.next(false)
    );

  }

  save(data) {

    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;
    this.authenticated.next(true);
  }

  getData<T>(resourceName:string) {
    var headers = new Headers({
      'Content-type': Config.contentType,
      'Authorization': 'Bearer ' + this.access_token
    });

    var options = new RequestOptions({ headers: headers });
    console.log(this.access_token);
    return this.http.get(Config.baseUrl+resourceName, options)
      .map((res: Response) => {
        let t: T = res.json();
        return t;
      });
      ;

  }
  
  logout() {
    this.access_token = null;
    this.refresh_token = null;
    this.authenticated.next(false);
  }
}
