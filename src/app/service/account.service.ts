import { Account } from './../model/account.model';
import { AuthorizationService } from './../authorization/authorization.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

  private resource = 'account';
  private resourceMyAccount = 'account/myAccount'
  accountList: Account[];
  myAccount: Account;
  constructor(private authorizationService: AuthorizationService) { }

  getAccounts(): Account[] {
    return this.accountList.slice();
  }

  fetchAccounts() {
    this.authorizationService.getData<Account[]>(this.resource)
      .subscribe((accountList: Account[]) => {
        this.accountList = accountList;
      },
      () => { console.log('error fetching accounts') });
  }

  fetchMyAccount() {
    this.authorizationService.getData<Account>(this.resourceMyAccount)
      .subscribe((account: Account) => { this.myAccount = account },
      () => { console.log('error fetching account') });
  }

  getMyAccount() {
    return this.myAccount;
  }
}
