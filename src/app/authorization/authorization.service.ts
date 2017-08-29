import { Config } from './../config/config';
import { Account } from './../model/account.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthorizationService {

  access_token: string;
  refresh_token: string;
  
  authenticated: Subject<boolean>=new Subject<boolean>();

  constructor(private http: Http) { }

  isAuthenticated() {
    let authenticated=false;
    console.log(this.access_token);
    if (this.access_token==null) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser!=null && currentUser.token!=null) {
        this.access_token = currentUser.token;
      }
    }
    
    
    return this.access_token != null;
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
    console.log("abc:" + Config.authType + Config.clientCreds);
    this.http.post(Config.tokenUrl, param.toString(), options)
      .map(res => res.json())
      .subscribe(
      data => this.save(data),
      err =>  this.authenticated.next(false)
    );

  }

  getAccessToken() {
    let param = new URLSearchParams();
    param.append('refresh_token', this.refresh_token);
    param.append('grant_type', 'refresh_token');

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
      data => this.saveAccessToken(data),
      err =>  this.authenticated.next(false)
    );

  }

  save(data) {

    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;
    localStorage.setItem('currentUser', 
      JSON.stringify({ token: this.access_token, name: name }));
    this.authenticated.next(true);
  }

  saveAccessToken(data) {
    this.access_token = data.access_token;
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
      },
      (err:Error)=>{console.log("Hiba:"+err)});
      ;

  }
  
  logout() {
    this.access_token = null;
    this.refresh_token = null;
    localStorage.removeItem('currentUser');
    this.authenticated.next(false);

  }
}
