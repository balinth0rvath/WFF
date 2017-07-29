import { Account } from './../../model/account.model';
import { AccountService } from './../../service/account.service';
import { Router } from '@angular/router';
import { AuthorizationService } from './../../authorization/authorization.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit, OnDestroy {

  introText: string;

  start = Date.now();

  today = Date.now();
  subscription: Subscription;

  constructor(private authenticationService: AuthorizationService,
    private router: Router,
    private accountService: AccountService) { }

  ngOnInit() {

    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['signin']);
    }

    this.subscription = this.accountService.myAccountFetched.subscribe(
      (a: Account) => {
        this.introText = a.introduction;
      }
    );

  }

  getIntro() {
    this.accountService.fetchMyAccount();
    let a: Account = this.accountService.getMyAccount();
    this.today = Date.now();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
