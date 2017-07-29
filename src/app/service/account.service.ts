import { Subject } from 'rxjs/Subject';
import { Account } from './../model/account.model';
import { AuthorizationService } from './../authorization/authorization.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

  private resource = 'account';
  private resourceMyAccount = 'account/myAccount'
  accountList: Account[];
  myAccount: Account;
  myAccountFetched= new Subject<Account>();
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
      .subscribe((account: Account) => { 
        this.myAccountFetched.next(account); 
         },
      (err:Response) => { 
        if (err.status === 401) {
          console.log("invalid access token. trying to fetch new");
          this.authorizationService.getAccessToken();
        }
       });
  }

  getMyAccount() {
    return this.myAccount;
  }
}
