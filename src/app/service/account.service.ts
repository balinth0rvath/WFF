import { Subject } from 'rxjs/Subject';
import { Account } from './../model/account.model';
import { AuthorizationService } from './../authorization/authorization.service';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable()
export class AccountService extends GenericService<Account> {

  resource = 'account';
  private resourceMyAccount = 'account/myAccount'
  
  myAccount: Account;
  myAccountFetched= new Subject<Account>();

  constructor(private authorizationService: AuthorizationService) {
    super(authorizationService);
  }

  getOne(id: number): Account {
    if (this.list == null)
      return null;
    return this.list.slice().find(x => x.id == id);
  }

  sortList() {
    let sortedList: Account[] = this.list.sort((a: Account, b: Account) => {
      if (a.fullName < b.fullName) {
        return -1;
      }

      if (a.fullName > b.fullName) {
        return 1;
      }
      return 0;
    });
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
