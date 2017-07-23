import { Router } from '@angular/router';
import { Account } from './../../model/account.model';
import { AuthorizationService } from './../authorization.service';
import { AccountService } from './../../service/account.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginFailed:boolean = false;

  constructor(private accountService: AccountService,
              private authorizationService: AuthorizationService,
              private router: Router) { }

  ngOnInit() {
    this.authorizationService.authenticated.subscribe(
      (authenticated:boolean)=>{ 
        this.loginFailed = !authenticated; 
        if (!this.loginFailed) {
          this.router.navigate(['home'])
        } 
        
      },
      (authenticated:boolean)=>{
        console.log("failed");  
      }
    );
    
  }

  onLogin(loginForm: NgForm) {
    let email = loginForm.value.email;
    let password = loginForm.value.password;
    this.authorizationService.getRefreshToken(email, password);
    console.log('wot');
    //this.authorizationService.isAuthenticated()
      
      
    
  }


  fetchAccounts() {
    this.accountService.fetchMyAccount();
    console.log('after fetch');
  }

  getAccounts() {
    let a: Account = this.accountService.getMyAccount();
    console.log(a.fullName);
    console.log('after get');
  }

  isLoginFailed() {
    return this.loginFailed;
  }
}
