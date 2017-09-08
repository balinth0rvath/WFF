import { Group } from './../model/group.model';
import { Subject } from 'rxjs/Subject';
import { Account } from './../model/account.model';
import { AuthorizationService } from './../authorization/authorization.service';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable()
export class AccountService extends GenericService<Account> {

  resource = 'account';
  private resourceMyAccount = 'account/myAccount'
  private resourceMyGroups = 'account/myGroups'


  myAccount: Account;
  myAccountFetched = new Subject<Account>();
  myGroupsFetched = new Subject<Group[]>();

  constructor(private authorizationService: AuthorizationService) {
    super(authorizationService);
  }

  getOne(id: number): Account {
    console.log(this.list);
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
      (error) => {
        this.errorHandling(error);

      });
  }

  fetchMyGroups() {
    this.authorizationService.getData<Group[]>(this.resourceMyGroups)
      .subscribe((groups: Group[]) => {

        this.myGroupsFetched.next(groups);
      },
      (error) => {
        this.errorHandling(error);
      });

  }

  getMyAccount() {
    return this.myAccount;
  }
}
